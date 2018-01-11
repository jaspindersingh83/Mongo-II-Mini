const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const months = ['january','december']

const PersonSchema = new Schema ({
    password: {
      type: String,
      validate: passwordLengthValidator,
      msg:'password too short'
    },
    firstName: {
      type: String,
      required: true,
      index:true,
      lowercase: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,///creates an index automatically 
    },
    friends: [],
    age: {type: Number, min: 0, max:150},//new 
    gender: String,
    location: String,
    dateOfBirth: Date,
    workDay : {
      type: String,
      match: /(mon|tue|wednes|thurs|fri)day$/i,
      msg:'No work on weekends, no slaving'
    },//new
    months:{
      type:String,
      enum: months
    }//new
},{runSettersOnQuery:true})///new;

//Custom Validators
function passwordLengthValidator(password){
  return password.length >=8;
}

//Virtuals used when we don't want to save Fullname persistent in db.
PersonSchema.virtual('fullname').get(function(){
  return `${this.firstName} ${this.lastName}`
})
//If we are getting Full Name from user
PersonSchema.virtual('fullname').set(function(name){
  this.first = name.split(' ')[0];
  this.last = name.split(' ')[1];
})
//two types of indexes
  //path level : index: true;
  //schema level : used for compound indexes 
  PersonSchema.index({firstName:1,lastName:1})

module.exports = mongoose.model('Person', PersonSchema);
