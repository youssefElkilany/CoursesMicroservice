import { Router } from "express";
import * as cc from './Controller/courses.js'
import auth from "../../Middelware/Auth.js";
import { roles } from "../../Middelware/validation.js";
const router  = Router()

// instructor
router.post("/",auth(roles.instructor),cc.createCourse)
router.get("/instcourses",auth(roles.instructor),cc.getInstructorCourses)
router.get("/instSearch",auth(roles.instructor),cc.searchInstructorCourses)
router.get("/sort",auth(roles.instructor),cc.sortCourses)

//student
router.get("/published",auth(roles.student),cc.publishedCourses)
router.get("/search",auth(roles.student),cc.searchpublishedCourses)
router.put("/review/:courseId",auth(roles.student),cc.addReview)


// microservices 
router.get("/publishedCourses",cc.publishedCoursesMicro) // for microservices
router.post("/enrolledNum",cc.enrolledNumMicro)
router.post("/enrolledNum2",cc.enrolledNumMicro2)
router.post("/token",cc.tokenCreation)


// for admin
router.get("/allCourses",auth(roles.admin),cc.AllCourses)
router.delete("/removeCourse/:courseId",auth(roles.admin),cc.removeCourses)
router.put("/editCourse/:courseId",auth(roles.admin),cc.editCourses)
router.patch("/publish/:courseId",auth(roles.admin),cc.publishCourse)
router.get("/sum",auth(roles.admin),cc.sumOfCourses)
router.get("/pop",auth(roles.admin),cc.coursesPopularity)

export default router