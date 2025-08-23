import jwt from "jsonwebtoken";

export const authHandler = async(req,res,next) => {
     try {
          // console.log("Cookies -: ",req.cookies)
          // console.log("Token -: ",req.cookies.token)
          const token = req.cookies.token;

          if(!token){
               return res.status(401).json({
                    success:false,
                    message:"unauthorized user..."
               })
          }

          const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);

          req.user = decoded.userId;

          next();
     } catch (err) {
          res.status(500).json({
               success:false,
               message:err.message
          })
     }
}