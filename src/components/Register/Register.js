import React from "react";
import Joi from "joi";

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      confirmPassword: "",
      errorMessage: ""
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  validUser = () => {
    const schema = Joi.object().keys({
      username: Joi.string()
        .regex(/(^[a-zA-Z0-9_]+$)/)
        .min(2)
        .max(10)
        .required(),
      password: Joi.string()
        .trim()
        .min(6)
        .required(),
      confirmPassword: Joi.string()
        .trim()
        .min(6)
        .required()
    });

    if (this.state.password !== this.state.confirmPassword) {
      this.setState({ errorMessage: "Passwords must match." });
      return false;
    }

    const { username, password, confirmPassword } = this.state;
    const user = {
      username,
      password,
      confirmPassword
    };

    const result = Joi.validate(user, schema);
    if (result.error === null) {
      return true;
    }

    if (result.error.message.includes("username")) {
      this.setState({ errorMessage: "Username is invalid." });
    } else {
      this.setState({ errorMessage: "Password is invalid." });
    }

    return false;
  };

  onSubmit = event => {
    event.preventDefault();
    this.setState({ errorMessage: "" });

    if (this.validUser()) {
      fetch("https://peaceful-headland-32279.herokuapp.com/register", {
        method: "post",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password
        })
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          return response.json().then(error => {
            throw new Error(error);
          });
        })
        .then(result => {
          this.props.onStatusChange("signin", this.state.username);
          this.props.history.push("/");
        })
        .catch(error => {
          this.setState({ errorMessage: error.message });
        });
    }
  };

  render() {
    return (
      <div
        className="container"
        style={{
          maxWidth: "500px",
          marginTop: "60px"
        }}
      >
        <form className="card-panel" onSubmit={this.onSubmit}>
          <h3 className="center blue-grey-text">Register</h3>
          <div className="field">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              value={this.state.username}
              onChange={this.onChange}
            />
          </div>
          <div className="field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={this.state.password}
              onChange={this.onChange}
            />
          </div>
          <div className="field">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              value={this.state.confirmPassword}
              onChange={this.onChange}
            />
          </div>
          {this.state.errorMessage ? (
            <p className="red-text center">{this.state.errorMessage}</p>
          ) : (
            ""
          )}
          <div className="field center">
            <button className="btn blue-grey">Register</button>
          </div>
        </form>
      </div>
    );
  }
}

export default Register;
