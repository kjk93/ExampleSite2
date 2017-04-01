const standardErrorMessage = {
  "message": "Data not found"
};

module.exports.getAllLeagues = () => {
  return require('../mockData/leagues.json');
};

module.exports.getAllTeams = (leagueId) => {
  if(leagueId === 'epl'){
    return require('../mockData/teams.json');
  }
  else{
    return {
      error: 'league does not exist'
    };
  }
}

module.exports.getTeam = (leagueId, teamId) => {
  if(validTeamId(teamId) && leagueId === 'epl'){
    var league =  require('../mockData/teams.json');
    var teams = league.apiResults[0].league.season.conferences[0].divisions[0].teams;

    var team = {};

    for(t of teams){
      if(t.teamId == teamId){
        team = t;
      }
    }

    var mockResponse = {
      apiResults: [{
        league: {
          season: {
            conferences:[{
              divisions: [{
                teams: [team]
              }]
            }]
          }
        }
      }]
    };

    return mockResponse;
  }
  else{
    return standardErrorMessage;
  }
}

module.exports.getAllPlayers = (leaguePath) => {
  if(leaguePath === 'epl'){
    return require('../mockData/players.json');
  }
  else{
    return standardErrorMessage;
  }
}

module.exports.getTeamPlayers = (leaguePath, teamId) => {
  if(leaguePath === 'epl' && validTeamId(teamId)){
    var mockResponse = {
      apiResults: [{
        league: {
          players: require('../mappings/playerTeamIdMapping.json')[teamId]
        }
      }]
    };

    return mockResponse;
  }
  else{
    return standardErrorMessage;
  }
}

module.exports.getPlayer = (leaguePath, playerId) => {
  if(leaguePath === 'epl' && validPlayerId(playerId)){
    var foundPlayer = {};

    for(player of require('../mockData/players.json').apiResults[0].league.players){
      if(player.playerId == playerId){
        foundPlayer = player;
        break;
      }
      else{
        return standardErrorMessage;
      }
    }

    var mockResponse = {
      apiResults:[{
        league: {
          players: foundPlayer
        }
      }]
    };

    return mockResponse;
  }
  else{
    return standardErrorMessage;
  }
}

var findInArr = (arr, value) => {
  for(val of arr){
    if(val == value){
      return true;
    }
  }

  return false;
}

var validTeamId = (id) => {
  return findInArr(require('../mappings/teamIds.json').ids, id);
}

var validPlayerId = (id) => {
  return findInArr(require('../mappings/playerIds.json').ids, id);
}