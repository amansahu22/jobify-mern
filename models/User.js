import mongoose from "mongoose";
import validator from 'validator'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please Provide name'],
        minlength: 3,
        maxlength: 20,
        trim: true,
    },

    //validator is external librabry which provide as many methods to validate our data
    //[Validator Package](https://www.npmjs.com/package/validator)
    email: {
        type: String,
        required: [true, 'Please Provide email'],
        validate: {
            validator: validator.isEmail,
            message: 'Please Provide a Valid Email'
        },
        unique: true
    },

    password: {
        type: String,
        required: [true, 'Please Provide Passwoed'],
        minlength: 6,
    },

    lastName: {
        type: String,
        maxlength: 20,
        trim: true,
        default: 'lastName'
    },
    location: {
        type: String,
        maxlength: 20,
        trim: true,
        default: 'my city'
    },

})

export default mongoose.model('User', userSchema);