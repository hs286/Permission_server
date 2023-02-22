import mongoose from "mongoose";

const seedSchema=new mongoose.Schema({
    type:{
        type:String,
        required:true,
    }
},{ versionKey: false })

var seedData = mongoose.model('SeedData',seedSchema);

export default seedData;

