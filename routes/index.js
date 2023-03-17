import express from "express";
import {index} from "../controllers/homecontroller.js"
import userRouter from "./users.js";
import studentRouter from "./student.js";
import interviewRouter from "./interview.js" 
import passport from "../config/local_passport_auth.js";

const router = express.Router();

router.get("/",passport.checkAuthentication,index);
router.use("/user",userRouter);
router.use("/student",studentRouter);
router.use("/interview",interviewRouter);

export default router;