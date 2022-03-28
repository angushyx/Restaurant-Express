const express = require("express");
const app = express();
const port = 3000;

const exphbs = require("express-handlebars");
const restaurantList = require("./restaurant.json");

app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.use(express.static("public"));
app.set("view engine", "handlebars");

app.get("/", (req, res) => {
  res.render("index", { restaurants: restaurantList.results });
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
