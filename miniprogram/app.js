// app.js
App({
  onLaunch() {
    // 小程序启动时执行
    console.log('汉克运营知识库小程序启动');
    
    // 获取系统信息
    this.getSystemInfo();
    
    // 检查更新
    this.checkUpdate();
  },
  
  onShow() {
    // 小程序显示时执行
  },
  
  onHide() {
    // 小程序隐藏时执行
  },
  
  // 获取系统信息
  getSystemInfo() {
    wx.getSystemInfo({
      success: (res) => {
        this.globalData.systemInfo = res;
        this.globalData.statusBarHeight = res.statusBarHeight;
        this.globalData.screenHeight = res.screenHeight;
      }
    });
  },
  
  // 检查小程序更新
  checkUpdate() {
    if (wx.canIUse('getUpdateManager')) {
      const updateManager = wx.getUpdateManager();
      
      updateManager.onCheckForUpdate((res) => {
        if (res.hasUpdate) {
          updateManager.onUpdateReady(() => {
            wx.showModal({
              title: '更新提示',
              content: '新版本已准备好，是否重启应用？',
              success: (res) => {
                if (res.confirm) {
                  updateManager.applyUpdate();
                }
              }
            });
          });
          
          updateManager.onUpdateFailed(() => {
            wx.showModal({
              title: '更新失败',
              content: '新版本下载失败，请删除小程序重新打开',
              showCancel: false
            });
          });
        }
      });
    }
  },
  
  // 全局数据
  globalData: {
    userInfo: null,
    systemInfo: null,
    statusBarHeight: 0,
    screenHeight: 0,
    // API 基础地址（如果需要对接 WordPress API）
    apiBaseUrl: 'https://47.108.70.67/wp-json/wp/v2',
    // 静态资源地址
    staticUrl: 'https://47.108.70.67'
  }
});
