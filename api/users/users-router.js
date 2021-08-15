const express = require('express');

// You will need `users-model.js` and `posts-model.js` both
const Users = require('./users-model')
const Posts = require('../posts/posts-model')

// The middleware functions also need to be required

const Middleware = require('../middleware/middleware')

const router = express.Router();

router.get('/', (req, res) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  Users.get(req.query)
    .then(users => {
      console.log("users get is getting fired!")
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(404).json({message: `${err}`})
    })

});

router.get('/:id', (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  Users.getById(req.params.id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({message: "User not found"})
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: "Error retrieving the user"
      })
    })
});

router.post('/', (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  Users.insert(req.body)
    .then(user => {
      res.status(201).json(user)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        message: "Error adding User"
      })
    })
});

router.put('/:id', (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  Users.update(req.params.id, req.body)
    .then(user=>{
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "The user could not be found"})
      }
    })
});

router.delete('/:id', (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  Users.remove(req.params.id)
    .then(count => {
      if (count > 0 ) {
        res.status(200).json({ message: "the user has been sent to the void"})
      } else {
        res.status(404).json({ message: "Could not find user"})
      }
    })

});

router.get('/:id/posts', (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  Posts.get(req.query) 
    .then(post => {
      res.status(200).json(post)
    })
    .catch(err => {
      res.status(404).json({message: "Could not find users post"})
    })
});

router.post('/:id/posts', (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  Posts.getById(req.params.id)
    .then(posts => {
      if (posts) {
        res.status(200).json(post);
      } else {
        res.status(404).json({message: "could not find user's post"})
      }
    })
    .catch(err => {
      res.status(500).json({message: "error retrieving users post"})
    })
});

// do not forget to export the router
module.exports = router;