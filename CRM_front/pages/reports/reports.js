// personer.js
var app = new getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    indexC: 0,
    indexT: 0,
    reportGetType: 1,
    MyGetType: 1,
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
  onTapToPlus: function () {
    wx.navigateTo({
      url: "/pages/reports/reports-plus/reports-plus"
    })
  },
  onTapToDetail: function (e) {
    var that = this
    var idx = e.currentTarget.dataset.reportidx
    wx.navigateTo({
      url: "/pages/reports/reports-plus/reports-plus?data=" + JSON.stringify(that.data.reports[idx])
    })
  },
  onChangeReports: function () {
    var indexC = 0;
    var that = this
    wx.showActionSheet({
      itemList: ['发给我的报告', '我发出去的报告', '全部报告'],
      itemColor: "#405f80",
      success: function (res) {
        if (res.tapIndex == 0) {
          console.log("跳至发给我的报告")
          indexC = 0;

        }
        if (res.tapIndex == 1) {
          console.log("跳至我发出去的报告")
          indexC = 1;
        }
        if (res.tapIndex == 2) {
          console.log("跳至全部报告")
          indexC = 2;
        }
        // if (res.tapIndex == 3) {
        //   console.log("跳至待阅报告")
        //   indexC = 3;
        // }
        that.setData({
          indexC: indexC,
          MyGetType: indexC + 1
        })
        that._selectReports()
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
      itemList: ['最新创建', '最新修改', '最近7日', '当月'],
      itemColor: "#405f80",
      success: function (res) {
        if (res.tapIndex == 0) {
          indexT = 0;
        }
        if (res.tapIndex == 1) {
          indexT = 1;
        }
        if (res.tapIndex == 2) {
          indexT = 2;
        }
        if (res.tapIndex == 3) {
          indexT = 3;
        }
        that.setData({
          indexT: indexT,
          reportGetType: indexT + 1
        })
        that._selectReports()
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
  _selectReports: function () {
    var that = this
    wx.request({
      url: 'http://192.168.3.158/wxes/public/home/Reports/select_ReportsList?typeC=' + that.data.reportGetType + "&type=" + that.data.MyGetType + "&openid=" + app.globalData.g_userInfo.userInfo_openid.openid,
      success: function (res) {
        that.setData({
          reports: res.data
        })
      }
    })
  }
})