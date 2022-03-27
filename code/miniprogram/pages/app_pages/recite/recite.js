// pages/app_pages/recite/recite.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lib: '',
    index: '',
    cur_word: {},
    isShow: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    this.setData({
      index: app.globalData.word_index,
      lib: app.globalData.lib
    });
    this.setData({
      cur_word: this.data.lib.cont[this.data.index]
    })
    // console.log(this.data.cur_word);
    // console.log(this.data.lib, this.data.index);
    // console.log(app.globalData.lib==app.globalData.unlearnedBook);
  },
  onDetail() {
    this.setData({
      isShow: true
    })
  },
  onNext() {
    let cur_word = this.data.cur_word;
    if (this.data.index < (app.globalData.lib.cont.length - 1)) {
      this.save_L(cur_word);
      // this.save_U(cur_word);
      getApp().globalData.word_index++;
      let index = app.globalData.word_index;
      // console.log(index);
      // console.log(app.globalData.lib.cont);
      this.setData({
        index: index,
        isShow: false,
        cur_word: this.data.lib.cont[index]
      })
      // console.log(this.data.cur_word, index);
    } else {
      console.log("已经到底了");
    }
  },
  onPrev() {
    if (this.data.index >= 1) {
      getApp().globalData.word_index--;
      let index = app.globalData.word_index;
      this.setData({
        index: index,
        isShow: false,
        cur_word: this.data.lib.cont[index]
      })
      // console.log(this.data.cur_word, index);
    } else {
      console.log("已经到头了");
    }
  },
  // 存
  save_L(cur_word) {
    let learnedBook = app.globalData.learnedBook;
    if (learnedBook.indexOf(cur_word) >= 0) {
      console.log("已经存在");
    } else {
      getApp().globalData.learnedBook.push(cur_word);
      console.log(app.globalData.learnedBook);
    }
  },

  // 一堆bug
  // // 删
  // save_U(cur_word) {
  //   let unlearnedBook = getApp().globalData.unlearnedBook.cont;
  //   // console.log(unlearnedBook);
  //   if (unlearnedBook.indexOf(cur_word) >= 0) {
  //     // console.log(app.globalData.unlearnedBook);
  //     app.removeByValue(unlearnedBook, "index", cur_word.index);
  //     console.log(app.globalData.lib);
  //     console.log(app.globalData.unlearnedBook);
  //   } else {
  //     console.log("已经删除");
  //   }
  // },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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