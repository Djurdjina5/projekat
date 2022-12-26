import React, { useState, useEffect } from "react";
import { Form, renderMatches } from "react-router-dom";
import bookService from "../services/book-service";
import authService from "../services/auth-service";
import SearchBook from "./BookSearch";
import Header from "./Header";
import NavBar from "./NavBar";

const Citalac = () => {
  const [books, setBooks] = useState([]);
  const [loanbook, setLoanBook] = useState("");
  useEffect(() => {
    if (books.length == 0) {
      bookService.get_free_books().then(function(result) {
        setBooks(result);
      });
    }
  }, [books.prop]);

  const LoanBook = (title) => {
    bookService.loan_book(title);
    window.location.reload();
  };

  const userType = authService.getCurrentUserType();

  return (
    <>
      {userType == "citalac" ? (
        <div>
          <NavBar></NavBar>
          <div className="cards2">
            {books.map((book, index) => {
              return (
                <div className="cards2" key={index}>
                  <div className="card2">
                    <div className="col">
                      <img src={book.picturePath} className="card2-img-top" />
                      <div className="card2-body">
                        <h5 className="card2-title"> {book.title} </h5>
                        <p className="card2-text"> {book.authors}</p>
                        <p className="card2-text">
                          {" "}
                          {book.numberOfPages}
                          <p style={{ fontSize: "11px" }}>стр.</p>
                        </p>
                      </div>
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item"> {book.description}</li>
                        <li className="list-group-item">
                          {book.yearPublished}
                        </li>
                      </ul>
                      <button
                        className="btn btn-dark bnt-sm mt-2"
                        onClick={() => LoanBook(book.title)}
                      >
                        Задужите књигу
                      </button>
                      <hr />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <p></p>
      )}

      {/* <SearchBook /> */}
    </>
  );
};

export default Citalac;
