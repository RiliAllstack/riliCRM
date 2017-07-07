// team.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid: app.globalData.g_userInfo.userInfo_openid.openid,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getTeam()
  },
  _getTeam: function () {
    var that = this
    wx.request({
      url: app.globalData.g_ip + '/wxes/public/home/User/Group_Reports?openid=' + that.data.openid,
      success: function (res) {
        that.setData({
          team: res.data
        })
      }
    })
  }
})