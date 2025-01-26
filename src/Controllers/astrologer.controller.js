import astroModel from "../Models/astrologer.model.js";

export default class astroController {
   register(req, res) {
    try {
      const { name, email, password } = req.body;

      // Check for missing credentials
      if (!name || !email || !password) {
        return res.status(400).json({
          success: false,
          message: "Incomplete credentials",
        });
      }

      // Register the astrologer
      const newAstro =  astroModel.register(name, email, password);

      // Check if registration failed
      if (!newAstro) {
        return res.status(401).json({
          success: false,
          message: "Registration failed. Please try again.",
        });
      }

      // Successful registration response
      return res.status(201).json({
        success: true,
        message: "Astro Account created successfully",
        astro: newAstro,
      });
    } catch (error) {
      // Handle unexpected errors
      return res.status(500).json({
        success: false,
        message: error.message || "Internal server error",
      });
    }
  }

  login(req, res) {
    try {
      const { email, password } = req.body;
  
      // Check for missing credentials
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: "Incomplete credentials",
        });
      }
  
      // Validate user credentials (Assume `astroModel.login` returns null if invalid)
      const user = astroModel.login(email, password);
  
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password",
        });
      }
  
      // Successful login
      return res.status(200).json({
        success: true,
        message: "Logged in successfully",
        user,
      });
    } catch (error) {
      // Handle unexpected errors
      return res.status(500).json({
        success: false,
        message: error.message || "Internal server error",
      });
    }
  }
  

}
