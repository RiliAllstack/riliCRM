// customer-detail.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bl: 1,
    openid: app.globalData.g_userInfo.userInfo_openid.openid
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      customerDetail: JSON.parse(options.data)
    })
    this._getRecords()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  change: function (e) {
    var bl = e.currentTarget.dataset.bl
    this.setData({
      bl: bl
    })
  },
  _getRecords: function () {
    var that = this
    wx.request({
      url: 'http://192.168.3.158/wxes/public/home/Customerrecords/OrderBy_Customer?customer_id=' + that.data.customerDetail.id + '&user_id=' + that.data.openid,
      success: function (res) {
        that.setData({
          records: res.data
        })
      }
    })
  }
})