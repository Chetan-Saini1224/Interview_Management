import Student from "../models/student.js"

export async function index(req,res) 
{
    try{
        let students = await Student.find({}); 
        return res.render("home",{title:"Home",students});
    }
    catch(err){
        req.flash("error","Server error");
        return res.render("home",{title:"Home"});
    }
}