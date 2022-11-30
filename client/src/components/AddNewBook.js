import React, { useState, useEffect } from "react";
import bookService from "../services/book-service";
import './AddNewComponent.css';

const AddNewBook = () => {
  const [title, setTitle] = useState("");
  const [publishedYear, setpublisedYear] = useState("");
  const [authors, setAuthors] = useState("");
  const [category, setCategory] = useState("");
  const [slika, setSelectedImage] = useState("");
  const [numberOfPages, setnumberOfPages] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const uploadBook = async (e) => {
    e.preventDefault();
    if(title == "" || publishedYear == "" || authors == "" || title == "" || category == "" || description == ""){
      setError("Унесите све параметре");
      return
    }
    try {
       await bookService.book_upload(title,publishedYear, authors, category, 
        numberOfPages,description,slika
        ).then(
        () => {
          const user = localStorage.getItem('user');
          setMessage("Књига је успешно креирана!")
        },
        (error) => {
          setError('Апликација не може да креира књигу')
          console.log(error);
        }
      );
    } catch (err) {
      setError('Апликација не моће да креира књигу')
      console.log(err);
    }
  };
  
return (
    <><><form onSubmit={uploadBook}>
    <input
      placeholder='Назив књиге'
      type="text"
      id="title"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      className="form-control" />
    <input
      label='Аутори'
      placeholder="Аутори"
      type="text"
      id="authors"
      value={authors}
      onChange={(e) => setAuthors(e.target.value)}
      className="form-control" />
    <input
      label='Category'
      type="text"
      placeholder="Категорија"
      id="category"
      value={category}
      onChange={(e) => setCategory(e.target.value)}
      className="form-control" />
    <input
      label='Description'
      type="text"
      placeholder="Кратак опис"
      id="description"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      className="form-control" />
    <input
      label='Number of pages'
      type="number"
      placeholder="Број страна"
      id="pagenumber"
      value={numberOfPages}
      onChange={(e) => setnumberOfPages(e.target.value)}
      className="form-control" />
    <input
      label='Year'
      type="number"
      placeholder="Година издања"
      id="yearnumber"
      value={publishedYear}
      onChange={(e) => setpublisedYear(e.target.value)}
      className="form-control" />
    <input
      placeholder="Избаерите слику књиге"
      type="file"
      name="selectedImage"
      onChange={(event) => {
        setSelectedImage(event.target.files[0]);
      } } />

    <button type="submit" className="btn btn-primary" style={{ color: 'black', backgroundColor: 'brown' }}>
      Додајте књигу
    </button>

  </form><div>
      {error &&
        <div className="alert alert-danger">
          <strong>Грешка!{error} </strong>
        </div>}
    </div></><div>
      {message &&
        <div className="alert alert-sucess">
          <strong>Успешно!{message} </strong>
        </div>}
    </div></>
      );
   }

export default AddNewBook;