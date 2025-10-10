<?php
/**
 * 存档页面模板
 *
 * @package Hank_Handbook
 */

get_header();
?>

<main id="primary" class="site-main">

    <header class="archive-header single-post-header">
        <div class="container">
            <?php
            the_archive_title('<h1 class="archive-title">', '</h1>');
            the_archive_description('<div class="archive-description">', '</div>');
            ?>
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
                    <p style="text-align: center;">没有找到相关内容。</p>
                <?php
                endif;
                ?>
            </div>
        </div>
    </section>

</main>

<?php
get_footer();

