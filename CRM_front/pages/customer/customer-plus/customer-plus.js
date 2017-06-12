// customer-plus.js
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
  /*
   * input绑定数据
   */
  bindCompanyInput: function (e) {
    this.setData({
      companyValue: e.detail.value
    })
  },
  bindChargerInput: function (e) {
    this.setData({
      chargerValue: e.detail.value
    })
  },
  bindScaleInput: function (e) {
    this.setData({
      scaleValue: e.detail.value
    })
  },
  bindPositionInput: function (e) {
    this.setData({
      positionValue: e.detail.value
    })
  },
  bindScheduleInput: function (e) {
    this.setData({
      scheduleValue: e.detail.value
    })
  },
  bindFollowUperInp: function (e) {
    this.setData({
      followUperValue: e.detail.value
    })
  },
  bindRemarkInput: function (e) {
    this.setData({
      remarkValue: e.detail.value
    })
  },
  formSubmit: function (e) {
    console.log(e.detail.value)
    wx.request({
      url: 'http://192.168.3.158/wxes/public/index.php/home/Customer/add_Customer',
      data: e.detail.value,
      method: "POST",
      success: function (res) {
        if(res.data.success)
        {
          wx.showToast({
            title: '添加成功',
            icon: 'success',
            duration: 2500
          })
          wx.navigateBack({
            url: '/pages/customer/customer',
          })
        }
      }
    })
  },
})