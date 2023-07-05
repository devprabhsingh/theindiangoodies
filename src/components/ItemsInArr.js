import React, { Component } from "react";
import Item from "./Item";

export default class NewArrivals extends Component {
  render() {
    return (
      <div className="section">
        <h2 className="home-heading">{this.props.heading}</h2>
        <div className="offered-items">
          {this.props.items.map((item, index) => {
            return <Item key={index} item={item} />;
          })}
        </div>
      </div>
    );
  }
}
