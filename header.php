<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="profile" href="https://gmpg.org/xfn/11">
    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<div id="page" class="site">

    <header class="site-header">
        <div class="container">
            <div class="header-inner">
                <div class="site-branding">
                    <?php
                    if (has_custom_logo()) :
                        the_custom_logo();
                    else :
                        ?>
                        <a href="<?php echo esc_url(home_url('/')); ?>" class="site-logo" rel="home">
                            <div class="logo-icon"></div>
                            <span class="logo-text"><?php bloginfo('name'); ?></span>
                        </a>
                        <?php
                    endif;
                    ?>
                </div>

                <nav class="main-navigation" id="site-navigation">
                    <?php
                    wp_nav_menu(array(
                        'theme_location' => 'primary',
                        'menu_class'     => 'nav-menu',
                        'container'      => false,
                        'fallback_cb'    => function() {
                            echo '<ul class="nav-menu">';
                            echo '<li><a href="' . esc_url(home_url('/')) . '">首页</a></li>';
                            echo '<li><a href="' . esc_url(home_url('/articles')) . '">文章</a></li>';
                            echo '<li><a href="' . esc_url(home_url('/resources')) . '">资源</a></li>';
                            if (is_user_logged_in()) {
                                $current_user = wp_get_current_user();
                                $nickname = get_user_meta($current_user->ID, 'wechat_nickname', true);
                                echo '<li class="menu-item-account"><a href="' . esc_url(home_url('/my-account')) . '">' . esc_html($nickname ?: '我的') . '</a></li>';
                            } else {
                                echo '<li class="menu-item-login"><a href="' . esc_url(home_url('/my-account')) . '">登录</a></li>';
                            }
                            echo '</ul>';
                        },
                    ));
                    ?>
                </nav>

                <button class="mobile-menu-toggle" id="mobile-menu-toggle" aria-controls="site-navigation" aria-expanded="false">
                    <span class="screen-reader-text">菜单</span>
                    <span>☰</span>
                </button>
            </div>
        </div>
    </header>

