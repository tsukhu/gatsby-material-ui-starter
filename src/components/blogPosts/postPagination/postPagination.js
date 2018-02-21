import React from 'react';
import Link from 'gatsby-link';
import FlatButton from 'material-ui/FlatButton';
import ChevronLeft from 'material-ui/svg-icons/navigation/chevron-left';
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right';
import { Toolbar, ToolbarGroup ,ToolbarTitle } from 'material-ui/Toolbar';

const PostPagination = (props) => {
    const pageInfo= 'Page ' +props.index + '/' + +props.pageCount;
    return (
            <Toolbar>
                <ToolbarTitle text={pageInfo}/>
                <ToolbarGroup>
                <FlatButton 
                    primary key="prev" 
                    label="Prev" 
                    icon={<ChevronLeft />}
                    disabled={props.isFirstPage}
                    containerElement={<Link to={props.previousUrl}/>}/>
                <FlatButton
                    primary key="next" 
                    label="Next" 
                    icon={<ChevronRight />} 
                    labelPosition="before"
                    disabled={props.isLastPage}
                    containerElement={<Link to={props.nextUrl}/>}/>
                </ToolbarGroup>
            </Toolbar>
    );
}

export default PostPagination;