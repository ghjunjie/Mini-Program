var array = [];
Page({
    data: {
        items: [1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 5, 6, 7, 2, 3],
        _height: 0,
        currentId: 0,
        isAnimation: false,
        startAnimations: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
        animationScaleData: {},
    },
    onLoad: function (options) {
        this.initAnimation();
    },
    onReady: function () {
        var that = this;
        wx.getSystemInfo({
            success: function (res) {
                console.log(res);
                that.setData({
                    _height: res.windowHeight
                })
            }
        })

        var animation = wx.createAnimation();
        this.setData({
            animationScaleData: animation.scale(0.001, 0.001).step({ duration: 0, delay: 0 }).export()
        });
    },
    onShow: function () {
    },
    onHide: function () {
        // 页面隐藏
    },
    onUnload: function () {
        // 页面关闭
    },
    initAnimation: function () {
        this.translateAnimation(-100, 0, 0);
        setTimeout(function () {
            this.translateAnimation(0, 300, 100);
        }.bind(this), 1000)
    },
    //hideAnimation start
    hideAnimation: function (e) {
        this.setData({
            currentId: e.currentTarget.id
        });
        var animation = wx.createAnimation();
        array.splice(0, array.length);
        for (var i = 1; i < 11; i++) {
            if (e.currentTarget.id == i) {
                console.log(i);
                array.push({ id: i, _animation: animation.scale(2, 2).step({ duration: 300, delay: 100 * i }).export(), isHide: false })
            } else {
                array.push({ id: i, _animation: animation.scale(0.001, 0.001).step({ duration: 300, delay: 100 * i }).export(), isHide: false })
            }
        }
        this.setData({
            startAnimations: array
        });
        setTimeout(function () {
            array.splice(0, array.length);
            for (var i = 1; i < 11; i++) {
                if (e.currentTarget.id == i) {
                    console.log(i);
                    array.push({ id: i, _animation: animation.translate(20, 20).step({ duration: 300, delay: 0 }).export(), isHide: false })
                } else {
                    array.push({ id: i, _animation: {}, isHide: false })
                }
            }
            this.setData({
                startAnimations: array
            });
        }.bind(this), 1000)
        this.setData({
            animationScaleData: animation.scale(1, 1).step({ duration: 300, delay: 0 }).export()
        });
    },
    //hideAnimation end
    translateAnimation: function (_translate, _duration, _delay) {
        var animation = wx.createAnimation();
        array.splice(0, array.length);
        for (var i = 1; i < 11; i++) {
            array.push({ id: i, _animation: animation.translate(_translate * i, _translate * i).step({ duration: _duration, delay: _delay * i }).export(), isHide: false })
        }
        this.setData({
            startAnimations: array
        });
    },
    convertRpx: function (px) {
        return px * (750 / wx.getSystemInfoSync().windowWidth);
    },
    convertPx: function (px) {
        return px * (wx.getSystemInfoSync().windowWidth / 750);
    }
})
