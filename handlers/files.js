const FilesModel = require('../models/file');
const ObjectId = require('mongoose').Schema.Types.ObjectId;

let FilesHandler = function () {
  this.getAllFiles = function (req, res, next) {
    FilesModel.find({}, function (err, result) {
      if (err) {
        return next(err);
      }

      res.status(200).send({ data: result });
    })
  };

  this.createFile = function (req, res, next) {
    let body = req.body;
    let postId = req.session.postId;
    let userId = req.session.userId
    let fileModel;

    body.userId = userId;
    body.postId = postId;

    fileModel = new FilesModel(body);

    fileModel.save(function (err, result) {
      if (err) {
        return next(err);
      }

      res.status(201).send(result);
    })
  };

  this.getFilesWithUser = function (req, res, next) {

    let body = req.body;
    let count = body.count || 20;
    let page = body.page || 1;

    let skip = count * (page - 1);
    let limit = count;

    FilesModel.aggregate([{
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
    }, {
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

module.exports = FilesHandler;