import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { saveItemForDetail } from "../actions/itemActions";

class Item extends Component {
  callSaveItemForDetail = (e) => {
    // hiding all search results before item detail is opened
    const sResults = document.getElementById("items-container-wrapper");
    if (sResults) sResults.style.display = "none";
    window.scrollTo(0, 0);

    this.props.saveItemForDetail(this.props.item);
  };

  render() {
    const item = this.props.item;
    return (
      <Link to="/itemDetail">
        <div onClick={this.callSaveItemForDetail} className="item-box">
          <img alt="cover" src={item.img1} />
          <div>
            <h4>{item.name}</h4>
            <p> ${item.price} / unit</p>
          </div>
        </div>
      </Link>
    );
  }
}
export default connect(null, { saveItemForDetail })(Item);
