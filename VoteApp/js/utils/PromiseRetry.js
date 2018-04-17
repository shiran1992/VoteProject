/**
 * Created by ShiRan on 2018/4/17.
 */
var _delay = function (ms) {
  return new Promise(function (resolve, reject) {
    setTimeout(resolve, ms);
  })
};

var _retry = function (retryCount, maxRetry, fn, retryDelay) {
  retryCount = retryCount || 1;
  var retryMechanism = function (err) {
    if (retryCount > maxRetry) {
      throw err;
    }
    return _delay(retryDelay).then(_retry.bind(null, retryCount + 1, maxRetry, fn, retryDelay));
  };
  return fn().then(null, retryMechanism);
};

module.exports = (fn, config) => {
  return _retry(1, config.max_retry || 3, fn, config.retry_delay || 1000);
};