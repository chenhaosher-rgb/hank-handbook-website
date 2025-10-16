// pages/about/about.js
Page({
  data: {
    showContactModal: false
  },

  onLoad() {},

  onShow() {},

  showContactModal() {
    this.setData({
      showContactModal: true
    });
  },

  hideContactModal() {
    this.setData({
      showContactModal: false
    });
  },

  stopPropagation() {}
});
