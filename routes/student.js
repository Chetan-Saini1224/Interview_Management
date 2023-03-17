import express from "express";
import {createStudent} from "../controllers/studentcontroller.js"
import passport from "../config/local_passport_auth.js";

const router = express.Router();

router.post("/create_student",passport.checkAuthentication,createStudent);

export default router;