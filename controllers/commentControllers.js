const { Comment } = require('../models');
const { findAll } = require('../models/user');

//댓글조회
const getComment = async (req, res) => {
  try {
    const userId = res.locals.user.userId;
  } catch {
    console.error(error);
    res.status(400).json({
      result: 'fail',
      errormessage: '댓글이 없거나 댓글 등록 할수 없습니다.',
    });
  }
};
//댓글등록
const writeComment = async (req, res) => {
  try {
    const userId = res.locals.user.userId;
    const { boardId } = req.params;
    const { comment } = req.body;

    if (!comment) {
      console.log('커멘트 없음');
      res.status(400).json({ result: 'fail', errormessage: '내용입력하세요' });
      return;
    }

    await Comment.create({
      userId: userId,
      boardId: boardId,
      comment: comment,
    });

    const comments = await findAll({ where: {boarId: boardId}});
    
    res.status(200).json({ result: 'success', comments });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      result: 'fail',
      msg: '게시글이 없거나 댓글 등록 할수 없습니다.',
    });
  }
};
//댓글삭제
const deleteComment = async (req, res) => {
  try {
    const userId = res.locals.user.userId;
    const { boardId, commentId } = req.params;
    const exComment = await Comment.findOne({
      where: {
        boardId: boardId,
        commentId: commentId,
        userId: userId,
      },
    });
    if (exComment) {
      await Comment.destroy({ where: { boardId: boardId, commentId: commentId, userId: userId } });
      res.status(200).json({ result: 'success', commentId });
    } else {
      res.status(202).json({
        result: 'false',
        msg: '삭제할수 없는 comment입니다.',
      });
      return
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({
      result: 'fail',
      msg: '댓글삭제 실패.',
    });
  }
};
//댓글수정
const editComment = async (req, res) => {
  try {
    const userId = res.locals.user.userId;
    const { boardId, commentId } = req.params;
    const { comment } = req.body;
    
    const exComment = await Comment.findOne({
      where: {
        boardId: boardId,
        commentId: commentId,
        userId: userId,
      },
    });
    if (exComment) {
      console.log(exComment);
      if (exComment) {
        await Comment.update(
          {
            comment: comment,
          },
          {
            where: {
              boardId: boardId,
              commentId: commentId,
              userId: userId,
            },
          }
        );
        res.status(200).json({ result: 'success' });
      } else {
        res.status(400).json({ result: 'fail', errormessage: '존재 하지 않는 댓글입니다.' });
      }
    } else {
      //내가 쓴게 아니면
      res.status(400).json({ result: 'fail', errormessage: '수정할수없는 comment입니다.' });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({
      result: 'fail',
      errormessage: '댓글수정  실패.',
    });
  }
};
module.exports = {
  getComment,
  deleteComment,
  writeComment,
  editComment,
};
