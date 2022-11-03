/**
  * Creates an XMLHttpRequest instance as a promise for use with async/await
  */
export const promisedXHR = (method, uri, data = null, mimeType = 'application/json') => {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open(method, `${uri?uri:''}`);
    // xhr.overrideMimeType(mimeType);
    xhr.setRequestHeader('Content-Type', mimeType);
    xhr.onload = () => {
      if (this.status >= 200 && this.status < 300) {
        resolve(xhr.response);
      } else {
        reject({
          status: this.status,
          statusText: xhr.statusText
        });
      };
    };
    xhr.onerror = () => {
      reject({
        status: this.status,
        statusText: xhr.statusText
      });
    };
    xhr.send(data);
  });
};
