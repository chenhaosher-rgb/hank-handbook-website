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
        
        // 搜索表单事件监听
        const searchForm = document.getElementById('operations-search-form');
        if (searchForm) {
            searchForm.addEventListener('submit', function(e) {
                e.preventDefault();
                handleSearch();
            });
        }
        
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



// 运营问题搜索功能
const operationsDatabase = {
    "用户增长": {
        title: "用户增长策略解决方案",
        description: "从0到10万用户的完整增长体系，包含引流、留存、转化全链路策略",
        resources: [
            "《用户增长手册》PDF",
            "增长工具包（50+工具）",
            "用户画像分析模板",
            "A/B测试方案模板"
        ]
    },
    "内容创作": {
        title: "内容创作完整方案",
        description: "爆款内容创作公式，从选题到发布的全流程指导",
        resources: [
            "《内容创作工具箱》",
            "爆款标题生成器",
            "内容日历模板",
            "创作素材库（1000+）"
        ]
    },
    "变现策略": {
        title: "变现策略指南",
        description: "7种主流变现方式详解，找到最适合你的搞钱路径",
        resources: [
            "《变现策略指南》",
            "收入模型设计模板",
            "定价策略工具",
            "客户转化漏斗图"
        ]
    },
    "数据分析": {
        title: "运营数据分析方案",
        description: "数据驱动运营决策，掌握关键指标分析方法",
        resources: [
            "《数据分析模板》",
            "关键指标监控表",
            "数据可视化工具",
            "ROI计算器"
        ]
    },
    "社群运营": {
        title: "社群运营解决方案",
        description: "打造高活跃度社群，提升用户粘性和转化率",
        resources: [
            "《社群运营手册》",
            "社群活动策划模板",
            "用户分层管理工具",
            "社群SOP流程"
        ]
    },
    "品牌建设": {
        title: "个人品牌建设方案",
        description: "建立专业形象，提升影响力和信任度",
        resources: [
            "《品牌建设指南》",
            "个人定位分析工具",
            "品牌故事模板",
            "影响力提升策略"
        ]
    }
};

function searchOperations(query) {
    const searchTerm = query.toLowerCase();
    const results = [];
    
    // 搜索匹配的解决方案
    Object.keys(operationsDatabase).forEach(key => {
        const solution = operationsDatabase[key];
        if (key.toLowerCase().includes(searchTerm) || 
            solution.title.toLowerCase().includes(searchTerm) ||
            solution.description.toLowerCase().includes(searchTerm)) {
            results.push({
                keyword: key,
                ...solution
            });
        }
    });
    
    return results;
}

function displaySearchResults(results) {
    const resultsContainer = document.getElementById("search-results");
    if (!resultsContainer) return;
    
    if (results.length === 0) {
        resultsContainer.innerHTML = `
            <div class="no-results">
                <h3>暂无相关解决方案</h3>
                <p>您可以尝试搜索其他关键词，或联系我获取定制化解决方案</p>
            </div>
        `;
    } else {
        resultsContainer.innerHTML = results.map(result => `
            <div class="solution-item">
                <h3 class="solution-title">${result.title}</h3>
                <p class="solution-description">${result.description}</p>
                <div class="resource-package">
                    <h4 class="resource-package-title">专属资料包包含：</h4>
                    <ul class="resource-package-list">
                        ${result.resources.map(resource => `<li>${resource}</li>`).join("")}
                    </ul>
                </div>
            </div>
        `).join("");
    }
    
    resultsContainer.classList.add("show");
}

function searchSuggestion(keyword) {
    const searchInput = document.getElementById("operations-search");
    if (searchInput) {
        searchInput.value = keyword;
        handleSearch();
    }
}

function handleSearch() {
    const searchInput = document.getElementById("operations-search");
    if (!searchInput) return;
    
    const query = searchInput.value.trim();
    if (!query) return;
    
    const results = searchOperations(query);
    displaySearchResults(results);
    
    // 滚动到结果区域
    const resultsContainer = document.getElementById("search-results");
    if (resultsContainer) {
        resultsContainer.scrollIntoView({ behavior: "smooth" });
    }
}
