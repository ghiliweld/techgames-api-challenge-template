import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import { Application, Request, Response } from "express";

dotenv.config();

const app: Application = express();
const port = process.env.SERVER_PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

if (port == "") {
    // tslint:disable-next-line:no-console
    console.log("Missing environment variables for configuration (check .env.example and create a .env)")
    process.exit(1);
}

app.get('/status', function (req, res) {
  res.send({
    "status" : "Up"
  })
})

app.use((req: Request, res: Response) => {
    res.status(500).send({
        status: 500,
        message: "Not Implemented"
    });
});

export { app, port }
