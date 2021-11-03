import { Component } from "react";
import axios from "axios";
import { Alert } from "bootstrap";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      rememberMe: false,
      errors: {
        email: "",
        password: "",
      },
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value, type, checked } = event.target;
    type === "checkbox"
      ? this.setState({ [name]: checked })
      : this.setState({ [name]: value });

    let errors = this.state.errors;
    const validEmailRegex = RegExp(
      /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    );
    switch (name) {
      case "email":
        errors.email = validEmailRegex.test(value) ? "" : "Email is not valid!";
        break;
      case "password":
        errors.password =
          value.length < 8 ? "Password must be 8 characters long!" : "";
        break;
      default:
        break;
    }

    this.setState({ errors, [name]: value }, () => {
      console.info(errors);
    });
  }

  async handleSubmit(event) {
    event.preventDefault();

    const validateForm = (errors) => {
      let valid = true;
      Object.values(errors).forEach(
        // if we have an error string set valid to false
        (val) => val.length > 0 && (valid = false)
      );
      return valid;
    };

    if (validateForm(this.state.errors)) {
      console.info("Valid Form");

      const user = {
        email: this.state.email,
        password: this.state.password,
      };

      const response = await axios
        .post(`https://reqres.in/api/login`, user)
        .then(function (response) {
          if (response.status === 200) {
            console.info("Login successful. Redirecting to home page..");
            window.location.href = "./home-page";
          }
        })
        .catch((error) => {
          this.setState({ errorMessage: error.message });
          console.error("There was an error!", error);
          //show mssg for user
        });
    } else {
      console.error("Invalid Form");
      //show mssg for user
    }
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
            placeholder="Enter email"
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={this.state.password}
            name="password"
            onChange={this.handleChange}
            className="form-control"
            placeholder="Enter password"
          />
        </div>

        <div className="form-group">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              name="rememberMe"
              onChange={this.handleChange}
              className="custom-control-input"
              id="customCheck1"
            />
            <label className="custom-control-label" htmlFor="customCheck1">
              Remember me
            </label>
          </div>
        </div>

        <button style={{ marginTop: 8 }} className="btn btn-primary btn-block">
          Log in
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
