// reports-plus.js
var app = new getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._updateChosenStatus()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
    this._updateChosenStatus()
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

  getPosition: function () {
    var address = ''
    var that = this
    wx.chooseLocation({
      type: 'gcj02',
      success: function (res) {
        address = res.address
        that.setData({
          address: address
        })
      }
    })
  },
  uploadImg: function () {
    wx.getSavedFileList({
      success: function (res) {
        if (res.fileList.length > 0) {
          wx.removeSavedFile({
            filePath: res.fileList[0].filePath,
            complete: function (res) {
              console.log(res)
            }
          })
        }
      }
    });
    var imgSrc = [];
    wx.setStorageSync("imgSrcs", imgSrc);
    var that = this
    wx.chooseImage({
      count: 8, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        wx.showToast({
          title: '添加成功',
          icon: 'success',
          duration: 2000
        });
        setTimeout(function () {
          wx.hideToast();
          that.show()
        }, 1000);

        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;


        var imgList = wx.getStorageSync("imgSrcs");
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
  },
  show: function () {
    var imgList = wx.getStorageSync("imgSrcs");
    var imgList1 = new Array()
    var imgList2 = new Array()
    console.log((imgList.length <= 4) ? imgList.length : 4)
    for (var i = 0; i < ((imgList.length <= 4) ? imgList.length : 4); i++) {
      imgList1.push(imgList[i]);
    }
    for (var i = 4; i < ((imgList.length >= 4) ? imgList.length : 4); i++) {
      imgList2.push(imgList[i]);
    }
    console.log(imgList1)
    console.log(imgList2)
    var that = this;
    that.setData({
      imgSrcs1: imgList1,
      imgSrcs2: imgList2
    });
  },

  remove: function (e) {
    console.log(e.currentTarget.dataset.id)
    var imgList = wx.getStorageSync("imgSrcs");
    imgList.splice(e.currentTarget.dataset.id, 1)
    wx.setStorageSync("imgSrcs", imgList);
    this.show();
  },
  previewImg: function (e) {
    wx.previewImage({
      current: wx.getStorageSync("imgSrcs")[e.currentTarget.dataset.id],
      urls: wx.getStorageSync("imgSrcs"),
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  addReports: function (e) {
    e.detail.value.recipients = 1
    e.detail.value.copy = 2
    e.detail.value.openid = app.globalData.g_userInfo.userInfo_openid.openid
    e.detail.value.id = 0
    console.log(e.detail.value)
    wx.getSavedFileList({
      success: function (res) {
        if (res.fileList.length > 0) {
          var arr = []
          for (var key in res.fileList) {
            arr.push(res.fileList[key].filePath);
          }
          for (var i = 0; i < res.fileList.length; i++) {
            wx.uploadFile({
              url: 'http://192.168.3.158/wxes/public/home/Reports/upload',
              filePath: arr[i],
              name: 'file',
              header: { "Content-Type": "multipart/form-data" },
              formData: e.detail.value,
              success: function (res) {
                var dd = res.data;
                console.log(dd)
                if (res.data.success) {
                  wx.showToast({
                    title: '上传成功',
                    icon: 'success',
                    duration: 2500
                  })
                  // wx.navigateBack({
                  //   url: '/pages/customer/customer',
                  // })
                }
              }
            })
          }
        }
      }
    });
  },
  clean: function () {
    wx.setStorageSync("imgSrcs", []);
    this.show();
    this.setData({
      address: ''
    })
  },
  selectmates: function (e) {
    wx.navigateTo({
      url: "/pages/team/mates/mates?type="+e.currentTarget.dataset.type,
    })
  },
  _updateChosenStatus:function(){
    var matesChosen = wx.getStorageSync("matesChosen")
    var arr = new Array()
    for (var i = 0; i < matesChosen.length; i++) {
      var obj = {}
      obj.id = matesChosen[i].split('-')[0]
      obj.name = matesChosen[i].split('-')[1]
      obj.type = matesChosen[i].split('-')[2]
      arr.push(obj)
    }
    this.setData({
      matesChosen: arr
    })
  }
})