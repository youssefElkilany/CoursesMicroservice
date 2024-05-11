import { Router } from "express";
import * as cc from './Controller/courses.js'
import auth from "../../Middelware/Auth.js";
import { roles } from "../../Middelware/validation.js";
const router  = Router()


router.get("/",auth(roles.instructor),cc.createCourse)

export default router