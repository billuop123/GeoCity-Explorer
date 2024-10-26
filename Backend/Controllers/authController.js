// Importing necessary modules
import catchAsync from "../utils/catchAsync.js";
import User from "./../models/userModel.js";
import jwt from "jsonwebtoken";
import AppError from "../utils/AppError.js";
import crypto from "crypto";

// Utility functions
const signToken = (id) => {
  return jwt.sign({ id }, process.env.SECRETKEY, {
    expiresIn: process.env.EXPIRESIN,
  });
};

const createCookieAndSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expiresIn: new Date(
      Date.now() + process.env.COOKIE_EXPIRES_IN * 1000 * 60 * 60 * 24
    ),
    httpOnly: true,
  };

  user.password = undefined; // Exclude password from user data

  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);
  res.status(statusCode).json({
    status: "success",
    token,
    data: { user },
  });
};

// Authentication controllers
const signup = catchAsync(async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    res.status(400).json({
      status: "fail",
      message: "User already exists",
    });
    return;
  }
  const newUser = await User.create(req.body);
  createCookieAndSendToken(newUser, 201, res);
});
const addNew = catchAsync(async (req, res, next) => {
  const { email, place } = req.body;

  // Find the user by email
  const user = await User.findOne({ email });

  if (!user) {
    return next(new AppError("User not found", 404)); // Handle if user is not found
  }

  // Create new city data to add
  const newCity = {
    cityName: place.cityName,
    country: place.country,
    emoji: place.emoji || "", // Optional field
    notes: place.notes || "", // Optional field
    position: {
      lat: place.position.lat,
      lng: place.position.lng,
    },
    id: place.id, // Unique city ID (make sure it's provided in the request)
  };

  // Add the new city to the user's cities array
  user.cities.push(newCity);

  // Save the updated user document
  await user.save({ validateBeforeSave: false });

  // Respond with updated user
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});
const fetchCities = catchAsync(async (req, res, next) => {
  const { email } = req.body;
  const { cities } = await User.findOne({ email });
  res.status(200).json({
    status: "success",

    data: { cities },
  });
});
const deletePlace = catchAsync(async (req, res, next) => {
  const { email, cityName } = req.body;

  const result = await User.updateOne(
    { email: email },
    { $pull: { cities: { cityName } } }
  );

  if (result.modifiedCount === 0) {
    return res.status(404).json({
      status: "fail",
      message: "City not found or already deleted",
    });
  }

  res.status(200).json({
    status: "success",
    message: "City deleted successfully",
  });
});

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new AppError("There is no such user", 400));
  }

  const isPasswordCorrect = await user.correctPassword(password, user.password);

  if (!isPasswordCorrect) {
    return next(new AppError("Incorrect email or password", 400));
  }

  createCookieAndSendToken(user, 200, res);
});

// Middleware
const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new AppError("You are not logged in. Please login to get access", 400)
    );
  }

  const decoded = jwt.verify(token, process.env.SECRETKEY);
  const currentUser = await User.findById(decoded.id);

  if (!currentUser) {
    return next(
      new AppError("The token belonging to this user has been deleted", 400)
    );
  }

  if (currentUser.changedPassword(decoded.iat)) {
    return next(new AppError("The password was changed", 400));
  }

  req.user = currentUser;
  next();
};

const restrict = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError("You are not authorized for this", 403));
    }
    next();
  };
};

// Password management
const forgotPassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new AppError("This email has not been registered", 400));
  }

  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v2/users/${resetToken}`;

  res.status(200).json({
    status: "success",
    url: resetUrl,
    resetToken,
  });
});

const resetPassword = catchAsync(async (req, res, next) => {
  if (!req.params.token) {
    return next(new AppError("There should be a token in the URL", 400));
  }

  const encryptedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: encryptedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    return next(new AppError("This token has expired", 400));
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined; // Clear reset token
  user.passwordResetExpires = undefined; // Clear expiration time

  await user.save();
  createCookieAndSendToken(user, 200, res);
});

// Logout
const logOut = catchAsync(async (req, res, next) => {
  res.cookie("jwt", "", { expiresIn: 10 * 1000 });
  res.status(200).json({
    status: "success",
    message: "You are successfully logged out",
  });
});

// Exporting controllers
export default {
  signup,
  login,
  protect,
  restrict,
  forgotPassword,
  resetPassword,
  logOut,
  addNew,
  fetchCities,
  deletePlace,
};