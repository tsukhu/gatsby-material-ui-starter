# gatsby-material-ui-starter


This is a Gatsby starter project with material-ui integration

- Base implementation of pulling data from REST APIs via the source plugin (gatsby-config.js)
- Also integrating with REST APIs via axios and creating source nodes in the gatsby-node.js. For more complex APIs , you may need to have more control over the data , transform it and then create source nodes
- Also added offline support, pulling data from markdown files, seo tags, guessjs , google analytics integration
- DotEnv for externalized configuration and secrets


- JSON Server - API during development 
- Externalized Configuration - Dotenv
- Linting / Prettier integration
- StoryBook integration
- Production related plugins for PWA, Helmet , Analytics 

## Running in development

`gatsby develop`

### Publishing

`npm publish`