const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const routeMobileAuthentification = require('../Routes/RouteMobileAuthentification.js')
const routeLocataire = require('../Routes/RouteWebAuthentification.js')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/",routeMobileAuthentification)
app.get('/', (req, res) => {
    res.send('App is working')
})

app.listen(3000, () => console.log('Server running on port 3000 ...'))

module.exports = app