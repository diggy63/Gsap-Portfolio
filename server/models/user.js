const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const SALT_ROUNDS = 6;

const userSchema = new mongoose.Schema(
    {
      username: { type: String, required: true, lowercase: true, unique: true },
      email: { type: String, required: true, lowercase: true, unique: true },
      password: String,
    },
    {
      timestamps: true,
    }
  ); 




  userSchema.pre("save", function (next) {
    // 'this' will be set to the current document
    const user = this;
    // check to see if the user has been modified, if not proceed
    // in the middleware chain
    if (!user.isModified("password")) return next();
    // password has been changed - salt and hash it
    bcrypt.hash(user.password, SALT_ROUNDS, function (err, hash) {
      if (err) return next(err);
      // replace the user provided password with the hash
      user.password = hash;
      next();
    });
  });



  userSchema.methods.comparePassword = function (tryPassword, cb) {
    console.log(tryPassword);
    // 'this' represents the document that you called comparePassword on
    bcrypt.compare(tryPassword, this.password, function (err, isMatch) {
      if (err) return cb(err);
  
      cb(null, isMatch);
    });
  };

  module.exports = mongoose.model("User", userSchema);

