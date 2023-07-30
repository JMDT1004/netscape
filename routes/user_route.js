const router = require('express').Router();
const { User } = require('../models/User');

//get all users
router.get('/user')


//get a single user by id and populate thought and friend data
router.get('/user/:id')


//post a new user
router.post('/user')


//update a user by id
router.put('/user/:id')


//delete user by id
router.delete('/user/:id')


//add a new friend to users friend list
router.post('/user/:id/friends/:feindId')


//remove a friend from users friend list
router.delete('/user/:id/friends/:feindId')




module.exports = router;