import React from 'react'
import Chip from 'material-ui/Chip'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import ReactHtmlParser from 'react-html-parser'
import PageHeader from '../../pageHeader/pageHeader'
import Card, { CardActions, CardHeader, CardContent } from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton'
import ListSubheader from 'material-ui/List/ListSubheader';
import Star from 'material-ui-icons/Star';
import Language from 'material-ui-icons/Language';
import Paper from 'material-ui/Paper'
import Avatar from 'material-ui/Avatar'
import indigo from 'material-ui/colors/indigo';
import green from 'material-ui/colors/green';
import deepOrange from 'material-ui/colors/deepOrange';
import blueGrey from 'material-ui/colors/blueGrey'
import { getCorrectTextColor } from '../../../utils/accessibility'

const styles = theme => ({
  root: {
    display: 'flex',
    theme: 'inherit'
  },
  paper: {
    margin: 10,
    display: 'inline-block',
    transitionEnabled: true,
    backgroundColor: blueGrey[50],
    borderRadius: 5,
    shadowRadius: 5,
    theme: 'inherit'
  },
  card: {
    display: 'flex',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    flex:1,
    flexDirection: 'column',
    flexWrap: 'wrap',
    theme: 'inherit',
    maxWidth: 300,
    minHeight: 304,
    borderRadius: 5,
    shadowRadius: 5,
    border: '1px grey',
    boxShadow: '3px 3px 3px rgba(68,68,68,0.6)'
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
  indigoChip: {
    margin: theme.spacing.unit,
    backgroundColor: indigo[900],
    color: '#E0E0E0',
  },
  orangeAvatar: {
    margin: 0,
    color: '#fff',
    backgroundColor: deepOrange[500],
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
  greenAvatar: {
    margin: 0,
    color: '#fff',
    backgroundColor: green[500],
  },
  bigAvatar: {
    width: 60,
    height: 60
  },
  subheader: {
    color: getCorrectTextColor('#ACB7FE')
  }
})

/**
 *
 * @param {*} props (list : Repo list to be displayed,
 *                   title: Title of the list,
 *                   showLang: whether the language propery needs to be shown)
 */
const GitCards = props => {
  const { classes } = props
  const list = props.list
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}  elevation={1}>
        <PageHeader text={props.title.toUpperCase()} />
        {list.map(repo => (
          <Paper className={classes.paper} elevation={2} key={repo.node.name}>
            <Card className={classes.card}>
              <CardHeader
                title={repo.node.name}
                subheader={repo.node.owner.login}
                avatar={
                  <Avatar alt="Remy Sharp" src={repo.node.owner.avatarUrl} className={classes.avatar} />
                }
              />

              
              <CardContent>
              <Chip 
              label={repo.node.stargazers.totalCount} 
              className={classes.chip}
              avatar={ <Avatar className={classes.orangeAvatar} ><Star/></Avatar> }
              />
                {props.showLang && repo.node.primaryLanguage ? (
                  <Chip
                  label={repo.node.primaryLanguage.name}
                  className={classes.chip}
                    avatar={ <Avatar className={classes.greenAvatar}><Language /></Avatar> }
                  />
                ) : null}
                <Typography component="div">{ReactHtmlParser(repo.node.descriptionHTML)}</Typography>
                
                
              </CardContent>
              <CardActions>
                <Button
                  href={repo.node.url}
                  target="_blank"
                  color="primary" 
                  rel="noopener" 
                  rel="noopener"
                >GITHUB LINK</Button>
              </CardActions>
            </Card>
          </Paper>
        ))}
      </Paper>
    </div>
  )
}


GitCards.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles, { withTheme: true })(GitCards)

