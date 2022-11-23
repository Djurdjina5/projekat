const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema(
    {
        username:{type:String,required:true},
        email:{type: String, required:true},
        password:{type:String,required:true},
        fullname:{type:String,required:true},
        city:{type:String,required:true},
        type:{type:String,required:true},
        isAdmin:{type:Boolean,default:false},
        isActive:{type:Boolean,default: false},
        date:{type:Date, default: Date.now}
    }
);
module.exports=mongoose.model("user", UserSchema);