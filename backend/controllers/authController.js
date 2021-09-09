const User = require("../model/user");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

//Register a user

exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "aaaaa",
      url: "aaaa",
    },
  });

  const token = user.getJwtToken();
  res.status(201).json({
    success: true,
    token,
  });
});

//Login USer
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  //checks if email and paswrod is correct
  if (!email || !password) {
    return next(new ErrorHandler("Please enter email and password"));
  }

  //Finding user in Database
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid Email or Password'", 401));
  }

  //Checks if password is correct or not
  const isPasswordMatched = await user.comparedPassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email or Password'", 401));
  }

  const token = user.getJwtToken();

  res.status(200).json({
    success: true,
    token,
  });
});
