import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Card, { CardActions, CardContent } from 'material-ui/Card'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import Link from 'gatsby-link'

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
const SimpleCard= (props) => {
  const { classes } = props
  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="headline" component="h2">
            {props.title}
          </Typography>
          <Typography color="textSecondary">{props.date}</Typography>
          <Typography component="p">{props.excerpt}</Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            color="primary"
            component={Link} to={props.url}
            aria-label={props.title}
          >Learn More</Button>
        </CardActions>
      </Card>
    </div>
  )
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles, { withTheme: true })(SimpleCard)
