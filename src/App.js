import "./App.css";
import React, { Component } from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import ItemsContainer from "./components/ItemsContainer";
import SearchBar from "./components/SearchBar";
import Cart from "./components/Cart";
import ItemDetail from "./components/ItemDetail";
import Footer from "./components/Footer";
import Payment from "./components/Payment";
import ShipDetail from "./components/ShipDetail";
import { connect } from "react-redux";
import { HashRouter, Route, Routes } from "react-router-dom";
import TrackOrder from "./components/TrackOrder";
import { getAllItems } from "./actions/itemActions";
import Info from "./components/Info";

class App extends Component {
  state = {
    itemId: 0,
  };

  componentDidMount() {
    this.props.getAllItems();
  }

  getItemId = (id) => {
    this.setState({
      itemId: id,
    });
  };

  render() {
    return (
      <HashRouter>
        <div id="app">
          <Header />

          <SearchBar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/info" element={<Info />} />
            <Route
              path="/shipdetail"
              element={<ShipDetail total={this.props.total} />}
            />
            <Route
              path="/covers"
              element={
                <ItemsContainer
                  heading={"iPhone Cases and Guards"}
                  data={this.props.covers}
                />
              }
            />
            <Route
              path="/delicacies"
              element={
                <ItemsContainer
                  heading={"Childhood Delicacies"}
                  data={this.props.food}
                />
              }
            />
            <Route path="/itemDetail" element={<ItemDetail />} />
            <Route path="/trackOrder" element={<TrackOrder />} />
          </Routes>
          <Footer />
        </div>
      </HashRouter>
    );
  }
}

const mapStateToProps = (state) => ({
  total: state.item.total,
  carItems: state.item.carItems,
  food: state.item.foodItems,
  covers: state.item.coverItems,
});
export default connect(mapStateToProps, { getAllItems })(App);
