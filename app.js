// const PORT = process.env.PORT || 3000;
const PORT = 3000;

const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const session = require("express-session");

const routes = require("./routes");
require("./config/mongoose");

const app = express();

// Set express engine
app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
// MiddleWares
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.set("trust proxy", 1);

app.use(session({ secret: "keyboard cat", cookie: { maxAge: 60000 } }));
//todo cookie
// app.use(
//   session({
//     secret: "secret",
//     resave: true,
//     saveUninitialized: false,
//     cookie: {
//       maxAge: 1000 * 60 * 3,
//     },
//   })
// );

app.use(routes);

app.listen(PORT, () => {
  console.log(`Practice Express on http://localhost${PORT}`);
});
