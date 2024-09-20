module.exports = (sequelize, DataTypes) => {
    const Chat = sequelize.define('Chat', {
      type: DataTypes.STRING, // 'private' or 'group'
    });
  
    return Chat;
  };
  