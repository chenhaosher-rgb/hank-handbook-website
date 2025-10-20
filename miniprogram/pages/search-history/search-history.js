// 搜索记录页面
Page({
  data: {
    history: []
  },

  onLoad() {
    this.loadHistory();
  },

  onShow() {
    // 每次显示时刷新数据
    this.loadHistory();
  },

  // 加载搜索记录
  loadHistory() {
    const history = wx.getStorageSync('search_history') || [];
    
    // 按搜索时间倒序排列
    history.sort((a, b) => {
      return new Date(b.searchTime) - new Date(a.searchTime);
    });
    
    this.setData({
      history: history
    });
  },

  // 再次搜索
  searchAgain(e) {
    const keyword = e.currentTarget.dataset.keyword;
    
    // 跳转到搜索页并传递关键词
    wx.navigateTo({
      url: `/pages/search/search?keyword=${encodeURIComponent(keyword)}`
    });
  },

  // 删除单条记录
  deleteHistory(e) {
    const id = e.currentTarget.dataset.id;
    
    wx.showModal({
      title: '确认删除',
      content: '确定要删除这条搜索记录吗？',
      confirmText: '删除',
      confirmColor: '#dc2626',
      success: res => {
        if (res.confirm) {
          const history = wx.getStorageSync('search_history') || [];
          const newHistory = history.filter(item => item.id !== id);
          wx.setStorageSync('search_history', newHistory);
          
          this.setData({
            history: newHistory
          });
          
          wx.showToast({
            title: '已删除',
            icon: 'success'
          });
        }
      }
    });
  },

  // 清空所有记录
  clearHistory() {
    wx.showModal({
      title: '确认清空',
      content: '确定要清空所有搜索记录吗？',
      confirmText: '清空',
      confirmColor: '#dc2626',
      success: res => {
        if (res.confirm) {
          wx.removeStorageSync('search_history');
          
          this.setData({
            history: []
          });
          
          wx.showToast({
            title: '已清空',
            icon: 'success'
          });
        }
      }
    });
  },

  // 跳转到搜索页
  gotoSearch() {
    wx.switchTab({
      url: '/pages/search/search'
    });
  }
});
