import express from "express";
import cors from "cors";
import TodoRoute from "./routes/TodoRoute.js";

const PORT = 5000

const app = express();

app.use(cors());
app.use(express.json())
app.use(TodoRoute);

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
})
    