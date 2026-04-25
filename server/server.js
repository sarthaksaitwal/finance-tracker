import express from 'express'
import mongoose from 'mongoose';

mongoose.connect("mongodb://127.0.0.1:27017/mydatabase")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

const app = express()
const port = 3000;

app.get("/", (req,res) => {
    res.send("Hello World!")
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});