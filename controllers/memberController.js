const User = require('../models/User')
const Borrow = require("../models/Borrow");

exports.getMembers = async (req, res) => {
  const members = await User.find({
    role: "member"
  });

  res.json(members);
};

exports.deleteMember = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);

  res.json({
    message: "Member deleted"
  });
};

exports.getMyBooks = async (req, res) => {
  const books = await Borrow.find({
    memberId: req.user.id,
    status: "borrowed",
  }).populate("bookId");

  res.json(books);
};