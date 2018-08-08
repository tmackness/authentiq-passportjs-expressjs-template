const router = require('express').Router();
const passport = require('passport');
if (process.env.NODE_ENV === 'development') {
  const dotenv = require('dotenv');
  dotenv.config();
}

router.get('/authentiq', passport.authenticate('authentiq'));

router.get('/authentiq/callback', passport.authenticate('authentiq'), async (req, res) => {
  try {
    if (!req.user) {
        throw new Error('user null');
    }
    // Successful authentication, redirect to profile page.
    res.redirect("/profile");
  }
  catch (error) {
    console.log(error);
  }
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
