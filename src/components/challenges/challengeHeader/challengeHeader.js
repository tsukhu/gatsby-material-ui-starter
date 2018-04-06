import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'

const styles = theme => ({
  paper: {
    display: 'flex',
    flexWrap: 'wrap',
    backgroundColor: 'white',
    margin: 5,
    padding: 10,
    transitionEnabled: true,
    rounded: true,
    borderRadius: 5,
    shadowRadius: 5
  },
  root: {
    width: '90%'
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
  subHeader: {
    padding: theme.spacing.unit
  }
})



class ChallengeHeader extends React.Component {
 
  
  render() {
    const { classes } = this.props
    const headerText = `ERS-HCL Challenges`
    const paragraphText = `Welcome to the technology challenges initiative. 
                          Given below is the list of existing project challenges at various stages of implementation.`
    return (
      <Paper className={classes.paper} elevation={4}>
      <Typography variant="headline" component="h3">
        {headerText}
        </Typography>
        <Typography component="p">
          {paragraphText}
        </Typography>
      </Paper>
    )
  }
}

ChallengeHeader.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ChallengeHeader)
