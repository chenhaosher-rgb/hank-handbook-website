// pages/search/search.js
// 引入搜索数据库
const searchDatabase = require('../../utils/searchDatabase.js');
const CloudSync = require('../../utils/cloudSync.js');
const app = getApp();

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
      
      // 保存搜索记录
      this.saveSearchHistory(keyword, results.length);
    }, 300);
  },
  
  // 保存搜索记录
  saveSearchHistory(keyword, resultCount) {
    const history = wx.getStorageSync('search_history') || [];
    
    // 生成记录ID
    const id = Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    
    // 创建记录对象
    const record = {
      id: id,
      keyword: keyword,
      searchTime: this.formatTime(new Date()),
      resultCount: resultCount
    };
    
    // 检查是否已存在相同关键词（删除旧的）
    const filteredHistory = history.filter(item => item.keyword !== keyword);
    
    // 添加新记录到开头
    filteredHistory.unshift(record);
    
    // 只保留最近50条记录
    if (filteredHistory.length > 50) {
      filteredHistory.length = 50;
    }
    
    // 保存到本地
    wx.setStorageSync('search_history', filteredHistory);
    
    // 如果已登录，同步到云端
    if (app.globalData.token) {
      CloudSync.syncHistoryToCloud().catch(err => {
        console.error('同步搜索记录失败:', err);
      });
    }
  },
  
  // 格式化时间
  formatTime(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hour = String(date.getHours()).padStart(2, '0');
    const minute = String(date.getMinutes()).padStart(2, '0');
    
    return `${year}-${month}-${day} ${hour}:${minute}`;
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
    const { url, name, title, description, tags } = e.currentTarget.dataset;
    
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
              
              // 保存到我的资料包
              this.saveToMyPackages({
                id: Date.now() + '_' + Math.random().toString(36).substr(2, 9),
                title: title || name || '资料包',
                description: description || '',
                icon: '📦',
                tags: tags ? tags.split(',') : [],
                downloadTime: this.formatTime(new Date()),
                url: url
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
  },
  
  // 保存到我的资料包
  saveToMyPackages(packageData) {
    const packages = wx.getStorageSync('my_packages') || [];
    
    // 检查是否已存在（避免重复）
    const exists = packages.some(p => p.url === packageData.url);
    if (!exists) {
      packages.unshift(packageData);
      wx.setStorageSync('my_packages', packages);
      
      // 同步到云端
      if (app.globalData.token) {
        CloudSync.syncPackagesToCloud().catch(err => {
          console.error('同步资料包失败:', err);
        });
      }
    }
  }
});
