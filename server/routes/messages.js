const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Message = require('../models/Message');
const User = require('../models/User');

router.post('/send', auth, async (req, res) => {
  try {
    const { recipientId, content } = req.body;
    
    const message = new Message({
      sender: req.user.id,
      recipient: recipientId,
      content
    });
    
    await message.save();
    
    const populatedMessage = await Message.findById(message._id)
      .populate('sender', 'firstName lastName profilePicture')
      .populate('recipient', 'firstName lastName');
    
    res.json(populatedMessage);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.get('/conversation/:userId', auth, async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { sender: req.user.id, recipient: req.params.userId },
        { sender: req.params.userId, recipient: req.user.id }
      ]
    })
    .populate('sender', 'firstName lastName profilePicture')
    .populate('recipient', 'firstName lastName')
    .sort({ createdAt: 1 });
    
    res.json(messages);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.get('/recent', auth, async (req, res) => {
  try {
    const messages = await Message.aggregate([
      {
        $match: {
          $or: [
            { sender: req.user.id },
            { recipient: req.user.id }
          ]
        }
      },
      {
        $sort: { createdAt: -1 }
      },
      {
        $group: {
          _id: {
            $cond: [
              { $eq: ['$sender', req.user.id] },
              '$recipient',
              '$sender'
            ]
          },
          lastMessage: { $first: '$$ROOT' }
        }
      },
      {
        $limit: 20
      }
    ]);
    
    const populatedMessages = await User.populate(messages, {
      path: '_id',
      select: 'firstName lastName profilePicture'
    });
    
    res.json(populatedMessages);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.put('/read/:messageId', auth, async (req, res) => {
  try {
    await Message.findByIdAndUpdate(req.params.messageId, { isRead: true });
    res.json({ msg: 'Message marked as read' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;