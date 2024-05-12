import joi from 'joi'
import { generalFields } from '../../middleware/validation.js'

export const addtoCart = {
    body: joi.object().required().keys({
        name: joi.string().required(),
        instructorId: joi.number().required(),
        category: joi.string().required(),
        //duration: joi.string().required(),
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
