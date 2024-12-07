const mongoose = require('mongoose');

const tag_Schema = new mongoose.Schema({
    tags: String,
});

const Tag = mongoose.model('Tag', tag_Schema);

module.exports = Tag;