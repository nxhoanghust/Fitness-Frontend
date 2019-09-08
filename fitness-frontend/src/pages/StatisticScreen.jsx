import React from "react";
import {
  Modal,
  Button,
  Form,
  Row,
  Col,
  Input,
  Tooltip,
  Icon,
  Statistic,
  Card,
  InputNumber,
  Select
} from "antd";
import "./StatisticScreen.css";
import "antd/dist/antd.css";
const { Option } = Select;

const tabListNoTitle = [
  {
    key: "BMI",
    tab: "Chỉ số sức khỏe BMI"
  },
  {
    key: "WHR",
    tab: "Tỷ lệ vòng eo/mông"
  }
];

/*function computeBMI() {
  //Obtain user inputs
  var height = Number(document.getElementById("height").value);
  var heightunits = document.getElementById("heightunits").value;
  var weight = Number(document.getElementById("weight").value);
  var weightunits = document.getElementById("weightunits").value;

  //Convert all units to metric
  if (heightunits == "inches") height /= 39.3700787;
  if (weightunits == "lb") weight /= 2.20462;

  //Perform calculation
  var BMI = weight / Math.pow(height, 2);

  //Display result of calculation
  document.getElementById("output").innerText = Math.round(BMI * 100) / 100;

  if (output < 18.5) document.getElementById("comment").value = "Underweight";
  if (output >= 18.5 && output <= 25)
    document.getElementById("comment").value = "Normal";
  if (output >= 25 && output <= 30)
    document.getElementById("comment").value = "Obese";
  if (output > 30) document.getElementById("comment").value = "Overweight";
  document.getElementById("answer").value = output;
}*/
const contentListNoTitle = {
  BMI: (
    <div>
      <h2>Công thức: BMI = Cân nặng/ [(Chiều cao)^2]</h2>
      <p></p>
    </div>
  ),
  WHR: <p>app content</p>
};

class StatisticScreen extends React.Component {
  onTabChange = (key, type) => {
    console.log(key, type);
    this.setState({ [type]: key });
  };
  state = {
    visible: false,
    noTitleKey: "BMI",
    unitW: "kg",
    unitH: "cm",
    weight: "",
    height: "",
    hips: "",
    waist: ""
  };

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
  handleChangeUnit1 = value => {
    this.setState({
      unitW: value
    });
  };
  handleChangeUnit1 = value => {
    this.setState({
      unitW: value
    });
  };
  handleChangeWeight = value => {
    this.setState({
      weight: value
    });
  };
  handleChangeHeight = value => {
    this.setState({
      height: value
    });
  };
  handleChangeHips = value => {
    this.setState({
      hips: value
    });
  };
  handleChangeUnit2 = value => {
    this.setState({
      unitH: value
    });
  };
  handleChangeWaist = value => {
    this.setState({
      waist: value
    });
  };
  render() {
    console.log(this.state);
    return (
      <div className="container mt-5">
        <Button
          type="primary mt-5"
          onClick={this.showModal}
          style={{ height: "50px" }}
        >
          <Icon type="database" />
          Nhập chỉ số cơ thể
        </Button>
        <Modal
          title="Chỉ số cơ thể"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width="33%"
        >
          <div className="mr-4">
            <p
              style={{
                display: "inline-block",
                width: "35%"
              }}
              className="mr-3"
            >
              Cân nặng:
            </p>
            <InputNumber
              style={{ width: "25%", marginRight: "2%" }}
              onChange={this.handleChangeWeight}
            ></InputNumber>
            <Select
              value={this.state.unitW}
              style={{ width: "15%" }}
              onChange={this.handleChangeUnit1}
            >
              <Option value="kg">Kg</Option>
              <Option value="lb">Lb</Option>
            </Select>
          </div>
          <div className="mr-4">
            <p
              style={{
                display: "inline-block",
                width: "35%"
              }}
              className="mr-3"
            >
              Chiều cao:
            </p>
            <InputNumber
              style={{ width: "25%", marginRight: "2%" }}
              onChange={this.handleChangeHeight}
            ></InputNumber>
            <Select
              value={this.state.unitH}
              style={{ width: "15%" }}
              onChange={this.handleChangeUnit2}
            >
              <Option value="cm">cm</Option>
              <Option value="inches">In</Option>
            </Select>
          </div>
          <div className="mr-4">
            <p
              style={{
                display: "inline-block",
                width: "35%"
              }}
              className="mr-3"
            >
              Vòng eo:
            </p>
            <InputNumber
              style={{ width: "25%", marginRight: "2%" }}
              onChange={this.handleChangeWaist}
            ></InputNumber>
            <span className="ml-2">cm</span>
          </div>
          <div className="mr-4">
            <p
              style={{
                display: "inline-block",
                width: "35%"
              }}
              className="mr-3"
            >
              Vòng hông:
            </p>
            <InputNumber
              style={{ width: "25%", marginRight: "2%" }}
              onChange={this.handleChangeHips}
            ></InputNumber>
            <span className="ml-2">cm</span>
          </div>
        </Modal>
        <div>
          <br />
          <br />
          <Card
            style={{ width: "100%" }}
            tabList={tabListNoTitle}
            activeTabKey={this.state.noTitleKey}
            tabBarExtraContent={<a href="#">More</a>}
            onTabChange={key => {
              this.onTabChange(key, "noTitleKey");
            }}
          >
            {contentListNoTitle[this.state.noTitleKey]}
          </Card>
        </div>
      </div>
    );
  }
}

export default StatisticScreen;
