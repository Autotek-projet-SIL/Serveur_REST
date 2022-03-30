const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 3000
const routeMobileAuthentification = require('../Routes/RouteMobileAuthentification.js')
const routeWebAuthentification = require('../Routes/RouteWebAuthentification.js')
const routeGestionProfils = require('../Routes/RouteGestionProfils')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", routeMobileAuthentification)
app.use("/", routeWebAuthentification)
app.use("/",routeGestionProfils)
app.get('/', (req, res) => {
    res.send('Autotek Web server')
})

app.listen(port, () => console.log('Server running on port 3000 ...'))

module.exports = {
    app
}