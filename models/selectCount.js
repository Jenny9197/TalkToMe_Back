const Sequelize = require('sequelize');

module.exports = class SelectCount extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        selectCountId: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        userId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        selectId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        optionNum: {
          type: Sequelize.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        modelName: 'SelectCount',
        tableName: 'selectCounts',
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }
  static associate(db) {
    db.SelectCount.belongsTo(db.User, {
      foreignKey: 'userId',
      sourceKey: 'userId',
      onDelete: 'CASCADE',
    });
    db.SelectCount.belongsTo(db.Select, {
      foreignKey: 'selectId',
      sourceKey: 'selectId',
      onDelete: 'CASCADE',
    });
  }
};