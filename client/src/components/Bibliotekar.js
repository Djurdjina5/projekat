import React, { useState, useEffect } from "react";
import bookService from "../services/book-service";
import authService from "../services/auth-service";
import Header from "./Header"

const Bibliotekar = () => {

  const [books, setBooks] = useState([]);
  const [freebooks,setFreeBooks] = useState([]);
  const [messageDelete, setMessageDelete] = useState("");
  const [messageReturn, setMessageReturn] = useState("");

    useEffect(()=>{
      if(books.length == 0){
        console.log("usao u useEffect");
        bookService.get_books().then(function(result){
          setBooks(result); // ovde ubaciti slucaj ako nema trenutno knjiga za prikazivanje
        })
        bookService.get_free_books().then(function(result){
          setFreeBooks(result);
        })
        
      }
    },[books.prop],[freebooks.prop])

  
  const returnBook = (title) => {
    bookService.return_book(title);
    setMessageReturn("Књига је раздружена");
    window.location.reload();
    
  }

  const deleteBook = (title) => {
    bookService.delete_book(title);
    setMessageDelete("Књига је успешно избрисана");
    window.location.reload();
  }

  const userType = authService.getCurrentUserType();
  
return (  

  
    <>

    <div>
      <Header />
    <h2> Књиге за раздуживање</h2>
    <div>
      {messageReturn &&
        <div className="alert alert-sucess">
          <strong>Успешно!{messageReturn} </strong>
        </div>}
    </div>
    {books.map((book, index) => {
      return (
        <div className="row row-cols-1 row-cols-md-2 g-4" key={index}>
          <div className="card">
            <div className="col">
              <img src={book.picturePath} style={{ width: 200, height: 200 }} className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title" style={{ color: "black" }}> {book.title} </h5>
                <p className="card-text" style={{ color: "black" }}> {book.description}</p>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item"> {book.authors}</li>
                <li className="list-group-item">{book.numberOfPages}</li>
              </ul>
              {book.isLoaned ?
                <button className="btn btn-primary bnt-sm" onClick={() => returnBook(book.title)}>
                  Раздружи
                </button> : <p></p>}
              <hr />
            </div>
          </div>
        </div>
      );
    })}
  </div><div>
    <h2> Слободне књиге за брисање</h2>
    <div>
      {messageDelete &&
        <div className="alert alert-sucess">
          <strong>Успешно!{messageDelete} </strong>
        </div>}
    </div>
      {freebooks.map((book, index) => {
        return (
          <div className="row row-cols-1 row-cols-md-2 g-4" key={index}>
            <div className="card">
              <div className="col">
                <img src={book.picturePath} style={{ width: 200, height: 200 }} className="card-img-top" />
                <div className="card-body">
                  <h5 className="card-title" style={{ color: "black" }}> {book.title} </h5>
                  <p className="card-text" style={{ color: "black" }}> {book.description}</p>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item"> {book.authors}</li>
                  <li className="list-group-item">{book.numberOfPages}</li>
                </ul>
                  <button className="btn btn-primary bnt-sm" onClick={() => deleteBook(book.title)}>
                    Обриши
                  </button>
                <hr />
              </div>
            </div>
          </div>
        );
      })}
    </div> </> 
      );
}
export default Bibliotekar;