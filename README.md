# react-mysql-node-spa
A react-redux based single page application powered by mysql and express js. 

To use it create a .ENV file in the root folder with following.
  HOST=0.0.0.0
  PORT=8080
  ADMIN_CODE=<admin code>
  DBHOST=<mysql db host>
  DBUSER=<mysql db user>
  DBKEY=<mysql db password>
  DBINSTANCE=<name of database.>

commands
To install server dependies 
  npm install #inside root folder
To install client_spa dependies
  npm install # inside client_spa dependicies.
To start node server
  npm start #inside root folder
To start react development server
  npm start #inside client_spa folder, try in different terminal
To build production version
  npm build #inside client_spa

Development version SPA is served at htttp://localhost:3000
Production version is served at http://localhost:8080
