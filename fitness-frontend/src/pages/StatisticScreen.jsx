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
    tab: "Tỷ lệ vòng eo/hông WHR"
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

function computeBMI(BMI) {
  var color = "";
  if (BMI < 18.5) {
    color = "#cf1322";
  }
  if (BMI >= 18.5 && BMI <= 25) {
    color = "#3f8600";
  }
  if (BMI >= 25 && BMI <= 30) {
    color = "#fcae05";
  }
  if (BMI > 30) {
    color = "#cf1322";
  }
  return color;
}
function computeWHR(WHR, gender) {
  var color2 = "";
  if ((WHR < 0, 7 && gender == "female") || (WHR < 0.9 && gender == "male")) {
    color2 = "#3f8600";
  } else if (
    (WHR < 0.8 && gender == "female") ||
    (WHR < 0.95 && gender == "male")
  ) {
    color2 = "#67ff0f";
  } else if (
    (WHR < 0.85 && gender == "female") ||
    (WHR < 0.1 && gender == "male")
  ) {
    color2 = "#fcae05";
  } else {
    color2 = "cf1322";
  }
  return color2;
}
function statusWHR(WHR, gender) {
  var status = "";
  if ((WHR < 0, 7 && gender == "female") || (WHR < 0.9 && gender == "male")) {
    status = "Không nguy hiểm (sức khỏe tốt)";
  } else if (
    (WHR < 0.8 && gender == "female") ||
    (WHR < 0.95 && gender == "male")
  ) {
    status = "Ít nguy hiểm";
  } else if (
    (WHR < 0.85 && gender == "female") ||
    (WHR < 0.1 && gender == "male")
  ) {
    status = "Trung bình";
  } else {
    status = "Nguy hiểm ";
  }
  return status;
}
function statusBMI(BMI) {
  var status = "";
  if (BMI < 18.5) {
    status = "Thiếu cân";
  }
  if (BMI >= 18.5 && BMI <= 25) {
    status = "Bình thường";
  }
  if (BMI >= 25 && BMI <= 30) {
    status = "Thừa cân";
  }
  if (BMI > 30) {
    status = "Béo phì";
  }
  return status;
}
class StatisticScreen extends React.Component {
  componentDidMount() {
    fetch(`http://localhost:3001/users/statistic/get`, {
      credentials: "include",
      method: "GET"
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log(data);
        this.setState({
          lastBMI: data.data.BMI,
          lastWHR: data.data.WHR,
          gender: data.data.gender
        });
      })
      .catch(error => {
        message.error(error.message);
      });
  }

