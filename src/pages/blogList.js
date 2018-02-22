import React from 'react';

class BlogList extends React.Component {
  render() {
    const data1 = this.props.data.allMyBook1XlsxSheet1.edges;
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th colSpan="2">Sheet1</th>
            </tr>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Remarks</th>
            </tr>
          </thead>
          <tbody>
            {data1.map((row, i) => (
              <tr key={`${row.node.id} ${i}`}>
                <td>{row.node.Name}</td>
                <td>{row.node.Description}</td>
                <td>{row.node.Remarks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default BlogList;

export const BlogListQuery = graphql`
  query BlogListQuery {
    allMyBook1XlsxSheet1 {
      totalCount
      edges {
        node {
          Name
          Description
          Remarks
        }
      }
    }
  }
`;
