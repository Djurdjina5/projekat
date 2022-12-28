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
      <div>
        <h2 className="naslov2">
          Списак твојих задужених књига дат је у табели:
        </h2>
        <table className="table  table-warning table-striped mt-5 pt-5">
          <thead>
            <tr>
              <th scope="col">Назив</th>
              <th scope="col">Аутор</th>
              <th scope="col">Година издања</th>
              <th scope="col">Број страна</th>
              <th scope="col">Категорија</th>
              <th scope="col">Датум за враћање</th>
            </tr>
          </thead>
          <tbody>
            {loanedBooks.map((books, index) => {
              return (
                <tr>
                  <td>{books.title}</td>
                  <td>{books.authors}</td>
                  <td>{books.yearPublished}</td>
                  <td>{books.numberOfPages}</td>
                  <td>{books.category.name}</td>
                  <td>{books.dateLoaned}</td>
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
