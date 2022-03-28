import { readFile } from "fs/promises";
import dotenv from "dotenv";
dotenv.config();

import ConnectDatabase from "./db/connect-db.js";

import Job from "./models/Job.js";

const start = async () => {
  try {
    await ConnectDatabase(process.env.MONGO_CONNECTION_URL);
    await Job.deleteMany(); //clearing all previous entries

    const jsonData = JSON.parse(
      await readFile(new URL("./mock-data.json", import.meta.url))
    ); //this is for es-module6 for plain js this thing can be different

    await Job.create(jsonData);
    console.log("Success!!!");
    process.exit(0);
    //process.exit means exit from the process which is executing and 0 here specify that everything wnt well and 1 means interrupting the process
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
