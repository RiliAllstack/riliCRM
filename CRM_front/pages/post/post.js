import { DBPost } from '../../db/DBPost.js';

var app = getApp()

Page({
  data: {

    device: [
      { iconurl: '/images/icon/other_icon/pin.png', title: '待办', tap: 'showTodos' },
      { iconurl: '/images/icon/other_icon/bell-out.png', title: '通知', tap: 'showNetWork' },
      { iconurl: '/images/icon/other_icon/boxes.png', title: '公告', tap: 'showMap' },
    ],
    taskShowStatus: []
  },
  onLoad: function () {
    var dbPost = new DBPost();
    this.setData({
      postList: dbPost.getAllPostData(),
      userInfo: app.globalData.g_userInfo.userInfo_openid,
    });
  },
  onShow: function () {
    this.selectTask()
  },
  showMap: function () {
    wx.navigateTo({
      url: 'message/message',
    })
  },
  showTodos:function(){
    wx.navigateTo({
      url: 'calendar/calendar',
    })
  },

  // target 和currentTarget
  // target指的是当前点击的组件 和currentTarget 指的是事件捕获的组件
  // target这里指的是image，而currentTarget指的是swiper
  onSwiperTap: function (event) {
    var postId = event.target.dataset.postId;
    wx.navigateTo({
      url: "post-detail/post-detail?id=" + postId
    })
  },
  onArrange: function () {
    wx.showActionSheet({
      itemList: ['新建日程', '新建任务'],
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
      url: 'http://192.168.3.158/wxes/public/home/Task/getTask?open_id=' + openId,
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
      }
    })
  },
  dealTask: function (e) {
    console.log(e.currentTarget.dataset)
    var that = this
    wx.request({
      url: 'http://192.168.3.158/wxes/public/index.php/home/Task/dealTask',
      method: 'POST',
      data:
      {
        openId: that.data.userInfo.openid,
        type: e.currentTarget.dataset.type,
        delayTime: '20170606',
        taskId: e.currentTarget.dataset.taskid
      },
      success: function (res) {

      }
    })
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
  }
})