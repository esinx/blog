import dotenv from "dotenv";
dotenv.config();

import sirv from "sirv";
import express from "express";
import compression from "compression";
import * as sapper from "@sapper/server";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === "development";

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());

app.use(compression({ threshold: 0 }), sirv("static", { dev }), sapper.middleware()).listen(
    PORT,
    (err) => {
        if (err) console.log("error", err);
    }
);
