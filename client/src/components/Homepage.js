import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from "./Login"
import Footer from "./Footer";

const Homepage = () => {
  
    // style="background-color: #fff; height: calc(95vh);"
  return (
    <div className="jumbotron" style={{backgroundColor:'ffff'}}>
    <h1> Добродошли у нашу малу библиотеку! </h1>
    <p className="lead">
      Клуб љубитеља добре књиге
    </p>

    <img src="./naslovna.jpg "/>  
    <h2> Пријавите се на систем</h2>
    <Login> </Login>
    <Footer />
  </div>
  );
};

export default Homepage;
