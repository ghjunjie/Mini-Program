//index.js
//获取应用实例
// const app = getApp()
const dialog = require('../../utils/dialog.js');

Page({
    data: {
        userInfo: {},
        hasUserInfo: false,
        authRefuseCount: 0
    },

    onLoad: function () {
        // this.getAuthOfUserInfo()
    },
    getAuthOfUserInfo: function () {
        const that = this;
        wx.getSetting({
            success(res) {
                if (!res.authSetting['scope.userInfo']) {
                    wx.authorize({
                        scope: 'scope.userInfo',
                        success: (res) => {
                            // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
                            //   wx.startRecord()
                            app.globalData.userInfo = res.userInfo
                            this.setData({
                                userInfo: res.userInfo,
                                hasUserInfo: true
                            })
                        },
                        fail: (res) =>  { //调用失败，授权登录不成功
                            that.setData({
                                authRefuseCount: that.data.authRefuseCount + 1
                            })
                            if (that.data.authRefuseCount == 1) {
                                dialog.open('授权提示', '小程序需要您的微信授权才能使用哦~是否重新授权?', function () {
                                    that.getAuthOfUserInfo();
                                },true)
                            }

                        }
                    })
                }
            }
        })
    }

})
