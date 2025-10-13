/**
 * 增强版运营问题搜索系统
 * 支持精准匹配、智能推荐、资料库管理
 */

// 增强版运营数据库
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
                downloadUrl: "/resources/user-growth-guide.pdf",
                preview: true
            },
            { 
                name: "增长工具包（50+工具）", 
                type: "tools", 
                size: "15MB", 
                description: "涵盖获客、留存、转化的全链路工具",
                downloadUrl: "/resources/growth-tools.zip",
                preview: false
            },
            { 
                name: "用户画像分析模板", 
                type: "template", 
                size: "1.2MB", 
                description: "用户画像分析和细分模板",
                downloadUrl: "/resources/user-persona-template.xlsx",
                preview: true
            },
            { 
                name: "A/B测试方案模板", 
                type: "template", 
                size: "800KB", 
                description: "A/B测试设计和分析模板",
                downloadUrl: "/resources/ab-test-template.xlsx",
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
                downloadUrl: "/resources/content-creation-guide.pdf",
                preview: true
            },
            { 
                name: "爆款标题生成器", 
                type: "tools", 
                size: "500KB", 
                description: "AI驱动的标题生成工具",
                downloadUrl: "/resources/title-generator.xlsx",
                preview: true
            },
            { 
                name: "内容日历模板", 
                type: "template", 
                size: "800KB", 
                description: "内容规划和发布日历模板",
                downloadUrl: "/resources/content-calendar.xlsx",
                preview: true
            },
            { 
                name: "创作素材库（1000+）", 
                type: "assets", 
                size: "50MB", 
                description: "高清图片、视频素材库",
                downloadUrl: "/resources/content-assets.zip",
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
                downloadUrl: "/resources/monetization-guide.pdf",
                preview: true
            },
            { 
                name: "收入模型设计模板", 
                type: "template", 
                size: "1.5MB", 
                description: "收入模型设计和分析模板",
                downloadUrl: "/resources/revenue-model-template.xlsx",
                preview: true
            },
            { 
                name: "定价策略工具", 
                type: "tools", 
                size: "600KB", 
                description: "定价策略计算和分析工具",
                downloadUrl: "/resources/pricing-strategy-tool.xlsx",
                preview: true
            },
            { 
                name: "客户转化漏斗图", 
                type: "template", 
                size: "400KB", 
                description: "客户转化漏斗设计和分析模板",
                downloadUrl: "/resources/conversion-funnel.xlsx",
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
                downloadUrl: "/resources/data-analysis-templates.xlsx",
                preview: true
            },
            { 
                name: "关键指标监控表", 
                type: "template", 
                size: "900KB", 
                description: "关键运营指标监控和分析表",
                downloadUrl: "/resources/kpi-monitoring.xlsx",
                preview: true
            },
            { 
                name: "数据可视化工具", 
                type: "tools", 
                size: "1.2MB", 
                description: "数据可视化图表生成工具",
                downloadUrl: "/resources/data-visualization-tool.xlsx",
                preview: true
            },
            { 
                name: "ROI计算器", 
                type: "tools", 
                size: "300KB", 
                description: "投资回报率计算和分析工具",
                downloadUrl: "/resources/roi-calculator.xlsx",
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
                downloadUrl: "/resources/community-management-guide.pdf",
                preview: true
            },
            { 
                name: "社群活动策划模板", 
                type: "template", 
                size: "1.1MB", 
                description: "社群活动策划和执行模板",
                downloadUrl: "/resources/community-events-template.xlsx",
                preview: true
            },
            { 
                name: "用户分层管理工具", 
                type: "tools", 
                size: "700KB", 
                description: "用户分层和精准运营工具",
                downloadUrl: "/resources/user-segmentation-tool.xlsx",
                preview: true
            },
            { 
                name: "社群SOP流程", 
                type: "template", 
                size: "500KB", 
                description: "社群运营标准化流程模板",
                downloadUrl: "/resources/community-sop.docx",
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
                downloadUrl: "/resources/brand-building-guide.pdf",
                preview: true
            },
            { 
                name: "个人定位分析工具", 
                type: "tools", 
                size: "800KB", 
                description: "个人品牌定位分析工具",
                downloadUrl: "/resources/personal-positioning-tool.xlsx",
                preview: true
            },
            { 
                name: "品牌故事模板", 
                type: "template", 
                size: "600KB", 
                description: "品牌故事创作和传播模板",
                downloadUrl: "/resources/brand-story-template.docx",
                preview: true
            },
            { 
                name: "影响力提升策略", 
                type: "guide", 
                size: "1.2MB", 
                description: "影响力提升策略和执行方案",
                downloadUrl: "/resources/influence-strategy.pdf",
                preview: true
            }
        ],
        related: ["内容创作", "社群运营", "变现策略"],
        successCases: ["某专家通过品牌建设年收入增长500%", "某品牌影响力指数提升300%"]
    }
};

