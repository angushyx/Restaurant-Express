const router = require("express").Router();

const home = require("./modules/home");
const restaurants = require("./modules/restaurants");

router.use("/", home);
router.use("/restaurants", restaurants);

// Read: show login page
router.get("/login", (req, res) => {
  res.render("login");
});

module.exports = router;
