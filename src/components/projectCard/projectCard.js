import React from 'react'
import PropTypes from 'prop-types'
import Chip from 'material-ui/Chip'
import { withStyles } from 'material-ui/styles'
import ReactHtmlParser from 'react-html-parser'
import Card, { CardActions, CardHeader, CardContent } from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import Avatar from 'material-ui/Avatar'

const styles = theme => ({
  card: {
    display: 'flex',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    flexWrap: 'wrap'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    marginBottom: 16,
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  chip: {
    margin: theme.spacing.unit
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    paddingBottom: '5px'
  },
  avatar: {
    margin: 10
  },
  bigAvatar: {
    width: 60,
    height: 60
  }
})

const ProjectCard = props => {
  const { classes } = props
  const chips = props.topics
    ? props.topics.map(topic => {
        return <Chip label={topic} className={classes.chip} key={topic} />
      })
    : null

  return (
    <Card>
      <CardHeader
        title={props.name}
        subheader={props.license ? props.license : ''}
      />
      <CardContent>
      {chips}
        {ReactHtmlParser(props.excerpt)}
      </CardContent>
      <CardActions>
        <Button href={props.url} target="_blank" color="primary">
          GitHub Link
        </Button>
      </CardActions>
    </Card>
  )
}

ProjectCard.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles, { withTheme: true })(ProjectCard)
