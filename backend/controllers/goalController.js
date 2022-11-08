const asyncHandler = require("express-async-handler");
const { default: mongoose } = require("mongoose");

const Goal = require("../model/goalModel");

// A controller file that holds all the function for the goalRoutes.js file

// @desc Get goals
// @route GET/api/goals
// @access Private
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({});

  res.status(200).json(goals);
});

// @desc Set goal
// @route POST/api/goals
// @access Private
const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field");
  }

  const goal = await Goal.create({
    text: req.body.text,
  });

  res.status(200).json(goal);
});
// @desc Edit goal
// @route PUT/api/goals/:id
// @access Private
const editGoal = asyncHandler(async (req, res) => {
  const goalToEdit = await Goal.findById(req.params.id);

  if (!goalToEdit) {
    res.status(400);
    throw new Error("Goal not found");
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedGoal);
});
// @desc Delete goal
// @route DELETE/api/goals/:id
// @access Private
const deleteGoal = asyncHandler(async (req, res) => {
  const goalToDelete = await Goal.findById(req.params.id);

  if (!goalToDelete) {
    res.status(400);
    throw new Error("Goal not found");
  }

  await goalToDelete.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getGoals,
  setGoal,
  editGoal,
  deleteGoal,
};
