const axios = require('axios');

const router = require('express').Router();

router.get('/',  (req, res) => {
  console.log( j1 )
  const requestOptions = {
    headers: { accept: 'application/json' },
  };
  console.log( j2 )
  axios
    .get( 'https://icanhazdadjoke.com/search', requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
      console.log( j3 )
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
});

module.exports = router;
