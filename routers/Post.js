const router = require('express').Router();

const { verifyAccessToken } = require('../Helper/jwt_helper')
router.get('/', verifyAccessToken, (req, res) => {
    res.json({success: true, message: 'Access verify'});

});
module.exports = router;