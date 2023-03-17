import mongoose, { Types } from "mongoose";

const interviewSchema = mongoose.Schema({
    company_name:{
        type:String,
        required:true
    },
    date:{
        type: Date,
        required:true
    },
    role:{
        type:String,
        required:true
    },
    students:[
        {
            type:Types.ObjectId,
            ref:'Students'
        }
    ]
},{
    timestamps:true
})


const Interviews = mongoose.model("Interviews",interviewSchema);

export default Interviews;