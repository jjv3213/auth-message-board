import React from "react";

class MessageBoard extends React.Component {
  constructor() {
    super();
    this.state = {
      showMessageForm: false,
      errorMessage: "",
      messages: [],
      subject: "",
      message: "",
      loading: false
    };
  }

  componentDidMount() {
    fetch("https://peaceful-headland-32279.herokuapp.com/messages")
      .then(response => {
        this.setState({ loading: true });
        return response.json();
      })
      .then(result => {
        this.setState({ loading: false });
        result = result.slice().reverse();
        this.setState({ messages: result });
      });
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  addMessage = e => {
    e.preventDefault();
    this.setState({ errorMessage: "" });

    const message = {
      username: this.props.username,
      subject: this.state.subject,
      message: this.state.message
    };

    fetch("https://peaceful-headland-32279.herokuapp.com/messages", {
      method: "post",
      body: JSON.stringify(message),
      headers: {
        "content-type": "application/json"
      }
    })
      .then(response => response.json())
      .then(result => {
        if (result._id) {
          this.setState({
            errorMessage: "",
            showMessageForm: false,
            messages: [result, ...this.state.messages],
            subject: "",
            message: ""
          });
        } else {
          this.setState({ errorMessage: result });
        }
      });
  };

  render() {
    return (
      <div className="container">
        <button
          onClick={() => {
            this.setState({ showMessageForm: !this.state.showMessageForm });
          }}
          className="btn blue-grey darken-4"
          style={{ marginTop: "60px" }}
        >
          Toggle Message Form
        </button>
        {this.state.showMessageForm ? (
          <form
            className="card-panel"
            style={{ maxWidth: "900px", marginTop: "30px" }}
            onSubmit={this.addMessage}
          >
            <div className="field">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                name="subject"
                id="subject"
                value={this.state.subject}
                onChange={this.onChange}
              />
            </div>
            <div className="field">
              <label htmlFor="message">Message</label>
              <textarea
                name="message"
                id="message"
                value={this.state.message}
                onChange={this.onChange}
              />
            </div>
            {this.state.errorMessage ? (
              <p className="red-text center">{this.state.errorMessage}</p>
            ) : (
              ""
            )}
            <div className="field center">
              <button className="btn blue-grey">Add Message</button>
            </div>
          </form>
        ) : (
          ""
        )}
        <ul style={{ maxWidth: "900px", marginTop: "30px" }}>
          {this.state.messages.map(message => (
            <li className="collection-item" key={message._id}>
              <div className="card">
                <div className="card-content">
                  <span className="card-title blue-grey-text">
                    {message.subject}
                  </span>
                  <span className="card-content black-text">{`By: ${
                    message.username
                  }`}</span>
                  <div className="card-panel blue-grey lighten-3 black-text">
                    <span>{message.message}</span>
                  </div>
                  <small>{message.created}</small>
                </div>
              </div>
            </li>
          ))}
        </ul>
        {this.state.loading ? (
          <div
            class="preloader-wrapper big active"
            style={{ marginTop: "30px" }}
          >
            <div className="spinner-layer spinner-blue-only">
              <div className="circle-clipper left">
                <div className="circle" />
              </div>
              <div className="gap-patch">
                <div className="circle" />
              </div>
              <div className="circle-clipper right">
                <div className="circle" />
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default MessageBoard;
