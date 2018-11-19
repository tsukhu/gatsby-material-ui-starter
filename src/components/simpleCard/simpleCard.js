import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { Link } from '@reach/router'
import Chip from '@material-ui/core/Chip'
import Zoom from '@material-ui/core/Zoom'

const styles = theme => ({
  card2: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 1 auto',
    maxWidth: '300px'
  },
  chip: {
    margin: theme.spacing.unit,
    padding: 5,
    fontSize: '10px'
  },
  cover: {
    width: '100%',
    height: 150,
    alignItem: 'center'
  }
})

/*
 * date,excert,title,url are inputs
 */
const SimpleCard = props => {
  const { classes, tags, image, excerpt } = props
  const tagArray = tags ? tags.split(',') : [];
  const imageUrl = image ? image : '/images/placeholder.jpg';
  const excerptStr = excerpt ? excerpt.slice(0,150)+ "...": 'Click on details for more information'
  const tagLabels = tagArray.map(tag => (
    <Chip
      label={tag.toUpperCase()}
      color={'primary'}
      variant={'outlined'}
      className={classes.chip}
      key={tag}
    />
  ));
  return (
    <Zoom in={true} style={{ transitionDelay: 500 }}>
    <Card className={classes.card2} key={props.key}>
      <CardContent className={classes.content}>
        <Typography component="h5" variant="h5">
          {props.title}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          {props.author}
        </Typography>
        {tagLabels}
        <Typography component="p">
          {excerptStr}
        </Typography>
        <CardMedia
          className={classes.cover}
          image={imageUrl}
          title={props.title}
        />
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" component={Link}
          to={props.url}
          aria-label={props.title}>
          DETAILS
        </Button>
      </CardActions>

    </Card>
    </Zoom>
  )
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles, { withTheme: true })(SimpleCard)
