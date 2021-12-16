const Sequelize = require('sequelize');

module.exports = class Board extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        boardId: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        userId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        boardTitle: {
          type: Sequelize.STRING(40),
          allowNull: false,
        },
        boardDesc: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        boardViewCount: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        // updatedAt: {
        //   type: Sequelize.INTEGER,
        //   allowNull: false,
        //   defaultValue: 0,
        // }
      },
      {
        sequelize,
        timestamps: true,
        modelName: 'Board',
        tableName: 'boards',
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }
  static associate(db) {
    db.Board.hasMany(db.Comment, {
      foreignKey: 'boardId',
      sourceKey: 'boardId',
    });
  }
};