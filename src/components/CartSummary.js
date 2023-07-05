import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShieldHalved } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { saveTotalandAppliedPromo } from "../actions/itemActions";

class CartSummary extends Component {
  state = {
    isPromoApplied: false,
    discount: 0,
    appliedPromo: "",
  };

  checkPromo = () => {
    let appliedPromo = this.state.appliedPromo;
    this.props.promos.forEach((promo) => {
      if (promo === appliedPromo && this.props.subTotal > 30) {
        this.setState({ isPromoApplied: true, discount: promo.substr(0, 2) });
        document.getElementById("subtotal-amt").style.textDecoration =
          "line-through";
      } else {
        this.setState({
          isPromoApplied: false,
        });
        document.getElementById("subtotal-amt").style.textDecoration = "none";
      }
    });
  };

  handleChange = (e) => {
    this.setState({
      appliedPromo: e.target.value,
    });
    this.checkPromo();
  };

  render() {
    let subTotal = this.props.subTotal;
    let taxes = this.props.subTotal * 0.13;

    let discount = 0;
    if (subTotal > 30) {
      discount = (subTotal * this.state.discount) / 100;
    }
    let dSubtotal = subTotal - discount;
    let total = (dSubtotal + taxes).toFixed(2);

    return (
      <div id="cart-summary">
        <h3>Summary</h3>
        <div>
          SubTotal
          <p>
            CAD <span id="subtotal-amt">{this.props.subTotal.toFixed(2)}</span>{" "}
            {this.props.subTotal > 30 && this.state.isPromoApplied ? (
              <span style={{ color: "green", fontWeight: "bold" }}>
                {dSubtotal.toFixed(2)}
              </span>
            ) : (
              ""
            )}
          </p>
        </div>

        <div>
          Taxes<p>CAD {taxes.toFixed(2)}</p>
        </div>
        <div>
          Total<p>CAD {total}</p>
        </div>
        {this.props.subTotal < 5 ? (
          <p style={{ color: "red" }}>
            SubTotal must be greater than $5 to proceed. <br />
          </p>
        ) : (
          ""
        )}
        <div>
          <div id="promo-box">
            <p style={{ marginBottom: 0 }}>Have a promo code?</p>
            <div style={{ display: "flex" }}>
              <input
                id="promo"
                value={this.state.appliedPromo}
                onChange={this.handleChange}
                style={{ marginLeft: "5px", outline: "none" }}
                placeholder="Enter here"
              />
              <button
                onClick={(e) => {
                  this.checkPromo();
                  this.setState({
                    appliedPromo: document.getElementById("promo").value,
                  });
                }}
                id="promo-apply-btn"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
        {this.state.isPromoApplied && this.props.subTotal >= 30 ? (
          <p>
            Promo Applied!{" "}
            <span style={{ color: "green" }}>{this.state.discount}% OFF!</span>
          </p>
        ) : (
          ""
        )}
        {this.state.appliedPromo && this.props.subTotal < 30 ? (
          <p style={{ color: "red" }}>
            subtotal should be greater than $30 to use this promo
          </p>
        ) : (
          ""
        )}

        {this.props.subTotal < 10 ? (
          <p style={{ color: "green" }}>
            To reduce shipping fee, keep your subtotal more than $10 <br />
          </p>
        ) : (
          ""
        )}
        <div style={{ width: "fit-content", margin: "auto" }}>
          {this.props.subTotal >= 5 ? (
            <Link
              onClick={() => {
                this.props.saveTotalandAppliedPromo(
                  total,
                  this.state.appliedPromo
                );
              }}
              to="/shipdetail"
              id="checkout-btn"
            >
              Checkout
            </Link>
          ) : (
            <Link style={{ opacity: "0.5" }} id="checkout-btn">
              Checkout
            </Link>
          )}
        </div>

        <div className="static-text">
          <h5>Buyer Protection</h5>
          <p>
            <FontAwesomeIcon icon={faShieldHalved} />
            Get full refund if the item is not delivered or not as described
          </p>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  cartItems: state.item.cartItems,
  promos: state.item.promos,
});
export default connect(mapStateToProps, { saveTotalandAppliedPromo })(
  CartSummary
);
