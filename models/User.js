import mongoose from "mongoose";
import validator from 'validator';
import bcrypt from "bcryptjs";

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

//this is a mongoose middleware which will be called by mongoose before saving the document(generally where we are calling .create or .save method)

//we can not use arrow function here because then we will not have this keyword reference
userSchema.pre('save', async function () {

    //here this refers to the newly created instance created by User model(so it will have access to all the fields we passed to it)

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

});

export default mongoose.model('User', userSchema);