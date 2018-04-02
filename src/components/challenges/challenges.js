import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'
import PageHeader from '../pageHeader/pageHeader'
import blueGrey from 'material-ui/colors/blueGrey'
import EnhancedTable from '../atoms/dataTable/dataTable'

const styles = theme => ({
  paper: {
    margin: 5,
    padding: 10,
    display: 'block',
    height: '100%',
    minHeight: '100vh',
    transitionEnabled: true,
    backgroundColor: blueGrey[50],
    alignContent: 'center',
    alignItems: 'center',
    rounded: true,
    borderRadius: 5,
    shadowRadius: 5
  }
})

function Challenges(props) {
  const { classes } = props
  return (
    <div>
      <Paper className={classes.paper} elevation={4}>
        <PageHeader text="Challenges" />
        <EnhancedTable />
      </Paper>
    </div>
  )
}

Challenges.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Challenges)
