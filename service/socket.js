const io = require("socket.io")();
const { chatting, roomlist } = require("../models");

const port_redis = 6379;

const redis = require("redis").createClient(port_redis, "127.0.0.1");

redis.on("error", (err) => {
  console.log(err);
});

module.exports = {
  io: io,
  Wow: async () => {
    io.on("connection", (socket) => {
      socket.on("msg", async (msg) => {
        try {
          await io.to(msg.roomName).emit("msg", msg);
          const rows = await chatting.create({
            username: msg.name,
            message: msg.message,
            roomname: msg.roomName,
          });
          if (rows) return res.status(200).json({ result: rows });
        } catch (err) {
          console.log(err);
        }
      });
      socket.on("roomName", async (roomName) => {
        try {
          socket.join(roomName);
        } catch (err) {
          console.log(err);
        }
      });
      socket.leave();
      socket.on("disconnect", () => {
        console.log("disconnecting");
        redis.flushall();
      });
    });
  },
};
