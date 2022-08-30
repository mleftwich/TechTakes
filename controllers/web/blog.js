const router = require("express").Router();
const { Blog, User, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

// HOME PAGE
router.get("/", async (req, res) => {
  const blogs = await Blog.findAll({ raw: true });
  let status = "Login";
  let method = "/login";
  let action = "New User";
  let todo = "/signup";
  res.render("homepage", { blogs, status, method, action, todo });
});

// LOGGED IN HOMEPAGE
router.get("/home", withAuth, async (req, res, next) => {
  const blogs = await Blog.findAll({ raw: true });
  let status = "Logout";
  let method = "/logout";
  let action = "Dashboard";
  let todo = "/dashboard";
  res.render("homepage", { blogs, status, method, action, todo });
});

// GET INDIVIDUAL BLOG
router.get("/blogs/:id", withAuth, async (req, res, next) => {
  let status = "Logout";
  let method = "/logout";
  let action = "Dashboard";
  let todo = "/dashboard";
  const specBlog = await Blog.findOne({
    where: {
      id: req.params.id,
    },
    raw: true,
    nest: true,
  });
  const comments = await Comment.findAll({
    where: {
      blog_id: req.params.id,
    },
    include: [
      {
        model: User,
      },
    ],
    raw: true,
    nest: true,
  });
  res.render("blog", { specBlog, comments, status, method, action, todo });
});

// POST COMMENT

router.post('/blogs/:id', withAuth, async (req, res, next) => {
 Comment.create({
  user_id: req.session.user_id,
  blog_id: req.params.id,
  comment: req.body.comment,
 })
 res.redirect('back')
})

// DASHBOARD

router.get("/dashboard", withAuth, async (req, res, next) => {
  // GET ALL USER BLOGS
  let status = "Logout";
  let method = "/logout";
  let action = "Dashboard";
  let todo = "/dashboard";
  const blogs = await Blog.findAll({
    where: {
      user_id: req.session.user_id
    },
    raw: true,
  })
  const userBlogs = await Blog.findAll({
    where: {
      user_id: req.session.user_id,
    },
    include: [
      {
        model: Comment,
        include: [{ model: User }],
      },
    ],
    raw: true,
   nest: true,
  });

  res.render("dashboard", { blogs, userBlogs, status, method, todo });
});

// NEW POST

router.get('/new', withAuth, async (req, res, next) => {
  const status = "Logout";
  const method = "/logout";
  const action = "Dashboard";
  const todo = "/dashboard";
  res.render('new', { status, method, action, todo })
})

router.post('/new', withAuth, async (req, res, next) => {
 
  const blog = await Blog.create({
    title: req.body.title,
    user_id: req.session.user_id,
    content: req.body.post
  })
  res.redirect('/dashboard')
})

// EDIT AND DELETE BLOGS

router.get('/edit/:id', withAuth, async (req, res, next) => {
  // SHOW BLOG
  const specBlog = await Blog.findOne({
    where: {
      id: req.params.id,
    },
    raw: true,
    nest: true,
  });
  const status = "Logout";
  const method = "/logout";
  const action = "Dashboard";
  const todo = "/dashboard";
  res.render('edit', { specBlog, status, method, action, todo })
})

//UPDATE BLOG
router.post('/edit/:id', withAuth, async (req, res, next) => {
  const blog = await Blog.findOne({
   where: {
    id: req.params.id
   }
  })
  await blog.update({title: req.body.title, content: req.body.post})
  res.redirect('back')
})


//DELETE BLOG
router.post('/delete/:id', withAuth, async (req, res) => {
 const destroy = await Blog.destroy({ where: { id: req.params.id } })
 res.redirect('/dashboard')
})
module.exports = router;
