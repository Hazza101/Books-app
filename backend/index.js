const express = require("express");
const PORT = 3000;
app = express();

app.get("/", (response, request) => {
  request.send("<h1>Book app</h1>");
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
