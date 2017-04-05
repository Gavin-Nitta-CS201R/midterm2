var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var ReadingList = mongoose.model('ReadingList');

router.get('/list', function (req, res, next) {
	ReadingList.find(function (err, list) {
		if (err) { return next(err); }
		res.json(list);
	});
});

router.param('item', function (req, res, next, id) {
	var query = ReadingList.findById(id);
	query.exec(function (err, item) {
		if (err) { return next(err); }
		if (!item) { return next(new Error("can't find item")); }
		req.item = item;
		return next();
	});
});

router.put('/list/:item/upvote', function (req, res, next) {
	req.item.upvote(function (err, list) {
		if (err) { return next(err); }
		res.json(list);
	});
});

router.delete('/list/:item/delete', function (req, res, next) {
	console.log(req.item);
	req.item.delete(function (err, list) {
		if (err) { return next(err); }
		res.json(list);
	});
});

router.post('/list', function (req, res, next) {
	var list = new ReadingList(req.body);
	list.save(function (err, list) {
		if (err) { return next(err); }
		res.json(list);
	});
});

/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index', { title: 'Express' });
});

module.exports = router;
