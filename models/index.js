const User = require('../models/User')
const Comment = require('../models/Comment')
const Blog = require('../models/Blog')



User.hasMany(Blog, {
    foreignKey: 'user_id'
})
User.hasMany(Comment, {
    foreignKey: 'user_id'
})

Blog.belongsTo(User, {
    foreignKey: 'user_id'
})
Blog.hasMany(Comment, {
    foreignKey: 'blog_id'
})
Comment.belongsTo(Blog, {
    foreignKey: 'blog_id'
})

Comment.belongsTo(User, {
    foreignKey: 'user_id'
})

module.exports = {User, Comment, Blog}