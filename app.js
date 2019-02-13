const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(cors());
app.use(express.json());

async function fetchGames() {
  console.log('wtf');
  const { data: ids } = await axios.get(
    'https://api.steampowered.com/ISteamApps/GetAppList/v2/'
  );

  const { apps } = ids.applist;

  for (let i = 0; i < 5; i++) {
    const { data } = await axios.get(
      `https://store.steampowered.com/api/appdetails?appids=${apps[i]['appid']}`
    );

    const obj = data[Object.keys(data)[0]];
    if (obj['success']) {
      console.log(data);
    }
  }
}

app.get('/', async (req, res) => {
  res.send('wtf');
  await fetchGames();
});

// axios
//   .get('https://api.steampowered.com/ISteamApps/GetAppList/v2/')
//   .then(({ data }) => {
//     const { apps } = data.applist;
//     for (let i = 0; i < 10; i++) {
//       axios
//         .get(
//           `https://store.steampowered.com/api/appdetails?appids=${
//             apps[i]['appid']
//           }`
//         )
//         .then(({ data }) => {
//           const obj = data[Object.keys(data)[0]];
//           if (obj['success']) {
//             console.log(data);
//           }
//         });
//     }
//   });

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started on port ${port}`));
