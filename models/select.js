const Sequelize = require('sequelize');

module.exports = class Select extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                selectId: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER,
                },
                userId: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                selectTitle: {
                    type: Sequelize.STRING(100),
                    allowNull: false,
                },
                selectDesc: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                option1: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                option2: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                option3: {
                    type: Sequelize.STRING,
                    allowNull: true,
                },
                option4: {
                    type: Sequelize.STRING,
                    allowNull: true,
                },
                option5: {
                    type: Sequelize.STRING,
                    allowNull: true,
                },
                selectViewCount: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    defaultValue: 0,
                },
            },
            {
                sequelize,
                timestamps: true,
                modelName: 'Select',
                tableName: 'selects',
                charset: 'utf8',
                collate: 'utf8_general_ci',
            },
        );
    }
    static associate(db) {
        db.Select.hasMany(db.SelectCount, {
            foreignKey: 'selectId',
            sourceKey: 'selectId',
        });
        db.Select.belongsTo(db.User, {
            foreignKey: 'userId',
            sourceKey: 'userId',
            onDelete: 'CASCADE',
        });
    }
};