const JWT = require('jsonwebtoken')
const dotenv=require('dotenv');
dotenv.config();

const  verifyAccessToken= (req, res, next) => {
    if (!req.headers['authorization']) return  res.status(403).send('Unauthorized');
    const authHeader = req.headers['authorization']
    const bearerToken = authHeader.split(' ')
    const token = bearerToken[1]
    JWT.verify(token, process.env.API_SECRET, (err, payload) => {
        if (err) {
             return  res.status(403).send('Unauthorized');
        }
        req.payload = payload
        next()
    })
};

module.exports.verifyAccessToken = verifyAccessToken;