const { verifySocketToken } = require("./src/helpers/tokenHelper");
const updateRecentChat = require("./src/helpers/updateRecentChat");
const User = require("./src/models/User.model");
const RecentChat = require("./src/models/RecentChat.model");

const users = {};

module.exports = (io) => {
  io.use(verifySocketToken);

  io.on("connection", async (socket) => {
    //   on connection
    try {
      if (!users[socket.payload._id]) {
        await User.updateOne({ _id: socket.payload._id }, { online: true });
        await RecentChat.updateMany(
          { withUserId: socket.payload._id },
          { online: true }
        );
        users[socket.payload._id] = [socket.id];
        socket.broadcast.emit("online", {
          userId: socket.payload._id,
          status: true,
        });
      } else {
        users[socket.payload._id].push(socket.id);
      }
    } catch (error) {
      socket.emit("error", error);
    }

    // on disconnect
    socket.on("disconnect", async () => {
      try {
        if (!Array.isArray(users[socket.payload._id])) return;
        const filtered = users[socket.payload._id].filter(
          (socketId) => socketId !== socket.id
        );
        if (!filtered.length) {
          delete users[socket.payload._id];
          await User.updateOne({ _id: socket.payload._id }, { online: false });
          await RecentChat.updateMany(
            { withUserId: socket.payload._id },
            { online: false }
          );
          io.emit("online", { userId: socket.payload._id, status: false });
        } else {
          users[socket.payload._id] = filtered;
        }
      } catch (error) {}
    });

    // on  typing
    socket.on("typing", ({ to, status }) => {
      try {
        if (!Array.isArray(users[to])) return;
        users[to].forEach((socketId) => {
          io.to(socketId).emit("getTyping", {
            userId: socket.payload._id,
            status,
          });
        });
      } catch (error) {
        socket.emit("error", error);
      }
    });

    // on send
    socket.on("sendMessage", async (inputData) => {
      try {
        const result = await updateRecentChat(inputData);
        const {
          error,
          senderId,
          receiverId,
          senderRecent,
          receiverRecent,
          newMessage,
        } = result;

        if (error) return socket.emit("error", error);

        if (Array.isArray(users[receiverId])) {
          users[receiverId].forEach((socketId) => {
            io.to(socketId).emit("receiveMessage", newMessage);
            io.to(socketId).emit("recentMessage", receiverRecent);
          });
        }
        if (Array.isArray(users[senderId])) {
          users[senderId].forEach((socketId) => {
            io.to(socketId).emit("receiveMessage", newMessage);
            io.to(socketId).emit("recentMessage", senderRecent);
          });
        }
      } catch (error) {
        socket.emit("error", error);
      }
    });
  });
};
