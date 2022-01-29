const mongoose = require('mongoose');
const {
  BlogItem
} = require(__dirname + '/schema.js')

async function addBlog(blogName, blogBody) {
  try {
    await mongoose.connect('mongodb://localhost:27017/blogDB');
    await BlogItem.create({
      name: blogName,
      body: blogBody
    })
  } catch (e) {
    console.log(e);
  } finally {
    mongoose.disconnect();
  }
}

async function findBlog(nameParam) {
  try {
    await mongoose.connect('mongodb://localhost:27017/blogDB');
    const result = await BlogItem.find(nameParam);
    return result;
  } catch (e) {
    console.log(e);
  } finally {
    mongoose.disconnect();
  }
}

async function deleteBlogById(idParam) {
  try {
    await mongoose.connect('mongodb://localhost:27017/blogDB');
    await BlogItem.deleteOne({
      _id: idParam
    })
  } catch (e) {
    console.log(e);
  } finally {
    mongoose.disconnect();
  }
}

module.exports = {
  addBlog,
  findBlog,
  deleteBlogById
};