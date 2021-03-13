import React from 'react';
import logo from './logo.svg';
// import './App.css';
import Form from './Components/Form'
import Signup from './Components/Signup';
import { Container } from 'react-bootstrap'
import AuthProvider from './contexts/AuthContext';

function App() {
 

  return (
 
    <Container
      
    className="d-flex align-items-center justify-content-center"
    style= {{ minHeight: "100vh"}}>

      <div className="w-100" style={{ maxWidth: '400px'}}>
        <Signup/>
      </div>
    </Container>
  
 )
}

export default App;
