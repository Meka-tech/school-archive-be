const School = require("../models/school");
const Session = require("../models/session");

exports.createSession = async (req, res, next) => {
  try {
    const schoolId = req.body.schoolId;
    const session = req.body.session;

    const ExistingSession = await Session.findOne({ schoolId, session });

    if (ExistingSession) {
      const error = new Error("A Session with this name already exists");
      error.statusCode = 422;
      throw error;
    }

    const NewSession = new Session({ schoolId, session });

    const SavedSession = await NewSession.save();
    res.status(201).json({ message: "session created", data: SavedSession });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.updateSession = async (req, res, next) => {
  try {
    const Id = req.body.id;
    const sessionName = req.body.session;

    const ExistingName = await Session.findOne({ session: sessionName });

    if (ExistingName) {
      const error = new Error("A Session with this name already exists");
      error.statusCode = 422;
      throw error;
    }

    const ExistingSession = await Session.findById(Id);
    if (!ExistingSession) {
      const error = new Error("Session does not exist");
      error.statusCode = 422;
      throw error;
    }

    const updatedSession = await Session.findByIdAndUpdate(
      Id,
      { session: sessionName },
      {
        new: true,
        runValidators: true
      }
    );

    res.status(201).json({ message: "session updated", data: updatedSession });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deleteSession = async (req, res, next) => {
  try {
    const _id = req.params.id;

    const deletedSession = await Session.findByIdAndDelete(_id);
    //delete everything about school (terms)

    if (!deletedSession) {
      return res.status(404).json({ message: "Session does not exist" });
    }

    res.status(200).json({ message: "Session deleted successfully" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
