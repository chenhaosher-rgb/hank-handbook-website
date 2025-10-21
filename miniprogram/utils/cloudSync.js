/**
 * 云端同步工具
 * 实现小程序与WordPress数据双向同步
 */

const app = getApp();

const CloudSync = {
  
  /**
   * 同步资料包到云端
   */
  syncPackagesToCloud() {
    if (!app.globalData.token) {
      console.log('未登录，跳过资料包同步');
      return Promise.resolve();
    }
    
    const packages = wx.getStorageSync('my_packages') || [];
    
    return new Promise((resolve, reject) => {
      wx.request({
        url: app.globalData.apiUrl + '/packages',
        method: 'POST',
        header: {
          'Authorization': 'Bearer ' + app.globalData.token,
          'Content-Type': 'application/json'
        },
        data: {
          packages: packages
        },
        success: res => {
          console.log('资料包同步到云端成功:', res.data);
          if (res.data.success) {
            resolve(res.data);
          } else {
            reject(res.data);
          }
        },
        fail: err => {
          console.error('资料包同步失败:', err);
          reject(err);
        }
      });
    });
  },
  
  /**
   * 从云端拉取资料包
   */
  pullPackagesFromCloud() {
    if (!app.globalData.token) {
      console.log('未登录，跳过资料包拉取');
      return Promise.resolve();
    }
    
    return new Promise((resolve, reject) => {
      wx.request({
        url: app.globalData.apiUrl + '/packages',
        method: 'GET',
        header: {
          'Authorization': 'Bearer ' + app.globalData.token
        },
        success: res => {
          console.log('从云端拉取资料包:', res.data);
          if (res.data.success) {
            const cloudPackages = res.data.packages || [];
            const localPackages = wx.getStorageSync('my_packages') || [];
            
            // 合并本地和云端数据（以云端为准，但保留本地新增）
            const merged = this.mergePackages(localPackages, cloudPackages);
            
            // 保存到本地
            wx.setStorageSync('my_packages', merged);
            
            resolve(merged);
          } else {
            reject(res.data);
          }
        },
        fail: err => {
          console.error('拉取资料包失败:', err);
          reject(err);
        }
      });
    });
  },
  
  /**
   * 同步搜索记录到云端
   */
  syncHistoryToCloud() {
    if (!app.globalData.token) {
      console.log('未登录，跳过搜索记录同步');
      return Promise.resolve();
    }
    
    const history = wx.getStorageSync('search_history') || [];
    
    return new Promise((resolve, reject) => {
      wx.request({
        url: app.globalData.apiUrl + '/search-history',
        method: 'POST',
        header: {
          'Authorization': 'Bearer ' + app.globalData.token,
          'Content-Type': 'application/json'
        },
        data: {
          history: history
        },
        success: res => {
          console.log('搜索记录同步到云端成功:', res.data);
          if (res.data.success) {
            resolve(res.data);
          } else {
            reject(res.data);
          }
        },
        fail: err => {
          console.error('搜索记录同步失败:', err);
          reject(err);
        }
      });
    });
  },
  
  /**
   * 从云端拉取搜索记录
   */
  pullHistoryFromCloud() {
    if (!app.globalData.token) {
      console.log('未登录，跳过搜索记录拉取');
      return Promise.resolve();
    }
    
    return new Promise((resolve, reject) => {
      wx.request({
        url: app.globalData.apiUrl + '/search-history',
        method: 'GET',
        header: {
          'Authorization': 'Bearer ' + app.globalData.token
        },
        success: res => {
          console.log('从云端拉取搜索记录:', res.data);
          if (res.data.success) {
            const cloudHistory = res.data.history || [];
            const localHistory = wx.getStorageSync('search_history') || [];
            
            // 合并本地和云端数据
            const merged = this.mergeHistory(localHistory, cloudHistory);
            
            // 保存到本地
            wx.setStorageSync('search_history', merged);
            
            resolve(merged);
          } else {
            reject(res.data);
          }
        },
        fail: err => {
          console.error('拉取搜索记录失败:', err);
          reject(err);
        }
      });
    });
  },
  
  /**
   * 合并资料包数据（去重，保留最新）
   */
  mergePackages(local, cloud) {
    const map = {};
    
    // 先添加云端数据
    cloud.forEach(item => {
      if (item.id) {
        map[item.id] = item;
      }
    });
    
    // 再添加本地数据（如果ID不存在）
    local.forEach(item => {
      if (item.id && !map[item.id]) {
        map[item.id] = item;
      }
    });
    
    // 转换为数组并按时间排序
    const result = Object.values(map);
    result.sort((a, b) => {
      const timeA = new Date(a.downloadTime || 0).getTime();
      const timeB = new Date(b.downloadTime || 0).getTime();
      return timeB - timeA;
    });
    
    return result;
  },
  
  /**
   * 合并搜索记录（去重，保留最新，最多50条）
   */
  mergeHistory(local, cloud) {
    const map = {};
    
    // 先添加云端数据
    cloud.forEach(item => {
      if (item.id) {
        map[item.id] = item;
      }
    });
    
    // 再添加本地数据（如果ID不存在）
    local.forEach(item => {
      if (item.id && !map[item.id]) {
        map[item.id] = item;
      }
    });
    
    // 转换为数组并按时间排序
    const result = Object.values(map);
    result.sort((a, b) => {
      const timeA = new Date(a.searchTime || 0).getTime();
      const timeB = new Date(b.searchTime || 0).getTime();
      return timeB - timeA;
    });
    
    // 只保留最近50条
    return result.slice(0, 50);
  },
  
  /**
   * 完整同步（登录后调用）
   * 1. 从云端拉取数据
   * 2. 合并本地数据
   * 3. 同步回云端
   */
  fullSync() {
    if (!app.globalData.token) {
      console.log('未登录，跳过完整同步');
      return Promise.resolve();
    }
    
    console.log('开始完整同步...');
    
    return Promise.all([
      this.pullPackagesFromCloud(),
      this.pullHistoryFromCloud()
    ]).then(() => {
      console.log('数据拉取完成，同步回云端...');
      return Promise.all([
        this.syncPackagesToCloud(),
        this.syncHistoryToCloud()
      ]);
    }).then(() => {
      console.log('完整同步成功！');
      wx.showToast({
        title: '数据已同步',
        icon: 'success',
        duration: 1500
      });
    }).catch(err => {
      console.error('完整同步失败:', err);
    });
  }
};

module.exports = CloudSync;
