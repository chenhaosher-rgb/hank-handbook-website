// 内容创作工具箱页面逻辑
Page({
  data: {
    loading: false
  },

  onLoad: function (options) {
    console.log('内容创作工具箱页面加载');
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

  // 分享功能
  onShareAppMessage: function() {
    return {
      title: '内容创作工具箱 - 汉克运营知识库',
      path: '/pages/content-toolbox/content-toolbox',
      imageUrl: '/images/share-cover.jpg'
    };
  }
});
