// team.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid: app.globalData.g_userInfo.userInfo_openid.openid,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getTeam()
  },
  _getTeam: function () {
    var that = this
    wx.request({
      url: app.globalData.g_ip + '/wxes/public/home/User/Group_Reports?openid=' + that.data.openid,
      success: function (res) {
        that.setData({
          team: res.data
        })
      }
    })
  },
  phoneContact:function(){
    console.log('contact')
    wx.addPhoneContact()
  },
  mateDetail:function(e){
    var that = this
    var detail = {}
    detail.Id = e.currentTarget.dataset.detail.Id
    detail.nickName = e.currentTarget.dataset.detail.nickName

    detail.avatarUrl = e.currentTarget.dataset.detail.avatarUrl
    detail.telephone = e.currentTarget.dataset.detail.telephone
    detail.usergroup = e.currentTarget.dataset.detail.usergroup
    that.setData({
      detail:detail
    })
    wx.navigateTo({
      url: '/pages/team/mate-detail/mate-detail?data=' + JSON.stringify(detail),
    })
  }
})