const router = require('express').Router();
const { Thought } = require('../models/Thought');

//get all thoughts
router.get('/thought')


//get a single thought by id
router.get('/thought/:id')


//post a new thought
router.post('/thought')


//update a thought by id
router.put('/thought/:id')


//delete thought by id
router.delete('/thought/:id')


//create a reaction stored in a single thoughts reaction array field
router.post('/thought/thoughtId/reactions')


//remove a reaction by the reactions reaction Id
router.delete('/thought/thoughtId/reactions/reactionId')




module.exports = router;