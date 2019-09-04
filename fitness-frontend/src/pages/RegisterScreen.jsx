import React from "react";
import "antd/dist/antd.css";
import "../index.css";
import "./RegisterScreen.css";
import {
  Form,
  Input,
  message,
  Icon,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete
} from "antd";

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;
const phoneRegex = /^0(1\d{9}|9\d{8})$/;

const residences = [
  {
    value: "Hà Nội",
    label: "Hà Nội"
  },
  {
    value: "Tp Hồ Chí Minh",
    label: "Tp Hồ Chí Minh"
  },
  {
    value: "Đà Nẵng",
    label: "Đà Nẵng"
  }
];

class RegiterForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: []
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      var phoneNumber = values.phone;
      //console.log(values);
      if (err) {
        message.err(err);
      } else if (values.agreement === undefined) {
        message.warning("Please read the Agreement");
      } else {
        fetch("http://localhost:3001/users/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: values.email,
            password: values.password,
            fullName: values.fullname,
            phoneNumber: phoneNumber,
            address: values.residence[0]
          })
        })
          .then(res => {
            return res.json();
          })
          .then(data => {
            if (data.success === false) {
              message.error(data.message);
            } else {
              message.success("Register Successfull");
              window.location.href = "/login";
            }
          })
          .catch(error => {
            console.log(error);
            window.alert(error.message);
          });
      }
    });
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue("password")) {
      callback("Two passwords that you enter is inconsistent!");
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    if (value.length < 8 || value.length > 15) {
      callback("Password must be from 8-15 characters");
    }
    callback();
  };

  handleWebsiteChange = value => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = [".com", ".org", ".net"].map(
        domain => `${value}${domain}`
      );
    }
    this.setState({ autoCompleteResult });
  };
  validatePhone = (rule, value, callback) => {
    if (!phoneRegex.test(value)) {
      callback("Invalid Phone Number");
    }
    callback();
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };
    const prefixSelector = getFieldDecorator("prefix", {
      initialValue: "84"
    })(
      <Select style={{ width: 70 }}>
        <Option value="84">+84</Option>
      </Select>
    );

    const websiteOptions = autoCompleteResult.map(website => (
      <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    ));

    return (
      <div className="container col-6 form">
        <h3 className="center">Register</h3>
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item label="E-mail">
            {getFieldDecorator("email", {
              rules: [
                {
                  type: "email",
                  message: "The input is not valid E-mail!"
                },
                {
                  required: true,
                  message: "Please input your E-mail!"
                }
              ]
            })(<Input />)}
          </Form.Item>
          <Form.Item label="Password" hasFeedback>
            {getFieldDecorator("password", {
              rules: [
                {
                  required: true,
                  message: "Please input your password!"
                },

                {
                  validator: this.validateToNextPassword
                }
              ]
            })(<Input.Password />)}
          </Form.Item>
          <Form.Item label="Confirm Password" hasFeedback>
            {getFieldDecorator("confirm", {
              rules: [
                {
                  required: true,
                  message: "Please confirm your password!"
                },
                {
                  validator: this.compareToFirstPassword
                }
              ]
            })(<Input.Password onBlur={this.handleConfirmBlur} />)}
          </Form.Item>
          <Form.Item label={<span>Full Name&nbsp;</span>}>
            {getFieldDecorator("fullname", {
              rules: [
                {
                  required: true,
                  message: "Please input your Full name!",
                  whitespace: true
                }
              ]
            })(<Input />)}
          </Form.Item>
          <Form.Item label="Address">
            {getFieldDecorator("residence", {
              rules: [
                {
                  required: true,
                  message: "Please select your habitual residence!"
                }
              ]
            })(
              <Cascader placeholder="Please Select ..." options={residences} />
            )}
          </Form.Item>
          <Form.Item label="Phone Number">
            {getFieldDecorator("phone", {
              rules: [
                { required: true, message: "Please input your phone number!" },
                { validator: this.validatePhone }
              ]
            })(
              <Input addonBefore={prefixSelector} style={{ width: "100%" }} />
            )}
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            {getFieldDecorator("agreement", {
              valuePropName: "checked"
            })(
              <Checkbox>
                I have read the <a href="/">agreement</a>
              </Checkbox>
            )}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const RegisterScreen = Form.create({})(RegiterForm);

export { RegisterScreen };
/*ReactDOM.render(
  <WrappedRegisterScreen />,
  document.getElementById("container")
);*/
export default RegisterScreen;
