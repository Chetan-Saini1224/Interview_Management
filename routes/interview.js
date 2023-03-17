import express from "express";
import {downloadCSV,changeStatus,getSchedled,scheduledInterviews,allocateInterview,createInterview,index} from "../controllers/interviewcontroller.js"
import passport from "../config/local_passport_auth.js";

const router = express.Router();

router.get("/create",passport.checkAuthentication,index);
router.get("/scheduled",scheduledInterviews);
router.post("/create",passport.checkAuthentication,createInterview);
router.post("/allocate",passport.checkAuthentication,allocateInterview);
router.post("/getschedled",passport.checkAuthentication,getSchedled);
router.post("/changestatus",passport.checkAuthentication,changeStatus);
router.get("/downloadcsv",passport.checkAuthentication,downloadCSV);
export default router;