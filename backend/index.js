require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

const app = express();

app.get("/", (response, request) => {
  request.send("<h1>Book app</h1>");
});

async function main() {
  try {
    await mongoose.connect("hello");
    console.log("Connected to the database.");
    app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
    });
  } catch (error) {
    console.log(error.message);
  }
}

main();
