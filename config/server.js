const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 3000
const routeMobileAuthentification = require('../Routes/RouteMobileAuthentification.js')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/",routeMobileAuthentification)
app.get('/', (req, res) => {
    res.send('App is working')
})

app.listen(port, () => console.log('Server running on port 3000 ...'))

module.exports = app