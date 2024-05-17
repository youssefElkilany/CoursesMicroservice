import axios, { formToJSON } from "axios";
import courseModel from "../../../../DB/courseModel.js";
import jwt from "jsonwebtoken"






// export const createCourse = async (req, res, next) => {
//     try {
//         const {id} = req.user
//         const userResponse = await axios.get(`http://127.0.0.1:8081/ejb8-1.0-SNAPSHOT/api/auth/Accounts`)
//         // const userResponse = await axios.get(`http://127.0.0.1:8081/ejb8-1.0-SNAPSHOT/api/hello-world`);
//        // const userResponse = await axios.get(`http://localhost:8081/ejb8-1.0-SNAPSHOT/api/hello-world`);
//         // Extract relevant data from the response, if needed
//        // const responseData = userResponse.data;
//        // console.log(responseData.id);
//       // console.log({id});
//         return res.send(userResponse.data);
//     } catch (error) {
//         // Handle error
//         console.error('Error calling Java EE service:', error);
//         return res.status(500).json({ error: 'Internal Server Error' });
//     }
// };




export const createCourse = async (req, res, next) => {
  
    const {name,duration,capacity,category} = req.body
    const {id} = req.user
    // elmfrood ageeb id mn java ee
    console.log({name,id,capacity});
    
    const findCourse = await courseModel.findOne({name,instructorId:id})
    if(findCourse)
        {
            return res.json("course already exist")
        }
        //23ml validation 3la duration w capacity

        const createCourse = await courseModel.create({name,instructorId:id,category,capacity,duration})
        if(!createCourse)
            {
                return res.json("nothing added")
            }
           return res.json({MSG:"added successfully"})

}


export const getInstructorCourses = async(req,res,next)=>{

    //instructor id mn authentication
    const {id} = req.user
    console.log({id})

    const courses = await courseModel.find({instructorId:id})
    if(!courses)
        {
            return res.json("no available courses")
        }

        return res.json({courses})

}

// export const searchInstructorCourses = async(req,res,next)=>{

//     const {name,category} = req.body
//    // const {id} = req.user

//     const searchCourse = await courseModel.find({name,$or:{category}}) // na2es id of instructor
//     if(!searchCourse)
//         {
//             return res.json("no available courses")
//         }

//         return res.json({searchCourse})

// }

export const searchInstructorCourses = async (req, res, next) => {
    const { name, category } = req.query

    // Define the search criteria based on name and/or category
    const searchCriteria = {
        instructorId : req.user.id
    }
    if (name) {
        searchCriteria.name = { $regex: name, $options: 'i' }; // Partial match search for name
    }
    if (category) {
        searchCriteria.category = { $regex: name, $options: 'i' } // Exact match for category
    }
    else{
        return res.json({MSG:"no courses found"})
    }

    try {
        // Search for courses based on the provided criteria
        const courses = await courseModel.find(searchCriteria);

        // if (searchCourse.length === 0) {
        //     // If no courses are found, return an appropriate response
        //     return res.json({ message: "No available courses" });
        // }

        // If courses are found, return them in the response
        return res.json({ courses });
    } catch (error) {
        // If an error occurs during the search, pass it to the error handler middleware
        return next(error);
    }
};


export const sortCourses = async(req,res,next)=>{

   // const {name,category} = req.user

    const searchCourse = await courseModel.find({instructorId:req.user.id}).sort({rating:-1})
    if(!searchCourse)
        {
            return res.json("no available courses")
        }

        return res.json({searchCourse})

}

// for student
export const publishedCourses = async(req,res,next)=>{


    const courses = await courseModel.find({published:true})
    if(!courses)
        {
            return res.json("no available courses")
        }

        return res.json({courses})

}

 // student
