import React, { Component } from "react";

export default class Login extends Component {
    constructor() {
        super()
        this.state = {
            email: "",
            password: "",
            rememberMe: false,
            character: {}
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    
    handleChange(event) {
        const {name, value, type, checked} = event.target
        type === "checkbox" ? this.setState({ [name]: checked }) : this.setState({ [name]: value })
    }

    handleSubmit(event) {
        fetch("https://reqres.in/api/login")
            .then(response => response.json())
            .then(data => console.log(data))
            .then(data => {
                this.setState({
                    character: data
                })
            })
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h3>Sign In</h3>

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
                    <div className="custom-control custom-checkbox">
                        <input 
                            type="checkbox" 
                            name="rememberMe"
                            onChange={this.handleChange}
                            className="custom-control-input" 
                            id="customCheck1" />
                        <label 
                            className="custom-control-label" 
                            htmlFor="customCheck1">Remember me
                        </label>
                    </div>
                </div>

                <button 
                    style={{marginTop: 8}}
                    className="btn btn-primary btn-block">Log in
                </button>
                <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                </p>
                <p className="forgot-password text-right">
                    Don't have an account? <a href="./sign-up">Sign up</a>
                </p>
            </form>
        );
    }
}