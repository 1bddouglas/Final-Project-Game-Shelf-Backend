import express from "express";
import { getClient } from "../db";
import BoardGame from "../models/BoardGame";

const accountRouter = express.Router();

const errorResponse = (error: any, res: any) => {
  console.error("FAIL", error);
  res.status(500).json({ message: "Internal Server Error" });
};

// get account
accountRouter.get("/", async (req, res) => {
  try {
    const client = await getClient();
    const cursor = client.db().collection<BoardGame>("accounts").find();
    const results = await cursor.toArray();
    res.json(results);
  } catch (err) {
    errorResponse(err, res);
  }
});

// add whishlist function
accountRouter.put("", async (req, res) => {
  
});

export default accountRouter;
