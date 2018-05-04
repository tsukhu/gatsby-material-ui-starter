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
  }
  textLabelProvider = d => d.x
  numberLabelProvider = d => d.y

  render() {
    const { classes } = this.props
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
              data={transformPriortyWiseDomainStackReport(this.props.data)}
              tickFormat={[
                'Web UI',
                'Analytics',
                'Microservices',
                'Cloud',
                'Mobility',
                'DevOps',
                'Security',
                'Other'
              ].sort(
                (a, b) => (b < a ? 1 : -1)
              )}
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
              data={transformStatusWisePriorityStackReport(this.props.data)}
              tickFormat={['High', 'Medium', 'Low'].sort(
                (a, b) => (b < a ? 1 : -1)
              )}
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
