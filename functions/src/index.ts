import * as functions from "firebase-functions";
import express from "express";
import cors from "cors";
import accountRouter from "./routes/accountRouter";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/accounts", accountRouter);
export const api = functions.https.onRequest(app);
