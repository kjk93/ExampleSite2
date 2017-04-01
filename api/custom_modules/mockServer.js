const express = require('express');
const mock = require('./mockServices');

var localMockData = express();

/************** Mock Data Content ********************/
localMockData.get('/stats/soccer/leagues', (req, res) => {
  res.json(mock.getAllLeagues());
});

localMockData.get('/stats/soccer/:league/teams', (req, res) => {
  res.json(mock.getAllTeams(req.params.league));
});

localMockData.get('/stats/soccer/:league/teams/:team', (req, res) => {
  res.json(mock.getTeam(req.params.league, req.params.team));
});

localMockData.get('/stats/soccer/:leaguePath/participants', (req, res) => {
  res.json(mock.getAllPlayers(req.params.leaguePath));
});

localMockData.get('/stats/soccer/:leaguePath/participants/teams/:teamId', (req, res) => {
  res.json(mock.getTeamPlayers(req.params.leaguePath, req.params.teamId));
});

localMockData.get('/stats/soccer/:leaguePath/participants/:playerId', (req, res) => {
  res.json(mock.getPlayer(req.params.leaguePath, req.params.playerId));
});

module.exports.start = () => {
  localMockData.listen(20000, function(){
    console.log('Mock Data ready on port 20000');
  });
};