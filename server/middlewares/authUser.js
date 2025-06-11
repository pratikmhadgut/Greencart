import jwt from "jsonwebtoken";
import User from "../models/User.js";
const authUser = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.json({ success: false, message: "not authorized" });
  }

  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
    if (tokenDecode.id) {
      req.userId = tokenDecode.id;
    } else {
      return res.json({ success: false, message: "Not authorized" });
    }
    next();
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
export default authUser;
