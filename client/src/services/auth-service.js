import axios from "axios";

const API_URL = "http://localhost:5000/users";

const signup = (username, password, email, fullname,city) => {
  const user = localStorage.getItem('user');
  console.log(email);
  const isAdmin = JSON.parse(localStorage.getItem('user')).isAdmin;
  var type = "citalac";
  if (isAdmin) type = "bibliotekar";
  return axios
    .post(API_URL + "/register", {
      username,
      password,
      email,
      fullname,
      city,
      type
    })
    .then((response) => {
      return response.data;
    });
};

const login = (username, password) => {
  return axios.post(API_URL + "/login", {
      username,
      password,
    })
    .then((response) => {
    //   if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
        console.log(response.data)
    //   }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};


const authService = {
  signup,
  login,
  logout,
  getCurrentUser
};

export default authService;