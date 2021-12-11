const { User, Select, SelectCount, Sequelize,
  sequelize, } = require('../models');

const getSelects = async (req, res) => {
  try {
    const userId = res.locals.user.userId;
    
    const query = `SELECT s.selectId, s.selectViewCount, s.selectTitle, s.selectDesc, s.createdAt, count(c.selectId) as participationCount
    FROM selects AS s
    left OUTER JOIN selectCounts AS c
    ON s.selectId = c.selectId
    GROUP BY s.selectId
    ORDER BY s.createdAt DESC`
    
    const selectsList = await sequelize.query(query, {
      type: Sequelize.QueryTypes.SELECT,
    });
    
    res.json({result: 'success', selectsList})
  } catch (error) {
    console.error(error);
    res.status(400).json(() => {
      result: 'fail';
      msg: '게시글 목록을 불러오는데 실패하였습니다.';
    });
  }
};
class SelectInfo {
  constructor(userId, selectTitle, selectDesc, option1, option2, option3, option4, option5) {
    this.userId = userId;
    this.selectTitle = selectTitle;
    this.selectDesc = selectDesc;
    this.option1 = option1;
    this.option2 = option2;
    this.option3 = option3;
    this.option4 = option4;
    this.option5 = option5;
  }
}
const writeSelect = async (req, res) => {
  try {
    const userId = res.locals.user.userId;
    const { selectTitle, selectDesc, option1, option2, option3, option4, option5 } = req.body;
    const selectInfo = new SelectInfo(userId, selectTitle, selectDesc, option1, option2, option3, option4, option5);
    await Select.create(selectInfo);
    
    res.status(200).json({ result: 'success', userId})
  } catch (error) {
    console.error(error);
    res.status(400).json(() => {
      result: 'fail';
      msg: '게시글 목록을 불러오는데 실패하였습니다.';
    });
  }
};

const getSelect = async (req, res) => {
  try {
    // const userId = res.locals.user.userId;
    const { selectId } = req.params;
    console.log(selectId)
    console.log(req.cookie)
    console.log('여기',req.headers.cookie);
    if (req.cookies['s' + selectId] == undefined) {
      res.cookie('s' + selectId, getUserIP(req), {
        maxAge: 720000, //12분
        // maxAge: 1200000,
      });
      await Select.increment({ selectViewCount: +1 }, { where: { selectId } });
    }
    
    const query = `SELECT t1.selectId, t1.selectViewCount, t1.selectTitle, t1.selectDesc, t1.createdAt, t1.option1, t1.option2, t1.option3, t1.option4, t1.option5, t1.participationCount, json_arrayagg(JSON_OBJECT(t2.optionNum, t2.count))as optionCount
    from
    (SELECT s.selectId, s.selectViewCount, s.selectTitle, s.selectDesc, s.createdAt, option1, option2, option3, option4, option5, count(c.selectId) as participationCount
    FROM selects AS s
    left OUTER JOIN selectCounts AS c
    ON s.selectId = c.selectId
    where s.selectId = ${selectId}
    GROUP BY s.selectId
    ORDER BY s.createdAt DESC) as t1
    left outer join
    (SELECT s.selectId, c.optionNum, count(c.optionNum) as count
      
      FROM selectCounts AS c
      left OUTER JOIN selects AS s
      ON c.selectId = s.selectId
      WHERE c.selectId = ${selectId}
      GROUP BY c.optionNum
      ORDER BY s.createdAt DESC) as t2
      ON t1.selectId = t2.selectId`

    const selectsList = await sequelize.query(query, {
      type: Sequelize.QueryTypes.SELECT,
    });

    res.status(200).json({ result: 'success', selectsList})  
  } catch (error) {
    console.error(error);
    res.status(400).json(() => {
      result: 'fail';
      msg: '게시글 목록을 불러오는데 실패하였습니다.';
    });
  }
};
function getUserIP(req) {
  console.log(req.headers);
  const addr = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  return addr;
}

const doSelect = async (req, res) => {
  try {
    const userId = res.locals.user.userId;
    const { selectId } = req.params;
    const { optionNum } = req.body;
    
    const exUser = await SelectCount.findOne({where: {userId: userId}})

    if (exUser) {
      await SelectCount.update({optionNum: optionNum},{where: {userId: userId, selectId: selectId} })
    } else {
      await SelectCount.create({userId: userId, selectId: selectId, optionNum: optionNum})
    }
    res.status(200).json({ result: 'success' })
  } catch (error) {
    console.error(error);
    res.status(400).json(() => {
      result: 'fail';
      msg: '투표에 실패 했습니다.';
    });
  }
};

module.exports = {
  getSelects,
  writeSelect,
  getSelect,
  doSelect,
};
