App({
  onLaunch: function () {
    var storageData = wx.getStorageSync('postList');
    if (!storageData) {
      var dataObj = require("data/data.js")
      wx.clearStorageSync();
      wx.setStorageSync('postList', dataObj.postList);
    }
    this._getUserInfo();
  },
  _getUserInfo: function () {
    var userInfoStorage = '';//wx.getStorageSync('user');
    if (!userInfoStorage) {
      var that = this;
      wx.login({
        success: function (res) {
          if (res.code) {
            //发起网络请求
            wx.request({
              url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx0513e8457b3c6967&secret=dc7a6ee57ef23d3131701b51bd560b79&js_code=' + res.code + '&grant_type=authorization_code',
              header: {
                'content-type': 'application/json'
              },
              success: function (res) {
                that.globalData.g_userInfo.userInfo_openid = res.data
                
              }
            })

          } else {
            console.log('获取用户登录态失败！' + res.errMsg)
          }
          wx.getUserInfo({
            success: function (res) {
              that.globalData.g_userInfo.userInfo = res.userInfo
              console.log(that.globalData.g_userInfo)
              wx.setStorageSync('user', that.globalData.g_userInfo)
              // 记录用户登录数据
              wx.request({
                url: 'http://192.168.3.158/wxes/public/index.php/home/User/add_Users',
                //url:'http://localhost/test.php',
                method: 'POST',
                data: that.globalData.g_userInfo,
                header: {
                  'content-type': 'application/json'
                },
                success: function (res) {
                  console.log('charuok'+res.data)
                }
              })
            },
            fail: function (res) {
              console.log(res.data);
            }
          })
        }
      })
    }
    else {
      this.globalData.g_userInfo = userInfoStorage;
    }
  },
  globalData: {
    g_isPlayingMusic: false,
    g_currentMusicPostId: null,
    doubanBase: "https://api.douban.com",
    g_userInfo: {
      userInfo: null,
      userInfo_openid: null
    }
  }
})