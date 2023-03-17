import Student from "../models/student.js"

export async function createStudent(req,res){
   try{ 
    let courses_score = {
        React:req.body.React+'%',
        DSA:req.body.DSA+'%',
        WebD: req.body.WebD+'%'
    }
    let student = await Student.create({
        name:req.body.name,
        college:req.body.college,
        status:req.body.status,
        courses_score
    })
    return res.status(200).json({
        success:"Student Added successfully",
        student
    })
   }catch(err){
       console.log(err);
       return res.status(500).json({
        error:"Server Error"
       })
   }
}