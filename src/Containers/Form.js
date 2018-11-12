import React, { Component } from "react";
import Input from "../Components/Input/Input";
import Label from "../Components/Label/Label";
import DropDown from "../Components/DropDown/DropDown";
import Button from "../Components/Button/Button";
import classes from "./Form.module.css";
class App extends Component {
  state = {
    formData: {
      fname: {
        value: "",
        rules: {
          required: true,
          minLength: 5
        },
        valid: false,
        touched: false
      },
      lname: {
        value: "",
        rules: {
          required: true
        },
        valid: false,
        touched: false
      },
      Email: {
        value: "",
        rules: {
          required: true
        },
        valid: false,
        touched: false
      },
      Password: {
        value: "",
        rules: {
          required: true,
          minLength: 8
        },
        valid: false,
        touched: false
      },
      Gender: {
        value: "",
        rules: {},
        rules: {
          required: true
        },
        valid: false
      },
      Languages: { English: true, Hindi: false, Punjabi: false },
      formVaid: false,
      errorMessage: ""
    }
  };

  checkValidity = (value, rules) => {
    let isValid = false;
    if (rules.required) {
      isValid = value.length !== 0;
      if (rules.minLength) {
        isValid = value.length >= rules.minLength;
      }
    }
    return isValid;
  };
  onClickHandler = e => {
    const obj = {
      ...this.state.formData[e.target.name],
      touched: true
    };
    this.setState({
      formData: { ...this.state.formData, [e.target.name]: obj }
    });
  };
  onChangeHandler = e => {
    let data = e.target.value.trim();
    const rules = { ...this.state.formData[e.target.name].rules };
    const isValid = this.checkValidity(data, rules);
    const isVal = /^[a-zA-Z]+$/.test(data);
    const obj = {
      ...this.state.formData[e.target.name],
      value: data,
      valid: isValid && isVal
    };
    this.setState({
      formData: { ...this.state.formData, [e.target.name]: obj }
    });
  };

  onLanguageChangeHandler = e => {
    const lang = { ...this.state.formData.Languages };
    let name = [e.target.name];
    lang[name] = e.target.checked;

    this.setState(prevState => ({
      formData: {
        ...this.state.formData,
        Languages: lang
      }
    }));
  };

  onPasswordChangeHandler = e => {
    let data = e.target.value.trim();
    const rules = { ...this.state.formData[e.target.name].rules };
    const isValid = this.checkValidity(data, rules);
    const obj = {
      ...this.state.formData[e.target.name],
      value: data,
      valid: isValid
    };
    this.setState({
      formData: { ...this.state.formData, [e.target.name]: obj }
    });
  };

  formValid = currentValue => {
    return currentValue === true;
  };

  validateEmail = email => {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  onChangeEmailHandler = e => {
    let data = e.target.value.trim();
    const rules = { ...this.state.formData[e.target.name].rules };
    const isValid = this.checkValidity(data, rules);
    const isVal = this.validateEmail(data);

    const obj = {
      ...this.state.formData[e.target.name],
      value: data,
      valid: isValid && isVal
    };
    this.setState({
      formData: { ...this.state.formData, [e.target.name]: obj }
    });
  };

  onSubmitHandler = e => {
    e.preventDefault();
    let values = [];
    const data = {};
    for (let a in this.state.formData) {
      data[a] = this.state.formData[a];
      if (data[a].valid !== undefined) {
        values.push(data[a].valid);
      }
    }
    if (values.length !== 0 && values.every(this.formValid)) {
      // console.log(data);
      this.setState({
        formData: {
          ...this.state.formData,
          message: "Form submitted"
        }
      });
    } else {
      this.setState({
        formData: {
          ...this.state.formData,
          message: "Please provide Correct values"
        }
      });
    }
  };

  render() {
    let inputStyle = {
      width: "272px"
    };
    let styleInvalid = {
      border: "1px red solid"
    };
    let styleInvalidBigField = {
      width: "272px",
      border: "1px red solid"
    };
    const labelStyle = { fontWeight: "bold", fontSize: "20px" };
    return (
      <form className={classes.Form} onSubmit={this.onSubmitHandler}>
        <h3 className={classes.h3}>{this.state.formData.message}</h3>
        <h1 className={classes.h1}>Create a New Account</h1>
        <h2 className={classes.h2}>It’s free and always will be</h2>
        <Input
          type="text"
          placeholder="First Name"
          name="fname"
          value={this.state.formData.fname.value}
          onChange={this.onChangeHandler}
          onClick={this.onClickHandler}
          style={
            this.state.formData.fname.touched &&
            !this.state.formData.fname.valid
              ? styleInvalid
              : null
          }
        />
        <Input
          type="text"
          placeholder="Last Name"
          name="lname"
          value={this.state.formData.lname.value}
          onChange={this.onChangeHandler}
          onClick={this.onClickHandler}
          style={
            this.state.formData.lname.touched &&
            !this.state.formData.lname.valid
              ? styleInvalid
              : null
          }
        />
        <br />
        <Input
          type="email"
          placeholder="Email"
          name="Email"
          value={this.state.formData.Email.value}
          onChange={this.onChangeEmailHandler}
          onClick={this.onClickHandler}
          style={
            this.state.formData.Email.touched &&
            !this.state.formData.Email.valid
              ? styleInvalidBigField
              : inputStyle
          }
        />
        <br />
        <Input
          type="password"
          placeholder="New Password"
          name="Password"
          value={this.state.formData.Password.value}
          onChange={this.onPasswordChangeHandler}
          onClick={this.onClickHandler}
          style={
            this.state.formData.Password.touched &&
            !this.state.formData.Password.valid
              ? styleInvalidBigField
              : inputStyle
          }
        />
        <br />
        <label style={{ fontSize: "12px", color: "#3b5998" }}>
          Password should have minimum length of 8
        </label>
        <br />
        <Label value="Birthday :" style={labelStyle} />
        <br />
        <DropDown />
        <Label value="Gender :" style={labelStyle} />
        <br />
        <Label value="Female" for="female" />
        <Input
          type="radio"
          name="Gender"
          id="female"
          onChange={this.onChangeHandler}
          value="female"
        />
        <Label value="Male" for="male" />
        <Input
          type="radio"
          name="Gender"
          id="male"
          onChange={this.onChangeHandler}
          value="male"
        />
        <br />
        <Label value="Preferred Languages :" for="lang" style={labelStyle} />
        <br />
        <Label value="English" for="1" />
        <Input
          type="Checkbox"
          id="1"
          name="English"
          checked={this.state.formData.Languages.English}
        />
        <br />
        <Label value="Hindi" for="2" />
        <Input
          type="Checkbox"
          id="2"
          name="Hindi"
          checked={this.state.formData.Languages.Hindi}
          onChange={this.onLanguageChangeHandler}
        />
        <br />
        <Label value="Punjabi" for="3" />
        <Input
          type="Checkbox"
          id="3"
          name="Punjabi"
          checked={this.state.formData.Languages.Punjabi}
          onChange={this.onLanguageChangeHandler}
        />
        <br />
        <Button value="Sign Up" />
      </form>
    );
  }
}

export default App;
