const router = require("express").Router();
const Restaurant = require("../../models/restaurant");

//設定路由
//Create: add new restaurant info
router.post("/", (req, res) => {
  Restaurant.create(req.body)
    .then(() => res.redirect("/"))
    .catch((error) => console.log(error));
});

// Read:Show add page of new restaurant
router.get("/new", (req, res) => {
  return res.render("new", { layout: "main" });
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
    .then((restaurant) => restaurant.remove())
    .then(() => res.redirect("/"))
    .catch((err) => console.log(err));
});

router.get("/search", (req, res) => {
  if (!req.query.keyword) {
    res.redirect("/");
  }
  const keywords = req.query.keyword;

  Restaurant.find()
    .lean()
    .then((searchData) => {
      const searchResults = searchData.filter((searchRes) => {
        searchRes.name.toLowerCase().includes(keywords.toLowerCase()) ||
          searchRes.name_en.toLowerCase().includes(keywords.toLowerCase()) ||
          searchRes.category.toLowerCase().includes(keywords.toLowerCase());
        console.log(searchRes.name);
      });
      console.log(searchResults);
      res.render("index", { restaurants: searchResults, keyword: keywords });
    })
    .catch((error) => console.log(error));
});

module.exports = router;
