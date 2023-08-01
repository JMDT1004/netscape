const router = require('express').Router();
const { User } = require('../models');

//get all users
router.get('/users', async (req, res) => {
    try {
        const user = await User.find({})
        return res.json(user)
    } catch (err) {
        res.status(500).json({ err: 'Unable to fetch users' })
    }
})

//get a single user by id and populate thought and friend data
router.get('/users/:id', async (req, res) => {
    const userId = req.params.id
    const user = await User.findById(userId)
        .populate('thoughts')
        .populate('friends')
    if (user) {
        res.json(user)
    } else {
        res.json({
            message: 'user not found'
        })
    }
})

//post a new user
router.post('/users', async (req, res) => {
    const user = await User.create(req.body)
    res.json(user)
})

//update a user by id
router.put('/users/:id', async (req, res) => {
    const userId = req.params.id
    const updateUserData = req.body
    const updateUser = await User.findByIdAndUpdate(userId, updateUserData, {
        new: true
    });
    if (!updateUser) {
        return res.status(404).json({
            message: 'unable to update user'
        })
    }
    res.json(updateUser);
})

//delete user by id
router.delete('/users/:id', async (req, res) => {
    const userId = req.params.id
    const deleteUser = await User.findByIdAndDelete(userId);
    if (!deleteUser) {
        return res.status(404).json({
            message: 'unable to delete user'
        })
    }
    return res.status(200).json({
        message: 'user deleted successfully'
    })
})

//add a new friend to users friend list
router.post('/users/:id/friends/:friendId', async (req, res) => {
    const { id, friendId } = req.params;
    const user = await User.findById(id)
    if (user) {
        user.friends.push(friendId);
        await user.save();
        return res.json(user);
    } else {
        return res.status(404).json({
            message: 'User not found'
        });
    }
})

//remove a friend from users friend list
router.delete('/users/:id/friends/:friendId', async (req, res) => {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    if (user) {
        user.friends = user.friends.filter(id => id.toString() !== friendId);
        await user.save();
        return res.json(user);
    } else {
        return res.status(404).json({
            message: 'User not found'
        });
    }
})

module.exports = router;
