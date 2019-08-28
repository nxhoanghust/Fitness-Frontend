import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./index.css";
import {
    Form,
    Input,
    Tooltip,
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

const residences = [
    {
        value: "Hà Nội",
        label: "Hà Nội",
        children: [
            {
                value: "Cầu Giấy",
                label: "Cầu Giấy",
                children: [
                    {
                        value: "Nguyễn Phong Sắc",
                        label: "Nguyễn Phong Sắc"
                    }
                ]
            }
        ]
    },
    {
        value: "Đà Nẵng",
        label: "Đà Nẵng",
        children: [
            {
                value: "Hải Châu",
                label: "Hải Châu",
                children: [
                    {
                        value: "Xuân Diệu",
                        label: "Xuân Diệu"
                    }
                ]
            }
        ]
    }
];

class RegisterScreen extends React.Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: []
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log("Received values of form: ", values);
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
            initialValue: "86"
        })(
            <Select style={{ width: 70 }}>
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
            </Select>
        );

        const websiteOptions = autoCompleteResult.map(website => (
            <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
        ));

        return (
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
                        initialValue: ["Hà Nội", "Đà Nẵng", "Sài Gòn"],
                        rules: [
                            {
                                type: "array",
                                required: true,
                                message: "Please select your habitual residence!"
                            }
                        ]
                    })(<Cascader options={residences} />)}
                </Form.Item>
                <Form.Item label="Phone Number">
                    {getFieldDecorator("phone", {
                        rules: [
                            { required: true, message: "Please input your phone number!" }
                        ]
                    })(<Input addonBefore={prefixSelector} style={{ width: "100%" }} />)}
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
        );
    }
}

const WrappedRegisterScreen = Form.create({ name: "register" })(
    RegisterScreen
);

ReactDOM.render(
    <WrappedRegisterScreen/>,
    document.getElementById("container")
);
