const PostsModel = require('../models/post');
const ObjectId = require('mongoose').Schema.Types.ObjectId;

const PostsHandler = function () {
    this.getAllPosts = function (req, res, next) {
        PostsModel.find({}, function (err, result) {
            if (err) {
                return next(err);
            }

            res.status(200).send({data: result});
        })
    };

    this.createPost = function (req, res, next) {
        let body = req.body;
        let userId = req.session.userId;
        let postModel;

        body.userId = userId;
        postModel = new PostsModel(body);

        postModel.save(function (err, result) {
            if (err) {
                return next(err);
            }

            res.status(201).send({data: result});
        })
    };

    this.getUsersPosts = function (req, res, next) {
        let userId = req.session.userId;

        PostsModel
          .find({"userId":userId})
          .exec(function (err, result) {
            if (err) {
              return next(err);
            }
            res.status(200).send({ data: result });
          })

        };

    this.upload = function (req, res, next) {
        res.status(200).send({data: 'uploaded'});
    };

    this.deletePost = function (req, res, next) {
        let id = req.params.id;
        PostsModel.findByIdAndRemove(id, function (err, result) {
            if (err) {
                return next(err);
            }

            res.status(200).send({updated: result});
        })
    };

};

module.exports = PostsHandler;