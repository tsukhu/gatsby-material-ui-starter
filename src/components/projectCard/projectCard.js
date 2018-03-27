import React from 'react';
import Chip from 'material-ui/Chip';
import Card, { CardActions, CardHeader, CardContent } from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button';

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
          subheader={(props.license)?props.license:''}
        />
        <CardContent>
          <div style={chipStyles.wrapper}>{chips}</div>
          <Typography component="p">
          <p dangerouslySetInnerHTML={{ __html: props.excerpt }}
           />
           </Typography>
        </CardContent>
        <CardActions>
          <Button
            href={props.url}
            target="_blank"
          >GitHub Link</Button>
        </CardActions>
      </Card>
    );
  };

export default ProjectCard;