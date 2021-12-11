const { Board, User } = require("../models")
//const { Sequelize } = require("../models");

const postCreate =  async (req, res) => {
    try {
        const userId = res.locals.user;
        const { boardTitle, boardContent } = req.body;
        
        //const post = await User.findByPk(userId);
        const date = new Date();

        const postBox = await Board.create({
            boardTitle,
            boardDesc:boardContent,
            userId
        });

        message = "게시물 작성에 성공했습니다.";
        return res.status(200).send({
            //post,
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



//router.post('/write',  boardCtrl.postCreate);

module.exports = { postCreate };