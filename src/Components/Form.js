import React, { Component } from 'react';
import './CSS/todo.css';

class Form extends Component{

    constructor(props){ 

        super(props)
        this.state = { 

            firstName: "",
            lastName: "",
            password: "",
            gender: "",
            aadhar: "",
            email:"",
        }

    }

    firstHandler = (event) => {
        this.setState({
            firstName: event.target.value 
        })
       }



    lastHandler = (event) => {
        this.setState({
            lastName: event.target.value
        })
    }

    passwordHandler = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    genderHandler = (event) => {
        this.setState({                                 
                                                       
            gender: event.target.value
        })
    }

    aadharHandler = (event) => {
        this.setState({                                 
                                                       
            aadhar: event.target.value
        })
    }

    emailHandler = (event) => {
        this.setState({                                 
                                                       
            email : event.target.value
        })
    }

    handleSubmit = (event) => {

        event.preventDefault()

        alert(`${this.state.firstName} ${this.state.lastName}  Registered Successfully !!!!`) 
        console.log(this.state)
        this.setState({
            firstName: "",
            lastName: "",
            password: "",
            gender: "",
        })

        
    }

    render(){

        return(
            <div>

                <form onSubmit = {this.handleSubmit}>
                    <h1>User Registration</h1>
                    <label>FirstName :</label> <input type="text" value= {this.state.firstName} onChange={this.firstHandler} placeholder="FirstName..."/> <br/>
                    <label>LastName :</label> <input type="text" value= {this.state.lastName} onChange={this.lastHandler} placeholder="LastName..."/> <br/>
                    <label>Email ID :</label> <input type="text" value= {this.state.email} onChange={this.emailHandler} placeholder="EmailID..."/> <br/>
                    <label>Password :</label> <input type="text" value= {this.state.password} onChange={this.passwordHandler} placeholder="Password..."/> <br/>
                    <label>Aadhar Number :</label> <input type="text" value= {this.state.aadhar} onChange={this.aadharHandler} placeholder="AadharNumber..."/> <br/>
                    <label>Gender :</label> <select onChange={this.genderHandler} defaultValue="Select Gender">
                        <option defaultValue>Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select><br/>
                    <input type="submit" value="Submit"/>
                </form>

            </div>

            )
    }
}

export default Form