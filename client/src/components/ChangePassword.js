import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth-service";
import validator from "validator";
import Header from "./Header";

import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon,
  MDBCheckbox,
} from "mdb-react-ui-kit";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [error, setError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");

  const validate = (value) => {
    if (
      validator.isStrongPassword(value, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 0,
      })
    ) {
      setErrorMessage("Јака лозинка");
      // setPassword(value)
    } else {
      setErrorMessage("Није јака лозинка");
    }
  };

  const navigate = useNavigate();

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    const username = JSON.parse(localStorage.getItem("user")).username;
    console.log(localStorage.getItem("user"));
    console.log("Nova", newPassword);
    console.log("Potvrdjena", confirmedPassword);
    console.log(oldPassword);
    if (newPassword != confirmedPassword) {
      setError("Потврдите исту лозинку");
      return;
    } else {
      if (newPassword == oldPassword) {
        setError("Унесите другaчију лозинку");
        return;
      }
    }

    try {
      await AuthService.changePassword(username, oldPassword, newPassword).then(
        () => {
          setError("");
          setErrorMessage("");
          setMessage("Успешно промењена лозинка!");
        },
        (error) => {
          setError("Лозинка неуспешно промењена");
          console.log(error);
        }
      );
    } catch (err) {
      //setError('Invalid Password')
      console.log(err);
    }
  };

  return (
    <>
      <Header />
      <MDBContainer fluid>
        <form onSubmit={handlePasswordChange}>
          <MDBCard className="text-black m-5" style={{ borderRadius: "25px" }}>
            <MDBCardBody>
              <MDBRow>
                <MDBCol
                  md="10"
                  lg="6"
                  className="order-2 order-lg-1 d-flex flex-column align-items-center"
                >
                  <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4 naslov2">
                    Промена лозинке{" "}
                  </p>
                  <div className="d-flex flex-row align-items-center mb-4">
                    <MDBIcon fas icon="lock me-3" size="lg" />
                    <MDBInput
                      label="Стара лозинка"
                      id="oldpass"
                      type="password"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                    />
                  </div>
                  <div className="d-flex flex-row align-items-center mb-4">
                    <MDBIcon fas icon="lock me-3" size="lg" />
                    <MDBInput
                      label="Нова лозинка"
                      id="newpass"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      onBlur={(e) => validate(e.target.value)}
                    />
                  </div>
                  <div className="d-flex flex-row align-items-center mb-4">
                    <MDBIcon fas icon="lock me-3" size="lg" />
                    <MDBInput
                      label="Потврда нове лозинке"
                      id="confirmpass"
                      type="password"
                      value={confirmedPassword}
                      onChange={(e) => setConfirmedPassword(e.target.value)}
                    />
                  </div>

                  {errorMessage === "" ? null : (
                    <span
                      style={{
                        fontWeight: "bold",
                        color: "red",
                      }}
                    >
                      {errorMessage}
                    </span>
                  )}

                  {message === "" ? null : (
                    <span
                      style={{
                        fontWeight: "bold",
                        color: "red",
                      }}
                    >
                      {message}
                    </span>
                  )}

                  <p>{error}</p>

                  <MDBBtn className="mb-4 btn-warning" size="lg" type="submit">
                    {" "}
                    Промените лозинку{" "}
                  </MDBBtn>
                </MDBCol>
                <MDBCol
                  md="10"
                  lg="6"
                  className="order-1 order-lg-2 d-flex align-items-center"
                >
                  <MDBCardImage
                    src="https://media.istockphoto.com/id/1342248182/vector/forgot-password.jpg?b=1&s=612x612&w=0&k=20&c=6cPtOYGI7IbWubiYsJFZ-SJmx6P-051Om02nLiA-0XA="
                    fluid
                  />
                </MDBCol>
              </MDBRow>
            </MDBCardBody>
          </MDBCard>
        </form>
      </MDBContainer>
    </>
  );
};
export default ChangePassword;
