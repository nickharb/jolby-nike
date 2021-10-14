# Getting Started 
1. Clone the repo and checkout to main if main isn't the default branch yet.
2. more on main vs master [here](https://www.zdnet.com/article/github-to-replace-master-with-main-starting-next-month/#:~:text=Starting%20next%20month%2C%20all%20new,them%20with%20more%20inclusive%20terms.) 
3. `npm install`
4. `npm start`

that's it!

## File structures
everything you'll likely edit is in /src
- src/index.js - we connect to the api via graphql here
- src/App.js - routing lives here
- src/index.css - Global styles go here
- src/components/ - holds all our components 
   - src/components/index.js - exports all our components
   - src/components/NameOfComponent/ - each component exists under components/NameOfComponent
   	   - src/components/NameOfComponent/index.js - component code //we will also create our graphql queries here at the component level.
   	   - src/components/NameOfComponent/style.css - component specific styles



This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


