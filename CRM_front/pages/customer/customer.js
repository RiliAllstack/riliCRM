// customer.js
var customerData = require('../../data/customer_info.js')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indexC: 0,
    indexT: 0
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
  onTapToDelete: function (e) {
    this._deleteCustomerInfo(e.currentTarget.dataset.customerid)
  },
  onTapToDetail: function (e) {
    var that = this
    var id = e.currentTarget.dataset.customerid
    console.log(that.data.customerList[id])
    
    wx.navigateTo({
      url: "/pages/customer/customer-detail/customer-detail?data=" + JSON.stringify(that.data.customerList[id])
    })
  },
  onChangeCustomer: function () {
    var indexC = 0
    var that = this
    wx.showActionSheet({
      itemList: ['我负责的客户', '全部客户'],
      itemColor: "#405f80",
      success: function (res) {
        if (res.tapIndex == 0) {
          console.log("跳至我负责的客户")
          indexC = 0
        }
        if (res.tapIndex == 1) {
          console.log("跳至全部客户")
          indexC = 1
        }
        that.setData({
          indexC: indexC
        })
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
  onChangeTime: function () {
    var indexT = 0
    var that = this
    wx.showActionSheet({
      itemList: ['最新创建', '最近活动记录'],
      itemColor: "#405f80",
      success: function (res) {
        if (res.tapIndex == 0) {
          console.log("跳至最新创建")
          indexT = 0
        }
        if (res.tapIndex == 1) {
          console.log("跳至最近活动记录")
          indexT = 1
        }
        that.setData({
          indexT: indexT
        })
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
  _getCustomerInfo: function () {
    var that = this
    wx.request({
      url: app.globalData.g_ip + '/wxes/public/home/Customer/select_Customerlist',
      success: function (res) {
        that.setData({
          customerList: res.data
        });
      }
    })
  },
  _deleteCustomerInfo: function (idx) {
    var that = this;
    wx.request({
      url: app.globalData.g_ip + '/wxes/public/home/Customer/del_Customer',
      data: { id: idx },
      method: "POST",
      success: function (res) {
        that._getCustomerInfo();
      }
    })
  }
})