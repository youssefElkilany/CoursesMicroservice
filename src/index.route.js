import courseRouter from "../src/Modules/Courses/courses.route.js"
//import cors from "cors"
 const bootstrap = (express ,app)=>{

   // app.use(cors())
   // app.use(express.json())
    app.use("/courses",courseRouter)
}

export default bootstrap