const express = require('express')
const bodyParser = require('body-parser')
var fs = require('fs')
var path = require('path')
var morgan = require('morgan')
const app = express()
const port = process.env.PORT || 3000

const routeMobileAuthentification = require('../Routes/RouteMobileAuthentification.js')
const routeWebAuthentification = require('../Routes/RouteWebAuthentification.js')
const routeGestionProfils = require('../Routes/RouteGestionProfils.js')
const routeGestionComptes = require('../Routes/RouteGestionComptes.js')
const logger=require("../config/logFilesSources")

morgan.token('header_uid', function (req, res) { return req.headers['id'] })
morgan.token('body_uid', function (req, res) { return req.body['id'] })
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/",morgan('":header_uid" ":body_uid" :remote-addr - :remote-user [:date[web]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"', { stream: fs.createWriteStream(path.join(__dirname, logger.logMobileAuthentification), { flags: 'a' }) }), routeMobileAuthentification)
app.use("/",morgan('":header_uid" ":body_uid" :remote-addr - :remote-user [:date[web]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"', { stream: fs.createWriteStream(path.join(__dirname, logger.logWebAuthentification), { flags: 'a' }) }), routeWebAuthentification)
app.use("/",morgan('":header_uid" ":body_uid" :remote-addr - :remote-user [:date[web]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"', { stream: fs.createWriteStream(path.join(__dirname, logger.logGestionDesProfils), { flags: 'a' }) }), routeGestionProfils)
app.use("/",morgan('":header_uid" ":body_uid" :remote-addr - :remote-user [:date[web]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"', { stream: fs.createWriteStream(path.join(__dirname, logger.logGestionDesComptes), { flags: 'a' }) }), routeGestionComptes)
app.get('/', (req, res) => {
    res.send('Autotek Web server')
})

app.listen(port, () => console.log('Server running on port 3000 ...'))

module.exports = {
    app
}