// 我的资料包页面
Page({
  data: {
    packages: []
  },

  onLoad() {
    this.loadPackages();
  },

  onShow() {
    // 每次显示时刷新数据
    this.loadPackages();
  },

  // 加载资料包
  loadPackages() {
    const packages = wx.getStorageSync('my_packages') || [];
    
    // 按下载时间倒序排列
    packages.sort((a, b) => {
      return new Date(b.downloadTime) - new Date(a.downloadTime);
    });
    
    this.setData({
      packages: packages
    });
  },

  // 查看资料包详情
  viewPackage(e) {
    const packageData = e.currentTarget.dataset.package;
    
    wx.showModal({
      title: packageData.title,
      content: packageData.description,
      confirmText: '下载',
      success: res => {
        if (res.confirm) {
          this.downloadPackage(packageData);
        }
      }
    });
  },

  // 再次下载
  downloadAgain(e) {
    const id = e.currentTarget.dataset.id;
    const packageData = this.data.packages.find(p => p.id === id);
    
    if (packageData) {
      this.downloadPackage(packageData);
    }
  },

  // 下载资料包
  downloadPackage(packageData) {
    wx.showLoading({
      title: '准备下载...'
    });
    
    // 模拟下载
    setTimeout(() => {
      wx.hideLoading();
      wx.showToast({
        title: '下载成功',
        icon: 'success'
      });
      
      // 更新下载时间
      this.updatePackageDownloadTime(packageData.id);
    }, 1500);
  },

  // 更新下载时间
  updatePackageDownloadTime(id) {
    const packages = wx.getStorageSync('my_packages') || [];
    const index = packages.findIndex(p => p.id === id);
    
    if (index !== -1) {
      packages[index].downloadTime = this.formatTime(new Date());
      wx.setStorageSync('my_packages', packages);
      this.loadPackages();
    }
  },

  // 删除资料包
  deletePackage(e) {
    const id = e.currentTarget.dataset.id;
    
    wx.showModal({
      title: '确认删除',
      content: '确定要删除这个资料包吗？',
      confirmText: '删除',
      confirmColor: '#dc2626',
      success: res => {
        if (res.confirm) {
          const packages = wx.getStorageSync('my_packages') || [];
          const newPackages = packages.filter(p => p.id !== id);
          wx.setStorageSync('my_packages', newPackages);
          
          this.setData({
            packages: newPackages
          });
          
          wx.showToast({
            title: '已删除',
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
  },

  // 格式化时间
  formatTime(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hour = String(date.getHours()).padStart(2, '0');
    const minute = String(date.getMinutes()).padStart(2, '0');
    
    return `${year}-${month}-${day} ${hour}:${minute}`;
  }
});
