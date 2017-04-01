const http = require('http');
const fs = require('fs');

module.exports.run = () => {
  mapTeams(mapPlayers());
}

const httpOptions = {
  hostName: 'localhost',
  port: 20000
}

var mapTeams = (cb) => {
  http.get(httpPath('/stats/soccer/epl/teams'), (statRes) => {
    var body = "";

    statRes.on('data', (chuck) =>{
      body = body + chuck;
    });
    statRes.on('end', () => {
      var teams = JSON.parse(body).apiResults[0].league.season.conferences[0].divisions[0].teams;
      var ids = { ids: [] };
      var abvMapping = {};
      var nameMapping = {};

      for(team of teams){
        ids.ids.push(team.teamId);
        abvMapping[team.abbreviation] = team.teamId;
        nameMapping[team.displayName] = team.teamId;
      }

      writeMappingFile('teamIds.json', ids);
      writeMappingFile('teamAbvMapping.json', abvMapping);
      writeMappingFile('teamNameMapping.json', nameMapping);

      if(cb){
        cb();
      }
    });
  }).end();
};

var mapPlayers = (cb) =>{
  http.get(httpPath('/stats/soccer/epl/participants'), (statRes) => {
    var body = '';

    statRes.on('data', (chunk) => {
      body = body + chunk;
    });

    statRes.on('end', () => {
      var players = JSON.parse(body).apiResults[0].league.players;

      var id = {ids: []};
      var abvMapping = {};
      var teamMapping = {};
      var teamIdMapping = {};

      for(player of players){
        id.ids.push(player.playerId);

        if(!abvMapping[player.team.abbreviation]){
          abvMapping[player.team.abbreviation] = [];
        }
        abvMapping[player.team.abbreviation].push(player);

        if(!teamMapping[player.team.displayName]){
          teamMapping[player.team.displayName] = [];
        }
        teamMapping[player.team.displayName].push(player);

        if(!teamIdMapping[player.team.teamId]){
          teamIdMapping[player.team.teamId] = [];
        }
        teamIdMapping[player.team.teamId].push(player);
      }

      writeMappingFile('playerIds.json', id);
      writeMappingFile('playerAbvMapping.json', abvMapping);
      writeMappingFile('playerTeamMapping.json', teamMapping);
      writeMappingFile('playerTeamIdMapping.json', teamIdMapping);

      if(cb){
        cb();
      }
    });
  }).end();
};

var httpPath = (subpath) => {
  var newOptions = httpOptions;

  newOptions.path = subpath;

  return newOptions;
};

var writeMappingFile = (fileName, object) => {
  fs.writeFile('mappings/' + fileName, JSON.stringify(object), () => {
    console.log('written ' + fileName);
  });
}