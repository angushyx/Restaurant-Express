const express = require("express");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
const Restaurant = require("./models/restaurant");

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

app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.use(express.static("public"));
app.set("view engine", "handlebars");

app.get("/", (req, res) => {
  Restaurant.find()
    .lean()
    .then((restaurantList) => res.render("index", { restaurantList }))
    .catch((err) => console.log(err));
});

app.get("/restaurants/:id", (req, res) => {
  const targetRestaurant = restaurantList.results.find(
    (restaurant) => restaurant.id === Number(req.params.id)
  );
  res.render("show", { restaurant: targetRestaurant });
});

app.get("/search", (req, res) => {
  const keyword = req.query.keyword;
  const searchRes = restaurantList.results.filter(
    (searchRes) =>
      searchRes.name.toLowerCase().includes(keyword.toLowerCase()) ||
      searchRes.name_en.toLowerCase().includes(keyword.toLowerCase()) ||
      searchRes.category.toLowerCase().includes(keyword.toLowerCase())
  );
  res.render("index", { restaurants: searchRes, keyword: keyword });
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.listen(port, () => {
  console.log(`Second practice Express on http://localhost${port}`);
});
