// pages/search/search.js
// 引入搜索数据库
const searchDatabase = require('../../utils/searchDatabase.js');

Page({
  data: {
    keyword: '',
    autoFocus: false,
    hasSearched: false,
    results: [],
    popularTags: [
      '用户增长',
      '内容创作',
      '变现策略',
      '私域运营',
      '社交媒体',
      '数据分析'
    ]
  },

  onLoad(options) {
    // 如果从其他页面传入关键词
    if (options.keyword) {
      this.setData({
        keyword: options.keyword,
        autoFocus: false
      });
      this.handleSearch();
    } else {
      this.setData({
        autoFocus: true
      });
    }
  },

  // 输入变化
  onInputChange(e) {
    this.setData({
      keyword: e.detail.value
    });
  },

  // 点击标签搜索
  searchByTag(e) {
    const tag = e.currentTarget.dataset.tag;
    this.setData({
      keyword: tag
    });
    this.handleSearch();
  },

  // 执行搜索
  handleSearch() {
    const keyword = this.data.keyword.trim();
    
    if (!keyword) {
      wx.showToast({
        title: '请输入搜索关键词',
        icon: 'none'
      });
      return;
    }

    wx.showLoading({ title: '搜索中...' });

    // 执行搜索
    const results = this.searchOperations(keyword);

    setTimeout(() => {
      this.setData({
        hasSearched: true,
        results: results
      });
      wx.hideLoading();

      if (results.length === 0) {
        wx.showToast({
          title: '未找到相关内容',
          icon: 'none'
        });
      }
    }, 300);
  },

  // 搜索函数（与WordPress版本一致）
  searchOperations(query) {
    const database = searchDatabase.getData();
    const queryLower = query.toLowerCase();
    const results = [];

    Object.keys(database).forEach(key => {
      const item = database[key];
      let score = 0;

      // 标题匹配（最高权重）
      if (item.title.toLowerCase().includes(queryLower)) {
        score += 50;
      }

      // 关键词精确匹配
      item.keywords.forEach(keyword => {
        if (keyword.toLowerCase() === queryLower) {
          score += 40;
        } else if (keyword.toLowerCase().includes(queryLower)) {
          score += 20;
        }
      });

      // 标签匹配
      item.tags.forEach(tag => {
        if (tag.toLowerCase().includes(queryLower)) {
          score += 15;
        }
      });

      // 描述匹配
      if (item.description.toLowerCase().includes(queryLower)) {
        score += 10;
      }

      // 如果有匹配，添加到结果中
      if (score > 0) {
        results.push({
          ...item,
          score: Math.min(100, score),
          matchedKeyword: query
        });
      }
    });

    // 按匹配度排序
    results.sort((a, b) => b.score - a.score);

    return results.slice(0, 10); // 返回前10个结果
  },

  // 下载资源
  downloadResource(e) {
    const { url, name } = e.currentTarget.dataset;
    
    wx.showLoading({ title: '准备下载...' });

    // 如果是预览链接
    if (url.endsWith('.md')) {
      wx.hideLoading();
      wx.showModal({
        title: '提示',
        content: '这是一个预览文件，建议在电脑端下载完整资源包',
        confirmText: '查看预览',
        success: (res) => {
          if (res.confirm) {
            // 可以跳转到文章详情页查看
            wx.showToast({
              title: '功能开发中',
              icon: 'none'
            });
          }
        }
      });
      return;
    }

    // 真实下载逻辑
    wx.downloadFile({
      url: url,
      success: (res) => {
        if (res.statusCode === 200) {
          wx.openDocument({
            filePath: res.tempFilePath,
            success: () => {
              wx.showToast({
                title: '下载成功',
                icon: 'success'
              });
            },
            fail: () => {
              wx.showToast({
                title: '打开失败',
                icon: 'none'
              });
            }
          });
        }
      },
      fail: () => {
        wx.showToast({
          title: '下载失败',
          icon: 'none'
        });
      },
      complete: () => {
        wx.hideLoading();
      }
    });
  }
});
