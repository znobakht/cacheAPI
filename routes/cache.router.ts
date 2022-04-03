import * as express from "express";
const router = express.Router();

import cacheModel from "../models/cache.model";

router.post("/create", async (req, res) => {
  try {
      if(!req?.body?.text){
          return res.status(400).json({message: "text is required"});
      }
      const text = req.body.text;
      const cacheObject = await cacheModel.create({text});
      return res.json(cacheObject);

  } catch (err) {
    console.error(err);
    return res.status(500).send(err.message);
  }
});

const cacheRouter = router;
export default cacheRouter;
