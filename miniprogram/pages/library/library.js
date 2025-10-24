// pages/library/library.js
const app = getApp();

Page({
  data: {
    currentCategory: 'all',
    currentCategoryName: '全部资料',
    categories: [
      { id: 'all', name: '全部', icon: '📚' },
      { id: 'growth', name: '用户增长', icon: '📈' },
      { id: 'content', name: '内容创作', icon: '✍️' },
      { id: 'monetization', name: '变现策略', icon: '💰' },
      { id: 'data', name: '数据分析', icon: '📊' },
      { id: 'community', name: '社群运营', icon: '👥' },
      { id: 'brand', name: '品牌建设', icon: '🏷️' },
      { id: 'tools', name: '工具模板', icon: '🛠️' }
    ],
    hotResources: [
      {
        id: 'growth-guide',
        icon: '📈',
        title: '用户增长完整指南',
        description: '从0到10万粉丝的完整增长策略',
        downloads: '12.5K',
        tag: '用户增长'
      },
      {
        id: 'content-formula',
        icon: '✍️',
        title: '爆款内容创作公式',
        description: '30+内容模板，轻松创作爆款内容',
        downloads: '8.9K',
        tag: '内容创作'
      },
      {
        id: 'monetization-methods',
        icon: '💰',
        title: '7种变现模式详解',
        description: '从知识付费到电商带货的完整路径',
        downloads: '15.2K',
        tag: '变现策略'
      }
    ],
    categoryResources: [],
    hasMore: true,
    page: 1
  },

  onLoad() {
    this.loadCategoryResources();
  },

  onShow() {
    // 页面显示时刷新数据
  },

  // 切换分类
  switchCategory(e) {
    const categoryId = e.currentTarget.dataset.id;
    const category = this.data.categories.find(cat => cat.id === categoryId);
    
    this.setData({
      currentCategory: categoryId,
      currentCategoryName: category.name,
      page: 1,
      hasMore: true
    });
    
    this.loadCategoryResources();
  },

  // 加载分类资料
  loadCategoryResources() {
    wx.showLoading({ title: '加载中...' });
    
    // 模拟数据加载
    setTimeout(() => {
      const mockData = this.getMockResources(this.data.currentCategory);
      
      this.setData({
        categoryResources: mockData,
        hasMore: mockData.length >= 10
      });
      
      wx.hideLoading();
    }, 500);
  },

  // 获取模拟数据
  getMockResources(category) {
    const allResources = [
      {
        id: 'growth-strategy',
        icon: '📈',
        title: '用户增长策略',
        description: '完整的用户增长方法论',
        downloads: '5.2K',
        size: '2.3MB',
        type: 'PDF'
      },
      {
        id: 'content-templates',
        icon: '✍️',
        title: '内容创作模板',
        description: '30+实用内容模板',
        downloads: '3.8K',
        size: '1.8MB',
        type: 'ZIP'
      },
      {
        id: 'monetization-guide',
        icon: '💰',
        title: '变现策略指南',
        description: '7种主流变现方式',
        downloads: '7.1K',
        size: '3.2MB',
        type: 'PDF'
      },
      {
        id: 'data-analysis',
        icon: '📊',
        title: '数据分析工具',
        description: '运营必备数据分析模板',
        downloads: '4.5K',
        size: '1.5MB',
        type: 'XLSX'
      },
      {
        id: 'community-management',
        icon: '👥',
        title: '社群运营手册',
        description: '社群搭建与运营全攻略',
        downloads: '6.3K',
        size: '2.8MB',
        type: 'PDF'
      },
      {
        id: 'brand-building',
        icon: '🏷️',
        title: '品牌建设指南',
        description: '个人品牌打造完整方案',
        downloads: '4.9K',
        size: '2.1MB',
        type: 'PDF'
      }
    ];

    if (category === 'all') {
      return allResources;
    }

    // 根据分类筛选
    const categoryMap = {
      'growth': ['growth-strategy'],
      'content': ['content-templates'],
      'monetization': ['monetization-guide'],
      'data': ['data-analysis'],
      'community': ['community-management'],
      'brand': ['brand-building'],
      'tools': ['data-analysis', 'content-templates']
    };

    const categoryIds = categoryMap[category] || [];
    return allResources.filter(resource => categoryIds.includes(resource.id));
  },

  // 查看资源详情
  viewResource(e) {
    const resourceId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/resource-detail/resource-detail?id=${resourceId}`
    });
  },

  // 导航到搜索
  navigateToSearch() {
    wx.switchTab({
      url: '/pages/search/search'
    });
  },

  // 查看全部热门
  viewAllHot() {
    wx.showToast({
      title: '功能开发中',
      icon: 'none'
    });
  },

  // 加载更多
  loadMore() {
    if (!this.data.hasMore) return;
    
    this.setData({
      page: this.data.page + 1
    });
    
    // 模拟加载更多数据
    wx.showLoading({ title: '加载中...' });
    
    setTimeout(() => {
      const moreData = this.getMockResources(this.data.currentCategory);
      const currentData = this.data.categoryResources;
      
      this.setData({
        categoryResources: [...currentData, ...moreData],
        hasMore: false // 模拟没有更多数据
      });
      
      wx.hideLoading();
    }, 500);
  },

  // 分享
  onShareAppMessage() {
    return {
      title: '汉克运营资料库',
      path: '/pages/library/library',
      imageUrl: '/images/share-library.jpg'
    };
  }
});
