import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Card, { CardActions, CardContent } from 'material-ui/Card'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import Link from 'gatsby-link'

const styles = theme => ({
  card: {
    width: '100%',
    margin: 5,
    alignContent: 'center'
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
