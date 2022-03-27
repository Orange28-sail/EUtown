// app.js
App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        traceUser: true,
      });
    }

    // this.globalData = {

    // };
  },
  globalData: {
    // 192.168.1.2
    httpUrl: 'http://localhost:3000',
    lib: {
      // name: '',
      // cont: []
    },
    // unlearnedBook: [],
    learnedBook: [],
    // wordBook: [],
    word_index: 0
  },

  // 数组分类
  formatList(arr, keyword) {
    let newArr1 = [];
    let tempArr = [];
    let reg = /\b(\w)|\s(\w)/g;
    let k = 0;
    let firstWord = arr[0][keyword].charAt(0).toUpperCase(); //获取第一个分类字母
    arr.map((v) => {
      v[keyword] = v[keyword].replace(reg, m => m.toUpperCase()); //首字母大写
      if (firstWord == v[keyword].charAt(0)) {
        tempArr.push(v);
        newArr1[k] = {
          Title: firstWord,
          List: tempArr
        }
      } else {
        //这里循环到这表示已经第二个字母了
        firstWord = v[keyword].charAt(0); //设置第二字母
        tempArr = []; //把之前的清除掉
        tempArr.push(v); //添加第一个
        newArr1[++k] = { //自增
          Title: firstWord,
          List: tempArr
        }
      }
    });
    return newArr1;
  },
  // 使用递归函数实现深拷贝
  deepCopy(newObj, oldObj) {
    for (const k in oldObj) {
      let item = newObj[k];
      if (item instanceof Array) {
        newObj[k] = [];
        deepCopy(newObj[k], item)
      } else if (item instanceof Object) {
        newObj[k] = {};
        deepCopy(newObj[k], item)
      } else {
        newObj[k] = oldObj[k]
      }
    }
  },
  // 删除数组指定项
  removeByValue(arr, attr, value) {
    var index = 0;
    for (var i in arr) {
      if (arr[i][attr] == value) {
        index = i;
        break;
      }
    }
    arr.splice(index, 1);
  },
});