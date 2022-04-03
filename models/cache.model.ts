import {Document, Schema, model} from "mongoose";
import {appConf} from "../config/app"
interface cacheInterface extends Document {
  text: string;
  expire: Date;
}

const cacheSchema = new Schema<cacheInterface>({
  text: {
    type: String,
    required: true,
  },
  expire: {
    type: Date,
    default: Date.now,
    expires: appConf.TTLAmount,
  },
});

export default model<cacheInterface>("cache", cacheSchema);
//const cacheModel = model<cacheInterface>("cache", cacheSchema); //these two lines are same as above line.
// export default cacheModel;