const {Schema,model} = require("mongoose");
const validator =require("validator")
const registation = new Schema({
   
   first_name:{
        type:String,
        trim:true,
        required:[true,'first name is not required!'],
    },
   last_name:{
        type:String,
        trim:true,
        required:[true,'last name is not required!'],
    },
    email:{
        type:String,
        trim:true,
        unique:true,
        lowercase:true,
       required:[true, 'email is required!']
    },
    country:{
        type:String,
        trim:true,
        required:[true,'country is not required!'],
    },
    state:{
        type:String,
        trim:true,
        required:[true,'state is not required!'],
    },
    city:{
        type:String,
        trim:true,
        required:[true,'city is not required!'],
    },
    age:{
        type:Number,
        trim:true,
        required:[true,'age is not required!'],
    },
    gender:{
        type:String,
        trim:true,
        required:[true,'gender is not required!'],
    },
    date_of_birth:{
        type:String,
        trim:true,
        index:true,
        default:""
    },
  
   
},
{timestamps: true}
)
const Registation  = model("registation ",registation );
module.exports = Registation;