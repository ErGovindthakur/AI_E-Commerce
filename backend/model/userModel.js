import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
     name:{
          type:String,
          required:true
     },
     email:{
          type:String,
          required:true,
          unique:true
     },
     password:{
          type:String,
          required:function(){
              return !this.isGoogleUser
          }
     },
     isGoogleUser:{
          type:Boolean,
          default:false
     },
     cartDate:{
          type:Object,
          default:{}
     }
},{timestamps:true,minimize:false});

export const userModel = mongoose.model("User",userSchema)