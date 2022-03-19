import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Provide name"],
    minlength: 3,
    maxlength: 20,
    trim: true,
  },

  //validator is external librabry which provide as many methods to validate our data
  //[Validator Package](https://www.npmjs.com/package/validator)
  email: {
    type: String,
    required: [true, "Please Provide email"],
    validate: {
      validator: validator.isEmail,
      message: "Please Provide a Valid Email",
    },
    unique: true,
  },

  password: {
    type: String,
    required: [true, "Please Provide Passwoed"],
    minlength: 6,
    select: false, //this means when we will find our user that time password feild will not come there, but it would not work in the case of .create method that's why we are hardcoding there
  },

  lastName: {
    type: String,
    maxlength: 20,
    trim: true,
    default: "lastName",
  },
  location: {
    type: String,
    maxlength: 20,
    trim: true,
    default: "my city",
  },
});

//this is a mongoose middleware which will be called by mongoose before saving the document(generally where we are calling .create or .save method)

//we can not use arrow function here because then we will not have this keyword reference
userSchema.pre("save", async function () {
  //here this refers to the newly created instance created by User model(so it will have access to all the fields we passed to it)

  //console.log(this.modifiedPaths())
  //method returns the array of the name of fields whose values have been updated(different from previous saved values)

  if(!this.isModified('password')) return;
  //if we are not modifying the password then we need npt to hash it(this setup is for update user route where we can update other values but we do not change the password)
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

//monogoose have many in-built methods which we can call on the instances that were created from Model(for example user.save())
//we can also add our own custom methods on the schema so that we can have access to those methods on the created instances

userSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

userSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

export default mongoose.model("User", userSchema);
