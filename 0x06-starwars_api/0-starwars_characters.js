#!/usr/bin/node
const request = require('request');

if (process.argv.length > 2) {
  request(`https://swapi-api.alx-tools.com/api/films/${process.argv[2]}`, (err, res, body) => {
    if (err) console.log(err);
    const json = JSON.parse(body);
    const characters = json.characters.map(
      (item) => new Promise((resolve, reject) => {
        request(item, (err, res, body) => {
          if (err) reject(err);
          resolve(JSON.parse(body).name);
        });
      }));

    Promise.all(characters)
      .then((names) => console.log(names.join('\n')))
      .catch((err) => console.log(err));
  });
}
