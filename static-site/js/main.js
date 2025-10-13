/**
 * 红人汉克手册 - JavaScript 功能
 */

(function() {
    'use strict';

    // 移动菜单切换
    function initMobileMenu() {
        const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
        const siteNavigation = document.getElementById('site-navigation');
        
        if (mobileMenuToggle) {
            mobileMenuToggle.addEventListener('click', function() {
                siteNavigation.classList.toggle('active');
                
                // 切换 aria-expanded 属性
                const isExpanded = siteNavigation.classList.contains('active');
                mobileMenuToggle.setAttribute('aria-expanded', isExpanded);
            });

            // 点击菜单项后关闭菜单
            const menuLinks = siteNavigation.querySelectorAll('a');
            menuLinks.forEach(link => {
                link.addEventListener('click', () => {
                    siteNavigation.classList.remove('active');
                    mobileMenuToggle.setAttribute('aria-expanded', 'false');
                });
            });
        }
    }

    // 邮件订阅表单处理
    function initEmailSignup() {
        const forms = document.querySelectorAll('.email-signup-form');
        
        forms.forEach(form => {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const emailInput = form.querySelector('input[type="email"]');
                const button = form.querySelector('button[type="submit"]');
                const email = emailInput.value;
                
                // 验证邮箱
                if (!isValidEmail(email)) {
                    showMessage(form, '请输入有效的邮箱地址', 'error');
                    return;
                }
                
                // 保存按钮原始文本
                const originalText = button.textContent;
                button.textContent = '提交中...';
                button.disabled = true;
                
                // 模拟 API 调用
                setTimeout(() => {
                    // 这里应该是实际的 API 调用
                    console.log('订阅邮箱:', email);
                    
                    // 显示成功消息
                    showMessage(form, '订阅成功！感谢您的关注 🎉', 'success');
                    
                    // 清空输入框
                    emailInput.value = '';
                    
                    // 恢复按钮
                    button.textContent = originalText;
                    button.disabled = false;
                    
                    // 可以在这里集成真实的邮件服务 API
                    // 例如: Mailchimp, ConvertKit, SendGrid 等
                }, 1500);
            });
        });
    }

    // 邮箱验证
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // 显示消息
    function showMessage(form, message, type) {
        // 移除已存在的消息
        const existingMessage = form.querySelector('.success-message, .error-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // 创建新消息
        const messageDiv = document.createElement('div');
        messageDiv.className = type === 'success' ? 'success-message' : 'error-message';
        messageDiv.textContent = message;
        messageDiv.classList.add('fade-in');
        
        // 插入消息
        form.appendChild(messageDiv);
        
        // 3秒后自动移除
        setTimeout(() => {
            messageDiv.style.opacity = '0';
            setTimeout(() => messageDiv.remove(), 300);
        }, 3000);
    }

    // 平滑滚动
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                if (href === '#' || href === '#0') {
                    return;
                }
                
                const target = document.querySelector(href);
                
                if (target) {
                    e.preventDefault();
                    
                    const headerOffset = 100;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // 加载更多文章（示例）
    function initLoadMore() {
        const loadMoreBtn = document.getElementById('load-more');
        
        if (!loadMoreBtn) {
            return;
        }

        let page = 1;
        
        loadMoreBtn.addEventListener('click', function() {
            page++;
            
            const button = this;
            button.textContent = '加载中...';
            button.disabled = true;
            
            // 模拟加载延迟
            setTimeout(() => {
                // 这里应该是实际的 AJAX 请求
                console.log('加载第', page, '页');
                
                // 模拟：如果到第3页就隐藏按钮
                if (page >= 3) {
                    button.style.display = 'none';
                    
                    // 添加提示消息
                    const message = document.createElement('p');
                    message.textContent = '没有更多文章了';
                    message.style.textAlign = 'center';
                    message.style.color = 'var(--color-text-light)';
                    message.classList.add('fade-in');
                    button.parentElement.appendChild(message);
                } else {
                    button.textContent = '加载更多';
                    button.disabled = false;
                }
            }, 1000);
        });
    }

    // 滚动时添加头部阴影
    function initHeaderShadow() {
        const header = document.querySelector('.site-header');
        
        window.addEventListener('scroll', function() {
            if (window.scrollY > 10) {
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.boxShadow = 'none';
            }
        });
    }

    // 入场动画
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // 观察所有卡片
        document.querySelectorAll('.post-card, .resource-card').forEach(card => {
            observer.observe(card);
        });
    }

    // 复制到剪贴板功能（如果需要）
    function copyToClipboard(text) {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(() => {
                console.log('已复制到剪贴板');
            });
        } else {
            // 旧版浏览器兼容
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
        }
    }

    // 检测深色模式（可选功能）
    function detectDarkMode() {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            console.log('用户偏好深色模式');
            // 可以在这里添加深色模式样式
        }
    }

    // 联系我弹窗功能
    function openContactModal() {
        document.getElementById('contactModal').style.display = 'block';
        document.body.style.overflow = 'hidden'; // 禁止背景滚动
    }

    function closeContactModal() {
        document.getElementById('contactModal').style.display = 'none';
        document.body.style.overflow = 'auto'; // 恢复背景滚动
    }

    // 点击模态框外部关闭
    window.onclick = function(event) {
        const modal = document.getElementById('contactModal');
        if (event.target === modal) {
            closeContactModal();
        }
    }

    // ESC 键关闭模态框
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeContactModal();
        }
    });

    // 页面加载完成后初始化所有功能
    document.addEventListener('DOMContentLoaded', function() {
        console.log('🚀 红人汉克手册网站已加载');
        
        initMobileMenu();
        initEmailSignup();
        initSmoothScroll();
        initLoadMore();
        initHeaderShadow();
        initScrollAnimations();
        detectDarkMode();
        
        // 添加页面加载完成的淡入效果
        document.body.style.opacity = '0';
        setTimeout(() => {
            document.body.style.transition = 'opacity 0.3s ease-in';
            document.body.style.opacity = '1';
        }, 100);
    });

    // 导出功能（如果需要在其他地方使用）
    window.HankHandbook = {
        copyToClipboard: copyToClipboard
    };

})();

