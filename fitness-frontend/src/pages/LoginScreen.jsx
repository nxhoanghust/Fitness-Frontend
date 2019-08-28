import React from "react";
import { Form, Icon, Input, Button, Checkbox, message } from "antd";
import "antd/dist/antd.css";
import "./LoginScreen.css";
const emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

class NornamlForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      //console.log("Received values of form: ", values);
      if (err) {
        message.error(err);
      } else if (values.password.length < 8 || values.password.length > 15) {
        message.error("Password must be in length from 8 to 15 characters");
      } else if (!emailRegex.test(values.username)) {
        message.error("Invalid Email");
      } else {
        fetch("http://localhost:3001/users/login", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: values.username,
            password: values.password,
            remember: values.remember
          })
        })
          .then(res => {
            return res.json();
          })
          .then(data => {
            console.log(data);
            if (data.success == false) {
              message.error(data.message);
            } else {
              message.success(data.message);
              if (values.remember) {
                window.localStorage.setItem("email", data.data.email);
                window.localStorage.setItem("fullName", data.data.fullName);
                window.localStorage.setItem("id", data.data._id);
              }
              window.location.href = "/";
            }
          })
          .catch(error => {
            console.log(error);
            message.error(error);
          });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="container col-4 form registerform">
        <h3> SIGN IN</h3>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator("username", {
              rules: [
                { required: true, message: "Please input your username!" }
              ]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Email"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("password", {
              rules: [
                { required: true, message: "Please input your Password!" }
              ]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                placeholder="Password"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("remember", {
              valuePropName: "checked",
              initialValue: true
            })(<Checkbox>Remember me</Checkbox>)}
            <a className="login-form-forgot" href="">
              Forgot password
            </a>
            <br />
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
            <br />
            Or <a href="/register">register now!</a>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const LoginScreen = Form.create({})(NornamlForm);

export { LoginScreen };

export default LoginScreen;
