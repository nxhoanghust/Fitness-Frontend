import React from "react";
import { Modal, Button, Form, Row, Col, Input, Icon, InputNumber } from "antd";

class AdvancedSearchForm extends React.Component {
  state = {
    expand: false
  };

  // To generate mock Form.Item
  getFields() {
    const array = [
      "Thứ 2",
      "Thứ 3",
      "Thứ 4",
      "Thứ 5",
      "Thứ 6",
      "Thứ 7",
      "Chủ Nhật"
    ];
    const count = this.state.expand ? 10 : 6;
    const { getFieldDecorator } = this.props.form;
    const children = [];
    for (let i = 0; i < 7; i++) {
      children.push(
        <Col span={8} key={i} style={{ display: i < count ? "block" : "none" }}>
          <Form.Item label={array[i]}>
            {getFieldDecorator(`${array[i]}`, {
              rules: [
                {
                  required: true,
                  message: "Input something!"
                }
              ]
            })(<Input type="Number" placeholder="Input weight" />)}
          </Form.Item>
        </Col>
      );
    }
    return children;
  }

  handleSearch = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log("Received values of form: ", values);
    });
  };

  handleReset = () => {
    this.props.form.resetFields();
  };

  toggle = () => {
    const { expand } = this.state;
    this.setState({ expand: !expand });
  };

  render() {
    return (
      <Form className="ant-advanced-search-form" onSubmit={this.handleSearch}>
        <Row gutter={24}>{this.getFields()}</Row>
        <Row>
          <a style={{ marginLeft: 8, fontSize: 12 }} onClick={this.toggle}>
            Collapse <Icon type={this.state.expand ? "up" : "down"} />
          </a>
        </Row>
      </Form>
    );
  }
}

const WrappedAdvancedSearchForm = Form.create({ name: "advanced_search" })(
  AdvancedSearchForm
);
class StatisticScreen extends React.Component {
  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  render() {
    return (
      <div className="container">
        <Button type="primary" onClick={this.showModal}>
          Open Modal
        </Button>
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width="70%"
        >
          <WrappedAdvancedSearchForm />
        </Modal>
      </div>
    );
  }
}

export default StatisticScreen;
