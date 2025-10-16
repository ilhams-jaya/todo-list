import express from "express";
import cors from "cors";
import TodoRoute from "./routes/TodoRoute.js";
import db from "./config/Database.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(TodoRoute);

// Health check endpoint
app.get("/", (req, res) => {
    res.json({ message: "Todo API is running", status: "OK" });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something went wrong!", error: err.message });
});

// Test database connection
const testConnection = async () => {
    try {
        await db.authenticate();
        console.log("Database connection established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
};

// Only start server if not in serverless environment
if (process.env.NODE_ENV !== "production") {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
        testConnection();
    });
}

// Export for Vercel serverless functions
export default app;