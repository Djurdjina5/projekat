import React, { useState, useEffect } from "react";
import { Form } from "react-router-dom";
import bookService from "../services/book-service";

const Bibliotekar = () => {
  const [title, setTitle] = useState("");
  const [publishedYear, setpublisedYear] = useState("");
  const [authors, setAuthors] = useState("");
  const [category, setCategory] = useState("");
  const [slika, setSelectedImage] = useState("");
  const [numberOfPages, setnumberOfPages] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [books, setBooks] = useState([]);
  const [freebooks,setFreeBooks] = useState([]);
  const [loanbook, setLoanBook] = useState("")
    useEffect(()=>{
      if(books.length == 0){
        bookService.get_books().then(function(result){
          setBooks(result); // ovde ubaciti slucaj ako nema trenutno knjiga za prikazivanje
        })
        bookService.get_free_books().then(function(result){
          setFreeBooks(result);
        })
        
      }
    },[books.prop],[freebooks.prop])

  const uploadBook = async (e) => {
    console.log("i am in upload book");
    e.preventDefault();
    try {
       await bookService.book_upload(title,publishedYear, authors, category, 
        numberOfPages,description,slika
        ).then(
        () => {
          const user = localStorage.getItem('user');
          console.log("Book succesfully upload");
        },
        (error) => {
          setError('Book unsuccesfully upload')
          console.log(error);
        }
      );
    } catch (err) {
      //setError('Invalid Username or Password')
      console.log(err);
    }
  };

  const returnBook = (title) => {
    console.log(title);
    bookService.return_book(title);
    window.location.reload();
    // check is there any error

  }
  
return (
      <><form onSubmit={uploadBook}>
    <input
      label='Book title'
      type="text"
      id="title"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      className="form-control" />
    <input
      label='Authors'
      type="text"
      id="authors"
      value={authors}
      onChange={(e) => setAuthors(e.target.value)}
      className="form-control" />
    <input
      label='Category'
      type="text"
      id="authors"
      value={category}
      onChange={(e) => setCategory(e.target.value)}
      className="form-control" />
    <input
      label='Description'
      type="text"
      id="description"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      className="form-control" />
    <input
      label='Number of pages'
      type="number"
      id="pagenumber"
      value={numberOfPages}
      onChange={(e) => setnumberOfPages(e.target.value)}
      className="form-control" />
    <input
      label='Year'
      type="number"
      id="yearnumber"
      value={publishedYear}
      onChange={(e) => setpublisedYear(e.target.value)}
      className="form-control" />
    <input
      type="file"
      name="selectedImage"
      onChange={(event) => {
        setSelectedImage(event.target.files[0]);
      } } />

    <button type="submit" className="btn btn-primary">
      Submit
    </button>

  </form><div> Zaduzivanje knjiga
  <div>
    {books.map((book, index) => {
      return (
        <div key={index}>
          <h1> Title : {book.title} </h1>
          <p> Number of pages : {book.numberOfPages}</p>
          <p> Authors : {book.authors}</p>
          <p> Description: {book.description}</p>
          <img src = {book.picturePath} /> 
          <button onClick={() => returnBook(book.title)}>
        Return book
      </button>
          <hr />
        </div>
      );
    })}

    <hr />
    <hr />
    <hr />
  </div>
    </div>
    
    </>

      

      );
    }


    

      export default Bibliotekar;