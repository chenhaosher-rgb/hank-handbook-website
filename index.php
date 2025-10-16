<?php
/**
 * 主页模板
 *
 * @package Hank_Handbook
 */

get_header();
?>

<main id="primary" class="site-main">

    <!-- Hero Section -->
    <section class="hero-section">
        <div class="container">
            <p class="hero-label"><?php echo esc_html(get_theme_mod('hero_label', '汉克运营知识库')); ?></p>
            <h1 class="hero-title"><?php echo esc_html(get_theme_mod('hero_title', '汉克运营知识库·搞钱计划')); ?></h1>
            <p class="hero-description"><?php echo esc_html(get_theme_mod('hero_description', '建立自己的运营系统，搞到第一桶金')); ?></p>
        </div>
    </section>

    <!-- Search Section -->
    <section class="search-section">
        <div class="container">
            <div class="search-container">
                <h2 class="search-title">运营问题智能搜索</h2>
                <p class="search-description">输入您当前面临的运营难题，获取精准解决方案和专属资料包</p>
                <form class="search-form" id="operations-search-form">
                    <div class="search-input-group">
                        <input type="text" id="operations-search" placeholder="例如：如何提升用户活跃度？如何增加粉丝转化？" required>
                        <button type="submit" class="search-btn">
                            <span class="search-btn-text">获取解决方案</span>
                            <span class="search-btn-icon">🔍</span>
                        </button>
                    </div>
                </form>
                <div class="search-suggestions">
                    <span class="suggestion-label">热门问题：</span>
                    <span class="suggestion-tag" onclick="searchSuggestion('用户增长')">用户增长</span>
                    <span class="suggestion-tag" onclick="searchSuggestion('内容创作')">内容创作</span>
                    <span class="suggestion-tag" onclick="searchSuggestion('变现策略')">变现策略</span>
                    <span class="suggestion-tag" onclick="searchSuggestion('数据分析')">数据分析</span>
                </div>
                
                <!-- Search Results -->
                <div id="search-results" class="search-results"></div>
            </div>
        </div>
    </section>

    <!-- Resources Section -->
    <section class="resources-section section">
        <div class="container">
            <p class="section-label"><?php echo esc_html(get_theme_mod('resources_label', '资源')); ?></p>
            <h2 class="section-title"><?php echo esc_html(get_theme_mod('resources_title', '运营工具库')); ?></h2>
            <p style="text-align: center; color: var(--color-text-light); margin-bottom: var(--spacing-lg);">精选运营工具和资源，助力你的搞钱计划</p>
            
            <div class="resources-grid">
                <?php
                $resources = new WP_Query(array(
                    'post_type'      => 'resource',
                    'posts_per_page' => 6,
                    'orderby'        => 'menu_order',
                    'order'          => 'ASC',
                ));

                if ($resources->have_posts()) :
                    while ($resources->have_posts()) : $resources->the_post();
                        $resource_link = get_post_meta(get_the_ID(), '_resource_link', true);
                        $button_text = get_post_meta(get_the_ID(), '_resource_button_text', true);
                        $is_highlight = get_post_meta(get_the_ID(), '_resource_highlight', true);
                        ?>
                        <div class="resource-card <?php echo $is_highlight ? 'highlight' : ''; ?>">
                            <?php if ($is_highlight) : ?>
                                <span class="badge" style="background: var(--color-primary); color: var(--color-secondary); padding: 0.25rem 0.75rem; border-radius: 4px; font-size: 0.75rem; font-weight: 600; text-transform: uppercase; margin-bottom: var(--spacing-sm); display: inline-block;">推荐</span>
                            <?php endif; ?>
                            
                            <h3><?php the_title(); ?></h3>
                            <p><?php echo get_the_excerpt(); ?></p>
                            
                            <?php if ($resource_link) : ?>
                                <a href="<?php echo esc_url($resource_link); ?>" class="btn" target="_blank">
                                    <?php echo esc_html($button_text ? $button_text : '了解更多'); ?>
                                </a>
                            <?php endif; ?>
                        </div>
                        <?php
                    endwhile;
                    wp_reset_postdata();
                else :
                    ?>
                    <!-- 默认示例资源 -->
                    <div class="resource-card highlight">
                        <span class="badge" style="background: var(--color-red); color: var(--color-secondary); padding: 0.25rem 0.75rem; border-radius: 4px; font-size: 0.75rem; font-weight: 600; text-transform: uppercase; margin-bottom: var(--spacing-sm); display: inline-block;">热门推荐</span>
                        <h3>运营知识库 VIP</h3>
                        <p><strong>完整运营体系。</strong> 从零到一的运营系统，包含内容创作、用户增长、变现策略。</p>
                        <a href="#" class="btn">立即获取</a>
                    </div>
                    
                    <div class="resource-card">
                        <h3>内容创作工具箱</h3>
                        <p><strong>AI 内容生成工具包</strong>，包含文案模板、选题策略、爆款内容公式。</p>
                        <a href="#" class="btn">立即获取</a>
                    </div>
                    
                    <div class="resource-card">
                        <h3>用户增长手册</h3>
                        <p>从 0 到 10 万粉丝的完整增长策略，<strong>包含引流、留存、变现全链路</strong>。</p>
                        <a href="#" class="btn">查看详情</a>
                    </div>
                    
                    <div class="resource-card">
                        <h3>变现策略指南</h3>
                        <p>7 种主流变现方式详解，从知识付费到电商带货，找到适合你的搞钱路径。</p>
                        <a href="#" class="btn">获取指南</a>
                    </div>
                    
                    <div class="resource-card">
                        <h3>数据分析工具</h3>
                        <p>运营必备的数据分析模板和工具，让数据驱动你的运营决策。</p>
                        <a href="#" class="btn">下载工具</a>
                    </div>
                    
                    <div class="resource-card">
                        <h3>运营案例库</h3>
                        <p>100+ 成功运营案例拆解，学习大厂和网红们的运营秘籍。</p>
                        <a href="#" class="btn">查看案例</a>
                    </div>
                <?php endif; ?>
            </div>
        </div>
    </section>

    <!-- Blog Section -->
    <section class="blog-section section">
        <div class="container">
            <p class="section-label"><?php echo esc_html(get_theme_mod('blog_label', '文章')); ?></p>
            <h2 class="section-title"><?php echo esc_html(get_theme_mod('blog_title', '运营干货分享')); ?></h2>
            <p style="text-align: center; color: var(--color-text-light); margin-bottom: var(--spacing-lg);">
                <?php echo esc_html(get_theme_mod('blog_description', '深度运营策略、实战经验和行业洞察，助你建立运营体系。')); ?>
            </p>
            
            <div class="posts-grid" id="posts-container">
                <?php
                $blog_posts = new WP_Query(array(
                    'post_type'      => 'post',
                    'posts_per_page' => 12,
                    'paged'          => 1,
                ));

                if ($blog_posts->have_posts()) :
                    while ($blog_posts->have_posts()) : $blog_posts->the_post();
                        get_template_part('template-parts/content', 'post-card');
                    endwhile;
                    
                    // 如果有更多文章，显示加载更多按钮
                    if ($blog_posts->max_num_pages > 1) :
                        ?>
                        <button class="load-more-btn" id="load-more" data-page="1" data-max="<?php echo $blog_posts->max_num_pages; ?>">
                            加载更多
                        </button>
                        <?php
                    endif;
                    
                    wp_reset_postdata();
                else :
                    ?>
                    <p style="text-align: center;">暂无文章发布。</p>
                <?php endif; ?>
            </div>
        </div>
    </section>

</main>

<?php
get_footer();

