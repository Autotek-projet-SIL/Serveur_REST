const log = require("../config/Logger");
let { PythonShell } = require("python-shell");

// Fonction de verification de validite du paiement
const checkPaiement = async (request, response) => {
  let montant = "10000.0";
  let id_transaction = "002021540661";
  let card_number = "00799999002355780909";
  let options = {
    mode: "text",
    pythonOptions: ["-u"],
    args: [montant, card_number, id_transaction], //An argument which can be accessed in the script using sys.argv[1]
  };
  PythonShell.run("paiement.py", options, function (err, results) {
    if (err) {
      log.loggerConsole.error(error);
      log.loggerFile.error(error);
      response.sendStatus(406);
    }
    if (results != null && results[0] == "True") {
      response.sendStatus(200);
    } else {
      response.sendStatus(406);
    }
  });
};

module.exports = {
  checkPaiement,
};
