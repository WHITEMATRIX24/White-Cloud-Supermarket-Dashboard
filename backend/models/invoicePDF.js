const mongoose = require('mongoose');

const PDFSchema = new mongoose.Schema({
  data: Buffer,
  contentType: String
});

const PDF = mongoose.model('PDF', PDFSchema);
module.exports = PDF;