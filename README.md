# Getting Started 
1. Clone the repo and checkout to main if main isn't the default branch yet.
2. more on main vs master [here](https://www.zdnet.com/article/github-to-replace-master-with-main-starting-next-month/#:~:text=Starting%20next%20month%2C%20all%20new,them%20with%20more%20inclusive%20terms.) 
3. `npm install`
4. `npm start`

that's it!

## File structures
- index.js - we connect to the api via graphql here
- App.js - routing lives here
- index.css - Global styles go here
- components/ - holds all our components 
   - index.js - exports all our components
   - NameOfComponent/ - each component exists under components/NameOfComponent
   	- index.js - component code //we will also create our graphql queries here at the component level.
   	- style.css - component specific styles



This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


