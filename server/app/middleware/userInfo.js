'use strict';

const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const publicKey = fs.readFileSync(path.join(__dirname, '../public/publicKey.pub'));

module.exports = () => (ctx, next) => {
  if (ctx.header.authorization) {
    const token = ctx.get('authorization').split(' ')[1];
    
    if (token) {
      const { userId } = jwt.verify(token, publicKey);
      if (userId) {
        ctx.user = {
          token,
          userId,
        }
      }
    }
  }
  return next();
};
