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
              // if user will be google user then password>required>false, otherwise required>true
          }
     },
     isGoogleUser:{
          type:Boolean,
          default:false, // if user will not login with google than password field will be required, otherwise password will not be required
     },
     cartDate:{
          type:Object,
          default:{}
     }
},{timestamps:true,minimize:false});

export const userModel = mongoose.model("User",userSchema)