const router = require('express').Router();
const { reset } = require('nodemon');
const User = require('../../models/User')
// AUTHENTICATION ROUTES

//login page 
router.get('/login', (req, res) => {
    res.render('login')
})
//post request for login


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
    
   

// LOGOUT

router.get('/logout', async (req, res) => {
  req.session.destroy
  let status = 'Login'
    let method = "/login"
    let action = "New User"
    let todo = "/signup"
 
  res.render('logout', { method, status, action, todo })
})

router.get('/signup', (req, res) => {
  res.render('signup')
})

router.post('/signup', async (req, res) => {

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
    console.log(err)
    res.status(400).render('signup', { 
      error: "There's been an error try again later"})
  
  }
});

    // res.status(400).render('login', { 
     // error: "Email or password incorrect"




    //sign up page

//post request for sign up

module.exports = router;