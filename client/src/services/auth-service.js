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

const getCurrentUserType = () => {
  return JSON.parse(localStorage.getItem('user')).type;
}

const changePassword = (username, oldPassword, newPassword) => {
  return axios.post(API_URL + "/changePassword", {
    username,
    oldPassword,
    newPassword
  })
  .then((response) => {
  //   if (response.data.accessToken) {
      //ovde promeniti accessToken?
      console.log(response.data);
      if(response.status == 200) {
      localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
  })
  .catch(function (response){
    console.log(response);
  });
}

const deleteAcc = () => {
  console.log("i am in deleteAcc")
  const username = JSON.parse(localStorage.getItem('user')).username;
  return axios.post(API_URL + "/deleteAcc", {
    username
  })
  .then((response) => {
  //   if (response.data.accessToken) {
      //ovde promeniti accessToken?
      // if(response.status == 200) {
      // localStorage.removeItem("user");
      // }
      return response;
  })
  .catch(function (response){
    console.log(response);
  });


}


const authService = {
  signup,
  login,
  logout,
  getCurrentUser,
  changePassword,
  deleteAcc,
  getCurrentUserType
};

export default authService;