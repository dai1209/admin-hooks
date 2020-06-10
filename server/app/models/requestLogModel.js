'use strict';
const path = require('path');

const low = require('lowdb');
const lodashId = require('lodash-id');
const FileAsync = require('lowdb/adapters/FileAsync');
const dbFile = path.join(__dirname, '../db/request_log_db.json');
const adapter = new FileAsync(dbFile);
let instance;

module.exports = {
  init(context) {
    return new Promise(resolve => {
      if (instance === undefined) {
        low(adapter).then(db => {
          db._.mixin(lodashId);
          instance = db;
          resolve(db.get(context));
        });
      } else {
        resolve(instance.get(context));
      }
    });
  },
  read() {
    return new Promise(resolve => {
      if (instance === undefined) {
        resolve();
      } else {
        instance.read().then(() => {
          resolve();
        });
      }
    });
  },
};

