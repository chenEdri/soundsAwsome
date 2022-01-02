# MY-MUSIC

GitHub: @chenEdri

React Hooks , Styled Components, and the Spotify API.


## Description

- This is a Frontend web application created with [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) using [React](https://reactjs.org/), a JavaScript library for building user interfaces, [SCSS](https://sass-lang.com/) and interacts with the [Youtube API](https://developers.google.com/youtube/v3), a third-party API.
- The goal of this app is to demo Music Application that provides ther user to search for songs by their artist or names, choose between them and activate a player which can play each song from the search list.
- The YouTube API uses [OAuth with Google Credentials](https://developers.google.com/youtube/registering_an_application) for user authentification. OAuth is a secure, industry-standard protocol that allows users to approve one application interacting with another without giving away their password. Authorization is passed between apps over HTTPS with access tokens.
- API calls are made in the React app to the YouTube API and displays data from the responses in templates. [React Router](https://reactrouter.com/) helps create the front end architecture.

- The main application code is located in [Main.jsx](Main.jsx).
- JavaScript code has been formatted according to the [Prettier style guide](https://prettier.io/docs/en/why-prettier.html) specification. Comments and spacing keep the code as organized and readable as possible.
- Code Notification is created also with [JSDOC]((https://jsdoc.app/))
- The application pages are styled using [Scss](https://sass-lang.com/) library to compile style code to css files.

## Available Scripts

In the project directory, you can run:

### `npm i`

Installs the app dependencies and libraries in order to run it on your local-host.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
