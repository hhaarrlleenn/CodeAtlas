const express = require("express");
const cors = require("cors");
const uploadRoute = require("./routes/upload");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Upload Route
app.use("/upload", uploadRoute);

// Test Route
app.get("/", (req, res) => {
    res.send("CodeAtlas Backend is Running!");
});

// Start Server
const PORT = process.env.PORT || 8000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on port ${PORT}`);
});