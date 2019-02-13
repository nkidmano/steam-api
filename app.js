const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(cors());

async function fetchGames() {
  const { data: ids } = await axios.get(
    'https://api.steampowered.com/ISteamApps/GetAppList/v2/'
  );

  const { apps } = ids.applist;

  for (let i = 0; i < 10; i++) {
    const { data: games } = await axios.get(
      `https://store.steampowered.com/api/appdetails?appids=${apps[i]['appid']}`
    );

    const result = data[Object.keys(data)[0]];
    if (result['success']) {
      console.log(games);
    }
  }
}

fetchGames();

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started on port ${port}`));
