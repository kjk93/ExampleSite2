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
  if(findInArr(require('../mappings/teamIds.json').ids, teamId)){
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
    return {
      "message": "Data not found"
    }
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