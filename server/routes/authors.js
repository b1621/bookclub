const express = require("express");
const router = express.Router();
const Author = require("../models/author");
// All Authors Route

router.get("/", (req, res) => {
  res.render("authors/index");
});

// New Author Route
router.get("/new", (req, res) => {
  res.locals.title = "add author";
  res.render("authors/new", { author: new Author() });
});
//create Author Route
router.post("/", async (req, res) => {
  const author = new Author({
    name: req.body.name,
  });
  try {
    // const author = await Author.create(req.body);
    const newAuthor = await author.save();
    res.redirect("authors");
  } catch (err) {
    console.log("--- there is an error ---");
    res.locals.errorMessage = "Error creating Author";
    console.log(errorMessage);
    res.redirect("authors/new");
    // res.redirect("authors/new", {
    //   errorMessage: "Error creating Author",
    // });
  }
});

module.exports = router;
