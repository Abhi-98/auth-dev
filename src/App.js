import React from "react";
import logo from "./logo.svg";
// import './App.css';
import Form from "./Components/Form";
import Signup from "./Components/Signup";
import Dashboard from "./Components/Dashboard";
import Login from "./Components/Login";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./Components/PrivateRoute";
import ForgotPassword from "./Components/ForgotPassword";
import UpdateProfile from "./Components/UpdateProfile";
import PhoneAuth from "./Components/PhoneAuth";

function App() {
  // return (
  //   <div className="App">
  //     <Form />

  //   </div>
  // );

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Router>
          <AuthProvider>
            <Switch>
              <PrivateRoute exact path="/" component={Dashboard} />
              <PrivateRoute path="/update-profile" component={UpdateProfile} />
              <Route path="/signup" component={Signup} />
              <Route path="/form" component={Form} />
              <Route path="/login" component={Login} />
              <Route path="/phone-auth" component={PhoneAuth} />
              <Route path="/forgot-password" component={ForgotPassword} />
            </Switch>
          </AuthProvider>
        </Router>
        {/* <Signup/> */}
      </div>
    </Container>
  );
}

export default App;
