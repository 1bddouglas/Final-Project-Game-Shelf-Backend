import express from "express";
import { getClient } from "../db";
import Account from "../models/Account";
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
  // const id: string = req.params.id;
});

// make account
accountRouter.post("/", async (req, res) => {
  const newAccount: Account = req.body;
  try {
    const client = await getClient();
    await client.db().collection<Account>("accounts").insertOne(newAccount);
    res.status(201).json(newAccount);
  } catch (err) {
    errorResponse(err, res);
  }
});

accountRouter.get("/:uid", async (req, res) => {
  const uid = req.params.uid;
  try {
    const client = await getClient();
    const result = await client
      .db()
      .collection<Account>("accounts")
      .findOne({ uid });
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "account not found" });
    }
  } catch (err) {
    errorResponse(err, res);
  }
});

export default accountRouter;
