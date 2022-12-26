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
      setError('Апликација не може да креира књигу')
      console.log(err);
    }
  };
  
return (
    <div className="container">
      <h2 className="naslov2"> Додај нову књигу</h2>
      <div>
    <form onSubmit={uploadBook}>
    <input
      placeholder='Унесите назив књиге'
      type="text"
      id="title"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      className="form-control" 
       style={{backgroundColor:"#8C6057"}}/>
    <input
      label='Аутори'
      placeholder="Унесите аутора"
      type="text"
      id="authors"
      value={authors}
      onChange={(e) => setAuthors(e.target.value)}
      className="form-control" 
       style={{backgroundColor:"#8C6057"}}/>
    <input
      label='Category'
      type="text"
      placeholder="Унесите категорију"
      id="category"
      value={category}
      onChange={(e) => setCategory(e.target.value)}
      className="form-control" 
       style={{backgroundColor:"#8C6057"}}/>
    <input
      label='Description'
      type="text"
      placeholder="Унесите кратак опис"
      id="description"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      className="form-control"
       style={{backgroundColor:"#8C6057"}}/>
    <input
      label='Number of pages'
      type="number"
      placeholder="Унесите број страна"
      id="pagenumber"
      value={numberOfPages}
      onChange={(e) => setnumberOfPages(e.target.value)}
      className="form-control" 
      style={{backgroundColor:"#8C6057"}}/>
    <input
      label='Year'
      type="number"
      placeholder="Унесите годину издања"
      id="yearnumber"
      value={publishedYear}
      onChange={(e) => setpublisedYear(e.target.value)}
      className="form-control"
       style={{backgroundColor:"#8C6057"}} />
    <input 
      placeholder="Изаберите слику књиге"
      type="file"
      name="selectedImage"
      onChange={(event) => {setSelectedImage(event.target.files[0]);}}
      />
    <button type="submit" className="btn btn-warning" >
      Додајте књигу
    </button>
    </form>

    <div>
      {error &&
        <div className="alert alert-danger">
          <strong>Грешка!{error} </strong>
        </div>}
    </div>
  </div>
    <div>
      {message &&
        <div className="alert alert-sucess">
          <strong>Успешно!{message} </strong>
        </div>}
    </div>
  </div>
  );}

export default AddNewBook;