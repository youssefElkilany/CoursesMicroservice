import { Schema,model } from "mongoose";

const courseSchema  = new Schema({
    name:{type:String,required:true},
    instructorId:{type:Number,required:true},
    duration:{type:Number,required:false},
    category:{type:String,required:true},
    rating:{type:Number,default:0},
    capacity:{type:Number,default:0},
    published:{type:Boolean,default:false},
    reviews:[{StudentId:{type:Number,required:true},comment:{type:String,required:true}}],
    enrolledStudents:{type:Number,default:0}


},{
    timestamps:true
})

const courseModel = model('Course',courseSchema)
export default courseModel