const router = require('express').Router();
const { User } = require('../models/User');

//get all users
router.get('/user', async (req, res) => {
    const user = await User.find({});
    res.json(user)
})


//get a single user by id and populate thought and friend data
router.get('/user/:id', async (req, res) => {
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
router.post('/user', async (req, res) => {
    const user = await User.create(req.body)
    res.json(user)
})


//update a user by id
router.put('/user/:id', async (req, res) => {
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
})


//delete user by id
router.delete('/user/:id', async (req, res) => {
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
router.post('/user/:id/friends/:feindId', async (req, res) => {
    const { userId, friendId } = req.params
    const user = await User.findById(userId)
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
router.delete('/user/:userId/friends/:friendId', async (req, res) => {
    const { userId, friendId } = req.params;
    const user = await User.findById(userId);
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