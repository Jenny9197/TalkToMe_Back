const Jwt = require('jsonwebtoken');
// import * as dotenv from "dotenv"
// dotenv.config();

class UserFunc {
  googleCallback = async (req, res) => {
    try {
      console.log("넘어와찌롱");
      console.log("-----------------------------------------");
      const user = req.user;
      const userId = user.userId
      const token = Jwt.sign({ userId }, process.env.SECRET_KEY, { expiresIn: "1d" });
      const message = "로그인에 성공하였습니다.";
      res.status(201).send({ message, token });
    } catch (error) {
      console.log(error);
      const message = "알 수 없는 문제가 발생했습니다. 잠시 후 다시 시도해주세요.";
      res.status(500).send({ message });
    }
  }
};
module.exports = new UserFunc()