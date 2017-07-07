// customer.js
var customerData = require('../../data/customer_info.js')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indexC: 0,
    indexT: 0,
    customerGetType: 1,//按照创建时间2：按修改时间排序
    MyGetType: 1//全部客户2：与我相关
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this._getCustomerInfo()
  },

  onTapToPlus: function () {
    wx.navigateTo({
      url: "/pages/customer/customer-plus/customer-plus"
    })
  },
  onTapToDelete: function (e) {
    //this._deleteCustomerInfo(e.currentTarget.dataset.customerid)
  },
  //按下事件开始  
  mytouchstart: function (e) {
    var that = this;
    that.setData({
      touch_start: e.timeStamp
    })
    console.log(e.timeStamp + '- touch-start')
  },
  //按下事件结束  
  mytouchend: function (e) {
    var that = this;
    that.setData({
      touch_end: e.timeStamp
    })
    console.log(e.timeStamp + '- touch-end')
  }, 

  onTapToDetail: function (e) {
    var that = this
    var idx = e.currentTarget.dataset.customerid
    var name = that.data.customerList[idx].company
    var id = that.data.customerList[idx].id
    var touchTime = that.data.touch_end - that.data.touch_start; 
    if (touchTime>350)
    {
      wx.showModal({
        title: '提示',
        content: '删除-' + name +'!',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            that._deleteCustomerInfo(id)
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
    else
    {
      wx.navigateTo({
        url: "/pages/customer/customer-detail/customer-detail?data=" + JSON.stringify(that.data.customerList[idx])
      })
    }
    
  },
  onChangeCustomer: function () {
    var indexC = 0
    var that = this
    wx.showActionSheet({
      itemList: ['与我相关的客户', '全部客户'],
      itemColor: "#405f80",
      success: function (res) {
        if (res.tapIndex == 0) {
          console.log("跳至与我相关的客户")
          indexC = 0
        }
        if (res.tapIndex == 1) {
          console.log("跳至全部客户")
          indexC = 1
        }
        that.setData({
          indexC: indexC,
          MyGetType: indexC + 1
        })
        that._getCustomerInfo()
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
          indexT = 0
        }
        if (res.tapIndex == 1) {
          indexT = 1
        }
        that.setData({
          indexT: indexT,
          customerGetType: indexT + 1
        })
        that._getCustomerInfo()
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
  _getCustomerInfo: function () {
    var that = this
    wx.request({
      url: app.globalData.g_ip + '/wxes/public/home/Customer/select_Customerlist?type=' + that.data.customerGetType + "&typeC=" + that.data.MyGetType + "&openid=" + app.globalData.g_userInfo.userInfo_openid.openid,
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