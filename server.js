import mongoose  from 'mongoose';
import app from "./app.js"
export const  port = 9090;

mongoose.connect('mongodb+srv://putlatheophila123:O3UJE3GOuBYnVzj5@cluster0.xy2080g.mongodb.net/cineflex?retryWrites=true&w=majority&appName=Cluster0')
.then((conn)=>{
    console.log('connected to database 2');
    app.listen( port , ()=>{
        console.log(`app is listening on port ${port}`)
    })
})
.catch((error)=>{
    console.log(error)
})