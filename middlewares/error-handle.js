import { StatusCodes } from "http-status-codes";

//express can identify if we are passing 4 parameters then first one will be for error

const errorHandleMiddleware = (err, req, res, next) => {
  const defaultError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || "Something went wrong please try again later",
  };

  // {
  //     "err": {
  //         "errors": {
  //             "password": {
  //                 "name": "ValidatorError",
  //                 "message": "Please Provide Passwoed",
  //                 "properties": {
  //                     "message": "Please Provide Passwoed",
  //                     "type": "required",
  //                     "path": "password"
  //                 },
  //                 "kind": "required",
  //                 "path": "password"
  //             }
  //         },
  //         "_message": "User validation failed",
  //         "name": "ValidationError",
  //         "message": "User validation failed: password: Please Provide Passwoed"
  //     }
  // }

  if (err.name === "ValidationError") {
    // const arrayOfValues = Object.values(err.errors);

    //it returns array of values of every key in the passed object for more info go to mdn doc

    // const errorMsgArray = arrayOfValues.map(item => {
    //     return item.message
    // })

    // const errorMsgString = errorMsgArray.join(', ');
    // console.log(errorMsgString)

    // defaultError.message = errorMsgString;
    // defaultError.statusCode = StatusCodes.BAD_REQUEST;

    //we can do the above same thing in single line as well
    defaultError.message = Object.values(err.errors)
      .map((item) => item.message)
      .join(", ");
    defaultError.statusCode = StatusCodes.BAD_REQUEST;
  }

  if (err.code && err.code === 11000) {
    //code 11000 is generaally refers to invalid foramat or duplicate document
    (defaultError.statusCode = StatusCodes.BAD_REQUEST),
      (defaultError.message = `${Object.values(
        err.keyValue
      )} already exixts , please provide different ${Object.keys(
        err.keyValue
      )}`);
  }

  res.status(defaultError.statusCode).json({
    msg: defaultError.message,
  });
};

export default errorHandleMiddleware;
