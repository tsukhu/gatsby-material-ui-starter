import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import { challengeHeaderStyles } from '../../../style/components/challenges/challenges'

class ChallengeHeader extends React.Component {
  render() {
    const { classes } = this.props
    const headerText = `ERS-HCL Challenges`
    const paragraphText = `Welcome to ERS GitHub Challenges page, Now you can host your own challenge or pick an Open Source challenge . This is an opportunity to demonstrate proficiency in the Technical problem solving skills as well as  learn new technologies. Select one of the domain specific challenges and create a new git repository for that project. Organize your code within that repo -- when you get to a stopping point, commit and push your code and email a link to your repo to 'opensource@hcl.com'`
    return (
     <Card className={classes.card}>
          <CardMedia
          className={classes.media}
          image="/Dash.png"
          title="HCL ERS"
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

export default withStyles(challengeHeaderStyles)(ChallengeHeader)
