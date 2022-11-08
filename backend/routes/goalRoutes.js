const express = require("express");

const { protect } = require("../middleware/userMiddleware");

const router = express.Router();

const {
  getGoals,
  setGoal,
  editGoal,
  deleteGoal,
} = require("../controllers/goalController");

router.route("/").get(protect, getGoals).post(protect, setGoal);

router.route("/:id").put(protect, editGoal).delete(protect, deleteGoal);

module.exports = router;
