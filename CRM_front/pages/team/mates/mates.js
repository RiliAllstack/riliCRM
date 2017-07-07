// mates.js
var app = new getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lengthChosen: 0,
    lengthAll: 0,
    openid: app.globalData.g_userInfo.userInfo_openid.openid,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getTeam()
    console.log(options.type)
    this.setData({
      type: options.type
    })
  },

  _getTeam: function () {
    var that = this
    wx.request({
      url: app.globalData.g_ip + '/wxes/public/home/User/Group_Reports?openid=' + that.data.openid,
      success: function (res) {
        that.setData({
          team: res.data,
          lengthAll: res.data[0].data.length + res.data[1].data.length
        })
      }
    })
  },
  bindCheckBox: function (e) {
    var arr = wx.getStorageSync('matesChosen')

    for (var i = 0; i < arr.length; i++) {
      var bl = false
      for (var j = 0; j < e.detail.value.length; j++) {
        if (arr[i].split('-')[1] == e.detail.value[j].split('-')[1]) {
          bl = true
        }
      }
      if (!bl) {
        e.detail.value.push(arr[i])
      }
    }
    this.setData({
      chosen: e.detail.value,
      lengthChosen: e.detail.value.length
    })
  },
  returnChosenInfo: function () {
    wx.setStorageSync('matesChosen', this.data.chosen)
    wx.navigateBack({
      url: "/pages/reports/reports-plus/reports-plus",
    })
  }
})