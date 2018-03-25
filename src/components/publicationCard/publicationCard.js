import React from 'react';
import Chip from 'material-ui/Chip';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import Button from 'material-ui/Button';
const defaultAvatar='https://avatars2.githubusercontent.com/u/32506169?v=4';
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
  
const PublicationCard = props => {
    const avatar = (props.avatar && props.avatar !== 'NA')?props.avatar:defaultAvatar;
    return (
      <Card>
        <CardHeader
          title={props.title}
          subtitle={props.author}
          avatar={avatar}
        />
        <CardText>
          <div style={chipStyles.wrapper}>
          <Chip style={chipStyles.chip}>{props.domain}</Chip>
          <Chip style={chipStyles.chip}>{props.team}</Chip>
          <Chip style={chipStyles.chip}>{props.category}</Chip>
          </div>
          <p>{props.excerpt}</p>
        </CardText>
        <CardActions>
          <Button
            href={props.url}
            target="_blank"
            label="PUBLICATION LINK"
            secondary={true}
          />
        </CardActions>
      </Card>
    );
  };

export default PublicationCard;