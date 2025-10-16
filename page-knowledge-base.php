<?php
/**
 * 运营知识库 VIP 页面模板
 * Template Name: 运营知识库 VIP
 *
 * @package Hank_Handbook
 */

get_header();
?>

<main id="primary" class="site-main">
    
    <!-- 页面头部 -->
    <section class="resource-page-header">
        <div class="container">
            <div class="resource-breadcrumb">
                <a href="<?php echo home_url(); ?>">首页</a> > 
                <a href="<?php echo home_url(); ?>/resources">资源库</a> > 
                <span>运营知识库 VIP</span>
            </div>
            
            <div class="resource-hero">
                <div class="resource-badge">热门推荐</div>
                <h1 class="resource-title">运营知识库 VIP</h1>
                <p class="resource-subtitle">完整运营体系。从零到一的运营系统，包含内容创作、用户增长、变现策略。</p>
                
                <div class="resource-stats">
                    <div class="stat-item">
                        <span class="stat-number">25MB</span>
                        <span class="stat-label">文件大小</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-number">1,234</span>
                        <span class="stat-label">下载次数</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-number">免费</span>
                        <span class="stat-label">价格</span>
                    </div>
                </div>
                
                <div class="resource-actions">
                    <a href="#" class="btn btn-primary">
                        <span>📥 立即获取</span>
                    </a>
                    <a href="#" class="btn btn-outline">
                        <span>👁️ 预览内容</span>
                    </a>
                </div>
            </div>
        </div>
    </section>

    <!-- 知识库内容 -->
    <section class="knowledge-content">
        <div class="container">
            <div class="content-grid">
                <div class="content-main">
                    <h2 class="section-title">知识库内容</h2>
                    
                    <div class="knowledge-modules">
                        <div class="module-item">
                            <div class="module-icon">📚</div>
                            <div class="module-content">
                                <h3>运营基础理论</h3>
                                <p>运营的本质、核心思维、方法论框架，帮你建立正确的运营认知。</p>
                                <ul>
                                    <li>运营的定义与价值</li>
                                    <li>运营的核心思维模式</li>
                                    <li>运营方法论框架</li>
                                    <li>运营岗位职责解析</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div class="module-item">
                            <div class="module-icon">✍️</div>
                            <div class="module-content">
                                <h3>内容创作体系</h3>
                                <p>从选题到发布的全流程内容创作方法，打造爆款内容的秘诀。</p>
                                <ul>
                                    <li>内容选题策略</li>
                                    <li>文案写作技巧</li>
                                    <li>视觉设计规范</li>
                                    <li>内容发布策略</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div class="module-item">
                            <div class="module-icon">📈</div>
                            <div class="module-content">
                                <h3>用户增长策略</h3>
                                <p>从0到10万粉丝的完整增长路径，包含获客、留存、活跃的实战方法。</p>
                                <ul>
                                    <li>用户画像分析</li>
                                    <li>获客渠道策略</li>
                                    <li>用户留存机制</li>
                                    <li>增长黑客技巧</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div class="module-item">
                            <div class="module-icon">💰</div>
                            <div class="module-content">
                                <h3>变现策略指南</h3>
                                <p>7种主流变现方式详解，从知识付费到电商带货的完整变现路径。</p>
                                <ul>
                                    <li>知识付费模式</li>
                                    <li>广告变现策略</li>
                                    <li>电商带货技巧</li>
                                    <li>服务变现方法</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="content-sidebar">
                    <div class="sidebar-card">
                        <h3>知识库特色</h3>
                        <div class="feature-list">
                            <div class="feature-item">✅ 30+ 实战案例</div>
                            <div class="feature-item">✅ 可复制模板</div>
                            <div class="feature-item">✅ 持续更新</div>
                            <div class="feature-item">✅ VIP 专享</div>
                        </div>
                    </div>
                    
                    <div class="sidebar-card">
                        <h3>适用人群</h3>
                        <div class="audience-list">
                            <div class="audience-item">📱 新媒体运营</div>
                            <div class="audience-item">🎯 产品运营</div>
                            <div class="audience-item">📊 数据分析师</div>
                            <div class="audience-item">🚀 创业者</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- 相关资源 -->
    <section class="related-resources">
        <div class="container">
            <h2 class="section-title">相关资源</h2>
            <div class="resources-grid">
                <div class="resource-card">
                    <div class="resource-card-image">
                        <div class="resource-placeholder">📝</div>
                        <div class="resource-category">内容创作</div>
                    </div>
                    <div class="resource-card-content">
                        <h3 class="resource-card-title">
                            <a href="<?php echo home_url(); ?>/page-content-toolbox">内容创作工具箱</a>
                        </h3>
                        <p class="resource-card-description">AI 内容生成工具包，包含文案模板、选题策略、爆款内容公式。</p>
                    </div>
                </div>
                
                <div class="resource-card">
                    <div class="resource-card-image">
                        <div class="resource-placeholder">👥</div>
                        <div class="resource-category">用户增长</div>
                    </div>
                    <div class="resource-card-content">
                        <h3 class="resource-card-title">
                            <a href="<?php echo home_url(); ?>/page-growth-handbook">用户增长手册</a>
                        </h3>
                        <p class="resource-card-description">从0到10万粉丝的完整增长策略，包含引流、留存、变现全链路。</p>
                    </div>
                </div>
                
                <div class="resource-card">
                    <div class="resource-card-image">
                        <div class="resource-placeholder">💰</div>
                        <div class="resource-category">变现策略</div>
                    </div>
                    <div class="resource-card-content">
                        <h3 class="resource-card-title">
                            <a href="<?php echo home_url(); ?>/page-monetization-guide">变现策略指南</a>
                        </h3>
                        <p class="resource-card-description">7种主流变现方式详解，从知识付费到电商带货，找到适合你的搞钱路径。</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</main>

<?php
get_footer();
?>
