'use strict';

const express = require('express');
const http = require('http');

const mockServer = require('./custom_modules/mockServer');

const mappingService = require('./custom_modules/mappingService');

const config = require('./config.local.json');

var middleware = express();

middleware.listen(10000, function(){
  console.log('listening on port 10000');
});

//Start worker servers
config.useLocal ? mockServer.start() : console.log('Not running locally');

//Run services
mappingService.run();