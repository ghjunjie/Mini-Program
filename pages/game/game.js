// pages/anim/anim.js
var pixelRatio = 0;
var baseUrl = 'https://xcx.feitaikeji.com/v1.0/receiverecord/';
var setPokeUrl = baseUrl + 'poker-fetched-query';
//var checkPokeUrl = baseUrl + 'joy-poker-fetch';
var checkPokeUrl = 'https://xcx.feitaikeji.com/wlj/v1.0/receiverecord/joy-poker-fetch';

var baseData = {
  animaData1: {},
  animaData2: {},
  animaData3: {},
  animaData4: {},
  animaData5: {},
  animaData6: {},
  animaData7: {},
  animaData8: {},
  animaData9: {},
  animaData10: {},
  animaData11: {},
  animaData12: {},
  animaData13: {},
  animaData14: {},
  animaData15: {},
  animaData16: {},
  txt1: '',
  txt2: '',
  txt3: '',
  txt4: '',
  txt5: '',
  txt6: '',
  txt7: '',
  txt8: '',
  txt9: '',
  txt10: '',
  txt11: '',
  txt12: '',
  txt13: '',
  txt14: '',
  txt15: '',
  txt16: '',
  displaytype1: 'hide',
  displaytype2: 'hide',
  displaytype3: 'hide',
  displaytype4: 'hide',
  displaytype5: 'hide',
  displaytype6: 'hide',
  displaytype7: 'hide',
  displaytype8: 'hide',
  displaytype9: 'hide',
  displaytype10: 'hide',
  displaytype11: 'hide',
  displaytype12: 'hide',
  displaytype13: 'hide',
  displaytype14: 'hide',
  displaytype15: 'hide',
  displaytype16: 'hide',
  dogbg: '',
  dogbg1: '',
  dogbg2: '',
  dogbg3: '',
  dogbg4: '',
  dogbg5: '',
  dogbg6: '',
  dogbg7: '',
  dogbg8: '',
  cardBox: 'hide',
  card1: {},
  cardclass1: 'hide',
  cardclass2: 'hide',
  cardclass3: 'hide',
  cardclass4: 'hide',
  cardclass5: 'hide',
  cardclass6: 'hide',
  cardclass7: 'hide',
  cardclass8: 'hide',
  cardclass9: 'hide',
  cardclass10: 'hide',
  cardclass11: 'hide',
  cardclass12: 'hide',
  cardclass13: 'hide',
  cardclass14: 'hide',
  cardclass15: 'hide',
  cardclass16: 'hide',
  pos1Left: 0,
  pos1Top: 0,
  pos2Left: 85,
  pos2Top: 0,
  pos3Left: 170,
  pos3Top: 0,
  pos4Left: 255,
  pos4Top: 0,
  pos5Left: 0,
  pos5Top: 85,
  pos6Left: 85,
  pos6Top: 85,
  pos7Left: 170,
  pos7Top: 85,
  pos8Left: 255,
  pos8Top: 85,
  pos9Left: 0,
  pos9Top: 170,
  pos10Left: 85,
  pos10Top: 170,
  pos11Left: 170,
  pos11Top: 170,
  pos12Left: 255,
  pos12Top: 170,
  pos13Left: 0,
  pos13Top: 255,
  pos14Left: 85,
  pos14Top: 255,
  pos15Left: 170,
  pos15Top: 255,
  pos16Left: 255,
  pos16Top: 255,
  posx1: '',
  posx2: '',
  posx3: '',
  posx4: '',
  posx5: '',
  posx6: '',
  posx7: '',
  posx8: '',
  posx9: '',
  posx10: '',
  posx11: '',
  posx12: '',
  posx13: '',
  posx14: '',
  posx15: '',
  posx16: '',
  posy1: '',
  posy2: '',
  posy3: '',
  posy4: '',
  posy5: '',
  posy6: '',
  posy7: '',
  posy8: '',
  posy9: '',
  posy10: '',
  posy11: '',
  posy12: '',
  posy13: '',
  posy14: '',
  posy15: '',
  posy16: '',
  start: false,
  animaGroup: [],
  vpacity: {},
  emptyPosition: 0,
  animateTxtClick: false,
  scalebigClick: false,
  checkSelectClick: false,
  turnRun: false,
  selectCard: false,
  ansWrong: false,
  ansRight: false,
  charts: [],
  showGame: false,
  showTopTips: false,
  selectText: '',
  userName: 'Felix',
  showCoupon: false,
  uImg: '',
  getMoney: '0',
  couponPanelShow: {}
};

