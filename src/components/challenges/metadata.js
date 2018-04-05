const uuidv4 = require('uuid/v4')

export const createData = (
  contributor
) => {
  return {
    id: uuidv4(),
    name: 'A New Challenge',
    description: '',
    contributor,
    domain: 'Other',
    status: 'Approval Pending',
    priority: 'Medium',
    githubURL: null
  }
}

const getColumnData = isAdmin => {
  return [
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
      type: 'email',
      disabled: isAdmin? false:true,
      helperText: 'contributor email'
    },
    {
      id: 'domain',
      numeric: false,
      disablePadding: false,
      label: 'Domain',
      type: 'select',
      options: [
        { name: 'None', value: 'None' },
        { name: 'WebUI', value: 'Web UI' },
        { name: 'Microservices', value: 'Microservices' },
        { name: 'Analytics', value: 'Analytics' },
        { name: 'DevOps', value: 'DevOps' },
        { name: 'Security', value: 'Security' },
        { name: 'Cloud', value: 'Cloud' },
        { name: 'Mobility', value: 'Mobility' },
        { name: 'Other', value: 'Other' }
      ],
      helperText: 'Technology Domain'
    },
    {
      id: 'status',
      numeric: false,
      disablePadding: false,
      label: 'Status',
      type: 'select',
      options: isAdmin
        ? [
            { name: 'None', value: 'None' },
            { name: 'ApprovalPending', value: 'Approval Pending' },
            { name: 'Backlog', value: 'Backlog Item' },
            { name: 'In Progress', value: 'In Progress' },
            { name: 'Done', value: 'Done' }
          ]
        : [{ name: 'ApprovalPending', value: 'Approval Pending' }],
      disabled: isAdmin? false:true,
      helperText: 'Status'
    },
    {
      id: 'priority',
      numeric: false,
      disablePadding: false,
      label: 'Priority',
      type: 'select',
      options: [
        { name: 'None', value: 'None' },
        { name: 'High', value: 'High' },
        { name: 'Medium', value: 'Medium' },
        { name: 'Low', value: 'Low' }
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
  ]
}

export default getColumnData
