// pages/yjj/yjj.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        fixScale: 1,
        text:'领到了Felix的5.8元打赏分享给你',
        miniCodeUrl: '../../images/tabbar2.png',
        avatarUrl: '../../images/tabbar3.png',
        canvasImg:'',
        showCanvasImg: false,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let scale = wx.getSystemInfoSync().windowWidth / 375;
        this.setData({
            fixScale: scale
        });
        function fixScalseFn(num) {//相对于375rpx
            //   let rsNum = num * this.data.fixScale;
            return num * scale;
        };

        var ctx = wx.createCanvasContext('canvas');

        ctx.drawImage('../../images/bg.jpg', 0, 0, fixScalseFn(375), fixScalseFn(435));
        //   ctx.draw();
        ctx.drawImage(this.data.avatarUrl, fixScalseFn(161), fixScalseFn(15), fixScalseFn(52), fixScalseFn(52));

        

        // ctx.moveTo(fixScalseFn(57), fixScalseFn(55))
        ctx.setFontSize(fixScalseFn(24))
        ctx.setTextAlign('center')
        ctx.setFillStyle('#FFE57B');

        
        ctx.fillText(this.data.text.substring(0,15), fixScalseFn(188), fixScalseFn(101));
        ctx.fillText(this.data.text.substring(15), fixScalseFn(188), fixScalseFn(135));
        // ctx.fillText('领到了Felix的5.8元打赏分享给你', fixScalseFn(60), fixScalseFn(75))

        ctx.setLineWidth(fixScalseFn(8));
        ctx.setStrokeStyle('#E9CE9C');
        ctx.setLineCap('round');
        ctx.beginPath();
        ctx.arc(fixScalseFn(188), fixScalseFn(210), fixScalseFn(55), 0, Math.PI*2, false);
        ctx.stroke();
        
        ctx.clip()
        ctx.drawImage(this.data.miniCodeUrl, fixScalseFn(132.7), fixScalseFn(155), fixScalseFn(110), fixScalseFn(110));
        ctx.restore()

        ctx.draw();


    },
    onSaveCanvas(){
        
        let that=this;
        wx.canvasToTempFilePath({
            canvasId: 'canvas',
            width: this.fixScalseFn(375),
            height: this.fixScalseFn(435),
            success:function(res){
                that.setData({
                    canvasImg: res.tempFilePath,
                    showCanvasImg:true
                })
            }
        })
    },
    fixScalseFn(num) {//相对于375rpx
        //   let rsNum = num * this.data.fixScale;
        return num * this.data.fixScale;
    }

})