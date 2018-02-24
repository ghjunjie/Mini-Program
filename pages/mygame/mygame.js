// pages/mygame/mygame.js

let itemsClass = ['ps1', 'ps2', 'ps3', 'ps4', 'ps5', 'ps6', 'ps7', 'ps8', 'ps9', 'ps10', 'ps11', 'ps12', 'ps13', 'ps14', 'ps15', 'ps16'];
const voiceTypes = {
    'click': '/voice/click.mp3',
    'in': '/voice/in.mp3',
    'laugh': '/voice/laugh.mp3',
    'yell': '/voice/yell.mp3',
    'areyouok': '/voice/areyouok.mp3',
}
Page({
    data: {
        itemsClass: itemsClass,//牌排序/位置
        hardDegree: 'low',//难易度设置
        rotateIndex: -1,//当前翻转下标
        blessText: '新年好运旺旺旺',//祝福语设置
        canClickItem:true,//是否可以选中该牌
        canShowPlayBtn:false,//是否显示再玩一次按钮
        canStartInAnimate:true,//是否开始播放动画
        hideInAnimition:true,//隐藏入场动画
        showRewardText:false,//是否显示顶部提示信息
        hideNoFirstInItem: false,//开始隐藏入场的动画(除了第一个其余隐藏)
        showItem:false,//是否显示玩法item
    },
    onLoad: function (options) {
        //   this.playVoice('yell');
    },
    onShowGame() {
        this.setData({//解决animation bug
            canStartInAnimate: false,
            hideInAnimition:false,//显示入场动画
        });
        setTimeout(() => {//解决animation bug
            this.setData({
                canStartInAnimate: true
            });
        },100);
        setTimeout(()=>{//放大
            this.setData({
                zoomInSelected:true
            })
        },1100);
        setTimeout(() => {//缩小
            this.setData({
                zoomInSelected: false
            })
        }, 1600);
        setTimeout(() => {//除了第一个其余隐藏
            this.setData({
                hideNoFirstInItem: true
            })
        }, 2600);
        setTimeout(() => {//隐藏全部入场动画,显示玩法动画
            this.setData({
                hideInAnimition: true,
                showItem:true
            })
        }, 3600);
    },
    onPlayAgain(){//再玩一次/开始玩游戏
        if (this.data.rotateIndex!=-1){
            this.setData({
                rotateIndex: -1,//当前翻转下标
                canShowPlayBtn: false//是否显示再玩一次按钮
            });
            setTimeout(() => {
                this.playHardDegree();
            }, 1000)
        }else{
            this.setData({
                canShowPlayBtn: false//是否显示再玩一次按钮
            });
            this.playHardDegree();
        }
    },
    playHardDegree(){
        let fastDegree = 700;//移动速度设置
        if (this.data.hardDegree == 'low') {
            fastDegree = 900;
        } else if (this.data.hardDegree == 'high') {
            fastDegree = 500;
        } else {
            fastDegree = 700;
        }
        if (this.data.hardDegree == 'low') {//移动次数设置
            this.playByTimes(3, fastDegree);
        } else if (this.data.hardDegree == 'high') {
            this.playByTimes(7,fastDegree);
        } else {
            this.playByTimes(5,fastDegree);
        }
    },
    playByTimes(palyTimes, fastDegree) {
        let that = this;
        let times = palyTimes;
        for (; palyTimes > 0; palyTimes--) {//播放次数设置
            setTimeout(function () {
                that.setData({
                    itemsClass: that.randomIndex()
                });
            }, (palyTimes - 1) * fastDegree);
        }
        setTimeout(function(){//item禁用设置(播放完毕才可以点击)
            that.setData({
                canClickItem: true
            })
        }, times * fastDegree);
    },
    randomIndex() {//打乱排序算法
        let tempItems = Object.assign([], itemsClass);
        let rusultItems = [];
        for (let i in itemsClass) {
            let randomIndex = Math.floor(Math.random() * tempItems.length);
            rusultItems.push(tempItems[randomIndex]);
            tempItems.splice(randomIndex, 1);
        }
        return rusultItems;
    },
    onSelectRotateIndex(event) {//选择牌子
        if (this.data.rotateIndex != -1 || !this.data.canClickItem){//是否可以点击哦
            return;
        }
        this.playVoice('click');
        this.setData({
            rotateIndex: event.currentTarget.dataset.index,//翻牌先
            canClickItem:false//设置禁用点击
        });
        if(!false){//没猜中
            this.setData({
                canShowPlayBtn:true
            })
        }else{

        }
    },
    playVoice(voiceType) {
        const innerAudioContext = wx.createInnerAudioContext();
        innerAudioContext.autoplay = true;
        innerAudioContext.src = voiceTypes[voiceType];
        innerAudioContext.onPlay(() => {
            console.log('开始播放')
        })
    }
})