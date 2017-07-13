var app= new getApp()
Page({
  data: {
    array: ['销售经理', '业务'],
    openid: app.globalData.g_userInfo.userInfo_openid.openid,
  },
  onLoad: function () {

  },
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
  },
  submit:function(){
    var data={}
    data.company = this.data.companyName
    data.usergroup = parseInt(this.data.index)+1
    data.openid = this.data.openid
    wx.request({
      url: 'http://192.168.3.158/wxes/public/home/Reviews/addReviews',
      data:data,
      method:"POST",
      success:function(res){
        console.log(res.data)
      }
    })
  },
  bindCompanyInput:function(e){
    this.setData({
      companyName: e.detail.value
    })
  },
  onShareAppMessage:function(){
    
  }
});