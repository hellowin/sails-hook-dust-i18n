module.exports = function (sails) {

  return {
    initialize: function (cb) {

      //load core hooks dependencies
      var waitFor = ['hook:i18n:loaded', 'hook:views:loaded'];
      sails.after(waitFor, function () {
        var errMessage = null;
        //define dust
        var dust = sails.config.views.engine.dust || null;
        if (!dust) {
          try {
            dust = require('dust');
          } catch (err) {
            try {
              dust = require('dustjs-helpers');
            } catch (err) {
              dust = require('dustjs-linkedin');
            }
          }
        }
        if (!dust) {
          errMessage = 'make sure you have dust.js template engine installed';
          try {
            sails.log.error(errMessage);
          } catch (e) {
            console.error(errMessage);
          }
          return cb();
        }

        //define sails i18n
        var i18n = sails.__ || null;
        if (!i18n) {
          errMessage = 'make sure you activate sails i18n hook';
          try {
            sails.log.error(errMessage);
          } catch (e) {
            console.error(errMessage);
          }
          return cb();
        }

        //define helpers
        dust.helpers.i18n = function (chunk, context, bodies, params) {

          //define arguments if any
          var args = [];
          try {
            args = JSON.parse(params.args.replace(/'/g, '"'));
          } catch (err) {
          }

          //if using body block
          //TODO: how to use it synchronously?
          if (bodies.block) {
            return chunk.capture(bodies.block, context, function (string, chunk) {
              args.unshift(string);
              var result = i18n.apply(context.stack.head, args);
              chunk.end(result);
            });
          }
          //if using t parameter
          else if (typeof params.t === 'string') {
            args.unshift(params.t);
          }
          //else
          else {
            args.unshift('');
          }

          var result = i18n.apply(context.stack.head, args);
          chunk.write(result);

          return chunk;
        };

        dust.helpers.__ = dust.helpers.i18n;

        return cb();
      });
    }
  };

};