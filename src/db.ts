
import mongoose from "mongoose";

const articleSchema = new mongoose.Schema({
    title : String,
    subtitle : String,
    body : String,
    author : String
});

export const Model = mongoose.model("Article", articleSchema);
