import mongoose from "mongoose";


const db = async ()=>{
    try {

        const connect = await mongoose.connect('mongodb://localhost:27017/UMS')

        console.log('db connected successfully')
        
    } catch (error) {
        console.log(error)
        console.log('db not connected')
        
    }
    
}

export default db