import Interviews from "../models/interviews.js"
import moment from "moment/moment.js";
import Students from "../models/student.js";
import Scheduled_Interviews from "../models/scheduled_interviews.js";
import json2csv from "json2csv";        

export async function index(req,res) 
{
    try{
        let interviews = await Interviews.find({});
        let students = await Students.find({});
        let dates = interviews.map( (val) => {
            return moment.utc(val.date).format("MMM Do, YYYY");
        })
        return res.render("interview",{
            title:"Create Inteviews",
            interviews,
            dates,
            students
        });
    }
    catch(err){
        req.flash("error","Server error");
        return res.render("interview",{title:"Create Inteviews"});
    }
}

export async function createInterview(req,res)
{
   try{ 
    let interview = await Interviews.create(req.body);
    let date = moment.utc(interview.date).format("MMM Do, YYYY");
    let students = await Students.find({});
    return res.status(200).json({
        success:"Interview Added successfully",
        interview,
        date,
        students
    })
   }catch(err){
       console.log(err);
       return res.status(500).json({
        error:"Server Error"
       })
   }
}


export async function allocateInterview(req,res){
       try
       { 
            req.body.result = "pending"
            await Scheduled_Interviews.create(req.body);
            await Interviews.findOneAndUpdate(
                {_id:req.body.interview},
                { $push : { "students": req.body.student }
            });
            return res.status(200).json({
                success:"Interview Allocated Successfully",
            });
       }
       catch(err)
       {
        console.log(err);
        return res.status(500).json({
            error:"Server Error"
        })
       }
}


export async function scheduledInterviews(req,res)
{
    try
    {
        let interviews = await Interviews.find({});
        let dates = interviews.map( (val) => {
            return moment.utc(val.date).format("MMM Do, YYYY");
        })
        return res.render("scheduled_interviews",{
            title:"Scheduled Interviews",
            interviews,
            dates
        });
    }
    catch(err)
    {
        req.flash("error","Server Error");
        return res.redirect("back"); 
    }
}

export async function getSchedled(req,res) 
{
    try
    {
        let interviews = await Scheduled_Interviews.find({interview:req.body.interview}).populate("interview").populate("student");
        let dates = interviews.map( (val) => {
            return moment.utc(val.interview.date).format("MMM Do, YYYY");
        })
        return res.status(200).json({
            interviews,
            dates
        });
    }
    catch(err)
    {
        req.flash("error","Server Error");
        return res.redirect("back"); 
    }
}

export async function changeStatus(req,res) 
{
    try{
       let {id,status} = req.body;
      let schuInter = await Scheduled_Interviews.findById(id).populate("student");
      schuInter.result = status;
      if(status == "cleared")
      { 
        schuInter.student.status = "placed"
        schuInter.student.save();
      }
      schuInter.save();
       
       return res.status(200).json({
        success:"Status Changed Successfully"
       }); 
    } 
    catch(err){
        console.log(err);
        return res.status(200).json({
            error:"Server Error..."
        });
    }
}


export async function downloadCSV(req,res)
{
    try
    {
        let data = await Scheduled_Interviews.find({}).populate("interview",).populate("student");
        let csvData = data.map((val) => {
            return  {
                Student_Id: val.student._id,
                Student_Name: val.student.name,
                Student_College: val.student.college,
                Student_Status: val.student.status,
                DSA_Final_Score: val.student.courses_score.React,
                WebD_Final_Score: val.student.courses_score.WebD,
                React_Final_Score: val.student.courses_score.React,
                Interview_Date: val.interview.date,
                Interview_Company: val.interview.company_name,
                Interview_Student_result: val.result  
            }
        }) 
        const csvString = json2csv.parse(csvData);
        res.setHeader('Content-disposition', 'attachment; filename=Scheduled_Interviews.csv');
        res.set('Content-Type', 'text/csv');
        res.status(200).send(csvString);
    }
    catch(err)
    {
        console.log(err);
        return res.redirect("back");
    }
}