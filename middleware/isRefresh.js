const jwt = require("jsonwebtoken");
require("dotenv").config();
const secretKey = "" + process.env.ACCESS_KEY;
const { User } = require("../models");

module.exports = async (req, res, next) => {
  try {
    const token = req.get("x_auth");
    const decodedToken = jwt.verify(token, secretKey);
    const { id } = decodedToken;
    const rows = await User.findOne({ id: id });
    if (rows) {
      return res.status(200).json({ result: rows });
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
  }
};
