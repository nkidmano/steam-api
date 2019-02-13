const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(cors());

async function fetchGames() {
  try {
    const { data } = await axios.get(
      'https://api.steampowered.com/ISteamApps/GetAppList/v2/'
    );

    const { apps } = data.applist;

    for (let i = 0; i < 4; i++) {
      const { data } = await axios.get(
        `https://store.steampowered.com/api/appdetails?appids=${
          apps[i]['appid']
        }`
      );

      if (data[Object.keys(data)[0]]['success']) {
        console.log(data);
      }
    }
  } catch (e) {
    console.error(e);
  }
}

fetchGames();

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started on port ${port}`));
