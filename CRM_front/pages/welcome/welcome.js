var util = require('../../util/util.js')

var data = {
  message: "aaa",
  name: "a"
}
var app = getApp()
Page({
  onTapJump: function (event) {
    wx.switchTab({
      url: "../post/post",
      success: function () {
        console.log("jump success")
      },
      fail: function () {
        console.log("jump failed")
      },
      complete: function () {
        console.log("jump complete")
      }
    });
  },
  onUnload: function (event) {
    console.log("page is unload")
  },
  onHide: function (event) {
    console.log("page is hiding")
  },
  
  onLoad: function () {
    console.log('onLoad')
    //调用应用实例的方法获取全局数据
    this.setData({
      userInfo: app.globalData.g_userInfo.userInfo
    })
  }
})