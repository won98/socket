const jwt = require("jsonwebtoken");
require("dotenv").config();
const { ACCESS_KEY, REFRESH_KEY } = process.env;

const createToken = (payload) => {
  console.log(ACCESS_KEY);
  const token = jwt.sign({ id: payload }, ACCESS_KEY, {
    algorithm: "HS256",
    expiresIn: "30m",
  });
  return token;
};

const creatRefreshToken = (payload) => {
  const retoken = jwt.sign({ id: payload }, REFRESH_KEY, {
    algorithm: "HS256",
    expiresIn: "1d",
  });
  return retoken;
};

module.exports = { createToken, creatRefreshToken };
