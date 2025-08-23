import jwt from "jsonwebtoken"

export const genToken = async(userId) => {
     try {
          const token = await jwt.sign({userId},process.env.JWT_SECRET_KEY,{
               expiresIn:"7d"
          })

          return token;
     } catch (err) {
          console.log("Gen Token Error -: ",err.message)
          throw new Error(err.message)
     }
}