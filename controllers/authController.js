import User from "../models/User.js";
import { StatusCodes } from 'http-status-codes';
import { BadRequestError } from '../errors/index.js'

// const Register = async (req, res, next) => {
//     try {
//         const user = await User.create(req.body);
//         res.status(201).send(user);
//     } catch (error) {

//         //express is able to pass our errors from controllers to error handler middleware which we have already setted-up in server file(last middleware) and to use that functionality we only have to call next middleware here 

//         next(error)
//         // res.status(500).json({
//         //     msg: 'there was some error',
//         //     error: error.message
//         // })
//     }
// }

//instead of writing this try and catch block again and again we are using express-async-errors package which will do this thing for as under the hood

const Register = async (req, res) => {

    const { name, email, password } = req.body;

    if (!name || !email || !password) throw new BadRequestError('Please provide all values')
    //we can extract err.message i.e. "something went wrong" from new Error('something went wrong') but to add additional data to in built Error class we are creating this custom Error class

    const userAlreadyExist = await User.findOne({ email });
    if (userAlreadyExist) {
        throw new BadRequestError('Email already exist, provide different email')
    }

    const user = await User.create(name, email, password);
    res.status(StatusCodes.CREATED).send(user);
}

const Login = (req, res) => {
    res.send('Login');
}

const updateUser = (req, res) => {
    res.send('updateUser');
}

export { Register, Login, updateUser };