// 智能搜索算法
class SmartSearchEngine {
    constructor() {
        this.searchHistory = JSON.parse(localStorage.getItem('searchHistory') || '[]');
        this.userPreferences = JSON.parse(localStorage.getItem('userPreferences') || '{}');
    }

    // 主搜索方法
    search(query, options = {}) {
        const searchTerm = query.toLowerCase().trim();
        
        // 保存搜索历史
        this.saveSearchHistory(searchTerm);
        
        // 多维度搜索
        const results = {
            exact: this.exactMatch(searchTerm),
            fuzzy: this.fuzzyMatch(searchTerm),
            semantic: this.semanticMatch(searchTerm),
            related: this.relatedMatch(searchTerm)
        };

        // 合并和排序结果
        const mergedResults = this.mergeResults(results, options);
        
        // 个性化推荐
        const personalizedResults = this.personalizeResults(mergedResults);
        
        return personalizedResults;
    }

    // 精确匹配
    exactMatch(query) {
        const results = [];
        
        Object.keys(enhancedOperationsDatabase).forEach(key => {
            const solution = enhancedOperationsDatabase[key];
            
            // 检查标题、描述、标签、关键词
            const searchFields = [
                key.toLowerCase(),
                solution.title.toLowerCase(),
                solution.description.toLowerCase(),
                ...solution.tags.map(tag => tag.toLowerCase()),
                ...solution.keywords.map(keyword => keyword.toLowerCase())
            ];
            
            if (searchFields.some(field => field.includes(query))) {
                results.push({
                    ...solution,
                    matchType: 'exact',
                    score: 100,
                    matchedField: this.getMatchedField(query, searchFields)
                });
            }
        });
        
        return results;
    }

    // 模糊匹配
    fuzzyMatch(query) {
        const results = [];
        const queryWords = query.split(' ');
        
        Object.keys(enhancedOperationsDatabase).forEach(key => {
            const solution = enhancedOperationsDatabase[key];
            let score = 0;
            let matchedWords = [];
            
            // 计算匹配度
            queryWords.forEach(word => {
                const searchFields = [
                    key.toLowerCase(),
                    solution.title.toLowerCase(),
                    solution.description.toLowerCase(),
                    ...solution.tags.map(tag => tag.toLowerCase()),
                    ...solution.keywords.map(keyword => keyword.toLowerCase())
                ];
                
                searchFields.forEach(field => {
                    if (field.includes(word)) {
                        score += 20;
                        matchedWords.push(word);
                    }
                });
            });
            
            if (score > 0) {
                results.push({
                    ...solution,
                    matchType: 'fuzzy',
                    score: score,
                    matchedWords: [...new Set(matchedWords)]
                });
            }
        });
        
        return results.sort((a, b) => b.score - a.score);
    }

    // 语义匹配（基于关键词相似度）
    semanticMatch(query) {
        const results = [];
        const queryWords = query.split(' ');
        
        // 同义词词典
        const synonyms = {
            '用户': ['客户', '粉丝', '会员'],
            '增长': ['提升', '增加', '扩大'],
            '内容': ['文案', '文章', '视频'],
            '变现': ['赚钱', '盈利', '收入'],
            '数据': ['指标', '统计', '分析'],
            '社群': ['群组', '社区', '圈子']
        };
        
        Object.keys(enhancedOperationsDatabase).forEach(key => {
            const solution = enhancedOperationsDatabase[key];
            let score = 0;
            
            queryWords.forEach(word => {
                // 直接匹配
                if (solution.keywords.some(keyword => keyword.includes(word))) {
                    score += 30;
                }
                
                // 同义词匹配
                Object.keys(synonyms).forEach(synonym => {
                    if (synonyms[synonym].includes(word) && solution.keywords.some(keyword => keyword.includes(synonym))) {
                        score += 20;
                    }
                });
            });
            
            if (score > 0) {
                results.push({
                    ...solution,
                    matchType: 'semantic',
                    score: score
                });
            }
        });
        
        return results.sort((a, b) => b.score - a.score);
    }

