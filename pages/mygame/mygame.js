// pages/mygame/mygame.js

let itemsClass = ['ps1', 'ps2', 'ps3', 'ps4', 'ps5', 'ps6', 'ps7', 'ps8','ps9','ps10','ps11','ps12','ps13','ps14','ps15','ps16'];
Page({
  data: {
      itemsClass: itemsClass,//牌排序/位置
      hardDegree:'high',//难易度设置
      rotateIndex:-1,//当前翻转下标
      blessText:'新年好运旺旺旺',//祝福语设置
  },
  onLoad: function (options) {
    
  },
  onShowGame(){

  },
  onChange(){
    if (this.data.hardDegree=='low'){
        this.playByTimes(3);
    } else if (this.data.hardDegree=='high'){
        this.playByTimes(5);
    }else{
        this.playByTimes(4);
    }
  },
  playByTimes(items){
      let fastDegree=800;
      if (this.data.hardDegree == 'low') {
          fastDegree=1000;
      } else if (this.data.hardDegree == 'high') {
          fastDegree=600;
      } else {
          fastDegree=800;
      }
    let that=this;
    for (; items > 0; items--){
        setTimeout(function(){
            that.setData({
                itemsClass: that.randomIndex()
            });
        }, (items - 1) * fastDegree)
    }
  },
  randomIndex(){
      let tempItems = Object.assign([], itemsClass);
      let rusultItems=[];
      for (let i in itemsClass){
          let randomIndex = Math.floor(Math.random() * tempItems.length);
          rusultItems.push(tempItems[randomIndex]);
          tempItems.splice(randomIndex,1);
      }
      return rusultItems;
  },
  onSelectRotateIndex(event){
      this.setData({
          rotateIndex: event.currentTarget.dataset.index
      })
  }
})