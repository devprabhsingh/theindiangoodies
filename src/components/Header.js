import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
class Header extends Component {
  render() {
    return (
      <header>
        <h2>
          <Link to="/">THE INDIAN GOODIES</Link>
        </h2>
        <Link to="/covers">Cases and Guards</Link>
        <Link to="/delicacies">Snacks and Candies</Link>
        
          <Link id="track-btn" to="/trackOrder">
            Track Order
          </Link>

        <div>
          <Link id="cart-box" to="/cart">
            <div id="cart-number">
              {this.props.cartItemsLen > 0 ? (
                <span id="items-count">{this.props.cartItemsLen}</span>
              ) : (
                ""
              )}
              <img alt='cart' id="cart-logo" src={require("../static/cart.png")} height='30px' width="30px"/>
            </div>
          </Link>
          </div>
        
      </header>
    );
  }
}
const mapStateToProps = (state) => ({
  cartItemsLen: state.item.cartItems.length,
});
export default connect(mapStateToProps, null)(Header);
