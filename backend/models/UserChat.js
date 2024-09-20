module.exports = (sequelize, DataTypes) => {
    const UserChat = sequelize.define('UserChat', {}, { timestamps: false });
  
    return UserChat;
  };
  