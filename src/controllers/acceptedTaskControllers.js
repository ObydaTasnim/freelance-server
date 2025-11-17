import AcceptedTask from "../models/AcceptedTask.js";

// @desc    Get accepted tasks by user email
// @route   GET /api/accepted-tasks/:email
// @access  Private
export async function getAcceptedTasksByEmail(req, res) {
  try {
    const tasks = await AcceptedTask.find({
      acceptedBy: req.params.email,
    }).sort({ acceptedDate: -1 });

    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
}

// @desc    Accept a job
// @route   POST /api/accepted-tasks
// @access  Private
export async function acceptJob(req, res) {
  try {
    const {
      jobId,
      jobTitle,
      jobCategory,
      jobCoverImage,
      jobPostedBy,
      acceptedBy,
      acceptedByName,
    } = req.body;

    // Validation
    if (
      !jobId ||
      !jobTitle ||
      !jobCategory ||
      !jobCoverImage ||
      !jobPostedBy ||
      !acceptedBy ||
      !acceptedByName
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    // Check if already accepted by this user
    const existingTask = await AcceptedTask.findOne({
      jobId,
      acceptedBy,
    });

    if (existingTask) {
      return res.status(400).json({
        success: false,
        message: "You have already accepted this job",
      });
    }

    const acceptedTask = await AcceptedTask.create({
      jobId,
      jobTitle,
      jobCategory,
      jobCoverImage,
      jobPostedBy,
      acceptedBy,
      acceptedByName,
    });

    res.status(201).json({
      success: true,
      message: "Job accepted successfully",
      data: acceptedTask,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
}

// @desc    Delete accepted task (Mark as done/cancel)
// @route   DELETE /api/accepted-tasks/:id
// @access  Private
export async function deleteAcceptedTask(req, res) {
  try {
    const task = await AcceptedTask.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Accepted task not found",
      });
    }

    await task.deleteOne();

    res.status(200).json({
      success: true,
      message: "Task removed successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
}
