const express = require("express");
const cors = require("cors");

const indexRoute = require("./routes/index");
const postRoute = require("./routes/post");
const postsRoute = require("./routes/posts");
const fileRoute = require("./routes/file");

const app = express();

// Configuration
app.use(express.json());
app.use(cors());

// Routes
app.use("/", indexRoute);
app.use("/post", postRoute);
app.use("/posts", postsRoute);
app.use("/file", fileRoute);

// Default to 404 if Endpoint/Method Not Recognized
app.use((req, res) => res.status(404).json({ message: "Not found" }));

module.exports = app;
