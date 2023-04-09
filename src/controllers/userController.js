const userService = require('../service/userService');
const jwt = require('jsonwebtoken');
require('dotenv').config(__dirname+'../../');

const userController = {

    login: async (req, res) =>{
        console.log('User Controller: Login');
        const {email, password} = req.body;
        try {
            const user = await userService.getUserByEmail(email);
            if (user.password = password) {
                delete user.password;
                const token = jwt.sign(user, process.env.JWT_THE_SECRET);
                res.cookie('session', token);
                res.status(200).json({'message': 'Logged in'});
            } else {
                res.status(400).json({'message': 'Wrong E-mail'});
            }
        } catch (err) {
            res.status(400).json({message: 'Wrong Password'});
        }
    },
};

module.exports = userController;
