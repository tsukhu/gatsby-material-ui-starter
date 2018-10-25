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
    dataset.map(element => {
      element.sort((a, b) => (b.x < a.x ? 1 : -1))
    })
    const totals = dataset[0].map((data, i) => {
      return dataset.reduce((memo, curr) => {
        return memo + curr[i].y
      }, 0)
    })
    return dataset.map(data => {
      return data.map((datum, i) => {
        const percent = totals[i] > 0 ? (datum.y / totals[i]) * 100 : 0
        return { x: datum.x, y: percent, z: datum.y }
      })
    })
  }
  /* <VictoryLabel text="PRIORITY STATUS" textAnchor="inherit" x={5} y={5} /> */
  render() {
    const dataset = this.transformData(this.props.data)
    const transformTicks = this.props.shortenTicks
      ? this.props.tickFormat.map(datum => datum.substring(0, 3).toUpperCase())
      : this.props.tickFormat
    return (
      <VictoryChart
        height={380}
        width={400}
        domainPadding={{ x: 30, y: 20 }}
        animate={{
          duration: 50
        }}
      >
        <VictoryLegend
          x={60}
          y={1}
          title={this.props.title}
          centerTitle
          orientation="horizontal"
          gutter={20}
          style={{ border: { stroke: 'black' }, labels: { fontSize: 10 } }}
          data={this.props.legendData}
        />
        <VictoryStack
          colorScale={['mediumseagreen', 'orange', '#CCCC00', 'turquoise']}
        >
          {dataset.map((data, i) => {
            return (
              <VictoryBar
                data={data}
                key={i}
                labels={d => (d.y ? d.z.toFixed(0) : null)}
                labelComponent={<VictoryLabel dy={30} />}
              />
            )
          })}
        </VictoryStack>
        <VictoryAxis dependentAxis tickFormat={tick => `${tick}%`} />
        <VictoryAxis
          tickFormat={t => t.substring(0, 3).toUpperCase()}
          fixLabelOverlap={true}
        />
      </VictoryChart>
    )
  }
}

export default StackedBarChart
