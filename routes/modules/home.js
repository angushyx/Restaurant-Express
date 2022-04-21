const router = require("express").Router();

const Restaurant = require("../../models/restaurant");

//Read: Display all restaurants
router.get("/", (req, res) => {
  const sort = req.query.sort || "name";
  Restaurant.find()
    .sort(sort)
    .lean()
    .then((restaurantList) => res.render("index", { restaurantList }))
    .catch((err) => console.log(err));
});

//todo use RegExp modify search function
router.get("/search", (req, res) => {
  if (!req.query.keyword) {
    res.redirect("/");
  }
  const sort = req.query.sort || "name";
  const keywords = req.query.keyword.trim();

  Restaurant.find()
    .lean()
    .sort(sort)
    .then((restaurantData) => {
      const searchResults = restaurantData.filter((item) => {
        const searchRange = (
          item.name +
          item.name_en +
          item.category +
          item.location
        )
          .toLowerCase()
          .trim();
        return keywords
          .toLowerCase()
          .trim()
          .split(",")
          .every((keyword) => searchRange.includes(keyword));
      });
      res.render("index", { restaurantList: searchResults, keywords });
    })
    .catch((error) => {
      error;
    });
});

module.exports = router;
