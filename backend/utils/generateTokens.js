const jwt = require('jsonwebtoken');
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    const token = jwt.sign({ userId: id }, process.env.JWT_SECRET, { expiresIn: maxAge });
    return token;
}


module.exports = {
    createToken
}