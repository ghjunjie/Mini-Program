
const baseHostUrl = 'https://xxx.xxx.com/bonus';

let baseData = {
    "requestBody": {
        "data": {}
    },
    "requestHead": {
        "appId": "",
        "appVersion": "",
        "channel": "",
        "configVersion": "",
        "deviceId": "",
        "ostype": "",
        "phoneModel": "",
        "phoneResolution": "",
        "systemVersion": "",
        "token": "",
        "id": "",
        "validateTime": ""
    }
};
function post(url, data, successCallback, failCallback, completeCallback) {
    if (typeof (url) === 'object') { // 兼容json格式的参数
        opt = url;
        url = opt.url;
        data = opt.data;
        successCallback = opt.success;
        failCallback = opt.fail;
        completeCallback = opt.complete;
    }
    baseData.requestBody.data = data;
    if (url != '/v1.0/joy-poker/user/logincode' && url == '/v1.0/joy-poker/user/userupdate') {
        baseData.requestHead.token = wx.getStorageSync('token')
        baseData.requestHead.id = wx.getStorageSync('id')
    }


    wx.request({
        url: baseHostUrl + '' + url,
        data: baseData,
        method: 'POST',
        header: {
            'Content-Type': 'application/json'
        },
        success: function (res) {
            console.log(res.data);
            if (res.data && res.data.code == 1 && res.data.responseBody && res.data.responseBody.code == 1) {
                successCallback && successCallback.call(null, res.data.responseBody.data);
            } else if (res.data && res.data.code == 1 && res.data.responseBody && res.data.responseBody.code == -2) {
                failCallback && failCallback.call(null, { code: -2 })
            } else {
                let message;
                if (res.data && res.data.message && res.data.responseBody && res.data.responseBody.message) {
                    message = res.data.responseBody.message
                } else if (res.data && res.data.message) {
                    message = res.data.message
                }
                wx.showToast({
                    icon: 'none',
                    title: message || '请求失败',
                })
            }

        },
        fail: function (err) {
            console.log('fail');
            failCallback && failCallback.call(err);
        },
        complete: function (data) {
            completeCallback && completeCallback.call(data);
        }
    });
}
const easyPost = function (url, param, successCallback, failCallback, completeCallback) {
    wx.request({
        url: baseHostUrl + '' + url,
        data: param,
        method: 'POST',
        header: {
            'Content-Type': 'application/json'
        },
        success: function (res) {
            successCallback && successCallback.call(null, res.data);
        },
        fail: function (err) {
            console.log('fail');
            failCallback && failCallback.call(err);
        },
        complete: function (data) {
            completeCallback && completeCallback.call(data);
        }
    });
}
module.exports = {
    post: post,
    easyPost: easyPost
};