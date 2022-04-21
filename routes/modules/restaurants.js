const router = require("express").Router();
const Restaurant = require("../../models/restaurant");
const Users = [
  {
    firstName: "Tony",
    email: "tony@stark.com",
    password: "iamironman",
  },
  {
    firstName: "Angus",
    email: "sickmi14798@gmail.com",
    password: "1230",
  },
  {
    firstName: "Steve",
    email: "captain@hotmail.com",
    password: "icandothisallday",
  },
  {
    firstName: "Peter",
    email: "peter@parker.com",
    password: "enajyram",
  },
  {
    firstName: "Natasha",
    email: "natasha@gamil.com",
    password: "*parol#@$!",
  },
  {
    firstName: "Nick",
    email: "nick@shield.com",
    password: "password",
  },
];

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

// logged:login
router.post("/logged", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const isUser = Users.find((user) => {
    return user.email === email && user.password === password;
  });
  if (isUser) {
    res.render("welcomePage", { layout: "logged", user: isUser });
  } else {
    res.send("帳號米碼錯誤");
  }
});
module.exports = router;
