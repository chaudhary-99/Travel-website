const mongoose = require('mongoose');

const PackageSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  basePrice: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  longDescription: {
    type: String,
  },
  image: {
    type: [String],
    required: true,
  },
});

const Package = mongoose.model('fixedPackage', PackageSchema);

module.exports = Package;
