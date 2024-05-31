import express from "express";
import bodyParser from "body-parser";
import path from "path";
import fs from "fs";
import cors from "cors";
import methodOverride from "method-override";

import ExpressError from "./utils/ExpressError";
import "express-async-errors";

const app = express();

// postgress initalization

const { Client } = require("pg");
require("dotenv").config({
  override: true,
});

const client = new Client(process.env.DATABASE_URL);

(async () => {
  await client.connect();
  try {
    const results = await client.query("SELECT NOW()");
  } catch (err) {
    console.error("error executing query:", err);
  }
})();

// ejs set-up

const ejsMate = require("ejs-mate");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");

// express settings

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static("public"));
app.use(methodOverride("_method"));

// cors settings

app.use(cors());
app.options("*", cors());

// routes

const menuRouter = require('./routes/menu');
const seriesRouter = require('./routes/series');
const apiRouter = require('./routes/api');

app.use('/', menuRouter);
app.use('/series', seriesRouter);
app.use('/api', apiRouter); 

app.all("*", (req, res, next) => {
  next(new ExpressError("Page not found", 404));
});

app.use((error: any, req: any, res: any, next: any) => {
  const { statusCode = 500 } = error;
  if (!error.message) error.message = "Something went wrong!";
  res.status(statusCode).render("./error", { error });
});

app.listen(3000, () =>
  console.log("🚀 Server ready at: http://localhost:3000")
);
