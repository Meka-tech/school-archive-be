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

    const session = await Session.findById(sessionId).populate("terms").exec();

    if (!ExistingSession) {
      const error = new Error("Session does not exist");
      error.statusCode = 422;
      throw error;
    }

    const termExists = session.terms.find((term) => term.term_no === term_no);

    if (termExists) {
      const error = new Error("A Term with this number already exists");
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

    await TermExists.deleteOne();
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

    const FoundTerm = await Term.findById(_id);

    FoundTerm.staffData = staffData;

    await FoundTerm.save();

    res.status(200).json({ messgae: "data posted " });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.updateStaffData = async (req, res, next) => {
  try {
    const _id = req.params.id;

    const updateData = req.body;

    const StaffItem = await StaffData.findById(_id);

    if (!StaffItem) {
      return res.status(404).json({ message: "Staff data does not exist" });
    }
    const updatedStaff = await StaffData.findByIdAndUpdate(_id, updateData, {
      new: true,
      runValidators: true
    });

    res.status(200).json({ messgae: "Staff data edited", data: updatedStaff });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deleteStaffData = async (req, res, next) => {
  try {
    const _id = req.params.id;

    const StaffDataExists = await StaffData.findById(_id);

    if (!StaffDataExists) {
      return res
        .status(404)
        .json({ message: "School staff data does not exist" });
    }

    await StaffData.findByIdAndDelete(_id);

    res.status(200).json({ messgae: "school staff data deleted" });
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
    const Data = req.body.classData;

    const FoundTerm = await Term.findById(_id);

    FoundTerm.classData = Data;

    await FoundTerm.save();

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

    const Data = req.body.staffList;

    const FoundTerm = await Term.findById(_id);

    FoundTerm.staffList = Data;

    await FoundTerm.save();

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
