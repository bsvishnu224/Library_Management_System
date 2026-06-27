const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const book = require("../controllers/bookController");


router.get("/", auth, book.getBooks);

router.post(
  "/",
  auth,
  role("librarian"),
  book.addBook
);

router.put(
  "/:id",
  auth,
  role("librarian"),
  book.updateBook
);

router.delete(
  "/:id",
  auth,
  role("librarian"),
  book.deleteBook
);

router.post(
  "/:id/borrow",
  auth,
  role("member"),
  book.borrowBook
);

router.post(
  "/:id/return",
  auth,
  role("member"),
  book.returnBook
);
router.get(
  "/:id",
  auth,
  book.getBookById
);

module.exports = router;