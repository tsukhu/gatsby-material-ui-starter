import React from 'react'
import PropTypes from 'prop-types'
import {
  VictoryLabel,
  VictoryTheme,
  VictoryTooltip,
  VictoryPie,
  VictoryChart,
  VictoryContainer
} from 'victory'
import PieLabel from './pie-label'

class PieChart extends React.Component {
  render() {
    return (
      <VictoryContainer title={this.props.title}
      height={380}
      width={400}
      > 
      <VictoryLabel text={this.props.title} textAnchor="inherit" x={5} y={5}/>
        <VictoryPie
        theme={VictoryTheme.material} standalone={false}
          labels={this.props.labelProvider}
          data={this.props.data}
          labelComponent={<PieLabel isNumber={this.props.isNumber} />}
          animate={{
            duration: 500
          }}
        />
      </VictoryContainer >
    )
  }
}

export default PieChart
