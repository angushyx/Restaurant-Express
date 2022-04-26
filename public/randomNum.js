const allChar =
  "0123456789abcdefghigklmnopqrstuvwxyzABCDEFGHIGKLMNOPQRSTUVWXYZ";

function generateRandomNum(num) {
  arrChar = allChar.split("");
  let random = "";
  for (let i = 0; i <= num; i++) {
    const index = Math.round(Math.random() * (arrChar.length - 1));
    random += arrChar[index];
  }
  return random;
}

module.exports = generateRandomNum;
