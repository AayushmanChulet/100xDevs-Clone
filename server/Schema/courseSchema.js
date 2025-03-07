const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = Schema({
  title: String, 
  description: String, 
  price: Number, 
  imageLink: String, 
  published: Boolean 
})


module.exports = mongoose.model('courses', courseSchema);