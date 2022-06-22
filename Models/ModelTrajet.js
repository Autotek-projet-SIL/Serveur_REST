// Declaration of variables
const pool = require("../config/config_pool");
const log = require("../config/Logger");

//Add a location
const addTrajet = async (request, response) => {
  let body = request.body;
  pool.query(
    "INSERT INTO trajet( point_depart, point_arrive)VALUES ( $1,$2)",
    [body.point_depart, body.point_arrive],
    (error, results) => {
      if (error) {
        log.loggerConsole.error(error);
        log.loggerFile.error(error);
        response.statusCode == 500;
      }

      // response.sendStatus(response.statusCode);
    }
  );
};


//Export CRUD functions from the trip
module.exports = {
  addTrajet,
};
