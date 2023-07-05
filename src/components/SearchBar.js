import React, { Component, Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { searchWord } from "../static/main";
import { connect } from "react-redux";
import ItemsContainer from "./ItemsContainer";

class SearchBar extends Component {
  state = {
    searchWord: "",
    sResults: [],
  };

  handleSearch = () => {
    if (this.state.searchWord.length > 2) {
      const covers = this.props.covers;
      const food = this.props.food;
      const result = searchWord(this.state.searchWord, covers, food);
      const allItems = covers.concat(food);
      const reqResults = [];
      allItems.forEach((item) => {
        for (let i = 0; i < result.length; i++) {
          if (item.name.toLowerCase() === result[i]) {
            reqResults.push(item);
          }
        }
      });
      this.setState({
        sResults: reqResults,
      });
    }
  };
  render() {
    return (
      <Fragment>
        <div id="search-bar-container">
          <div id="search-bar">
            <input
              onChange={(e) => {
                this.setState({
                  searchWord: e.target.value,
                });
                this.handleSearch();
              }}
              value={this.state.searchWord}
              placeholder="What are you looking for.."
            />
            <FontAwesomeIcon onClick={this.handleSearch} icon={faSearch} />
          </div>
        </div>

        {this.state.searchWord.length > 2 ? (
          <ItemsContainer
            sWord={this.state.searchWord}
            data={this.state.sResults}
            heading="Search Results"
          />
        ) : (
          ""
        )}
      </Fragment>
    );
  }
}
const mapStateToProps = (state) => ({
  food: state.item.foodItems,
  covers: state.item.coverItems,
});
export default connect(mapStateToProps, null)(SearchBar);
