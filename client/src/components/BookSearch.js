import React, { useState, useEffect } from "react";
import { Form, renderMatches } from "react-router-dom";
import bookService from "../services/book-service";
import Header from "./Header";

const SearchBook = () => {
  const [title, setTitle] = useState("");
  const [authors, setAuthors] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");
  const [books_s, setSearchedBooks] = useState([]);
  const searchBooks = async (e) => {
    e.preventDefault();

    try {
      if (title == "" && authors == "") {
        setError("Морате унети барем један параметар");
        return;
      }

      bookService.search_books(title, authors).then(
        (books) => {
          if (!books) setError("Не постоји књига са задатим вредностима");
          else {
            setSearchedBooks(books);
          }
        },
        (error) => {
          setError("Не постоји књига са задатим вредностима");
          console.log(error);
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div>
        <Header />
        <h6
          className="naslov2 text-center mb-3 mt-3"
          style={{ fontSize: "30px" }}
        >
          Претрага књига{" "}
        </h6>
        <section className="search-sec">
          <div className="container">
            <form onSubmit={searchBooks}>
              <div className="row">
                <div className="col-lg-12">
                  <div className="row">
                    <div className="col-lg-3 col-md-3 col-sm-12 ">
                      <input
                        type="text"
                        label="author"
                        name="autor"
                        className="form-control search-slt"
                        placeholder="Унесите аутора"
                        value={authors}
                        onChange={(e) => setAuthors(e.target.value)}
                      />
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-12">
                      <input
                        type="text"
                        label="title"
                        name="author"
                        className="form-control search-slt"
                        placeholder="Унесите назив књиге"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>
                    {/* <div className="col-lg-3 col-md-3 col-sm-12">
                      <input
                        type="text"
                        label="category"
                        name="category"
                        className="form-control search-slt"
                        placeholder="Унесите категорију"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                      />
                    </div> */}
                    <div className="col-lg-3 col-md-3 col-sm-12">
                      <button type="submit" className="btn btn-warning wrn-btn">
                        {/* {" "} */}
                        Претражите књиге
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
        <div className="cards2">
          {books_s.map((book, index) => {
            return (
              <div className="cards2" key={index}>
                <div className="card2">
                  <div className="col">
                    <img src={book.picturePath} className="card2-img-top" />
                    <div className="card2-body">
                      <h5 className="card2-title" style={{ color: "black" }}>
                        {" "}
                        {book.title}
                      </h5>
                      <p className="card2-text" style={{ color: "black" }}>
                        {" "}
                        {book.authors}
                      </p>
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
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default SearchBook;
