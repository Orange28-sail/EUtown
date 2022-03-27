// pages/app_pages/search/search.js
import Toast from '@vant/weapp/toast/toast';
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    search_res: '',
    lib: [],
    isHave: false,
    isEnter: false,
    history_list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getLib();
    wx.getStorage({
      key: 'history',
      success: (e) => {
        // console.log(e.data);
        this.setData({
          history_list: e.data
        })
      }
    })
    // console.log(this.data.history_list, "shuzu");
  },
  toClear() {
    wx.setStorage({
      key: 'history',
      data: [],
      success: () => {
        // console.log("success");
        this.setData({
          history_list:[]
        })
      }
    })
  },
  onCancel() {
    this.setData({
      isEnter: false
    })
  },
  onInput(e) {
    if (!e.detail) {
      Toast('请输入需要查询的单词');
    } else {
      let input_val = e.detail;
      this.setData({
        isEnter: true,
        isHave: false,
        search_res: ''
      })
      for (const i in this.data.lib) {
        if (input_val == this.data.lib[i].name) {
          this.setData({
            search_res: this.data.lib[i],
            isHave: true
          })
          break;
        }
      }
      if (!this.data.isHave) {
        Toast('查无此单词');
        this.setData({
          isEnter: false
        })
      } else {
        // console.log(this.data.search_res);
        this.data.history_list.unshift({
          name: this.data.search_res.name,
          tran: this.data.search_res.tran[0].tranCn,
          pos: this.data.search_res.tran[0].pos,
          index: this.data.search_res.index
        });
        let newHistory = this.data.history_list;
        // console.log(newHistory);
        this.setData({
          history_list: newHistory
        })

      }
    }
  },
  getLib() {
    // wx.request({
    //   url: app.globalData.httpUrl + '/lib',
    //   method: 'GET',
    //   success: (res) => {
        // let lib = res.data.cont;
        let lib = app.globalData.lib.cont;
        // console.log(lib);
        // let arr = [];
        // console.log(lib);
        // arr = lib.map((val) => {
        //   return {
        //     name: val.headWord,
        //     index: val.wordRank,
        //     tran: val.content.word.content.trans,
        //     us_phone: val.content.word.content.usphone,
        //     uk_phone: val.content.word.content.ukphone,
        //     rel_word: val.content.word.content.relWord,
        //     syno: val.content.word.content.syno,
        //     sentence: val.content.word.content.sentence
        //   }
        // })
        // console.log(arr[1]);
        this.setData({
          lib: lib
        })
      // },
    // })
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
    wx.setStorage({
      key: 'history',
      data: this.data.history_list,
      success: () => {
        console.log("huancun success");
      }
    })
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