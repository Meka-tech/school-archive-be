const School = require("../models/school");
const Session = require("../models/session");

exports.getSchools = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const schools = await School.find()
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));

    const total = await School.countDocuments();
    res.status(200).json({
      results: schools,
      totalPages: Math.ceil(total / limit),
      currentPage: Number(page)
    });
  } catch (error) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.createSchool = async (req, res, next) => {
  const data = req.body;

  try {
    const ExistingSchool = await School.findOne({ name: req.body.name });

    if (ExistingSchool) {
      const error = new Error("A School with this name already exists");
      error.statusCode = 422;
      throw error;
    }
    const school = new School(data);
    const NewSchool = await school.save();
    res.status(201).json({ message: "school created", data: NewSchool });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getSchoolById = async (req, res, next) => {
  try {
    const schoolId = req.params.id;

    // Find school by ID
    const school = await School.findById(schoolId);

    if (!school) {
      return res.status(404).json({ message: "School not found" });
    }
    const sessions = await Session.find({ schoolId })
      .populate({
        path: "terms",
        populate: [
          { path: "classes", model: "classData" },
          { path: "staffData", model: "StaffData" },
          { path: "staffList", model: "Staff" }
        ]
      })
      .populate("finance_details");

    res
      .status(200)
      .json({ message: "fetched successfully", data: { school, sessions } });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
exports.updateSchool = async (req, res, next) => {
  try {
    const _id = req.params.id;
    const updateData = req.body;

    const updatedSchool = await School.findByIdAndUpdate(_id, updateData, {
      new: true,
      runValidators: true
    });

    if (!updatedSchool) {
      return res.status(404).json({ message: "School not found" });
    }

    res.status(200).json({ message: "school updated", data: updatedSchool });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deleteSchool = async (req, res, next) => {
  try {
    const _id = req.params.id;

    const deletedSchool = await School.findById(_id);

    if (!deletedSchool) {
      return res.status(404).json({ message: "School not found" });
    }

    await deletedSchool.deleteOne();

    res.status(200).json({ message: "School deleted successfully" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.searchSchoolsByName = async (req, res) => {
  // http://localhost:5000/api/schools/search?name=SchoolName&page=1&limit=10
  try {
    const name = req.query.name;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    if (!name) {
      return res
        .status(400)
        .json({ message: "Name query parameter is required" });
    }

    // Perform case-insensitive search for schools by name with pagination
    const schools = await School.find({ name: { $regex: name, $options: "i" } })
      .skip(skip)
      .limit(limit);

    // Get the total count of documents matching the query
    const total = await School.countDocuments({
      name: { $regex: name, $options: "i" }
    });

    if (schools.length === 0) {
      return res.status(404).json({ message: "No schools found" });
    }

    res.status(200).json({
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      totalResults: total,
      results: schools
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
