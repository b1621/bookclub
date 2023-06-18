import { useState } from "react";

const AddBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [image, setImage] = useState(null);

  const handleFileChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("title", title);
      formData.append("author", author);
      formData.append("genre", genre);
      formData.append("synopsis", synopsis);

      const response = await fetch("http://localhost:3001/api/books", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Upload successful");
        // Perform any necessary actions, e.g., show success message, redirect, etc.
      } else {
        console.error("Upload failed");
        // Handle the error, e.g., display an error message
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle the error, e.g., display an error message
    }
  };

  return (
    <form onSubmit={handleSubmit} className=" border bg-slate-50">
      <div>
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label>Author</label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </div>
      <div>
        <label>Genre</label>
        <input
          type="text"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />
      </div>
      <div>
        <label>Synopsis</label>
        <textarea
          value={synopsis}
          onChange={(e) => setSynopsis(e.target.value)}
        />
      </div>
      <div>
        <label>Image</label>
        <input type="file" accept="image/*" onChange={handleFileChange} />
      </div>
      <button type="submit">Upload</button>
    </form>
  );
};

export default AddBook;
