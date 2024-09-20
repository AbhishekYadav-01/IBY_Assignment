const { Chat, UserChat, User } = require('../models');

exports.getChats = async (req, res) => {
  const userId = req.user.id;

  try {
    const chats = await Chat.findAll({
      include: [
        {
          model: User,
          where: { id: userId },
          through: { attributes: [] },
        },
      ],
    });

    res.json(chats);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.createChat = async (req, res) => {
  const { type, participantIds } = req.body;

  try {
    const chat = await Chat.create({ type });

    // Add users to chat
    const userChats = participantIds.map((userId) => ({
      userId,
      chatId: chat.id,
    }));

    await UserChat.bulkCreate(userChats);

    res.json(chat);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
