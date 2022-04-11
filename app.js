const express = require("express");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
const Restaurant = require("./models/restaurant");
const bodyParser = require("body-parser");
const { render } = require("express/lib/response");
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

//Read: Display all restaurants
app.get("/", (req, res) => {
  Restaurant.find()
    .lean()
    .then((restaurantList) => res.render("index", { restaurantList }))
    .catch((err) => console.log(err));
});

//設定路由
//Create: add new restaurant info
app.post("/restaurants", (req, res) => {
  Restaurant.create(req.body)
    .then(() => res.redirect("/"))
    .catch((error) => console.log(error));
});

// Read:Show add page of new restaurant
app.get("/restaurants/new", (req, res) => {
  return res.render("new", { layout: "main" });
});

// Read: show detail info of target restaurant
app.get("/restaurants/:id", (req, res) => {
  const id = req.params.id;
  Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render("show", restaurant))
    .catch((err) => console.log(err));
});

// Read: show detail info of target restaurant
app.get("/restaurants/:id", (req, res) => {
  const id = req.params.id;
  Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render("show", restaurant))
    .catch((err) => console.log(err));
});

// Read: Show edit page
app.get("/restaurants/:id/new", (req, res) => {
  const id = req.params.id;
  Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render("new", { restaurant }))
    .catch((error) => console.log(error));
});

// Update: renew data from edit page
app.post("/restaurants/:id/new", (req, res) => {
  const id = req.params.id;
  Restaurant.findByIdAndUpdate(id, req.body)
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch((error) => console.log(error));
});

// Delete: Delete restaurant
app.post("/restaurants/:id/delete", (req, res) => {
  const id = req.params.id;
  return Restaurant.findById(id)
    .then((restaurant) => restaurant.remove())
    .then(() => res.redirect("/"))
    .catch((err) => console.log(err));
});

// Read: show login page
app.get("/login", (req, res) => {
  res.render("login");
});
// app.get("/search", (req, res) => {
//   const keyword = req.query.keyword;
//   const searchRes = restaurantList.results.filter(
//     (searchRes) =>
//       searchRes.name.toLowerCase().includes(keyword.toLowerCase()) ||
//       searchRes.name_en.toLowerCase().includes(keyword.toLowerCase()) ||
//       searchRes.category.toLowerCase().includes(keyword.toLowerCase())
//   );
//   res.render("index", { restaurants: searchRes, keyword: keyword });
// });

app.listen(port, () => {
  console.log(`Second practice Express on http://localhost${port}`);
});
