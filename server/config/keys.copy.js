// ADD YOUR OWN KEYS AND RENAME THIS FILE TO keys.js
const TWITTER_TOKENS = {
  TWITTER_CONSUMER_KEY: "OS1tMWY3aUo0dE9ISEFNSnpOMVg6MTpjaQ",
  TWITTER_CONSUMER_SECRET: "5tGOGDPfrqXIXes4mxkkox2GUIrJeBSvIqPrwxLXufdYT4DtON",
  TWITTER_ACCESS_TOKEN: "olhz8aBB3BkeekbuLWEUSM4eG",
  TWITTER_TOKEN_SECRET: "IxWBoWz7ZqPdqxLUZZfWBQyT7hY0NIJORMBAT3SGepbQYwTixe"
};

const DB_USER = "aemoe0104";
const DB_PASSWORD = "4A4v7F8AAMA1B2Bw";
const MONGODB = {
  MONGODB_URI: `mongodb://${DB_USER}:${DB_PASSWORD}@ds<SOME_DOMAIN>.mlab.com:<PORT>/<PROJECT_NAME>`
};

const SESSION = {
  COOKIE_KEY: "thisappisawesome"
};

const KEYS = {
  ...TWITTER_TOKENS,
  ...MONGODB,
  ...SESSION
};

module.exports = KEYS;
