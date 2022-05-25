const log = require("../config/Logger");
let { PythonShell } = require("python-shell");
const modelPayer = require("../Models/ModelPayer");
const modelLocataire = require("../Models/ModelLocataire");
const { Convert } = require("easy-currencies");
const stripe = require("stripe")(
  "sk_test_51L3RzUAMbIvDVipZyYnCwUWg5M2yHCqzfOBzURCHhVkBjg5RdiVksQXQpyd35Nw0S6snKNo605yIyhwYSFUOWnH000utsLGxOa"
);

// Fonction de verification de validite du paiement
const VerifierPaiement = async (request, response) => {
  let type_paiement = request.body.type_paiement;
  let montant = request.body.montant;
  let id_transaction = request.body.id_transaction;
  if (type_paiement === "baridimob") {
    let options = {
      mode: "text",
      pythonOptions: ["-u"],
      args: [montant, id_transaction],
    };
    PythonShell.run("Services/paiement.py", options, async (err, results) => {
      if (err) {
        log.loggerConsole.error(error);
        log.loggerFile.error(error);
        response.sendStatus(406);
      } else {
        if (results != null && results[0] == "True") {
          await modelPayer.addPaiement(request, response);
        } else {
          response.sendStatus(406);
        }
      }
    });
  } else if (type_paiement === "stripe") {
    let customerId = null;
    let customer = null;
    let balance = null;
    let amount = await Convert(request.body.montant).from("DZD").to("EUR");
    amount = parseInt(amount) * 100;
    let email = request.body.email;
    let data = await modelLocataire.getLocaireStripeIdByEmail(email);
    if (data["stripe_id"] == null) {
      customer = await stripe.customers.create({
        email: email,
        balance: 10000,
      });
      await modelLocataire.updateLocataireStripeId(email, customer.id);
      customerId = customer.id;
    } else {
      customerId = data["stripe_id"];
      customer = await stripe.customers.retrieve(customerId);
      balance = customer.balance;
    }
    try {
      const card_Token = await stripe.tokens.create({
        card: {
          name: request.body.name,
          number: request.body.numero_card,
          exp_month: request.body.exp_month,
          exp_year: request.body.exp_year,
          cvc: request.body.cvc,
        },
      });
      const card = await stripe.customers.createSource(customerId, {
        source: `${card_Token.id}`,
      });
      if (amount > balance) {
        response.sendStatus(406);
      } else {
        await stripe.customers.createBalanceTransaction(customerId, {
          amount: -amount,
          currency: "eur",
        });
        await stripe.customers.createBalanceTransaction("cus_Lky8p8VrgnpaVR", {
          amount: amount,
          currency: "eur",
        });
        await modelPayer.addPaiement(request, response);
      }
    } catch (error) {
      log.loggerConsole.error(error);
      log.loggerFile.error(error);
      response.sendStatus(500);
    }
  }
};

// Recuperer la liste des paiement effectuées par un locataire
const getPaiementsByIdLocataire = async (request, response) => {
  await modelPayer.getPaiementsByIdLocataire(request, response);
};
// Exporter les fonctions du service paiement
module.exports = {
  VerifierPaiement,
  getPaiementsByIdLocataire,
};
