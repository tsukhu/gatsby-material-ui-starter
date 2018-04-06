import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
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
  card: {
    margin: 5,
    transitionEnabled: true,
    flex: '1 1 auto',
    rounded: true,
    borderRadius: 5,
    shadowRadius: 5
  },
  media: {
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    backgroundColor: 'white'
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
     <Card className={classes.card}>
          <CardMedia
            className={classes.media}
            image="/Dash.png"
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="headline" component="h2">
              {headerText}
            </Typography>
            <Typography component="p">
              {paragraphText}
            </Typography>
          </CardContent>
        </Card>

    )
  }
}

ChallengeHeader.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ChallengeHeader)
