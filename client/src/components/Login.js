import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth-service";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    console.log("i am in handle login");
    e.preventDefault();
    try {
      await AuthService.login(username, password).then(
        () => {
          const user = localStorage.getItem("user");
          const type = JSON.parse(localStorage.getItem("user")).type;
          const isAdmin = JSON.parse(localStorage.getItem("user")).isAdmin;
          if (isAdmin) {
            navigate("/admin");
          } else if (type == "citalac") {
            navigate("/citalac");
          } else navigate("/bibliotekar");
          console.log("Успешна пријава");
          window.location.reload();
        },
        (error) => {
          setError("Нетачно унети подаци!");
          console.log(error);
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="Auth-form-container justify-content-left align-items-center ">
      <form onSubmit={handleLogin} className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Пријавите се на систем</h3>
          <div className="form-group mt-3">
            <label>Корисничко име</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Унесите корисничко име"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Шифра</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Унесите шифру"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-dark">
              Пријави се
            </button>
          </div>
          <div className="w3-container w3-red">
            <p>{error}</p>
          </div>
          {/* <p className="forgot-password text-right mt-2">
            <a href="#">Заборављена лозинка?</a>
          </p> */}
        </div>
      </form>
    </div>
  );
};

export default Login;
