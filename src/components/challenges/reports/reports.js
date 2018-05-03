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
  VictoryLegend,
  VictoryTheme,
  VictoryPie
} from 'victory'
import PieChart from './pie-chart'
import BarChart from './bar-chart'
import StackedBarChart from './stacked-barchart'
import {
  transformToStateReport,
  transformStatusWisePriorityStackReport,
  transformPriortyWiseDomainStackReport
} from '../../../utils/data-transformer'

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
  constructor(props, context) {
    super(props, context)

    this.state = {
      stackData1: [],
      pieData1: [],
      pieData2: [],
      stackData2: []
    }
  }
  textLabelProvider = d => d.x
  numberLabelProvider = d => d.y

  componentDidMount() {
    const stackData1 = transformPriortyWiseDomainStackReport(this.props.data)
    const pieData1 = transformToStateReport(this.props.data, 'status')
    const pieData2 = transformToStateReport(this.props.data, 'priority')

    this.setState({
      stackData1: stackData1,
      pieData1: pieData1,
      pieData2: pieData2,
      stackData2: []
    })
  }
  render() {
    const { classes } = this.props
    const { stackData1, stackData2, pieData1, pieData2 } = this.state

    return (
      <Fade in={true}>
        <div className={classes.root}>
          <Paper className={classes.paper} elevation={2}>
            {stackData1.length > 0 && (
              <StackedBarChart
                legendData={[
                  { name: 'HIGH', symbol: { fill: 'green' } },
                  { name: 'MEDIUM', symbol: { fill: 'orange' } },
                  { name: 'LOW', symbol: { fill: 'gold' } }
                ]}
                data={stackData1}
                tickFormat={[
                  'Web UI',
                  'Analytics',
                  'Microservices',
                  'Cloud',
                  'Mobility',
                  'DevOps',
                  'Security',
                  'Other'
                ]}
                shortenTicks={true}
                title="DOMAIN WISE STATUS"
              />
            )}
          </Paper>
          <Paper className={classes.paper} elevation={2}>
            {pieData1.length > 0 && (
              <PieChart
                title={'Challenges by status'.toUpperCase()}
                data={pieData1}
                labelProvider={this.numberLabelProvider}
                isNumber={true}
              />
            )}
          </Paper>
          <Paper className={classes.paper} elevation={2}>
            {pieData2.length > 0 && (
              <PieChart
                title={'Challenges by priority'.toUpperCase()}
                data={pieData2}
                labelProvider={this.textLabelProvider}
                isNumber={false}
              />
            )}
          </Paper>
          {false && (
            <Paper className={classes.paper} elevation={2}>
              <StackedBarChart
                legendData={[
                  { name: 'DONE', symbol: { fill: 'green' } },
                  { name: 'WIP', symbol: { fill: 'orange' } },
                  { name: 'BACKLOG', symbol: { fill: 'gold' } },
                  { name: 'PENDING', symbol: { fill: 'red' } }
                ]}
                dataNew={transformStatusWisePriorityStackReport(
                  this.props.data
                )}
                data={[
                  [
                    { x: 'High', y: 1 },
                    { x: 'Medium', y: 7 },
                    { x: 'Low', y: 5 }
                  ],
                  [
                    { x: 'High', y: 2 },
                    { x: 'Medium', y: 10 },
                    { x: 'Low', y: 3 }
                  ],
                  [
                    { x: 'High', y: 5 },
                    { x: 'Medium', y: 15 },
                    { x: 'Low', y: 25 }
                  ],
                  [
                    { x: 'High', y: 0 },
                    { x: 'Medium', y: 2 },
                    { x: 'Low', y: 1 }
                  ],
                  [
                    { x: 'High', y: 0 },
                    { x: 'Medium', y: 0 },
                    { x: 'Low', y: 0 }
                  ]
                ]}
                tickFormat={['High', 'Medium', 'Low']}
                title="PRIORITY WISE STATUS"
              />
            </Paper>
          )}
        </div>
      </Fade>
    )
  }
}

Reports.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Reports)
