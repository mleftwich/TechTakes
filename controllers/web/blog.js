const router = require('express').Router();
const { Blog, User, Comment } = require('../../models');


// HOME PAGE
router.get('/', async (req, res) => {
    const blogs = await Blog.findAll({raw: true})
    let status = 'Login'
    let method = "/login"
    let action = "New User"
    let todo = "/signup"
    res.render('homepage',  { blogs, status, method, action, todo } )
});

// LOGGED IN HOMEPAGE
router.get('/home', async (req, res) => {
    const blogs = await Blog.findAll({raw: true})
    let status = 'Logout'
    let method = "/logout"
    let action = "Dashboard"
    let todo = "/dashboard"
    res.render('homepage',  { blogs, status, method, action, todo } )
});

// GET INDIVIDUAL BLOG

    //post and save comment


// GET A COMMENT
    //update and delete comment


// DASHBOARD

router.get('/dashboard', async (req, res) => {
   // GET ALL USER BLOGS
   let status = 'Logout'
   let method = "/logout"
   let action = "Dashboard"
   let todo = "/dashboard"
    const userBlogs = await Blog.findAll({
        where: {
            user_id: req.session.user_id
        },
        include: [
            {
                model: Comment,
                include: [
                    {model: User},
                    
                ],
                
                
            
            },
            
        ],
       raw: true,
       nest: true
     })
   
     console.log(userBlogs)
    res.render('dashboard', { userBlogs, status, method, todo })
})


    module.exports = router