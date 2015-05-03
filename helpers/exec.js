module.exports = function (sails, cb) {
  return function (chunk, context, bodies, params) {
    var errMessage = null;
    var args       = null;
    try {
      args = JSON.parse(params.args.replace(/'/g, '"'));
    } catch (e) {
      args = [];
    }
    var object = context.stack.head;

    params.func.split('.').some(function (property) {
      if (typeof(object[property]) === "function") {
        var result = object[property].apply(object, args);
        chunk.write(result);
        return true;
      } else {
        errMessage = 'your given \'func\' parameter is not function';
        try {
          sails.log.error(errMessage);
        } catch (e) {
          console.error(errMessage);
        }
        object = object[property];
        return false;
      }
    });

    return chunk;
  };
};