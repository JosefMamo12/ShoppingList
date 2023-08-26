import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";

import clientRoutes from "./routes/client.js";

/** Initialize express app */
const app = express();

app.use(express.json());
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use("/client", clientRoutes);

app.listen(8080, () => console.log("App is listening on port 8080"));
 