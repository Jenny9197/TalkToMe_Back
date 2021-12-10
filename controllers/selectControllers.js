const { User, Select, SelectCount } = require('../models');

const getSelects = async (req, res) => {
  try {
    const userId = res.locals.user.userId;
    res.json({userId: userId})
  } catch (error) {
    console.error(error);
    res.status(400).json(() => {
      result: 'fail';
      msg: '게시글 목록을 불러오는데 실패하였습니다.';
    });
  }
};
class SelectInfo {
  constructor(selectTitle, selectDesc, option1, option2, option3, option4, option5) {
    
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
    // const { selectTitle, selectDesc, option1, option2, option3, option4, option5 } = req.body;
    // const selectInfo = new SelectInfo(selectTitle, selectDesc, option1, option2, option3, option4, option5);
    // await Select.create(selectInfo);
    
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
  } catch (error) {
    console.error(error);
    res.status(400).json(() => {
      result: 'fail';
      msg: '게시글 목록을 불러오는데 실패하였습니다.';
    });
  }
};

const doSelect = async (req, res) => {
  try {
  } catch (error) {
    console.error(error);
    res.status(400).json(() => {
      result: 'fail';
      msg: '게시글 목록을 불러오는데 실패하였습니다.';
    });
  }
};

module.exports = {
  getSelects,
  writeSelect,
  getSelect,
  doSelect,
};
