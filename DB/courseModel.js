import { Schema,model } from "mongoose";

const courseSchema  = new Schema({
    name:{type:String,required:true},
    instructorId:{type:Number,required:true},
    duration:{type:String,required:false},
    category:{type:String,required:true},
    rateNo:{type:Number,default:0},
    avgRate:{type:Number,default:0},
    capacity:{type:Number,default:0},
    published:{type:Boolean,default:false},
    reviews:[{studentId:{type:Number,required:true},comment:{type:String,required:true},rating:{type:Number,Min:0,Max:5,required:true}}],
    enrolledStudents:{type:Number,default:0}


},{
    timestamps:true
})

const courseModel = model('Course',courseSchema)
export default courseModel