import React, { useEffect, useState } from "react";

const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/books");
        // console.log(response);
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setBooks(data);
        } else {
          console.error("Error:", response.status);
          // Handle the error, e.g., display an error message
        }
      } catch (error) {
        console.error("Error:", error);
        // Handle the error, e.g., display an error message
      }
    };

    fetchBooks();
  }, []);

  return (
    <div>
      <h1>Book List</h1>
      {books.map((book) => (
        <div key={book.id}>
          <h2>{book.title}</h2>
          <p>Author: {book.author}</p>
          <p>Genre: {book.genre}</p>
          <p>Synopsis: {book.synopsis}</p>
          {book.image && (
            <div>
              <img src={book.image.path} alt={book.image.originalName} />
              <p>{book.image.path}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default BookList;
