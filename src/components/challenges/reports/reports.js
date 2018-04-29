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
    alignContent: 'center',
  },
  paper: {
    margin: 5,
    padding: 10,
    listStyle: 'none',
    border: '1px solid silver',
    MsBoxOrient: 'horizontal',
    display: '-webkit-box',
    display: '-moz-box',
    display: '-ms-flexbox',
    display: '-moz-flex',
    display: '-webkit-flex',
    display: 'flex',
    WebkitFlexWrap: 'wrap',
    flexWrap: 'wrap',
    flex: '1 1 auto',
    rounded: true,
    borderRadius: 5,
    shadowRadius: 5,
    justifyContent: 'center'
  },
  card: {
    margin: theme.spacing.unit,
    display: 'flex',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'wrap',
    theme: 'inherit',
    maxWidth: 300,
    minHeight: 304,
    borderRadius: 5,
    shadowRadius: 5,
    border: '1px grey',
    boxShadow: '3px 3px 3px rgba(68,68,68,0.6)'
  },
  button: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  actionsContainer: {
    marginBottom: theme.spacing.unit * 2
  },
  resetContainer: {
    padding: theme.spacing.unit * 3
  },
  graphWapper: {
    justifyContent: 'space-between',
    flexWrap: 'wrap'
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
            <Card className={classes.card}>
              <CardHeader subheader="Dash 1" />

              <CardContent>
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
              </CardContent>
            </Card>
            <Card className={classes.card}>
              <CardHeader subheader="Dash 1" />

              <CardContent>
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
              </CardContent>
            </Card>
            <Card className={classes.card}>
              <CardHeader subheader="Dash 1" />

              <CardContent>
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
              </CardContent>
            </Card>           
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
