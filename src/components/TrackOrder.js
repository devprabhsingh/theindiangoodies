import React, { Component } from "react";
import { hideSearchAndBackTopBtn } from "../static/main";
import { Link } from "react-router-dom";
import axios from "axios";

export default class TrackOrder extends Component {
  state = {
    trackInfo: "",
    trackId: "",
  };
  componentDidMount() {
    hideSearchAndBackTopBtn(true);
  }
  componentWillUnmount() {
    hideSearchAndBackTopBtn(false);
  }
  startTracking = () => {
    let trackErr = document.getElementById("track-error");
    if (this.state.trackId.length < 6) {
      trackErr.innerHTML = "tracking Id is not valid";
    } else {
      trackErr.innerHTML = "";

      //tracking order - GET request
      axios
        .get(
          `http://localhost:5000/items/trackOrder?trackId=${this.state.trackId}`
        )
        .then((res) => {
          this.setState({
            trackInfo: res.data,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  render() {
    return (
      <div id="track-order">
        <h3>Enter your tracking id</h3>
        <input
          type="text"
          id="trackid"
          value={this.state.trackId}
          onChange={(e) => this.setState({ trackId: e.target.value })}
        />
        <p id="track-error"></p>
        <div id="start-track-btn" onClick={this.startTracking}>
          Start Tracking
        </div>
        <div id="track-info">Status: {this.state.trackInfo}</div>
        <p
          style={{
            border: "1px solid black",
            padding: "5px",
            marginBottom: "40px",
            display: "inline-block",
          }}
        >
          NOTE - You can find your tracking Id in your order receipt emailed to
          you.
        </p>
        <div style={{ width: "fit-content", margin: "auto" }}>
          <Link
            style={{
              padding: "10px",
              color: "white",
              background: "black",
              textDecoration: "none",
              textAlign: "center",
            }}
            to="/"
          >
            Go back to shopping
          </Link>
        </div>
      </div>
    );
  }
}
