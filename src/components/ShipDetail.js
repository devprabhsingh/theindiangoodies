import React, { Component } from "react";
import Payment from "./Payment";
import { connect } from "react-redux";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { saveTotalandAppliedPromo } from "../actions/itemActions";
import {
  hideSearchAndBackTopBtn,
  validateFields,
  selectShipMethodFunc,
} from "../static/main";

const initialOptions = {
  "client-id":
    "AZqTlzudXrQpFHk8smk7t3eN3imYPLvLZhz1CnKIr8b7B-oggQLQ138czoR44vT_WQwWzPRM59tvCP56",
  currency: "CAD",
  intent: "capture",
};

class ShipDetail extends Component {
  state = {
    fullname: "",
    street: "",
    city: "",
    province: "",
    postalcode: "",
    email: "",
    showPayBtns: false,
    errorField: "",
    emailDone: false,
    shipMethod: "",
    customerData: {},
    itemsOrdered: {},
  };

  componentDidMount() {
    hideSearchAndBackTopBtn(true);
    if (this.props.total < 5) {
      window.location.href = "/";
    }
  }
  componentWillUnmount() {
    hideSearchAndBackTopBtn(false);
  }
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      errorField: "",
    });
  };
  // validating all fields

  validate = (shipFee) => {
    if (this.state.shipMethod === "") {
      this.setState({
        errorField: "Shipping method",
      });
      return;
    }
    let { err, decision } = validateFields(
      this.state.shipMethod,
      this.state.email,
      this.state.postalcode
    );
    this.setState({
      errorField: err,
    });
    if (decision) {
      //save total
      const total = Number(this.props.total) + shipFee;
      this.props.saveTotalandAppliedPromo(total, this.props.appliedPromo);
      this.setState({
        showPayBtns: true,
      });
      document.getElementById("ship-detail-box-wrapper").style.display = "none";

      // preparing data in redux for sending email to client and merchant
      const itemsOrdered = this.props.cartItems.map((item) => {
        const rItem = {
          id: item._id,
          name: item.name,
          price: item.price,
          item_quantity: item.count,
        };
        return rItem;
      });
      let customerData = {};
      if (this.state.shipMethod === "pickup") {
        customerData = {
          email: this.state.email,
          phoneNumber: this.state.phoneNumber,
          total: this.props.total,
          shipMethod: this.state.shipMethod,
          appliedPromo: this.props.appliedPromo,
        };
      } else if (this.state.shipMethod === "delivery") {
        customerData = {
          username: this.state.username,
          email: this.state.email,
          phoneNumber: this.state.phoneNumber,
          address:
            this.state.street +
            ", " +
            this.state.postalCode +
            ", " +
            this.state.city +
            ", " +
            this.state.province,
          shipMethod: this.state.shipMethod,
          total: this.props.total,
          appliedPromo: this.state.appliedPromo,
        };
      }

      this.setState({
        customerData,
        itemsOrdered,
      });
    }
  };

  selectShipMethod = (option, e) => {
    selectShipMethodFunc(option, e);
    if (option === "pickup") {
      this.setState({
        shipMethod: "pickup",
      });
    } else {
      this.setState({
        shipMethod: "delivery",
      });
    }
  };
  render() {
    let shipFee = 0.0;
    let m = this.state.shipMethod;
    if (this.props.total <= 5 && m === "delivery") {
      shipFee = 15.0;
    } else if (this.props.total < 50 && m === "delivery") {
      shipFee = 10.0;
    } else if (this.props.total >= 50 && m === "delivery") {
      shipFee = 0.0;
    }

    let grandTotal = Number(this.props.total) + shipFee;
    grandTotal = grandTotal.toFixed(2);
    return (
      <div id="ship-detail-wrapper">
        <Link to="/cart">
          <FontAwesomeIcon
            id="back-button"
            icon={faArrowLeft}
          ></FontAwesomeIcon>
        </Link>
        <div id="ship-detail-box-wrapper">
          <div id="ship-detail-box">
            <div id="select-ship-method">
              <h3>Choose one</h3>
              <div id="select-ship-btns">
                <button
                  id="pickup"
                  onClick={(e) => this.selectShipMethod("pickup", e)}
                >
                  Pickup
                </button>
                <button
                  onClick={(e) => this.selectShipMethod("delivery", e)}
                  id="delivery"
                >
                  Delivery
                </button>
              </div>
              {this.state.shipMethod === "delivery" ? (
                <div id="ship-address">
                  <h4>Shipping Address</h4>
                  <div>
                    <input
                      name="fullname"
                      value={this.state.fullname}
                      onChange={this.onChange}
                      placeholder="Full Name"
                    />
                  </div>
                  <div>
                    <input
                      name="street"
                      value={this.state.street}
                      onChange={this.onChange}
                      placeholder="street name and number"
                    />
                  </div>

                  <div>
                    <input
                      name="city"
                      value={this.state.city}
                      onChange={this.onChange}
                      placeholder="City"
                    />
                  </div>
                  <div>
                    <input
                      name="postalcode"
                      value={this.state.postalcode}
                      onChange={this.onChange}
                      placeholder="Postal Code"
                    />
                  </div>
                  <div>
                    <select
                      name="province"
                      value={this.state.province}
                      onChange={this.onChange}
                    >
                      <option value="Ontario">Ontario</option>
                      <option value="Alberta">Alberta</option>
                      <option value="British Columbia">British Columbia</option>
                      <option value="Manitoba">Manitoba</option>
                      <option value="Nova Scotia">Nova Scotia</option>
                      <option value="New Brunswick">New Brunswick</option>
                      <option value="Newfoundland and Labrador">
                        Newfoundland and Labrador
                      </option>
                      <option value="Prince Edward Island">
                        Prince Edward Island
                      </option>
                      <option value="Quebec">Quebec</option>
                      <option value="Saskatchewan">Saskatchewan</option>
                    </select>
                  </div>
                  <div>
                    <input placeholder="Country" disabled value="Canada" />
                  </div>
                </div>
              ) : (
                ""
              )}
              {this.state.shipMethod === "pickup" ? (
                <div id="pickup-info">
                  <h4>Pickup</h4>
                  <p>Pickup orders are only available from one location -</p>
                  <p style={{ color: "blue" }}>
                    6820 Darcel Avenue, L4T 1T8, Mississauga, ON, Canada
                  </p>
                  <p>Pickup orders are ready within a week</p>
                  <p>
                    The pickup times and date will be send to you through your
                    provided email.
                  </p>
                </div>
              ) : (
                ""
              )}
            </div>

            <div id="contact-info">
              <h3>Contact Information</h3>
              <div>
                <input
                  name="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  placeholder="Enter your Email"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Enter your phone number (OPTIONAL)"
                />
              </div>
              <p style={{ width: "80%", fontSize: "14px", fontWeight: "bold" }}>
                Please enter your email id very carefully because it will be
                used to provide updates about your order.
              </p>
              <div id="grand-total">
                <div>
                  Subtotal
                  <p className="amt">$ {this.props.total}</p>
                </div>
                <div>
                  Shipping Fee
                  <p className="amt">$ {shipFee}</p>
                </div>
                <div style={{ fontWeight: "bold" }}>
                  Total
                  <p className="amt">$ {grandTotal}</p>
                </div>
              </div>
            </div>
          </div>
          {this.state.errorField ? (
            <p style={{ textAlign: "center", color: "red" }}>
              Error: {this.state.errorField} is not valid
            </p>
          ) : (
            ""
          )}

          <button id="proceed-pay-btn" onClick={() => this.validate(shipFee)}>
            Proceed to Pay
          </button>
        </div>

        {this.state.showPayBtns ? (
          <PayPalScriptProvider id="paypal-btns" options={initialOptions}>
            <Payment
              itemsOrdered={this.state.itemsOrdered}
              customerData={this.state.customerData}
            />
          </PayPalScriptProvider>
        ) : (
          ""
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  cartItems: state.item.cartItems,
  total: state.item.total,
  appliedPromo: state.item.appliedPromo,
});
export default connect(mapStateToProps, { saveTotalandAppliedPromo })(
  ShipDetail
);
