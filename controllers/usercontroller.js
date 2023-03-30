import User from "../models/user.js";

export function signUp(req, res) {
  return res.render("signup", { title: "Create Account" });
}

export function signIn(req, res) {
  return res.render("login", { title: "Login Page" });
}

export async function createAccount(req, res) {
  try {
    console.log(req.body);
    const exist = await User.findOne({ email: req.body.email });
    if (!exist) {
      await User.create(req.body);
      return res.status(200).json({
        success: "User Created",
        location: "/user/login",
      });
    } else {
      return res.status(200).json({
        success: "User Already exist..",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "Server Error....",
    });
  }
}

export function loginUser(req, res) {
  return res.redirect("/");
}

export function logOut(req, res) {
  //passport give this function to req
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.flash("success", "You have logged out!");

    //we can also send context like logout successfully.but eeeee...
    res.redirect("/");
  });
}
