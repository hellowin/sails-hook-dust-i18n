module.exports = function (sails) {
  //define sails i18n
  var i18n = sails.__ || null;
  if (!i18n) {
    var errMessage = 'make sure you activate sails i18n hook';
    try {
      sails.log.error(errMessage);
    } catch (e) {
      console.error(errMessage);
    }
    return cb();
  }

  return function (chunk, context, bodies, params) {

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
};