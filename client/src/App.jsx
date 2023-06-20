import React from "react";
import BookList from "./pages/BookList";
import AddBook from "./pages/AddBook";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div className=' bg-slate-100'>
      <Routes>
        <Route exact path='/' element={<BookList />}></Route>
        <Route exact path='/addBook' element={<AddBook />} />
      </Routes>
    </div>
  );
};

export default App;
