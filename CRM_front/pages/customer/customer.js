// customer.js
var customerData = require('../../data/customer_info.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    this._getCustomerInfo()
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
  onTapToPlus: function () {
    wx.navigateTo({
      url: "/pages/customer/customer-plus/customer-plus"
    })
  },
  _getCustomerInfo: function () {
    var that =this
    wx.request({
      url: 'http://192.168.3.158/wxes/public/index.php/home/Customer/select_Customerlist',
      success: function (res) {
        that.setData({
          customerList: res.data
        });
      }
    })
  }
})