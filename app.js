const express = require("express");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
const Restaurant = require("./models/restaurant");
const bodyParser = require("body-parser");

const routes = require("./routes");
//建立資料庫連線
mongoose.connect(process.env.MONGODB_URI);

const port = 3000;
const app = express();

//取得資料庫連線狀態
const db = mongoose.connection;

db.on("error", () => {
  console.log("mongodb error");
});
db.once("open", () => {
  console.log("mongodb connected!");
});

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
