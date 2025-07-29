import mongoose from "mongoose";
import { Server } from "http";
import { envVars } from "./app/config/env";
import app from "./app";


let server: Server;

process.on("uncaughtException", (err) => {
  // eslint-disable-next-line no-console
  console.log("uncaught expection....closing");
  // eslint-disable-next-line no-console
  console.log(err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});
// throw new Error("This is a synchronous error")

const startServer = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${envVars.DB_USER}:${envVars.DB_PASSWORD}@cluster0.r7awt.mongodb.net/ride-booking-system?retryWrites=true&w=majority&appName=Cluster0`
    );

    console.log("Connected to db");
    server = app.listen(envVars.PORT, () => {
      console.log("Server is listening on port: 5000");
    });
  } catch (error) {
    console.log(error);
  }
};

(async () => {
 
 await startServer();

})();

process.on("unhandledRejection", (err) => {
  console.log("UnHandle rejection....closing");
  console.log(err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});
// Promise.reject(new Error("I forgot to catch this promise"))

process.on("SIGTERM", () => {
  console.log("sig term rejection....closing");

  if (server) {
    server.close(() => {
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
});
process.on("SIGINT", () => {
  console.log("sig int rejection....closing");

  if (server) {
    server.close(() => {
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
});
