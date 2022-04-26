const router = require("express").Router();
const Restaurant = require("../../models/restaurant");
const Users = require("../../models/user");

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
  // const sessionID = req.cookies.session_id;
  // console.log("Cookies: ", req.cookies);
  // console.log(sessionID);
  // console.log("Signed Cookies: ", req.signedCookies);
  console.log(res.cookie());

  // res.cookie("session_id", sessionID);
  // Users.find()
  //   .lean()
  //   .then((userDate) => {
  //     const isUser = userDate.find((user) => {
  //       return user.email === email && user.password === password;
  //     });
  //     if (isUser) {
  //       req.session.login = true;
  //       isUser.sessionID = req.sessionID;
  //       req.session.user = isUser.firstName;
  return res.render("welcomePage");
  //     } else {
  // return res.redirect("/restaurants/login");
  //     }
  //   });
});
// router.post("/logged", (req, res) => {
//   const { email, password } = req.body;
//   Users.find()
//     .lean()
//     .then((userDate) => {
//       const isUser = userDate.find((user) => {
//         return user.email === email && user.password === password;
//       });
//       if (isUser) {
//         req.session.login = true;
//         isUser.sessionID = req.sessionID;
//         console.log(isUser);
//         console.log(req.session);
//         req.session.user = isUser.firstName;
//         return res.render("welcomePage", { user: isUser });
//       } else {
//         return res.redirect("/restaurants/login");
//       }
//     });
// });
module.exports = router;
