// pages/app_pages/translate/translate.js
import Toast from '@vant/weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    search_val: '',
    search_res: '',
    tran_from: '',
    tran_to: '',
    isSearch: false,
    history_list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onClear() {
    this.setData({
      history_list: [],
    })
  },
  onInput(e) {
    if (!e.detail.value == 0) {
      wx.request({
        url: 'http://api.tianapi.com/fanyi/index',
        data: {
          key: 'ba38efaf4fa9f7c21b26419ca5db4d3d',
          text: e.detail.value
        },
        method: "GET",
        success: (res) => {
          console.log(res);
          this.setData({
            isSearch: true,
            search_res: ''
          })
          let from = res.data.newslist[0].from;
          let to;
          if (from == "zh") {
            from = "中文";
            to = "英文"
          } else {
            from = "英文";
            to = "中文"
          };
          this.data.history_list.unshift({
            tran_res: res.data.newslist[0].dst,
            tran_val: res.data.newslist[0].src
          })
          let newHistory = this.data.history_list;
          this.setData({
            search_res: res.data.newslist[0].dst,
            search_val: res.data.newslist[0].src,
            tran_from: from,
            tran_to: to,
            history_list: newHistory
          });
        }
      })
      console.log(this.data.history_list);
    } else {
      Toast('请输入需要翻译的单词或句子');
    }
  },
  onCopy(e) {
    let copy_type = e.target.dataset.type;
    if (copy_type == "from") {
      wx.setClipboardData({
        data: this.data.search_val,
        success(res) {
          wx.getClipboardData({
            success(res) {
              console.log(res.data) // data
            }
          })
        }
      })
    } else if (copy_type == "to") {
      wx.setClipboardData({
        data: this.data.search_res,
        success(res) {
          wx.getClipboardData({
            success(res) {
              console.log(res.data) // data
            }
          })
        }
      })
    }
  },

  onCancel() {
    this.setData({
      isSearch: false,
      search_val: ''
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

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({
      isSearch:false
    })
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