import React from 'react'
import PropTypes from 'prop-types'
import {
  VictoryChart,
  VictoryBar,
  VictoryAxis,
  VictoryLabel
} from 'victory'


class BarChart extends React.Component {
  constructor() {
    super();
    this.state = {
      clicked: false,
      style: {
        data: { fill: "tomato" }
      }
    };
  }

  render() {
    return (
      <VictoryChart
        height={380}
        width={400}
        domainPadding={{ x: 30, y: 20 }}
        animate={{
          duration: 50
        }}
      >
        <VictoryLabel text={this.props.title} textAnchor="inherit" x={5} y={5} />
        <VictoryBar
          style={this.state.style}
          data={this.props.data}
          labels={d => (d.y ? d.y.toFixed(0) : null)}
        />
        <VictoryAxis dependentAxis tickFormat={tick => `${tick}`} />
        <VictoryAxis
          tickFormat={t => t.substring(0, 3).toUpperCase()}
          fixLabelOverlap={true}
        />
      </VictoryChart>
    )
  }
}

export default BarChart
