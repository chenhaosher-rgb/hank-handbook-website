// pages/resources/resources.js
Page({
  data: {
    resources: [
      {
        id: 1,
        icon: '📚',
        title: '运营知识库 VIP',
        description: '完整的运营体系和实战经验',
        downloads: 1234,
        highlight: true
      },
      {
        id: 2,
        icon: '🛠️',
        title: '内容创作工具箱',
        description: '30+ 实用工具和模板',
        downloads: 856
      },
      {
        id: 3,
        icon: '📈',
        title: '用户增长手册',
        description: '从 0 到 10 万粉丝的完整路径',
        downloads: 2341
      },
      {
        id: 4,
        icon: '💰',
        title: '变现策略指南',
        description: '7 种可复制的变现模式',
        downloads: 1567
      },
      {
        id: 5,
        icon: '👥',
        title: '私域运营手册',
        description: '打造高价值私域流量池',
        downloads: 982
      },
      {
        id: 6,
        icon: '📱',
        title: '社交媒体运营指南',
        description: '全平台运营策略和技巧',
        downloads: 1876
      }
    ]
  },

  onLoad() {},

  onShow() {},

  viewDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.showToast({
      title: '功能开发中',
      icon: 'none'
    });
  }
});
