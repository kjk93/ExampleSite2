const express = require('express');
const mock = require('./mockServices');

var localMockData = express();

/************** Mock Data Content ********************/
localMockData.get('/stats/soccer/leagues', function(req, res){
  res.json(mock.getAllLeagues());
});

localMockData.get('/stats/soccer/:league/teams', function(req, res){
  res.json(mock.getAllTeams(req.params.league));
});

localMockData.get('/stats/soccer/:league/teams/:team', function(req, res){
  res.json(mock.getTeam(req.params.league, req.params.team));
});

module.exports.start = () => {
  localMockData.listen(20000, function(){
    console.log('Mock Data ready on port 20000');
  });
};