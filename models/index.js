const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];

const User = require('./user');
const Board = require('./board');
const Comment = require('./comment');
const Select = require('./select');
const SelectCount = require('./selectCount');

const db = {};
const sequelize = new Sequelize(
  config.database, config.username, config.password, config,
);

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = User;
db.Board = Board;
db.Comment = Comment;
db.Select = Select;
db.SelectCount = SelectCount;

User.init(sequelize);
Board.init(sequelize);
Comment.init(sequelize);
Select.init(sequelize);
SelectCount.init(sequelize);

User.associate(db);
Board.associate(db);
Comment.associate(db);
Select.associate(db);
SelectCount.associate(db);

module.exports = db;