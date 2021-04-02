import React, { Component, useState, useEffect } from "react";
import "./CSS/todo.css";
import firebase from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { firebaseApp } from "../firebase";
import { auth } from "../firebase";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button, Form } from "react-bootstrap";


export default function Forms() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [aadhar, setAadhar] = useState("");
  const [mobile, setMobile] = useState("")
  const { currentUser } = useAuth();
  const history = useHistory();
  var CryptoJS = require("crypto-js");
  var infos = {}
  var key = 'secret key 123'
  // const NodeRSA = require('node-rsa');
  // const key = new NodeRSA({b: 512});
  // var public_key = key.exportKey('public');
  // var private_key = key.exportKey('private');
  // let key_private = new NodeRSA(private_key);
  // let key_public = new NodeRSA(public_key);

  //   constructor(props) {
  //     super(props);
  //     this.state = {
  //       firstName: "",
  //       lastName: "",
  //       gender: "",
  //       aadhar: "",
  //       email: "",
  //     };
  //   }

  let appVerifier = window.recaptchaVerifier;


  function encrypt(data, key){
      return CryptoJS.AES.encrypt(data, key).toString()
  }

  function decrypt(data,key){
    return CryptoJS.AES.decrypt(data, key).toString(CryptoJS.enc.Utf8)
  }

  var firstHandler = (event) => {
    setFirstName(event.target.value);
  };

  var lastHandler = (event) => {
    setLastName(event.target.value);
  };

  var genderHandler = (event) => {
    setGender(event.target.value);
  };

  var aadharHandler = (event) => {
    setAadhar(event.target.value);
  };

  var mobileHandler = (event) => {
    setMobile(event.target.value);
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
        alert("Number registered successfully. Click on submit");
        console.log("OTP is sent");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  var handleSubmit = (event) => {

    const infoRef = firebase.database().ref("Info");
    const info = {
      firstName: encrypt(firstName,key),
      lastName: lastName,
      gender: gender,
      aadhar: aadhar,
      email: currentUser.email,
      phone: mobile
    };

    infoRef.push(info);


    infoRef.orderByChild("email").equalTo(currentUser.email).on("child_added", (snap) => {
     // console.log(snap.val().firstName);
      // setInfoList(snap.val());
      infos = snap.val();
      
  });

  console.log(infos);
  console.log(decrypt(infos.firstName,key));

    //console.log(key_private.decrypt("LyewaLeNwm42awqhehXBUYYk0SL8vJxcJRs9bWY/GULZgNsz2KDJ9x5TPrCPCAl1GQA1RDcAerRXPeEE+TyU2ooGxRMck9axcMAWisqvjBOIt8kT0LCLTaSh8k6mdEyfM4hwt72VPQ9I35LkIRCclvWWixP35x4Kg2F4RXiqeKU=",'utf8'));

    alert(`${firstName} ${lastName}  Registered Successfully !!!!`);
    history.push("/phone-auth");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
      <div id="recaptcha-container"></div>
        <h1>User Registration</h1>
        <label>FirstName :</label>{" "}
        <input
          type="text"
          value={firstName}
          onChange={firstHandler}
          placeholder="FirstName..."
        />{" "}
        <br />
        <label>LastName :</label>{" "}
        <input
          type="text"
          value={lastName}
          onChange={lastHandler}
          placeholder="LastName..."
        />{" "}
        <br />
        <label>Aadhar Number :</label>{" "}
        <input
          type="text"
          value={aadhar}
          onChange={aadharHandler}
          placeholder="AadharNumber..."
        />{" "}
        <br />
        <label>Mobile Number :</label>{" "}
        <input
          type="text"
          value={mobile}
          onChange={mobileHandler}
          placeholder="MobileNumber..."
        />{" "}
        <br />
        <label>Gender :</label>{" "}
        <select onChange={genderHandler} defaultValue="Select Gender">
          <option defaultValue>Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <br />
        <input type="submit" value="Submit" />
      </form>
      {/* <form className="form" onSubmit={onSignInSubmit}>
              <div id="recaptcha-container"></div>
              <Form.Group>
                <Form.Control
                  type="number"
                  name="mobile"
                  placeholder="Mobile Number"
                  onChange={mobileHandler}
                  required
                />
              </Form.Group>
              <Button button="Submit" type="submit" />
            </form> */}
    </div>
  );
}
