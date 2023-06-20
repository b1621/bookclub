import { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "../components/BookCard";
import { Link } from "react-router-dom";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [serverPath, setServerPath] = useState("");
  const [serverProtocol, setServerProtocol] = useState("");
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:3001/api/books", {
          withCredentials: true,
        }); // Make a GET request to your API endpoint
        setBooks(response.data);

        setServerPath(response.headers["server-host"]);
        setServerProtocol(response.headers["server-protocol"]);
        // console.log(response.headers);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchBooks();
    // Get the server host dynamically
    // const host = window.location.host;
    // const protocol = window.location.protocol;
    // setServerPath(`${protocol}//${host}`);
  }, []);
  return (
    <div className=' container w-[60%] mx-auto  '>
      <h1>Book List</h1>
      <Link to='/addbook'>
        {" "}
        <button className=' border px-5 '> Add Book</button>{" "}
      </Link>
      <div className=' flex flex-row flex-wrap mx-auto '>
        {books.map((book) => (
          <div key={book.id}>
            <BookCard
              book={book}
              serverPath={serverPath}
              serverProtocol={serverProtocol}
            />
            {/* Render other book details as needed */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;
