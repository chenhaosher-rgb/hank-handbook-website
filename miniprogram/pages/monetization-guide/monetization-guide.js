Page({
  data: {
    loading: false
  },

  onLoad: function (options) {
    console.log('页面加载');
  },

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

  previewResource: function() {
    wx.showModal({
      title: '预览功能',
      content: '资源预览功能即将上线，敬请期待！',
      showCancel: false,
      confirmText: '知道了'
    });
  },

  onShareAppMessage: function() {
    return {
      title: '汉克运营知识库',
      path: '/pages/' + this.__route__,
      imageUrl: '/images/share-cover.jpg'
    };
  }
});
