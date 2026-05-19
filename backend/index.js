require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bookRouter = require("./routes/books");
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

const app = express();
app.use(express.json());
app.use("/books", bookRouter);

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
