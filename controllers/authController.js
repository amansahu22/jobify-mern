import User from "../models/User.js";
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, UnAuthenticatedError } from '../errors/index.js'

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

//instead of writing this try and catch block again and again we are using express-async-errors package which will do this thing for us under the hood

const Register = async (req, res) => {

    const { name, email, password } = req.body;

    if (!name || !email || !password) throw new BadRequestError('Please provide all values')
    //we can extract err.message i.e. "something went wrong" from new Error('something went wrong') but to add additional data to in built Error class we are creating this custom Error class

    const userAlreadyExist = await User.findOne({ email });
    if (userAlreadyExist) {
        throw new BadRequestError('Email already exist, provide different email')
    }

    const user = await User.create({ name, email, password });
    const token = user.createJWT();

    const response = {
        user: {
            email: user.email,
            name: user.name,
            lastName: user.lastName,
            location: user.location
        },
        token,
        location: user.location
    }

    res.status(StatusCodes.CREATED).send(response);
}

const Login = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        throw new BadRequestError('Please provide all values')
    }
    const user = await User.findOne({ email }).select('+password')
    //because in our UserSchema we set select:false so we didn't get password here but we need our password so that we can compare that's why we added .select('+password')

    if (!user) {
        throw new UnAuthenticatedError('Invalid Credentials')
    }
    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect) {
        throw new UnAuthenticatedError('Invalid Credentials')
    }
    const token = user.createJWT()
    user.password = undefined
    res.status(StatusCodes.OK).json({ user, token, location: user.location })

}

const updateUser = (req, res) => {
    res.send('updateUser');
}

export { Register, Login, updateUser };