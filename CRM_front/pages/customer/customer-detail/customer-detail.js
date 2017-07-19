// customer-detail.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bl: 1,
    openid: app.globalData.g_userInfo.userInfo_openid.openid,
    singleRecord: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      customerDetail: JSON.parse(options.data)
    })
    this._getRecords()
  },
  onPullDownRefresh: function () {
    this._getRecords()
    wx.stopPullDownRefresh()
  },
  
  bindSingleRecord: function (e) {
    this.setData({
      singleRecord: e.detail.value
    })
  },
  changeTab: function (e) {
    var bl = e.currentTarget.dataset.bl
    this.setData({
      bl: bl
    })
  },
  _getRecords: function () {
    var that = this
    wx.request({
      url: 'http://192.168.3.158/wxes/public/home/Customerrecords/OrderBy_Customer?customer_id=' + that.data.customerDetail.id + '&user_id=' + that.data.openid,
      success: function (res) {
        that.setData({
          records: res.data
        })
      }
    })
  },
  editCustomer: function () {
    var that = this
    var data = that.data.customerDetail

    wx.navigateTo({
      url: "/pages/customer/customer-plus/customer-plus?company=" + data.company + "&charger=" + data.charger + "&scale=" + data.scale + "&position=" + data.position + "&schedule=" + data.schedule + "&followerUper=" + data.followerUper + "&remark=" + data.remark + "&plusType=2"
      + "&id=" + data.id,
    })
  },
  sendRecords: function () {
    var that = this

    wx.request({
      url: 'http://192.168.3.158/wxes/public/home/Customerrecords/add_records',
      data: {
        detail: that.data.singleRecord,
        user_id: that.data.openid,
        imgList: wx.getStorageSync("imgSrcs"),
        customer_id: that.data.customerDetail.id,
        type: 2,

      },
      method: "POST",
      success: function (res) {
        that._getRecords()
      }
    })

    wx.getSavedFileList({
      success: function (res) {
        console.log(res.fileList.length)
        if (res.fileList.length > 0) {
          var arr = []
          for (var key in res.fileList) {
            arr.push(res.fileList[key].filePath);
          }
          var openid = that.data.openid
          for (var i = 0; i < res.fileList.length; i++) {
            wx.uploadFile({
              url: 'http://192.168.3.158/wxes/public/home/Reports/upload',
              filePath: arr[i],
              name: 'file',
              header: { "Content-Type": "multipart/form-data" },
              formData: {
                openid: openid,
                filePath: arr[i]
              },
              success: function (res) {
                console.log(res.data)
              }
            })
          }

        }
      }
    })
  
    this._getRecords()
  },
  uploadImg: function () {
    //清除缓存文件
    wx.getSavedFileList({
      success: function (res) {
        for (var i = 0; i < res.fileList.length; i++) {
          wx.removeSavedFile({
            filePath: res.fileList[i].filePath,
            complete: function (res) {
              console.log(res)
            }
          })
        }
      }
    });
    var that = this
    var imgSrc = [];
    wx.setStorageSync("imgSrcs", imgSrc);
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
          title: '添加失败，请重新添加',
          icon: 'success',
          duration: 3000
        });
        setTimeout(function () {
          wx.hideToast();
        }, 3000);
      }
    })
  },
  recordDelete:function(e){
    var that = this
    wx.request({
      url: 'http://192.168.3.158/wxes/public/home/Customerrecords/postdelCustomer',
      data:{
        id: e.currentTarget.dataset.recordid
      },
      method:"POST",
      success:function(res){
        that._getRecords()
      }
    })
  }
})