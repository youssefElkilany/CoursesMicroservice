import jwt from "jsonwebtoken";
import axios from "axios";
//import userModel from "../../DB/model/User.model.js";




const auth = (roles=[])=> {

    return async (req, res, next) => {
    try {
    //     const { authorization } = req.headers;
    //     if (!authorization?.startsWith(process.env.BEARER_KEY)) {
    //         return res.json({ message: "In-valid bearer key" })
    //     }
    //     const token = authorization.split(process.env.BEARER_KEY)[1]
    //     if (!token) {
    //         return res.json({ message: "In-valid token" })
    //     }
    //     const decoded = jwt.verify(token, process.env.TOKEN_SIGNATURE)
    //    // console.log(decoded)
    //     if (!decoded?._id) {
    //         return res.json({ message: "In-valid token payload" })
    //     }
        const userResponse = await axios.get(`http://127.0.0.1:8081/ejb8-1.0-SNAPSHOT/api/auth/Accounts`)
        const data = userResponse.data

        
        // const user = await userModel.findById(decoded._id).select('userName email role')
        // if (!user) {
        //     return res.json({ message: "Not register account" })
        // }
        let flag = false
        let user = {}
        for (const obj of data) {
            console.log({obj});
            // if(decoded._id == obj.id)
            //     {
            //         user = obj
            //         console.log({user});
            //         flag = true
            //         break
            //     }
            if(2 == obj.id)
                {
                    user = obj
                    console.log({user});
                    flag = true
                    break
                }
        } 
        if(!flag)
            {
                return res.json("id not found")
            }

        if(!roles.includes(user.role))
        {
            return res.json({ message: "u are not authorized" })
        }
        req.user = user;
        return next()
    } catch (error) {
        return res.json({ message: "Catch error" , err:error?.message })
    }
}
}
export default auth