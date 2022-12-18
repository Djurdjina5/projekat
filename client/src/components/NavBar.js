import React, { useState } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import authService from "../services/auth-service";

const NavBar = () => {
  const userType = authService.getCurrentUserType();
  console.log(userType)

  return (
    <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/"> Почетна</Navbar.Brand>
          <Nav className="me-auto">
            {userType == "citalac" ?  (<Nav.Link href ="/citalac"> Читалац</Nav.Link>) : (<p></p>)}
            {userType === "bibliotekar" ?  (<Nav.Link href ="/bibliotekar"> Библиотекар </Nav.Link>) : (<p></p>)}
            {userType === "admin" ?  ( <Nav.Link href ="/admin"> Админ </Nav.Link>) : (<p></p>)}
            <Nav.Link href="/pretraga">Претрага књига</Nav.Link>
            {userType === "bibliotekar" ?  ( <Nav.Link href="/dodajKnjigu">Додавање књиге</Nav.Link>) : (<p></p>)}
            {userType != "citalac" ?  ( <Nav.Link href="/register">Регистрација</Nav.Link>) : (<p></p>)}
            <Nav.Link href="/promenaLozinke">Промена лозинке</Nav.Link>
            <Nav.Link href="/brisanjeNaloga">Деактивација налога</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
  );
};

export default NavBar;
