const Users = require("../users/users-model")
const Posts = require("../posts/posts-model")


function logger(req, res, next) {
  // DO YOUR MAGIC
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get('Origin')}`
  );

  next();
}

function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  const { id } = req.params
  const user = Users.getById(id);

  if (user) {
    req.user = user;
    res.status(200);
    next()
  } else {
    res.status(404).json({message: "Id was not found"})
  }
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  const user = Users.get(user);
  
  if (user) {
    req.user = user;
    res.status(200);
    next();
  } else {
    res.status(404).json({message: "User was not found"})
  }

}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  const post = Posts.get(post);

  if (post) {
    req.post = post;
    res.status(200);
    next();
  } else {
    res.status(404).json({message: "Post was not found"})
  }


}

// do not forget to expose these functions to other modules

module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
}
