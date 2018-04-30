import React from 'react'
import PropTypes from 'prop-types'
import { VictoryLabel, VictoryTheme, VictoryTooltip } from 'victory'

class PieLabel extends React.Component {
  render() {
    const textContent = this.props.isNumber ? `${this.props.data[this.props.index].x}`: `${this.props.data[this.props.index].y}`
    return (
      <g>
        <VictoryLabel {...this.props}/>
        <VictoryTooltip
          {...this.props}
          x={175}
          y={225}
          text={textContent}
          orientation="top"
          pointerLength={0}
          cornerRadius={50}
          width={100}
          height={100}
        />
      </g>
    )
  }
}

PieLabel.defaultEvents = VictoryTooltip.defaultEvents
PieLabel.propTypes = { text: PropTypes.string }

export default PieLabel