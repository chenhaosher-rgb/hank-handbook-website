// pages/my/my.js
const app = getApp();

Page({
  data: {
    isLoggedIn: false,
    userInfo: {},
    studyStats: {
      downloadCount: 0,
      studyDays: 0,
      favoriteCount: 0,
      searchCount: 0
    },
    downloads: [],
    favorites: [],
    history: [],
    learningProgress: [
      {
        id: 'beginner',
        icon: '🌱',
        name: '运营新手入门',
        description: '适合零基础运营新手',
        completed: 0,
        total: 8,
        progress: 0
      },
      {
        id: 'growth',
        icon: '📈',
        name: '用户增长专家',
        description: '深度掌握用户增长策略',
        completed: 3,
        total: 12,
        progress: 25
      },
      {
        id: 'monetization',
        icon: '💰',
        name: '变现策略大师',
        description: '掌握多种变现模式',
        completed: 5,
        total: 10,
        progress: 50
      }
    ],
    showAboutModal: false,
    showContactModal: false
  },

  onLoad() {
    console.log('我的页面加载');
  },

  onShow() {
    this.checkLoginStatus();
    this.loadUserData();
  },

  // 检查登录状态
  checkLoginStatus() {
    const isLoggedIn = app.isLoggedIn();
    const userInfo = app.globalData.userInfo || {};
    
    this.setData({
      isLoggedIn: isLoggedIn,
      userInfo: userInfo
    });
  },

  // 加载用户数据
  loadUserData() {
    // 加载本地数据
    const downloads = wx.getStorageSync('downloads') || [];
    const favorites = wx.getStorageSync('favorites') || [];
    const history = wx.getStorageSync('search_history') || [];
    
    // 计算统计数据
    const studyStats = {
      downloadCount: downloads.length,
      studyDays: this.calculateStudyDays(downloads),
      favoriteCount: favorites.length,
      searchCount: history.length
    };
    
    this.setData({
      downloads: downloads,
      favorites: favorites,
      history: history,
      studyStats: studyStats
    });
  },

  // 计算学习天数
  calculateStudyDays(downloads) {
    if (downloads.length === 0) return 0;
    
    const dates = downloads.map(item => {
      const date = new Date(item.downloadTime);
      return date.toDateString();
    });
    
    const uniqueDates = [...new Set(dates)];
    return uniqueDates.length;
  },

  // 登录
  handleLogin() {
    app.login().then(userInfo => {
      this.setData({
        isLoggedIn: true,
        userInfo: userInfo
      });
      this.loadUserData();
      wx.showToast({
        title: '登录成功',
        icon: 'success'
      });
    }).catch(err => {
      wx.showToast({
        title: err.message || '登录失败',
        icon: 'none'
      });
    });
  },

  // 退出登录
  handleLogout() {
    wx.showModal({
      title: '提示',
      content: '确定要退出登录吗？',
      success: (res) => {
        if (res.confirm) {
          app.logout();
          this.setData({
            isLoggedIn: false,
            userInfo: {}
          });
          wx.showToast({
            title: '已退出登录',
            icon: 'success'
          });
        }
      }
    });
  },

  // 导航到我的下载
  navigateToDownloads() {
    wx.navigateTo({
      url: '/pages/downloads/downloads'
    });
  },

  // 导航到我的收藏
  navigateToFavorites() {
    wx.navigateTo({
      url: '/pages/favorites/favorites'
    });
  },

  // 导航到学习历史
  navigateToHistory() {
    wx.navigateTo({
      url: '/pages/history/history'
    });
  },

  // 导航到个人资料
  navigateToProfile() {
    wx.navigateTo({
      url: '/pages/profile/profile'
    });
  },

  // 查看学习进度
  viewProgress(e) {
    const progressId = e.currentTarget.dataset.id;
    wx.showToast({
      title: '学习路径功能开发中',
      icon: 'none'
    });
  },

  // 显示关于我们
  showAbout() {
    this.setData({
      showAboutModal: true
    });
  },

  // 隐藏关于我们
  hideAboutModal() {
    this.setData({
      showAboutModal: false
    });
  },

  // 显示意见反馈
  showFeedback() {
    wx.showModal({
      title: '意见反馈',
      content: '您可以通过微信联系我们，我们会认真听取您的建议',
      confirmText: '去联系',
      success: (res) => {
        if (res.confirm) {
          this.showContact();
        }
      }
    });
  },

  // 显示联系我们
  showContact() {
    this.setData({
      showContactModal: true
    });
  },

  // 隐藏联系我们
  hideContactModal() {
    this.setData({
      showContactModal: false
    });
  },

  // 阻止事件冒泡
  stopPropagation() {
    // 空函数，用于阻止点击事件冒泡
  },

  // 分享
  onShareAppMessage() {
    return {
      title: '汉克运营资料库',
      path: '/pages/index/index',
      imageUrl: '/images/share-my.jpg'
    };
  }
});