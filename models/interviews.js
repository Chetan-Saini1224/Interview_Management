import mongoose from "mongoose";

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
    } 
})


const Interviews = mongoose.model("Interviews",interviewSchema);

export default Interviews;