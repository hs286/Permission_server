//bioModel.js
import mongoose from "mongoose";
//schema
const bioSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true
    },
    userRole: {
        type: String,
         required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'registerUsers'
    },
    myFile:{
        type:String,
        required:true,
    },
},{versionKey:false});

// Export Bio Model
var Assignments = mongoose.model('registerAssignments', bioSchema);

export default Assignments;
