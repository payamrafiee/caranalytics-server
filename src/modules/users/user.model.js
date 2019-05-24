import mongoose from 'mongoose';
import validator from 'validator';
import { passwordReg } from './user.validations';
import { hashSync, compareSync } from 'bcrypt-nodejs';
import jwt from 'jsonwebtoken';
import uniqueValidator from 'mongoose-unique-validator';

import constants from '../../config/constants'

const UserSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      trim: true,
      unique: true,
      required: [true, 'name is required'],
      minlength: [5, 'name must be longer than 5 char'],
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      createIndexes: { unique: true },
      required: [true, 'name is required'],
      validate: {
        validator(email) {
          return validator.isEmail(email);
        },
        message: '{VALUE} is not a valid email',
      },
    },
    password: {
      type: String,
      required: true,
      minlength: [6, 'pass must longer than 6 char'],
      validate: {
        validator(password) {
          return passwordReg.test(password);
        },
        message: '{VALUE} is not a valid password!',
      },
    },
  },
  { timestamps: true },
);

UserSchema.plugin(uniqueValidator, {
  message: '{VALUE} already taken!',
});

UserSchema.pre('save', function(next) {
  if (this.isModified('password')) {
    this.password = this._hashPassword(this.password);
  }

  return next();
});

UserSchema.methods = {
  _hashPassword(password) {
    return hashSync(password);
  },
  authenticateUser(password) {
    return compareSync(password, this.password);
  },
  createToken() {
    return jwt.sign({ id: this._id }, constants.JWT_SECRET);
  },
  toAuthJSON() {
    return {
      _id: this._id,
      userName: this.userName,
      token: `${this.createToken()}`,
    };
  },
  toJSON() {
    return {
      _id: this._id,
      userName: this.userName,
    };
  },
};

export default mongoose.model('User', UserSchema);
