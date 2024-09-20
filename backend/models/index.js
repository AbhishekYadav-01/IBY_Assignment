const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const User = require('./User')(sequelize, Sequelize.DataTypes);
const Chat = require('./Chat')(sequelize, Sequelize.DataTypes);
const Message = require('./Message')(sequelize, Sequelize.DataTypes);
const UserChat = require('./UserChat')(sequelize, Sequelize.DataTypes);

// Associations
User.belongsToMany(Chat, { through: UserChat, foreignKey: 'userId' });
Chat.belongsToMany(User, { through: UserChat, foreignKey: 'chatId' });

Chat.hasMany(Message, { foreignKey: 'chatId' });
Message.belongsTo(Chat, { foreignKey: 'chatId' });

User.hasMany(Message, { foreignKey: 'senderId' });
Message.belongsTo(User, { foreignKey: 'senderId' });

module.exports = {
  sequelize,
  User,
  Chat,
  Message,
  UserChat,
};
