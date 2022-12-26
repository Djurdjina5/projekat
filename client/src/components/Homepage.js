import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from "./Login"
import Footer from "./Footer";
// import './AddNewComponent.css';

const Homepage = () => {
  
  
  return (
  <div className="Homepage container-fluid">
    <div className="justify-content-left align-items-left h-100">
      <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1"> </div>
        <h1 className="naslov"> Добродошли у нашу малу библиотеку! </h1>
          <p className="lead-txt">
            Клуб љубитеља добре књиге
            </p>
            <Login> </Login>
            </div>
            <Footer />
            </div>
  );
};

export default Homepage;
