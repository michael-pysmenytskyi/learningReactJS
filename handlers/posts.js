var PostsModel = require('../models/post');
var ObjectId = require('mongoose').Schema.Types.ObjectId;

var PostsHandler = function () {
  this.getAllPosts = function (req, res, next) {
    PostsModel.find({}, function (err, result) {
      if (err) {
        return next(err);
      }

      res.status(200).send({ data: result });
    })
  };

  this.createPost = function (req, res, next) {
    var body = req.body;
    var userId = req.session.userId;
    var postModel;

    body.userId = userId;

    postModel = new PostsModel(body);

    postModel.save(function (err, result) {
      if (err) {
        return next(err);
      }

      res.status(201).send(result);
    })
  };

  this.getPostsWithUser = function (req, res, next) {
    /*PostsModel
      .find({})
      .populate('userId', { name: 1, _id: 0 })
      .exec(function (err, result) {
        if (err) {
          return next(err);
        }

        res.status(200).send({ data: result });
      })*/

    var body = req.body;
    var count = body.count || 20;
    var page = body.page || 1;

    var skip = count * (page - 1);
    var limit = count;

    PostsModel.aggregate([{
      $match: {
        title: 'Tets',
        _id: ObjectId("sdhajhak"),
        date: new Date()
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
    }, {
      $match: {
        'userId.name': 'Ivan'
      }
    }, /*{
      $group: {
        _id: '$title',
        count: {$sum: 1}
      }
    },*/ {
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

  this.upload = function (req, res, next) {
    res.status(200).send({ data: 'uploaded' });
  }
};

module.exports = PostsHandler;