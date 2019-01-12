import React, { Component } from "react";
import { HashRouter, Route } from "react-router-dom";

import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";
import MessageBoard from "./components/MessageBoard/MessageBoard";
import Navbar from "./components/Navbar/Navbar";

import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      isSignedIn: false,
      username: "Anonymous"
    };
  }

  onStatusChange = (status, username = "Anonymous") => {
    if (status === "signout") {
      this.setState({ isSignedIn: false, username });
    } else if (status === "signin") {
      this.setState({ isSignedIn: true, username });
    }
    console.log(username);
  };

  render() {
    const SigninPage = props => {
      return (
        <Signin onStatusChange={this.onStatusChange.bind(this)} {...props} />
      );
    };

    const RegisterPage = props => {
      return (
        <Register onStatusChange={this.onStatusChange.bind(this)} {...props} />
      );
    };

    const MessageBoardPage = props => {
      return <MessageBoard username={this.state.username} {...props} />;
    };

    return (
      <HashRouter>
        <div className="App">
          <Navbar
            isSignedIn={this.state.isSignedIn}
            username={this.state.username}
            onStatusChange={this.onStatusChange}
          />
          <Route exact path="/" render={MessageBoardPage} />
          <Route exact path="/signin" render={SigninPage} />
          <Route exact path="/register" render={RegisterPage} />
        </div>
      </HashRouter>
    );
  }
}

export default App;
