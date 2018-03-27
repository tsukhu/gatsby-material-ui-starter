import React from 'react';
import Chip from 'material-ui/Chip';
import Card, { CardActions, CardHeader, CardContent } from 'material-ui/Card'
import Typography from 'material-ui/Typography'
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
          subheader={props.author}
          avatar={avatar}
        />
        <CardContent>
          <div style={chipStyles.wrapper}>
          <Chip style={chipStyles.chip}>{props.domain}</Chip>
          <Chip style={chipStyles.chip}>{props.team}</Chip>
          <Chip style={chipStyles.chip}>{props.category}</Chip>
          </div>
          <Typography component="p">{props.excerpt}</Typography>
        </CardContent>
        <CardActions>
          <Button
            href={props.url}
            target="_blank"
          >PUBLICATION LINK</Button>
        </CardActions>
      </Card>
    );
  };

export default PublicationCard;