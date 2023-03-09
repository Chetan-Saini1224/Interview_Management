import{Schema,model,Types} from "mongoose";

const studentSchema = Schema({
    name:{
        type:String,
        required:true
    },
    college:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    courses:[{
        type: Types.ObjectId,
        ref:"Courses_Results"
    }] 
})


const Students = model("Students",studentSchema);

export default Students;