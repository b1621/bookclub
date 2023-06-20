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

  const contStyle = "flex flex-row justify-between mx-20 my-5";
  const labelStyle = "text-xl";
  const inputStyle = "border outline-none rounded-md px-2 py-1 w-1/2";
  return (
    <form
      onSubmit={handleSubmit}
      className=' border bg-slate-50 w-[700px] mx-auto my-14'
    >
      <p className='text-center text-3xl my-2'>Add Book</p>
      <div className='my-16'>
        <div className={contStyle}>
          <label className={labelStyle}>Title</label>
          <input
            className={inputStyle}
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className={contStyle}>
          <label className={labelStyle}>Author</label>
          <input
            className={inputStyle}
            type='text'
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div className={contStyle}>
          <label className={labelStyle}>Genre</label>
          <input
            type='text'
            className={inputStyle}
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          />
        </div>
        <div className={contStyle}>
          <label className={labelStyle}>Synopsis</label>
          <textarea
            className={inputStyle}
            value={synopsis}
            onChange={(e) => setSynopsis(e.target.value)}
          />
        </div>
        <div className={contStyle}>
          <label className={labelStyle}>Image</label>
          <input type='file' accept='image/*' onChange={handleFileChange} />
        </div>
        <div className=''>
          <button
            className='border border-green-900 text-green-900 px-7 mx-[40%] my-10'
            type='submit'
          >
            Upload
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddBook;
