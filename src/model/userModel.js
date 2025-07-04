const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    firstname:{type:String,required:true},
    lastname:{type:String},
    username:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    phone:{type:Number,required:true,unique:true},
    password:{type:String,required:true},
    role:{type:String,enum:['admin','teacher',"student"]} 
})

const User=mongoose.model('User',userSchema)
module.exports=User