const router = require("express").Router();

const Restaurant = require("../../models/restaurant");

//Read: Display all restaurants
router.get("/", (req, res) => {
  Restaurant.find()
    .lean()
    .then((restaurantList) => res.render("index", { restaurantList }))
    .catch((err) => console.log(err));
});

module.exports = router;
