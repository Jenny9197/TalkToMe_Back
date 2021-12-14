const { Sequelize,sequelize } = require('../models');

const homeSearchFunc = async (req, res) => {
  try {
      const user_id = req.userId
      const {keyword, group} = req.query;
      console.log(group == 'board');
      const keywords = keyword.split(' ')
      
      if (group == 'board') {
        let query = `SELECT b.boardId, b.boardViewCount, b.boardTitle, b.boardDesc, b.createdAt
        FROM boards AS b
        WHERE MATCH (boardTitle,boardDesc) AGAINST ('${keywords}' IN NATURAL LANGUAGE MODE)
        GROUP BY b.boardId
        ORDER BY b.createdAt DESC`
        const searchList = await sequelize.query(query, {
            type: Sequelize.QueryTypes.SELECT,
        });
        res.json({ result: 'success', searchList });
        
      } else if (group == 'select') {
        let query = `SELECT s.selectId, s.selectViewCount, s.selectTitle, s.selectDesc, s.createdAt, s.endDate,count(c.selectId) as participationCount
        FROM selects AS s
        left OUTER JOIN selectCounts AS c
        ON s.selectId = c.selectId
        WHERE MATCH (selectTitle,selectDesc) AGAINST ('${keywords}' IN NATURAL LANGUAGE MODE)
        GROUP BY s.selectId
        ORDER BY s.createdAt DESC`
        
        const searchList = await sequelize.query(query, {
            type: Sequelize.QueryTypes.SELECT,
        });
        res.json({ result: 'success', searchList });
      } else {
        res.json({ result: 'fail', msg: '잘못된 요청입니다.'})
      }
      
    
  } catch (err) {
    console.log(err)
    res.status(400).send({
      msg: '알 수 없는 오류가 발생했습니다. 관리자에게 문의하세요.',
    });
  }
};

module.exports = homeSearchFunc;