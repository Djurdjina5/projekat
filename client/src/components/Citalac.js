import React, { useState, useEffect } from "react";
import { Form, renderMatches } from "react-router-dom";
import bookService from "../services/book-service";
import authService from "../services/auth-service";
import SearchBook from "./BookSearch";
import Header from "./Header";
import NavBar from "./NavBar";

const Citalac = () => {
  const [books, setBooks] = useState([]);
  const [loanedBooks, setLoanedBooks] = useState([]);
  useEffect(() => {
    if (books.length == 0) {
      bookService.get_free_books().then(function(result) {
        setBooks(result);
      });
    }
    if (loanedBooks.length == 0) {
      bookService.get_loaned_books_byuserid().then(function(result) {
        setLoanedBooks(result);
      });
    }
  }, [books.prop, loanedBooks.prop]);

  const LoanBook = (title) => {
    bookService.loan_book(title);
    window.location.reload();
  };

  const userType = authService.getCurrentUserType();
  const userID = authService.getCurrentUserID();

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
      <div className="contentAdd">
        <h2 className="naslov2 mt-2 mb-1">
          Списак твојих задужених књига дат је у табели:
        </h2>
        <table className="table table-warning table-striped mt-3 pt-5">
          <thead className="thead">
            <tr>
              <th scope="col">Назив</th>
              <th scope="col">Аутор</th>
              <th scope="col">Година издања</th>
              <th scope="col">Број страна</th>
              <th scope="col">Категорија</th>
              <th scope="col">Рок за враћање</th>
            </tr>
          </thead>
          <tbody>
            {loanedBooks.map((book, index) => {
              return (
                <tr>
                  <td>{book.title}</td>
                  <td>{book.authors}</td>
                  <td>{book.yearPublished}</td>
                  <td>{book.numberOfPages}</td>
                  <td>{book.category.name}</td>
                  <td>{book.dateReturned}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Citalac;
