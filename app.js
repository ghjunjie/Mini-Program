//app.js
const dialog = require('./utils/dialog.js');

App({
    onLaunch: function () {
        // 展示本地存储能力
        // var logs = wx.getStorageSync('logs') || []
        // logs.unshift(Date.now())
        // wx.setStorageSync('logs', logs);

        var userInfo = wx.getStorageSync('userInfo') || {};
        // logs.unshift(Date.now())
        // wx.setStorageSync('logs', logs);

        // 登录
        // wx.login({
        //     success: res => {
        //         const ggg = res;
        //         wx.showToast({
        //             title: '登录成功' + this.globalData.userInfo,
        //         })
        //         // 发送 res.code 到后台换取 openId, sessionKey, unionId
        //     }
        // });

        wx.checkSession({
            success: function () {
                //session 未过期，并且在本生命周期一直有效
            },
            fail: function () {
                //登录态过期
                wx.login() //重新登录
            }
        })

        var authRefuseCount = 0;
        var that = this;
        wx.login({

            success: function (res) {
                var code = res.code;
                wx.getUserInfo({
                    success: function (res) {
                        wx.showToast({
                            title: '成功1',
                        })
                        wx.setStorageSync('userInfo', res.userInfo);
                        that.globalData.userInfo = res.userInfo;
                    },
                    fail: function (res) {

                        //平台登录
                        wx.showToast({
                            title: '失败1',
                        })
                        that.globalData.getUserInfoFail = true;
                        authRefuseCount++;
                        if (authRefuseCount == 1) {
                            dialog.open('授权提示', '小程序需要您的微信授权才能使用哦~\r\n是否重新授权?', function () {
                                wx.getSetting({
                                    success: (res) => {
                                        /*
                                         * res.authSetting = {
                                         *   "scope.userInfo": true,
                                         *   "scope.userLocation": true
                                         * }
                                         */
                                    }
                                })
                            }, true);

                        }
                    }
                })
            }
        })

        // 获取用户信息
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                        success: res => {
                            wx.showToast({
                                title: '获取用户信息1',
                            })
                            // 可以将 res 发送给后台解码出 unionId
                            this.globalData.userInfo = res.userInfo

                            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                            // 所以此处加入 callback 以防止这种情况
                            if (this.userInfoReadyCallback) {
                                this.userInfoReadyCallback(res)
                            }
                        }
                    })
                }
            },
            fail: (res) => {
                wx.showToast({
                    title: '授权失败' + this.globalData.userInfo,
                })
            }
        })
    },
    wxlogin:function(){

    },
    globalData: {
        userInfo: null
    }
})