"use strict";
const Sequelize = require("sequelize");
module.exports = class User extends import("sequelize").Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        userId: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
        },
        kakaoEmail: {
          type: Sequelize.STRING(40),
          allowNull: true,
        },
        nickname: {
          type: Sequelize.STRING(40),
          allowNull: true,
        },
        refresh_token: {
          type: Sequelize.STRING,
        },
        provider: {
          type: Sequelize.STRING,
          allowNul: false,
          defaultValue: "local",
        },
        snsId: {
            type: Sequelize.STRING,
            allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        modelName: "User",
        tableName: "users",
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    db.User.hasMany(db.Comment, {
      foreignKey: "user_id",
      sourceKey: "user_id",
    });
    db.User.hasMany(db.Like, {
      foreignKey: "user_id",
      sourceKey: "user_id",
    });
  }
};
