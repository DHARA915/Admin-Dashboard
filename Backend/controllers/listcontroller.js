const List = require('../models/List');
const Agent = require('../models/Agent');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');

// @desc    Upload CSV and distribute to agents
// @route   POST /api/v1/lists/upload
// @access  Private/Admin
exports.uploadList = asyncHandler(async (req, res, next) => {
  if (!req.files) {
    return next(new ErrorResponse(`Please upload a file`, 400));
  }

  const file = req.files.file;

  // Check file type
  const filetypes = /csv|excel|spreadsheetml/;
  const mimetype = filetypes.test(file.mimetype);
  const extname = filetypes.test(path.extname(file.name).toLowerCase());

  if (!mimetype || !extname) {
    return next(new ErrorResponse(`Please upload a CSV or Excel file`, 400));
  }

  // Create custom filename
  file.name = `list_${Date.now()}${path.parse(file.name).ext}`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
    if (err) {
      console.error(err);
      return next(new ErrorResponse(`Problem with file upload`, 500));
    }

    const results = [];
    const agents = await Agent.find().select('_id');

    if (agents.length === 0) {
      return next(new ErrorResponse(`No agents available to distribute the list`, 400));
    }

    // Read CSV file
    fs.createReadStream(`${process.env.FILE_UPLOAD_PATH}/${file.name}`)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', async () => {
        try {
          // Distribute lists to agents
          const distributedLists = distributeLists(results, agents, req.user.id);

          // Save to database
          await List.insertMany(distributedLists);

          // Delete the file after processing
          fs.unlinkSync(`${process.env.FILE_UPLOAD_PATH}/${file.name}`);

          res.status(200).json({
            success: true,
            data: distributedLists,
          });
        } catch (err) {
          return next(new ErrorResponse(`Error processing file`, 500));
        }
      });
  });
});

// @desc    Get all distributed lists
// @route   GET /api/v1/lists
// @access  Private/Admin
exports.getLists = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// Helper function to distribute lists among agents
const distributeLists = (lists, agents, adminId) => {
  const distributedLists = [];
  const agentCount = agents.length;
  
  lists.forEach((list, index) => {
    const agentIndex = index % agentCount;
    distributedLists.push({
      firstName: list.FirstName || list['First Name'] || list.firstName || '',
      phone: list.Phone || list.phone || '',
      notes: list.Notes || list.notes || '',
      agent: agents[agentIndex]._id,
      uploadedBy: adminId
    });
  });

  return distributedLists;
};