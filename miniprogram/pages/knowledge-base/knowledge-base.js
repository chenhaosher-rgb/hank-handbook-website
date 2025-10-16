// 运营知识库 VIP 页面逻辑
Page({
  data: {
    loading: false
  },

  onLoad: function (options) {
    console.log('运营知识库 VIP 页面加载');
  },

  // 下载资源
  downloadResource: function() {
    wx.showLoading({
      title: '准备下载...'
    });
    
    setTimeout(() => {
      wx.hideLoading();
      wx.showToast({
        title: '下载成功！',
        icon: 'success',
        duration: 2000
      });
    }, 1500);
  },

  // 预览资源
  previewResource: function() {
    wx.showModal({
      title: '预览功能',
      content: '资源预览功能即将上线，敬请期待！',
      showCancel: false,
      confirmText: '知道了'
    });
  },

  // 导航到其他页面
  navigateToPage: function(e) {
    const page = e.currentTarget.dataset.page;
    const pages = {
      'content-toolbox': '/pages/content-toolbox/content-toolbox',
      'growth-handbook': '/pages/growth-handbook/growth-handbook',
      'monetization-guide': '/pages/monetization-guide/monetization-guide'
    };
    
    if (pages[page]) {
      wx.navigateTo({
        url: pages[page]
      });
    }
  },

  // 分享功能
  onShareAppMessage: function() {
    return {
      title: '运营知识库 VIP - 汉克运营知识库',
      path: '/pages/knowledge-base/knowledge-base',
      imageUrl: '/images/share-cover.jpg'
    };
  }
});
