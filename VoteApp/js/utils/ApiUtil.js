/**
 * Created by ShiRan on 2018/4/17.
 */
let promiseRetry = require('./PromiseRetry');
export function createParams(params) {
  return JSON.stringify(params);
}

export function callAPI(url, params, config){
  let method = config.method || 'POST';

  let option = {method: method};

  if (['GET', 'PUT'].indexOf(method) > -1) {
    let queryArr = Object.keys(params).map((k)=> {
      return k + '=' + encodeURI(params[k]);
    });
    let queryStr = queryArr.join('&');
    url = url + '?' + queryStr;
  } else {
    let arg = createParams(params);
    option = {
      method: method,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: arg
    };
  }

  let fetchJson = ()=> {
    return fetch(url, option).then(resp => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw resp.status;
      }
    }).catch(err => {
      console.log('err:', err);
    })
  };

  let promiseRetrys = promiseRetry(fetchJson, config).then(json => {
    return json;
  }).catch(err => {
    return {};
  });

  let promiseTimeout = new Promise((resolve, reject)=> {
    setTimeout(function () {
      reject('timeout');
    }, 10 * 1000);
  });

  return Promise.race([promiseRetrys, promiseTimeout]);
}

export function uploadImage(url, img, params) {
  return new Promise(function (resolve, reject) {
    let formData = new FormData();
    for (let key in params) {
      formData.append(key, params[key]);
    }
    let uri = img;
    let index = uri.lastIndexOf('\/');
    let name  = uri.substring(index + 1, uri.length);
    let file = {uri: uri, type: 'multipart/form-data', name: name};
    formData.append('image', file);
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    }).then((response) => {
      return response.json();
    }).then((responseData)=> {
      resolve(responseData);
    }).catch((err)=> {
      reject(err);
    });
  });
}