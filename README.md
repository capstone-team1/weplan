# WePlan

WePlan helps people decide between potential events/activities. With WePlan a group of users can quickly list events, vote on them, and make a decision with the application’s voting feature. It is designed as a single page application in order to create a fluid and responsive experience using semantic-ui and React components on the front end.
Users can join existing groups or create new groups in which several people can vote on potential events. The event with the most votes wins. This app makes it easier to reach consensus on events, especially when large amounts of people are involved.
Some unique features of our app are Google Places, group invitation links, automatic emails for event decisions and Google account OAUTH.

## Setup

To run our app on your local machine, clone the repository, download postgresQL and create two databases named 'WePlan' and 'WePlan-Test'. Then NPM install.

## Built With

Technologies used to build this application include:

React - Front-end framework used to build components
Redux - Front-end framework used to manage state
Google Places API - A service that returns information about places using HTTP requests. Places are defined within this API as establishments, geographic locations, or prominent points of interest.
React-Vis - Uber’s D3 Library for charting
Semantic-UI - Front-end library for styling
NodeJS - Server side environment used to set up router
ExpressJS - Server used to communicate with client side and PostgresQL database
Sequelize - Library used to create models and query database for relevant information
PostgresQL - Relational database used to store all data that is not realtime data

## Authors

Michael Habinsky
Shaimoom Islam
Matt Spatafore
Alec Staszewski
