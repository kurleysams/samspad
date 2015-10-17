'use strict';

var log = require('debug')('teesams:mixin:timestamp');

function timestamp(Model, options) {

  log('Timestamp mixin for Model %s', Model.modelName);

  var createdAt = options.createdAt || 'createdAt';
  var updatedAt = options.updatedAt || 'updatedAt';
  var required = options.required === undefined ? true : options.required;

  log('createdAt', createdAt, options.createdAt);
  log('updatedAt', updatedAt, options.updatedAt);

  Model.defineProperty(createdAt, { type: Date, required: required, defaultFn: 'now' });
  Model.defineProperty(updatedAt, { type: Date, required: required });

  Model.observe('before save', function event(ctx, next) {
    log('ctx.options', ctx.options);
    if (ctx.options && ctx.options.skipUpdatedAt) { return next(); }
    if (ctx.instance) {
      log('%s.%s before save: %s', ctx.Model.modelName, updatedAt, ctx.instance.id);
      ctx.instance[updatedAt] = new Date();
    } else {
      log('%s.%s before update matching %j', ctx.Model.pluralModelName, updatedAt, ctx.where);
      ctx.data[updatedAt] = new Date();
    }
    next();
  });
}

module.exports = timestamp;