export const searchpublishedCourses = async (req, res, next) => {
    const { name, category } = req.query;

    // Define the search criteria based on name and/or category
    const searchCriteria = {
        published: true // Only search for published courses
    };
    if (name) {
        searchCriteria.name = { $regex: name, $options: 'i' } // Partial match search for name
    }
   else if (category) {
        searchCriteria.category ={ $regex: category, $options: 'i' } // Exact match for category
    }
    else{
        return res.json({MSG:"no courses found"})
    }
    
    

    try {
        // Search for courses based on the provided criteria
        const searchCourse = await courseModel.find(searchCriteria);
        if(!searchCourse)
            {
                return res.json({MSG:"no courses found with this criteria"})
            }

        // if (searchCourse.length === 0) {
        //     // If no courses are found, return an appropriate response
        //     return res.json({ message: "No available courses" });
        // }

        // If courses are found, return them in the response
        return res.json({ searchCourse });
    } catch (error) {
        // If an error occurs during the search, pass it to the error handler middleware
        return next(error);
    }
};


///////////////////////////  admin //////////////////////////////////////

// for admin
export const AllCourses = async(req,res,next)=>{


    const courses = await courseModel.find()
    if(!courses)
        {
            return res.json("no available courses")
        }

        return res.json({courses})

}


export const removeCourses = async(req,res,next)=>{

    const {id} = req.user
    const {courseId} = req.params

    const deleteCourse = await courseModel.findByIdAndDelete({_id:courseId})
    if(!deleteCourse)
        {
            return res.json({MSG:"no course deleted"})
        }
        const userResponse = await axios.delete(`http://localhost:3000/enrollment/del/${courseId}`)
        console.log({respnse:userResponse.data})

       return res.json({MSg:"course deleted"})
}

export const editCourses = async(req,res,next)=>{

    const id = req.user
    const {courseId} = req.params
    const {name,duration,category,capacity,published} = req.body

    // 23ml edit fel enrollment
    const course = await courseModel.findById(courseId)
    if(!course)
        {
            return res.json({MSG:"no course found"})
        }
    if(name)
    {
        course.name = name
      await  course.save()
        const userResponse = await axios.put(`http://localhost:3000/enrollment/edit/${courseId}/${name}`) // edit name bas
    console.log({response:userResponse.data})
    }
    if(duration)
    {
        
    }
    if(capacity)
    {
        if(capacity < course.enrolledStudents)
            {
                return res.json({MSG:"capacity cant be less than enrolledStudents "})
            }
        course.capacity = capacity
       await course.save()
    }
    if(category)
    {
        course.category = category
       await course.save()
    }
    // if(published)
    // {
    //     course.published = published // nzbtha b3deen nsheel documents mn enrollemts
    //     course.save()
    // }

    return res.json({MSG:"course updated",course})
    
}

// make course publish


export const publishCourse = async (req,res,next)=>{

    const {courseId} = req.params
    const updateCourse = await courseModel.findByIdAndUpdate({_id:courseId},{published:true},{new:true})
    if(!updateCourse)
        {
            return res.json("nothing found to update")
        }

        return res.json({Course:updateCourse})
}



///////// api for microservices ///////////////////////////

export const publishedCoursesMicro = async(req,res,next)=>{


    const courses = await courseModel.find({published:true})
    if(!courses)
        {
            return res.json("no available courses")
        }

        return res.json({courses})

}

export const enrolledNumMicro = async(req,res,next)=>{

    const {courseId} = req.body
    console.log({courseId})
    const courses = await courseModel.findById(courseId)
    if(!courses)
        {
            return res.json("no available courses")
        }
        console.log("gg")
        courses.enrolledStudents = Number(courses.enrolledStudents) - 1
        courses.save()

        return res.json({courses})

}

export const enrolledNumMicro2 = async(req,res,next)=>{

    const {courseId} = req.body
    console.log({courseId})
    const courses = await courseModel.findById(courseId)
    if(!courses)
        {
            return res.json("no available courses")
        }
        console.log("gg")
        courses.enrolledStudents = Number(courses.enrolledStudents) + 1
        courses.save()

        return res.json({courses})

}

