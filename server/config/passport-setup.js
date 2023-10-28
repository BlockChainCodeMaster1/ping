const passport = require("passport");
const TwitterStrategy = require("passport-twitter");
const keys = require("./keys");
// const User = require("../models/user-model");
const db = require("../database/db");
const USERS = db.default.USERS;

// serialize the user.id to save in the cookie session
// so the browser will remember the user when login
passport.serializeUser((user, done) => {
  // console.log("serializeUser",user,user.twitterId)
  done(null, user.twitterId);
});

// deserialize the cookieUserId to user in the database
passport.deserializeUser(async(id, done) => {
    const user = await USERS.findOne({
      where: {
        twitterId: id
      },
    });
    if(user){
       done(null, user);
    }else{
      done(new Error("Failed to deserialize an user"));
    }
});

passport.use(
  new TwitterStrategy(
    {
      consumerKey: keys.TWITTER_CONSUMER_KEY,
      consumerSecret: keys.TWITTER_CONSUMER_SECRET,
      callbackURL: "/auth/twitter/redirect"
    },
    async (token, tokenSecret, profile, done) => {
      // find current user in UserModel
      const user = await USERS.findOne({
        where: {
          twitterId: profile._json.id_str
        },
      });
      // create new user if the database doesn't have this user
      if (!user) {
        const newUser = await USERS.create({
          name: profile._json.name,
          screenName: profile._json.screen_name,
          twitterId: profile._json.id_str,
          profileImageUrl: profile._json.profile_image_url,
          token: token,
          tokenSecret: tokenSecret
        });
        if (newUser) {
          done(null, newUser);
        }
      }
      done(null, user);
    }
  )
);
