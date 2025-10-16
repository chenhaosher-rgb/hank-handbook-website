// pages/article-detail/article-detail.js
Page({
  data: {
    article: {
      id: 1,
      title: '运营知识库完整体系',
      category: '运营体系',
      date: '2024-01-15',
      views: 3245,
      image: '/images/article-1.jpg',
      tags: ['运营', '知识管理', '体系建设'],
      content: '<p>文章内容加载中...</p>'
    }
  },

  onLoad(options) {
    const { id } = options;
    if (id) {
      this.loadArticle(id);
    }
  },

  onShareAppMessage() {
    return {
      title: this.data.article.title,
      path: `/pages/article-detail/article-detail?id=${this.data.article.id}`,
      imageUrl: this.data.article.image
    };
  },

  loadArticle(id) {
    // 这里可以从 API 加载文章内容
    // 或使用本地数据
    wx.showLoading({ title: '加载中...' });
    
    setTimeout(() => {
      // 模拟加载文章内容
      const content = `
        <h2>什么是运营知识库？</h2>
        <p>运营知识库是一个系统化的知识管理体系，帮助运营人员积累和沉淀经验...</p>
        
        <h2>为什么需要建立知识库？</h2>
        <p>在运营工作中，我们会遇到各种各样的问题和场景...</p>
        
        <h2>如何建立知识库？</h2>
        <ol>
          <li>确定知识分类体系</li>
          <li>选择合适的工具</li>
          <li>建立内容收集机制</li>
          <li>定期整理和更新</li>
        </ol>
      `;
      
      this.setData({
        'article.content': content
      });
      
      wx.hideLoading();
    }, 500);
  }
});
