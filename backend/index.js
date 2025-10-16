import express from "express";
import cors from "cors";
import TodoRoute from "./routes/TodoRoute.js";

const app = express();

app.use(cors({
    origin: true,
    credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.get("/", (req, res) => {
    res.json({ 
        message: "Todo API is running", 
        status: "OK",
        timestamp: new Date().toISOString()
    });
});

app.use("/", TodoRoute);

app.use((err, req, res, next) => {
    console.error("Global error handler:", err);
    if (!res.headersSent) {
        res.status(500).json({ 
            message: "Internal Server Error", 
            error: process.env.NODE_ENV === 'production' ? 'Something went wrong!' : err.message 
        });
    }
});

app.use('*', (req, res) => {
    res.status(404).json({ message: "Route not found" });
});

if (process.env.NODE_ENV !== "production") {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

export default app;