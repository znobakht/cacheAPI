import * as express from "express";
import { appConf } from "../config/app";
const router = express.Router();

import cacheModel from "../models/cache.model";
router.get("/:id", async (req, res) => {
  try {
    let cacheObject = await cacheModel.findById(req.params.id);
    if (cacheObject) {
      cacheObject.expire = Date.now() + appConf.TTLAmount;
      await cacheObject.save();
      return res.json(cacheObject);
    }

    const text = (Math.random() + 1).toString(36).substring(7);
    cacheObject = await cacheModel.create({ _id: req.params.id, text });
    return res.json(cacheObject);
  } catch (err) {
    console.error(err);
    return res.status(500).send(err.message);
  }
});
router.post("/", async (req, res) => {
  try {
    if (!req?.body?.text) {
      return res.status(400).json({ message: "text is required" });
    }
    const text = req.body.text;
    const cacheObject = await cacheModel.create({ text });
    return res.json(cacheObject);
  } catch (err) {
    console.error(err);
    return res.status(500).send(err.message);
  }
});
router.put("/:id", async (req, res) => {
  try {
    if (!req?.body?.text) {
      return res.status(400).json({ message: "text is required" });
    }
    let cacheObject = await cacheModel.findById(req.params.id);
    if (!cacheObject) {
      return res.status(400).json({ message: "cache object not found" });
    }
    cacheObject.text = req.body.text;
    cacheObject.expire = Date.now() + appConf.TTLAmount;
    await cacheObject.save();
    return res.json(cacheObject);
  } catch (err) {
    console.error(err);
    return res.status(500).send(err.message);
  }
});
router.delete("/:id", async (req, res) => {
  try {
    let cacheObject = await cacheModel.findByIdAndDelete(req.params.id);
    if (!cacheObject) {
      return res.status(400).json({ message: "cache object not found" });
    }
    return res.status(200).json({ message: "cache object deleted", cacheObject });
  } catch (err) {
    console.error(err);
    return res.status(500).send(err.message);
  }
});
router.get("/", async (req, res) =>{
  try {
    const objects = await cacheModel.find();
    return res
      .status(200)
      .json(objects);
  } catch (err) {
    console.error(err);
    return res.status(500).send(err.message);
  }
})
router.delete("/", async (req, res) =>{
  try {
    await cacheModel.deleteMany();
    return res
      .status(200)
      .json({ message: "all cache objects deleted"});
  } catch (err) {
    console.error(err);
    return res.status(500).send(err.message);
  }
})
const cacheRouter = router;
export default cacheRouter;
