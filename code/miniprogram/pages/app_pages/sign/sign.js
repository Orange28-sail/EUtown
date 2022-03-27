// pages/app_pages/sign/sign.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    index_list:["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],
    wordBook: [],
    learnedBook: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // if (options) {
    //   console.log(options.active);
    //   this.setData({
    //     active:options.active
    //   })
    // }
    // 给数组分类
    let WordList = []; //处理后的数组
    for (let i = 0; i < 26; i++) {
      const key = String.fromCharCode(65 + i) //A-Z赋给key当作键
      let map = {}
      map[key] = {
        title: key,
        items: []
      }
      app.globalData.lib.cont.map((v, k) => { //遍历单词本
        let firstIndex = v.name.substr(0, 1); //首字母
        if (firstIndex.toUpperCase() == String.fromCharCode(65 + i)) { //统一转成大写进行逐个判断
          map[key].items.push({
            name: v.name,
            tran: v.tran[0].tranCn,
            pos: v.tran[0].pos
          }) //push进相对应的数组里头
        }

      })
      //如果当前的数组里头为空，则跳过。
      if (map[key].items === undefined || map[key].items.length == 0) {
        continue;
      } else {
        WordList.push(map[key]) //将分类好的每个对象 合并在一个数组里面
      }
    }
    this.setData({
      wordBook: WordList
    })
    // console.log(this.data.wordBook);
  },
  toDetail(e) {
    // console.log(e.currentTarget.dataset.name);
    wx.navigateTo({
      url: '../detail/detail?word=' + e.currentTarget.dataset.name,
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
    this.selectComponent('#tabs').resize();
    // console.log(app.globalData.learnedBook);
    // 给数组分类
    let learnedBook = []; //处理后的数组
    for (let i = 0; i < 26; i++) {
      const key = String.fromCharCode(65 + i) //A-Z赋给key当作键
      let map = {}
      map[key] = {
        title: key,
        items: []
      }
      app.globalData.learnedBook.map((v, k) => { //遍历单词本
        let firstIndex = v.name.substr(0, 1); //首字母
        if (firstIndex.toUpperCase() == String.fromCharCode(65 + i)) { //统一转成大写进行逐个判断
          map[key].items.push({
            name: v.name,
            tran: v.tran[0].tranCn,
            pos: v.tran[0].pos
          }) //push进相对应的数组里头
        }

      })
      //如果当前的数组里头为空，则跳过。
      if (map[key].items === undefined || map[key].items.length == 0) {
        continue;
      } else {
        learnedBook.push(map[key]) //将分类好的每个对象 合并在一个数组里面
      }
    }
    this.setData({
      learnedBook: learnedBook
    })
    // console.log(this.data.learnedBook);
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