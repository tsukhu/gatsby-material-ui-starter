import React from 'react'
import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText
} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import IconButton from 'material-ui/IconButton'
import Subheader from 'material-ui/Subheader'
import ToggleStar from 'material-ui/svg-icons/toggle/star'
import ActionLanguage from 'material-ui/svg-icons/action/language'
import Paper from 'material-ui/Paper'
import Chip from 'material-ui/Chip'
import Avatar from 'material-ui/Avatar'

const styles = {
  root: {
    display: 'flex',
    display: 'inline-block'
  },
  paper: {
    margin: 10,
    display: 'flex',
    display: 'inline-block',
    transitionEnabled: true,
    backgroundColor: 'aliceblue'
  },
  card: {
    display: 'flex',
    flexWrap: 'wrap',
    maxWidth: 300,
    minHeight: 220
  },
  chip: {
      display: 'flex',
      margin: 4,
      flexWrap: 'wrap',
  }
}
/**
 * 
 * @param {*} props (list : Repo list to be displayed, 
 *                   title: Title of the list, 
 *                   showLang: whether the language propery needs to be shown) 
 */
const GitCards = props => {
  const list = props.list 
  return (
    <div style={styles.root}>
      <Paper style={styles.paper} zDepth={1}>
        <Subheader>{props.title}</Subheader>
        {list.map(repo => (
          <Paper style={styles.paper} zDepth={2}>
            <Card style={styles.card}>
              <CardHeader
                title={repo.node.name}
                subtitle={repo.node.owner.login}
                avatar={repo.node.owner.avatarUrl}
              />
              <CardText>
                <Chip style={styles.chip}>
                  <Avatar
                    icon={
                        <ToggleStar color="black" />
                      }
                  />
                  {repo.node.stargazers.totalCount}
                </Chip>
                { props.showLang && repo.node.primaryLanguage ? <Chip style={styles.chip} backgroundColor={repo.node.primaryLanguage.color} >
                  <Avatar
                    icon={
                        <ActionLanguage />
                      }
                  />
                  {repo.node.primaryLanguage.name}
                </Chip>: null}
                <span dangerouslySetInnerHTML={{__html: repo.node.descriptionHTML}} /> 
              </CardText>
              <CardActions>
                <FlatButton
                  href={repo.node.url}
                  target="_blank"
                  label="GITHUB LINK"
                  secondary={true}
                />
              </CardActions>
            </Card>
          </Paper>
        ))}
      </Paper>
    </div>
  )
}

export default GitCards
