const { Board, BoardLike, User, Comment } = require("../models")
const { sequelize } = require("../models");

//고민 작성 페이지 - 게시글 작성
const postCreate =  async (req, res) => {
    try {
        const userId = res.locals.user;
        const { boardTitle, boardContent } = req.body;
        
        const date = new Date();

        const postBox = await Board.create({
            boardTitle,
            boardDesc,
            userId
        });

        message = "게시물 작성에 성공했습니다.";
        return res.status(200).send({
            postBox,
            message,
            date,
        })
    } catch (error) {
        console.log(error);
        return res.status(400).send(() => {
            result: 'fail';
            msg: "알 수 없는 문제가 발생했습니다.";
        })
    }
}

//고민 상세 페이지 - 게시글 상세 조회

const postView = async (req, res) => {
    try {
        const userId = res.locals.user;
        const { boardId }= req.params;
        const boardList = await Board.findAll({
            where: { boardId },
            attributes: ['boardId', 'boardTitle', 'boardDesc'],
        });
        return res.status(200).send({
            boardList,
            userId,
        })
    } catch (error) {
        console.log(error);
        return res.status(400).send(() => {
            result: 'fail';
            msg: "알 수 없는 문제가 발생했습니다.";
        })
    }
}


//게시글 좋아요/취소
const postOrLike = async (req, res) => {
    try {
        const { boardId } = req.params;
        const userId = res.locals.user;
        //console.log(boardId, userId);

        const postLike = await BoardLike.findOne({
            where: { userId, boardId },
        })
        if(!postLike) {
            await BoardLike.create({
                userId, boardId
            })
            message = "게시글 좋아요.";
            return res.status(200).send({
                isLiked : true,
                message,
            })
        } else {
            await BoardLike.destroy({
                where: { userId, boardId },
            });

            message = "게시물 좋아요 취소";
            return res.status(200).send({
                isLiked : false,
                message,
            })
        }
    } catch (error) {
        console.log(error);
        message = "관리자에게 문의해주세요";
        return res.status(500).send({ message });
    }
}

//게시물 메인 페이지 조회파트
const postMainView = async (req, res) => {
    try {
        const userId = res.locals.user;
        //쿼리방식으로 sort 진행할 것
        let { sort }= req.query; 
        console.log(sort);
        const date = new Date();
        const commentCount = await Comment.count({
            where: Comment.commentId,
        })  
        const boardViewList = await Board.findOne({
            attributes: ['boardId', 'boardTitle', 'boardViewCount'],
            // include : [
            //     {
            //         model: Comment,
            //         order: [[sequelize.literal('COUNT(Comment.commentId)'), "ASC"]]
            //     },
            // ],
        });
        boardViewList.dataValues.commentCount = commentCount,
        boardViewList.dataValues.date = date,
        //console.log(postViewList);
        
        res.status(200).send({
            boardViewList,
            userId,
        })
    } catch (error) {
        console.log(error);
        return res.status(400).send(() => {
            result: 'fail';
            msg: "알 수 없는 문제가 발생했습니다.";
        })
    }
}

module.exports = { postCreate, postView, postOrLike, postMainView };