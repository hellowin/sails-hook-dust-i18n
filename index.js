module.exports = function (sails) {

  return {
    initialize: function (cb) {

      sails.after('hook:i18n:loaded', function () {
        var dust = null;
        try {
          dust = require('dust');
        } catch (err) {
          try {
            dust = require('dustjs-helpers');
          } catch (err) {
            dust = require('dustjs-linkedin');
          }
        }

        dust.helpers.i18n = function (chunk, context, bodies, params) {
          if (bodies.block) {
            return chunk.capture(bodies.block, context, function (string, chunk) {
              var result = sails.__(string);

              chunk.end(result);
            });
          }

          return chunk;
        };

        dust.helpers.__ = dust.helpers.i18n;

        return cb();
      });
    }
  };

};