const Session = require("../models/session");
const Term = require("../models/term");
const StaffData = require("../models/staffData");
const Staff = require("../models/staff");
const classData = require("../models/classData");

exports.createTerm = async (req, res, next) => {
  try {
    const sessionId = req.body.sessionId;
    const term_no = req.body.term_no;
    const ExistingSession = await Session.findById(sessionId);

    const ExistingTerm = await Term.findOne({ term_no });

    if (ExistingTerm) {
      const error = new Error("A Term with this number already exists");
      error.statusCode = 422;
      throw error;
    }

    if (!ExistingSession) {
      const error = new Error("Session does not exist");
      error.statusCode = 422;
      throw error;
    }

    const NewTerm = new Term({ term_no: term_no });

    const SavedTerm = await NewTerm.save();

    await Session.findByIdAndUpdate(
      sessionId,
      { $addToSet: { terms: SavedTerm._id } },
      { new: true, useFindAndModify: false }
    );
    res.status(200).json({ message: "created term", data: { SavedTerm } });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deleteTerm = async (req, res, next) => {
  try {
    const _id = req.params.id;

    const TermExists = await Term.findById(_id);

    if (!TermExists) {
      return res.status(404).json({ message: "Term does not exist" });
    }

    await Term.findByIdAndDelete(_id);
    //delete classes , staffList , staffData

    res.status(200).json({ messgae: "term deleted " });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

//school staff data

exports.postStaffData = async (req, res, next) => {
  try {
    const _id = req.params.id;
    const staffData = req.body.staffData;

    const staffDetails = new StaffData(staffData);

    const NewStaffData = await staffDetails.save();

    await Term.findByIdAndUpdate(
      _id,
      {
        staffData: NewStaffData._id
      },
      {
        new: true,
        runValidators: true
      }
    );

    res.status(200).json({ messgae: "data posted " });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

//class
exports.postClass = async (req, res, next) => {
  try {
    const _id = req.params.id;

    const NewClassData = new classData(req.body.classData);

    const SavedClassData = await NewClassData.save();

    await Term.findByIdAndUpdate(
      _id,
      { $addToSet: { classes: SavedClassData._id } },
      { new: true, useFindAndModify: false }
    );

    res.status(200).json({ messgae: "data posted " });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.updateClass = async (req, res, next) => {
  try {
    const _id = req.params.id;

    const updateData = req.body;

    const ClassItem = await classData.findById(_id);

    if (!ClassItem) {
      return res.status(404).json({ message: "class does not exist" });
    }
    const updatedClass = await classData.findByIdAndUpdate(_id, updateData, {
      new: true,
      runValidators: true
    });

    res.status(200).json({ messgae: "class edited", data: updatedClass });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deleteClass = async (req, res, next) => {
  try {
    const _id = req.params.id;

    const ClassExists = await classData.findById(_id);

    if (!ClassExists) {
      return res.status(404).json({ message: "Class does not exist" });
    }

    await classData.findByIdAndDelete(_id);

    res.status(200).json({ messgae: "class deleted " });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

//staff
exports.postStaff = async (req, res, next) => {
  try {
    const _id = req.params.id;

    const NewStaff = new Staff(req.body.staff);

    const SavedStaff = await NewStaff.save();

    await Term.findByIdAndUpdate(
      _id,
      { $addToSet: { staffList: SavedStaff._id } },
      { new: true, useFindAndModify: false }
    );

    res.status(200).json({ messgae: "data posted " });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.updateStaff = async (req, res, next) => {
  try {
    const _id = req.params.id;

    const updateData = req.body;

    const StaffItem = await Staff.findById(_id);

    if (!StaffItem) {
      return res.status(404).json({ message: "staff does not exist" });
    }
    const updatedStaff = await Staff.findByIdAndUpdate(_id, updateData, {
      new: true,
      runValidators: true
    });

    res.status(200).json({ messgae: "staff edited", data: updatedStaff });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deleteStaff = async (req, res, next) => {
  try {
    const _id = req.params.id;

    const StaffExists = await Staff.findById(_id);

    if (!StaffExists) {
      return res.status(404).json({ message: "staff does not exist" });
    }

    await Staff.findByIdAndDelete(_id);

    res.status(200).json({ messgae: "staff deleted " });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
