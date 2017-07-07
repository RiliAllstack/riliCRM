
var WxParse = require('../../../wxParse/wxParse.js');

var message = '';

var text = '鈤励公告';

var user = {};

var replyArr = [];

var app = getApp();

Page({
  data: {
    message: '',
    text: text
  },
  bindChange: function (e) {
    this.setData({
      message: e.detail.value
    })
  },


  //事件处理函数
  add: function (e) {
    wx.sendSocketMessage({
      data: JSON.stringify({
        name: this.data.userInfo.nickname,
        message: this.data.message,
        avatarUrl: this.data.userInfo.avatarUrl
      })
    })
  },
  getMsg: function (msg, avatarUrl) {
    console.log(msg)
    this.setData({
      text: msg
    });
    var that = this;
    var insertData = "<div class='message-container'><div class='send-right'><text>" + that.data.text + "</text><div class='send-arrow-right'></div></div><img class='avatar' src= '" + avatarUrl + "'></img></div>"

    replyArr.push(insertData)
    for (let i = 0; i < replyArr.length; i++) {
      WxParse.wxParse('reply' + i, 'html', replyArr[i], that);
      if (i === replyArr.length - 1) {
        WxParse.wxParseTemArray("replyTemArray", 'reply', replyArr.length, that)
      }
    }

  },

  onLoad: function () {
    this.setData({
      userInfo: app.globalData.g_userInfo.userInfo
    })
    console.log(this.data.userInfo)
    var that = this

    wx.connectSocket({
      url: 'ws://192.168.3.7:9505'
      //url:'wss://saas2.lcola.cn'
    })
    wx.onSocketOpen(function (res) {
      console.log('WebSocket连接已打开！')
    })
    wx.onSocketMessage(function (res) {
      console.log('收到服务器内容：' + JSON.parse(res.data).avatarUrl)
      var type = JSON.parse(res.data).type;
      var msg = JSON.parse(res.data).message;
      var avatarUrl = JSON.parse(res.data).avatarUrl;
      if (type != 'system')
        that.getMsg(JSON.parse(res.data).message, avatarUrl);
    })
  }
})

