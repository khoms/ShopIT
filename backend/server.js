const app = require("./app");
const connectDatabase = require("./config/database");
const dotenv = require("dotenv");

//Handle Uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log(`ERROR : ${err}`);
  console.log("Shutting down due to uncaught exception");
  // server.close(() => {
  process.exit(1);
  // });
});
// console.log(a);

//Setting up config file
dotenv.config({ path: "backend/config/config.env" });

//Connectinbg to the database

connectDatabase();

const server = app.listen(process.env.PORT, () => {
  console.log(
    `Server started on PORT : ${process.env.PORT} in ${process.env.NODE_ENV} mode`
  );
});

//Handle Unhandled Promise rejections
process.on("unhandledRejection", (err) => {
  console.log("Shutting down the server due to Unhandled Promise rejection");
  server.close(() => {
    process.exit(1);
  });
});
