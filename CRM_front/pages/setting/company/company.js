var app = getApp()
Page({
  data: {
    array: ['销售经理', '业务'],

  },
  onLoad: function () {
    this.setData({
      openid: app.globalData.g_userInfo.userInfo_openid.openid,
    })
  },
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
  },
  submit: function () {
    var data = {}
    data.company = this.data.companyName
    data.usergroup = parseInt(this.data.index) + 1
    data.openid = this.data.openid
    wx.request({
      url: app.globalData.g_ip + '/wxes/public/home/Reviews/addReviews',
      data: data,
      method: "POST",
      success: function (res) {
        if (res.data.type == 1) {
          wx.showToast({
            title: '创建公司成功',
            icon: 'success',
            duration: 2500
          })
        }
        if (res.data.type == 2) {
          wx.showToast({
            title: '业务员无法创建公司',
            icon: 'success',
            duration: 2500
          })
        }
        if (res.data.type == 3) {
          wx.showToast({
            title: '提交成功，待审核',
            icon: 'success',
            duration: 2500
          })
        }
        if (res.data.success == false) {
          wx.showToast({
            title: '已提交过，无需重复提交',
            icon: 'success',
            duration: 2500
          })
        }
      }
    })
  },
  bindCompanyInput: function (e) {
    this.setData({
      companyName: e.detail.value
    })
  },
  onShareAppMessage: function () {

  }
});