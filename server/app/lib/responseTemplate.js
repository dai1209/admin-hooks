'use strict';
module.exports = {
  businessError(ctx, msg) {
    ctx.body = {
      statusCode: 500,
      msg,
      data: null,
    };
  },
  success(ctx, data) {
    ctx.body = {
      statusCode: 200,
      msg: '',
      data,
    };
  },
};
