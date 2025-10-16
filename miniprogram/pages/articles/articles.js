// pages/articles/articles.js
Page({
  data: {
    currentCategory: 'all',
    categories: [
      { id: 'all', name: '全部' },
      { id: 'system', name: '运营体系' },
      { id: 'growth', name: '用户增长' },
      { id: 'content', name: '内容创作' },
      { id: 'monetize', name: '变现策略' },
      { id: 'private', name: '私域运营' }
    ],
    articles: [],
    hasMore: true,
    page: 1
  },

  onLoad() {
    this.loadArticles();
  },

  onShow() {},

  onPullDownRefresh() {
    this.setData({
      page: 1,
      articles: []
    });
    this.loadArticles();
  },

  onReachBottom() {
    if (this.data.hasMore) {
      this.loadMore();
    }
  },

  // 加载文章列表
  loadArticles() {
    wx.showLoading({ title: '加载中...' });
    
    // 模拟数据
    const mockArticles = [
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
      }
    ];

    setTimeout(() => {
      this.setData({
        articles: [...this.data.articles, ...mockArticles]
      });
      wx.hideLoading();
      wx.stopPullDownRefresh();
    }, 500);
  },

  // 选择分类
  selectCategory(e) {
    const categoryId = e.currentTarget.dataset.id;
    this.setData({
      currentCategory: categoryId,
      page: 1,
      articles: []
    });
    this.loadArticles();
  },

  // 加载更多
  loadMore() {
    this.setData({
      page: this.data.page + 1
    });
    this.loadArticles();
  },

  // 查看文章详情
  viewArticle(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/article-detail/article-detail?id=${id}`
    });
  }
});
