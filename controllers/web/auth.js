const router = require('express').Router();
const User = require('../../models/User');
const withAuth = require('../../utils/auth');

// LOGIN
// get login page
router.get('/login', (req, res) => {
    res.render('login')
})

// post request for login
router.post('/login', async (req, res) => {
  
  try {
        const userData = await User.findOne({ where: { email: req.body.email } });
    
        if (!userData) {
          res.status(400).render('login', { 
            error: "Email or password incorrect"
        })
            return;
        }
    
        const validPassword = await userData.checkPassword(req.body.password);
    
        if (!validPassword) {
            res.status(400).render('login', { 
                error: "Email or password incorrect"
            })
        return;
        }
        
       
        req.session.save(() => {
          req.session.user_id = userData.id;
          req.session.logged_in = true;
          
          res.redirect('/home')
        });
        
      
    }
      catch (err) {
        res.status(400).render('login', { 
          error: "There's been an error try again later"})
      }
    });
    
   

//LOGOUT
// get logout page

router.get('/logout', withAuth, async (req, res, next) => {
  if (req.session.logged_in) {
   
    req.session.destroy(function () {
      res.status(204).end();
    });
   res.redirect('/login')
  } else {
    res.status(404).end();
  }
});





//SIGNUP
// get signup page
router.get('/signup', (req, res) => {
  res.render('signup')
})

// post request for signup
router.post('/signup', async (req, res) => {
if(req.body.password != req.body.confirm) {
  res.status(400).render('signup', { 
    error: "Passwords don't match"})
}
let pwd = req.body.password

if(pwd.length < 8) {
  res.status(400).render('signup', { 
    error: "Passwords must be at least 8 characters"})
} else {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    // SET SESSION VARIABLE LOGGEDIN TO TRUE
    req.session.save(() => {
      req.session.loggedIn = true;
      res.render('success')
    });
  } catch (err) {
    res.status(400).render('signup', { 
      error: "There's been an error try again later"})
  
  }
}
});


module.exports = router;