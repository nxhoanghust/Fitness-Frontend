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
  Select,
  message
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
  computeBMI = () => {
    //Obtain user inputs
    var height = this.state.height;
    var heightunits = this.state.unitH;
    var weight = this.state.weight;
    var weightunits = this.state.unitW;
    console.log(height);
    console.log(weight);
    //Convert all units to metric
    if (heightunits == "inches") height /= 39.3700787;
    if (weightunits == "lb") weight /= 2.20462;

    //Perform calculation
    var BMI = ((weight / Math.pow(height, 2)) * 10000).toFixed(2);
    console.log(BMI);
    //Display result of calculation
    this.setState({
      BMI: BMI
    });
    var color = "";
    var status = "";
    if (BMI < 18.5) {
      color = "#cf1322";
      status = "Thiếu cân";
    }
    if (BMI >= 18.5 && BMI <= 25) {
      color = "#3f8600";
      status = "Bình thường";
    }
    if (BMI >= 25 && BMI <= 30) {
      color = "#f0f01f";
      status = "Thừa cân";
    }
    if (BMI > 30) {
      color = "#cf1322";
      status = "Béo phì";
    }
    this.setState({
      status: status,
      color: color
    });
  };
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
    waist: "",
    BMI: "",
    status: "",
    color: ""
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
    this.computeBMI();
    var height = this.state.height;
    var heightunits = this.state.unitH;
    var weight = this.state.weight;
    var weightunits = this.state.unitW;
    if (heightunits == "inches") height /= 39.3700787;
    if (weightunits == "lb") weight /= 2.20462;
    fetch(`http://localhost:3001/users/statistic`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        weight: weight,
        height: height,
        waist: this.state.waist,
        hips: this.state.hips,
        BMI: this.state.BMI
      })
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        message.error(error.message);
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
            {
              {
                BMI: (
                  <div>
                    <h2>
                      Chỉ số BMI của bạn:
                      <h2
                        className="bmi"
                        style={{
                          color: `${this.state.color}`,
                          fontWeight: "bold"
                        }}
                      >
                        {this.state.BMI}
                      </h2>
                    </h2>
                    <p id="bmi">{this.state.status}</p>
                  </div>
                ),
                WHR: <p>app content</p>
              }[this.state.noTitleKey]
            }
          </Card>
        </div>
      </div>
    );
  }
}

export default StatisticScreen;
