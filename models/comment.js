const Sequelize = require('sequelize');

module.exports = class Comment extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        commentId: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        userId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        boardId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        comment: {
          type: Sequelize.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        modelName: 'Comment',
        tableName: 'comments',
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }
  static associate(db) {
    db.Comment.belongsTo(db.User, {
      foreignKey: 'userId',
      sourceKey: 'userId',
      onDelete: "CASCADE",
    });
    db.Comment.belongsTo(db.Board, {
      foreignKey: 'boardId',
      sourceKey: 'boardId',
      onDelete: "CASCADE",
    });
  }
};