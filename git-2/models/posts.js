const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const blogSchema = new Schema({
    title: {type: String, required: true},
    body: {type: String, required: true},
    image:{type:String,required:true},
    user: {type: ObjectId, ref: "User"}
}, {timestamps : true});

const blogModel = mongoose.model('Blog', blogSchema);

module.exports = blogModel;

