const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const fs = require("fs");
const path = require("path");

const multer = require("multer");

// Set up Multer storage for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public/images"));
    // Specify the directory where the images will be stored
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + "-" + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

exports.getAllBooks = async (req, res) => {
  try {
    const books = await prisma.book.findMany({
      include: {
        image: true,
      },
    });
    // console.log(books);
    res.status(200).json(books);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};

exports.getBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await prisma.book.findUnique({
      where: {
        id: parseInt(id),
      },

      include: {
        image: true,
      },
    });
    res.status(200).json({
      status: "success",
      book,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.createBook = [
  upload.single("image"),
  async (req, res) => {
    if (!req.file) {
      res.status(400).send("No image file provided.");
      return;
    }
    try {
      const { originalname, filename } = req.file;
      const { title, author, genre, synopsis } = req.body;

      const imagePath = `/images/${filename}`;

      // Insert the image location into the database using PrismaClient
      const book = await prisma.book.create({
        data: {
          title,
          author,
          genre,
          synopsis,
          image: {
            create: {
              originalName: originalname,
              fileName: filename,
              path: imagePath,
            },
          },
        },
        include: {
          image: true,
        },
      });
      console.log("Book created ", book);

      res.status(200).send("Image uploaded and saved successfullly.");
    } catch (err) {
      console.log("Error ", err);
      res.status(500).send("error saving the image");
    }
  },
];

exports.deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await prisma.book.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.status(200).json({
      status: "success",
      message: "Book deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err,
    });
  }
};

exports.updateBook = [
  upload.single("image"),
  async (req, res) => {
    const { id } = req.params;
    const { title, author, genre, synopsis } = req.body;
    try {
      // Find the book by ID using PrismaClient
      const existingBook = await prisma.book.findUnique({
        where: { id: parseInt(id) },
      });

      if (!existingBook) {
        res.status(404).json({ error: "Book not found" });
        return;
      }

      // Update book details
      const updatedBook = await prisma.book.update({
        where: { id: parseInt(id) },
        data: {
          title,
          author,
          genre,
          synopsis,
        },
      });

      // Update the image if a new file is provided
      if (req.file) {
        console.log(req.file);
        const { originalname, filename } = req.file;
        const imagePath = `/images/${filename}`;

        console.log("----------");
        console.log(originalname);
        console.log(filename);
        console.log(imagePath);

        // Create or update the image record associated with the book

        await prisma.images.upsert({
          where: { id: parseInt(id) },
          create: {
            originalName: originalname,
            fileName: filename,
            path: imagePath,
            Book: { connect: { id: parseInt(id) } },
          },
          update: {
            originalName: originalname,
            fileName: filename,
            path: imagePath,
          },
        });
      }

      res
        .status(200)
        .json({ message: "Book updated successfully", book: updatedBook });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "An error occurred" });
    }
  },
];
