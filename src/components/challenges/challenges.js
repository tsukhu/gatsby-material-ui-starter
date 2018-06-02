import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import PageHeader from '../pageHeader/pageHeader'
import ChallengeTable from './challengeTable/challengeTable'
import { challengesPageStyle } from '../../style/components/challenges/challenges'

function Challenges(props) {
  const { classes } = props
  return (
    <div>
      <Paper className={classes.paper} elevation={4}>
       <ChallengeTable />
      </Paper>
    </div>
  )
}

Challenges.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(challengesPageStyle)(Challenges)
