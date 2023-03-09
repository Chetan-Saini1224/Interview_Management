import express from "express"
import passport from "passport";

import {logOut,loginUser,signIn,signUp,createAccount} from "../controllers/usercontroller.js"
const router = express.Router();

router.get("/signup",signUp);
router.post("/signup",createAccount);


router.get("/login",signIn);
router.post("/login",passport.authenticate('local',
{ failureRedirect: '/user/login' }),
loginUser);
router.get("/logout",logOut);




export default router;