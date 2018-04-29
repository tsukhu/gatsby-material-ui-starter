import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import PageHeader from '../../pageHeader/pageHeader'
import blue from 'material-ui/colors/blue'
import Button from 'material-ui/Button'
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'

import blueGrey from 'material-ui/colors/blueGrey'
import Card, { CardActions, CardHeader, CardContent } from 'material-ui/Card'
import Fade from 'material-ui/transitions/Fade'
import {
  VictoryChart,
  VictoryStack,
  VictoryBar,
  VictoryAxis,
  VictoryLabel,
  VictoryTheme,
  VictoryPie
} from 'victory'
import { inherit } from 'highlight.js'

const myDataset = [
  [
    { x: 'a', y: 1 },
    { x: 'b', y: 2 },
    { x: 'c', y: 3 },
    { x: 'd', y: 2 },
    { x: 'e', y: 1 }
  ],
  [
    { x: 'a', y: 2 },
    { x: 'b', y: 3 },
    { x: 'c', y: 4 },
    { x: 'd', y: 5 },
    { x: 'e', y: 5 }
  ],
  [
    { x: 'a', y: 1 },
    { x: 'b', y: 2 },
    { x: 'c', y: 3 },
    { x: 'd', y: 4 },
    { x: 'e', y: 4 }
  ]
]

const styles = theme => ({
  root: {
    display: 'flex',
    theme: 'inherit',
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignContent: 'center'
  },
  paper: {
    margin: 5,
    padding: 10,
    border: '1px solid silver',
    rounded: true,
    borderRadius: 5,
    shadowRadius: 5,
    WebkitFlexWrap: 'wrap',
    flexWrap: 'wrap',
    minHeight: 300,
    height: 100,
    width: 100,
    flex: '1 1 auto'
  },
  subHeader: {
    padding: theme.spacing.unit,
    flex: 1
  }
})

class Reports extends React.Component {
  state = {}
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
  render() {
    const { classes } = this.props
    const dataset = this.transformData(myDataset)

    return (
      <Fade in={true}>
        <div className={classes.root}>
          <Paper className={classes.paper} elevation={2}>
            <VictoryChart
              height={400}
              width={400}
              domainPadding={{ x: 30, y: 20 }}
              theme={VictoryTheme.material}
            >
              <VictoryStack colorScale={['black', 'blue', 'tomato']}>
                {dataset.map((data, i) => {
                  return <VictoryBar data={data} key={i} />
                })}
              </VictoryStack>
              <VictoryAxis dependentAxis tickFormat={tick => `${tick}%`} />
              <VictoryAxis tickFormat={['a', 'b', 'c', 'd', 'e']} />
            </VictoryChart>
          </Paper>
          <Paper className={classes.paper} elevation={2}>
            <svg viewBox="0 0 400 400">
              <VictoryPie
                theme={VictoryTheme.material}
                standalone={false}
                width={400}
                height={400}
                data={[{ x: 1, y: 120 }, { x: 2, y: 150 }, { x: 3, y: 75 }]}
                innerRadius={68}
                labelRadius={100}
                style={{ labels: { fontSize: 20, fill: 'white' } }}
              />
              <VictoryLabel
                textAnchor="middle"
                style={{ fontSize: 20 }}
                x={200}
                y={200}
                text="Pie!"
              />
            </svg>
          </Paper>
          <Paper className={classes.paper} elevation={2} />
          <Paper className={classes.paper} elevation={2}>
            <VictoryChart
              height={400}
              width={400}
              domainPadding={{ x: 30, y: 20 }}
            >
              <VictoryStack colorScale={['black', 'blue', 'tomato']}>
                {dataset.map((data, i) => {
                  return <VictoryBar data={data} key={i} />
                })}
              </VictoryStack>
              <VictoryAxis dependentAxis tickFormat={tick => `${tick}%`} />
              <VictoryAxis tickFormat={['a', 'b', 'c', 'd', 'e']} />
            </VictoryChart>
          </Paper>
        </div>
      </Fade>
    )
  }
}

Reports.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Reports)
