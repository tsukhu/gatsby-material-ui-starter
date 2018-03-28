import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Paper from 'material-ui/Paper'
import Card, { CardActions, CardHeader, CardContent } from 'material-ui/Card'
import { listPageStyles } from '../../utils/accessibility'
import Typography from 'material-ui/Typography'
import Avatar from 'material-ui/Avatar'
import Button from 'material-ui/Button'

const styles = theme => ({
  card: {
    width: '100%',
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
  }
})

const AboutCard = props => {
  const { classes } = props
  return (
    <Paper style={listPageStyles.paper} elevation={2}>
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
          <Typography component="p">{props.data.description}</Typography>
        </CardContent>
        <CardActions>
          <Button
            href={props.data.githubProject}
            target="_blank"
            size="small"
            color="primary"
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
