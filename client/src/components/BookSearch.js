import React, { useState, useEffect } from "react";
import { Form, renderMatches } from "react-router-dom";
import bookService from "../services/book-service";

const SearchBook  = ()=> {
  const [title, setTitle] = useState("");
  const [authors, setAuthors] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError]   = useState("");
  const [books_s, setSearchedBooks]   = useState([]);
  const searchBooks = async (e) => {
    e.preventDefault();

   
    try {
        if(title == "" && authors == "" && category == ""){
            setError("Morate uneti barem jedan parametar");
            return
        }
    
        bookService.search_books(title,authors,category).then(
         (books) => {
            setSearchedBooks(books);
            if(books.length ==0 ) setError("Не постоји књига са задатим вредностима");
            
           
         },
         (error) => {
            
           setError('Не постоји књига са задатим вредностима')
           console.log(error);
         }
       );
     } catch (err) {
   
       console.log(err);
     }
    
    
  }
  

  return (
    <><div>
          <h6 className="text-center mb-4" style={{color:'black'}}>Претрага књига </h6>
          <section className="search-sec">
              <div className="container">
                  <form onSubmit={searchBooks}>
                      <div className="row">
                          <div className="col-lg-12">
                              <div className="row">

                                  <div className="col-lg-3 col-md-3 col-sm-12 p-0">
                                      <input
                                          type="text"
                                          label="author"
                                          name='autor'
                                          className="form-control search-slt"
                                          placeholder="Унесите аутора"
                                          value={authors}
                                          onChange={(e) => setAuthors(e.target.value)} />

                                  </div>

                                  <div className="col-lg-3 col-md-3 col-sm-12 p-0">
                                      <input
                                          type="text"
                                          label="title"
                                          name="author"
                                          className="form-control search-slt"
                                          placeholder="Унесите назив књиге"
                                          value={title}
                                          onChange={(e) => setTitle(e.target.value)} />
                                  </div>

                                  <div className="col-lg-3 col-md-3 col-sm-12 p-0">
                                      <input
                                          type="text"
                                          label="category"
                                          name="category"
                                          className="form-control search-slt"
                                          placeholder="Унесите категорију"
                                          value={category}
                                          onChange={(e) => setCategory(e.target.value)} />
                                  </div>

                                  <div className="col-lg-3 col-md-3 col-sm-12 p-0">
                                      <button type="submit"
                                          className="btn btn-danger wrn-btn"> Претражите књиге
                                        </button>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </form>
              </div>
          </section>
      </div>
      <div className="w3-container w3-red">
            <p>{error}</p>
          </div> 
      <div>
    {books_s.map((book, index) => {
      return (
        <div className="row row-cols-1 row-cols-md-2 g-4" key={index}> 
          <div className="card" >
          <div className="col">
            <img src={book.picturePath} style={{width:300,height:300}} className="card-img-top"/>
            <div className= "card-body">
              <h5 className="card-title" style={{color:"black"}}> {book.title}</h5>
              <p className="card-text" style={{color:"black"}}> {book.description}</p>   
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item"> {book.authors}</li>
              <li className="list-group-item">{book.numberOfPages}</li>
            </ul>
            </div>
          </div>
        </div>
                     
      );
    })}


  </div>
      </>
  )
}

export default SearchBook;