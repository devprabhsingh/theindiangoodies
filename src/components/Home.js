import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import ItemsInArr from "./ItemsInArr";
import { connect } from "react-redux";
import ItemsContainer from "./ItemsContainer";

let slideIndex = 0;
class Home extends Component {
  state = {};

  showSlides = () => {
    let i;
    let slides = document.getElementsByClassName("slide");
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {
      slideIndex = 1;
    }
    slides[slideIndex - 1].style.display = "block";
    setTimeout(this.showSlides, 3000);
  };
  componentDidMount() {
    this.showSlides();
  }

  scrollItems = (e) => {
    const elm = e.target.parentElement;
    console.log(elm.previousSibling);
    elm.previousSibling.scrollLeft += 20;
  };
  render() {
    return (
      <Fragment>
        <div id="slideshow-container">
          <img
            className="slide"
            alt="order1"
            src={require("../static/offer1.jpg")}
          />
          <img
            className="slide"
            alt="order1"
            src={require("../static/offer2.jpg")}
          />
        </div>
        <h2 className="home-heading">Explore our products</h2>
        <div id="categories">
          <Link to="/covers">
            <div className="category">
              <h3>iPhone Cases and Guards</h3>
              <img src={require("../static/phone.png")} alt="cover" />
              <div className="viewall">View All</div>
            </div>
          </Link>
          <Link to="/delicacies">
            <div className="category">
              <h3>Childhood Delicacies</h3>
              <img src={require("../static/food.png")} alt="cover" />
              <div className="viewall">View All</div>
            </div>
          </Link>
        </div>

        <ItemsInArr heading="Best Selling" items={this.props.food} />
        <ItemsInArr heading="New Arrivals" items={this.props.covers} />
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  food: state.item.foodItems,
  covers: state.item.coverItems,
});
export default connect(mapStateToProps, null)(Home);
