
const request = require('./request.js');
const store = require('./store.js');

let callbackFn;
const wxLogin = function (callback) {//微信登录
    callback ? callbackFn = callback : '';
    wx.login({
        success: function (res) {
            if (res.code) {
                logincodeFn(res.code);

            } else {
                console.log('获取用户登录态失败！' + res.errMsg)
            }
        }
    });
}
const wxGetUserInfo = function () {//微信获取用户信息 code
    wx.getUserInfo({
        withCredentials: false,
        success: function (data) {
            store.set('userInfo', data.userInfo);
            userupdate(data.userInfo);
        },
        fail: function () {
            showAuthModelFn();
            console.info("2授权失败返回数据");
        }
    });
}
const wxCheckSession = function (callback) {//检测当前用户登录态是否有效
    callback ? callbackFn = callback : '';
    wx.checkSession({
        success: function () {
            //session 未过期，并且在本生命周期一直有效
            wxGetUserInfo();
        },
        fail: function () {
            //登录态过期
            wxLogin() //重新登录
        }
    })
}
const wsOpenSetting = function () { //微信授权设置
    wx.openSetting({
        success: function (data) {
            if (data) {
                if (data.authSetting["scope.userInfo"] == true) {
                    // loginStatus = true;
                    wxLogin();
                } else {
                    showAuthModelFn();
                }
            }
        },
        fail: function () {
            console.info("设置失败返回数据");
        }
    });
}
const logincodeFn = function (code) {//自己后台登录
    let that = this;
    request.post('/v1.0/joy-poker/user/logincode', { code: code }, function (data) {
        store.set('token', data.token);
        store.set('id', data.id);
        store.set('operatorFlag', data.operatorFlag);
        wxGetUserInfo();
        // that.userupdate();
    })
}
const showAuthModelFn = function () {//提醒授权弹窗
    wx.showModal({
        title: '授权提示',
        content: '小程序需要您的微信授权才能使用哦~\r\n是否重新授权?',
        showCancel: false,
        success: function (res) {
            if (res.cancel) {
                console.log('用户点击取消')
            } else if (res.confirm) {
                wsOpenSetting();
            }
        }
    });
}
const userupdate = function (userInfo) {//上传用户信息 需要taken 和 userInfo
    request.post('/v1.0/joy-poker/user/userupdate', userInfo, function (data) {
        callbackFn && callbackFn();
    }, function (data) {
        if (data && data.code == -2) {
            wxLogin();
        }
    })
}
module.exports = {
    wxLogin: wxLogin,
    wxCheckSession: wxCheckSession,
}