// const PORT = process.env.PORT || 3000;
const PORT = 3000;

const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const routes = require("./routes");
const { default: mongoose } = require("mongoose");
require("./config/mongoose");

const app = express();

// Set express engine
app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(cookieParser());
// MiddleWares
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

//todo cookie

app.use(
  session({
    secret: "mySecret",
    name: "user",
    saveUninitialized: false,
    resave: true,
    cookie: {
      secure: true,
      maxAge: 1000 * 60 * 3,
    },
  })
);

app.use(routes);

app.listen(PORT, () => {
  console.log(`Practice Express on http://localhost${PORT}`);
});
