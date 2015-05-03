module.exports = function (sails) {

  return {
    initialize: function (cb) {

      //load core hooks dependencies
      var waitFor = ['hook:i18n:loaded', 'hook:views:loaded'];
      sails.after(waitFor, function () {
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
          var errMessage = 'make sure you have dust.js template engine installed';
          try {
            sails.log.error(errMessage);
          } catch (e) {
            console.error(errMessage);
          }
          return cb();
        }

        //define helpers
        dust.helpers.i18n = require('./helpers/i18n')(sails);
        dust.helpers.__   = dust.helpers.i18n;

        return cb();
      });
    }
  };

};