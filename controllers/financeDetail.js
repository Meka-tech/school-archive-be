const FinanceDetail = require("../models/financeDetail");
const Session = require("../models/session");

exports.createFinanceDetail = async (req, res, next) => {
  try {
    const sessionId = req.body.sessionId;
    const DetailName = req.body.name;
    const BodyData = req.body;

    delete BodyData.sessionId;

    const session = await Session.findById(sessionId)
      .populate("finance_details")
      .exec();

    if (!session) {
      const error = new Error("Session does not exist");
      error.statusCode = 422;
      throw error;
    }

    const nameExists = session.finance_details.find(
      (detail) => detail.name === DetailName
    );

    if (nameExists) {
      const error = new Error("A Detail with this name already exists");
      error.statusCode = 422;
      throw error;
    }

    const NewDetail = new FinanceDetail(BodyData);

    const SavedDetail = await NewDetail.save();

    await Session.findByIdAndUpdate(
      sessionId,
      { $addToSet: { finance_details: NewDetail._id } },
      { new: true, useFindAndModify: false }
    );
    res.status(200).json({ message: "detail posted", data: { SavedDetail } });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.updateFinanceDetail = async (req, res, next) => {
  try {
    const _id = req.params.id;
    const updateData = req.body;

    const updatedDetail = await FinanceDetail.findByIdAndUpdate(
      _id,
      updateData,
      {
        new: true,
        runValidators: true
      }
    );

    if (!updatedDetail) {
      return res.status(404).json({ message: "Finance detail not found" });
    }

    res.status(200).json({ message: "detail updated", data: updatedDetail });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deleteFinanceDetail = async (req, res, next) => {
  try {
    const _id = req.params.id;

    const detail = await FinanceDetail.findById(_id);

    if (!detail) {
      return res.status(404).json({ message: "Finance detail not found" });
    }

    await detail.deleteOne();

    res.status(200).json({ message: "detail deleted" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
