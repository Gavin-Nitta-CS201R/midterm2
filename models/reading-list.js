var mongoose = require('mongoose');
var ReadingListSchema = new mongoose.Schema({
	session: String,
	pictureUrl: String,
	speaker: String,
	title: String,
	upvotes: { type: Number, default: 0 },
});

ReadingListSchema.methods.upvote = function (cb) {
	this.upvotes += 1;
	this.save(cb);
};

ReadingListSchema.methods.delete = function (cb) {
	this.remove(cb);
};

mongoose.model('ReadingList', ReadingListSchema);