const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// register
const registerUser = async (req, res) => {

  const { userName, userEmail, password, role } = req.body;

  if (!userName || !userEmail || !password || !role) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }
  const existingUser = await User.findOne({
    $or: [{ userEmail }, { userName }],
  });

  if (existingUser) {
    return res
      .status(400)
      .json({
        success: false,
        message: "User name or user email already exists",
      });
  }

  try {
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      userName,
      userEmail,
      role,
      password: hashPassword,
    });

    await newUser.save();
    return res
      .status(201)
      .json({ success: true, message: "User registered successfully!" });

  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const loginUser = async(req, res) => {
    const {userEmail, password} = req.body;

    const checkUser = await User.findOne({userEmail})
    if(!checkUser || !(await bcrypt.compare(password , checkUser.password))){
        return res.status(401).json({ success: false, message: "Invalid credentials" });
    }
    const accessToken = jwt.sign({ userId: checkUser._id }, process.env.JWT_SECRET, { expiresIn: '120m' });

    res.status(200).json({
        success: true,
        message: "User logged in successfully!",
        data:{
          user: {
                accessToken,
                _id: checkUser._id,
                userName: checkUser.userName,
                userEmail: checkUser.userEmail,
                role: checkUser.role
            }
        }
    })
}


module.exports = { registerUser, loginUser };
