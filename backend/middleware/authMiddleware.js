const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
// called in routes
// finds it once here and then again in the controller
const protect = asyncHandler(async (req, res, next) => {
  let token

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // get token from header
      token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      // get user from token
      req.user = await User.findById(decoded.id).select('-password')

      next()
    } catch (error) {
      console.log(error)
      res.status(401) //<-- unauthorized
      throw new Error('Not Authorized from the auth middleware')
    }
  }

  if (!token) {
    res.status(401) //<-- unauthorized
    throw new Error('No Token and not Authorized sent from auth middleware')
  }
})

module.exports = { protect }
