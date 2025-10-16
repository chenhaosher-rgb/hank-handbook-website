<?php
/**
 * 内容创作工具箱页面模板
 * Template Name: 内容创作工具箱
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
                <span>内容创作工具箱</span>
            </div>
            
            <div class="resource-hero">
                <div class="resource-badge">内容创作</div>
                <h1 class="resource-title">内容创作工具箱</h1>
                <p class="resource-subtitle">AI 内容生成工具包，包含文案模板、选题策略、爆款内容公式，让你的内容创作事半功倍。</p>
                
                <div class="resource-stats">
                    <div class="stat-item">
                        <span class="stat-number">15MB</span>
                        <span class="stat-label">文件大小</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-number">856</span>
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

    <!-- 工具箱内容 -->
    <section class="toolbox-content">
        <div class="container">
            <div class="content-grid">
                <div class="content-main">
                    <h2 class="section-title">工具箱内容</h2>
                    
                    <div class="toolbox-modules">
                        <div class="module-item">
                            <div class="module-icon">📝</div>
                            <div class="module-content">
                                <h3>文案模板库</h3>
                                <p>50+ 经过验证的文案模板，覆盖各种场景和行业，让你的文案更有说服力。</p>
                                <ul>
                                    <li>标题文案模板</li>
                                    <li>产品介绍模板</li>
                                    <li>活动推广模板</li>
                                    <li>用户故事模板</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div class="module-item">
                            <div class="module-icon">🎯</div>
                            <div class="module-content">
                                <h3>选题策略指南</h3>
                                <p>系统化的选题方法论，帮你找到用户感兴趣的内容方向，提升内容传播效果。</p>
                                <ul>
                                    <li>用户需求分析</li>
                                    <li>热门话题追踪</li>
                                    <li>竞争对手分析</li>
                                    <li>内容规划方法</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div class="module-item">
                            <div class="module-icon">🔥</div>
                            <div class="module-content">
                                <h3>爆款内容公式</h3>
                                <p>揭秘爆款内容的创作规律，掌握让内容病毒式传播的核心要素。</p>
                                <ul>
                                    <li>爆款标题公式</li>
                                    <li>内容结构模板</li>
                                    <li>情绪触发技巧</li>
                                    <li>传播机制设计</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div class="module-item">
                            <div class="module-icon">🤖</div>
                            <div class="module-content">
                                <h3>AI 工具推荐</h3>
                                <p>精选的 AI 内容创作工具，提升创作效率，让 AI 成为你的创作助手。</p>
                                <ul>
                                    <li>AI 写作工具</li>
                                    <li>智能配图工具</li>
                                    <li>视频制作工具</li>
                                    <li>数据分析工具</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="content-sidebar">
                    <div class="sidebar-card">
                        <h3>工具箱特色</h3>
                        <div class="feature-list">
                            <div class="feature-item">✅ 50+ 文案模板</div>
                            <div class="feature-item">✅ 爆款标题公式</div>
                            <div class="feature-item">✅ 选题策略指南</div>
                            <div class="feature-item">✅ AI 工具推荐</div>
                        </div>
                    </div>
                    
                    <div class="sidebar-card">
                        <h3>适用人群</h3>
                        <div class="audience-list">
                            <div class="audience-item">✍️ 文案策划</div>
                            <div class="audience-item">📱 新媒体运营</div>
                            <div class="audience-item">🎨 内容创作者</div>
                            <div class="audience-item">📢 营销人员</div>
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
                        <div class="resource-placeholder">📚</div>
                        <div class="resource-category">运营体系</div>
                    </div>
                    <div class="resource-card-content">
                        <h3 class="resource-card-title">
                            <a href="<?php echo home_url(); ?>/page-knowledge-base">运营知识库 VIP</a>
                        </h3>
                        <p class="resource-card-description">完整运营体系。从零到一的运营系统，包含内容创作、用户增长、变现策略。</p>
                    </div>
                </div>
                
                <div class="resource-card">
                    <div class="resource-card-image">
                        <div class="resource-placeholder">📊</div>
                        <div class="resource-category">数据分析</div>
                    </div>
                    <div class="resource-card-content">
                        <h3 class="resource-card-title">
                            <a href="<?php echo home_url(); ?>/page-data-analysis">数据分析工具</a>
                        </h3>
                        <p class="resource-card-description">运营必备的数据分析模板和工具，让数据驱动你的运营决策。</p>
                    </div>
                </div>
                
                <div class="resource-card">
                    <div class="resource-card-image">
                        <div class="resource-placeholder">📋</div>
                        <div class="resource-category">案例研究</div>
                    </div>
                    <div class="resource-card-content">
                        <h3 class="resource-card-title">
                            <a href="<?php echo home_url(); ?>/page-case-library">运营案例库</a>
                        </h3>
                        <p class="resource-card-description">100+成功运营案例拆解，学习大厂和网红们的运营秘籍。</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</main>

<?php
get_footer();
?>
