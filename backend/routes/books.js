const Book = require("../models/Book");
const express = require("express");

router = express.Router();
console.log("Working");
router.get("/", async (request, response) => {
  const books = await Book.find();
  response.json({
    count: books.length,
    data: books,
  });
});

router.post("/", async (request, response) => {
  if (!request.body.title || !request.body.author || !request.body.published) {
    return response.status(400).json({ error: "Missing fields." });
  }
  const book = await Book.create(request.body);
  response.json(book);
});

router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook) {
      return response.status(404).json({ message: "Book not found" });
    }
    response.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const book = await Book.findById(id);
    if (!book) {
      return response.status(404).json({ message: "Book not found" });
    }
    response.status(200).json(book);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

router.put("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    if (!request.body) {
      return response.status(400).send({ message: "Body required" });
    }
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.published
    ) {
      return response.status(400).send({ message: "fields missing" });
    }

    const newBook = await Book.findByIdAndUpdate(id, request.body, {
      returnDocument: "after",
      overwrite: true,
    });

    if (!newBook) {
      return response.status(404).json({ message: "Book not found" });
    }

    response.status(200).json(newBook);
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: error.message });
  }
});

module.exports = router;
