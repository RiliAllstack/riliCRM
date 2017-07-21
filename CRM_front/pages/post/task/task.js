// task.js

var app = getApp()

var curDate = new Date();
var curMonth = curDate.getMonth();
var curYear = curDate.getFullYear();
var curDay = curDate.getDate();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: curYear + '-' + (curMonth + 1) + '-' + curDay,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userInfo: app.globalData.g_userInfo.userInfo_openid
    });
  },

  formSubmit: function (e) {
    e.detail.value.openid = this.data.userInfo.openid
    e.detail.value.date = this.data.date
    wx.request({
      url: app.globalData.g_ip+'/wxes/public/index.php/home/Task/add_Task',
      method: "POST",
      data: e.detail.value,
      success: function (res) {
        wx.navigateBack({
          url: '/post'
        })
      }
    })
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
})