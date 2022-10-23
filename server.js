import express from "express";
import mongoose from "mongoose";
import cors from "cors"
import taskRouter from "./routers/taskRouter.js";
import dotenv from "dotenv";


dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_DB, 
  (err, db) => {
  if (!err) {
          console.log("MongoDb Connected");
        } else {
          console.log("Error Connection");
        }
});

app.use(cors())

// Request payload middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api/tasks", taskRouter);

const port = process.env.PORT || 7000;

app.get("/", (req, res) => {
  res.send("Server is ready");
});


app.listen(port, () => {
  console.log(`Server at port ${port}`);
});