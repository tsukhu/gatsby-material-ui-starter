import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { Link } from '@reach/router'

const styles = theme => ({
  card2: {
    display: 'flex'
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 1 auto',
    maxWidth: '300px'
  }
})

/*
 * date,excert,title,url are inputs
 */
const SimpleCard = props => {
  const { classes } = props
  return (
    <Card className={classes.card2}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {props.title}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {props.date}
          </Typography>
          <Typography component="p">
            {props.excerpt}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary" component={Link}
            to={props.url}
            aria-label={props.title}>
            DETAILS
      </Button>
        </CardActions>
      </div>
    </Card>
  )
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles, { withTheme: true })(SimpleCard)
