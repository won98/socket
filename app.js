const express = require("express");
const app = express();
const cors = require("cors");
const { sequelize, roomlist, chatting } = require("./models");
const Router = require("./routes");
//const { UserRoute } = require("./routes");

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("연결됨");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use(cors());

const http_server = require("http").createServer(app).listen(4001);
const socket = require("./service/socket");

socket.io.attach(http_server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

socket.Wow();

app.post("/test", async (req, res) => {
  try {
    let { roomname, user } = req.body;
    const rows2 = await roomlist.create({
      roomname: roomname,
      users: user,
    });
    if (rows2) return res.status(200).json({ result: "??" });
  } catch (err) {
    console.log(err);
  }
});

app.post("/inperson", async (req, res) => {
  try {
    let { roomname, user } = req.body;
    const rows = await roomlist.findAll();
    console.log(rows.user);
    const hi = rows.user;
    let halo = [];
    halo.push(hi.user);
    console.log(halo.toString());
  } catch {
    console.log(err);
  }
});
app.post("/roominfo", async (req, res) => {
  try {
    let { idx } = req.body;
    const rows = await roomlist.findOne({ where: { idx: idx } });
    const rows2 = await chatting.findAll({
      where: { roomname: rows.roomname },
    });
    if (rows2[0] == null) return res.status(200).json({ result1: rows });
    if (rows2) return res.status(200).json({ result2: rows2 });
  } catch (err) {
    console.log(err);
  }
});
app.post("/roomlist", async (req, res) => {
  try {
    let { user } = req.body;
    console.log(req.body);
    let data = [user];
    let query = `select *from room left join roomlist
    on room.r_idx = roomlist.idx
    where user =?`;
    const rows = await sequelize.query(query, { replacements: data });
    console.log(rows);
    if (rows) return res.status(200).json({ result: rows[0] });
  } catch (err) {
    console.log(err);
  }
});
app.post("/members", async (req, res) => {
  try {
    let { r_idx, user, user2 } = req.body;
    console.log(req.body);
    const rows = await room.create({
      r_idx: r_idx,
      user: user,
    });
    if (rows) {
      const rows2 = await room.create({
        r_idx: r_idx,
        user: user2,
      });
      if (rows2) return res.status(200).json({ result: "방 입장" });
    }
  } catch (err) {
    console.log(err);
  }
});
//익스프레스가 지원해주는 restAPI
app.get("/", function (req, res) {
  res.send("Hello World");
});

app.use("/user", Router.UserRoute);

//app.listen으로 서버 실행이 가능해집니다.
app.listen(4000);
