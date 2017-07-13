var util = require('../../util/util.js')
var app = getApp()
Page({
  data: {
    progress: 0
  },
  onUnload: function (event) {

  },
  onHide: function (event) {
    console.log("page is hiding")
  },

  onLoad: function () {
    var that = this
    var timer = setInterval(function () {
      //你需要执行的代码
      that.setData({
        progress: that.data.progress + 3
      })
      if (that.data.progress > 30) {
        clearInterval(timer)
        wx.switchTab({
          url: "../post/post",
        });
      }
    }, 300)

    //调用应用实例的方法获取全局数据
    this.setData({
      userInfo: app.globalData.g_userInfo.userInfo
    })

  }
})