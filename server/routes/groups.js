const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Group = require('../models/Group');
const User = require('../models/User');
const Message = require('../models/Message');

router.post('/create', auth, async (req, res) => {
  try {
    const { name, description, projectName, memberIds } = req.body;
    
    const group = new Group({
      name,
      description,
      projectName,
      creator: req.user.id,
      members: [req.user.id, ...memberIds]
    });
    
    await group.save();
    
    await User.updateMany(
      { _id: { $in: group.members } },
      { $push: { groups: group._id } }
    );
    
    const populatedGroup = await Group.findById(group._id)
      .populate('creator', 'firstName lastName')
      .populate('members', 'firstName lastName profilePicture');
    
    res.json(populatedGroup);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.get('/my-groups', auth, async (req, res) => {
  try {
    const groups = await Group.find({ 
      members: req.user.id,
      isActive: true 
    })
    .populate('creator', 'firstName lastName')
    .populate('members', 'firstName lastName profilePicture');
    
    res.json(groups);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.get('/:groupId', auth, async (req, res) => {
  try {
    const group = await Group.findById(req.params.groupId)
      .populate('creator', 'firstName lastName')
      .populate('members', 'firstName lastName profilePicture email');
    
    if (!group) {
      return res.status(404).json({ msg: 'Group not found' });
    }
    
    if (!group.members.some(member => member._id.toString() === req.user.id)) {
      return res.status(403).json({ msg: 'Not authorized' });
    }
    
    res.json(group);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.post('/:groupId/message', auth, async (req, res) => {
  try {
    const { content } = req.body;
    
    const group = await Group.findById(req.params.groupId);
    if (!group.members.includes(req.user.id)) {
      return res.status(403).json({ msg: 'Not a member of this group' });
    }
    
    const message = new Message({
      sender: req.user.id,
      group: req.params.groupId,
      content
    });
    
    await message.save();
    
    const populatedMessage = await Message.findById(message._id)
      .populate('sender', 'firstName lastName profilePicture');
    
    res.json(populatedMessage);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.get('/:groupId/messages', auth, async (req, res) => {
  try {
    const messages = await Message.find({ group: req.params.groupId })
      .populate('sender', 'firstName lastName profilePicture')
      .sort({ createdAt: 1 });
    
    res.json(messages);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.put('/:groupId/add-members', auth, async (req, res) => {
  try {
    const { memberIds } = req.body;
    
    const group = await Group.findByIdAndUpdate(
      req.params.groupId,
      { $addToSet: { members: { $each: memberIds } } },
      { new: true }
    ).populate('members', 'firstName lastName profilePicture');
    
    await User.updateMany(
      { _id: { $in: memberIds } },
      { $addToSet: { groups: group._id } }
    );
    
    res.json(group);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;