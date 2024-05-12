// const userResponse = await axios.get(`http://localhost:8080/ejb8-1.0-SNAPSHOT/api/auth/Accounts`);
// const userData = userResponse.data;

import axios, { formToJSON } from "axios";
import courseModel from "../../../../DB/courseModel.js";
import { json } from "express";


//import http from 'http';

// Define the options for the HTTP request
// const options = {
//   hostname: 'localhost',
//   port: 8080, // Replace with the actual port of your Java EE API
//   path: 'ejb8-1.0-SNAPSHOT/api/hello-world',
//   method: 'GET',
// };

// // Make the HTTP request
// const req = http.request(options, (res) => {
//   let data = '';

//   // A chunk of data has been received.
//   res.on('data', (chunk) => {
//     data += chunk;
//   });

//   // The whole response has been received.
//   res.on('end', () => {
//     console.log('Response data:', data);
//   });
// });

// // Handle errors
// req.on('error', (error) => {
//   console.error('Error:', error);
// });

// // End the request
// req.end();


// export const createCourse =  async(req,res,next)=>{

//     const userResponse = await axios.get(`http://localhost:8080/ejb8-1.0-SNAPSHOT/api/hello-world`);
//     // console.log(userResponse.status)
//     // console.log(userResponse.data)
//     // console.log(userResponse.headers)
//    return res.json(userResponse)
// // axios.get('http://localhost:8080/ejb8-1.0-SNAPSHOT/api/hello-world')
// //   .then(response => {
// //     // Handle successful response from Java EE service

// //     console.log({response:response.data});
// //     //return res.status(200).json(response)
// //   })
// //   .catch(error => {
// //     // Handle error
// //    console.log();('Error calling Java EE service:', error);
// //   });
// // //return res.json("Gg");
// return res.json({courses:"all courses"})
// }





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
    const { name, category } = req.params;

    // Define the search criteria based on name and/or category
    const searchCriteria = {
        instructorId : req.user.id
    };
    if (name) {
        searchCriteria.name = { $regex: name, $options: 'i' }; // Partial match search for name
    }
    if (category) {
        searchCriteria.category = category; // Exact match for category
    }

    try {
        // Search for courses based on the provided criteria
        const searchCourse = await courseModel.find(searchCriteria);

        if (searchCourse.length === 0) {
            // If no courses are found, return an appropriate response
            return res.json({ message: "No available courses" });
        }

        // If courses are found, return them in the response
        return res.json({ searchCourse });
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
    const { name, category } = req.params;

    // Define the search criteria based on name and/or category
    const searchCriteria = {
        published: true // Only search for published courses
    };
    if (name) {
        searchCriteria.name = { $regex: name, $options: 'i' }; // Partial match search for name
    }
    if (category) {
        searchCriteria.category = category; // Exact match for category
    }

    try {
        // Search for courses based on the provided criteria
        const searchCourse = await courseModel.find(searchCriteria);

        if (searchCourse.length === 0) {
            // If no courses are found, return an appropriate response
            return res.json({ message: "No available courses" });
        }

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

       return res.json({MSg:"course deleted"})
}

export const editCourses = async(req,res,next)=>{

    const id = req.user
    const {courseId,name,duration,category,capacity,published} = req.params

    if(name)
    {

    }
    if(duration)
    {
        
    }
    if(capacity)
    {
        
    }
    if(category)
    {
        
    }
    if(published)
    {
        
    }
    // if(name) review rating
    // {
        
    // }


    
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


    const courses = await courseModel.find({published:false})
    if(!courses)
        {
            return res.json("no available courses")
        }

        return res.json({courses})

}

export const addReview = async(req,res,next)=>{
    const {comment} = req.body
    const {courseId} = req.params

    const findCourse = await courseModel.findById(courseId)
    if(!findCourse)
        {
            return res.json("no courses found")
        }

        const userResponse = await axios.get(`http://localhost:3000/enrollment/`)
        const data = userResponse.data

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

            const updateCourse = await courseModel.findByIdAndUpdate({_id:courseId},{reviews:{studentId:req.user.id,comment}},{new:true})
    if(!updateCourse)
        {
            return res.json("nothing found to update")
        }

        return res.json({MSG:"updated",updateCourse})
            
}