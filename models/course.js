import mongoose from "mongoose";

const courseSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    }
})


const Course = mongoose.model("Courses",courseSchema);

export default Course;