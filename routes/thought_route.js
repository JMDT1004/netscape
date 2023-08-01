const router = require('express').Router();
const { Thought } = require('../models');

//get all thoughts
router.get('/thoughts', async (req, res) => {
    try {
        const thought = await Thought.find()
        return res.json(thought)
    } catch (err) {
        res.status(500).json({ err: 'Unable to fetch thoughts' })
    }
})

//get a single thought by id
router.get('/thoughts/:id', async (req, res) => {
    const thoughtId = req.params.id
    const thought = await Thought.findById(thoughtId);
    return res.json(thought)
})


//create a new thought
router.post('/thoughts', async (req, res) => {
    const thought = await Thought.create(req.body)
    res.json(thought)
})


//update a thought by userid
router.put('/thoughts/:id', async (req, res) => {
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
    res.json(updateThought)
})


//delete thought by id
router.delete('/thoughts/:id', async (req, res) => {
    const thoughtId = req.params.id
    const deleteThought = await Thought.findByIdAndDelete(
        thoughtId);
    if (!deleteThought) {
        return res.status(404).json({
            message: 'unable to delete thought'
        })
    }
    return res.status(200).json({
        message: 'thought deleted successfully'
    })
})


//create a reaction stored in a single thoughts reaction array field
router.post('/thoughts/:id/reactions', async (req, res) => {
    const thoughId = req.params.id;
    const reaction = req.body;
    const thought = await Thought.findById(thoughId);
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
router.delete('/thoughts/:id/reactions/:reactionId', async (req, res) => {
    const { id: thoughId, reactionId } = req.params;
    const thought = await Thought.findById(thoughId);
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