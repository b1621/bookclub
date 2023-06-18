exports.gettest = (req, res) => {
  const images = [
    { title: "Image 1", filename: "1687105360256.png" },
    { title: "Image 2", filename: "1687106299083.jpg" },
  ];

  res.json(images);
};
