exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        console.log(req.user.dataValues.userId);
        res.locals.user = req.user.dataValues.userId
        next();
    } else {
        console.log(req)
        res.status(403).send('로그인이 필요합니다.');
    }
};

exports.isNotLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        console.log('!')
        next();
    } else {
        const message = encodeURIComponent('로그인한 상태입니다.');
        res.redirect(`/?error=${message}`);
    }
};