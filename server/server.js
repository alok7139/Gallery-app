import cloudinary from 'cloudinary'
import app from './app.js'
import cluster from 'node:cluster'
import { availableParallelism } from 'node:os'
import process from 'node:process'

const numcpu = availableParallelism();
// console.log(numcpu)

cloudinary.v2.config({
    cloud_name:process.env.CLOUDINARY_NAME ,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

if(cluster.isPrimary){
    console.log(`primary ${process.pid} is running`)
    for(let i=0;i<numcpu;i++){
        cluster.fork();
    }
}
else{
    app.get('/' , (req,res) => {
        return res.json({
            message: `server is running on process id ${process.pid}`
        })
    })

    app.listen((process.env.PORT) , () => {
        console.log(`server is running on ${process.env.PORT}`)
    })

    console.log(`worker ${process.pid} started`)
}


