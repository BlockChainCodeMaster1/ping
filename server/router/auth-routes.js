const router = require("express").Router();
const passport = require("passport");
const db = require("../database/db");
const TWITTER_CONSUMER_HOME_PAGE_URL =
  process.env.NODE_ENV === "development"
    ? "https://twitter.com/NovaUBI"
    : "https://twitter.com/NovaUBI";
const { TwitterApi } = require("twitter-api-v2");
const STATE = db.default.STATE;
const keys = require("../config/keys");

// when login is successful, retrieve user info
router.get("/login/success", (req, res) => {
  if (req.user) {
    res.json({
      success: true,
      message: "user has successfully authenticated",
      user: req.user,
      cookies: req.cookies,
    });
  }
});

// when login failed, send failed msg
router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "user failed to authenticate.",
  });
});

// When logout, redirect to client
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(TWITTER_CONSUMER_HOME_PAGE_URL);
});

// auth with twitter
router.get("/twitter", passport.authenticate("twitter"));

// redirect to home page after successfully login via twitter
router.get(
  "/twitter/redirect",
  passport.authenticate("twitter", {
    successRedirect: TWITTER_CONSUMER_HOME_PAGE_URL,
    failureRedirect: "/auth/login/failed",
  })
);

router.get("/tweet", async (req, res) => {
  if (!req.user) {
    res.status(401).json({
      success: false,
      message: "user failed to authenticate.",
    });
  }

  const client = new TwitterApi({
    appKey: keys.TWITTER_CONSUMER_KEY,
    appSecret: keys.TWITTER_CONSUMER_SECRET,
    accessToken: req.user.token,
    accessSecret: req.user.tokenSecret,
  });

  const { data: createdTweet } = await client.v2.tweet(
    "twitter-api-v2 is awesome!",
    {
      poll: { duration_minutes: 120, options: ["Absolutely", "For sure!"] },
    }
  );
  console.log("Tweet", createdTweet.id, ":", createdTweet.text);

  res.status(200).json({
    success: true,
    data: {
      tweetId: createdTweet.id,
    },
    message: "success.",
  });
});

router.post("/replay", async (req, res) => {
  let { tweetId, content } = req.body;

  if (!tweetId || !content) {
    res.status(200).json({
      success: false,
      message: "Incomplete parameter",
    });
    return;
  }

  if (!req.user) {
    res.status(401).json({
      success: false,
      message: content,
    });
  }
  const client = new TwitterApi({
    appKey: keys.TWITTER_CONSUMER_KEY,
    appSecret: keys.TWITTER_CONSUMER_SECRET,
    accessToken: req.user.token,
    accessSecret: req.user.tokenSecret,
  });

  await client.v2.reply(content, tweetId);

  const me = await client.currentUser();

  const hasData = await STATE.findOne({
    where: {
      userId: me.id_str,
      tweetId: tweetId,
    },
  });

  if (!hasData) {
    await STATE.create({
      userId: me.id_str,
      tweetId: tweetId,
      replay: "1",
    });
  } else {
    await STATE.update(
      {
        replay: "1",
      },
      {
        where: {
          userId: me.id_str,
          tweetId: tweetId,
        },
      }
    );
  }

  res.status(200).json({
    success: true,
    message: "success.",
  });
});

router.post("/like", async (req, res) => {
  let { tweetId } = req.body;

  if (!tweetId) {
    res.status(200).json({
      success: false,
      message: "Incomplete parameter",
    });
    return;
  }

  if (!req.user) {
    res.status(401).json({
      success: false,
      message: "user failed to authenticate.",
    });
  }
  const client = new TwitterApi({
    appKey: keys.TWITTER_CONSUMER_KEY,
    appSecret: keys.TWITTER_CONSUMER_SECRET,
    accessToken: req.user.token,
    accessSecret: req.user.tokenSecret,
  });

  console.log(req.user);

  const me = await client.currentUser();
  await client.v2.like(me.id_str, tweetId);

  const hasData = await STATE.findOne({
    where: {
      userId: me.id_str,
      tweetId: tweetId,
    },
  });

  if (!hasData) {
    await STATE.create({
      userId: me.id_str,
      tweetId: tweetId,
      like: "1",
    });
  } else {
    await STATE.update(
      {
        like: "1",
      },
      {
        where: {
          userId: me.id_str,
          tweetId: tweetId,
        },
      }
    );
  }

  res.status(200).json({
    success: true,
    data: {},
    message: "success.",
  });
});

