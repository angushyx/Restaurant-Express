const router = require("express").Router();

const Restaurant = require("../../models/restaurant");

//Read: Display all restaurants
router.get("/", (req, res) => {
  Restaurant.find()
    .lean()
    .then((restaurantList) => res.render("index", { restaurantList }))
    .catch((err) => console.log(err));
});
// Read: show login page
router.get("/login", (req, res) => {
  res.render("login");
});

module.exports = router;
