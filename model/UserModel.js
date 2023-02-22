//bioModel.js
import mongoose from "mongoose";

//schema
const bioSchema = new mongoose.Schema({

  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,    
  },
  age: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role:{
    type:String,
    required:true
  },
  
},{ versionKey: false });

// Export Bio Model
var Users = mongoose.model("registerUsers", bioSchema);

export default Users;
