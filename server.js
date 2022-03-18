import express from "express";
const app = express();

import "express-async-errors";
import dotenv from "dotenv";
//this is gonna look for .env file in root directory
dotenv.config();

import ConnectDatabase from "./db/connect-db.js";

// routers
import authRouter from "./routes/auth-routes.js";
import jobsRouter from "./routes/job-routes.js";

//installed middleware

import morgan from "morgan";

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

//for security purposes data sharing is not allowed from different origin that's why it causes cors error and to get rid of cors(cross-origin-resource-sharing) errors we can use a package called cors and run it as a middleware

// import cors from 'cors';
// app.use(cors());

//we had one more option we can go with proxy option in this case we can set proxy as our domain prefix and we need not to write full domain as well, so we are going with proxy option that's why i commented cors middleware
//https://create-react-app.dev/docs/proxying-api-requests-in-development/(read here for proxy realted info)

//middleware

import notFoundMiddleware from "./middlewares/not-found.js";
import errorHandleMiddleware from "./middlewares/error-handle.js";
import authenticateUser from "./middlewares/auth.js";

app.use(express.json()); //this is a in-built middleware from express which provide us json data in case of patch and post requests

app.get("/", (req, res, next) => {
  res.json({ msg: "welcome" });
});

app.get("/api/v1", (req, res, next) => {
  res.json({ msg: "welcome" });
}); //for demo purpose only

app.use("/api/v1/auth", authRouter);

//we only want to access user this routes when user is authenticated(token is present)
app.use("/api/v1/jobs", authenticateUser, jobsRouter);

app.use(notFoundMiddleware);
//it means express after listening for all above routes come on this and use can serve for can type of req(get,post...) and for any url.

app.use(errorHandleMiddleware);
//this middleware is setup to catch all the potential error which can occurs in our existing routes , remember if route does'nt match then it will be handled by notFoundMiddleware, if route matches and some error occur then that error will be handled by errorHandlerMiddleware.

const PORT = process.env.PORT || 8080;

//we will only start our server when database connection will be succesfull.

const startApp = async () => {
  try {
    await ConnectDatabase(process.env.MONGO_CONNECTION_URL);
    console.log("Successfully connected to databse");
    app.listen(PORT, () => {
      console.log(`Server listening on port : ${PORT}.....`);
    });
  } catch (error) {
    console.log(error);
  }
};

startApp();
