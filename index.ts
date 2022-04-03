import { connect } from "mongoose";
import { mongoConf } from "./config/mongo";
import { appConf } from "./config/app";
import cacheRouter from "./routes/cache.router";
import * as express from "express";
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/**adds cache end point. */
app.use("/cache", cacheRouter);

/**connects to database */
connect(mongoConf.dbAddress)
  .then(() => {
    console.log(`connected to mongo at ${mongoConf.dbAddress} address`);
  })
  .catch((err) => {
    console.error(err);
  });

  /**runs server */
app.listen(appConf.port, () => {
  console.log(`server is running on port ${appConf.port}`);
});
