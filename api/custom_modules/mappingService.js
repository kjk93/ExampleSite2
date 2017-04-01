const http = require('http');
const fs = require('fs');

module.exports.run = () => {
  mapTeams();
}

const httpOptions = {
  hostName: 'localhost',
  port: 20000
}

var mapTeams = () => {
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

      fs.writeFile('mappings/teamIds.json', JSON.stringify(ids), () => {
        console.log('written teamIds.json');
      });

      fs.writeFile('mappings/teamAbvMapping.json', JSON.stringify(abvMapping), () => {
        console.log('written teamAbvMapping.json');
      });

      fs.writeFile('mappings/teamNameMapping.json', JSON.stringify(nameMapping), () => {
        console.log('written teamNameMapping.json');
      });
    });
  }).end();
};

var httpPath = (subpath) => {
  var newOptions = httpOptions;

  newOptions.path = subpath;

  return newOptions;
};