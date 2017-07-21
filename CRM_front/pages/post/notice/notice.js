// notice.js
var app = new getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bl: 1,
    agreebl: false,
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      openid: app.globalData.g_userInfo.userInfo_openid.openid,
    })
    this._getRevievsList()
  },

  changeTab: function (e) {
    var bl = e.currentTarget.dataset.bl
    this.setData({
      bl: bl
    })
  },
  _getRevievsList: function () {
    var that = this
    wx.request({
      url: app.globalData.g_ip+'/wxes/public/home/Reviews/getRevievsList?openid=' + that.data.openid,
      success: function (res) {
        that.setData({
          applies: res.data
        })
      }
    })
  },
  agree: function (e) {
    var that = this
    wx.request({
      url: app.globalData.g_ip+'/wxes/public/home/Reviews/postEditReviews',
      data: {
        id: e.currentTarget.dataset.id
      },
      method: "POST",
      success: function () {
        that._getRevievsList()
      }
    })

  }
})