const mongoose = require('mongoose');

// Define Schemes
const userSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  password: { type: String, required: true }
},
{
  timestamps: true
});

// Create new user document
userSchema.statics.create = function (payload) {
  // this === Model
  const user = new this(payload);
  // return Promise
  return user.save();
};

// Find All
userSchema.statics.findAll = function () {
  // return promise
  return this.find({});
};

// Find One by userId
userSchema.statics.findOneByuserId = function (userId) {
  return this.findOne({ userId });
};

// Update by userId
userSchema.statics.updateByuserId = function (userId, payload) {
  // { new: true }: return the modified document rather than the original. defaults to false
  return this.findOneAndUpdate({ userId }, payload, { new: true });
};

// Delete by userId
userSchema.statics.deleteByuserId = function (userId) {
  return this.remove({ userId });
};

// Create Model & Export
module.exports = mongoose.model('user', userSchema);