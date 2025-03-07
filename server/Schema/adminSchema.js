const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = Schema({
  "username": {
    type : String, 
    unique : true,
  } ,
  "password": String,
})


module.exports = mongoose.model('admin', adminSchema);
