import React from 'react'
import PropTypes from 'prop-types'
import {
  VictoryChart,
  VictoryStack,
  VictoryBar,
  VictoryAxis,
  VictoryLabel,
  VictoryLegend,
  VictoryTheme
} from 'victory'
import PieLabel from './pie-label'

class StackedBarChart extends React.Component {
  // This is an example of a function you might use to transform your data to make 100% data
  transformData = dataset => {
    const totals = dataset[0].map((data, i) => {
      return dataset.reduce((memo, curr) => {
        return memo + curr[i].y
      }, 0)
    })
    return dataset.map(data => {
      return data.map((datum, i) => {
        return { x: datum.x, y: datum.y / totals[i] * 100 }
      })
    })
  }
  /* <VictoryLabel text="PRIORITY STATUS" textAnchor="inherit" x={5} y={5} /> */
  render() {
    const dataset = this.transformData(this.props.data)
    const transformTicks = this.props.shortenTicks?this.props.tickFormat.map(
      (datum) => datum.substring(0, 3).toUpperCase()
    ):this.props.tickFormat;
    return (
      <VictoryChart height={380} width={400} domainPadding={{ x: 30, y: 20 }}
      animate={{
        duration: 500
      }}
      >
        <VictoryLegend
          x={60}
          y={1}
          title={this.props.title}
          centerTitle
          orientation="horizontal"
          gutter={20}
          style={{ border: { stroke: 'black' },labels: { fontSize: 10 }}}
          data={this.props.legendData}
        />
        <VictoryStack colorScale={['green', 'orange', 'gold', 'red']}>
          {dataset.map((data, i) => {
            return <VictoryBar data={data} key={i} />
          })}
        </VictoryStack>
        <VictoryAxis dependentAxis tickFormat={tick => `${tick}%`} />
        <VictoryAxis tickFormat={transformTicks} fixLabelOverlap={true}/>
      </VictoryChart>
    )
  }
}

export default StackedBarChart
