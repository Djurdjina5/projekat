import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import authService from "../services/auth-service";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const userType = authService.getCurrentUserType();
  const navigate = useNavigate();

  const logout = () => {
    try {
      authService.logout().then(
        () => {
          localStorage.removeItem("user");
          navigate("/");
          window.location.reload();
        },
        (error) => {
          console.log(error);
        }
      );
    } catch (err) {
      //setError('Invalid Username or Password')
      console.log(err);
    }
  };

  return (
    <Navbar classNam="navbar">
      <Container>
        <Navbar.Brand href="/"> Почетна</Navbar.Brand>
        <Nav className="me-auto">
          {userType == "citalac" ? (
            <Nav.Link href="/citalac"> Читалац</Nav.Link>
          ) : (
            <p></p>
          )}
          {userType === "bibliotekar" ? (
            <Nav.Link href="/bibliotekar"> Библиотекар </Nav.Link>
          ) : (
            <p></p>
          )}
          {userType === "admin" ? (
            <Nav.Link href="/admin"> Админ </Nav.Link>
          ) : (
            <p></p>
          )}
          <Nav.Link href="/pretraga">Претрага књига</Nav.Link>
          {userType === "bibliotekar" ? (
            <Nav.Link href="/dodajKnjigu">Додавање књиге</Nav.Link>
          ) : (
            <p></p>
          )}
          {userType != "citalac" ? (
            <Nav.Link href="/register">Регистрација</Nav.Link>
          ) : (
            <p></p>
          )}
          <Nav.Link href="/promenaLozinke">Промена лозинке</Nav.Link>
          <Nav.Link href="/brisanjeNaloga">Деактивација налога</Nav.Link>
          <button onClick={logout}> Излогуј се</button>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
