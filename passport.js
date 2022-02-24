const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const GitHubStrategy = require("passport-github2");
const passport = require("passport");
const GOOGLE_CLIENT_ID = "396041734742-3j5j0enuvn129sokd4t6hr6gbib30q6s.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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"

// google strategy
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:9900/api/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    done(null, profile)
  }
));

// facebook strategy
const FACEBOOK_APP_ID = "532968938016742"
const FACEBOOK_APP_SECRET = "6f8d35207c0958d42d63d4e8b2ba92c5"
passport.use(new FacebookStrategy({
  clientID: FACEBOOK_APP_ID,
  clientSecret: FACEBOOK_APP_SECRET,
  callbackURL: "http://localhost:9900/api/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    done(null, profile);
    console.log(profile)
  }
));
// github strategy
const GITHUB_CLIENT_ID = "8e05d88622101dfb178f";
const GITHUB_CLIENT_SECRET = "5d676c1170c5a6d1adc37993f187dd798164219a";

passport.use(new GitHubStrategy({
  clientID: GITHUB_CLIENT_ID,
  clientSecret: GITHUB_CLIENT_SECRET,
  callbackURL: "http://localhost:9900/api/auth/github/callback"
},
function(accessToken, refreshToken, profile, done) {
  done(null, profile);
  console.log(profile);
}));


passport.serializeUser((user, done)=>{
  done(null, user);
})
passport.deserializeUser((user, done)=>{
  done(null, user);
})