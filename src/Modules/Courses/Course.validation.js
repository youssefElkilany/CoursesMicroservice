import joi from 'joi'
//import { generalFields } from '../../Middleware/validation.js'
import { generalFields } from '../../Middelware/validation.js'

export const createCourse = {
    body: joi.object().required().keys({
        name: joi.string().required(),
        category: joi.string().required(),
        duration: joi.string()
        .regex(/^\d{1,3}:\d{2}$/).required(),
       // .error(new Error('Invalid duration format. Please use xx:yy.')),
        capacity:joi.number().required()
    }),
    // file:  joi.object().required().keys({}),
    params: joi.object().required().keys({}),
    query: joi.object().required().keys({})
}

export const deleteFromCart = {
    body:joi.object().required().keys({}),

    //file:  joi.object().required().keys({}),
    params: joi.object().required().keys({product:generalFields.id}),
    query: joi.object().required().keys({})
}
