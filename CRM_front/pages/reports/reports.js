// personer.js
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
    this._selectReports()
  
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
  onTapToPlus:function(){
    wx.navigateTo({
      url: "/pages/reports/reports-plus/reports-plus"
    })
  },
  onTapToDetail:function(){
    var that = this
    var id = e.currentTarget.dataset.reportid
    console.log(that.data.reports[id])

    // wx.navigateTo({
    //   url: "/pages/customer/customer-detail/customer-detail?data=" + JSON.stringify(that.data.customerList[id])
    // })
  },
  onChangeReports:function(){
    wx.showActionSheet({
      itemList: ['发给我的报告', '我发出去的报告','全部报告','待阅报告'],
      itemColor: "#405f80",
      success: function (res) {
        if (res.tapIndex == 0) {
          console.log("跳至发给我的报告")

        }
        if (res.tapIndex == 1) {
          console.log("跳至我发出去的报告")

        }
        if (res.tapIndex == 2) {
          console.log("跳至全部报告")

        }
        if (res.tapIndex == 3) {
          console.log("跳至待阅报告")

        }
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
  onChangeTime:function(){
    wx.showActionSheet({
      itemList: ['最新创建', '最新更新'],
      itemColor: "#405f80",
      success: function (res) {
        if (res.tapIndex == 0) {
          console.log("跳至最新创建")

        }
        if (res.tapIndex == 1) {
          console.log("跳至最新更新")

        }
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
  _selectReports:function(){
    var that = this
    wx.request({
      url: 'http://192.168.3.158/wxes/public/home/Reports/select_ReportsList',
      success:function(res){
        that.setData({
          reports:res.data
        })
      }
    })
  }
})