Page({
  data: baseData,

  onLoad: function () {
    this.animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease'
    });
  },

  //显示红包领取面板
  couponPanelAction: function() {
    var ts = this;
    this.setData({
      showCoupon: true,
      couponPanelShow: ts.animation.scale(1).translate(0).step({duration: 1000}).export(),
      showGame: false,
      showTopTips: false
    });
  },
  //关闭红包领取面板
  closeCouponPanel: function() {
    var ts = this;
    this.setData({
      showCoupon: false,
      couponPanelShow: ts.animation.scale(0).translate(0).step({ duration: 1000 }).export(),
      showGame: false,
      showTopTips: false
    });
  },

  //放弃游戏按钮
  closeGame: function() {
    this.setData(baseData);
    wx.clearStorageSync();
  },

  //再来一次按钮
  tryAgain: function() {
    var ts = this;
    var chooseCard = wx.getStorage({
      key: 'chooseCard',
      success: function (res) {
        var chooseCardx = 0,
          chooseCardy = 0;
        //把正确的答案翻转过来    
        wx.createSelectorQuery().select('#s' + res.data).boundingClientRect(function (rect) {
          chooseCardx = rect.dataset.posx;
          chooseCardy = rect.dataset.posy;

            var animStorData = {};
            var checkCardAnim = ts.animation.translate(chooseCardx, chooseCardy).rotateY(180).step({ duration: 500 }).export();
            ts.setData({
              ansWrong: false
            })
            switch (res.data + '') {
              case '5':
                animStorData = {
                  animaData5: checkCardAnim
                };
                break;
              case '6':
                animStorData = {
                  animaData6: checkCardAnim
                };
                break;
              case '7':
                animStorData = {
                  animaData7: checkCardAnim
                };
                break;
              case '8':
                animStorData = {
                  animaData8: checkCardAnim
                };
                break;
              case '9':
                animStorData = {
                  animaData9: checkCardAnim
                };
                break;
              case '10':
                animStorData = {
                  animaData10: checkCardAnim
                };
                break;
              case '11':
                animStorData = {
                  animaData11: checkCardAnim
                };
                break;
              case '12':
                animStorData = {
                  animaData12: checkCardAnim
                };
                break;
              default:
                break;

            }


            setTimeout(function () {
              ts.setData(animStorData);
            }, 500);
          
        }).exec();
      }
    });

    //翻转空的卡牌
    var cardId = wx.getStorageSync('clickCardId'),
        cardPosX = wx.getStorageSync('clickCardPosX'),
        cardPosY = wx.getStorageSync('clickCardPosY');

    var emptyStorData = {};
    var emptyCardAnim = ts.animation.translate(cardPosX, cardPosY).rotateY(180).step({ duration: 500 }).export();

    switch (cardId + '') {
      case 's1':
        emptyStorData = {
          animaData1: emptyCardAnim
        };
        break;
      case 's2':
        emptyStorData = {
          animaData2: emptyCardAnim
        };
        break;
      case 's3':
        emptyStorData = {
          animaData3: emptyCardAnim
        };
        break;
      case 's4':
        emptyStorData = {
          animaData4: emptyCardAnim
        };
        break;
      case 's5':
        emptyStorData = {
          animaData5: emptyCardAnim
        };
        break;
      case 's6':
        emptyStorData = {
          animaData6: emptyCardAnim
        };
        break;
      case 's7':
        emptyStorData = {
          animaData7: emptyCardAnim
        };
        break;
      case 's8':
        emptyStorData = {
          animaData8: emptyCardAnim
        };
        break;
      case 's9':
        emptyStorData = {
          animaData9: emptyCardAnim
        };
        break;
      case 's10':
        emptyStorData = {
          animaData10: emptyCardAnim
        };
        break;
      case 's11':
        emptyStorData = {
          animaData11: emptyCardAnim
        };
        break;
      case 's12':
        emptyStorData = {
          animaData12: emptyCardAnim
        };
        break;
      case 's13':
        emptyStorData = {
          animaData13: emptyCardAnim
        };
        break;
      case 's14':
        emptyStorData = {
          animaData14: emptyCardAnim
        };
        break;
      case 's15':
        emptyStorData = {
          animaData15: emptyCardAnim
        };
        break;
      case 's16':
        emptyStorData = {
          animaData16: emptyCardAnim
        };
        break;
      default:
        break;

    }

    ts.setData(emptyStorData);
    //重新洗牌
    ts.animateAction(3);
    
  },
  
  //开始玩游戏
  animatText: function(event) {
    if (!this.data.animateTxtClick) {
      this.setData({
        animateTxtClick:true
      })
      this.setData(baseData);
      //请求接口，获取祝福语字符串和难易度数据
      /*wx.request({
        url: setPokeUrl,
        method: 'POST',
        data: {
        },
        success: function (res) {
          console.log(res.data)*/
        
          var animaTxt = '大吉大利大吉大利',//测试，展示的字符串
            sTxt = animaTxt.split(''),
            sGroup = [],
            ts = this;
          //console.log(data.animaData1);
            this.setData({
              txt5: sTxt[0] || '',
              txt6: sTxt[1] || '',
              txt7: sTxt[2] || '',
              txt8: sTxt[3] || '',
              txt9: sTxt[4] || '',
              txt10: sTxt[5] || '',
              txt11: sTxt[6] || '',
              txt12: sTxt[7] || '',
              displaytype5: sTxt[0] ? 'show' : 'hide',
              displaytype6: sTxt[1] ? 'show' : 'hide',
              displaytype7: sTxt[2] ? 'show' : 'hide',
              displaytype8: sTxt[3] ? 'show' : 'hide',
              displaytype9: sTxt[4] ? 'show' : 'hide',
              displaytype10: sTxt[5] ? 'show' : 'hide',
              displaytype11: sTxt[6] ? 'show' : 'hide',
              displaytype12: sTxt[7] ? 'show' : 'hide',
              start: true,
              showGame: true
            });

          this.rotateAndScaleThenTranslate();
        /*}
      });*/
    }
  },

  //翻牌面板入场动画
  rotateAndScaleThenTranslate: function () {
    // 先旋转同时放大，然后平移
    var ts = this;

    ts.animation.translate(0, 200).rotate3d(10, 80, 80, 680).scale(1, 1).step({ duration: 1000 }).rotate3d(100, 100, 80, 720).step({ duration: 50 }).rotate(30).step({ duration: 50 }).rotate(-30).step({ duration: 50 }).rotate(30).step({ duration: 50 }).rotate(-30).step({ duration: 50 }).rotate(0).step({ duration: 50 });

    var animaExp = ts.animation.export();
    
    setTimeout(function () {
      ts.setData({
        animaData5: animaExp
      })
    }, 200);

    setTimeout(function () {
      ts.setData({
        animaData6: animaExp
      })
    }, 400);

    setTimeout(function () {
      ts.setData({
        animaData7: animaExp
      })
    }, 600);

    setTimeout(function () {
      ts.setData({
        animaData8: animaExp
      })
    }, 800);

    setTimeout(function () {
      ts.setData({
        animaData9: animaExp
      })
    }, 1000);

    setTimeout(function () {
      ts.setData({
        animaData10: animaExp
      })
    }, 1200);

    setTimeout(function () {
      ts.setData({
        animaData11: animaExp
      })
    }, 1400);

    setTimeout(function () {
      ts.setData({
        animaData12: animaExp
      })
    }, 1600);

    ts.setData({
      animaData1: animaExp,
      animaData2: animaExp,
      animaData3: animaExp,
      animaData4: animaExp,
      animaData13: animaExp,
      animaData14: animaExp,
      animaData15: animaExp,
      animaData16: animaExp
    })
  },

  //图片点击事件
  scalebig: function (event) {
    var xVal = event.detail.x,
      curId = event.target.id,
      sData = {},
      ts = this,
      anim = null;
    
    //选择其中一个字作为目标牌
    if (!this.data.scalebigClick) {
      this.setData({
        scalebigClick:true
      });
    
        if (!this.data.selectCard) {
          this.setData({ selectCard:true});
          //缓存被选择的card
          wx.setStorageSync('chooseCard', curId);

          switch (curId+'') {
            case "5":
              sData = {
                emptyPosition: 5,
                animaData5: this.animation.translateX(130).scale(1.5, 1.5).step({ duration: 500 }).translateX(0).scale(1, 1).step({ duration: 1500 }).rotateY(180).step({ duration: 500, delay: 500 }).export(),
                animaData6: this.animation.scale(0.01).step({ duration: 500 }).export(),
                animaData7: this.animation.scale(0.01).step({ duration: 500 }).export(),
                animaData8: this.animation.scale(0.01).step({ duration: 500 }).export(),
                animaData9: this.animation.scale(0.01).step({ duration: 500 }).export(),
                animaData10: this.animation.scale(0.01).step({ duration: 500 }).export(),
                animaData11: this.animation.scale(0.01).step({ duration: 500 }).export(),
                animaData12: this.animation.scale(0.01).step({ duration: 500 }).export(),
                selectText: this.data.txt5
              };
            break;
            case "6":
              sData = {
                emptyPosition: 6,
                animaData6: this.animation.translateX(50).scale(1.5, 1.5).step({ duration: 500 }).translateX(0).scale(1, 1).step({ duration: 1500 }).rotateY(180).step({ duration: 500, delay: 500 }).export(),
                animaData5: this.animation.scale(0.01).step({ duration: 500 }).export(),
                animaData7: this.animation.scale(0.01).step({ duration: 500 }).export(),
                animaData8: this.animation.scale(0.01).step({ duration: 500 }).export(),
                animaData9: this.animation.scale(0.01).step({ duration: 500 }).export(),
                animaData10: this.animation.scale(0.01).step({ duration: 500 }).export(),
                animaData11: this.animation.scale(0.01).step({ duration: 500 }).export(),
                animaData12: this.animation.scale(0.01).step({ duration: 500 }).export(),
                selectText: this.data.txt6
              };
            break;
            case "7":
              sData = {
                emptyPosition: 7,
                animaData7: this.animation.translateX(-40).scale(1.5, 1.5).step({ duration: 500 }).translateX(0).scale(1, 1).step({ duration: 1500 }).rotateY(180).step({ duration: 500, delay: 500 }).export(),
                animaData6: this.animation.scale(0.01).step({ duration: 500 }).export(),
                animaData5: this.animation.scale(0.01).step({ duration: 500 }).export(),
                animaData8: this.animation.scale(0.01).step({ duration: 500 }).export(),
                animaData9: this.animation.scale(0.01).step({ duration: 500 }).export(),
                animaData10: this.animation.scale(0.01).step({ duration: 500 }).export(),
                animaData11: this.animation.scale(0.01).step({ duration: 500 }).export(),
                animaData12: this.animation.scale(0.01).step({ duration: 500 }).export(),
                selectText: this.data.txt7
              };
              break;
            case "8":
              sData = {
                emptyPosition: 8,
                animaData8: this.animation.translateX(-120).scale(1.5, 1.5).step({ duration: 500 }).translateX(0).scale(1, 1).step({ duration: 1500 }).rotateY(180).step({ duration: 500, delay: 500 }).export(),
                animaData6: this.animation.scale(0.01).step({ duration: 500 }).export(),
                animaData7: this.animation.scale(0.01).step({ duration: 500 }).export(),
                animaData5: this.animation.scale(0.01).step({ duration: 500 }).export(),
                animaData9: this.animation.scale(0.01).step({ duration: 500 }).export(),
                animaData10: this.animation.scale(0.01).step({ duration: 500 }).export(),
                animaData11: this.animation.scale(0.01).step({ duration: 500 }).export(),
                animaData12: this.animation.scale(0.01).step({ duration: 500 }).export(),
                selectText: this.data.txt8
              };
              break;
            case "9":
              sData = {
                emptyPosition: 9,
                animaData9: this.animation.translateX(130).scale(1.5, 1.5).step({ duration: 500 }).translateX(0).scale(1, 1).step({ duration: 1500 }).rotateY(180).step({ duration: 500, delay: 500 }).export(),
                animaData6: this.animation.scale(0.01).step({ duration: 500 }).export(),
                animaData7: this.animation.scale(0.01).step({ duration: 500 }).export(),
                animaData8: this.animation.scale(0.01).step({ duration: 500 }).export(),
                animaData5: this.animation.scale(0.01).step({ duration: 500 }).export(),
                animaData10: this.animation.scale(0.01).step({ duration: 500 }).export(),
                animaData11: this.animation.scale(0.01).step({ duration: 500 }).export(),
                animaData12: this.animation.scale(0.01).step({ duration: 500 }).export(),
                selectText: this.data.txt9
              };
              break;
            case "10":
              sData = {
                emptyPosition: 10,
                animaData10: this.animation.translateX(50).scale(1.5, 1.5).step({ duration: 500 }).translateX(0).scale(1, 1).step({ duration: 1500 }).rotateY(180).step({ duration: 500, delay: 500 }).export(),
                animaData6: this.animation.scale(0.01).step({ duration: 500 }).export(),
                animaData7: this.animation.scale(0.01).step({ duration: 500 }).export(),
                animaData8: this.animation.scale(0.01).step({ duration: 500 }).export(),
                animaData9: this.animation.scale(0.01).step({ duration: 500 }).export(),
                animaData5: this.animation.scale(0.01).step({ duration: 500 }).export(),
                animaData11: this.animation.scale(0.01).step({ duration: 500 }).export(),
                animaData12: this.animation.scale(0.01).step({ duration: 500 }).export(),
                selectText: this.data.txt10
              };
              break;
            case "11":
              sData = {
                emptyPosition: 11,
                animaData11: this.animation.translateX(-40).scale(1.5, 1.5).step({ duration: 500 }).translateX(0).scale(1, 1).step({ duration: 1500 }).rotateY(180).step({ duration: 500, delay: 500 }).export(),
                animaData6: this.animation.scale(0.01).step({ duration: 500 }).export(),
                animaData7: this.animation.scale(0.01).step({ duration: 500 }).export(),
                animaData8: this.animation.scale(0.01).step({ duration: 500 }).export(),
                animaData9: this.animation.scale(0.01).step({ duration: 500 }).export(),
                animaData10: this.animation.scale(0.01).step({ duration: 500 }).export(),
                animaData5: this.animation.scale(0.01).step({ duration: 500 }).export(),
                animaData12: this.animation.scale(0.01).step({ duration: 500 }).export(),
                selectText: this.data.txt11
              };
              break;
            case "12":
              sData = {
                emptyPosition: 12,
                animaData12: this.animation.translateX(-120).scale(1.5, 1.5).step({ duration: 500 }).translateX(0).scale(1, 1).step({ duration: 1500 }).rotateY(180).step({ duration: 500, delay: 500 }).export(),
                animaData6: this.animation.scale(0.01).step({ duration: 500 }).export(),
                animaData7: this.animation.scale(0.01).step({ duration: 500 }).export(),
                animaData8: this.animation.scale(0.01).step({ duration: 500 }).export(),
                animaData9: this.animation.scale(0.01).step({ duration: 500 }).export(),
                animaData10: this.animation.scale(0.01).step({ duration: 500 }).export(),
                animaData11: this.animation.scale(0.01).step({ duration: 500 }).export(),
                animaData5: this.animation.scale(0.01).step({ duration: 500 }).export(),
                selectText: this.data.txt12
              };
              break;
              default:
              break;
          }

      var emptyBoxAnim = this.animation.scale(0.01).step({ duration: 500 }).export();

      var emptyBox = {
        animaData1: emptyBoxAnim,
        animaData2: emptyBoxAnim,
        animaData3: emptyBoxAnim,
        animaData4: emptyBoxAnim,
        animaData13: emptyBoxAnim,
        animaData14: emptyBoxAnim,
        animaData15: emptyBoxAnim,
        animaData16: emptyBoxAnim,
        userName: this.data.userName
      }

      this.setData(emptyBox);
      this.setData(sData);

      var ts = this;
        setTimeout(function(){
          ts.setData({
              displaytype1: 'show',
              displaytype2: 'show',
              displaytype3: 'show',
              displaytype4: 'show',
              displaytype5: 'show',
              displaytype6: 'show',
              displaytype7: 'show',
              displaytype8: 'show',
              displaytype9: 'show',
              displaytype10: 'show',
              displaytype11: 'show',
              displaytype12: 'show',
              displaytype13: 'show',
              displaytype14: 'show',
              displaytype15: 'show',
              displaytype16: 'show',
              dogbg: 'dog-bg',
              turnRun: true,
              showTopTips: true,
          })
          ts.showTurnPanel(ts.data.emptyPosition);
        },1000);

      } else if (this.data.checkSelectClick) {//选择答案

//=======================请求后端接口检查答案是否正确
        var turnBack = {},
          posx = event.currentTarget.dataset.posx,
          posy = event.currentTarget.dataset.posy,
          cData = {};

        //缓存点击的卡牌id和位置信息
        wx.setStorageSync('clickCardId', event.currentTarget.id);
        wx.setStorageSync('clickCardPosX', posx);
        wx.setStorageSync('clickCardPosY', posy);

        //被点击的卡牌翻转动画
        turnBack = this.animation.translate(posx, posy).rotateY(0).step({ duration: 500 }).export();

        switch (curId + '') {
          case "1":
            cData = {
              animaData1: turnBack
            };
            break;
          case "2":
            cData = {
              animaData2: turnBack
            };
            break;
          case "3":
            cData = {
              animaData3: turnBack
            };
            break;
          case "4":
            cData = {
              animaData4: turnBack
            };
            break;
          case "5":
            cData = {
              animaData5: turnBack
            };
            break;
          case "6":
            cData = {
              animaData6: turnBack
            };
            break;
          case "7":
            cData = {
              animaData7: turnBack
            };
            break;
          case "8":
            cData = {
              animaData8: turnBack
            };
            break;
          case "9":
            cData = {
              animaData9: turnBack
            };
            break;
          case "10":
            cData = {
              animaData10: turnBack
            };
            break;
          case "11":
            cData = {
              animaData11: turnBack
            };
            break;
          case "12":
            cData = {
              animaData12: turnBack
            };
            break;
          case "13":
            cData = {
              animaData13: turnBack
            };
            break;
          case "14":
            cData = {
              animaData14: turnBack
            };
            break;
          case "15":
            cData = {
              animaData15: turnBack
            };
            break;
          case "16":
            cData = {
              animaData16: turnBack
            };
            break;
          default:
            break;
        }

        var chooseCard = wx.getStorage({
          key: 'chooseCard',
          success: function(res) {
            var chooseCardx = 0,
                chooseCardy = 0;
            //把正确的答案翻转过来    
            wx.createSelectorQuery().select('#s' + res.data).boundingClientRect(function (rect) {
              var chooseCardx = rect.dataset.posx;
              var chooseCardy = rect.dataset.posy;

            //答案错误
            if (curId != res.data) {
              var animStorData = {};
              var checkCardAnim = ts.animation.translate(chooseCardx, chooseCardy).rotateY(0).step({ duration: 500 }).export();
              ts.setData({
                ansWrong: true
              })
              switch (res.data + '') {
                case '5':
                  animStorData = {
                    animaData5: checkCardAnim
                  };
                  break;
                case '6':
                  animStorData = {
                    animaData6: checkCardAnim
                  };
                  break;
                case '7':
                  animStorData = {
                    animaData7: checkCardAnim
                  };
                  break;
                case '8':
                  animStorData = {
                    animaData8: checkCardAnim
                  };
                  break;
                case '9':
                  animStorData = {
                    animaData9: checkCardAnim
                  };
                  break;
                case '10':
                  animStorData = {
                    animaData10: checkCardAnim
                  };
                  break;
                case '11':
                  animStorData = {
                    animaData11: checkCardAnim
                  };
                  break;
                case '12':
                  animStorData = {
                    animaData12: checkCardAnim
                  };
                  break;
                default:
                  break;

              }

              setTimeout(function () {
                ts.setData(animStorData);
              }, 500);

              //请求接口，记录错误次数
              wx.request({
                url: checkPokeUrl,
                method: 'POST',
                data: {
                  "businessId": 'PK201802031112220410623453388265',
                  "token": 'b61eb725a8f34f49b9a5901ae7827a7e0d455c01949242f1ac813008c1d99425',
                  "status": 'FETCH_FAIL'
                },
                success: function (res) {
                  console.log(res.data)
                }
              });
            } else {
              //答案正确
              wx.request({
                url: checkPokeUrl,
                method: 'POST',
                data: {
                  "businessId": 'PK201802031112220410623453388265',
                  "token": 'b61eb725a8f34f49b9a5901ae7827a7e0d455c01949242f1ac813008c1d99425',
                  "status": 'FETCH_SUCCESS'
                },
                success: function (res) {
                  console.log(res.data)

                  //设置弹出提示已领取到红包的金额
                  ts.setData({
                    ansRight: true,
                    getMoney: '20.33'
                  });
                  //弹出红包
                  setTimeout(function(){
                    ts.couponPanelAction();
                  }, 1500);

                }
              });
              
            }
            }).exec();
          }
        });

        this.setData({
          dogbg: '',
          dogbg5: '',
          dogbg6: '',
          dogbg7: '',
          dogbg8: '',
          dogbg9: '',
          dogbg10: '',
          dogbg11: '',
          dogbg12: ''
        })
        this.setData(cData);

      } else {
          this.setData({ selectCard: false });
      }
    }
    //this.imgOpacity()
  },

  //显示翻牌面板
  showTurnPanel: function(p) {
    var sData = {},
        ts = this;
    
    var animScale2 = this.animation.scale(1, 1).step({ duration: 500 }).export();

    var animaData2 = {
      displaytype1: 'show',
      displaytype2: 'show',
      displaytype3: 'show',
      displaytype4: 'show',
      displaytype5: 'show',
      displaytype6: 'show',
      displaytype7: 'show',
      displaytype8: 'show',
      displaytype9: 'show',
      displaytype10: 'show',
      displaytype11: 'show',
      displaytype12: 'show',
      displaytype13: 'show',
      displaytype14: 'show',
      displaytype15: 'show',
      displaytype16: 'show',
    }
    
    this.setData(animaData2);

    var emptyBox = {
      animaData1: animScale2,
      animaData2: animScale2,
      animaData3: animScale2,
      animaData4: animScale2,
      animaData13: animScale2,
      animaData14: animScale2,
      animaData15: animScale2,
      animaData16: animScale2
    }

    this.setData(emptyBox);

    var textGroup = [
      {
        txt1: '', txt2: '', txt3: '', txt4: '', txt6: '', txt7: '', txt8: '', txt9: '', txt10: '', txt11: '', txt12: '', txt13: '', txt14: '', txt15: '', txt16: '', dogbg6: 'dog-bg', dogbg7: 'dog-bg', dogbg8: 'dog-bg', dogbg9: 'dog-bg', dogbg10: 'dog-bg', dogbg11: 'dog-bg', dogbg12: 'dog-bg', 
        animaData6: animScale2,
        animaData7: animScale2,
        animaData8: animScale2,
        animaData9: animScale2,
        animaData10: animScale2,
        animaData11: animScale2,
        animaData12: animScale2},
      {
        txt1: '', txt2: '', txt3: '', txt4: '', txt5: '', txt7: '', txt8: '', txt9: '', txt10: '', txt11: '', txt12: '', txt13: '', txt14: '', txt15: '', txt16: '', dogbg5: 'dog-bg', dogbg7: 'dog-bg', dogbg8: 'dog-bg', dogbg9: 'dog-bg', dogbg10: 'dog-bg', dogbg11: 'dog-bg', dogbg12: 'dog-bg',
        animaData5: animScale2,
        animaData7: animScale2,
        animaData8: animScale2,
        animaData9: animScale2,
        animaData10: animScale2,
        animaData11: animScale2,
        animaData12: animScale2},
      {
        txt1: '', txt2: '', txt3: '', txt4: '', txt6: '', txt5: '', txt8: '', txt9: '', txt10: '', txt11: '', txt12: '', txt13: '', txt14: '', txt15: '', txt16: '', dogbg6: 'dog-bg', dogbg5: 'dog-bg', dogbg8: 'dog-bg', dogbg9: 'dog-bg', dogbg10: 'dog-bg', dogbg11: 'dog-bg', dogbg12: 'dog-bg',
        animaData6: animScale2,
        animaData5: animScale2,
        animaData8: animScale2,
        animaData9: animScale2,
        animaData10: animScale2,
        animaData11: animScale2,
        animaData12: animScale2},
      {
        txt1: '', txt2: '', txt3: '', txt4: '', txt6: '', txt7: '', txt5: '', txt9: '', txt10: '', txt11: '', txt12: '', txt13: '', txt14: '', txt15: '', txt16: '', dogbg6: 'dog-bg', dogbg7: 'dog-bg', dogbg5: 'dog-bg', dogbg9: 'dog-bg', dogbg10: 'dog-bg', dogbg11: 'dog-bg', dogbg12: 'dog-bg',
        animaData6: animScale2,
        animaData7: animScale2,
        animaData5: animScale2,
        animaData9: animScale2,
        animaData10: animScale2,
        animaData11: animScale2,
        animaData12: animScale2},
      {
        txt1: '', txt2: '', txt3: '', txt4: '', txt6: '', txt7: '', txt8: '', txt5: '', txt10: '', txt11: '', txt12: '', txt13: '', txt14: '', txt15: '', txt16: '', dogbg6: 'dog-bg', dogbg7: 'dog-bg', dogbg8: 'dog-bg', dogbg5: 'dog-bg', dogbg10: 'dog-bg', dogbg11: 'dog-bg', dogbg12: 'dog-bg',
        animaData6: animScale2,
        animaData7: animScale2,
        animaData8: animScale2,
        animaData5: animScale2,
        animaData10: animScale2,
        animaData11: animScale2,
        animaData12: animScale2},
      {
        txt1: '', txt2: '', txt3: '', txt4: '', txt6: '', txt7: '', txt8: '', txt9: '', txt5: '', txt11: '', txt12: '', txt13: '', txt14: '', txt15: '', txt16: '', dogbg6: 'dog-bg', dogbg7: 'dog-bg', dogbg8: 'dog-bg', dogbg9: 'dog-bg', dogbg5: 'dog-bg', dogbg11: 'dog-bg', dogbg12: 'dog-bg',
        animaData6: animScale2,
        animaData7: animScale2,
        animaData8: animScale2,
        animaData9: animScale2,
        animaData5: animScale2,
        animaData11: animScale2,
        animaData12: animScale2},
      {
        txt1: '', txt2: '', txt3: '', txt4: '', txt6: '', txt7: '', txt8: '', txt9: '', txt10: '', txt5: '', txt12: '', txt13: '', txt14: '', txt15: '', txt16: '', dogbg6: 'dog-bg', dogbg7: 'dog-bg', dogbg8: 'dog-bg', dogbg9: 'dog-bg', dogbg10: 'dog-bg', dogbg5: 'dog-bg', dogbg12: 'dog-bg',
        animaData6: animScale2,
        animaData7: animScale2,
        animaData8: animScale2,
        animaData9: animScale2,
        animaData10: animScale2,
        animaData5: animScale2,
        animaData12: animScale2},
      {
        txt1: '', txt2: '', txt3: '', txt4: '', txt6: '', txt7: '', txt8: '', txt9: '', txt10: '', txt11: '', txt5: '', txt13: '', txt14: '', txt15: '', txt16: '', dogbg6: 'dog-bg', dogbg7: 'dog-bg', dogbg8: 'dog-bg', dogbg9: 'dog-bg', dogbg10: 'dog-bg', dogbg11: 'dog-bg', dogbg5: 'dog-bg',
        animaData6: animScale2,
        animaData7: animScale2,
        animaData8: animScale2,
        animaData9: animScale2,
        animaData10: animScale2,
        animaData11: animScale2,
        animaData5: animScale2}
      ];

      switch (p+'') {
          case "5":
          sData = textGroup[0];
          break;
          case "6":
          sData = textGroup[1];
            break;
          case "7":
          sData = textGroup[2];
            break;
          case "8":
          sData = textGroup[3];
            break;
          case "9":
          sData = textGroup[4];
            break;
          case "10":
          sData = textGroup[5];
            break;
          case "11":
          sData = textGroup[6];
            break;
          case "12":
          sData = textGroup[7];
            break;
          default:
          break;
      }

      this.setData(sData);
      setTimeout(function(){
        ts.animateAction(3);
      }, 1200);
  },

  animateAction: function(count) {
    var totalCount = count || 1,
        timer = null,
        ts = this,
        t = 0;

    timer = setInterval(function(){
        if(t < count) {
          ts.cardClick();
        } else {
          clearInterval(timer);
        }
        t++;
    }, 1500);
  },

  //点击打乱后的卡牌
  cardClick: function() {
    var ts = this;
    var arr = [];
    for (var i = 0; i < 16; i++) {
      arr[i] = i;
    }
    arr.sort(function () { return 0.5 - Math.random() })
    //var str = arr.join();
    var frontArr = [],
        backArr = [],
        nArr = [];
    for(var i=0; i<16; i++) {
      if(i < 8) {
        frontArr.push(arr[i]);
      } else {
        backArr.push(arr[i]);
      }
    }
    //卡片配对
    for(var i=0; i<8; i++) {
      nArr.push([frontArr[i], backArr[i]]);
    }

    sortDataSave = nArr;
    
    var timer = 0;
    var setTimer = setInterval(function(){
        if (timer < 8) {
          var animaGroupX = ts.getSortX(nArr[timer], positions, ts);
          ts.setData(animaGroupX);

          var animaGroupY = ts.getSortY(nArr[timer], positions, ts);
          ts.setData(animaGroupY);      
        } else {
          //解除点击锁定
          ts.setData({
            scalebigClick: false,
            checkSelectClick: true
          });
          clearInterval(setTimer);
        }
        timer++;
      }, 200);//设置难易程度，ms
  },

  //配对组第一个元素的坐标
  getSortX: function(n, positions, ts) {
    var x = n[0];
   // console.log(x);
   //
    switch (x +'') {
      case '0':
      return {
        animaData1: ts.animation.translate(positions[0][n[1]][0], positions[0][n[1]][1]).step({ duration: 500 }).export(),
        posx1: positions[0][n[1]][0],
        posy1: positions[0][n[1]][1]
      }
      break;
      case '1':
        return {
          animaData2: ts.animation.translate(positions[1][n[1]][0], positions[1][n[1]][1]).step({ duration: 500 }).export(),
          posx2: positions[1][n[1]][0],
          posy2: positions[1][n[1]][1]
        }
        break;
      case '2':
        return {
          animaData3: ts.animation.translate(positions[2][n[1]][0], positions[2][n[1]][1]).step({ duration: 500 }).export(),
          posx3: positions[2][n[1]][0],
          posy3: positions[2][n[1]][1]
        }
        break;
      case '3':
        return {
          animaData4: ts.animation.translate(positions[3][n[1]][0], positions[3][n[1]][1]).step({ duration: 500 }).export(),
          posx4: positions[3][n[1]][0],
          posy4: positions[3][n[1]][1]
        }
        break;
      case '4':
        return {
          animaData5: ts.animation.translate(positions[4][n[1]][0], positions[4][n[1]][1]).step({ duration: 500 }).export(),
          posx5: positions[4][n[1]][0],
          posy5: positions[4][n[1]][1]
        }
        break;
      case '5':
        return {
          animaData6: ts.animation.translate(positions[5][n[1]][0], positions[5][n[1]][1]).step({ duration: 500 }).export(),
          posx6: positions[5][n[1]][0],
          posy6: positions[5][n[1]][1]
        }
        break;
      case '6':
        return {
          animaData7: ts.animation.translate(positions[6][n[1]][0], positions[6][n[1]][1]).step({ duration: 500 }).export(),
          posx7: positions[6][n[1]][0],
          posy7: positions[6][n[1]][1]
        }
        break;
      case '7':
        return {
          animaData8: ts.animation.translate(positions[7][n[1]][0], positions[7][n[1]][1]).step({ duration: 500 }).export(),
          posx8: positions[7][n[1]][0],
          posy8: positions[7][n[1]][1]
        }
        break;
      case '8':
        return {
          animaData9: ts.animation.translate(positions[8][n[1]][0], positions[8][n[1]][1]).step({ duration: 500 }).export(),
          posx9: positions[8][n[1]][0],
          posy9: positions[8][n[1]][1]
        }
        break;
      case '9':
        return {
          animaData10: ts.animation.translate(positions[9][n[1]][0], positions[9][n[1]][1]).step({ duration: 500 }).export(),
          posx10: positions[9][n[1]][0],
          posy10: positions[9][n[1]][1]
        }
        break;
      case '10':
        return {
          animaData11: ts.animation.translate(positions[10][n[1]][0], positions[10][n[1]][1]).step({ duration: 500 }).export(),
          posx11: positions[10][n[1]][0],
          posy11: positions[10][n[1]][1]
        }
        break;
      case '11':
        return {
          animaData12: ts.animation.translate(positions[11][n[1]][0], positions[11][n[1]][1]).step({ duration: 500 }).export(),
          posx12: positions[11][n[1]][0],
          posy12: positions[11][n[1]][1]
        }
        break;
      case '12':
        return {
          animaData13: ts.animation.translate(positions[12][n[1]][0], positions[12][n[1]][1]).step({ duration: 500 }).export(),
          posx13: positions[12][n[1]][0],
          posy13: positions[12][n[1]][1]
        }
        break;
      case '13':
        return {
          animaData14: ts.animation.translate(positions[13][n[1]][0], positions[13][n[1]][1]).step({ duration: 500 }).export(),
          posx14: positions[13][n[1]][0],
          posy14: positions[13][n[1]][1]
        }
        break;
      case '14':
        return {
          animaData15: ts.animation.translate(positions[14][n[1]][0], positions[14][n[1]][1]).step({ duration: 500 }).export(),
          posx15: positions[14][n[1]][0],
          posy15: positions[14][n[1]][1]
        }
        break;
      case '15':
        return {
          animaData16: ts.animation.translate(positions[15][n[1]][0], positions[15][n[1]][1]).step({ duration: 500 }).export(),
          posx16: positions[15][n[1]][0],
          posy16: positions[15][n[1]][1]
        }
        break;
        default:
        break;

    }
  },

  //配对组第二个元素的坐标
  getSortY: function (n, positions, ts) {
    var y = n[1];
    // console.log(x);
    
    //左边坐标
    switch (y + '') {
      case '0':
        return {
          animaData1: ts.animation.translate(positions[0][n[0]][0], positions[0][n[0]][1]).step({ duration: 500 }).export(),
          posx1: positions[0][n[0]][0],
          posy1: positions[0][n[0]][1]
        }
        break;
      case '1':
        return {
          animaData2: ts.animation.translate(positions[1][n[0]][0], positions[1][n[0]][1]).step({ duration: 500 }).export(),
          posx2: positions[1][n[0]][0],
          posy2: positions[1][n[0]][1]
        }
        break;
      case '2':
        return {
          animaData3: ts.animation.translate(positions[2][n[0]][0], positions[2][n[0]][1]).step({ duration: 500 }).export(),
          posx3: positions[2][n[0]][0],
          posy3: positions[2][n[0]][1]
        }
        break;
      case '3':
        return {
          animaData4: ts.animation.translate(positions[3][n[0]][0], positions[3][n[0]][1]).step({ duration: 500 }).export(),
          posx4: positions[3][n[0]][0],
          posy4: positions[3][n[0]][1]
        }
        break;
      case '4':
        return {
          animaData5: ts.animation.translate(positions[4][n[0]][0], positions[4][n[0]][1]).step({ duration: 500 }).export(),
          posx5: positions[4][n[0]][0],
          posy5: positions[4][n[0]][1]
        }
        break;
      case '5':
        return {
          animaData6: ts.animation.translate(positions[5][n[0]][0], positions[5][n[0]][1]).step({ duration: 500 }).export(),
          posx6: positions[5][n[0]][0],
          posy6: positions[5][n[0]][1]
        }
        break;
      case '6':
        return {
          animaData7: ts.animation.translate(positions[6][n[0]][0], positions[6][n[0]][1]).step({ duration: 500 }).export(),
          posx7: positions[6][n[0]][0],
          posy7: positions[6][n[0]][1]
        }
        break;
      case '7':
        return {
          animaData8: ts.animation.translate(positions[7][n[0]][0], positions[7][n[0]][1]).step({ duration: 500 }).export(),
          posx8: positions[7][n[0]][0],
          posy8: positions[7][n[0]][1]
        }
        break;
      case '8':
        return {
          animaData9: ts.animation.translate(positions[8][n[0]][0], positions[8][n[0]][1]).step({ duration: 500 }).export(),
          posx9: positions[8][n[0]][0],
          posy9: positions[8][n[0]][1]
        }
        break;
      case '9':
        return {
          animaData10: ts.animation.translate(positions[9][n[0]][0], positions[9][n[0]][1]).step({ duration: 500 }).export(),
          posx10: positions[9][n[0]][0],
          posy10: positions[9][n[0]][1]
        }
        break;
      case '10':
        return {
          animaData11: ts.animation.translate(positions[10][n[0]][0], positions[10][n[0]][1]).step({ duration: 500 }).export(),
          posx11: positions[10][n[0]][0],
          posy11: positions[10][n[0]][1]
        }
        break;
      case '11':
        return {
          animaData12: ts.animation.translate(positions[11][n[0]][0], positions[11][n[0]][1]).step({ duration: 500 }).export(),
          posx12: positions[11][n[0]][0],
          posy12: positions[11][n[0]][1]
        }
        break;
      case '12':
        return {
          animaData13: ts.animation.translate(positions[12][n[0]][0], positions[12][n[0]][1]).step({ duration: 500 }).export(),
          posx13: positions[12][n[0]][0],
          posy13: positions[12][n[0]][1]
        }
        break;
      case '13':
        return {
          animaData14: ts.animation.translate(positions[13][n[0]][0], positions[13][n[0]][1]).step({ duration: 500 }).export(),
          posx14: positions[13][n[0]][0],
          posy14: positions[13][n[0]][1]
        }
        break;
      case '14':
        return {
          animaData15: ts.animation.translate(positions[14][n[0]][0], positions[14][n[0]][1]).step({ duration: 500 }).export(),
          posx15: positions[14][n[0]][0],
          posy15: positions[14][n[0]][1]
        }
        break;
      case '15':
        return {
          animaData16: ts.animation.translate(positions[15][n[0]][0], positions[15][n[0]][1]).step({ duration: 500 }).export(),
          posx16: positions[15][n[0]][0],
          posy16: positions[15][n[0]][1]
        }
        break;
      default:
        break;

    }
  },

  sortRun: function() {
    
  }
})

