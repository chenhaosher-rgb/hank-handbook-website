<?php
/**
 * 单篇文章模板
 *
 * @package Hank_Handbook
 */

get_header();
?>

<main id="primary" class="site-main">

    <?php
    while (have_posts()) :
        the_post();
        ?>

        <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
            
            <header class="single-post-header">
                <div class="container">
                    <?php
                    $categories = get_the_category();
                    if ($categories) :
                        ?>
                        <p class="hero-label">
                            <?php echo esc_html($categories[0]->name); ?>
                        </p>
                    <?php endif; ?>
                    
                    <h1><?php the_title(); ?></h1>
                    
                    <div class="post-meta">
                        <span class="post-author">作者：<?php the_author(); ?></span>
                        <span class="post-date"><?php echo get_the_date('Y年m月d日'); ?></span>
                        <?php if (function_exists('the_views')) : ?>
                            <span class="post-views"><?php the_views(); ?> 次阅读</span>
                        <?php endif; ?>
                    </div>
                </div>
            </header>

            <?php if (has_post_thumbnail()) : ?>
                <div class="post-thumbnail">
                    <?php the_post_thumbnail('large'); ?>
                </div>
            <?php endif; ?>

            <div class="single-post-content">
                <?php the_content(); ?>
            </div>

            <footer class="entry-footer" style="max-width: 800px; margin: 0 auto; padding: 0 var(--spacing-md) var(--spacing-xl);">
                <?php
                $tags = get_the_tags();
                if ($tags) :
                    ?>
                    <div class="post-tags" style="margin-top: var(--spacing-lg);">
                        <strong>标签：</strong>
                        <?php
                        foreach ($tags as $tag) :
                            ?>
                            <a href="<?php echo esc_url(get_tag_link($tag->term_id)); ?>" style="display: inline-block; padding: 0.25rem 0.75rem; background: var(--color-accent); border-radius: 4px; margin-right: 0.5rem; margin-bottom: 0.5rem; font-size: 0.9rem;">
                                <?php echo esc_html($tag->name); ?>
                            </a>
                            <?php
                        endforeach;
                        ?>
                    </div>
                <?php endif; ?>

                <div class="post-navigation" style="margin-top: var(--spacing-lg); padding-top: var(--spacing-lg); border-top: 1px solid var(--color-border);">
                    <?php
                    the_post_navigation(array(
                        'prev_text' => '<span class="nav-subtitle">上一篇</span> <span class="nav-title">%title</span>',
                        'next_text' => '<span class="nav-subtitle">下一篇</span> <span class="nav-title">%title</span>',
                    ));
                    ?>
                </div>
            </footer>

        </article>

        <?php
        // 如果评论开启，显示评论
        if (comments_open() || get_comments_number()) :
            ?>
            <div class="comments-section" style="max-width: 800px; margin: 0 auto; padding: 0 var(--spacing-md) var(--spacing-xl);">
                <?php comments_template(); ?>
            </div>
            <?php
        endif;

    endwhile;
    ?>

</main>

<?php
get_footer();