    // 相关推荐
    relatedMatch(query) {
        const results = [];
        
        // 基于搜索历史推荐
        if (this.searchHistory.length > 0) {
            const lastSearch = this.searchHistory[this.searchHistory.length - 1];
            const lastResults = this.exactMatch(lastSearch.toLowerCase());
            
            lastResults.forEach(result => {
                result.related.forEach(relatedKey => {
                    if (enhancedOperationsDatabase[relatedKey]) {
                        results.push({
                            ...enhancedOperationsDatabase[relatedKey],
                            matchType: 'related',
                            score: 10,
                            reason: `基于"${lastSearch}"的推荐`
                        });
                    }
                });
            });
        }
        
        return results;
    }

    // 合并搜索结果
    mergeResults(results, options) {
        const allResults = [
            ...results.exact,
            ...results.fuzzy,
            ...results.semantic,
            ...results.related
        ];
        
        // 去重
        const uniqueResults = [];
        const seen = new Set();
        
        allResults.forEach(result => {
            if (!seen.has(result.id)) {
                seen.add(result.id);
                uniqueResults.push(result);
            }
        });
        
        // 排序
        return uniqueResults.sort((a, b) => {
            // 按匹配类型优先级排序
            const typePriority = { exact: 4, fuzzy: 3, semantic: 2, related: 1 };
            const typeDiff = typePriority[b.matchType] - typePriority[a.matchType];
            
            if (typeDiff !== 0) return typeDiff;
            
            // 按分数排序
            return b.score - a.score;
        });
    }

    // 个性化推荐
    personalizeResults(results) {
        // 基于用户偏好调整排序
        const preferences = this.userPreferences;
        
        return results.map(result => {
            let adjustedScore = result.score;
            
            // 如果用户之前下载过相关资源，提高分数
            if (preferences.downloadedCategories && preferences.downloadedCategories.includes(result.id)) {
                adjustedScore += 20;
            }
            
            // 如果用户关注特定难度级别，调整分数
            if (preferences.preferredDifficulty && preferences.preferredDifficulty === result.difficulty) {
                adjustedScore += 15;
            }
            
            return {
                ...result,
                score: adjustedScore
            };
        }).sort((a, b) => b.score - a.score);
    }

    // 保存搜索历史
    saveSearchHistory(query) {
        this.searchHistory = this.searchHistory.filter(item => item !== query);
        this.searchHistory.unshift(query);
        this.searchHistory = this.searchHistory.slice(0, 10); // 保留最近10次搜索
        
        localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory));
    }

    // 获取匹配字段
    getMatchedField(query, fields) {
        for (let field of fields) {
            if (field.includes(query)) {
                return field;
            }
        }
        return '';
    }

    // 更新用户偏好
    updateUserPreferences(preferences) {
        this.userPreferences = { ...this.userPreferences, ...preferences };
        localStorage.setItem('userPreferences', JSON.stringify(this.userPreferences));
    }
}

// 资源下载管理
class ResourceManager {
    constructor() {
        this.downloadHistory = JSON.parse(localStorage.getItem('downloadHistory') || '[]');
    }

    // 下载资源
    downloadResource(resource, category) {
        // 记录下载历史
        this.downloadHistory.push({
            resource: resource.name,
            category: category,
            timestamp: new Date().toISOString(),
            url: resource.downloadUrl
        });
        
        localStorage.setItem('downloadHistory', JSON.stringify(this.downloadHistory));
        
        // 更新用户偏好
        const searchEngine = new SmartSearchEngine();
        const preferences = {
            downloadedCategories: [...(searchEngine.userPreferences.downloadedCategories || []), category]
        };
        searchEngine.updateUserPreferences(preferences);
        
        // 模拟下载
        this.simulateDownload(resource);
    }

    // 模拟下载
    simulateDownload(resource) {
        // 创建下载链接
        const link = document.createElement('a');
        link.href = resource.downloadUrl;
        link.download = resource.name;
        link.target = '_blank';
        
        // 触发下载
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // 显示下载成功提示
        this.showDownloadSuccess(resource);
    }

    // 显示下载成功提示
    showDownloadSuccess(resource) {
        const notification = document.createElement('div');
        notification.className = 'download-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">✅</span>
                <span class="notification-text">${resource.name} 下载成功！</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
}

// 导出到全局
window.SmartSearchEngine = SmartSearchEngine;
window.ResourceManager = ResourceManager;
window.enhancedOperationsDatabase = enhancedOperationsDatabase;
