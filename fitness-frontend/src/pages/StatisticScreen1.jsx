import React from "react";
import moment from "moment";
import { Table, Input, Button, Popconfirm, Form, message } from "antd";

import { ResponsiveLine } from "@nivo/line";
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const data = [
    {
      "id": "japan",
      "color": "hsl(86, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 186
        },
        {
          "x": "helicopter",
          "y": 281
        },
        {
          "x": "boat",
          "y": 51
        },
        {
          "x": "train",
          "y": 209
        },
        {
          "x": "subway",
          "y": 108
        },
        {
          "x": "bus",
          "y": 218
        },
        {
          "x": "car",
          "y": 162
        },
        {
          "x": "moto",
          "y": 104
        },
        {
          "x": "bicycle",
          "y": 182
        },
        {
          "x": "horse",
          "y": 114
        },
        {
          "x": "skateboard",
          "y": 130
        },
        {
          "x": "others",
          "y": 120
        }
      ]
    },
    {
      "id": "france",
      "color": "hsl(14, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 240
        },
        {
          "x": "helicopter",
          "y": 185
        },
        {
          "x": "boat",
          "y": 270
        },
        {
          "x": "train",
          "y": 51
        },
        {
          "x": "subway",
          "y": 106
        },
        {
          "x": "bus",
          "y": 60
        },
        {
          "x": "car",
          "y": 137
        },
        {
          "x": "moto",
          "y": 67
        },
        {
          "x": "bicycle",
          "y": 166
        },
        {
          "x": "horse",
          "y": 295
        },
        {
          "x": "skateboard",
          "y": 285
        },
        {
          "x": "others",
          "y": 47
        }
      ]
    },
    {
      "id": "us",
      "color": "hsl(88, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 163
        },
        {
          "x": "helicopter",
          "y": 113
        },
        {
          "x": "boat",
          "y": 108
        },
        {
          "x": "train",
          "y": 16
        },
        {
          "x": "subway",
          "y": 196
        },
        {
          "x": "bus",
          "y": 22
        },
        {
          "x": "car",
          "y": 55
        },
        {
          "x": "moto",
          "y": 275
        },
        {
          "x": "bicycle",
          "y": 224
        },
        {
          "x": "horse",
          "y": 127
        },
        {
          "x": "skateboard",
          "y": 40
        },
        {
          "x": "others",
          "y": 206
        }
      ]
    },
    {
      "id": "germany",
      "color": "hsl(319, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 82
        },
        {
          "x": "helicopter",
          "y": 174
        },
        {
          "x": "boat",
          "y": 255
        },
        {
          "x": "train",
          "y": 152
        },
        {
          "x": "subway",
          "y": 151
        },
        {
          "x": "bus",
          "y": 243
        },
        {
          "x": "car",
          "y": 55
        },
        {
          "x": "moto",
          "y": 80
        },
        {
          "x": "bicycle",
          "y": 115
        },
        {
          "x": "horse",
          "y": 114
        },
        {
          "x": "skateboard",
          "y": 229
        },
        {
          "x": "others",
          "y": 123
        }
      ]
    },
    {
      "id": "norway",
      "color": "hsl(343, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 54
        },
        {
          "x": "helicopter",
          "y": 108
        },
        {
          "x": "boat",
          "y": 7
        },
        {
          "x": "train",
          "y": 284
        },
        {
          "x": "subway",
          "y": 151
        },
        {
          "x": "bus",
          "y": 283
        },
        {
          "x": "car",
          "y": 270
        },
        {
          "x": "moto",
          "y": 83
        },
        {
          "x": "bicycle",
          "y": 123
        },
        {
          "x": "horse",
          "y": 6
        },
        {
          "x": "skateboard",
          "y": 41
        },
        {
          "x": "others",
          "y": 244
        }
      ]
    }
  ]

const MyResponsiveLine = ({ data /* see data tab */ }) => (
    <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{ type: 'linear', stacked: true, min: 'auto', max: 'auto' }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'transportation',
            legendOffset: 36,
            legendPosition: 'middle'
        }}
        axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'count',
            legendOffset: -40,
            legendPosition: 'middle'
        }}
        enableGridX={false}
        enableGridY={false}
        colors={{ scheme: 'nivo' }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabel="y"
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
    />
)
class StatisticScreen extends React.Component {
  render() {
    return (
      <div style={{ height: "100vh", width: "500px" }}>
        <ResponsiveLine data={data}></ResponsiveLine>
      </div>
    );
  }
}
export default StatisticScreen;
