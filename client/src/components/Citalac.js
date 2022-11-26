import React, { useState, useEffect } from "react";
import { Form, renderMatches } from "react-router-dom";
import bookService from "../services/book-service";
import SearchBook from "./BookSearch";

const Citalac  = ()=> {
  const [books, setBooks] = useState([]);
  const [loanbook, setLoanBook] = useState("")
    useEffect(()=>{
      if(books.length == 0){
        bookService.get_free_books().then(function(result){
          setBooks(result);
        })
      }
    },[books.prop])

  const LoanBook = (title) => {
    bookService.loan_book(title);
    window.location.reload();
    // check is there any error

  }
  return (
    <><div>
      {books.map((book, index) => {
        return (
          <div key={index}>
            <h1> Title: {book.title} </h1>
            <p> Number of pages: {book.numberOfPages}</p>
            <p> Authors: {book.authors}</p>
            <p> Description: {book.description}</p>
            <img src={book.picturePath} />
            <button onClick={() => LoanBook(book.title)}>
              Click me
            </button>
            <hr />
          </div>
        );
      })}

      <hr />
      <hr />
      <hr />
    </div></>
  )
  
}

export default Citalac;