import React, { useState, useEffect } from "react";
import bookService from "../services/book-service";
import Header from "./Header";

const AddNewBook = () => {
  const [title, setTitle] = useState("");
  const [yearPublished, setyearPublished] = useState("");
  const [authors, setAuthors] = useState("");
  const [slika, setSelectedImage] = useState("");
  const [numberOfPages, setnumberOfPages] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  useEffect(() => {
    if (categories.length == 0) {
      bookService.get_categories().then(function(result) {
        setCategories(result);
      });
    }
  }, [categories.prop]);

  const uploadBook = async (e) => {
    e.preventDefault();
    if (
      title == "" ||
      yearPublished == "" ||
      authors == "" ||
      title == "" ||
      description == "" ||
      numberOfPages == ""
    ) {
      setError("Унесите све параметре!");
      return;
    }
    try {
      await bookService
        .book_upload(
          title,
          yearPublished,
          authors,
          category,
          numberOfPages,
          description,
          slika
        )
        .then(
          () => {
            const user = localStorage.getItem("user");
            setMessage("Књига је успешно креирана!");
          },
          (error) => {
            setError("Апликација не може да креира књигу");
            console.log(error);
          }
        );
    } catch (err) {
      setError("Апликација не може да креира књигу");
      console.log(err);
    }
  };

  const Categories = (props) => (
    <select
      name="category_select"
      id="category_select_id"
      onChange={(e) => setCategory(e.target.value)}
      value={category._id}
      className="form-control"
      style={{ backgroundColor: "#8C6057", borderColor: "#CA7DF9" }}
    >
      {categories.map((category) => (
        <option value={category._id}>{category.name}</option>
      ))}
    </select>
  );

  return (
    <>
      <Header />
      <div className="container ">
        <h2 className="naslov2 mt-2 mb-2"> Додај нову књигу</h2>
        <div className="contentAdd">
          <form onSubmit={uploadBook}>
            <input
              placeholder="Унесите назив књиге"
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-control"
              style={{ backgroundColor: "#8C6057", borderColor: "#CA7DF9" }}
            />
            <input
              label="Аутори"
              placeholder="Унесите аутора"
              type="text"
              id="authors"
              value={authors}
              onChange={(e) => setAuthors(e.target.value)}
              className="form-control"
              style={{ backgroundColor: "#F5DEB3", borderColor: "#CA7DF9" }}
            />

            <Categories />
            <input
              label="Description"
              type="text"
              placeholder="Унесите кратак опис"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="form-control"
              style={{ backgroundColor: "#F5DEB3", borderColor: "#CA7DF9" }}
            />
            <input
              label="Number of pages"
              type="number"
              placeholder="Унесите број страна"
              id="pagenumber"
              value={numberOfPages}
              onChange={(e) => setnumberOfPages(e.target.value)}
              className="form-control"
              style={{ backgroundColor: "#8C6057", borderColor: "#CA7DF9" }}
            />
            <input
              label="Year"
              type="text"
              placeholder="Унесите годину издања"
              id="yearnumber"
              value={yearPublished}
              onChange={(e) => setyearPublished(e.target.value)}
              className="form-control"
              style={{ backgroundColor: "#F5DEB3", borderColor: "#CA7DF9" }}
            />
            <input
              placeholder="Изаберите слику књиге"
              type="file"
              name="selectedImage"
              onChange={(event) => {
                setSelectedImage(event.target.files[0]);
              }}
            />
            <button type="submit" className="btn btn-warning">
              Додајте књигу
            </button>
          </form>

          <div>
            {error && (
              <div className="alert alert-danger">
                <strong>Грешка!{error} </strong>
              </div>
            )}
          </div>
        </div>
        <div>
          {message && (
            <div className="alert alert-sucess">
              <strong>Успешно!{message} </strong>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AddNewBook;
