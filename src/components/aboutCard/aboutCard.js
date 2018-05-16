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

import blueGrey from '@material-ui/core/colors/blueGrey'

const styles = theme => ({
  card: {
    alignSelf: 'auto',
    flex:'1 1 auto',
    flexDirection: 'column',
    theme: 'inherit',
    margin: 5,
    alignContent: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    shadowRadius: 5,
    border: '1px grey',
    boxShadow: '3px 3px 3px rgba(68,68,68,0.6)'
  },
  flex: {
    flex: 1
  },
  button: {
    margin: theme.spacing.unit
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  iconSmall: {
    fontSize: 20
  },
  paper: {
    margin: 5,
    padding: 10,
    display: 'flex',
    height: '100%',
    minHeight: '100vh',
    transitionEnabled: true,
    backgroundColor: blueGrey[50],
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    flexWrap: 'wrap',
    rounded: true,
    borderRadius: 5,
    shadowRadius: 5
  }
})

const AboutCard = props => {
  const { classes } = props
  return (
    <Paper className={classes.paper} elevation={2}>
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar
              alt="Remy Sharp"
              src={props.data.avatarUrl}
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

export default withStyles(styles, { withTheme: true })(AboutCard)
