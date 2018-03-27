import React from 'react'
import PropTypes from 'prop-types'
import Card, { CardActions, CardContent } from 'material-ui/Card'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import Link from 'gatsby-link'

const styles = {
  card: {
    width: '100%',
    margin: 5,
    alignContent: 'center'
  }
}

/*
 * date,excert,title,url are inputs
 */
function SimpleCard(props) {
  return (
    <div>
      <Card style={styles.card}>
        <CardContent>
          <Typography variant="headline" component="h2">
            {props.title}
          </Typography>
          <Typography color="textSecondary">{props.date}</Typography>
          <Typography component="p">{props.excerpt}</Typography>
        </CardContent>
        <CardActions>
          <Button
            href={props.url}
            size="small"
          >Learn More</Button>
        </CardActions>
      </Card>
    </div>
  )
}

export default SimpleCard
