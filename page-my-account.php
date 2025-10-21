<?php
/**
 * Template Name: 我的（个人中心）
 * Description: 个人中心页面，支持未登录提示、资料包与搜索记录同步展示
 *
 * @package Hank_Handbook
 */

get_header();

// 当前用户
$is_logged_in = is_user_logged_in();
$current_user = wp_get_current_user();

// 加载个人中心脚本
wp_enqueue_script('my-account', get_template_directory_uri() . '/js/my-account.js', array('jquery'), '1.0', true);
?>

<main id="primary" class="site-main">
    <section class="account-hero" style="background: linear-gradient(135deg, var(--color-primary) 0%, #991b1b 100%); color: #fff; padding: 48px 0;">
        <div class="container" style="display:flex; align-items:center; gap:24px;">
            <div class="avatar" style="width:72px; height:72px; border-radius:50%; overflow:hidden; background: rgba(255,255,255,.2); display:flex; align-items:center; justify-content:center; font-size:28px;">
                <?php if ($is_logged_in) :
                    $avatar = get_user_meta($current_user->ID, 'wechat_avatar', true);
                    $nickname = get_user_meta($current_user->ID, 'wechat_nickname', true);
                    if ($avatar) : ?>
                        <img src="<?php echo esc_url($avatar); ?>" alt="avatar" style="width:100%;height:100%;object-fit:cover;" />
                    <?php else : ?>
                        <span><?php echo esc_html(mb_substr($nickname ?: $current_user->display_name, 0, 1)); ?></span>
                    <?php endif; ?>
                <?php else : ?>
                    <span>👤</span>
                <?php endif; ?>
            </div>
            <div class="info" style="flex:1;">
                <h1 style="margin:0 0 8px; font-size:28px; line-height:1.2;">我的</h1>
                <p style="margin:0; opacity:.9;">
                    <?php if ($is_logged_in) : ?>
                        欢迎回来，<?php echo esc_html($nickname ?: $current_user->display_name); ?>
                    <?php else : ?>
                        您还未登录，登录后可查看“我的资料包”和“搜索记录”
                    <?php endif; ?>
                </p>
            </div>
            <div>
                <?php if ($is_logged_in) : ?>
                    <a class="btn" style="background:#fff;color:var(--color-primary);padding:12px 20px;border-radius:8px;text-decoration:none;font-weight:600;" href="<?php echo esc_url(wp_logout_url(home_url('/my-account'))); ?>">退出登录</a>
                <?php else : ?>
                    <?php get_template_part('template-parts/wechat-login-button'); ?>
                <?php endif; ?>
            </div>
        </div>
    </section>

    <section class="account-content" style="padding:48px 0;">
        <div class="container" style="display:grid; grid-template-columns: 2fr 1fr; gap:32px;">
            <div class="left">
                <div class="card" style="background:#fff;border-radius:12px;padding:24px;box-shadow:0 4px 20px rgba(0,0,0,.06); margin-bottom:24px;">
                    <h2 style="margin:0 0 16px; font-size:20px;">我的资料包</h2>
                    <?php if (!$is_logged_in) : ?>
                        <p style="color:var(--color-text-light);">登录后可在此查看与小程序同步的资料包。</p>
                    <?php endif; ?>
                    <div id="packages-list" data-logged-in="<?php echo $is_logged_in ? '1' : '0'; ?>">
                        <div class="empty" style="color:var(--color-text-light);">加载中...</div>
                    </div>
                </div>

                <div class="card" style="background:#fff;border-radius:12px;padding:24px;box-shadow:0 4px 20px rgba(0,0,0,.06);">
                    <h2 style="margin:0 0 16px; font-size:20px;">搜索记录</h2>
                    <?php if (!$is_logged_in) : ?>
                        <p style="color:var(--color-text-light);">登录后可在此查看与小程序同步的搜索记录。</p>
                    <?php endif; ?>
                    <div id="history-list" data-logged-in="<?php echo $is_logged_in ? '1' : '0'; ?>">
                        <div class="empty" style="color:var(--color-text-light);">加载中...</div>
                    </div>
                </div>
            </div>

            <div class="right">
                <div class="card" style="background:#fff;border-radius:12px;padding:24px;box-shadow:0 4px 20px rgba(0,0,0,.06);">
                    <h3 style="margin:0 0 12px; font-size:18px;">账户信息</h3>
                    <?php if ($is_logged_in) : ?>
                        <ul style="padding-left:18px; margin:0; color:var(--color-text-light); line-height:1.8;">
                            <li>昵称：<?php echo esc_html($nickname ?: $current_user->display_name); ?></li>
                            <li>邮箱：<?php echo esc_html($current_user->user_email ?: '未设置'); ?></li>
                            <li>上次登录：<?php echo esc_html(get_user_meta($current_user->ID, 'last_login', true) ?: '—'); ?></li>
                        </ul>
                    <?php else : ?>
                        <p style="color:var(--color-text-light);">未登录</p>
                    <?php endif; ?>
                </div>
            </div>
        </div>
    </section>
</main>

<?php get_footer(); ?>