router.post("/retweet", async (req, res) => {
  let { tweetId } = req.body;
  if (!tweetId) {
    res.status(200).json({
      success: false,
      message: "Incomplete parameter",
    });
    return;
  }

  if (!req.user) {
    res.status(401).json({
      success: false,
      message: "user failed to authenticate.",
    });
  }
  const client = new TwitterApi({
    appKey: keys.TWITTER_CONSUMER_KEY,
    appSecret: keys.TWITTER_CONSUMER_SECRET,
    accessToken: req.user.token,
    accessSecret: req.user.tokenSecret,
  });

  const me = await client.currentUser();
  await client.v2.retweet(me.id_str, tweetId);

  const hasData = await STATE.findOne({
    where: {
      userId: me.id_str,
      tweetId: tweetId,
    },
  });

  if (!hasData) {
    await STATE.create({
      userId: me.id_str,
      tweetId: tweetId,
      retweet: "1",
    });
  } else {
    await STATE.update(
      {
        retweet: "1",
      },
      {
        where: {
          userId: me.id_str,
          tweetId: tweetId,
        },
      }
    );
  }

  res.status(200).json({
    success: true,
    data: {},
    message: "success.",
  });
});

router.get("/getReplayState/:tweetId", async (req, res) => {
  const { tweetId } = req.params;

  if (!req.user) {
    res.status(401).json({
      success: false,
      message: "user failed to authenticate.",
    });
  }

  const client = new TwitterApi({
    appKey: keys.TWITTER_CONSUMER_KEY,
    appSecret: keys.TWITTER_CONSUMER_SECRET,
    accessToken: req.user.token,
    accessSecret: req.user.tokenSecret,
  });

  const me = await client.currentUser();

  const user = await STATE.findOne({
    where: {
      userId: me.id_str,
      tweetId: tweetId,
      replay: "1",
    },
  });

  if (user) {
    res.status(200).json({
      success: true,
      message: "success.",
    });
  } else {
    res.status(200).json({
      success: false,
      message: "success.",
    });
  }
});

router.get("/getLikeState/:tweetId", async (req, res) => {
  const { tweetId } = req.params;

  if (!req.user) {
    res.status(401).json({
      success: false,
      message: "user failed to authenticate.",
    });
  }

  const client = new TwitterApi({
    appKey: keys.TWITTER_CONSUMER_KEY,
    appSecret: keys.TWITTER_CONSUMER_SECRET,
    accessToken: req.user.token,
    accessSecret: req.user.tokenSecret,
  });

  const me = await client.currentUser();

  const user = await STATE.findOne({
    where: {
      userId: me.id_str,
      tweetId: tweetId,
      like: "1",
    },
  });

  if (user) {
    res.status(200).json({
      success: true,
      message: "success.",
    });
  } else {
    res.status(200).json({
      success: false,
      message: "success.",
    });
  }
});

router.get("/getRetweetState/:tweetId", async (req, res) => {
  const { tweetId } = req.params;

  if (!req.user) {
    res.status(401).json({
      success: false,
      message: "user failed to authenticate.",
    });
  }

  const client = new TwitterApi({
    appKey: keys.TWITTER_CONSUMER_KEY,
    appSecret: keys.TWITTER_CONSUMER_SECRET,
    accessToken: req.user.token,
    accessSecret: req.user.tokenSecret,
  });

  const me = await client.currentUser();

  const user = await STATE.findOne({
    where: {
      userId: me.id_str,
      tweetId: tweetId,
      retweet: "1",
    },
  });

  if (user) {
    res.status(200).json({
      success: true,
      message: "success.",
    });
  } else {
    res.status(200).json({
      success: false,
      message: "success.",
    });
  }
});

module.exports = router;
