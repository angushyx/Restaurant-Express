const port = 3000;
const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");

const routes = require("./routes");
require("./config/mongoose");

const app = express();

// Set express engine
app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
// MiddleWares
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(routes);

app.listen(port, () => {
  console.log(`Second practice Express on http://localhost${port}`);
});
