const { Board, BoardLike, User } = require('../models');
//const { Sequelize } = require("../models");

//고민 작성 페이지 - 게시글 작성
const postCreate = async (req, res) => {
  try {
    const userId = res.locals.user;
    const { boardTitle, boardDesc } = req.body;

    const date = new Date();

    const board = await Board.create({
      boardTitle,
      boardDesc: boardDesc,
      userId,
    });

    message = '게시물 작성에 성공했습니다.';
    return res.status(200).send({
      board,
      message,
      date,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send(() => {
      result: 'fail';
      msg: '알 수 없는 문제가 발생했습니다.';
    });
  }
};

//고민 상세 페이지 - 게시글 조회
const postView = async (req, res) => {
  try {
    const userId = res.locals.user;
    const { boardId } = req.params;
    const postViewList = await Board.findAll({
      where: { boardId },
    });
    return res.status(200).send({
      postViewList,
      userId,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send(() => {
      result: 'fail';
      msg: '알 수 없는 문제가 발생했습니다.';
    });
  }
};

const editBoard = async (req, res) => {
  try {
    const userId = res.locals.user;
    const { boardId } = req.params;
    const { boardTitle, boardDesc } = req.body;
    const exBoard = await Board.findOne({ where: { boardId: boardId, userId: userId } });
    if (exBoard) {
      await Board.update({ boardTitle, boardDesc }, { where: { boardId } });
      res.status(200).json({ result: 'success', msg: '수정완료' });
      return;
    } else {
      res.status(200).json({ result: 'fail', msg: '수정할 수 없는 게시물 입니다.' });
      return;
    }

    res.json({ result: 'success' });
  } catch (err) {
    console.log(err);
    res.status(400).send({
      msg: '게시글 수정에 실패했습니다.',
    });
  }
};

const deleteBoard = async (req, res) => {
  try {
    const userId = res.locals.user;
    const { boardId } = req.params;

    const exBoard = await Board.findOne({ where: { boardId: boardId, userId: userId } });
    if (exBoard) {
      await Board.destroy({ where: { boardId: boardId } });
      res.status(200).json({ result: 'success' });
      return;
    } else {
      res.status(200).json({ result: 'fail', msg: '삭제할 수 없는 게시물 입니다.' });
      return;
    }

    res.json({ result: 'success' });
  } catch (err) {
    console.log(err);
    res.status(400).send({
      msg: '게시글 삭제에 실패했습니다.',
    });
  }
};

//게시글 좋아요/취소
const postOrLike = async (req, res) => {
  try {
    const { boardId } = req.params;
    const userId = res.locals.user;
    console.log(boardId, userId);

    const postLike = await BoardLike.findOne({
      where: { userId, boardId },
    });
    if (!postLike) {
      await BoardLike.create({
        userId,
        boardId,
      });
      message = '게시글 좋아요.';
      return res.status(200).send({
        isLiked: true,
        message,
      });
    } else {
      await BoardLike.destroy({
        where: { userId, boardId },
      });

      message = '게시물 좋아요 취소';
      return res.status(200).send({
        isLiked: false,
        message,
      });
    }
  } catch (error) {
    console.log(error);
    message = '관리자에게 문의해주세요';
    return res.status(500).send({ message });
  }
};

module.exports = { postCreate, postView, postOrLike, editBoard, deleteBoard };
