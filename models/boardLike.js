const Sequelize = require('sequelize');

module.exports = class BoardLike extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        boardLikeId: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        boardId: {
            allowNull: false,
            type: Sequelize.INTEGER,
        },
        userId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        modelName: 'BoardLike',
        tableName: 'boards',
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }
  static associate(db) {
    db.BoardLike.hasMany(db.Board, {
      foreignKey: 'boardId',
      sourceKey: 'boardId',
    });
  }
};