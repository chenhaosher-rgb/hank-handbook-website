/**
 * 主题 JavaScript 功能
 *
 * @package Hank_Handbook
 */

(function($) {
    'use strict';

    // 移动菜单切换
    function initMobileMenu() {
        const mobileMenuToggle = $('#mobile-menu-toggle');
        const siteNavigation = $('#site-navigation');
        
        mobileMenuToggle.on('click', function() {
            const isExpanded = $(this).attr('aria-expanded') === 'true';
            $(this).attr('aria-expanded', !isExpanded);
            siteNavigation.toggleClass('active');
        });
    }

    // AJAX 加载更多文章
    function initLoadMore() {
        const loadMoreBtn = $('#load-more');
        
        if (!loadMoreBtn.length) {
            return;
        }

        loadMoreBtn.on('click', function(e) {
            e.preventDefault();
            
            const button = $(this);
            const currentPage = parseInt(button.data('page'));
            const maxPages = parseInt(button.data('max'));
            const nextPage = currentPage + 1;
            
            // 显示加载状态
            button.text('加载中...').prop('disabled', true);
            
            $.ajax({
                url: wpAjaxUrl || '/wp-admin/admin-ajax.php',
                type: 'POST',
                data: {
                    action: 'load_more_posts',
                    page: nextPage
                },
                success: function(response) {
                    if (response) {
                        $('#posts-container').append(response);
                        button.data('page', nextPage);
                        button.text('加载更多').prop('disabled', false);
                        
                        // 如果已经是最后一页，隐藏按钮
                        if (nextPage >= maxPages) {
                            button.fadeOut();
                        }
                    } else {
                        button.fadeOut();
                    }
                },
                error: function() {
                    button.text('加载失败，请重试').prop('disabled', false);
                }
            });
        });
    }

    // 平滑滚动
    function initSmoothScroll() {
        $('a[href*="#"]').not('[href="#"]').not('[href="#0"]').on('click', function(event) {
            if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && 
                location.hostname === this.hostname) {
                
                let target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                
                if (target.length) {
                    event.preventDefault();
                    $('html, body').animate({
                        scrollTop: target.offset().top - 100
                    }, 800);
                }
            }
        });
    }

    // 粘性头部
    function initStickyHeader() {
        const header = $('.site-header');
        const headerOffset = header.offset().top;
        
        $(window).on('scroll', function() {
            if ($(window).scrollTop() > headerOffset) {
                header.addClass('sticky');
            } else {
                header.removeClass('sticky');
            }
        });
    }

    // 邮件订阅表单处理
    function initEmailSignup() {
        $('.email-signup-form').on('submit', function(e) {
            e.preventDefault();
            
            const form = $(this);
            const email = form.find('input[type="email"]').val();
            const button = form.find('button[type="submit"]');
            const originalText = button.text();
            
            // 这里可以集成您的邮件服务提供商 API
            // 例如：Mailchimp, ConvertKit, etc.
            
            button.text('提交中...').prop('disabled', true);
            
            // 示例：使用 AJAX 提交到自定义端点
            $.ajax({
                url: wpAjaxUrl || '/wp-admin/admin-ajax.php',
                type: 'POST',
                data: {
                    action: 'newsletter_signup',
                    email: email
                },
                success: function(response) {
                    alert('感谢订阅！');
                    form.find('input[type="email"]').val('');
                    button.text(originalText).prop('disabled', false);
                },
                error: function() {
                    alert('订阅失败，请重试。');
                    button.text(originalText).prop('disabled', false);
                }
            });
        });
    }

    // 图片懒加载
    function initLazyLoad() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver(function(entries, observer) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.classList.remove('lazy');
                            imageObserver.unobserve(img);
                        }
                    }
                });
            });

            document.querySelectorAll('img.lazy').forEach(function(img) {
                imageObserver.observe(img);
            });
        }
    }

    // 文档加载完成后初始化
    $(document).ready(function() {
        initMobileMenu();
        initLoadMore();
        initSmoothScroll();
        initEmailSignup();
        initLazyLoad();
        // initStickyHeader(); // 可选：如果需要粘性头部
    });

})(jQuery);



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
