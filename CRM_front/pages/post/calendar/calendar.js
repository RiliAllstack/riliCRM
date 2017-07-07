
var ccFile = require('../../../util/calendar-converter.js')
var calendarConverter = new ccFile.CalendarConverter();

//月份天数表
var DAY_OF_MONTH = [
  [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
  [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
];

//判断当前年是否闰年
var isLeapYear = function (year) {
  if (year % 400 == 0 || (year % 4 == 0 && year % 100 != 0))
    return 1
  else
    return 0
};

//获取当月有多少天
var getDayCount = function (year, month) {
  return DAY_OF_MONTH[isLeapYear(year)][month];
};

//获取当前索引下是几号
var getDay = function (index) {
  return index - curDayOffset;
};

var pageData = {
  date: "",                //当前日期字符串

  //arr数据是与索引对应的数据信息
  arrIsShow: [],          //是否显示此日期
  arrDays: [],            //关于几号的信息
  arrInfoEx: [],          //农历节假日等扩展信息
  arrInfoExShow: [],      //处理后用于显示的扩展信息

  //选择一天时显示的信息
  detailData: {
    curDay: "",         //detail中显示的日信息
    curInfo1: "",
    curInfo2: "",
  }

}

//设置当前详细信息的索引，前台的详细信息会被更新
var setCurDetailIndex = function (index) {
  var curEx = pageData.arrInfoEx[index];
  curDay = curEx.sDay - 1;
  pageData.detailData.curDay = curEx.sDay;
  pageData.detailData.curInfo1 = "农历" + curEx.lunarMonth + "月" + curEx.lunarDay;
  pageData.detailData.curInfo2 = curEx.cYear + curEx.lunarYear + "年 " + curEx.cMonth + "月 " + curEx.cDay + "日 " + curEx.lunarFestival;
}

//刷新全部数据
var refreshPageData = function (year, month, day) {
  pageData.date = year + '年' + (month + 1) + '月';

  var offset = new Date(year, month, 1).getDay();
  for (var i = 0; i < 42; ++i) {
    pageData.arrIsShow[i] = i < offset || i >= getDayCount(year, month) + offset ? false : true;
    pageData.arrDays[i] = i - offset + 1;
    var d = new Date(year, month, i - offset + 1);
    var dEx = calendarConverter.solar2lunar(d);
    pageData.arrInfoEx[i] = dEx;
    if ("" != dEx.lunarFestival) {
      pageData.arrInfoExShow[i] = dEx.lunarFestival;
    }
    else if ("初一" === dEx.lunarDay) {
      pageData.arrInfoExShow[i] = dEx.lunarMonth + "月";
    }
    else {
      pageData.arrInfoExShow[i] = dEx.lunarDay;
    }
  }

  setCurDetailIndex(offset + day - 1);
};

var curDate = new Date();
var curMonth = curDate.getMonth();
var curYear = curDate.getFullYear();
var curDay = curDate.getDate();
//console.log(curMonth + '月' + curYear + '年' + curDay +'日');
refreshPageData(curYear, curMonth, curDay);

var app = getApp()

Page({
  data: pageData,

  onLoad: function (options) {
    this.setData({
      userInfo: app.globalData.g_userInfo.userInfo_openid
    })
    this.getTaskMonth();
    },
  getTaskMonth: function () {
    var that = this;
    wx.request({
      url: app.globalData.g_ip + '/wxes/public/index.php/home/Task/select_TaskList?open_id=' + that.data.userInfo.openid + '&start_time=' + '2017-07',
      success: function (res) {
        pageData.detailData.curDayTask = res.data[pageData.detailData.curDay - 1].data;
        that.setData({
          everdayTask: res.data,
          detailData: pageData.detailData
        })
        

      }
    })
  },

  goToday: function (e) {
    curDate = new Date();
    curMonth = curDate.getMonth();
    curYear = curDate.getFullYear();
    curDay = curDate.getDate();

    refreshPageData(curYear, curMonth, curDay);
    this.setData(pageData);
  },

  goLastMonth: function (e) {
    if (0 == curMonth) {
      curMonth = 11;
      --curYear
    }
    else {
      --curMonth;
    }
    refreshPageData(curYear, curMonth, 0);
    this.setData(pageData);
  },

  goNextMonth: function (e) {
    if (11 == curMonth) {
      curMonth = 0;
      ++curYear
    }
    else {
      ++curMonth;
    }
    refreshPageData(curYear, curMonth, 0);
    this.setData(pageData);
  },

  selectDay: function (e) {
    console.log(e.currentTarget.dataset.dayIndex);
    setCurDetailIndex(e.currentTarget.dataset.dayIndex);
    var curEx = pageData.arrInfoEx[e.currentTarget.dataset.dayIndex].sDay;
    console.log(curEx);
    pageData.detailData.curDayTask = this.data.everdayTask[curEx-1].data;
    this.setData({
      detailData: pageData.detailData,
    })
  },

  bindDateChange: function (e) {
    var arr = e.detail.value.split("-");
    console.log(arr);
    refreshPageData(+arr[0], arr[1] - 1, arr[2] - 0);
    this.setData(pageData);
  },
});