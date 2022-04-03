import * as express from "express";
/**using TTLAmount which defined in appConf */
import { appConf } from "../config/app";
const router = express.Router();

import cacheModel from "../models/cache.model";

/**in the beginning, check if the id exists,
 * the expire will update and object will return.
 * else, generating a random text and creating a new cache object with 
 * given id and the random text.
 */
router.get("/:id", async (req, res) => {
  try {
    let cacheObject = await cacheModel.findById(req.params.id);
    if (cacheObject) {
      cacheObject.expire = Date.now() + appConf.TTLAmount;
      await cacheObject.save();
      return res.json(cacheObject);
    }

    console.log('cacheMiss');
    const text = (Math.random() + 1).toString(36).substring(7);
    cacheObject = await cacheModel.create({ _id: req.params.id, text });
    return res.json(cacheObject);
  } catch (err) {
    console.error(err);
    return res.status(500).send(err.message);
  }
});
/**in the beginning, check if the body has text or not.
 * if yes, creates the new cache object and sends it back.
 */
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
/**in the beginning, check if the body has text or not.
 * if yes, searches for the given object and updates it's text and expire if exists.
 */
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
/**if the object exists, deletes it */
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
/**sends back all cache objects */
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
/**deletes all cache objects */
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
