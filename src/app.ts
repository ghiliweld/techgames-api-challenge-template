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

// TODO: do typescript
// TODO: status codes

app.post('/articles', function (req, res) {
  try {
    let { title, subtitle, body, author } = req;
    // TODO: implement ID
    res.send({
      _id,
      title,
      subtitle,
      body,
      author
    });
  } catch (error) {
    // TODO: errors
  }
})

app.put('/articles/{articleId}', function (req, res) {
  try {
    let { title, subtitle, body, author } = req;
    // TODO: implement ID
    // TODO: and do DB things
    res.send({
      _id,
      title,
      subtitle,
      body,
      author
    });
  } catch (error) {
    // TODO: errors
  }
})

app.delete('/articles/{articleId}', function (req, res) {
  try {
    // TODO: fetch article
    res.send({
      _id,
      title,
      subtitle,
      body,
      author
    });
  } catch (error) {
    // a num but doesn't exist so return 404 or...
    // NaN so return 400
  }
})

app.get('/status', function (req, res) {
  res.send({
    status : "Up"
  });
})

app.use((req: Request, res: Response) => {
    res.status(500).send({
        status: 500,
        message: "Not Implemented"
    });
});

export { app, port }
