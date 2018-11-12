import React, { Component } from "react";
import classes from "./DropDown.module.css";
class DropDown extends Component {
  constructor(props) {
    super(props);
    this.months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    this.optionItemsMonths = this.months.map((e, i) => (
      <option key={i}>{e}</option>
    ));

    this.optionItemsDays = Array(31)
      .fill(0)
      .map((e, i) => <option key={i}>{i + 1}</option>);

    this.optionItemsYears = Array(118)
      .fill(0)
      .map((e, i) => <option key={i}>{1901 + i}</option>);

    this.state = { Dob: { Mon: "", Date: "", Year: "1993" } };
  }

  onChangeHandler = e => {
    let value = e.target.value.trim();
    this.setState({
      Dob: { ...this.state.Dob, [e.target.name]: value }
    });
    // console.log(this.state.Dob);
  };

  render() {
    return (
      <div>
        <select
          className={classes.DropDown}
          value={this.state.Dob.Mon}
          onChange={this.onChangeHandler}
          name="Mon"
        >
          {this.optionItemsMonths}
        </select>
        <select
          className={classes.DropDown}
          onChange={this.onChangeHandler}
          value={this.state.Dob.Date}
          name="Date"
        >
          {this.optionItemsDays}
        </select>
        <select
          className={classes.DropDown}
          onChange={this.onChangeHandler}
          value={this.state.Dob.Year}
          name="Year"
        >
          {this.optionItemsYears}
        </select>
      </div>
    );
  }
}

export default DropDown;
