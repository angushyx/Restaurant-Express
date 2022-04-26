const router = require("express").Router();

const { redirect } = require("express/lib/response");
const Restaurant = require("../../models/restaurant");
const Users = require("../../models/user");
const randomId = require("../../public/randomNum");

//Read: Display all restaurants
router.get("/", (req, res) => {
  const sort = req.query.sort || "name";
  Restaurant.find()
    .sort(sort)
    .lean()
    .then((restaurantList) => {
      res.render("index", { restaurantList });
    })
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
      const searchResults = searchRes(restaurantData, keywords);
      res.render("index", { restaurantList: searchResults, keywords });
    })
    .catch((error) => {
      error;
    });
});

// Read: show login page
router.get("/login", (req, res) => {
  return res.render("login");
});

// Create: create cookies and login
router.post("/logged", async (req, res) => {
  try {
    const { email, password } = await req.body;
    let sessionID = "";
    const data = await Restaurant.find().lean();
    const user = await Users.findOne({ email, password }).lean();
    if (user) {
      sessionID = randomId(15);
      res.cookie("session_id", sessionID);
      return res.render("welcomePage", {
        layout: "logged",
        user,
        data,
      });
    } else {
      return res.send("還沒註冊帳號嗎?");
    }
  } catch (err) {
    console.log(err);
  }
});

// logout
router.get("/logout", (req, res) => {
  res.clearCookie("session_id");
  return res.redirect("/login");
});

module.exports = router;
