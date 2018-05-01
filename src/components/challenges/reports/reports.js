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
import {transformToStateReport , transformStackReport} from '../../../utils/data-transformer'

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
  textLabelProvider = d => d.x
  numberLabelProvider = d => d.y

  render() {
    const { classes } = this.props
    console.log(transformStackReport(this.props.data,'priority','status'))
    return (
      <Fade in={true}>
        <div className={classes.root}>
          <Paper className={classes.paper} elevation={2}>
            <StackedBarChart
              legendData={[
                { name: 'HIGH', symbol: { fill: 'green' } },
                { name: 'MEDIUM', symbol: { fill: 'orange' } },
                { name: 'LOW', symbol: { fill: 'gold' } }
              ]}
              data={[
                [
                  { x: 'WebUI', y: 1 },
                  { x: 'Microservices', y: 2 },
                  { x: 'Analytics', y: 2 },
                  { x: 'DevOps', y: 2 },
                  { x: 'Security', y: 1 },
                  { x: 'Cloud', y: 2 },
                  { x: 'Mobility', y: 2 },
                  { x: 'Other', y: 0 },
                ],
                [
                  { x: 'WebUI', y: 5 },
                  { x: 'Microservices', y: 5 },
                  { x: 'Analytics', y: 0 },
                  { x: 'DevOps', y: 15 },
                  { x: 'Security', y: 1 },
                  { x: 'Cloud', y: 2 },
                  { x: 'Mobility', y: 12 },
                  { x: 'Other', y: 0 },
                ],
                [
                  { x: 'WebUI', y: 2 },
                  { x: 'Microservices', y: 12 },
                  { x: 'Analytics', y: 0 },
                  { x: 'DevOps', y: 3 },
                  { x: 'Security', y: 1 },
                  { x: 'Cloud', y: 1 },
                  { x: 'Mobility', y: 2 },
                  { x: 'Other', y: 1 },
                ]
              ]}
              tickFormat={['WebUI', 'Microservices', 'Analytics','DevOps','Security','Cloud','Mobility','Other']}
              shortenTicks={true}
              title="DOMAIN WISE STATUS"
            />
          </Paper>
          <Paper className={classes.paper} elevation={2}>
            <PieChart
              title={'Challenges by status'.toUpperCase()}
              data={transformToStateReport(this.props.data, 'status')}
              labelProvider={this.numberLabelProvider}
              isNumber={true}
            />
          </Paper>
          <Paper className={classes.paper} elevation={2}>
            <PieChart
              title={'Challenges by priority'.toUpperCase()}
              data={transformToStateReport(this.props.data, 'priority')}
              labelProvider={this.textLabelProvider}
              isNumber={false}
            />
          </Paper>
          <Paper className={classes.paper} elevation={2}>
            <StackedBarChart
              legendData={[
                { name: 'DONE', symbol: { fill: 'green' } },
                { name: 'WIP', symbol: { fill: 'orange' } },
                { name: 'BACKLOG', symbol: { fill: 'gold' } },
                { name: 'PENDING', symbol: { fill: 'red' } }
              ]}
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
                [{ x: 'High', y: 0 }, { x: 'Medium', y: 0 }, { x: 'Low', y: 0 }]
              ]}
              tickFormat={['High', 'Medium', 'Low']}
              title="PRIORITY WISE STATUS"
            />
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
