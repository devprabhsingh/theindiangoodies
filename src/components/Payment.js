import React, { Fragment } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { sendEmail, saveData } from "../actions/itemActions";

class Payment extends React.Component {
  state = {
    tStatus: "",
    showPayBtns: true,
    payer: {},
    trackId: "",
    shipMethod: "",
  };
  onCreateOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: 0.1,
          },
        },
      ],
    });
  };

  onApproveOrder = (data, actions) => {
    return actions.order.capture().then((details) => {
      if (details.status === "COMPLETED") {
        this.setState({
          trackId: details.id,
          payer: details.payer,
          tStatus: details.status,
          showPayBtns: false,
        });
        document.getElementById("total-amt").style.display = "none";

        //saving into db
        this.props.saveData(
          this.props.customerData,
          this.props.itemsOrdered,
          details.payer,
          details.id
        );
        //sending email
        this.props.sendEmail(
          this.props.customerData,
          this.props.itemsOrdered,
          details.id
        );
      }
    });
  };

  render() {
    return (
      <Fragment>
        <div className="checkout">
          <p id="total-amt" style={{ fontSize: "25px", fontWeight: "bold" }}>
            Total -<span style={{ color: "green" }}> ${this.props.total}</span>
          </p>

          {this.state.showPayBtns ? (
            <Fragment>
              <p style={{ fontSize: "15px", marginTop: "30px" }}>
                Options to Pay
              </p>
              <PayPalButtons
                style={{ layout: "vertical" }}
                createOrder={(data, actions) =>
                  this.onCreateOrder(data, actions)
                }
                onApprove={(data, actions) =>
                  this.onApproveOrder(data, actions)
                }
              />
            </Fragment>
          ) : (
            <div id="tStatus-box">
              {this.state.tStatus === "COMPLETED" ? (
                <div>
                  <FontAwesomeIcon
                    style={{ fontSize: "35px" }}
                    icon={faCheckCircle}
                  ></FontAwesomeIcon>
                  <h4>Your payment is successful</h4>
                  <p>your tracking id : {this.state.trackId}</p>
                  <p>
                    You will get the order receipt through your provided email
                    address.
                  </p>
                  <h5>Thanks for ordering with us.Have a wonderful day.</h5>
                </div>
              ) : (
                <div>Please go to Cart and try again.</div>
              )}
            </div>
          )}
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  total: state.item.total,
});
export default connect(mapStateToProps, { sendEmail, saveData })(Payment);
