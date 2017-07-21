import { DBPost } from '../../db/DBPost.js';

var app = getApp()

Page({
  data: {

    device: [
      { iconurl: '/images/icon/other_icon/pin.png', title: '待办', tap: 'showTodos', id: 0 },
      { iconurl: '/images/icon/other_icon/bell-out.png', title: '通知', tap: 'showNotice', id: 1 },
      { iconurl: '/images/icon/other_icon/boxes.png', title: '公告', tap: 'showMessage', id: 2 },
    ],
    taskShowStatus: []
  },
  onLoad: function () {
    var dbPost = new DBPost();
    this.setData({
      postList: dbPost.getAllPostData(),
      userInfo: app.globalData.g_userInfo.userInfo_openid,
      redHatTime:wx.getStorageSync('redHatTime')
    });
  },
  onShow: function () {
    this.selectTask()
    this._getRedhat()
  },
  showMessage: function () {
    wx.navigateTo({
      url: 'message/message',
    })
  },
  showTodos: function () {
    wx.navigateTo({
      url: 'calendar/calendar',
    })
  },
  showNotice: function () {
    wx.navigateTo({
      url: 'notice/notice',
    })
  },

  // onSwiperTap: function (event) {
  //   var postId = event.target.dataset.postId;
  //   wx.navigateTo({
  //     url: "post-detail/post-detail?id=" + postId
  //   })
  // },
  onArrange: function () {
    wx.showActionSheet({
      itemList: ['新建任务'],
      itemColor: "#405f80",
      success: function (res) {
        if (res.tapIndex == 0) {
          console.log("跳至新建日程页面")
          wx.navigateTo({
            url: 'task/task',
          })
        }
        if (res.tapIndex == 1) {
          console.log("跳至新建任务页面")
          wx.navigateTo({
            url: 'task/task',
          })
        }
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
  selectTask: function () {
    var that = this;
    var openId = that.data.userInfo.openid
    wx.request({
      url: app.globalData.g_ip + '/wxes/public/home/Task/getTask?open_id=' + openId,
      success: function (res) {
        if (res.data.length >= 1) {
          var obj = {}
          obj.isShow = false
          var exist = true
          for (var i = 0; i < res.data.length; i++) {

            if (that.data.taskShowStatus.length == 0) {
              exist = false
            }
            else {
              for (var j = 0; j < that.data.taskShowStatus.length; j++) {
                if (res.data[i].Id == that.data.taskShowStatus[j].id) {
                  exist = true
                  break
                }
                else
                { exist = false }
              }
            }
            if (!exist) {
              obj.id = res.data[i].Id
              that.data.taskShowStatus.push(obj)
              that.setData({
                taskShowStatus: that.data.taskShowStatus
              })
            } else {
              console.log('不用插了已经有了')
            }
          }
          that.setData({
            isNullTask: false,
            taskList: res.data,
          })
        }
        else {
          that.setData({
            isNullTask: true,
          })
        }
      },
      fail: function (res) {
        wx.showToast({
          title: res.errMsg,
          duration: 2000
        })
      }
    })
  },
  dealTask: function (e) {
    console.log(e.currentTarget.dataset)
    var that = this
    wx.request({
      url: app.globalData.g_ip + '/wxes/public/home/Task/dealTask',
      method: 'POST',
      data:
      {
        openId: that.data.userInfo.openid,
        type: e.currentTarget.dataset.type,
        delayTime: '20170606',
        taskId: e.currentTarget.dataset.taskid
      },
      success: function (res) {
        if ((e.currentTarget.dataset.type == 3) && (res.data.success ==true))
        {
          wx.showToast({
            title: '删除成功',
            duration: 2000
          })
          that.selectTask()
        }
        if ((e.currentTarget.dataset.type == 1) && (res.data.success == true))
        {
          wx.showToast({
            title: '完成！！',
            duration: 2000
          })
          that.selectTask()
        }
      }
    })
  },
  altDate:function(){

  },
  hide: function (e) {
    var index = e.currentTarget.dataset.postid
    var taskShowStatus = this.data.taskShowStatus[index].isShow
    taskShowStatus = !taskShowStatus
    var param = {}
    var str = "taskShowStatus[" + index + "].isShow"
    param[str] = taskShowStatus;
    this.setData(param);
  },
  onPullDownRefresh: function () {
    this.selectTask()
    wx.stopPullDownRefresh()
  },
  _getRedhat: function () {
    var that = this
    wx.request({
      url: app.globalData.g_ip+'/wxes/public/home/Message/Redhot?openid=' + that.data.userInfo.openid,
      success: function (res) {
        that.setData({
          redHat: res.data,
          redHatTime: wx.getStorageSync('redHatTime')
        })
        wx.setStorageSync('redHatTime', res.data[2])
      }
    })
  }
})