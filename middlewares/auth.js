import jwt from "jsonwebtoken";
import UnAuthenticatedError from "../errors/unauthenticated.js";

const auth = async (req, res, next) => {
  const headerToken = req.headers.authorization;
  if (!headerToken || !headerToken.startsWith("Bearer")) {
    throw new UnAuthenticatedError("Authentication Invalid");
  }

  const token = headerToken.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET); //jwt.sign({ userId: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME })
    //so according to out setup jwt.verify would return userId
    req.user = payload;
    next();
  } catch (error) {
    throw new UnAuthenticatedError("Authentication Invalid");
  }
};

export default auth;
