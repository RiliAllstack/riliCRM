// company-knowledge.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    device: [
      { iconurl: '/images/icon/other_icon/knowledge_in.png', title: '合同模板', tap: 'showContracts' },
      { iconurl: '/images/icon/other_icon/knowledge_in.png', title: '产品资料', tap: 'showProducts' },
      { iconurl: '/images/icon/other_icon/knowledge_in.png', title: '宣传册资料', tap: 'showBrochures' },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  showContracts:function(){
    wx.navigateTo({
      url: '/pages/knowledge/knowledge-detail/knowledge-detail?type=1',
    })
  },
  showProducts: function () {
    wx.navigateTo({
      url: '/pages/knowledge/knowledge-detail/knowledge-detail?type=2',
    })
  },
  showBrochures: function () {
    wx.navigateTo({
      url: '/pages/knowledge/knowledge-detail/knowledge-detail?type=3',
    })
  }
})