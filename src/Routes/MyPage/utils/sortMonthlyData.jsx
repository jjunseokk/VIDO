const sortMonthlyData = (
  data,
  setPlaytimeArr,
  setPlayCountArr,
  player,
  setWholePlayCount = () => {},
  setWholePlaytime = () => {}
) => {
  console.log(data);
  let artIdArr = [];
  let playCountArr = [];
  let playerIdArr = [];
  function getSortOrder(prop) {
    return function (a, b) {
      if (a[prop] > b[prop]) {
        return -1;
      } else if (a[prop] < b[prop]) {
        return 1;
      }
      return 0;
    };
  }
  data.map((value) => {
    let id = value.mediaArt.id;
    let playerId = value.client.id;
    const playAmount = (value) => {
      if (artIdArr.indexOf(id) < 0) {
        artIdArr.push(id);
        playCountArr.push({
          id: value.mediaArt.id,
          title: value.mediaArt.title,
          description: value.mediaArt.description,
          thumbnailPath: value.mediaArt.thumbnailPath,
          createdDatetime: value.mediaArt.createdDatetime,
          playCount: 1,
          playtime: value.mediaArt.playtime,
        });
      } else {
        playCountArr.map((v) => {
          if (id === v.id) {
            ++v.playCount;
            console.log(v.playTime);
            v.playtime += value.mediaArt.playtime;
          }
        });
      }
    };
    const playerAmount = (value) => {
      let playTime = 0;
      if (playerIdArr.indexOf(playerId) < 0) {
        playerIdArr.push(playerId);
        playCountArr.push({
          playerId: playerId,
          companyName: value.client.companyName,
          title: value.mediaArt.title,
          description: value.mediaArt.description,
          thumbnailPath: value.mediaArt.thumbnailPath,
          createdDatetime: value.mediaArt.createdDatetime,
          playCount: 1,
          playtime: value.mediaArt.playtime,
        });
      } else {
        playCountArr.map((v) => {
          if (playerId === v.playerId) {
            ++v.playCount;
            v.playtime += value.mediaArt.playtime;
          }
        });
      }
    };
    if (player === 'player') {
      playerAmount(value);
    } else {
      playAmount(value);
    }
  });
  let monthlyPlayTime = 0;
  playCountArr.map((value) => {
    console.log(value.playCount);
    monthlyPlayTime += value.playtime;
  });

  playCountArr.sort(getSortOrder('playCount'));
  console.log(monthlyPlayTime);
  setPlayCountArr(playCountArr);
  setPlaytimeArr(playCountArr.sort(getSortOrder('playtime')));
  setWholePlayCount(data.length);
  setWholePlaytime(monthlyPlayTime);
  return playCountArr;
};

export default sortMonthlyData;
