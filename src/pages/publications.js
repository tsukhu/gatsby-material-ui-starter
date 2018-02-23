import React from 'react';

class Publications extends React.Component {
  render() {
    const data1 = this.props.data.allPublicationsXlsxSheet1.edges;
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th colSpan="2">Publications and Events</th>
            </tr>
            <tr>
              <th>Title</th>
              <th>URL</th>
              <th>Author</th>
              <th>Team</th>
              <th>Domain</th>
              <th>Category</th>
              <th>Forum</th>
              <th>PublishDate</th>
              <th>Likes</th>
              <th>Views</th>
              <th>Comments</th>
            </tr>
          </thead>
          <tbody>
            {data1.map((row, i) => (
              <tr key={`${row.node.id} ${i}`}>
                <td>{row.node.Title}</td>
                <td>{row.node.URL}</td>
                <td>{row.node.Author}</td>
                <td>{row.node.Team}</td>
                <td>{row.node.Area}</td>
                <td>{row.node.Category}</td>
                <td>{row.node.Forum}</td>
                <td>{row.node.PublishDate}</td>
                <td>{row.node.Likes}</td>
                <td>{row.node.Views}</td>
                <td>{row.node.Comments}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Publications;

export const PublicationsQuery = graphql`
  query PublicationsQuery {
    allPublicationsXlsxSheet1 {
      edges {
        node {
          SNo
          Title
          URL
          Author
          Team
          Area
          Category
          Forum
          PublishDate
          Likes
          Views
          Comments
        }
      }
    }
  }
`;
