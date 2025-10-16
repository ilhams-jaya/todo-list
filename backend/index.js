import express from "express";
import cors from "cors";
import TodoRoute from "./routes/TodoRoute.js";
import db from "./config/Database.js";
import "./models/TodoModel.js"; 

const PORT = 5000

const app = express();

app.use(cors());
app.use(express.json());
app.use(TodoRoute);

async function start() {
  try {
    await db.authenticate();
    await db.sync();
    app.listen(PORT, () => {
      console.log(`✅ Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err.message);
    process.exit(1);
  }
}

start();
    