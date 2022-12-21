import React, { useState, useEffect } from "react";
import bookService from "../services/book-service";
import authService from "../services/auth-service";
import SearchBook from "./BookSearch";
import Header from "./Header"

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
  }

  const userType = authService.getCurrentUserType();


  return (
    <>
    {userType == "citalac" ?  (
      <div>
      <Header />
      {books.map((book, index) => {
        return (
          <div className="row row-cols-1 row-cols-md-2 g-4" key={index}> 
          <div className="card" >
          <div className="col">
            <img src={book.picturePath} style={{width:300,height:300}} className="card-img-top"/>
            <div className= "card-body">
              <h5 className="card-title"> {book.title}</h5>
              <p className="card-text"> {book.description}</p>   
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item"> {book.authors}</li>
              <li className="list-group-item">{book.numberOfPages}</li>
            </ul>
            <button className="btn btn-primary bnt-sm" onClick={() => LoanBook(book.title) }>
              Задужите књигу
            </button>
            <hr />
            </div>
          </div>
        </div>
        );
      })}
    </div>
    )  : (<p></p>)}
    
    <SearchBook /></>
  )
  
}

export default Citalac;