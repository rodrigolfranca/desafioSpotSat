const jwt = require('jsonwebtoken');
require('dotenv').config(__dirname+'../../');


const jwtChecker = (req, res, next) => {
    console.log('Middleware: Checando token');
    console.log(req);

    try {
        const jwtdata = jwt.verify(
            req.cookies.session,
            process.env.JWT_THE_SECRET,
        );
        req.body.jwtdata = jwtdata;
        next();
    } catch (err) {
        res.status(401).json({message: 'Acesso não autorizado.'});
    }
};

module.exports = jwtChecker;
