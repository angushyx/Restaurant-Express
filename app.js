// const PORT = process.env.PORT || 3000;
const PORT = 3000;

const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const routes = require("./routes");
const { default: mongoose } = require("mongoose");
require("./config/mongoose");

const app = express();

// Set express engine
app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// trust first proxy
app.set("trust proxy", 1);

// MiddleWares
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
//增加cookieParser
app.use(cookieParser());
//todo cookie

app.use(routes);
// app.use(
//   session({
//     secret: "mySecret",
//     name: "user",
//     saveUninitialized: false,
//     resave: true,
//     cookie: {
//       secure: true,
//       maxAge: 1000 * 60 * 3,
//     },
//   })
// );

app.listen(PORT, () => {
  console.log(`Practice Express on http://localhost${PORT}`);
});
