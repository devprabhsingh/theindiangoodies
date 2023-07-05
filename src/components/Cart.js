import React, { Component } from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDeleteLeft,
  faPlus,
  faSubtract,
  faArrowLeft,
  faMultiply,
} from "@fortawesome/free-solid-svg-icons";
import { changeCartItemCount, deleteItem } from "../actions/itemActions";
import { Link } from "react-router-dom";
import CartSummary from "./CartSummary";
import { calcuateSubTotal, changeItemCount } from "../static/main";

class Cart extends Component {
  state = {
    subTotal: 0,
  };
  componentDidMount() {
    // hiding searchbar in cart
    document.getElementById("search-bar-container").style.display = "none";
    let subTotal = calcuateSubTotal(this.props.cartItems);
    this.setState({
      subTotal: subTotal,
    });

    window.scrollTo(0, 0);
  }

  componentWillUnmount() {
    //showing searchbar after closing cart
    document.getElementById("search-bar-container").style.display = "flex";
  }

  changeCount = (itemId, dec) => {
    const updatedCartItems = changeItemCount(itemId, dec, this.props.cartItems);
    if (updatedCartItems !== undefined) {
      this.props.changeCartItemCount(updatedCartItems);
    }

    //calculating and saving subtotal
    let subTotal = calcuateSubTotal(this.props.cartItems);
    this.setState({
      subTotal: subTotal,
    });
  };
  render() {
    return (
      <div id="cart-container">
        <div id="cart">
          <div id="back-and-title">
            <Link to="/">
              <FontAwesomeIcon id="back-button" icon={faArrowLeft} />
            </Link>
            <h3>Shopping Cart</h3>
          </div>
          {this.props.cartItems.length !== 0 ? (
            this.props.cartItems.map((item, i) => {
              let price = item.price.toFixed(2);
              return (
                <div key={i} className="cart-item">
                  <img alt="cover" src={item.img1} />
                  <div className="cart-item-detail">
                    <div>
                      <h4>{item.name}</h4>

                      <div className="price price-in-cart">
                        $ {price}{" "}
                        <span style={{ fontSize: "15px" }}> / unit</span>
                      </div>
                      <p>
                        {price} <FontAwesomeIcon icon={faMultiply} />{" "}
                        {item.count} = $ {(price * item.count).toFixed(2)}
                      </p>
                    </div>
                    <div className="action-icons">
                      <FontAwesomeIcon
                        onClick={() => this.props.deleteItem(item._id)}
                        icon={faDeleteLeft}
                      />
                      <div>
                        <FontAwesomeIcon
                          onClick={(e) => {
                            this.changeCount(item._id, 0, e);
                          }}
                          icon={faSubtract}
                        />
                        <p className="itemcount">{item.count}</p>
                        <FontAwesomeIcon
                          onClick={(e) => {
                            this.changeCount(item._id, 1, e);
                          }}
                          icon={faPlus}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p style={{ height: "50vh" }}>
              Your cart is empty
              <Link
                style={{
                  padding: "5px",
                  backgroundColor: "lightgray",
                  borderRadius: "5px",
                  margin: "20px",
                  textDecoration: "none",
                }}
                to="/"
              >
                Return to Home
              </Link>
            </p>
          )}
        </div>
        {this.props.cartItems.length !== 0 ? (
          <CartSummary subTotal={this.state.subTotal} />
        ) : (
          ""
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  cartItems: state.item.cartItems,
});
export default connect(mapStateToProps, { deleteItem, changeCartItemCount })(
  Cart
);
