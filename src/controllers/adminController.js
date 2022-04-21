const User = require("../db/Model/User");

exports.getUsers = async (req, res, next) => {
    try {
        let users = await User.find({});
        res.status(200).send(users);
    } catch (error) {
        res.status(403).send(error);
    }
};