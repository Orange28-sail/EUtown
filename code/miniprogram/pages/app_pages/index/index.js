// pages/app_pages/index/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    httpUrl: '',
    learnedWords: '',
    unlearnedWords: '',
    progress: '',
    lib: {
      name: '暂未添加词库',
      cont: []
    },
    isload: false,
    total_words: '',
    sentence_en: 'All we have to do is to hug each other.',
    sentence_zh: '穷尽一生，我们要学会的不过是彼此拥抱。'
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.onAjax();
  },
  onAjax() {
    wx.request({
      url: app.globalData.httpUrl + '/lib',
      method: 'GET',
      success: (res) => {
        let lib = res.data;

        const ciku = {
          name: lib.name,
          cont: lib.cont.map((val) => {
            return {
              name: val.headWord,
              index: val.wordRank,
              tran: val.content.word.content.trans,
              us_phone: val.content.word.content.usphone,
              uk_phone: val.content.word.content.ukphone,
              rel_word: val.content.word.content.relWord,
              syno: val.content.word.content.syno,
              sentence: val.content.word.content.sentence,
              phrase: val.content.word.content.phrase
            }
          })
        }

        this.setData({
          lib: ciku,
          isload: true,
          progress: ((app.globalData.learnedBook.length / this.data.lib.cont.length).toFixed(2)) * 100
        });
        app.deepCopy(getApp().globalData.lib, ciku);
        // console.log(app.globalData.lib);
      },
      fail: (e) => {
        console.log(e);
      }
    })
  },

  toSearch_page() {
    wx.navigateTo({
      url: '../search/search',
    })
  },
  toLib() {
    wx.navigateTo({
      url: '../lib/lib',
    })
  },
  toRecite() {
    wx.navigateTo({
      url: '../recite/recite',
    })
  },
  toSign() {
    wx.switchTab({
      url: '../sign/sign',
    })
  },

  sentenceFresh() {
    this.animate("#sentence_fresh", [{
      rotate: 60
    }, {
      rotate: 120
    }, {
      rotate: 180
    }, {
      rotate: 240
    }, {
      rotate: 300
    }, {
      rotate: 360
    }, ], 200);
    wx.request({
      url: 'http://api.tianapi.com/ensentence/index',
      data: {
        "key": "ba38efaf4fa9f7c21b26419ca5db4d3d"
      },
      method: 'GET',
      success: (res) => {
        let sen_en = res.data.newslist[0].en;
        let sen_cn = res.data.newslist[0].zh;
        this.setData({
          sentence_en: sen_en,
          sentence_zh: sen_cn
        })
      },
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (this.data.isload) {
      this.setData({
        learnedWords: app.globalData.learnedBook.length,
        progress: ((app.globalData.learnedBook.length / this.data.lib.cont.length).toFixed(2)) * 100
      })
      // console.log(this.data.lib.cont.length);
    } else {
      setTimeout(() => {
        this.setData({
          learnedWords: app.globalData.learnedBook.length,
          progress: ((app.globalData.learnedBook.length / this.data.lib.cont.length).toFixed(2)) * 100
        })
        // console.log(this.data.lib.cont.length);
      }, 100);
    }


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

  }
})