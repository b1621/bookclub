const multer = require("multer");
const fs = require("fs");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public/images"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

exports.createtest = [
  upload.single("image"),
  (req, res) => {
    const fileName = req.file.filename;
    console.log(req.file);
    // Example: Send a response
    res.send(`File ${fileName} uploaded successfully.`);
  },
];

exports.getAllImages = (req, res) => {
  const directoryPath = path.join(__dirname, "../public/images");

  // Read the contents of the images directory
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error("Error reading directory:", err);
      res.status(500).send("Error reading directory");
      return;
    }

    // Filter out any non-image files
    const imageFiles = files.filter((file) => {
      const fileExtension = path.extname(file).toLowerCase();
      return [".jpg", ".jpeg", ".png", ".gif"].includes(fileExtension);
    });

    // Generate URLs for the images
    const imageUrls = imageFiles.map((file) => {
      return `${req.protocol}://${req.get("host")}/images/${file}`;
    });

    // Send the URLs as a response
    res.send(imageUrls);
  });
};
exports.gettest = (req, res) => {
  const images = [
    { title: "Image 1", filename: "1687105360256.png" },
    { title: "Image 2", filename: "1687106299083.jpg" },
  ];

  res.json(images);
};
