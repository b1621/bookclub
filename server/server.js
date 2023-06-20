const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");

const bookRoute = require("./routes/bookRoute");
const testroute = require("./routes/testroute");
// app.set("view engine", "ejs");
// app.use(express.static("public"));

// Serve static files from the "images" directory
// app.use("/images", express.static(path.join(__dirname, "images")));

// console.log(path.join(__dirname, "public/images"));

// Serve static files from the "public" directory

// app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "public")));

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    exposedHeaders: ["Server-Host", "Server-Protocol"], // Add the Server-Host header to the list of exposed headers
  })
);

// Custom middleware to set the Server-Host and Server-Protocol headers
const setServerHeaders = (req, res, next) => {
  res.setHeader("Server-Host", req.headers.host);
  res.setHeader("Server-Protocol", req.protocol);
  next();
};
app.use(setServerHeaders); // Use the custom middleware to set the Server-Host and Server-Protocol headers

app.use("/api/books", bookRoute);
app.use("/test", testroute);

app.listen(3001, () => console.log("server open on port 3001"));
