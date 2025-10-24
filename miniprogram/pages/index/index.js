// pages/index/index.js
const app = getApp();

Page({
  data: {
    hotCategories: [
      { id: 'growth', name: '用户增长', icon: '📈', count: 45 },
      { id: 'content', name: '内容创作', icon: '✍️', count: 38 },
      { id: 'monetization', name: '变现策略', icon: '💰', count: 32 },
      { id: 'data', name: '数据分析', icon: '📊', count: 28 },
      { id: 'community', name: '社群运营', icon: '👥', count: 25 },
      { id: 'brand', name: '品牌建设', icon: '🏷️', count: 22 }
    ],
    todayRecommend: [
      {
        id: 'growth-guide',
        icon: '📈',
        title: '用户增长完整指南',
        description: '从0到10万粉丝的完整增长策略',
        downloads: '12.5K',
        tag: '用户增长',
        badge: '热门'
      },
      {
        id: 'content-formula',
        icon: '✍️',
        title: '爆款内容创作公式',
        description: '30+内容模板，轻松创作爆款内容',
        downloads: '8.9K',
        tag: '内容创作',
        badge: '推荐'
      },
      {
        id: 'monetization-methods',
        icon: '💰',
        title: '7种变现模式详解',
        description: '从知识付费到电商带货的完整路径',
        downloads: '15.2K',
        tag: '变现策略',
        badge: '精选'
      }
    ],
    latestResources: [
      {
        id: 'data-analysis-tool',
        icon: '📊',
        title: '运营数据分析工具包',
        description: '包含Excel模板和数据分析方法',
        time: '2小时前',
        downloads: '1.2K'
      },
      {
        id: 'community-guide',
        icon: '👥',
        title: '社群运营实战手册',
        description: '社群搭建、运营、变现全流程',
        time: '5小时前',
        downloads: '856'
      },
      {
        id: 'brand-strategy',
        icon: '🏷️',
        title: '个人品牌建设指南',
        description: '从定位到推广的完整品牌策略',
        time: '1天前',
        downloads: '2.1K'
      }
    ],
    learningPaths: [
      {
        id: 'beginner-path',
        icon: '🌱',
        title: '运营新手入门',
        description: '适合零基础运营新手',
        progress: '0/8 完成',
        progressPercent: 0
      },
      {
        id: 'growth-path',
        icon: '📈',
        title: '用户增长专家',
        description: '深度掌握用户增长策略',
        progress: '3/12 完成',
        progressPercent: 25
      },
      {
        id: 'monetization-path',
        icon: '💰',
        title: '变现策略大师',
        description: '掌握多种变现模式',
        progress: '5/10 完成',
        progressPercent: 50
      }
    ]
  },

  onLoad() {
    console.log('资料库首页加载');
  },

  onShow() {
    // 页面显示时刷新数据
  },

  // 导航到搜索
  navigateToSearch() {
    wx.switchTab({
      url: '/pages/search/search'
    });
  },

  // 导航到分类
  navigateToCategory(e) {
    const categoryId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/category/category?id=${categoryId}`
    });
  },

  // 查看资源详情
  viewResource(e) {
    const resourceId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/resource-detail/resource-detail?id=${resourceId}`
    });
  },

  // 查看全部推荐
  viewAllRecommend() {
    wx.switchTab({
      url: '/pages/library/library'
    });
  },

  // 导航到资料库
  navigateToLibrary() {
    wx.switchTab({
      url: '/pages/library/library'
    });
  },

  // 查看学习路径
  viewPath(e) {
    const pathId = e.currentTarget.dataset.id;
    wx.showToast({
      title: '学习路径功能开发中',
      icon: 'none'
    });
  },

  // 分享
  onShareAppMessage() {
    return {
      title: '汉克运营资料库',
      path: '/pages/index/index',
      imageUrl: '/images/share-index.jpg'
    };
  },

  // 分享到朋友圈
  onShareTimeline() {
    return {
      title: '汉克运营资料库 - 专业的运营知识库',
      query: '',
      imageUrl: '/images/share-timeline.jpg'
    };
  }
});
