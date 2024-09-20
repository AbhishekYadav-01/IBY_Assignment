module.exports = (sequelize, DataTypes) => {
    const Message = sequelize.define('Message', {
      content: DataTypes.TEXT,
      timestamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    });
  
    return Message;
  };
  