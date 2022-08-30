const router = require('express').Router();
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
          error: err})
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



    // res.status(400).render('login', { 
     // error: "Email or password incorrect"




    //sign up page

//post request for sign up

module.exports = router;