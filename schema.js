const mongoose = require('mongoose');

const blogItemSchema = new mongoose.Schema({
  name: String,
  body: String
})

const BlogItem = new mongoose.model('BlogItem', blogItemSchema);


module.exports = {
  BlogItem
}