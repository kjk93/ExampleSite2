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

var findInArr = (arr, value) => {
  for(val of arr){
    if(val === value){
      return true;
    }
  }

  return false;
}