var sortDataSave = [];

var positions = [
  //第一排
  [
    [0, 200], [85, 200], [170, 200], [255, 200],
    [0, 285], [85, 285], [170, 285], [255, 285],
    [0, 370], [85, 370], [170, 370], [255, 370],
    [0, 455], [85, 455], [170, 455], [255, 455]
  ],
  [
    [-85, 200], [0, 200], [85, 200], [170, 200],
    [-85, 285], [0, 285], [85, 285], [170, 285],
    [-85, 370], [0, 370], [85, 370], [170, 370],
    [-85, 455], [0, 455], [85, 455], [170, 455]
  ],
  [
    [-170, 200], [-85, 200], [0, 200], [85, 200],
    [-170, 285], [-85, 285], [0, 285], [85, 285],
    [-170, 370], [-85, 370], [0, 370], [85, 370],
    [-170, 455], [-85, 455], [0, 455], [85, 455]
  ],
  [
    [-255, 200], [-170, 200], [-85, 200], [0, 200],
    [-255, 285], [-170, 285], [-85, 285], [0, 285],
    [-255, 370], [-170, 370], [-85, 370], [0, 370],
    [-255, 455], [-170, 455], [-85, 455], [0, 455]
  ],
  //第二排
  [
    [0, 115], [85, 115], [170, 115], [255, 115],
    [0, 200], [85, 200], [170, 200], [255, 200],
    [0, 285], [85, 285], [170, 285], [255, 285],
    [0, 370], [85, 370], [170, 370], [255, 370]
  ],
  [
    [-85, 115], [0, 115], [85, 115], [170, 115],
    [-85, 200], [0, 200], [85, 200], [170, 200],
    [-85, 285], [0, 285], [85, 285], [170, 285],
    [-85, 370], [0, 370], [85, 370], [170, 370]
  ],
  [
    [-170, 115], [-85, 115], [0, 115], [85, 115],
    [-170, 200], [-85, 200], [0, 200], [85, 200],
    [-170, 285], [-85, 285], [0, 285], [85, 285],
    [-170, 370], [-85, 370], [0, 370], [85, 370]
  ],
  [
    [-255, 115], [-170, 115], [-85, 115], [0, 115],
    [-255, 200], [-170, 200], [-85, 200], [0, 200],
    [-255, 285], [-170, 285], [-85, 285], [0, 285],
    [-255, 370], [-170, 370], [-85, 370], [0, 370]
  ],
  //第三排
  [
    [0, 30], [85, 30], [170, 30], [255, 30],
    [0, 115], [85, 115], [170, 115], [255, 115],
    [0, 200], [85, 200], [170, 200], [255, 200],
    [0, 285], [85, 285], [170, 285], [255, 285]
  ],
  [
    [-85, 30], [0, 30], [85, 30], [170, 30],
    [-85, 115], [0, 115], [85, 115], [170, 115],
    [-85, 200], [0, 200], [85, 200], [170, 200],
    [-85, 285], [0, 285], [85, 285], [170, 285]
  ],
  [
    [-170, 30], [-85, 30], [0, 30], [85, 30],
    [-170, 115], [-85, 115], [0, 115], [85, 115],
    [-170, 200], [-85, 200], [0, 200], [85, 200],
    [-170, 285], [-85, 285], [0, 285], [85, 285]
  ],
  [
    [-255, 30], [-170, 30], [-85, 30], [0, 30],
    [-255, 115], [-170, 115], [-85, 115], [0, 115],
    [-255, 200], [-170, 200], [-85, 200], [0, 200],
    [-255, 285], [-170, 285], [-85, 285], [0, 285]
  ],
  //第四排
  [
    [0, -55], [85, -55], [170, -55], [255, -55],
    [0, 30], [85, 30], [170, 30], [255, 30],
    [0, 115], [85, 115], [170, 115], [255, 115],
    [0, 200], [85, 200], [170, 200], [255, 200]
  ],
  [
    [-85, -55], [0, -55], [85, -55], [170, -55],
    [-85, 30], [0, 30], [85, 30], [170, 30],
    [-85, 115], [0, 115], [85, 115], [170, 115],
    [-85, 200], [0, 200], [85, 200], [170, 200]
  ],
  [
    [-170, -55], [-85, -55], [0, -55], [85, -55],
    [-170, 30], [-85, 30], [0, 30], [85, 30],
    [-170, 115], [-85, 115], [0, 115], [85, 115],
    [-170, 200], [-85, 200], [0, 200], [85, 200]
  ],
  [
    [-255, -55], [-170, -55], [-85, -55], [0, -55],
    [-255, 30], [-170, 30], [-85, 30], [0, 30],
    [-255, 115], [-170, 115], [-85, 115], [0, 115],
    [-255, 200], [-170, 200], [-85, 200], [0, 200]
  ]
];