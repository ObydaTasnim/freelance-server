import Job from "../models/Job.js";

// @desc    Get all jobs with optional sorting
// @route   GET /api/jobs
// @access  Public
export async function getAllJobs(req, res) {
  try {
    const { sort } = req.query;

    let sortOption = {};
    if (sort === "date") {
      sortOption = { postedDate: -1 }; // Newest first
    }

    const jobs = await Job.find().sort(sortOption);

    res.status(200).json({
      success: true,
      count: jobs.length,
      data: jobs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
}

// @desc    Get latest 6 jobs
// @route   GET /api/jobs/latest
// @access  Public
export async function getLatestJobs(req, res) {
  try {
    const jobs = await Job.find().sort({ postedDate: -1 }).limit(6);

    res.status(200).json({
      success: true,
      data: jobs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
}

// @desc    Get single job by ID
// @route   GET /api/jobs/:id
// @access  Public
export async function getJobById(req, res) {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    res.status(200).json({
      success: true,
      data: job,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
}

// @desc    Get jobs by user email
// @route   GET /api/jobs/user/:email
// @access  Private
export async function getJobsByUserEmail(req, res) {
  try {
    const jobs = await Job.find({ userEmail: req.params.email }).sort({
      postedDate: -1,
    });

    res.status(200).json({
      success: true,
      count: jobs.length,
      data: jobs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
}

// @desc    Create new job
// @route   POST /api/jobs
// @access  Private
export async function createJob(req, res) {
  try {
    const { title, postedBy, category, summary, coverImage, userEmail } =
      req.body;

    // Validation
    if (
      !title ||
      !postedBy ||
      !category ||
      !summary ||
      !coverImage ||
      !userEmail
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    const job = await Job.create({
      title,
      postedBy,
      category,
      summary,
      coverImage,
      userEmail,
    });

    res.status(201).json({
      success: true,
      message: "Job created successfully",
      data: job,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
}

// @desc    Update job
// @route   PUT /api/jobs/:id
// @access  Private
export async function updateJob(req, res) {
  try {
    const { title, category, summary, coverImage } = req.body;

    let job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    // Update fields
    job.title = title || job.title;
    job.category = category || job.category;
    job.summary = summary || job.summary;
    job.coverImage = coverImage || job.coverImage;

    await job.save();

    res.status(200).json({
      success: true,
      message: "Job updated successfully",
      data: job,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
}

// @desc    Delete job
// @route   DELETE /api/jobs/:id
// @access  Private
export async function deleteJob(req, res) {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    await job.deleteOne();

    res.status(200).json({
      success: true,
      message: "Job deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
}
