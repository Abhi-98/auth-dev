import React, { Component, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { firebaseApp } from "../firebase";
import { auth } from "../firebase";
import firebase from "../firebase";
import { useAuth } from "../contexts/AuthContext";



export default function PhoneLogin() {
  const [form, setForm] = useState(true);
  const [alert, setAlert] = useState(false);
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const history = useHistory();
  const { currentUser } = useAuth();

 

  var onChangeHandler = (event) => {
    const { name, value } = event.target;
    setMobile(value);
  };

  var onChangeOtpHandler = (event) => {
    const { name, value } = event.target;
    setOtp(value);
  };

  var setUpRecaptcha = () => {
    window.recaptchaVerifier = new firebaseApp.auth.RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: function (response) {
          console.log("Captcha Resolved");
          // onSignInSubmit();
        },
        defaultCountry: "IN",
      }
    );
  };

  var onSignInSubmit = (e) => {
    e.preventDefault();
    setUpRecaptcha();
    let phoneNumber = "+91" + mobile;
    console.log(phoneNumber);
    let appVerifier = window.recaptchaVerifier;
    auth
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then(function (confirmationResult) {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        // console.log(confirmationResult);
        console.log("OTP is sent");
      })
      .catch(function (error) {
        console.log(error);
      });
  };


  var onSubmitOtp = (e) => {
    e.preventDefault();
    let otpInput = otp;
    let optConfirm = window.confirmationResult;
    // console.log(codee);
    optConfirm
      .confirm(otpInput)
      .then(function (result) {
        // User signed in successfully.
        console.log("Success");
        history.push("/");
        let user = result.user;
      })
      .catch(function (error) {
        console.log(error);
        alert("Incorrect OTP");
      });
  };

  return (
    <div>
      <Container fluid="sm" className="mt-3">
        <Row className="justify-content-center">
          <Col xs={12} md={6} lg={5}>
            <h2 className="mb-3">Login</h2>
            <Form className="form" onSubmit={onSignInSubmit}>
              <div id="recaptcha-container"></div>
              <Form.Group>
                <Form.Control
                  type="number"
                  name="mobile"
                  placeholder="Mobile Number"
                  onChange={onChangeHandler}
                  required
                />
              </Form.Group>
              <Button button="Submit" type="submit" />
            </Form>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col xs={12} md={6} lg={5}>
            <h2 className="mb-3">Enter OTP</h2>
            <Form className="form" onSubmit={onSubmitOtp}>
              <Form.Group>
                <Form.Control
                  id="otp"
                  type="number"
                  name="otp"
                  placeholder="OTP"
                  onChange={onChangeOtpHandler}
                />
              </Form.Group>
              <Button button="Submit" type="submit" />
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
