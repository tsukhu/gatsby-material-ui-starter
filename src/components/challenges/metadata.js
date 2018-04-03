const uuidv4 = require('uuid/v4')

export const createData = (
  name,
  description,
  contributor,
  domain,
  status,
  priority,
  githubURL
) => {
  return {
    id: uuidv4(),
    name,
    description,
    contributor,
    domain,
    status,
    priority,
    githubURL
  }
}

const getColumnData = () => { return [
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Name',
    type: 'text',
    helperText: 'Challenge Name'
  },
  {
    id: 'description',
    numeric: false,
    disablePadding: false,
    label: 'Description',
    type: 'text',
    helperText: 'Description'
  },
  {
    id: 'contributor',
    numeric: false,
    disablePadding: false,
    label: 'Contributor',
    type: 'text',
    helperText: 'Challenge Name'
  },
  {
    id: 'domain',
    numeric: false,
    disablePadding: false,
    label: 'Domain',
    type: 'text',
    helperText: 'Domain'
  },
  {
    id: 'status',
    numeric: false,
    disablePadding: false,
    label: 'Status',
    type: 'select',
    options: [
      { name: 'None' , value: '' },
      { name: 'Backlog' , value: 'Backlog Item' },
      { name: 'In Progress' , value: 'In Progress' },
      { name: 'Done' , value: 'Done' },
     ],
    helperText: 'Status'
  },
  {
    id: 'priority',
    numeric: false,
    disablePadding: false,
    label: 'Priority',
    type: 'select',
    options: [
      { name: 'None' , value: '' },
      { name: 'High' , value: 'High' },
      { name: 'Medium' , value: 'Medium' },
      { name: 'Low' , value: 'Low' },
     ],
    helperText: 'Priority'
  },
  {
    id: 'githubURL',
    numeric: false,
    disablePadding: false,
    label: 'githubURL',
    type: 'text',
    helperText: 'Github URL'
  }
]}

export default getColumnData