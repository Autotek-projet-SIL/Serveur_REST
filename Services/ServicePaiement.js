const log = require("../config/Logger");
let { PythonShell } = require("python-shell");
const modelPayer = require("../Models/ModelPayer");
const stripe = require("stripe")(
  "sk_test_51KtJjXD9GU8MlLbuWhkRfcxgL14ibLuHaGIpsv668b4l5lfsclV1FZiyOctezrUjYOJJWrHvMJbu7M8j8CgroAK000Kv10JXg0"
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
    const paymentIntent = await stripe.paymentIntents.retrieve(id_transaction);
    if (
      paymentIntent.status === "succeeded" &&
      paymentIntent.amount == montant
    ) {
      response.sendStatus(200);
    } else {
      response.sendStatus(406);
    }
  } else {
    response.sendStatus(406);
  }
};
// Recuperer la liste des paiement effectuées par un locataire
const getPaiementsByIdLocataire = async (request, response) => {
  try {
    await modelPayer.getPaiementsByIdLocataire(request, response);
  } catch (error) {
    log.loggerConsole.error(error);
    log.loggerFile.error(error);
    response.sendStatus(500);
  }
};

module.exports = {
  VerifierPaiement,
  getPaiementsByIdLocataire,
};
