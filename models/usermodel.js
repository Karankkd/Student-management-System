import { name } from "ejs";
import mongoose from "mongoose";


const usershcema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true
    },

    phone:{
        type:Number,
        required:true
    },

    password:{
        type:String,
        required:true
    },

    image:{
        type:String,
        required:true
    },

    is_admin:{
        type:Number,
        default:0
    },

    is_verified:{
        type:Number,
        default:0
    },
})


export default mongoose.model('user' , usershcema)