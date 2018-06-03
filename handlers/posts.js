const PostsModel = require('../models/post');
const ObjectId = require('mongoose').Schema.Types.ObjectId;

const PostsHandler = function () {
  this.getAllPosts = function (req, res, next) {
    PostsModel.find({}, function (err, result) {
      if (err) {
        return next(err);
      }
      res.status(200).send({ data: result });
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

      res.status(201).send(result);
    })
  };
  this.deletePost = function (req, res, next) {
        var id = req.params.id;

        PostsModel.findByIdAndRemove(id, function (err, result) {
            if (err) {
                return next(err);
            }

            res.status(200).send({updated: result});
        })
    };
  this.getPostsWithUser = function (req, res, next) {
    let body = req.body;
    let count = body.count || 20;
    let page = body.page || 1;
    let userId = req.session.userId;
    body.userId = userId;

    let skip = count * (page - 1);
    let limit = count;

    PostsModel.aggregate([{
      $match: {
        _id: userId
      }
    }, {
      $project: {
        title: 1,
        userId: 1
      }
    }, {
      $lookup: {
        from: 'users',
        localField: 'userId',
        foreignField: '_id',
        as: 'userId'
      }
    }, {
      $project: {
        year: {$year: '$date'},
        title: 1,
        userId: { $arrayElemAt: ['$userId', 0] }
      }
    }, {
      $sort: {
        title: -1
      }
    },{
      $group: {
        _id: null,
        count: { $sum: 1 }
      }
    }, {
      $skip: skip
    }, {
      $limit: limit
    }], function (err, result) {
      if (err) {
        return next(err);
      }

      res.status(200).send({ data: result });
    })
  };

};

module.exports = PostsHandler;