const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                userId: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER,
                },
                email: {
                    type: Sequelize.STRING,
                    allowNull: true,
                },
                nickname: {
                    type: Sequelize.STRING,
                    allowNull: false,
                    defaultValue: '임시',
                },
                refresh_token: {
                    type: Sequelize.STRING,
                },
                provider: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                snsId: {
                    type: Sequelize.STRING,
                    allowNull: true,
                },
            },
            {
                sequelize,
                timestamps: true,
                modelName: 'User',
                tableName: 'users',
                charset: 'utf8',
                collate: 'utf8_general_ci',
            },
        );
    }
    static associate(db) {
        db.User.hasMany(db.Comment, {
            foreignKey: 'userId',
            sourceKey: 'userId',
        });
        db.User.hasMany(db.Select, {
            foreignKey: 'userId',
            sourceKey: 'userId',
        });
        db.User.hasMany(db.SelectCount, {
            foreignKey: 'userId',
            sourceKey: 'userId',
        });
        
    }
};