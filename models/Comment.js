// IMPORT PACKAGE AND MODELS
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {
}


// CREATE COMMENT
Comment.init(
  {
   user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      
    },
    blog_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
         },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    underscored: true,
    modelName: 'comment',
  }
);

module.exports = Comment;
