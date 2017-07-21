// customer-plus.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    plusType: 1,
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      company: options.company,
      charger: options.charger,
      scale: options.scale,
      position: options.position,
      schedule: options.schedule,
      followerUper: options.followerUper,
      remark: options.remark,
      plusType: options.plusType,
      id: options.id,
      openid: app.globalData.g_userInfo.userInfo_openid.openid,
    })
  },

  formSubmit: function (e) {
    if (e.currentTarget.dataset.type == 1) {
      e.detail.value.openid=this.data.openid
      wx.request({
        url: app.globalData.g_ip + '/wxes/public/index.php/home/Customer/add_Customer',
        data: e.detail.value,
        method: "POST",
        success: function (res) {
          if (res.data.success) {
            wx.showToast({
              title: '保存成功',
              icon: 'success',
              duration: 2500
            })
            wx.navigateBack({
              url: '/pages/customer/customer',
            })
          }
        }
      })
    }
    else if (e.currentTarget.dataset.type == 2) {
      e.detail.value.id = this.data.id
      wx.request({
        url: app.globalData.g_ip + '/wxes/public/index.php/home/Customer/postUpdateCustomer',
        data: e.detail.value,
        method: "POST",
        success: function (res) {
          if (res.data.success) {
            wx.showToast({
              title: '保存成功',
              icon: 'success',
              duration: 2500
            })
            wx.navigateBack({
              url: '/pages/customer/customer',
            })
          }
        }
      })
    }

  },

})