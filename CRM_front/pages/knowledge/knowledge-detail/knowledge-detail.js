// knowledge-detail.js
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
      uploadType: options.type
    })
    if (this.data.uploadType == 1)
      this.setData({
        filepath: 'contracts'
      });
    if (this.data.uploadType == 2)
      this.setData({
        filepath: 'products'
      });
    if (this.data.uploadType == 3)
      this.setData({
        filepath: 'brochures'
      });

    this._getKnowledge()
  },

  _getKnowledge: function () {
    var that = this
    wx.request({
      url: app.globalData.g_ip + '/wxes/public/index.php/home/Reports/select_file?type=' + that.data.uploadType,

      success: function (res) {
        that.setData({
          files: res.data
        })
      },
    })
  },

  openFile: function (e) {
    var that = this
    wx.downloadFile({
      url: app.globalData.g_ip + '/wxes/public/' + that.data.filepath + '/' + e.currentTarget.dataset.filename,
      //url: 'http://192.168.3.158/wxes/public/contracts/请假单.doc',
      success: function (res) {
        var filePath = res.tempFilePath
        wx.openDocument({
          filePath: filePath,
          success: function (res) {
            console.log('打开文档成功')
          },
          fail: function (res) {
            console.log(res.data)
          }
        })
      }
    })
  }
})