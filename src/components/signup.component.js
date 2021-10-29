import React, { Component } from "react";

export default class SignUp extends Component {
    constructor() {
        super()
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            gender: "",
            password: "",
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    
    handleChange(event) {
        const {name, value, type, checked} = event.target
        type === "checkbox" ? this.setState({ [name]: checked }) : this.setState({ [name]: value })
    }

    handleSubmit(event) {
        alert(`New account had been submitted by: ${this.state.firstName} ${this.state.lastName}`);
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h3>Sign Up</h3>

                <div className="form-group">
                    <label>First name</label>
                    <input 
                        type="text" 
                        value={this.state.firstName} 
                        name="firstName"
                        onChange={this.handleChange}
                        className="form-control" 
                        placeholder="First name" />
                </div>

                <div className="form-group">
                    <label>Last name</label>
                    <input 
                        type="text"
                        value={this.state.lastName} 
                        name="lastName" 
                        onChange={this.handleChange}
                        className="form-control" 
                        placeholder="Last name" />
                </div>

                <div className="form-group">
                    <label>Email address</label>
                    <input 
                        type="email" 
                        value={this.state.email} 
                        name="email"
                        onChange={this.handleChange}
                        className="form-control" 
                        placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input 
                        type="password" 
                        value={this.state.password} 
                        name="password"
                        onChange={this.handleChange}
                        className="form-control" 
                        placeholder="Enter password" />
                </div>

                <div className="form-group">
                <label>Gender</label><br/>
                    <p>
                        <input 
                            type="radio" 
                            name="gender"
                            value="male"
                            checked={this.state.gender === "male"}
                            onChange={this.handleChange}
                        /> Male
                        <br />
                        <input 
                            type="radio" 
                            name="gender"
                            value="female"
                            checked={this.state.gender === "female"}
                            onChange={this.handleChange}
                        /> Female
                    </p>
                </div>

                <button 
                    className="btn btn-primary btn-block" 
                    style={{marginTop: 8}}>Sign Up
                </button>

                <p className="forgot-password text-right">
                    Already registered <a href="./sign-in">sign in?</a>
                </p>
            </form>
        );
    }
}