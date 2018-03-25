import React from 'react';
import Link from 'gatsby-link';
import Button from 'material-ui/Button';
import ChevronLeft from 'material-ui-icons/ChevronLeft';
import ChevronRight from 'material-ui-icons/ChevronRight';
import { Toolbar, ToolbarGroup ,ToolbarTitle } from 'material-ui/Toolbar';

const styles = {
    card: {
      width: '100%',
      margin: 5,
      alignContent: 'center',
      backgroundColor: 'white',
      borderRadius: 5,
      shadowRadius: 5,
      border: '1px grey',
      boxShadow: '3px 3px 3px rgba(68,68,68,0.6)'
    }
  }

const PostPagination = (props) => {
    const pageInfo= 'Page ' +props.index + '/' + +props.pageCount;
    const firstElement = (!props.isFirstPage)?<Link to={props.previousUrl}/>:<Link to='/'/>;
    const nextElement = (!props.isLastPage)?<Link to={props.nextUrl}/>:<Link to={+props.pageCount}/>;
    return (
            <Toolbar style={styles.card}>
                <ToolbarTitle text={pageInfo}/>
                <ToolbarGroup>
                <Button 
                    primary key="prev" 
                    label="Prev" 
                    icon={<ChevronLeft />}
                    disabled={props.isFirstPage}
                    containerElement={firstElement}/>
                <Button
                    primary key="next" 
                    label="Next" 
                    icon={<ChevronRight />} 
                    labelPosition="before"
                    disabled={props.isLastPage}
                    containerElement={nextElement}/>
                </ToolbarGroup>
            </Toolbar>
    );
}

export default PostPagination;