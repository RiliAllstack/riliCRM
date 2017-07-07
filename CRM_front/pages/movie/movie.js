var util = require('../../util/util.js')
import { DBPost } from '../../db/DBPost.js';

var app = getApp();
Page({
  data: {
    inTheaters: {},
    comingSoon: {},
    top250: {},
    containerShow: true,
    searchPanelShow: false,
    searchResult: {},
  },

  onLoad: function (event) {
    var dbPost = new DBPost();
    this.setData({
      postList: dbPost.getAllPostData()
    });
    wx.showNavigationBarLoading();

    this.processDoubanData(this.data.postList.onlines, "inTheaters", "已上线");
    this.processDoubanData(this.data.postList.waittingonline, "comingSoon", "更多功能，敬请期待。。");
  },

  getMovieListData: function (url, settedKey, categoryTitle) {
    var that = this;
    wx.request({
      url: url,
      method: 'GET',
      header: {
        "content-type": "json"
      },
      success: function (res) {
        that.processDoubanData(res.data, settedKey, categoryTitle)
      },
      fail: function (error) {
        // fail
        console.log(error)
      }
    })
  },

  processDoubanData: function (moviesDouban, settedKey,
    categoryTitle) {
    var movies = [];
    for (var idx in moviesDouban) {
      var subject = moviesDouban[idx];
      var title = subject.title;
      if (title.length >= 6) {
        title = title;
      }
      // [1,1,1,1,1] [1,1,1,0,0]

      var temp = {
        title: title,
        coverageUrl: subject.postImg,
        movieId: subject.postId
      }
      movies.push(temp)
     
    }
    var readyData = {};
    readyData[settedKey] = {
      categoryTitle: categoryTitle,
      movies: movies
    }
    this.setData(readyData);
    console.log('hide');
    wx.hideNavigationBarLoading();
  },

  onMoreTap: function (event) {
    var category = event.currentTarget.dataset.category;
    wx.navigateTo({
      url: "more-movie/more-movie?category=" + category
    })
  },

  onMovieTap: function (event) {
    var movieId = event.currentTarget.dataset.movieId;
    console.log(movieId)
    if(movieId ==1)
    wx.navigateTo({
      url:"/pages/customer/customer"
      //url: "movie-detail/movie-detail?id=" + movieId
    })
    if(movieId ==4)
    wx.navigateTo({
      url: '/pages/reports/reports',
    })
    if (movieId == 5)
      wx.navigateTo({
        url: '/pages/knowledge/knowledge',
      })
    if (movieId == 6)
      wx.navigateTo({
        url: '/pages/team/team',
      })
  },

  onBindFocus: function (event) {
    this.setData({
      containerShow: false,
      searchPanelShow: true
    })
  },

  onCancelImgTap: function (event) {
    this.setData({
      containerShow: true,
      searchPanelShow: false,
      searchResult: {},
      inputValue: ''
    }
    )
  },

  onBindConfirm: function (event) {
    var keyWord = event.detail.value;
    var searchUrl = app.globalData.doubanBase +
      "/v2/movie/search?q=" + keyWord;
    this.getMovieListData(searchUrl, "searchResult", "");

  }

})