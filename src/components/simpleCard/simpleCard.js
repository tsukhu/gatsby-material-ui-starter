import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Link from 'gatsby-link';

/*
 * date,excert,title,url are inputs
 */
function SimpleCard(props) {

  return (
    <div>
      <Card expanded={false}>
        <CardHeader
          title={props.title}
          subtitle={props.date}
        />
        <CardText>
          <p>{props.excerpt}</p>
        </CardText>
        <CardActions>
          <FlatButton
            containerElement={<Link to={props.url} />}
            label="Learn More"
            secondary={true}
            size="small"
          />
        </CardActions>
      </Card>
    </div>
  );
}


export default SimpleCard;
