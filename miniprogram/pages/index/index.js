// pages/index/index.js
Page({
  data: {
    showContactModal: false,
    popularTags: [
      '用户增长',
      '内容创作',
      '变现策略',
      '私域运营',
      '社交媒体',
      '数据分析'
    ],
    resources: [
      {
        id: 'knowledge-base',
        icon: '📚',
        title: '运营知识库 VIP',
        description: '完整的运营体系和实战经验',
        downloads: 1234,
        highlight: true
      },
      {
        id: 'content-toolbox',
        icon: '🛠️',
        title: '内容创作工具箱',
        description: '30+ 实用工具和模板',
        downloads: 856
      },
      {
        id: 'growth-handbook',
        icon: '📈',
        title: '用户增长手册',
        description: '从 0 到 10 万粉丝的完整路径',
        downloads: 2341
      },
      {
        id: 'monetization-guide',
        icon: '💰',
        title: '变现策略指南',
        description: '7 种可复制的变现模式',
        downloads: 1567
      },
      {
        id: 'data-analysis',
        icon: '📊',
        title: '数据分析工具',
        description: '运营必备的数据分析模板和工具',
        downloads: 982
      },
      {
        id: 'case-library',
        icon: '📋',
        title: '运营案例库',
        description: '100+ 成功运营案例拆解',
        downloads: 1876
      }
    ],
    articles: [
      {
        id: 1,
        title: '运营知识库完整体系',
        excerpt: '如何建立自己的运营知识库，从信息收集到知识沉淀的完整流程...',
        image: '/images/article-1.jpg',
        category: '运营体系',
        date: '2024-01-15',
        views: 3245
      },
      {
        id: 2,
        title: '从 0 到 10 万粉丝的增长策略',
        excerpt: '分享我如何在 6 个月内从 0 增长到 10 万粉丝的完整策略和执行细节...',
        image: '/images/article-2.jpg',
        category: '用户增长',
        date: '2024-01-10',
        views: 5678
      },
      {
        id: 3,
        title: '内容创作的底层逻辑',
        excerpt: '深度解析什么样的内容能够吸引用户，如何创作高质量内容...',
        image: '/images/article-3.jpg',
        category: '内容创作',
        date: '2024-01-05',
        views: 2890
      }
    ]
  },

  onLoad() {
    // 页面加载时执行
    this.loadData();
  },

  onShow() {
    // 页面显示时执行
  },

  onShareAppMessage() {
    return {
      title: '汉克运营知识库·搞钱计划',
      path: '/pages/index/index',
      imageUrl: '/images/share-cover.jpg'
    };
  },

  onShareTimeline() {
    return {
      title: '汉克运营知识库·搞钱计划',
      query: '',
      imageUrl: '/images/share-cover.jpg'
    };
  },

  // 加载数据
  loadData() {
    // 如果需要从 WordPress API 加载数据
    // 可以在这里调用 API
    // const app = getApp();
    // wx.request({
    //   url: `${app.globalData.apiBaseUrl}/posts`,
    //   success: (res) => {
    //     this.setData({
    //       articles: res.data
    //     });
    //   }
    // });
  },

  // 导航到搜索页
  navigateToSearch() {
    wx.navigateTo({
      url: '/pages/search/search'
    });
  },

  // 按标签搜索
  searchByTag(e) {
    const tag = e.currentTarget.dataset.tag;
    wx.navigateTo({
      url: `/pages/search/search?keyword=${tag}`
    });
  },

  // 导航到资源页
  navigateToResources() {
    wx.switchTab({
      url: '/pages/resources/resources'
    });
  },

  // 查看资源详情
  viewResource(e) {
    const id = e.currentTarget.dataset.id;
    
    // 根据资源ID跳转到对应页面
    const pageMap = {
      'knowledge-base': '/pages/knowledge-base/knowledge-base',
      'content-toolbox': '/pages/content-toolbox/content-toolbox',
      'growth-handbook': '/pages/growth-handbook/growth-handbook',
      'monetization-guide': '/pages/monetization-guide/monetization-guide',
      'data-analysis': '/pages/data-analysis/data-analysis',
      'case-library': '/pages/case-library/case-library'
    };
    
    if (pageMap[id]) {
      wx.navigateTo({
        url: pageMap[id]
      });
    } else {
      wx.showToast({
        title: '页面开发中',
        icon: 'none'
      });
    }
  },

  // 导航到文章页
  navigateToArticles() {
    wx.switchTab({
      url: '/pages/articles/articles'
    });
  },

  // 查看文章详情
  viewArticle(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/article-detail/article-detail?id=${id}`
    });
  },

  // 显示联系弹窗
  showContactModal() {
    this.setData({
      showContactModal: true
    });
  },

  // 隐藏联系弹窗
  hideContactModal() {
    this.setData({
      showContactModal: false
    });
  },

  // 阻止事件冒泡
  stopPropagation() {
    // 空函数，用于阻止点击事件冒泡
  }
});
