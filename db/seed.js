// IMPORT PACKAGES AND MODELS
const sequelize = require('../config/connection')
const { faker } = require('@faker-js/faker')
const User = require('../models/User')
const Blog = require('../models/Blog')
const Comment = require('../models/Comment')

// LOOP FUNCTION TO SEED FAKE USERS

async function seedUser(num = 10) {
    const dummies = []
    for (let index = 0; index < num; index++) {
      const faked =  await User.create({
            email: faker.internet.email(),
            name: faker.name.fullName(),
            password: 'password123'
        })
        dummies.push(faked)
    }
    return dummies
}

// LOOP FUNCTION TO SEED FAKE BLOGS

async function seedBlog(userPool, num = 10) {
    const dummyBlogs = []
    for (let index = 0; index < num; index++) {
      const faked =  await Blog.create({
            user_id: faker.helpers.arrayElement(userPool).id,
            title: faker.date.weekday(),
            content: faker.lorem.paragraph(),
        })
        dummyBlogs.push(faked)
    }
    return dummyBlogs
}

// LOOP FUNCTION TO SEED FAKE COMMENTS

async function seedComment(userPool, blogPool, num = 10) {
    const dummyComms = []
    for (let index = 0; index < num; index++) {
      const faked =  await Comment.create({
            user_id: faker.helpers.arrayElement(userPool).id,
            blog_id: faker.helpers.arrayElement(blogPool).id,
            content: faker.lorem.paragraph(),
        })
        dummyComms.push(faked)
    }
    return dummyComms
}

async function seedAll() {
    const users = await seedUser();
    const blogs = await seedBlog(users)
    const comments = await seedComment(users, blogs)
}

sequelize.sync({force: true})
.then(seedAll)
.then(() => process.exit(0))
