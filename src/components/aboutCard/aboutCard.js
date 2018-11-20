import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Avatar from '@material-ui/core/Avatar'
import aboutCardStyle from '../../style/components/aboutCard/aboutCardStyle';

const AboutCard = props => {
  const { classes } = props
  return (
    <Paper className={classes.paper} elevation={2}>
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar
              alt="Remy Sharp"
              src={'/images/user.png'}
              className={classes.avatar}
            />
          }
          title={props.data.name}
          subheader={props.data.maintainedBy}
        />
        <CardContent>
          <Typography component="p">
            Powered by: {props.data.poweredBy}
          </Typography>
          <Typography component="p">
           Contributors: {props.data.contributors}
          </Typography>
          <Typography component="p">{props.data.description}</Typography>
        </CardContent>
        <CardActions>
          <Button
            href={props.data.githubProject}
            target="_blank"
            size="small"
            color="primary" 
            rel="noopener"
          >
            GITHUB LINK
          </Button>
        </CardActions>
      </Card>
    </Paper>
  )
}

AboutCard.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(aboutCardStyle, { withTheme: true })(AboutCard)
