import React from 'react';
import Chip from 'material-ui/Chip';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

const chipStyles = {
    chip: {
      margin: 4
    },
    wrapper: {
      display: 'flex',
      flexWrap: 'wrap'
    }
  };
  
const ProjectCard = props => {
    const chips = props.topics
      ? props.topics.map(topic => {
          return <Chip style={chipStyles.chip} key={topic}>{topic}</Chip>;
        })
      : null;
    return (
      <Card>
        <CardHeader
          title={props.name}
          subtitle={(props.license)?props.license:''}
        />
        <CardText>
          <div style={chipStyles.wrapper}>{chips}</div>
          <p dangerouslySetInnerHTML={{ __html: props.excerpt }}
           />
        </CardText>
        <CardActions>
          <FlatButton
            href={props.url}
            target="_blank"
            label="GitHub Link"
            secondary={true}
          />
        </CardActions>
      </Card>
    );
  };

export default ProjectCard;