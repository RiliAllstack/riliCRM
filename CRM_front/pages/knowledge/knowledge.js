// knowledge.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    device: [
      { iconurl: '/images/icon/other_icon/knowledge_in.png', title: '公司知识库', tap: 'showCompany' },
      { iconurl: '/images/icon/other_icon/knowledge_in.png', title: '我的知识库', tap: 'showPersonal' },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  showCompany: function () {
    wx.navigateTo({
      url: '/pages/knowledge/company-knowledge/company-knowledge',
    })
  },
  showPersonal: function () {
    wx.navigateTo({
      url: '/pages/knowledge/knowledge-detail/knowledge-detail?type=4',
    })
  }
})