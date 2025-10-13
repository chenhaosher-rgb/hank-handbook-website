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



// 增强版运营问题搜索功能
const enhancedOperationsDatabase = {
    "用户增长": {
        id: "user_growth",
        title: "用户增长策略解决方案",
        description: "从0到10万用户的完整增长体系，包含引流、留存、转化全链路策略",
        tags: ["用户增长", "增长黑客", "用户获取", "留存率", "转化率", "获客成本", "用户生命周期"],
        keywords: ["如何获取用户", "用户增长", "增长策略", "获客", "拉新", "用户获取成本"],
        difficulty: "中级",
        timeEstimate: "2-3个月",
        resources: [
            { 
                name: "《用户增长手册》PDF", 
                type: "guide", 
                size: "2.5MB", 
                description: "完整的用户增长方法论和实战案例",
                downloadUrl: "/wp-content/uploads/resources/用户增长/用户增长手册.md",
                preview: true
            },
            { 
                name: "增长工具包（50+工具）", 
                type: "tools", 
                size: "15MB", 
                description: "涵盖获客、留存、转化的全链路工具",
                downloadUrl: "#",
                preview: false
            },
            { 
                name: "用户画像分析模板", 
                type: "template", 
                size: "1.2MB", 
                description: "用户画像分析和细分模板",
                downloadUrl: "#",
                preview: true
            },
            { 
                name: "A/B测试方案模板", 
                type: "template", 
                size: "800KB", 
                description: "A/B测试设计和分析模板",
                downloadUrl: "#",
                preview: true
            }
        ],
        related: ["内容创作", "数据分析", "社群运营"],
        successCases: ["某APP 3个月用户增长300%", "某品牌通过增长黑客获客成本降低60%"]
    },
    "内容创作": {
        id: "content_creation",
        title: "内容创作完整方案",
        description: "爆款内容创作公式，从选题到发布的全流程指导",
        tags: ["内容创作", "爆款内容", "内容策略", "文案写作", "视频制作", "内容营销"],
        keywords: ["如何创作内容", "爆款内容", "内容策略", "文案写作", "视频制作", "内容营销"],
        difficulty: "初级",
        timeEstimate: "1-2个月",
        resources: [
            { 
                name: "《内容创作工具箱》", 
                type: "guide", 
                size: "3.2MB", 
                description: "内容创作完整指南和工具清单",
                downloadUrl: "/wp-content/uploads/resources/内容创作/内容创作工具箱.md",
                preview: true
            },
            { 
                name: "爆款标题生成器", 
                type: "tools", 
                size: "500KB", 
                description: "AI驱动的标题生成工具",
                downloadUrl: "#",
                preview: true
            },
            { 
                name: "内容日历模板", 
                type: "template", 
                size: "800KB", 
                description: "内容规划和发布日历模板",
                downloadUrl: "#",
                preview: true
            },
            { 
                name: "创作素材库（1000+）", 
                type: "assets", 
                size: "50MB", 
                description: "高清图片、视频素材库",
                downloadUrl: "#",
                preview: false
            }
        ],
        related: ["用户增长", "品牌建设", "社群运营"],
        successCases: ["某博主通过内容策略粉丝增长10倍", "某品牌内容营销ROI提升200%"]
    },
    "变现策略": {
        id: "monetization",
        title: "变现策略指南",
        description: "7种主流变现方式详解，找到最适合你的搞钱路径",
        tags: ["变现策略", "商业模式", "收入模式", "定价策略", "客户转化", "盈利能力"],
        keywords: ["如何变现", "变现策略", "商业模式", "收入模式", "定价", "转化"],
        difficulty: "高级",
        timeEstimate: "3-6个月",
        resources: [
            { 
                name: "《变现策略指南》", 
                type: "guide", 
                size: "2.8MB", 
                description: "7种主流变现方式详解",
                downloadUrl: "/wp-content/uploads/resources/变现策略/变现策略指南.md",
                preview: true
            },
            { 
                name: "收入模型设计模板", 
                type: "template", 
                size: "1.5MB", 
                description: "收入模型设计和分析模板",
                downloadUrl: "#",
                preview: true
            },
            { 
                name: "定价策略工具", 
                type: "tools", 
                size: "600KB", 
                description: "定价策略计算和分析工具",
                downloadUrl: "#",
                preview: true
            },
            { 
                name: "客户转化漏斗图", 
                type: "template", 
                size: "400KB", 
                description: "客户转化漏斗设计和分析模板",
                downloadUrl: "#",
                preview: true
            }
        ],
        related: ["用户增长", "数据分析", "品牌建设"],
        successCases: ["某知识付费产品月收入突破100万", "某服务商通过定价策略利润提升150%"]
    },
    "数据分析": {
        id: "data_analysis",
        title: "运营数据分析方案",
        description: "数据驱动运营决策，掌握关键指标分析方法",
        tags: ["数据分析", "数据驱动", "关键指标", "ROI分析", "用户行为", "运营指标"],
        keywords: ["数据分析", "数据驱动", "关键指标", "ROI", "用户行为", "运营数据"],
        difficulty: "中级",
        timeEstimate: "1-3个月",
        resources: [
            { 
                name: "《数据分析模板》", 
                type: "template", 
                size: "2.1MB", 
                description: "运营数据分析完整模板",
                downloadUrl: "#",
                preview: true
            },
            { 
                name: "关键指标监控表", 
                type: "template", 
                size: "900KB", 
                description: "关键运营指标监控和分析表",
                downloadUrl: "#",
                preview: true
            },
            { 
                name: "数据可视化工具", 
                type: "tools", 
                size: "1.2MB", 
                description: "数据可视化图表生成工具",
                downloadUrl: "#",
                preview: true
            },
            { 
                name: "ROI计算器", 
                type: "tools", 
                size: "300KB", 
                description: "投资回报率计算和分析工具",
                downloadUrl: "#",
                preview: true
            }
        ],
        related: ["用户增长", "变现策略", "内容创作"],
        successCases: ["某公司通过数据分析优化ROI提升80%", "某产品数据驱动决策成功率提升60%"]
    },
    "社群运营": {
        id: "community_management",
        title: "社群运营解决方案",
        description: "打造高活跃度社群，提升用户粘性和转化率",
        tags: ["社群运营", "用户活跃", "社群管理", "用户粘性", "社群活动", "用户分层"],
        keywords: ["社群运营", "社群管理", "用户活跃", "社群活动", "用户分层", "社群转化"],
        difficulty: "中级",
        timeEstimate: "2-4个月",
        resources: [
            { 
                name: "《社群运营手册》", 
                type: "guide", 
                size: "2.3MB", 
                description: "社群运营完整指南和实战案例",
                downloadUrl: "#",
                preview: true
            },
            { 
                name: "社群活动策划模板", 
                type: "template", 
                size: "1.1MB", 
                description: "社群活动策划和执行模板",
                downloadUrl: "#",
                preview: true
            },
            { 
                name: "用户分层管理工具", 
                type: "tools", 
                size: "700KB", 
                description: "用户分层和精准运营工具",
                downloadUrl: "#",
                preview: true
            },
            { 
                name: "社群SOP流程", 
                type: "template", 
                size: "500KB", 
                description: "社群运营标准化流程模板",
                downloadUrl: "#",
                preview: true
            }
        ],
        related: ["用户增长", "内容创作", "品牌建设"],
        successCases: ["某社群活跃度提升300%", "某品牌社群转化率提升150%"]
    },
    "品牌建设": {
        id: "brand_building",
        title: "个人品牌建设方案",
        description: "建立专业形象，提升影响力和信任度",
        tags: ["品牌建设", "个人品牌", "影响力", "专业形象", "信任度", "品牌定位"],
        keywords: ["品牌建设", "个人品牌", "影响力", "专业形象", "品牌定位", "信任度"],
        difficulty: "高级",
        timeEstimate: "6-12个月",
        resources: [
            { 
                name: "《品牌建设指南》", 
                type: "guide", 
                size: "3.5MB", 
                description: "个人品牌建设完整指南",
                downloadUrl: "#",
                preview: true
            },
            { 
                name: "个人定位分析工具", 
                type: "tools", 
                size: "800KB", 
                description: "个人品牌定位分析工具",
                downloadUrl: "#",
                preview: true
            },
            { 
                name: "品牌故事模板", 
                type: "template", 
                size: "600KB", 
                description: "品牌故事创作和传播模板",
                downloadUrl: "#",
                preview: true
            },
            { 
                name: "影响力提升策略", 
                type: "guide", 
                size: "1.2MB", 
                description: "影响力提升策略和执行方案",
                downloadUrl: "#",
                preview: true
            }
        ],
        related: ["内容创作", "社群运营", "变现策略"],
        successCases: ["某专家通过品牌建设年收入增长500%", "某品牌影响力指数提升300%"]
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
                <div class="solution-header">
                    <h3 class="solution-title">${result.title}</h3>
                    <div class="solution-meta">
                        <span class="difficulty-badge difficulty-${result.difficulty}">${result.difficulty}</span>
                        <span class="time-estimate">预计用时：${result.timeEstimate}</span>
                    </div>
                </div>
                <p class="solution-description">${result.description}</p>
                
                <div class="solution-tags">
                    ${result.tags.slice(0, 5).map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                
                <div class="resource-package">
                    <h4 class="resource-package-title">专属资料包包含：</h4>
                    <div class="resources-grid">
                        ${result.resources.map(resource => `
                            <div class="resource-item">
                                <div class="resource-info">
                                    <h5 class="resource-name">${resource.name}</h5>
                                    <p class="resource-description">${resource.description}</p>
                                    <div class="resource-meta">
                                        <span class="resource-type">${resource.type}</span>
                                        <span class="resource-size">${resource.size}</span>
                                    </div>
                                </div>
                                <div class="resource-actions">
                                    ${resource.preview ? `<button class="preview-btn" onclick="previewResource('${resource.downloadUrl}')">预览</button>` : ''}
                                    <button class="download-btn" onclick="downloadResource('${resource.name}', '${result.id}', '${resource.downloadUrl}')">下载</button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                ${result.successCases ? `
                    <div class="success-cases">
                        <h5>成功案例：</h5>
                        <ul>
                            ${result.successCases.map(caseItem => `<li>${caseItem}</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}
                
                ${result.related ? `
                    <div class="related-topics">
                        <h5>相关主题：</h5>
                        <div class="related-tags">
                            ${result.related.map(related => `<span class="related-tag" onclick="searchSuggestion('${related}')">${related}</span>`).join('')}
                        </div>
                    </div>
                ` : ''}
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

// 资源下载功能
function downloadResource(resourceName, category, downloadUrl) {
    // 记录下载统计
    const downloadStats = JSON.parse(localStorage.getItem('downloadStats') || '{}');
    const key = `${category}_${resourceName}`;
    downloadStats[key] = (downloadStats[key] || 0) + 1;
    localStorage.setItem('downloadStats', JSON.stringify(downloadStats));
    
    // 显示下载提示
    showDownloadNotification(resourceName);
    
    // 实际下载逻辑
    if (downloadUrl && downloadUrl !== '#') {
        // 创建下载链接
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = resourceName;
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } else {
        // 模拟下载（实际项目中替换为真实下载逻辑）
        console.log(`下载资源：${resourceName}`);
    }
}

// 资源预览功能
function previewResource(previewUrl) {
    if (!previewUrl || previewUrl === '#') {
        alert('该资源暂不支持预览');
        return;
    }
    
    // 打开预览窗口
    window.open(previewUrl, '_blank', 'width=800,height=600');
}

// 下载通知
function showDownloadNotification(resourceName) {
    const notification = document.createElement('div');
    notification.className = 'download-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">📥</span>
            <span class="notification-text">正在下载：${resourceName}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}
