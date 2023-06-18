import React, { useState } from "react";

const Form = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", selectedImage);

    fetch("http://localhost:3001/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
        // Handle success or error response from the server
      })
      .catch((error) => {
        console.error(error);
        // Handle error if any
      });
  };
  return (
    <>
      <div>
        <form onSubmit={handleFormSubmit}>
          <input type="file" onChange={handleImageChange} />
          <button type="submit" className="border px-5 text-white">
            Upload
          </button>
        </form>
      </div>
    </>
  );
};

export default Form;
