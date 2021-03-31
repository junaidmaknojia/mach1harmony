const express= require("express");
const morgan= require("morgan");
const cors= require("cors");
const csurf= require("csurf");
const helmet= require("helmet");
const cookieParser= require("cookie-parser");
const router = require("./routes");
const sessionRouter = require("./routes/api/session")
const {ValidationError} = require("sequelize");
const bodyParser = require("body-parser");

const environment = require("./config");
const isProduction = environment === "production";

const app = express();

//middlewares
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

if(!isProduction){
    app.use(cors()); // if in development mode, use cors
}
app.use(helmet({
    contentSecurityPolicy: false
}));

// The XSRF-TOKEN cookie value needs to be sent in the header
// of any request with all HTTP verbs besides GET.
// This header will be used to validate the _csrf cookie to confirm that
// the request comes from your site and not an unauthorized site.

//ATTN: what can other properties of csurf do security-wise???????????????????????
app.use(csurf({
    cookie: {
        secure: isProduction,
        sameSite: isProduction && "Lax",
        httpOnly: true,
    },
}));

app.use(router);

app.use((req, res, next) => {
    const err = new Error("The requested resource cannot be found");
    err.title = "Resource Not Found";
    err.errors = ["The requested resource couldn't be found"];
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    if(err instanceof ValidationError){
        err.errors = err.errors.map(e => e.message);
        err.title = "Validation Error";
    }
    next(err);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    console.error(err);
    res.json({
        title: err.title || "Server Error",
        message: err.message,
        errors: err.errors,
        stack: isProduction ? null : err.stack
    });
});


module.exports = app;
