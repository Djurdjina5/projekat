import React, { useState, useEffect } from "react";
import bookService from "../services/book-service";
import authService from "../services/auth-service";
import Header from "./Header";
import Footer from "./Footer";

const Bibliotekar = () => {
  const [books, setBooks] = useState([]);
  const [freebooks, setFreeBooks] = useState([]);
  const [messageDelete, setMessageDelete] = useState("");
  const [messageReturn, setMessageReturn] = useState("");

  useEffect(
    () => {
      if (books.length == 0) {
        console.log("usao u useEffect");
        bookService.get_books().then(function(result) {
          setBooks(result); // ovde ubaciti slucaj ako nema trenutno knjiga za prikazivanje
        });
        bookService.get_free_books().then(function(result) {
          setFreeBooks(result);
        });
      }
    },
    [books.prop],
    [freebooks.prop]
  );

  const returnBook = (title) => {
    bookService.return_book(title);
    setMessageReturn("Књига је раздружена");
    window.location.reload();
  };

  const deleteBook = (title) => {
    bookService.delete_book(title);
    setMessageDelete("Књига је успешно избрисана");
    window.location.reload();
  };

  const userType = authService.getCurrentUserType();

  return (
    <>
      <div>
        <Header />
        <h2 className="naslov2"> Књиге за раздуживање</h2>
        <div>
          {messageReturn && (
            <div className="alert alert-sucess">
              <strong>Успешно!{messageReturn} </strong>
            </div>
          )}
        </div>
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
                      <li className="list-group-item">{book.yearPublished}</li>
                    </ul>
                    {book.isLoaned ? (
                      <button
                        className="btn btn-dark bnt-sm mt-3"
                        onClick={() => returnBook(book.title)}
                      >
                        Раздружи
                      </button>
                    ) : (
                      <p></p>
                    )}
                    <hr />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <h2 className="naslov2"> Слободне књиге за брисање</h2>
        <div>
          {messageDelete && (
            <div className="alert alert-sucess">
              <strong>Успешно!{messageDelete} </strong>
            </div>
          )}
        </div>
        <div className="cards2">
          {freebooks.map((book, index) => {
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
                      <li className="list-group-item">{book.yearPublished}</li>
                    </ul>
                    <button
                      className="btn btn-dark bnt-sm mt-3"
                      onClick={() => deleteBook(book.title)}
                    >
                      Обриши
                    </button>
                    <hr />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* <Footer/> */}
    </>
  );
};
export default Bibliotekar;
