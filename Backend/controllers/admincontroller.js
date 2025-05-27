const Admin = require('../models/Admin');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// Generate Token function (add this)
const generateToken = (id) => {
  // Assuming your Admin model has getSignedJwtToken method
  const admin = new Admin({ _id: id });
  return admin.getSignedJwtToken();
};

const loginAdmin = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Validate email & password
  if (!email || !password) {
    return next(new ErrorResponse('Please provide an email and password', 400));
  }

  // Check for admin
  const admin = await Admin.findOne({ email }).select('+password');

  if (!admin) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  // Check if password matches
  const isMatch = await admin.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  // Create token
  const token = admin.getSignedJwtToken();

  res.status(200).json({
    success: true,
    token
  });
});

// @desc    Get current logged in admin
// @route   GET /api/v1/auth/me
// @access  Private
const getMe = asyncHandler(async (req, res, next) => {
  const admin = await Admin.findById(req.user.id);

  res.status(200).json({
    success: true,
    data: admin
  });
});

module.exports = {
  loginAdmin,
  getMe
};