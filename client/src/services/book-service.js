import axios from "axios";

const API_URL = "http://localhost:5000/books";



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


const bookService = {
  get_free_books,
  get_books
 };

export default bookService;