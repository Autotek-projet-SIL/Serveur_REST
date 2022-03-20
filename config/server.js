const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const routeLocataire = require('../Routes/RouteMobileAuthentification.js')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/",routeLocataire)
app.get('/', (req, res) => {
    res.send('App is working')
})

app.listen(3000, () => console.log('Server running on port 3000 ...'))

module.exports = app