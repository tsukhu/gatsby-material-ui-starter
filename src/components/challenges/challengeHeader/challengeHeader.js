import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

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
    maxWidth:'100% !important',
    height: 'auto',
    display: 'block'
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
    const paragraphText = `Welcome to ERS GitHub Challenges page, Now you can host your own challenge or pick an Open Source challenge . This is an opportunity to demonstrate proficiency in the Technical problem solving skills as well as  learn new technologies. Select one of the domain specific challenges and create a new git repository for that project. Organize your code within that repo -- when you get to a stopping point, commit and push your code and email a link to your repo to 'opensource@hcl.com'`
    return (
     <Card className={classes.card}>
          <img src="/Dash.png" alt="Contemplative Reptile"  className={classes.media}/>
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
