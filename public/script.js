/**
 * 搜尋餐廳的函式
 * @param {array} restaurantData 餐廳的資料
 * @param {String} keywords 使用者輸入的 keywords
 * @return 1.搜尋結果 2.keywords
 */
function searchRes(restaurantData, keywords) {
  return restaurantData.filter((item) => {
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
}
