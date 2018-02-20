# gatsby-demo-app

[![Build Status](https://travis-ci.org/ERS-HCL/gatsby-demo-app.svg?branch=master)](https://travis-ci.org/ERS-HCL/gatsby-demo-app)

---

This is a Gatsby Demo App that will be used to create a static web app to report the github organization , users and project details and statistics.

## Overall Objective

One of the challenges we face is to get a view of the open source contributions we are making at an Organization level , in terms of whats trending , who are the new contributors , getting an overview about the project , the kanban details of the projects, issues etc.

### Solution

* We use Gatsby as the static site generator and gain from the powerful technologies of React , Redux , GraphQL and all the goodies which come OOTB with GatsbyJS.
* The github GraphQL APIs provide all the needed data
* Using Gatsby and the various plugins we can now pull in the required data from Github and bind it the various views we need. 
* The final output is published to the organization github landing page [ers-hcl.github.io](https://ers-hcl.github.io/)

### Additional Organization Updates

* Gatsby provides great set of plugins for source and transforms which we use to create additional posts about the ERS-HCL open source initiative. These convert the Markdown files to content that can be then rendered as pages.
* Steps for that
    1 Create a new Markdown file under the src/pages/posts/data folder
    2 Make sure to have these with the extension .md
    3 See the existing samples for details about the expected format. 
        * Primarily we expect a 'title' property.
        * Also the first paragraph is used as a short discription of the post.

### Future additions (in Progress)

* Kanban data from the organization projects
* Each repository specific detailed page
* Excel source based separate pages

## Configurataion

Create a .env file
Add the required github configuration details. This will be required for the github project

### Example .env file

```property
GITHUB_TOKEN=<ADD YOUR GITHUB USER OAUTH TOKEN> 
```

* Note we need to have the OAuth github API token in place as a prerequisite.

## Running in development

`gatsby develop`

### Publishing

`npm publish`