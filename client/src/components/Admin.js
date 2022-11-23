import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth-service";
import validator from 'validator'

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
  MDBCheckbox
} from 'mdb-react-ui-kit';

    




const Admin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  
  const [errorMessage, setErrorMessage] = useState('')
 
  const validate = (value) => {
 
    if (validator.isStrongPassword(value, {
      minLength: 8, minLowercase: 1,
      minUppercase: 1 , minNumbers: 3, minSymbols: 0
    })) {
      setErrorMessage('Is Strong Password')
      // setPassword(value)
    } else {
      setErrorMessage('Is Not Strong Password')
    }
  }

  const navigate = useNavigate();

  const handleSignin = async (e) => {
    console.log("i am in handle sigin");
    e.preventDefault();

    try {
       await AuthService.signup(username, password, fullname, email, city).then(
        () => {
          
          window.location.reload();
        },
        (error) => {
          setError('Username already exsist')
          console.log(error);
        }
      );
    } catch (err) {
      //setError('Invalid Username or Password')
      console.log(err);
    }
  };

return (
  <MDBContainer fluid>
  <form onSubmit={handleSignin} >

  <MDBCard className='text-black m-5' style={{borderRadius: '25px'}}>
    <MDBCardBody>
      <MDBRow>
        <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>

          <p classNAme="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

          <div className="d-flex flex-row align-items-center mb-4 ">
            <MDBIcon fas icon="user me-3" size='lg'/>
            <MDBInput 
            label='Username' 
            id='form1' 
            type='text'
            value = {username}
            onChange={(e) => setUsername(e.target.value)} 
            className='w-100'/ >
          </div>

          <div className="d-flex flex-row align-items-center mb-4">
            <MDBIcon fas icon="envelope me-3" size='lg'/>
            <MDBInput 
            label='Email' 
            id='form2' 
            type='email'
            value = {email}
            onChange= {(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="d-flex flex-row align-items-center mb-4">
            <MDBIcon fas icon="lock me-3" size='lg'/>
            <MDBInput 
            label='Password'
            id='form3'
            type='password'
            value={password}
            onChange= {(e) => setPassword(e.target.value)}
            onBlur={(e) => validate(e.target.value)}
             />
            
          </div>
          {errorMessage === '' ? null :
        <span style={{
          fontWeight: 'bold',
          color: 'red',
        }}>{errorMessage}</span>}
          <div className="d-flex flex-row align-items-center mb-4">
            <MDBIcon fas icon="lock me-3" size='lg'/>
            <MDBInput 
            label='Fullname'
            id='form4'
            type='text'
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
             />
          </div>
          <div className="d-flex flex-row align-items-center mb-4">
            <MDBIcon fas icon="lock me-3" size='lg'/>
            <MDBInput 
            label='City'
            id='form4'
            type='text'
            value={city}
            onChange={(e) => setCity(e.target.value)}
             />
          </div>
          <p>{error}</p>

          <MDBBtn className='mb-4' size='lg' type="submit">Register</MDBBtn>

        </MDBCol>

        <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
          <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp' fluid/>
        </MDBCol>

      </MDBRow>
    </MDBCardBody>
  </MDBCard>
  </form>
</MDBContainer>
);
}
export default Admin;



