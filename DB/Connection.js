import mongoose from "mongoose";

const connectDB = async ()=>{
    return await mongoose.connect("mongodb+srv://youssef:course@atlascluster.u4xyne2.mongodb.net/").then(x=>{
        console.log("db connected");
    }).catch(err=>{
        console.log("db failed to connect")
    })
}
export default connectDB