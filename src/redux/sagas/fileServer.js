'use strick'

const URL_UPLOAD_FILE_SERVER = 'https://api-media.pro.luci.vn/site/upload';
const URL_DELETE_FILE_SERVER = 'https://api-media.pro.luci.vn/site/del-file';
const KEY_API_APP = '98CPB8ITIRGHVO3OJ5QT';

export function UPLOAD(files) {
  return new Promise((resolve, reject) => {

    if (!files) {
      resolve({
        "success": true,
        "statusCode": 200,
        "message": "Upload thành công",
        "data": {
          "files": [

          ]
        }
      })
      return
    }

    let formData = new FormData();
    if (files instanceof Array) {
      if (files.length == 0) {
        resolve({
          "success": true,
          "statusCode": 200,
          "message": "Upload thành công",
          "data": {
            "files": [

            ]
          }
        })
        return
      }
      for (let i = 0; i < files.length; i++) {
        formData.append('UploadForm[files][]', { uri: files[i].url, name: files[i].name.replace(/ /gi, '_'), type: 'multipart/form-data' });

      }
    } else {
      formData.append('UploadForm[files][]', { uri: files.url, name: files.name.replace(/ /gi, '_'), type: 'multipart/form-data' });
    }

    fetch(URL_UPLOAD_FILE_SERVER, {
      headers: {
        'X-Luci-Api-Key': KEY_API_APP,
        'accept': 'application/json',

      },
      method: 'POST',
      body: formData
    })
      .then((res) => { return res.json(); })
      .then(json => {
        resolve(json)
      })
      .catch(e => {
        reject(e)
      })
  })
}

export function DELETE_FILES(files) {
  console.log('DELETE_FILES ', files)
  return new Promise((resolve, reject) => {
    fetch(URL_DELETE_FILE_SERVER,
      {
        // mode: 'no-cors',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-Luci-Api-Key': KEY_API_APP,
        },
        method: 'POST',
        body: JSON.stringify({ files })
      })
      .then((res) => res.json())
      .then(json => {
        console.log('DELETE_FILES res::', json)
        resolve(json)
      })
      .catch(e => {
        console.log('/site/del-file', e)
        reject(e)
      })
  })
}
