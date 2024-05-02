## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

# Setting Up API URL in Environment File

This guide will walk you through the process of adding the API URL to the environment file (`*.env`) in your React project.

## Prerequisites

Before you begin, make sure you have the following:

- Node.js installed on your machine
- A basic understanding of React development
- A text editor or IDE of your choice

## Steps

### 1. Create a `.env` File

In the root directory of your React project, create a file named `.env`.

### 2. Define the API URL Environment Variable

In the `.env` file, define an environment variable to store your API URL. Prefix the variable name with `REACT_APP_` to ensure Create React App loads it correctly.

Example:

```plaintext
REACT_APP_API_URL=http://universities.hipolabs.com/search?country=United%20Arab%20Emirates
```