export const addReview = async(req,res,next)=>{
    const {comment,rating} = req.body
    const {courseId} = req.params

    const findCourse = await courseModel.findById(courseId)
    if(!findCourse)
        {
            return res.json("no courses found")
        }

        const userResponse = await axios.get(`http://localhost:3000/enrollment/all`)
        const data = userResponse.data.allEnrollment
        console.log({data})
        let flag = false
        let enrollment = {}
        for (const obj of data) {
            if( courseId == obj.courseId  && obj.status == "accepted" && obj.studentId == req.user.id)
                {
                    enrollment = obj
                    flag = true
                    break
                }
        }
    
        if(!flag)
            {
                return res.json("course not found")
            }

            // const updateCourse = await courseModel.findByIdAndUpdate({_id:courseId},{$addToSet:{
            //     reviews:{
            //         studentId:req.user.id,
            //         comment
            //     }
            // }},{new:true})

            // const updateCourse = await courseModel.findByIdAndUpdate({_id:courseId},{$addToSet:{
            //     'reviews.studentId':req.user.id,
            //         'reviews.comment':comment
            //     }
            // },{new:true})

            const updateCourse = await courseModel.findOne({_id:courseId,'reviews.studentId':req.user.id})
    if(!updateCourse)
        {
            const pushReview = await courseModel.findOneAndUpdate({_id:courseId},{$push:{
                reviews:{
                    studentId:req.user.id,
                    comment,
                    rating
                } // nb2a nshoof 7war avg rate b3deen
            }},{new:true})
            if(!pushReview)
                {
                    return res.json({MSG:"nothing updated"})
                }
            let oldAvg = pushReview.avgRate
    let rateNo = pushReview.rateNo
    let sum = oldAvg * rateNo + rating
    pushReview.avgRate = sum / (rateNo+1) 
    pushReview.rateNo = rateNo+1 

    pushReview.save()
            return res.json({MSG:"updated",pushReview})
        }

        let oldRating = 0
        for (const reviews of updateCourse.reviews) {
            if(req.user.id == reviews.studentId)
                {
                    oldRating = reviews.rating
                    break
                }
        }

        let oldsum = (updateCourse.avgRate * updateCourse.rateNo) - oldRating
        
        const updateComment = await courseModel.findOneAndUpdate({_id:courseId,'reviews.studentId':req.user.id},{$set:{
            reviews:{
                studentId:req.user.id,
                comment,
                rating
            }
        }},{new:true})
        if(!updateComment)
            {
                return res.json({MSG:"nothing updated"})
            }

            let newsum = oldsum + rating
            updateComment.avgRate = newsum / updateComment.rateNo
            updateComment.save()

   // return res.json({MSG:"commentUpdated",updateCourse})
        return res.json({MSG:"commentUpdated",updateComment})

}


export const tokenCreation = async (req,res,next)=>{
    const {email,password} = req.body

    const userResponse = await axios.post(`http://127.0.0.1:8081/ejb8-1.0-SNAPSHOT/api/auth/signin`,{email,password})
    if(!email || !password)
        {
            return res.json("u need to fullfill email and password first")
        }
    const data = userResponse.data
    console.log({data})

     const token = jwt.sign({id:data.id,email:data.email},'secret')

     return res.json({MSG:"token created MR HOSS",token,role:data.role,name:data.name})
}

export const sumOfCourses = async (req,res,next)=>{

   // const {courseId} = req.params

    const courses = await courseModel.find().countDocuments()
    if(!courses)
        {
            return res.json({MSG:"didnt find courses"})
        }

        return res.json({ MSG: "totalCourses in system", courses });
}


export const coursesPopularity = async (req,res,next)=>{

   const {key} = req.query
   console.log({key})
   let picked = {}
   if(key == "enrolledStudents")
    {
        picked = {enrolledStudents:-1}
    }
   else if(key == "avgRate")
        {
            picked = {avgRate:-1}
        }
       else if(key == "capacity")
            {
                picked = {capacity:-1}
            }
            else{
                return res.json({MSG:"key not found"})
            }
            console.log({picked})
 
     const findCourse = await courseModel.find().sort(picked)
     if(!findCourse)
         {
             return res.json({MSG:"didnt find courses"})
         }
 
         return res.json({ MSG: "Most Popular courses", findCourse });
 }