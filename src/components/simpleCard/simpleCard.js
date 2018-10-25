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
  card: {
    margin: 5,
    alignContent: 'center',
    borderRadius: 5,
    shadowRadius: 5,
    border: '1px grey',
    boxShadow: '3px 3px 3px rgba(68,68,68,0.6)'
  }
})

/*
 * date,excert,title,url are inputs
 */
const SimpleCard = props => {
  const { classes } = props
  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h5" component="h2">
            {props.title}
          </Typography>
          <Typography color="textSecondary">{props.date}</Typography>
          <Typography component="p">{props.excerpt}</Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            color="primary"
            component={Link}
            to={props.url}
            aria-label={props.title}
          >
            Post Details
          </Button>
        </CardActions>
      </Card>
    </div>
  )
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles, { withTheme: true })(SimpleCard)
