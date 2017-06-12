// task.js

var app = getApp()
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
    this.setData({
      userInfo: app.globalData.g_userInfo.userInfo_openid
    });
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
  formSubmit: function (e) {
    e.detail.value.openid= this.data.userInfo.openid
    wx.request({
      url: 'http://192.168.3.158/wxes/public/index.php/home/Task/add_Task',
      method: "POST",
      data: e.detail.value,
      success: function (res) {
        wx.navigateBack({
          url: '/post'
        })
      }
    })
  },
  addpic: function () {
    wx.chooseImage({
      count: 9, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        wx.showToast({
          title: '上传成功',
          icon: 'success',
          duration: 2000
        });
        setTimeout(function () {
          wx.hideToast();
        }, 1000);

        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;

        var imgList = wx.getStorageSync("imgSrcs");
        var imgSrc = [];


        for (var i = 0; i < tempFilePaths.length; i++) {
          wx.saveFile({
            tempFilePath: tempFilePaths[i],
            success: function (res) {
              var savedFilePath = res.savedFilePath;
              for (var j = 0; j < imgList.length; j++) {
                imgSrc.push(imgList[j]);
              }
              imgSrc.unshift(savedFilePath)
              wx.setStorageSync("imgSrcs", imgSrc);
            }
          })
        }
      },
      fail: function () {
        wx.showToast({
          title: '上传失败，请重新上传',
          icon: 'success',
          duration: 2000
        });
        setTimeout(function () {
          wx.hideToast();
        }, 1000);
      }
    })
  }
})