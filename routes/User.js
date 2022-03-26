const express = require("express");
const bcrypt = require("bcrypt");
const { createToken, creatRefreshToken } = require("../utils/jwt");
const { User } = require("../models");
const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    let { id, passwd } = req.body;
    const hash = await bcrypt.hash(passwd, 12);
    const rows = await User.create({
      id: id,
      passwd: hash,
    });
    if (rows) return res.status(200).json({ result: rows });
  } catch (err) {
    console.log(err);
  }
});
router.post("/login", async (req, res) => {
  try {
    const { id, passwd } = req.body;
    const user = await User.findOne({
      where: { id: id },
    });
    console.log("rows", passwd);
    const compare = await bcrypt.compareSync(passwd, user.passwd);
    if (compare == true) {
      const token = createToken(User.id);
      const retoken = creatRefreshToken(User.id);
      return res.send([token, retoken]);
    } else {
      throw res.send(404);
    }
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
