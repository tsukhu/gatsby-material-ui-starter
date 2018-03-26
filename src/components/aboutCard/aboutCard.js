import React from 'react'
import Card, { CardActions, CardHeader, CartContext } from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
const styles = {
  chip: {
    margin: 4
  },
  card: {
    height: '100%',
    minHeight: '100vh'
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    paddingBottom: '5px'
  }
}

const AboutCard = props => {
  return (
    <Card style={styles.card}>
      <CardHeader
        title={props.data.name}
        subheader={props.data.maintainedBy}
        avatar={props.data.avatarUrl}
      />
      <CardContent>
        <Typography component="p">
          Powered by: {props.data.poweredBy}
        </Typography>
        <Typography component="p">{props.data.description}</Typography>
      </CardContent>
      <CardActions>
        <Button
          href={props.data.githubProject}
          target="_blank"
          label="GITHUB LINK"
          secondary={true}
        />
      </CardActions>
    </Card>
  )
}

export default AboutCard
