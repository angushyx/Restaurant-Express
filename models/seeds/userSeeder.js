const userDate = require("../../user.json").results;
const User = require("../user");

const db = require("../../config/mongoose");

db.once("open", () => {
  console.log("mongodb connected! and creating user seeds..");

  User.create(userDate)
    .then(() => {
      console.log("Done!");
      db.close();
    })
    .catch((error) => console.log(error));
});
