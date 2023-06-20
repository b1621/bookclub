import React from "react";

const BookCard = ({ book, serverPath, serverProtocol }) => {
  return (
    <div className=' my-3 mx-7 w-64 h-80  rounded-2xl bg-white shadow-sm'>
      {book.image && (
        <div className=' h-52'>
          <img
            className='h-full  w-full rounded-t-2xl'
            src={serverProtocol + "://" + serverPath + book.image.path}
            alt='Book Cover'
          />
        </div>
      )}
      <div className='px-4  py-3'>
        <h3 className='text-lg font-bold'>{book.title.toUpperCase()}</h3>
        <p className='text-gray-700 '>{book.author}</p>
        <p className='text-sm text-slate-400'>{book.synopsis}</p>
      </div>
    </div>
  );
};

export default BookCard;
