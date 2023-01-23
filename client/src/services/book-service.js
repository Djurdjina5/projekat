import axios from "axios";
import authService from "./auth-service";
import authHeader from "./auth-header";

const API_URL = "http://localhost:5000/books";

const book_upload = (
  title,
  yearPublished,
  authors,
  category,
  numberOfPages,
  description,
  slika
) => {
  const authors_array = authors.split(",");
  console.log("i am in book function");
  var bodyFormData = new FormData();
  bodyFormData.append("title", title);
  bodyFormData.append("yearPublished", yearPublished);
  bodyFormData.append("authors", authors_array);
  bodyFormData.append("category", category);
  bodyFormData.append("numberOfPages", numberOfPages);
  bodyFormData.append("description", description);
  bodyFormData.append("slika", slika);
  const user = JSON.parse(localStorage.getItem("user"));

  return axios({
    method: "post",
    url: API_URL + "/storeBook",
    data: bodyFormData,
    headers: {
      Authorization: user.token,
      "Content-Type": "multipart/form-data",
    },
  })
    .then(function(response) {
      return response.data;
    })
    .catch(function(response) {
      //handle error
      console.log(response);
    });
};

const get_free_books = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const headers = {
    Authorization: user.token,
  };
  return axios
    .get(API_URL + "/getFreeBooks", { headers })
    .then(function(response) {
      return response.data;
    })
    .catch(function(response) {
      //handle error
      console.log(response);
    });
};
const get_loaned_books_byuserid = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const headers = {
    Authorization: user.token,
  };
  const userID = JSON.parse(localStorage.getItem("user"))._id;

  return axios
    .post(API_URL + "/getloanedbooks", { userID }, { headers })
    .then(function(response) {
      console.log(response.data);
      return response.data;
    })
    .catch(function(response) {
      //handle error
      console.log(response);
    });
};

const get_books = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const headers = {
    Authorization: user.token,
  };
  return axios
    .get(API_URL + "/getBooks", { headers })
    .then(function(response) {
      return response.data;
    })
    .catch(function(response) {
      //handle error
      console.log(response);
    });
};

const loan_book = (title) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const headers = {
    Authorization: user.token,
  };
  const user_id = JSON.parse(localStorage.getItem("user"))._id;
  return axios
    .post(
      API_URL + "/loanBook",
      {
        title,
        user_id,
      },
      { headers }
    )
    .then((response) => {
      return response.data;
    })
    .catch(function(response) {
      //handle error
      console.log(response);
    });
};

const return_book = (title) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const headers = {
    Authorization: user.token,
  };
  return axios
    .post(
      API_URL + "/returnBook",
      {
        title,
      },
      { headers }
    )
    .then((response) => {
      return response.data;
    })
    .catch(function(response) {
      //handle error
      console.log(response);
    });
};

const delete_book = (title) => {
  console.log("i am in delete_book front");
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);
  const headers = {
    Authorization: user.token,
  };
  return axios
    .delete(API_URL + "/deleteBook/" + title, {
      headers,
    })
    .then((response) => {
      return response.data;
    })
    .catch(function(response) {
      //handle error
      console.log(response);
    });
};

const search_books = (title, authors) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const headers = {
    Authorization: user.token,
  };
  return axios
    .post(
      API_URL + "/searchBooks",
      {
        title,
        authors,
      },
      { headers }
    )
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch(function(response) {
      //handle error
      console.log(response);
    });
};

const get_categories = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const headers = {
    Authorization: user.token,
  };
  return axios
    .get("http://localhost:5000/categories" + "/getCategories")
    .then(
      function(response) {
        return response.data;
      },
      { headers }
    )
    .catch(function(response) {
      //handle error
      console.log(response);
    });
};

const bookService = {
  get_free_books,
  get_books,
  book_upload,
  loan_book,
  return_book,
  delete_book,
  search_books,
  get_categories,
  get_loaned_books_byuserid,
};

export default bookService;
