const mongoose = require("mongoose");
//建立資料庫連線
mongoose.connect(process.env.MONGODB_URI);
//取得資料庫連線狀態
const db = mongoose.connection;

db.on("error", () => {
  console.log("mongodb error");
});
db.once("open", () => {
  console.log("mongodb connected!");
});

module.exports = db;
