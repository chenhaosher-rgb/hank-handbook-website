<?php
/**
 * 文章列表页面模板
 * Template Name: 文章列表
 *
 * @package Hank_Handbook
 */

get_header();
?>

<main id="primary" class="site-main">
    
    <!-- 页面头部 -->
    <section class="page-header">
        <div class="container">
            <h1 class="page-title">运营干货分享</h1>
            <p class="page-description">深度运营策略、实战经验和行业洞察，助你建立运营体系。</p>
        </div>
    </section>

    <!-- 文章分类筛选 -->
    <section class="articles-filter">
        <div class="container">
            <div class="filter-tabs">
                <a href="#" class="filter-tab active" data-category="all">全部</a>
                <a href="#" class="filter-tab" data-category="system">运营体系</a>
                <a href="#" class="filter-tab" data-category="growth">用户增长</a>
                <a href="#" class="filter-tab" data-category="content">内容创作</a>
                <a href="#" class="filter-tab" data-category="monetize">变现策略</a>
                <a href="#" class="filter-tab" data-category="private">私域运营</a>
            </div>
        </div>
    </section>

    <!-- 文章列表 -->
    <section class="articles-list-section">
        <div class="container">
            <div class="articles-grid" id="articles-container">
                <?php
                $paged = (get_query_var('paged')) ? get_query_var('paged') : 1;
                $args = array(
                    'post_type'      => 'post',
                    'posts_per_page' => 12,
                    'paged'          => $paged,
                    'post_status'    => 'publish',
                    'meta_query'     => array(
                        array(
                            'key'     => '_thumbnail_id',
                            'compare' => 'EXISTS'
                        )
                    )
                );

                $articles = new WP_Query($args);

                if ($articles->have_posts()) :
                    while ($articles->have_posts()) : $articles->the_post();
                        $categories = get_the_category();
                        $category_name = !empty($categories) ? $categories[0]->name : '运营干货';
                        $excerpt = wp_trim_words(get_the_excerpt(), 20, '...');
                        ?>
                        <article class="article-card" data-category="<?php echo esc_attr(strtolower($category_name)); ?>">
                            <div class="article-image">
                                <?php if (has_post_thumbnail()) : ?>
                                    <a href="<?php the_permalink(); ?>">
                                        <?php the_post_thumbnail('medium', array('alt' => get_the_title())); ?>
                                    </a>
                                <?php else : ?>
                                    <a href="<?php the_permalink(); ?>">
                                        <div class="article-placeholder">📄</div>
                                    </a>
                                <?php endif; ?>
                                <div class="article-category"><?php echo esc_html($category_name); ?></div>
                            </div>
                            
                            <div class="article-content">
                                <h3 class="article-title">
                                    <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                                </h3>
                                
                                <p class="article-excerpt"><?php echo esc_html($excerpt); ?></p>
                                
                                <div class="article-meta">
                                    <span class="article-date"><?php echo get_the_date('Y-m-d'); ?></span>
                                    <span class="article-views"><?php echo get_post_meta(get_the_ID(), 'post_views', true) ?: rand(100, 5000); ?> 阅读</span>
                                </div>
                                
                                <div class="article-tags">
                                    <?php
                                    $tags = get_the_tags();
                                    if ($tags) :
                                        $count = 0;
                                        foreach ($tags as $tag) :
                                            if ($count < 3) : ?>
                                                <span class="tag"><?php echo esc_html($tag->name); ?></span>
                                            <?php 
                                            $count++;
                                            endif;
                                        endforeach;
                                    endif;
                                    ?>
                                </div>
                            </div>
                        </article>
                        <?php
                    endwhile;
                else :
                    // 如果没有文章，显示默认文章
                    $default_articles = array(
                        array(
                            'title' => '运营知识库完整体系',
                            'excerpt' => '如何建立自己的运营知识库，从信息收集到知识沉淀的完整流程，帮你打造个人运营体系。',
                            'category' => '运营体系',
                            'date' => '2024-01-15',
                            'views' => '3245'
                        ),
                        array(
                            'title' => '从 0 到 10 万粉丝的增长策略',
                            'excerpt' => '分享我如何在 6 个月内从 0 增长到 10 万粉丝的完整策略和执行细节，包含具体操作方法。',
                            'category' => '用户增长',
                            'date' => '2024-01-10',
                            'views' => '5678'
                        ),
                        array(
                            'title' => '内容创作的底层逻辑',
                            'excerpt' => '深度解析什么样的内容能够吸引用户，如何创作高质量内容，掌握内容创作的核心思维。',
                            'category' => '内容创作',
                            'date' => '2024-01-05',
                            'views' => '2890'
                        ),
                        array(
                            'title' => '7 种可复制的变现模式',
                            'excerpt' => '从知识付费到电商带货，详细介绍 7 种经过验证的变现方式，帮你找到适合的搞钱路径。',
                            'category' => '变现策略',
                            'date' => '2024-01-01',
                            'views' => '4321'
                        )
                    );

                    foreach ($default_articles as $index => $article) :
                        ?>
                        <article class="article-card" data-category="<?php echo esc_attr(strtolower($article['category'])); ?>">
                            <div class="article-image">
                                <a href="#">
                                    <div class="article-placeholder">📄</div>
                                </a>
                                <div class="article-category"><?php echo esc_html($article['category']); ?></div>
                            </div>
                            
                            <div class="article-content">
                                <h3 class="article-title">
                                    <a href="#"><?php echo esc_html($article['title']); ?></a>
                                </h3>
                                
                                <p class="article-excerpt"><?php echo esc_html($article['excerpt']); ?></p>
                                
                                <div class="article-meta">
                                    <span class="article-date"><?php echo esc_html($article['date']); ?></span>
                                    <span class="article-views"><?php echo esc_html($article['views']); ?> 阅读</span>
                                </div>
                                
                                <div class="article-tags">
                                    <span class="tag">运营</span>
                                    <span class="tag">策略</span>
                                    <span class="tag">实战</span>
                                </div>
                            </div>
                        </article>
                        <?php
                    endforeach;
                endif;

                wp_reset_postdata();
                ?>
            </div>

            <!-- 加载更多按钮 -->
            <div class="load-more-container">
                <button class="load-more-btn" id="load-more-articles">
                    <span class="btn-text">加载更多文章</span>
                    <span class="btn-loading" style="display: none;">加载中...</span>
                </button>
            </div>
        </div>
    </section>
</main>

<?php
get_footer();
?>
