var Thread = require('../models/thread.js');
var Post = require('../models/post.js');



exports.post = function(req, res) {
    new Thread({title: req.body.title, author: req.body.author}).save();
	console.log(req.body);
	var validPost = (req.body.hasOwnProperty('title') && req.body.hasOwnProperty('author'));
	res.send(JSON.stringify({'result':validPost?'success':'failure'}));
}

exports.list = function(req, res) {
  Thread.find(function(err, threads) {
    res.send(threads);
  });
}

// first locates a thread by title, then locates the replies by thread ID.
exports.show = (function(req, res) {
    Thread.findOne({title: req.params.title}, function(error, thread) {
        var posts = Post.find({thread: thread._id}, function(error, posts) {
          res.send([{thread: thread, posts: posts}]);
        });
    })
});