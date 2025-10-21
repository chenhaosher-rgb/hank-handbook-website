// 个人中心页面
const app = getApp();
const CloudSync = require('../../utils/cloudSync.js');

Page({
  data: {
    isLoggedIn: false,
    userInfo: null,
    packageCount: 0,
    historyCount: 0,
    downloadCount: 0,
    favoriteCount: 0,
    showAboutModal: false,
    showContactModal: false
  },

  onLoad() {
    console.log('个人中心页面加载');
  },

  onShow() {
    // 每次显示时检查登录状态
    this.checkLoginStatus();
    // 加载用户数据
    if (this.data.isLoggedIn) {
      this.loadUserData();
      // 从云端同步数据
      this.syncFromCloud();
    }
  },
  
  // 从云端同步数据
  syncFromCloud() {
    if (!app.globalData.token) return;
    
    Promise.all([
      CloudSync.pullPackagesFromCloud(),
      CloudSync.pullHistoryFromCloud()
    ]).then(() => {
      console.log('云端数据同步完成');
      // 重新加载本地数据
      this.loadUserData();
    }).catch(err => {
      console.error('云端同步失败:', err);
    });
  },

  // 检查登录状态
  checkLoginStatus() {
    const isLoggedIn = app.isLoggedIn();
    const userInfo = app.globalData.userInfo;
    
    this.setData({
      isLoggedIn: isLoggedIn,
      userInfo: userInfo
    });
  },

  // 加载用户数据
  loadUserData() {
    // 加载搜索记录数量
    const searchHistory = wx.getStorageSync('search_history') || [];
    
    // 加载下载记录数量
    const downloads = wx.getStorageSync('downloads') || [];
    
    // 加载收藏数量
    const favorites = wx.getStorageSync('favorites') || [];
    
    // 加载资料包数量
    const packages = wx.getStorageSync('my_packages') || [];
    
    this.setData({
      historyCount: searchHistory.length,
      downloadCount: downloads.length,
      favoriteCount: favorites.length,
      packageCount: packages.length
    });
  },

  // 处理登录
  handleLogin() {
    // 获取用户信息并登录
    app.getUserProfileAndUpdate().then(userInfo => {
      wx.showToast({
        title: '登录成功',
        icon: 'success'
      });
      
      // 刷新页面数据
      setTimeout(() => {
        this.checkLoginStatus();
        this.loadUserData();
      }, 1000);
    }).catch(err => {
      console.error('登录失败:', err);
      wx.showToast({
        title: '登录失败',
        icon: 'none'
      });
    });
  },

  // 退出登录
  handleLogout() {
    wx.showModal({
      title: '退出登录',
      content: '确定要退出登录吗？',
      success: res => {
        if (res.confirm) {
          app.logout();
          this.setData({
            isLoggedIn: false,
            userInfo: null,
            packageCount: 0,
            historyCount: 0,
            downloadCount: 0,
            favoriteCount: 0
          });
          wx.showToast({
            title: '已退出登录',
            icon: 'success'
          });
        }
      }
    });
  },

  // 导航到我的资料包
  navigateToPackages() {
    if (!this.data.isLoggedIn) {
      this.showLoginPrompt();
      return;
    }
    wx.navigateTo({
      url: '/pages/my-packages/my-packages'
    });
  },

  // 导航到搜索记录
  navigateToHistory() {
    if (!this.data.isLoggedIn) {
      this.showLoginPrompt();
      return;
    }
    wx.navigateTo({
      url: '/pages/search-history/search-history'
    });
  },

  // 导航到下载记录
  navigateToDownloads() {
    if (!this.data.isLoggedIn) {
      this.showLoginPrompt();
      return;
    }
    wx.navigateTo({
      url: '/pages/downloads/downloads'
    });
  },

  // 导航到收藏
  navigateToFavorites() {
    if (!this.data.isLoggedIn) {
      this.showLoginPrompt();
      return;
    }
    wx.navigateTo({
      url: '/pages/favorites/favorites'
    });
  },

  // 导航到设置
  navigateToSettings() {
    wx.navigateTo({
      url: '/pages/settings/settings'
    });
  },

  // 显示登录提示
  showLoginPrompt() {
    wx.showModal({
      title: '需要登录',
      content: '请先登录后再查看',
      confirmText: '去登录',
      success: res => {
        if (res.confirm) {
          this.handleLogin();
        }
      }
    });
  },

  // 联系我们
  contactUs() {
    this.setData({
      showContactModal: true
    });
  },

  // 关于我们
  showAbout() {
    this.setData({
      showAboutModal: true
    });
  },

  // 隐藏关于弹窗
  hideAbout() {
    this.setData({
      showAboutModal: false
    });
  },

  // 隐藏联系弹窗
  hideContact() {
    this.setData({
      showContactModal: false
    });
  },

  // 阻止事件冒泡
  stopPropagation() {
    // 空函数，阻止点击事件冒泡
  },

  // 分享
  onShareAppMessage() {
    return {
      title: '汉克运营知识库·搞钱计划',
      path: '/pages/index/index',
      imageUrl: '/images/share-cover.jpg'
    };
  }
});