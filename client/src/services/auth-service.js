import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:5000/users";

const signup = (username, password, email, fullname, city) => {
  const user = localStorage.getItem("user");
  console.log(email);
  const isAdmin = JSON.parse(localStorage.getItem("user")).isAdmin;
  var type = "citalac";
  if (isAdmin) type = "bibliotekar";
  return axios
    .post(API_URL + "/register", {
      username,
      password,
      email,
      fullname,
      city,
      type,
    })
    .then((response) => {
      return response.data;
    });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "/login", {
      username,
      password,
    })
    .then((response) => {
      //   if (response.data.accessToken) {
      localStorage.setItem("user", JSON.stringify(response.data));
      console.log(response.data);
      //   }
      return response.data;
    });
};

const logout = () => {
  const user = localStorage.getItem("user");
  const username = JSON.parse(localStorage.getItem("user")).username;
  console.log(username);
  const headers = {
    Authorization: user.token,
  };
  return axios
    .post(API_URL + "/logout", { username }, { headers })
    .then((response) => {
      //   if (response.data.accessToken) {
      console.log(response.data);
      //   }

      return response.data;
    });
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};
const getCurrentUserID = () => {
  return JSON.parse(localStorage.getItem("user"))._id;
};

const getCurrentUserType = () => {
  if (localStorage.getItem("user"))
    return JSON.parse(localStorage.getItem("user")).type;
  else return "";
};
const getIsAdmin = () => {
  if (localStorage.getItem("user"))
    return JSON.parse(localStorage.getItem("user")).isAdmin;
  else return "";
};

const changePassword = (username, oldPassword, newPassword) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const headers = {
    Authorization: user.token,
  };
  return axios
    .post(
      API_URL + "/changePassword",
      {
        username,
        oldPassword,
        newPassword,
      },
      { headers }
    )
    .then((response) => {
      console.log(response.data);
      if (response.status == 200) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    })
    .catch(function(response) {
      console.log(response);
    });
};

const deleteAcc = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const headers = {
    Authorization: user.token,
  };
  console.log("i am in deleteAcc");
  const username = JSON.parse(localStorage.getItem("user")).username;
  return axios
    .post(
      API_URL + "/deleteAcc",
      {
        username,
      },
      { headers }
    )
    .then((response) => {
      localStorage.removeItem("user");
      return response;
    })
    .catch(function(response) {
      console.log(response);
    });
};

const authService = {
  signup,
  login,
  logout,
  getCurrentUser,
  changePassword,
  deleteAcc,
  getCurrentUserType,
  getCurrentUserID,
  getIsAdmin,
};

export default authService;
