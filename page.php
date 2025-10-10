<?php
/**
 * 页面模板
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

        <article id="page-<?php the_ID(); ?>" <?php post_class(); ?>>
            
            <header class="single-post-header">
                <div class="container">
                    <h1><?php the_title(); ?></h1>
                </div>
            </header>

            <div class="single-post-content">
                <?php the_content(); ?>
            </div>

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

