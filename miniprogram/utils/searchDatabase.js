// 运营知识库搜索数据库
// 与 WordPress 和静态网站版本保持一致

const operationsDatabase = {
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
        id: 1,
        name: "《用户增长手册》PDF",
        type: "guide",
        size: "2.5MB",
        description: "完整的用户增长方法论和实战案例",
        downloadUrl: "https://47.108.70.67/wp-content/uploads/resources/用户增长/用户增长手册.md",
        preview: true
      },
      {
        id: 2,
        name: "增长工具包（50+工具）",
        type: "tools",
        size: "15MB",
        description: "涵盖获客、留存、转化的全链路工具",
        downloadUrl: "#",
        preview: false
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
    keywords: ["如何创作内容", "爆款内容", "内容创作", "内容运营", "文案", "短视频"],
    difficulty: "初级",
    timeEstimate: "1-2个月",
    resources: [
      {
        id: 3,
        name: "《内容创作工具箱》",
        type: "tools",
        size: "8MB",
        description: "30+内容创作工具和模板",
        downloadUrl: "https://47.108.70.67/wp-content/uploads/resources/内容创作/内容创作工具箱.md",
        preview: true
      },
      {
        id: 4,
        name: "爆款标题公式（100+案例）",
        type: "template",
        size: "3MB",
        description: "经过验证的爆款标题公式和案例库",
        downloadUrl: "#",
        preview: true
      }
    ],
    related: ["用户增长", "社交媒体", "数据分析"],
    successCases: ["单条内容播放量破100万", "某自媒体月收入突破10万"]
  },
  
  "变现策略": {
    id: "monetization",
    title: "变现策略指南",
    description: "7种可复制的变现模式，从副业到主业的完整路径",
    tags: ["变现", "商业模式", "副业", "赚钱", "盈利模式", "收入渠道"],
    keywords: ["如何变现", "如何赚钱", "变现策略", "搞钱", "副业", "赚钱方法"],
    difficulty: "中级",
    timeEstimate: "3-6个月",
    resources: [
      {
        id: 5,
        name: "《变现策略指南》",
        type: "guide",
        size: "5MB",
        description: "7种变现模式的详细拆解和执行方案",
        downloadUrl: "https://47.108.70.67/wp-content/uploads/resources/变现策略/变现策略指南.md",
        preview: true
      },
      {
        id: 6,
        name: "商业模式画布模板",
        type: "template",
        size: "2MB",
        description: "商业模式设计和验证模板",
        downloadUrl: "#",
        preview: true
      }
    ],
    related: ["用户增长", "私域运营", "产品设计"],
    successCases: ["某知识博主年入百万", "某社群运营月收入破10万"]
  },
  
  "私域运营": {
    id: "private_domain",
    title: "私域流量运营",
    description: "构建自己的私域流量池，实现用户价值最大化",
    tags: ["私域运营", "社群运营", "微信运营", "用户运营", "社群管理"],
    keywords: ["私域", "私域流量", "社群运营", "微信运营", "社群管理", "用户运营"],
    difficulty: "中级",
    timeEstimate: "2-4个月",
    resources: [
      {
        id: 7,
        name: "《私域运营手册》",
        type: "guide",
        size: "4MB",
        description: "从公域到私域的完整转化路径",
        downloadUrl: "#",
        preview: true
      },
      {
        id: 8,
        name: "社群运营工具包",
        type: "tools",
        size: "10MB",
        description: "社群管理必备工具和模板",
        downloadUrl: "#",
        preview: false
      }
    ],
    related: ["用户增长", "变现策略", "内容创作"],
    successCases: ["某品牌私域GMV破千万", "某社群付费转化率达30%"]
  },
  
  "社交媒体": {
    id: "social_media",
    title: "社交媒体运营",
    description: "全平台社交媒体运营策略，快速打造个人IP",
    tags: ["社交媒体", "小红书", "抖音", "微信", "微博", "个人IP"],
    keywords: ["社交媒体", "小红书运营", "抖音运营", "个人IP", "自媒体"],
    difficulty: "初级",
    timeEstimate: "1-3个月",
    resources: [
      {
        id: 9,
        name: "《全平台运营指南》",
        type: "guide",
        size: "6MB",
        description: "小红书、抖音、微信等平台运营策略",
        downloadUrl: "#",
        preview: true
      },
      {
        id: 10,
        name: "爆款案例库（500+）",
        type: "cases",
        size: "20MB",
        description: "各平台爆款内容案例库",
        downloadUrl: "#",
        preview: true
      }
    ],
    related: ["内容创作", "用户增长", "个人品牌"],
    successCases: ["某账号3个月涨粉10万", "某品牌小红书ROI达1:15"]
  },
  
  "数据分析": {
    id: "data_analysis",
    title: "数据分析与优化",
    description: "数据驱动运营决策，提升运营效率和ROI",
    tags: ["数据分析", "数据运营", "用户分析", "转化率优化", "A/B测试"],
    keywords: ["数据分析", "数据运营", "如何分析数据", "转化率", "用户分析"],
    difficulty: "中级",
    timeEstimate: "2-3个月",
    resources: [
      {
        id: 11,
        name: "《数据分析实战》",
        type: "guide",
        size: "4.5MB",
        description: "运营数据分析方法和工具",
        downloadUrl: "#",
        preview: true
      },
      {
        id: 12,
        name: "数据分析模板包",
        type: "template",
        size: "5MB",
        description: "Excel/Google Sheets 数据分析模板",
        downloadUrl: "#",
        preview: true
      }
    ],
    related: ["用户增长", "转化率优化", "产品优化"],
    successCases: ["某电商转化率提升200%", "某APP留存率提高50%"]
  }
};

// 导出数据和方法
module.exports = {
  getData: function() {
    return operationsDatabase;
  },
  
  getById: function(id) {
    return Object.values(operationsDatabase).find(item => item.id === id);
  },
  
  getAllTags: function() {
    const allTags = new Set();
    Object.values(operationsDatabase).forEach(item => {
      item.tags.forEach(tag => allTags.add(tag));
    });
    return Array.from(allTags);
  }
};
