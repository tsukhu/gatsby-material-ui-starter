/*
 { x: 'Done', y: 2 },
 { x: 'In Progress', y: 10 },
 { x: 'Backlog', y: 12 },
 { x: 'Approval Pending', y: 2 }


 [
  {
    "contributor": "tksukhu@gmail.com",
    "description": "In the Angular community Angular benchpress is a standard way of building performance tests into your build process and adding performance testing right at the start of the development process. \nTasks \nCreate an app or use an existing angular app\nIntegrate with angular/benchpress\nShow how the test can be performance and the test results can be collected and viewed",
    "domain": "Web UI",
    "githubURL": "",
    "id": "e07d4175-c170-41a6-a71d-ef9d9495575e",
    "name": "@angular/benchpress based benchmarking sample",
    "priority": "High",
    "status": "Backlog Item",
    "vote": [
      {
        "email": "tksukhu@gmail.com",
        "id": 11,
        "type": "upVote"
      },
      {
        "email": "tksukhu@gmail.com",
        "id": "5af22bb5-f5e5-432b-87a1-a64167f2511d",
        "type": "upVote"
      },
      {
        "email": "tksukhu@gmail.com",
        "id": "bf47ff7d-3238-4fec-ae09-63426287517a",
        "type": "upVote"
      },
      {
        "email": "tksukhu@gmail.com",
        "id": 9,
        "type": "upVote"
      },
      {
        "email": "tksukhu@gmail.com",
        "id": "56c4c0f2-1c42-4bcc-a542-08c053f82405",
        "type": "downVote"
      },
      {
        "email": "tksukhu@gmail.com",
        "id": "56c4c0f2-1c42-4bcc-a542-08c053f82405",
        "type": "upVote"
      },
      {
        "email": "tksukhu@gmail.com",
        "id": "56c4c0f2-1c42-4bcc-a542-08c053f82405",
        "type": "upVote"
      },
      {
        "email": "tksukhu@gmail.com",
        "id": 11,
        "type": "downVote"
      },
      {
        "email": "tksukhu@gmail.com",
        "id": 11,
        "type": "downVote"
      },
      {
        "email": "tksukhu@gmail.com",
        "id": 11,
        "type": "upVote"
      },
      {
        "email": "tksukhu@gmail.com",
        "id": 11,
        "type": "upVote"
      },
      {
        "email": "tksukhu@gmail.com",
        "id": 5,
        "type": "upVote"
      },
      {
        "email": "tksukhu@gmail.com",
        "id": 4,
        "type": "upVote"
      },
      {
        "email": "tksukhu@gmail.com",
        "id": "424449d5-fb70-4168-a13b-2d883f9c5e5f",
        "type": "upVote"
      },
      {
        "email": "tksukhu@gmail.com",
        "id": "b35b8beb-7afa-411c-a3b5-5a4d9dd69334",
        "type": "upVote"
      },
      {
        "email": "tksukhu@gmail.com",
        "id": "223784e3-44e6-4482-ac17-9582dbfee47a",
        "type": "upVote"
      },
      {
        "email": "tksukhu@gmail.com",
        "id": "6404ed5f-5e23-47e4-9c34-a4d49650b9e8",
        "type": "upVote"
      },
      {
        "email": "tksukhu@gmail.com",
        "id": "6404ed5f-5e23-47e4-9c34-a4d49650b9e8",
        "type": "downVote"
      },
      {
        "email": "tksukhu@gmail.com",
        "id": "6404ed5f-5e23-47e4-9c34-a4d49650b9e8",
        "type": "downVote"
      },
      {
        "email": "tksukhu@gmail.com",
        "id": "6404ed5f-5e23-47e4-9c34-a4d49650b9e8",
        "type": "upVote"
      },
      {
        "email": "tksukhu@gmail.com",
        "id": "1511a3a1-1cf8-4f48-be32-523d0e973b90",
        "type": "upVote"
      },
      {
        "email": "tksukhu@gmail.com",
        "id": 2,
        "type": "upVote"
      },
      {
        "email": "tksukhu@gmail.com",
        "id": "e5700b7c-ff2d-4c2e-a3c5-13bbcb92304f",
        "type": "upVote"
      },
      {
        "email": "tksukhu@gmail.com",
        "id": "e07d4175-c170-41a6-a71d-ef9d9495575e",
        "type": "upVote"
      },
      {
        "email": "tksukhu@gmail.com",
        "id": "cb1160a2-a39a-4a47-b436-cd43ca333b10",
        "type": "upVote"
      },
      {
        "email": "tksukhu@gmail.com",
        "id": "f72b405c-ccdc-4f8f-97b0-5183b25db7f7",
        "type": "upVote"
      },
      {
        "email": "tksukhu@gmail.com",
        "id": "95894137-44a1-4a75-a9bb-d6a8a6643251",
        "type": "upVote"
      }
    ],
    "votes": 1
  },
 
]
*/

const transformToStateReport = (data,groupBy) => {
  const transformedData = _.chain(data)
    .groupBy(groupBy)
    .map((objs, key) => ({
      x: isNaN(key) ? key : +key,
      y: _.reduce(objs, (count, v) => count + 1, 0)
    }))
    .value()

  return transformedData
}

export default transformToStateReport