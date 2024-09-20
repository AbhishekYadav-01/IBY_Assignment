const { Message, User } = require('../models');

exports.getMessages = async (req, res) => {
  const { chatId } = req.params;

  try {
    const messages = await Message.findAll({
      where: { chatId },
      include: [{ model: User, attributes: ['id', 'username'] }],
      order: [['timestamp', 'ASC']],
    });

    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.sendMessage = async (req, res) => {
  const { chatId, content } = req.body;
  const userId = req.user.id;

  try {
    const message = await Message.create({
      content,
      chatId,
      senderId: userId,
    });

    res.json(message);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
