// const dotenv = require("dotenv");
// dotenv.config();

const app = require("./app");

const port = process.env.PORT || 5002;
const server = app.listen(port, () =>
  console.log(`listening on port ${port}...`),
);

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! Shutting down...", err);
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on("SIGTERM", () => {
  console.log("👋 SIGTERM RECEIVED. Shutting down gracefully");
  server.close(() => {
    console.log("💥Process terminated!");
  });
});
