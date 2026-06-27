
const Book = require("../models/Book");
const Borrow = require("../models/Borrow");


const addBook = async (req, res) => {
  const book = await Book.create(req.body);

  res.status(201).json(book);
};

const getBooks = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  let filter = {};

  if (req.query.search) {
    filter.title = {
      $regex: req.query.search,
      $options: "i",
    };
  }

  if (req.query.category) {
    filter.category = req.query.category;
  }

  const books = await Book.find(filter)
    .skip((page - 1) * limit)
    .limit(limit);

  res.json(books);
};

const updateBook = async (req, res) => {
  const book = await Book.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true
    }
  );

  res.json(book);
};

const deleteBook = async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);

  res.json({
    message: "Book deleted"
  });
};
const borrowBook = async (req, res) => {
  const book = await Book.findById(
    req.params.id
  );

  if (!book) {
    return res.status(404).json({
      message: "Book not found"
    });
  }

  if (book.availableQuantity <= 0) {
    return res.status(400).json({
      message: "Book is currently unavailable"
    });
  }

  const alreadyBorrowed =
    await Borrow.findOne({
      memberId: req.user.id,
      bookId: book._id,
      status: "borrowed"
    });

  if (alreadyBorrowed) {
    return res.status(400).json({
      message: "Already borrowed"
    });
  }

  await Borrow.create({
    memberId: req.user.id,
    bookId: book._id
  });

  book.availableQuantity -= 1;

  await book.save();

  res.json({
    message: "Book borrowed"
  });
};

const returnBook = async (req, res) => {
  const borrow = await Borrow.findOne({
    memberId: req.user.id,
    bookId: req.params.id,
    status: "borrowed"
  });

  if (!borrow) {
    return res.status(400).json({
      message: "No borrowed record"
    });
  }

  borrow.status = "returned";
  borrow.returnDate = new Date();

  await borrow.save();

  const book = await Book.findById(
    req.params.id
  );

  book.availableQuantity += 1;

  await book.save();

  res.json({
    message: "Book returned"
  });
};
const getBookById = async (req, res) => {
  const book = await Book.findById(req.params.id);

  if (!book) {
    return res.status(404).json({
      message: "Book not found",
    });
  }

  res.json(book);
};

module.exports = {
  addBook,
  getBooks,
  updateBook,
  deleteBook,
  borrowBook,
  returnBook,
  getBookById
};

