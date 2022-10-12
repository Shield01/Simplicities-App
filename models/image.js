const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    image_name: { type: String },
    image: { type: String },
    createdAt: { type: Date, default: Date.now() }
});

module.exports = mongoose.model("Images", imageSchema);