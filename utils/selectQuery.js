const { sequelize, Sequelize } = require('../models');

exports.PopBoardHomeLogin = async function (user_id) {
    const query = ``;
  
    return await sequelize.query(query, {
      type: Sequelize.QueryTypes.SELECT,
    });
  };