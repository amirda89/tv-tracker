import express from "express";

const app = express();
const port = 3001;

app.get("/", (req, res) => {
  res.send(`<h1 style='text-align: center'>Server running...</h1>`);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
