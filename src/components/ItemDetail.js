import { connect } from "react-redux";
import { addItem } from "../actions/itemActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faMultiply } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import React, { Fragment } from "react";
import { setImgFunc } from "../static/main.js";
import ItemsInArr from "./ItemsInArr";

class ItemDetail extends React.Component {
  state = {
    sQuantity: 1,
  };
  componentDidMount() {
    window.scrollTo(0, 0);
    if (this.props.item.name === undefined) {
      window.location = "/";
      console.log("fse");
    }
  }
  setImage = (e) => {
    const id = e.target.id;
    setImgFunc(id, this.props.item);
  };

  readMore = () => {
    document.getElementById("description").innerHTML =
      this.props.item.description;
  };

  callAddItem = (e) => {
    if (e.target.innerHTML === "Add To Cart") {
      document.getElementById("buy").innerHTML = "Go to checkout";
    }
    if (e.target.innerHTML === "Go to checkout") {
      return;
    }
    const item = this.props.item;
    const selector = document.getElementById("item-count");
    const itemcount = selector[selector.selectedIndex].value;
    item.count = Number(itemcount);
    this.props.addItem(item);
    const itemAddedNote = document.getElementById("item-added-note");
    itemAddedNote.style.display = "block";
    if (document.body.classList.contains(itemAddedNote)) {
      setTimeout(() => {
        itemAddedNote.style.display = "none";
      }, 1000);
    }
  };

  render() {
    const item = this.props.item;
    return (
      <Fragment>
        <div className="item-detail">
          <div className="detail-header">
            <div>
              <Link to="/">
                <FontAwesomeIcon id="back-button" icon={faArrowLeft} />
              </Link>
              <div>
                <h2 className="item-name">{item.name}</h2>
                <p>Product Id : {item._id}</p>
              </div>
            </div>
          </div>
          <div id="photos-desc">
            <div className="images">
              <img id="image-open" alt="item" src={item.img1} />
              <div className="image-opter">
                <img
                  id="1"
                  onClick={(e) => {
                    this.setImage(e);
                  }}
                  alt="item"
                  src={item.img1}
                />
                {item.hasOwnProperty("img2") ? (
                  <img
                    id="2"
                    onClick={(e) => {
                      this.setImage(e);
                    }}
                    alt="item"
                    src={item.img2}
                  />
                ) : (
                  ""
                )}
                {item.hasOwnProperty("img3") ? (
                  <img
                    id="3"
                    onClick={(e) => {
                      this.setImage(e);
                    }}
                    alt="item"
                    src={item.img3}
                  />
                ) : (
                  ""
                )}
              </div>
            </div>
            <div id="details-buttons">
              <div className="details">
                <h4 style={{ fontWeight: "bold" }}>Product Details</h4>
                <p id="description">
                  {item.hasOwnProperty("description")
                    ? item.description.substring(0, 170)
                    : ""}
                  ...
                  <span onClick={this.readMore} id="read-more">
                    read more
                  </span>
                </p>
                {item.hasOwnProperty("characterstics") ? (
                  <ul>
                    <li>{item.characterstics[0]}</li>
                    <li>{item.characterstics[1]}</li>
                    <li>{item.characterstics[2]}</li>
                    <li>{item.characterstics[3]}</li>
                  </ul>
                ) : (
                  ""
                )}
              </div>
              <div style={{ display: "flex", alignItems: "flex-end" }}>
                <h2 className="price">
                  $ {item.price}
                  <span style={{ fontSize: "17px", color: "green" }}>
                    / unit
                  </span>
                </h2>
                <div id="quantity-selector">
                  <span>Quantity</span>
                  <select
                    id="item-count"
                    onChange={(e) => {
                      this.setState({ sQuantity: e.target.value });
                    }}
                    value={this.state.sQuantity}
                  >
                    {item.select_quantity
                      ? item.select_quantity.map((q, index) => {
                          return (
                            <option key={index} value={q}>
                              {q}
                            </option>
                          );
                        })
                      : ""}
                  </select>
                </div>
              </div>
              <div id="item-subtotal">
                Subtotal ${item.price} <FontAwesomeIcon icon={faMultiply} />{" "}
                {this.state.sQuantity} ={" "}
                <span style={{ color: "green", fontWeight: "bold" }}>
                  ${(item.price * this.state.sQuantity).toFixed(2)}
                </span>
              </div>
              <div className="buttons">
                <Link onClick={this.callAddItem} to="/cart" id="buy">
                  Buy Now
                </Link>
                <button onClick={this.callAddItem} id="add-to-cart">
                  Add To Cart
                </button>
              </div>
              <div id="item-added-note">Item added</div>
            </div>
          </div>
        </div>
        {this.props.item.price < 10 ? (
          <ItemsInArr heading="Explore more" items={this.props.food} />
        ) : (
          <ItemsInArr heading="Explore more" items={this.props.covers} />
        )}
      </Fragment>
    );
  }
}
const mapStateToProps = (state) => ({
  food: state.item.foodItems,
  covers: state.item.coverItems,
  item: state.item.itemForDetail,
});
export default connect(mapStateToProps, { addItem })(ItemDetail);
