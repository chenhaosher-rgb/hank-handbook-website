// app.js
App({
  globalData: {
    userInfo: null,
    token: null,
    apiUrl: 'http://47.108.70.67/wp-json/hank-wechat/v1' // 请替换为您的实际API地址
  },
  
  onLaunch() {
    console.log('小程序启动');
    this.checkLogin();
  },
  
  // 检查登录状态
  checkLogin() {
    const token = wx.getStorageSync('hank_token');
    if (token) {
      // 验证token是否有效
      this.validateToken(token);
    } else {
      // 没有token，执行微信登录
      this.wxLogin();
    }
  },
  
  // 微信登录
  wxLogin() {
    wx.login({
      success: res => {
        if (res.code) {
          console.log('获取code成功:', res.code);
          // 将code发送到后端
          this.sendCodeToBackend(res.code);
        } else {
          console.error('获取code失败', res);
        }
      },
      fail: err => {
        console.error('wx.login失败', err);
      }
    });
  },
  
  // 发送code到后端
  sendCodeToBackend(code) {
    wx.request({
      url: this.globalData.apiUrl + '/miniprogram/login',
      method: 'POST',
      data: {
        code: code
      },
      success: res => {
        console.log('登录API响应:', res.data);
        if (res.data.success) {
          // 保存token
          const token = res.data.token;
          wx.setStorageSync('hank_token', token);
          this.globalData.token = token;
          this.globalData.userInfo = res.data.userInfo;
          
          // 触发登录成功事件
          this.triggerLoginSuccess(res.data.userInfo);
        } else {
          console.error('登录失败:', res.data);
        }
      },
      fail: err => {
        console.error('请求登录API失败:', err);
      }
    });
  },
  
  // 获取用户信息并更新
  getUserProfileAndUpdate() {
    return new Promise((resolve, reject) => {
      wx.getUserProfile({
        desc: '用于完善用户资料',
        success: res => {
          console.log('获取用户信息成功:', res.userInfo);
          // 更新到后端
          this.updateUserProfile(res.userInfo);
          resolve(res.userInfo);
        },
        fail: err => {
          console.error('获取用户信息失败:', err);
          reject(err);
        }
      });
    });
  },
  
  // 更新用户资料
  updateUserProfile(userInfo) {
    if (!this.globalData.token) {
      console.error('没有token，无法更新用户资料');
      return;
    }
    
    wx.request({
      url: this.globalData.apiUrl + '/update-profile',
      method: 'POST',
      header: {
        'Authorization': 'Bearer ' + this.globalData.token
      },
      data: {
        nickname: userInfo.nickName,
        avatar: userInfo.avatarUrl
      },
      success: res => {
        console.log('更新用户资料成功:', res.data);
        if (res.data.success) {
          // 更新本地缓存
          this.globalData.userInfo = res.data.userInfo;
        }
      },
      fail: err => {
        console.error('更新用户资料失败:', err);
      }
    });
  },
  
  // 验证token
  validateToken(token) {
    wx.request({
      url: this.globalData.apiUrl + '/validate',
      method: 'POST',
      data: {
        token: token
      },
      success: res => {
        console.log('验证token响应:', res.data);
        if (res.data.valid) {
          // token有效
          this.globalData.token = token;
          this.globalData.userInfo = res.data.userInfo;
          this.triggerLoginSuccess(res.data.userInfo);
        } else {
          // token无效，重新登录
          console.log('token无效，重新登录');
          wx.removeStorageSync('hank_token');
          this.wxLogin();
        }
      },
      fail: err => {
        console.error('验证token失败:', err);
        // 网络错误，使用本地缓存的token
        this.globalData.token = token;
      }
    });
  },
  
  // 触发登录成功事件
  triggerLoginSuccess(userInfo) {
    // 可以在这里处理登录成功后的逻辑
    console.log('登录成功，用户信息:', userInfo);
    
    // 发送自定义事件通知其他页面
    if (typeof this.loginSuccessCallback === 'function') {
      this.loginSuccessCallback(userInfo);
    }
  },
  
  // 登出
  logout() {
    wx.removeStorageSync('hank_token');
    this.globalData.token = null;
    this.globalData.userInfo = null;
    
    // 重新登录
    this.wxLogin();
  },
  
  // 检查是否已登录
  isLoggedIn() {
    return !!this.globalData.token && !!this.globalData.userInfo;
  }
})