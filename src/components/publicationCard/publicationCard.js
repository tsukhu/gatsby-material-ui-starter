import React from 'react'
import Chip from 'material-ui/Chip'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Card, { CardHeader, CardActions, CardContent } from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import Avatar from 'material-ui/Avatar'
const defaultAvatar = 'https://avatars2.githubusercontent.com/u/32506169?v=4'

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

const PublicationCard = props => {
  const { classes } = props
  const avatar =
    props.avatar && props.avatar !== 'NA' ? props.avatar : defaultAvatar
  return (
    <div>
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar alt="Remy Sharp" src={avatar} className={classes.avatar} />
          }
          title={props.title}
          subheader={props.author}
        />
        <CardContent>

              <Chip label={props.domain} className={classes.chip} />
              <Chip label={props.team} className={classes.chip} />
              <Chip label={props.team} className={classes.chip} />

          <Typography component="p">{props.excerpt}</Typography>
        </CardContent>
        <CardActions>
          <Button href={props.url} target="_blank" size="small" color="primary">
            PUBLICATION LINK
          </Button>
        </CardActions>
      </Card>
    </div>
  )
}

PublicationCard.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles, { withTheme: true })(PublicationCard)
