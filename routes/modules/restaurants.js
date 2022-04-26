const router = require("express").Router();
const Restaurant = require("../../models/restaurant");
const Users = require("../../models/user");
const randomId = require("../../public/randomNum");

//Create: add new restaurant info
router.post("/", (req, res) => {
  Restaurant.create(req.body)
    .then(() => res.redirect("/"))
    .catch((error) => console.log(error));
});

// Read:Show add page of new restaurant
router.get("/new", (req, res) => {
  return res.render("new");
});
// Read: show login page
router.get("/login", (req, res) => {
  return res.render("login");
});
// Read: show detail info of target restaurant
router.get("/:id", (req, res) => {
  const id = req.params.id;
  Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render("show", restaurant))
    .catch((err) => console.log(err));
});

// Read: Show edit page
router.get("/:id/new", (req, res) => {
  const id = req.params.id;
  Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render("new", { restaurant }))
    .catch((error) => console.log(error));
});

// Update: renew data from edit page
router.post("/:id/new", (req, res) => {
  const id = req.params.id;
  Restaurant.findByIdAndUpdate(id, req.body)
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch((error) => console.log(error));
});

// Delete: Delete restaurant
router.post("/:id/delete", (req, res) => {
  const id = req.params.id;
  return Restaurant.findById(id)
    .then((restaurant) => {
      restaurant.remove();
    })
    .then(() => res.redirect("/"))
    .catch((err) => console.log(err));
});

// logged:login function
//表單送出後進入登入頁面

//todo 想辦法把 sessionID 存進 session 裡面
router.post("/logged", (req, res) => {
  const { email, password } = req.body;
  let sessionID = "";
  Users.findOne({ email, password })
    .lean()
    .then((user) => {
      if (user) {
        sessionID = randomId(15);
        res.cookie("session_id", sessionID);
        return res.render("welcomePage", { layout: "logged", user });
      }
    });
});
module.exports = router;
