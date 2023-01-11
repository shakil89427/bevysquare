const mongoose = require("mongoose");

module.exports = () => {
  mongoose.set("strictQuery", true);
  mongoose
    .connect(process.env.DATABASE_URI, {
      family: 4,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .catch((error) => console.log(error?.message));
  mongoose.connection.on("connected", () => console.log("DB connected"));
  mongoose.connection.on("disconnected", () => console.log("DB disconnected"));
  process.on("SIGINT", () => mongoose.connection.close(() => process.exit(0)));
};
