import { app, port } from "./app";
import mongoose from "mongoose";

let dbUrl = "";

(process.env.DB_URL)
    ? dbUrl = process.env.DB_URL
    : dbUrl = "mongodb://mongo:27017/techgames-template";

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});
mongoose.set("useCreateIndex", true);

const server = app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`Server started at http://localhost:${port}`);
});

export { server };
