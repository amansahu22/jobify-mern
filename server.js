import express from 'express';
const app = express();

import 'express-async-errors'
import dotenv from 'dotenv';
//this is gonna look for .env file in root directory 
dotenv.config()

import ConnectDatabase from './db/connect-db.js';

// routers
import authRouter from './routes/auth-routes.js'

import jobsRouter from './routes/job-routes.js'

//middleware

import notFoundMiddleware from './middlewares/not-found.js';
import errorHandleMiddleware from './middlewares/error-handle.js';


app.use(express.json()) //this is a in-built middleware from express which provide us json data in case of patch and post requests

app.get('/', (req, res, next) => {
    res.send('Welcome');
})

app.use('/api/v1/auth', authRouter);

app.use('/api/v1/jobs', jobsRouter)

app.use(notFoundMiddleware)
//it means express after listening for all above routes come on this and use can serve for can type of req(get,post...) and for any url.

app.use(errorHandleMiddleware)
//this middleware is setup to catch all the potential error which can occurs in our existing routes , remember if route does'nt match then it will be handled by notFoundMiddleware, if route matches and some error occur then that error will be handled by errorHandlerMiddleware.

const PORT = process.env.PORT || 8080;

//we will only start our server when database connection will be succesfull.

const startApp = async () => {
    try {
        await ConnectDatabase(process.env.MONGO_CONNECTION_URL)
        console.log('Successfully connected to databse')
        app.listen(PORT, () => {
            console.log(`Server listening on port : ${PORT}.....`)
        })

    } catch (error) {
        console.log(error)
    }
}

startApp()