import axios from "axios";

const API_URL = "http://localhost:5000/books";

const book_upload = (title,publishedYear,authors,category,
  numberOfPages,description, slika) => {
  const authors_array = authors.split(",");
  console.log("i am in book function")
  var bodyFormData = new FormData();
  bodyFormData.append('title', title);
  bodyFormData.append('publishedYear',publishedYear);
  bodyFormData.append('authors',authors_array);
  bodyFormData.append('category',category);
  bodyFormData.append('numberOfPages',numberOfPages);
  bodyFormData.append('description',description);
  bodyFormData.append('slika',slika);
  return axios({
    method: "post",
    url: API_URL + "/storeBook",
    data: bodyFormData,
    headers: { "Content-Type": "multipart/form-data" }
  })
    .then(function (response) {
      return response.data
    })
    .catch(function (response) {
      //handle error
      console.log(response);
    });
  
};

const get_free_books  = () => {
  return axios.get(
  API_URL + "/getFreeBooks"
  )
    .then(function(response){
      return response.data
    })
    .catch(function (response) {
      //handle error
      console.log(response);
    });

}

const get_books  = () => {
  return axios.get(
  API_URL + "/getBooks"
  )
    .then(function(response){
      return response.data
    })
    .catch(function (response) {
      //handle error
      console.log(response);
    });

}

const loan_book  = (title) => {
  const user_id = JSON.parse(localStorage.getItem('user'))._id;
  return axios
    .post(API_URL + "/loanBook", {
      title,
      user_id
    })
    .then((response) => {
      return response.data;
    }
    )
    .catch(function (response) {
      //handle error
      console.log(response);
    });

}

const return_book  = (title) => {
  return axios
    .post(API_URL + "/returnBook", {
      title
    })
    .then((response) => {
      return response.data;
    }
    )
    .catch(function (response) {
      //handle error
      console.log(response);
    });;

}

const delete_book  = (title) => {
  return axios
    .post(API_URL + "/deleteBook", {
      title
    })
    .then((response) => {
      return response.data;
    }
    )
    .catch(function (response) {
      //handle error
      console.log(response);
    });;

}

const search_books  = (title,authors, category ) => {
  return axios
    .post(API_URL + "/searchBooks", {
      title,
      authors,
      category
    })
    .then((response) => {
      console.log(response.data);
      return response.data;
    }
    )
    .catch(function (response) {
      //handle error
      console.log(response);
    });;

}

const bookService = {
  get_free_books,
  get_books,
  book_upload,
  loan_book,
  return_book,
  delete_book,
  search_books
 };

export default bookService;