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
    priority: 'None',
    githubURL: '',
    updatedBy: '',
    updatedOn: '',
    impact: ''
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
      multiline: true,
      visible: true,
      helperText: 'Challenge Name'
    },
    {
      id: 'description',
      numeric: false,
      disablePadding: false,
      label: 'Description',
      type: 'text',
      multiline: true,
      visible: true,
      helperText: 'Description (Hover for full text)'
    },
    {
      id: 'impact',
      numeric: false,
      disablePadding: false,
      label: 'Impact',
      type: 'text',
      multiline: true,
      visible: true,
      helperText: 'Business Impact'
    },
    {
      id: 'contributor',
      numeric: false,
      disablePadding: false,
      label: 'Contributor',
      type: 'email',
      disabled: isAdmin? false:true,
      visible: true,
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
      visible: true,
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
      visible: true,
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
      disabled: isAdmin? false:true,
      visible: true,
      helperText: 'Priority'
    },
    {
      id: 'githubURL',
      numeric: false,
      disablePadding: false,
      label: 'Github URLs',
      type: 'text',
      multiline: true,
      visible: true,
      helperText: 'Comma separated Github URLs'
    },
    {
      id: 'updatedBy',
      numeric: false,
      disablePadding: false,
      label: 'updatedBy',
      type: 'text',
      multiline: false,
      visible: false,
      helperText: 'Updated By'
    },
    {
      id: 'updatedOn',
      numeric: false,
      disablePadding: false,
      label: 'updatedOn',
      type: 'text',
      multiline: false,
      visible: false,
      helperText: 'Updated On'
    }
  ]
}

export default getColumnData
