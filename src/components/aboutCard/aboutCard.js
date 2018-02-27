import React from 'react';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
const chipStyles = {
    chip: {
      margin: 4
    },
    wrapper: {
      display: 'flex',
      flexWrap: 'wrap',
      paddingBottom: '5px',
    }
  };
  
const AboutCard = props => {
    return (
      <Card>
        <CardHeader
          title={props.data.name}
          subtitle={props.data.maintainedBy}
          avatar={props.data.avatarUrl}
        />
        <CardText>
          <p>Powered by: {props.data.poweredBy}</p>
          <p>{props.data.description}></p>
        </CardText>
        <CardActions>
          <FlatButton
            href={props.data.githubProject}
            target="_blank"
            label="GITHUB LINK"
            secondary={true}
          />
        </CardActions>
      </Card>
    );
  };

export default AboutCard;