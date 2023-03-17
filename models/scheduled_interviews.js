import mongoose from "mongoose";

const scheduledInterviewSchema = mongoose.Schema({
    student:{
        type:mongoose.Types.ObjectId,
        ref:'Students',
        required:true
    },
    interview:{
        type:mongoose.Types.ObjectId,
        ref:'Interviews',
        required:true
    },
    result:{
        type:String,
        required:true
    } 
},{
    timestamps:true
})


const Scheduled_Interviews = mongoose.model("Scheduled_Interviews",scheduledInterviewSchema);

export default Scheduled_Interviews;