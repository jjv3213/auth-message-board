import React from "react";

class Signin extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      errorMessage: ""
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = event => {
    event.preventDefault();
    this.setState({ errorMessage: "" });

    fetch("https://peaceful-headland-32279.herokuapp.com/signin", {
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
  };

  render() {
    return (
      <div
        className="container"
        style={{ maxWidth: "500px", marginTop: "60px" }}
      >
        <form className="card-panel" onSubmit={this.onSubmit}>
          <h3 className="center blue-grey-text">Sign In</h3>
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
          {this.state.errorMessage ? (
            <p className="red-text center">{this.state.errorMessage}</p>
          ) : (
            ""
          )}
          <div className="field center">
            <button className="btn blue-grey">Sign In</button>
          </div>
        </form>
      </div>
    );
  }
}

export default Signin;
