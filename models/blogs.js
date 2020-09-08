var mongoose = require("mongoose");
var blogSchema = new mongoose.Schema({
    name: String,
    price: String,
    image: { 
        data: Buffer, 
        contentType: String 
    },
    description: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

var Blog = mongoose.model("Blog", blogSchema);

module.exports = mongoose.model("Blog", blogSchema);