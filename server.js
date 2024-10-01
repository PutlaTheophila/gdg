import mongoose  from 'mongoose';
import app from "./app.js"
import dotenv from 'dotenv'
dotenv.config()
export const  port = process.env.PORT||6767;

mongoose.connect(`mongodb+srv://putlatheophila123:${process.env.MONGODB_SECRET}@cluster0.xy2080g.mongodb.net/cineflex?retryWrites=true&w=majority&appName=Cluster0`)
.then((conn)=>{
    console.log('connected to database 2');
    app.listen( port , ()=>{
        console.log(`app is listening on port ${port}`)
    })
})
.catch((error)=>{
    console.log(error)
})