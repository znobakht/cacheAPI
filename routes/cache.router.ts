import * as express from "express";
const router = express.Router();

import cacheModel from "../models/cache.model";
router.get("/:id", async (req, res) => {
    try {
    let cacheObject = await cacheModel.findById(req.params.id);
      if (cacheObject) {
        return res.json(cacheObject);
      }

      const text = (Math.random() + 1).toString(36).substring(7);
      cacheObject = await cacheModel.create({ text });
      return res.json(cacheObject);
    } catch (err) {
      console.error(err);
      return res.status(500).send(err.message);
    }
});
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
