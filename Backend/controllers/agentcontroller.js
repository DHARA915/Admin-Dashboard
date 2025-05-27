const Agent = require('../models/Agent');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc    Get all agents
// @route   GET /api/v1/agents
// @access  Private/Admin
exports.getAgents = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc    Get single agent
// @route   GET /api/v1/agents/:id
// @access  Private/Admin
exports.getAgent = asyncHandler(async (req, res, next) => {
  const agent = await Agent.findById(req.params.id);

  if (!agent) {
    return next(
      new ErrorResponse(`Agent not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: agent,
  });
});

// @desc    Create agent
// @route   POST /api/v1/agents
// @access  Private/Admin
exports.createAgent = asyncHandler(async (req, res, next) => {
  const agent = await Agent.create(req.body);

  res.status(201).json({
    success: true,
    data: agent,
  });
});

// @desc    Update agent
// @route   PUT /api/v1/agents/:id
// @access  Private/Admin
exports.updateAgent = asyncHandler(async (req, res, next) => {
  const agent = await Agent.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!agent) {
    return next(
      new ErrorResponse(`Agent not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: agent,
  });
});

// @desc    Delete agent
// @route   DELETE /api/v1/agents/:id
// @access  Private/Admin
exports.deleteAgent = asyncHandler(async (req, res, next) => {
  const agent = await Agent.findByIdAndDelete(req.params.id);

  if (!agent) {
    return next(
      new ErrorResponse(`Agent not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: {},
  });
});