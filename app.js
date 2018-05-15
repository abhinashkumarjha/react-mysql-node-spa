// configure dotenv
require('dotenv').load();
const   express         = require("express"),
        app             = express(),
        bodyParser      = require("body-parser"),
        helmet          = require('helmet'),
        passport        = require("passport"),
        cookieParser    = require("cookie-parser"),
        LocalStrategy   = require("passport-local"),
        rateLimit       = require('express-rate-limit'),
        session         = require("express-session"),
        mysql           = require('promise-mysql'),
        fileUpload      = require('express-fileupload'),
        path            = require('path');

//Requiring Internal Assets
const routes = require('./routes/routes')

//Security Protocol Using Helmet
app.use(helmet());

//Rate Limiting for API's
var limiter = new rateLimit({
    windowMs: 60 * 1000, // 1 minutes
    max: 50, // limit each IP to 100 requests per windowMs
    delayMs: 0 // disable delaying - full speed until the max limit is reached
});

//Body Parser & Cookie Parser Configuration
app.use(bodyParser.json({
    limit: '50mb'
})) // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    limit: '50mb',
    extended: true
}))
app.use(cookieParser('secret'));//to support cookie parsing

//Setting Public Directory
app.use(express.static(path.join(__dirname, 'client_spa/build')));
app.use(express.static(path.join(__dirname, 'public/images')));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
  });


//Initiate Backend Routing

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'client_spa/build', 'index.html'));
});

app.use('/api/v1',routes)

//Server Initialization
app.listen(process.env.PORT, process.env.HOST, () => {
    console.log('Server started on ' + new Date())
    console.log(`Magic Happens on http://${process.env.HOST}:${process.env.PORT}`)
})
