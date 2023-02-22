import mongoose from "mongoose";

const permissionSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Types.ObjectId

    },
    permissionId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"SeedData"
    }
},{ versionKey: false })

var permission = mongoose.model('Permission',permissionSchema);

export default permission;