const UsersModel = require('../models/user');
const sha256 = require('crypto-js/sha256');
var UsersHandler = function () {
    function getUserProjection(userModel) {
        var user = userModel.toJSON();
        return {
            name: user.name,
            email: user.email
        }
    }

    this.getAllUsers = function (req, res, next) {
        UsersModel.find({}, function (err, result) {
            if (err) {
                return next(err);
            }

            res.status(200).send({data: result});
        })
    };

    this.getCurrentUser = function (req, res, next) {
        var userId = req.session.userId;
        var type = req.query.type;

        console.log(type);

        UsersModel.findById(userId, function (err, result) {
            if (err) {
                return next(err);
            }

            res.status(200).send({user: result});
        })
    };

    this.createUser = function (req, res, next) {
        var body = req.body;
        var userModel = new UsersModel(body);

        userModel.save(function (err, result) {
            if (err) {
                return next(err);
            }

            res.status(201).send(result);
        })
    };

    this.updateUser = function (req, res, next) {
        var body = req.body;
        var id = req.params.id;

        UsersModel.findByIdAndUpdate(id, body, {new: true}, function (err, result) {
            if (err) {
                return next(err);
            }

            res.status(200).send({updated: result});
        })
    };

    this.deleteUser = function (req, res, next) {
        var id = req.params.id;

        UsersModel.findByIdAndRemove(id, function (err, result) {
            if (err) {
                return next(err);
            }

            res.status(200).send({updated: result});
        })
    };

    this.signUp = function (req, res, next) {
        let body = req.body;
        let name = body.name;
        let email = body.email;
        let pass = body.pass;
        let err = new Error();

        err.status = 500;
        err.message = 'Password is required';

        if (!pass) {
            return next(err)
        }

        UsersModel.find({email: email}).count(function (error, count) {
            if (error) {
                return next(error);
            }

            if (count) {
                err.message = "This email is already used";
                return next(err)
            }

            body.pass = sha256(body.pass);

            let user = new UsersModel(body);

            user.save(function (err, result) {
                if (err) {
                    return next(err);
                }

                res.status(201).send(result)
            })

        })
    };

    this.signIn = function (req, res, next) {
        let body = req.body;
        let email = body.email;
        let pass = body.pass;
        let cryptedPass = sha256(pass);

        cryptedPass = cryptedPass.toString();

        if (!pass) {
            let err = new Error();
            err.status = 500;
            err.message = "Password is required";
            return next(err)
        }
        UsersModel.findOne({email: email, pass: cryptedPass}, function (err, user) {
            if (err) {
                return next(err);
            }
            if (!user) {
                let err = new Error();
                err.message = 'Incorrect email or password';
                err.status = 401;
                return next(err);
            }
            req.session.userId = user._id;
            req.session.loggedIn = true;

            res.status(200).send(getUserProjection(user));
        })

    };

    this.logout = function (req, res, next) {
        res.status(200).send({logout: 'success'});
    };
};

module.exports = UsersHandler;