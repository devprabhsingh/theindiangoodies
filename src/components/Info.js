import React, { Component } from "react";

export default class Info extends Component {
  render() {
    return (
      <div id="info">
        <section>
          <h3>About Us</h3>
          <p>
            Our business is a new startup run by 4 partners. Our motive is to
            provide indian snacks and childhood delicacies to you in Canada. In
            addition to that, we also sell iPhone cases and guards at a cheap
            price. We hope to add more stuff as we grow.
          </p>
        </section>
        <section>
          <h3>Return Policy</h3>
          <p>
            If you are not satisfied with our product you can return it by
            contacting us at our email theindiangoodies.ca and we will offer you
            full refund. NOTE: Returned item must be in new condition and food
            items are not eligible for refund.
          </p>
        </section>
        <section>
          <h3>Help and Support</h3>
          <p>
            You can contact us through our email: theindiangoodies@gmail.com -
            we will reply back same day.
          </p>
        </section>
        <section>
          <h3>Shipping and fees</h3>
          <p>
            As we are a new startup, we do not have one courier service. It
            depends upon your location. Most probably, we deliver the orders
            within 10 business days in Canada. Standard shipping fees(within
            Canada) : $10, if your order total is $100 or more, there is no
            shipping fees.
          </p>
        </section>
        <section>
          <h3>Privacy Policy</h3>
          <p>
            Once you fill your information, we securely save it in our servers
            until your order is processed and shipped to you. After that it is
            deleted. For your payment information, we use PayPal so you do not
            need to worry about that.
          </p>
        </section>
      </div>
    );
  }
}
