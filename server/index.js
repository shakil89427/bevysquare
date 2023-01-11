require("dotenv").config();
require("./src/helpers/connectDB")();
const express = require("express");
const app = express();
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer, { maxHttpBufferSize: 1e9 });
const port = process.env.PORT || 5000;

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

require("./socket")(io);
app.get("/", (_, res) => res.send("Server running"));
app.use("/api/otp", require("./src/routes/otp.route"));
app.use("/api/user", require("./src/routes/user.route"));
app.use("/api/post", require("./src/routes/post.route"));
app.use("/api/group", require("./src/routes/group.route"));
app.use("/api/comment", require("./src/routes/comment.route"));
app.use("/api/notification", require("./src/routes/notification.route"));
app.use("/api/report", require("./src/routes/report.route"));
app.use("/api/help", require("./src/routes/help.route"));
app.use("/api/remote", require("./src/routes/remote.route"));
app.use("/api/recentchat", require("./src/routes/recentChat.route"));
app.use("/api/message", require("./src/routes/message.route"));
app.use(require("./src/helpers/routeCatcher"));
app.use(require("./src/helpers/errorHandler"));

httpServer.listen(port, () => console.log(`Server running on port ${port}`));
