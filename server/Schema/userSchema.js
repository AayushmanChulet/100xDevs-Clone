const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema({
  username: {
    type : String, 
    unique : true,
  } ,
  password: String,
  coursesAccess : [{
    type : Schema.Types.ObjectId,
    ref : 'courses'
  }]
})


module.exports = mongoose.model('user', userSchema);
