# P12 Sportsee

## Getting started
1. Clone the repo
2. Install dependencies
    ```
    npm install
    ```
3. Start the server
    Follow this link to start the server: https://github.com/MosMid/P12-front-end-dashboard
4. Start the App
    ```
    npm start
    ```

## How to use
You can use the mock data or fetch data from the server.

To use the mock data, in the `index.js` set:
~~~
const [mock, mockUser] = [true, n];
~~~

With `n` being the index of the user in your JSON file.

To use the server data set:
~~~
const [mock, mockUser] = [false, n];
~~~
To change the person set:
user = n 
whit n the user id number
