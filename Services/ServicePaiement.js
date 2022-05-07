const log = require("../config/Logger");
let { PythonShell } = require("python-shell");
const modelPayer=require("../Models/ModelPayer")
// Fonction de verification de validite du paiement
const VerifierPaiement = async (request, response) => {
  let type_paiement=request.body.type_paiement
  let montant = request.body.montant
  let id_transaction = request.body.id_transaction
  if(type_paiement==="baridimob"){
    let options = {
      mode: "text",
      pythonOptions: ["-u"],
      args: [montant, id_transaction],
    };
    PythonShell.run("Services/paiement.py", options, async(err, results)=> {
      if (err) {
        log.loggerConsole.error(error);
        log.loggerFile.error(error);
        response.sendStatus(406);
      }else{
        if (results != null && results[0] == "True") {
          await modelPayer.addPaiement(request,response)
        } else {
          response.sendStatus(406);
        }
      }
    });
  }else if(type_paiement==="stripe"){

  }else{
    response.sendStatus(406);
  }
};
// Recuoperer la liste des paiement effectuées par un locataire
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
  getPaiementsByIdLocataire
};
