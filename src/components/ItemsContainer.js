import React, { Component } from "react";
import Item from "./Item";

export default class ItemsContainer extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    const { sWord, data, heading } = this.props;

    return (
      <div id="items-container-wrapper">
        {data.length === 0 ? (
          <h2>No match found for '{sWord}'</h2>
        ) : (
          <h2>{heading}</h2>
        )}
        <div id="items-container">
          {data.map((item, index) => {
            return <Item item={item} key={index} />;
          })}
        </div>
      </div>
    );
  }
}
