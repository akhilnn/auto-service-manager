var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var User = require('../models/user');

passport.use(new GoogleStrategy({
	clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
}, function(accessToken, refreshToken, profile, cb) { // cb can be done
        // a user has logged in with OAuth...
        User.findOne({ 'googleId': profile.id }, function(err, user) {
        	if (err) return cb(err);
            // add code to handle avatar
        	if (user) {
        		return cb(null, user);
        	} else {
        		var newUser = new User({
                    name: profile.displayName,
        			email: profile.emails[0].value,
                    googleId: profile.id
                });
                newUser.save(function(err) {
                    if (err) return cb(err);
                    return cb(null, newUser);
                });
        	}
        });
    }
));

// not detecting indents
passport.serializeUser(function(user, cb) {
    // force argument with null because do not have access to err arg
    cb(null, user.id);
});


passport.deserializeUser(function(id, cb) {
    User.findById(id, function(err, user) {
        cb(err, user);
    });
});

// do another error check? --> nodemon, compare code [x]
// tool tip[x], save[x], add avatar functionality, indents/tab fix[x]
