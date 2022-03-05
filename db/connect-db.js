import mongoose from "mongoose";


//remember mongoose.connect returns promise.
const ConnectDatabase = (url) => {
    return mongoose.connect(url)
}

export default ConnectDatabase