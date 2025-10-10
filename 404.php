<?php
/**
 * 404 错误页面模板
 *
 * @package Hank_Handbook
 */

get_header();
?>

<main id="primary" class="site-main">

    <section class="error-404 not-found">
        <header class="single-post-header">
            <div class="container">
                <h1 class="page-title">404</h1>
                <p class="hero-description">抱歉，该页面不存在。</p>
            </div>
        </header>

        <div class="page-content" style="max-width: 800px; margin: 0 auto; padding: var(--spacing-xl) var(--spacing-md); text-align: center;">
            <p>您访问的页面可能已被删除、名称已更改或暂时不可用。</p>

            <form role="search" method="get" class="search-form" action="<?php echo esc_url(home_url('/')); ?>" style="max-width: 500px; margin: var(--spacing-lg) auto;">
                <div class="email-signup-form">
                    <input type="search" name="s" placeholder="搜索...">
                    <button type="submit">搜索</button>
                </div>
            </form>

            <div style="margin-top: var(--spacing-lg);">
                <a href="<?php echo esc_url(home_url('/')); ?>" class="btn" style="background: var(--color-primary); color: var(--color-secondary); padding: var(--spacing-sm) var(--spacing-lg); border-radius: var(--border-radius); display: inline-block; font-weight: 600;">
                    返回首页
                </a>
            </div>
        </div>
    </section>

</main>

<?php
get_footer();

