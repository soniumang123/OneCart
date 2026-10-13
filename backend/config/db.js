import mongoose from "mongoose";

const connectdb = async() =>{
    try{
        await mongoose.connect(process.env.Mongodb_URL)
        console.log("Db connected")
    }catch(error){
        console.log("Db error",error)

    }
}

export default connectdb;