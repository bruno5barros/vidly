import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";

class RegisterForm extends Form {
  state = {
    data: { username: "", password: "", name: "" },
    errors: {},
  };

  schema = {
    username: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: [true] } })
      .label("Username"),
    password: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .required()
      .label("Password"),
    name: Joi.string().required().label("Name"),
  };

  doSubmit = () => {
    console.log("Register submitted");
  };

  render() {
    return (
      <React.Fragment>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username", "email")}
          {this.renderInput("password", "Password")}
          {this.renderInput("name", "Name", "text")}
          {this.renderButton("Register")}
        </form>
      </React.Fragment>
    );
  }
}

export default RegisterForm;
