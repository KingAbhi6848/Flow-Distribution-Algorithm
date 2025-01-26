import UserModel from "../Models/user.model.js";

export default class UserController {
   register(req, res) {
    try {
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        return res.status(400).json({
          success: false,
          message: "Incomplete credentials",
        });
      }

      const newUser =  UserModel.register(name, email, password);

      if (!newUser) {
        return res.status(401).json({
          success: false,
          message: "Unable to create account. Please try again.",
        });
      }

      return res.status(201).json({
        success: true,
        message: "Account created successfully",
        user: newUser,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message || "Internal server error",
      });
    }
  }

   login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: "Incomplete details",
        });
      }

      const user =  UserModel.login(email, password);

      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Invalid credentials",
        });
      }

      req.session.user = {id:user.id, email: user.email, name: user.name };


      return res.status(200).json({
        success: true,
        message: "Logged in successfully",
        user,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message || "Internal server error",
      });
    }
  }

  logout(req, res) {
    try {
      // Destroy the session
      req.session.destroy((err) => {
        if (err) {
          return res.status(500).json({
            success: false,
            message: "Failed to log out. Please try again.",
          });
        }
  
        return res.status(200).json({
          success: true,
          message: "Logged out successfully.",
        });
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message || "Internal server error",
      });
    }
  }

  home(req,res){
    return res.status(200).send({
      success:true,
      message:"This is homepage",

    })
  }
  
}
