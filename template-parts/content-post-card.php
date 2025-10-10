<?php
/**
 * 文章卡片模板
 *
 * @package Hank_Handbook
 */
?>

<article id="post-<?php the_ID(); ?>" <?php post_class('post-card'); ?>>
    <div class="post-card-content">
        <h3>
            <a href="<?php the_permalink(); ?>">
                <?php the_title(); ?>
            </a>
        </h3>

        <div class="post-excerpt">
            <?php the_excerpt(); ?>
        </div>

        <div class="post-meta">
            <span class="post-author"><?php the_author(); ?></span>
            <span class="post-date"><?php echo get_the_date('Y年m月d日'); ?></span>
        </div>

        <a href="<?php the_permalink(); ?>" class="read-more">
            阅读全文 →
        </a>
    </div>
</article>

