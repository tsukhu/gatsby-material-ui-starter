import React from 'react'
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton'
import ListSubheader from 'material-ui/List/ListSubheader';
import Star from 'material-ui-icons/Star';
import Language from 'material-ui-icons/Language';
import Paper from 'material-ui/Paper'
import Chip from 'material-ui/Chip'
import Avatar from 'material-ui/Avatar'
import indigo from 'material-ui/colors/purple';
import orange from 'material-ui/colors/red';
import { getCorrectTextColor } from '../../../utils/accessibility'


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
    backgroundColor: '#F2F6F7',
    borderRadius: 5,
    shadowRadius: 5
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
    flexWrap: 'wrap'
  },
  subheader: {
    color: getCorrectTextColor('#ACB7FE')
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
        <ListSubheader style={styles.subheader}>{props.title}</ListSubheader>
        {list.map(repo => (
          <Paper style={styles.paper} zDepth={2} key={repo.node.name}>
            <Card style={styles.card}>
              <CardHeader
                title={repo.node.name}
                subtitle={repo.node.owner.login}
                avatar={repo.node.owner.avatarUrl}
              />
              <CardText>
                <Chip style={styles.chip}>
                  <Avatar 
                  icon={<Star/>} 
                  color={orange[200]}
                  backgroundColor={indigo[900]}/>
                  {repo.node.stargazers.totalCount}
                </Chip>
                {props.showLang && repo.node.primaryLanguage ? (
                  <Chip
                    style={styles.chip}
                    backgroundColor={repo.node.primaryLanguage.color}
                    labelColor={getCorrectTextColor(repo.node.primaryLanguage.color)}
                  >
                    <Avatar icon={<Language />} 
                    color={indigo[900]}/>
                    {repo.node.primaryLanguage.name}
                  </Chip>
                ) : null}
                <span
                  dangerouslySetInnerHTML={{
                    __html: repo.node.descriptionHTML
                  }}
                />
              </CardText>
              <CardActions>
                <Button
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
