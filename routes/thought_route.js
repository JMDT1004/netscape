const router = require('express').Router();
const { Thought } = require('../models/Thought');

//get all thoughts
router.get('/thought', async (req, res) => {
    const thought = await Thought.find({});
    res.json(thought)
})


//get a single thought by id
router.get('/thought/:id', async (req, res) => {
    const thoughtId = req.params.id
    const thought = await Thought.findById(thoughtId);
    return res.json(thought)
})


//post a new thought
router.post('/thought', async (req, res) => {
    const thought = await Thought.create(req.body)
    res.json(user)
})


//update a thought by id
router.put('/thought/:id', async (req, res) => {
    const thoughtId = req.params.id
    const updatedThoughtData = req.body
    const updateThought = await Thought.findByIdAndUpdate(
        thoughtId, updatedThoughtData, {
        new: true
    })
    if (!updateThought) {
        return res.status(404).json({
            message: 'unable to update thought'
        })
    }
})


//delete thought by id
router.delete('/thought/:id', async (req, res) => {
    const thoughtId = req.params.id
    const deleteThought = await Thought.findByIdAndDelete(
        thoughtId);
    if (!deleteThought) {
        return res.status(404).json({
            message: 'unable to delete user'
        })
    }
    return res.status(200).json({
        message: 'user deleted successfully'
    })
})


//create a reaction stored in a single thoughts reaction array field
router.post('/thought/:thoughtId/reactions', async (req, res) => {
    const { thoughtId } = req.params;
    const reaction = req.body;
    const thought = await Thought.findById(thoughtId);
    if (thought) {
        thought.reactions.push(reaction);
        await thought.save();
        return res.json(thought);
    } else {
        return res.status(404).json({
            message: 'Thought not found'
        });
    }
})


//remove a reaction by the reactions reaction Id
router.delete('/thought/:thoughtId/reactions/:reactionId', async (req, res) => {
    const { thoughtId, reactionId } = req.params;
    const thought = await Thought.findById(thoughtId);
    if (thought) {
        thought.reactions = thought.reactions.filter(
            reaction => reaction.reactionId !== reactionId
        );
        await thought.save();
        return res.json(thought);
    } else {
        return res.status(404).json({
            message: 'Thought not found'
        });
    }
})

module.exports = router;