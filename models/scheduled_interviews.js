import mongoose from "mongoose";

const scheduledInterviewSchema = mongoose.Schema({
    student:{
        type:mongoose.Types.ObjectId,
        ref:'Students'
    },
    interview:{
        type:mongoose.Types.ObjectId,
        ref:'Interviews'
    },
    result:{
        type:String,
        required:true
    } 
})


const Scheduled_Interviews = mongoose.model("Scheduled_Interviews",scheduledInterviewSchema);

export default Scheduled_Interviews;