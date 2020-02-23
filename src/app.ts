import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import { Application, Request, Response } from "express";
import Model from "/db.js";

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

/// GET

app.get('/articles', function (req: Request, res: Response) {
  // TODO: fetch article from db
  let doc = Model.findById(id) || []
  if (doc == []) {
    res.status(200).send([]);
  } else {
    res.status(200).send({
      doc._id,
      doc.title,
      doc.subtitle,
      doc.body,
      doc.author
    });
  }
})

app.get('/articles/:articleId', function (req: Request, res: Response) {
  try {
    let id = req.param('articleId')
    if (id instanceof NaN) throw new Error('Invalid ID')
    // TODO: fetch article from db
    let doc = Model.findById(id)
    res.status(200).send({
      doc._id,
      doc.title,
      doc.subtitle,
      doc.body,
      doc.author
    });

  } catch (error) {
    if (error == 'Invalid ID') {
      res.status(400).send({
          status: 400,
          message: "articleId is an invalid id"
      });
    } else {
      res.status(404).send({
          status: 404,
          message: "Article does not exist"
      });
    }
  }
})


/// POST
app.post('/articles', function (req: Request, res: Response) {
  try {
    let doc = new Model(req);
    doc.save();

    res.status(200).send({
      doc._id,
      doc.title,
      doc.subtitle,
      doc.body,
      doc.author
    });
  } catch (error) {
    res.status(400).send({
        status: 400,
        message: "Parameter missing from request body"
    });
  }
})

/// PUT
app.put('/articles/:articleId', function (req: Request, res: Response) {
  try {
    let id = req.param('articleId')

    Model.updateOne({ _id: id }, req, function(err) {
      // Updated at most one doc, `res.modifiedCount` contains the number
      // of docs that MongoDB updated
      if (err) throw new Error();

    });

    res.status(200).send({
      _id,
      title,
      subtitle,
      body,
      author
    });
  } catch (error) {
    res.status(400).send({
        status: 400,
        message: "Parameter missing from request body"
    });
  }
})

/// DELETE
app.delete('/articles/:articleId', function (req: Request, res: Response) {
  try {
    let id = req.param('articleId')
    if (!(id instanceof ObjectID)) throw new Error('Invalid ID')

    let doc = Model.findById(id)
    Model.deleteOne({ _id: id });

    res.status(200).send({
      doc._id,
      doc.title,
      doc.subtitle,
      doc.body,
      doc.author
    });
  } catch (error) {
    if (error == 'Invalid ID') {
      res.status(400).send({
          status: 400,
          message: "articleId is an invalid id"
      });
    } else {
      res.status(404).send({
          status: 404,
          message: "Article does not exist"
      });
    }
  }
})

app.get('/status', function (req: Request, res: Response) {
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
