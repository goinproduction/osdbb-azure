const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const passport = require("passport");
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    // @ts-ignore
    async function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: `/auth/facebook/callback`,
      profileFields: ["id", "displayName", "photos", "emails"],
    },
    // @ts-ignore
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);

// @ts-ignore
passport.serializeUser((user, done) => {
  done(null, user);
});

// @ts-ignore
passport.deserializeUser((user, done) => {
  done(null, user);
});
