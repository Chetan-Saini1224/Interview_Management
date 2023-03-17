import{Schema,model,Types} from "mongoose";

const courseSchema = Schema({
    React:{
        type:String,
        required:true
    },
    DSA:{
        type:String,
        required:true
    },
    WebD:{
        type:String,
        required:true
    }
})

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
    courses_score: courseSchema
},{
    timestamps:true
})


const Students = model("Students",studentSchema);

export default Students;