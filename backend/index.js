require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const Book = require("./models/Book");
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

const app = express();
app.use(express.json());

app.get("/books", async (request, response) => {
  const books = await Book.find();
  response.json({
    count: books.length,
    data: books,
  });
});

app.post("/books", async (request, response) => {
  if (!request.body.title || !request.body.author || !request.body.published) {
    return response.status(400).json({ error: "Missing fields." });
  }
  const book = await Book.create(request.body);
  response.json(book);
});

app.delete("/books/:id", async (request, response) => {
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

app.get("/books/:id", async (request, response) => {
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

app.put("/books/:id", async (request, response) => {
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
      new: true,
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

async function main() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to the database.");
    app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
    });
  } catch (error) {
    console.log(error.message);
  }
}

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("MongoDB connection closed.");
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await mongoose.connection.close();
  console.log("MongoDB connection closed.");
  process.exit(0);
});

main();
