import express from 'express';
const app = express();
import dotenv from 'dotenv';
//this is gonna look for .env file in root directory 
dotenv.config()


//middleware

import notFoundMiddleware from './middlewares/not-found.js';
import errorHandleMiddleware from './middlewares/error-handle.js';


app.get('/', (req, res, next) => {
    res.send('Welcome');
})

app.use(notFoundMiddleware)
//it means express after listening for all above routes come on this and use can serve for can type of req(get,post...) and for any url.

app.use(errorHandleMiddleware)
//this middleware is setup to catch all the potential error which can occurs in our existing routes , remember if route does'nt match then it will be handled by notFoundMiddleware, if route matches and some error occur then that error will be handled by errorHandlerMiddleware.

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server listening on port : ${PORT}.....`)
})
