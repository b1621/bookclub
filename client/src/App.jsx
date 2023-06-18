// // import { useState } from "react";

// import Form from "./components/Form";

// function App() {
//   // const [count, setCount] = useState(0);

//   return (
//     <>
//       <div className=" h-screen bg-slate-900">
//         <h1 className=" text-2xl text-center text-white">Books Home page</h1>
//         <Form />
//       </div>
//     </>
//   );
// }

// export default App;

import React, { useState } from "react";
import AddBook from "./pages/AddBook";
import BookList from "./pages/BookList";

const App = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadStatus("No file selected.");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await fetch("http://localhost:3001/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setUploadStatus("Image uploaded and saved successfully.");
      } else {
        setUploadStatus("Error uploading the image.");
      }
    } catch (error) {
      console.error(error);
      setUploadStatus("Error uploading the image.");
    }
  };
  const showHandle = async () => {
    const response = await fetch("http://localhost:3001/upload", {
      method: "GET",
    });
    console.log(response);
  };
  return (
    <div>
      <h1>Image Upload</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      <p>{uploadStatus}</p>

      <div>
        <button onClick={showHandle}>show</button>
      </div>

      <div className=" my-10">
        <AddBook />
      </div>

      <div>
        <BookList />
      </div>
    </div>
  );
};

export default App;
