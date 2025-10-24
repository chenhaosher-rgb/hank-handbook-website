// pages/resource-detail/resource-detail.js
const app = getApp();

Page({
  data: {
    resourceId: '',
    resource: {},
    relatedResources: [],
    isFavorited: false
  },

  onLoad(options) {
    const { id } = options;
    this.setData({ resourceId: id });
    this.loadResourceDetail();
    this.loadRelatedResources();
    this.checkFavoriteStatus();
  },

  // 加载资源详情
  loadResourceDetail() {
    wx.showLoading({ title: '加载中...' });
    
    // 模拟数据
    const mockResource = this.getMockResource(this.data.resourceId);
    
    setTimeout(() => {
      this.setData({ resource: mockResource });
      wx.hideLoading();
    }, 500);
  },

  // 获取模拟资源数据
  getMockResource(id) {
    const resources = {
      'growth-strategy': {
        icon: '📈',
        title: '用户增长完整策略',
        category: '用户增长',
        description: '从0到10万粉丝的完整增长策略，包含引流、留存、变现全链路。适合运营新手和想要突破增长瓶颈的运营者。',
        downloads: '12.5K',
        size: '2.3MB',
        type: 'PDF文档',
        contentList: [
          { icon: '📋', text: '用户增长策略框架' },
          { icon: '🎯', text: '目标用户画像分析' },
          { icon: '📱', text: '多渠道引流方案' },
          { icon: '💬', text: '用户留存策略' },
          { icon: '📊', text: '数据监控模板' },
          { icon: '💰', text: '变现路径设计' }
        ],
        targetAudience: ['运营新手', '增长负责人', '创业者', '自媒体人']
      },
      'content-templates': {
        icon: '✍️',
        title: '爆款内容创作模板',
        category: '内容创作',
        description: '30+实用内容模板，包含标题、正文、配图等完整创作流程。让内容创作变得简单高效。',
        downloads: '8.9K',
        size: '1.8MB',
        type: 'ZIP压缩包',
        contentList: [
          { icon: '📝', text: '标题创作模板' },
          { icon: '📄', text: '正文结构模板' },
          { icon: '🖼️', text: '配图设计规范' },
          { icon: '📱', text: '多平台适配指南' },
          { icon: '⏰', text: '发布时间策略' },
          { icon: '📊', text: '效果评估模板' }
        ],
        targetAudience: ['内容创作者', '新媒体运营', '文案策划', '自媒体人']
      },
      'monetization-guide': {
        icon: '💰',
        title: '7种变现模式详解',
        category: '变现策略',
        description: '从知识付费到电商带货的完整变现路径，包含具体操作步骤和案例分析。',
        downloads: '15.2K',
        size: '3.2MB',
        type: 'PDF文档',
        contentList: [
          { icon: '💡', text: '知识付费模式' },
          { icon: '🛒', text: '电商带货策略' },
          { icon: '📢', text: '广告变现方法' },
          { icon: '🤝', text: '合作分成模式' },
          { icon: '🎓', text: '课程销售策略' },
          { icon: '📈', text: '投资理财规划' }
        ],
        targetAudience: ['创业者', '自媒体人', '知识博主', '电商从业者']
      }
    };

    return resources[id] || resources['growth-strategy'];
  },

  // 加载相关推荐
  loadRelatedResources() {
    const related = [
      {
        id: 'content-templates',
        icon: '✍️',
        title: '内容创作模板',
        description: '30+实用内容模板'
      },
      {
        id: 'data-analysis',
        icon: '📊',
        title: '数据分析工具',
        description: '运营必备数据分析模板'
      },
      {
        id: 'community-management',
        icon: '👥',
        title: '社群运营手册',
        description: '社群搭建与运营全攻略'
      }
    ];

    this.setData({ relatedResources: related });
  },

  // 检查收藏状态
  checkFavoriteStatus() {
    const favorites = wx.getStorageSync('favorites') || [];
    const isFavorited = favorites.includes(this.data.resourceId);
    this.setData({ isFavorited });
  },

  // 预览资源
  previewResource() {
    wx.showModal({
      title: '预览功能',
      content: '预览功能正在开发中，您可以先下载资源查看',
      confirmText: '去下载',
      success: (res) => {
        if (res.confirm) {
          this.downloadResource();
        }
      }
    });
  },

  // 下载资源
  downloadResource() {
    wx.showLoading({ title: '准备下载...' });
    
    // 模拟下载过程
    setTimeout(() => {
      wx.hideLoading();
      
      // 添加到下载记录
      this.addToDownloads();
      
      wx.showModal({
        title: '下载成功',
        content: '资源已保存到"我的下载"中',
        confirmText: '查看下载',
        success: (res) => {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/downloads/downloads'
            });
          }
        }
      });
    }, 1000);
  },

  // 添加到下载记录
  addToDownloads() {
    const downloads = wx.getStorageSync('downloads') || [];
    const downloadRecord = {
      id: this.data.resourceId,
      title: this.data.resource.title,
      icon: this.data.resource.icon,
      downloadTime: new Date().toLocaleString(),
      size: this.data.resource.size
    };

    // 避免重复添加
    const exists = downloads.find(item => item.id === this.data.resourceId);
    if (!exists) {
      downloads.unshift(downloadRecord);
      wx.setStorageSync('downloads', downloads);
    }
  },

  // 切换收藏状态
  toggleFavorite() {
    const favorites = wx.getStorageSync('favorites') || [];
    const resourceId = this.data.resourceId;
    
    if (this.data.isFavorited) {
      // 取消收藏
      const index = favorites.indexOf(resourceId);
      if (index > -1) {
        favorites.splice(index, 1);
      }
      wx.showToast({
        title: '已取消收藏',
        icon: 'success'
      });
    } else {
      // 添加收藏
      favorites.push(resourceId);
      wx.showToast({
        title: '已添加收藏',
        icon: 'success'
      });
    }
    
    wx.setStorageSync('favorites', favorites);
    this.setData({ isFavorited: !this.data.isFavorited });
  },

  // 查看相关资源
  viewRelatedResource(e) {
    const resourceId = e.currentTarget.dataset.id;
    wx.redirectTo({
      url: `/pages/resource-detail/resource-detail?id=${resourceId}`
    });
  },

  // 分享
  onShareAppMessage() {
    return {
      title: this.data.resource.title,
      path: `/pages/resource-detail/resource-detail?id=${this.data.resourceId}`,
      imageUrl: '/images/share-resource.jpg'
    };
  }
});
