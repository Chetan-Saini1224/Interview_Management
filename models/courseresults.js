import mongoose from "mongoose";

const courseResultSchema = mongoose.Schema({
    student:{
        type:mongoose.Types.ObjectId,
        ref:'Students'
    },
    course:{
        type:mongoose.Types.ObjectId,
        ref:'Courses'
    },
    score:{
        type:String,
        required:true
    } 
})


const Courses_Results = mongoose.model("Courses_Results",courseResultSchema);

export default Courses_Results;