  onTabChange = (key, type) => {
    console.log(key, type);
    this.setState({ [type]: key });
  };
  state = {
    visible: false,
    gender: "",
    noTitleKey: "BMI",
    unitW: "kg",
    unitH: "cm",
    weight: "",
    height: "",
    hips: "",
    waist: "",
    BMI: "",
    WHR: "",
    status: "",
    color: "",
    color2: "",
    status2: "",
    lastBMI: "",
    lastWHR: ""
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
    if (
      this.state.height === "" ||
      this.state.waist == "" ||
      this.state.weight == "" ||
      this.state.hips == ""
    ) {
      message.warning("Hãy nhập toàn bộ thông số !");
    } else {
      var gender = this.state.gender;
      var height = this.state.height;
      var heightunits = this.state.unitH;
      var weight = this.state.weight;
      var weightunits = this.state.unitW;
      if (heightunits == "inches") {
        height /= 39.3700787;
      } else {
        height /= 100;
      }
      if (weightunits == "lb") weight /= 2.20462;
      var BMI = (weight / Math.pow(height, 2)).toFixed(2);
      var waist = this.state.waist;
      var hips = this.state.hips;
      var WHR = (waist / hips).toFixed(2);
      console.log(BMI);
      //Display result of calculation
      this.setState({
        BMI: BMI,
        WHR: WHR
      });
      var color = "";
      var status = "";
      var color2 = "";
      var status2 = "";
      if (BMI < 18.5) {
        color = "#cf1322";
        status = "Thiếu cân";
      }
      if (BMI >= 18.5 && BMI <= 25) {
        color = "#3f8600";
        status = "Bình thường";
      }
      if (BMI >= 25 && BMI <= 30) {
        color = "#fcae05";
        status = "Thừa cân";
      }
      if (BMI > 30) {
        color = "#cf1322";
        status = "Béo phì";
      }
      //WHR
      if (
        (WHR < 0, 7 && gender == "female") ||
        (WHR < 0.9 && gender == "male")
      ) {
        color2 = "#3f8600";
        status2 = "Không nguy hiểm (sức khỏe tốt)";
      } else if (
        (WHR < 0.8 && gender == "female") ||
        (WHR < 0.95 && gender == "male")
      ) {
        color2 = "#67ff0f";
        status2 = "Ít nguy hiểm";
      } else if (
        (WHR < 0.85 && gender == "female") ||
        (WHR < 0.1 && gender == "male")
      ) {
        color2 = "#fcae05";
        status2 = "Trung bình";
      } else {
        color2 = "cf1322";
        status2 = "Nguy hiểm ";
      }
      this.setState({
        status: status,
        color: color,
        color2: color2,
        status2: status2
      });
      fetch(`http://localhost:3001/users/statistic/update`, {
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
          BMI: BMI,
          WHR: WHR
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
    }
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
          width="40%"
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
              min={0}
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
              min={0}
              max={250}
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
              min={0}
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
              min={0}
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
                    <div>
                      <div
                        style={{
                          display: "inline-block",
                          width: "25%"
                        }}
                      >
                        Chỉ số BMI hiện tại của bạn:
                      </div>
                      <div
                        className="bmi ml-1"
                        style={{
                          color: `${this.state.color}`,
                          fontWeight: "bold"
                        }}
                      >
                        {this.state.BMI}
                      </div>
                      <p
                        id="bmi"
                        style={{
                          color: `${this.state.color}`,
                          fontWeight: "bold"
                        }}
                      >
                        {this.state.status}
                      </p>
                    </div>

                    {this.state.lastBMI ? (
                      <div>
                        <div
                          style={{
                            display: "inline-block",
                            width: "25%"
                          }}
                        >
                          Chỉ số BMI trước:
                        </div>
                        <div
                          className="ml-3 bmi"
                          style={{
                            color: `${computeBMI(this.state.lastBMI)}`,
                            display: "inline-block",
                            fontWeight: "bold"
                          }}
                        >
                          {this.state.lastBMI}
                          <span
                            className="ml-1 mr-1"
                            style={{
                              color: "black"
                            }}
                          >
                            {" "}
                            -
                          </span>
                          {statusBMI(this.state.lastBMI)}
                        </div>
                      </div>
                    ) : null}
                  </div>
                ),
                WHR: (
                  <div>
                    <div>
                      <div
                        style={{
                          display: "inline-block",
                          width: "25%"
                        }}
                      >
                        Chỉ số vòng WHR hiện tại:
                      </div>
                      <div
                        className="bmi ml-1"
                        style={{
                          color: `${this.state.color2}`,
                          fontWeight: "bold"
                        }}
                      >
                        {this.state.WHR}
                      </div>
                      <p
                        id="bmi"
                        style={{
                          color: `${this.state.color2}`,
                          fontWeight: "bold"
                        }}
                      >
                        {this.state.status2}
                      </p>
                    </div>

                    {this.state.lastWHR ? (
                      <div>
                        <div
                          style={{
                            display: "inline-block",
                            width: "25%"
                          }}
                        >
                          Chỉ số WHR trước:
                        </div>
                        <div
                          className="ml-3 bmi"
                          style={{
                            color: `${computeWHR(
                              this.state.lastWHR,
                              this.state.gender
                            )}`,
                            display: "inline-block",
                            fontWeight: "bold"
                          }}
                        >
                          {this.state.lastWHR}
                          <span
                            className="ml-1 mr-1"
                            style={{
                              color: "black"
                            }}
                          >
                            {" "}
                            -
                          </span>
                          {statusWHR(this.state.lastWHR, this.state.gender)}
                        </div>
                      </div>
                    ) : null}
                  </div>
                )
              }[this.state.noTitleKey]
            }
          </Card>
        </div>
      </div>
    );
  }
}

export default StatisticScreen;
