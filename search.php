<?php
/**
 * 搜索结果模板
 *
 * @package Hank_Handbook
 */

get_header();
?>

<main id="primary" class="site-main">

    <header class="search-header single-post-header">
        <div class="container">
            <h1 class="search-title">
                <?php
                printf(
                    esc_html__('搜索结果：%s', 'hank-handbook'),
                    '<span>' . get_search_query() . '</span>'
                );
                ?>
            </h1>
        </div>
    </header>

    <section class="blog-section section">
        <div class="container">
            <div class="posts-grid" id="posts-container">
                <?php
                if (have_posts()) :
                    while (have_posts()) :
                        the_post();
                        get_template_part('template-parts/content', 'post-card');
                    endwhile;

                    // 分页导航
                    the_posts_pagination(array(
                        'mid_size'  => 2,
                        'prev_text' => '← 上一页',
                        'next_text' => '下一页 →',
                    ));
                else :
                    ?>
                    <div style="text-align: center; padding: var(--spacing-xl);">
                        <p>没有找到与 "<?php echo esc_html(get_search_query()); ?>" 相关的内容。</p>
                        <p>请尝试其他关键词。</p>
                        
                        <form role="search" method="get" class="search-form" action="<?php echo esc_url(home_url('/')); ?>" style="max-width: 500px; margin: var(--spacing-md) auto;">
                            <div class="email-signup-form">
                                <input type="search" name="s" placeholder="搜索..." value="<?php echo get_search_query(); ?>">
                                <button type="submit">搜索</button>
                            </div>
                        </form>
                    </div>
                <?php
                endif;
                ?>
            </div>
        </div>
    </section>

</main>

<?php
get_footer();

