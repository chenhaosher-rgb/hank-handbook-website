<?php
/**
 * 红人汉克手册主题函数
 *
 * @package Hank_Handbook
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * 主题设置
 */
function hank_handbook_setup() {
    // 添加主题支持
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('custom-logo', array(
        'height'      => 100,
        'width'       => 400,
        'flex-height' => true,
        'flex-width'  => true,
    ));
    add_theme_support('html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
    ));
    add_theme_support('custom-background');
    add_theme_support('customize-selective-refresh-widgets');
    add_theme_support('automatic-feed-links');

    // 注册导航菜单
    register_nav_menus(array(
        'primary' => '主导航菜单',
        'footer'  => '页脚菜单',
    ));

    // 设置内容宽度
    if (!isset($content_width)) {
        $content_width = 1200;
    }
}
add_action('after_setup_theme', 'hank_handbook_setup');

/**
 * 注册小工具区域
 */
function hank_handbook_widgets_init() {
    register_sidebar(array(
        'name'          => '页脚区域 1',
        'id'            => 'footer-1',
        'description'   => '在页脚第一列显示的小工具',
        'before_widget' => '<div id="%1$s" class="widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h4 class="widget-title">',
        'after_title'   => '</h4>',
    ));

    register_sidebar(array(
        'name'          => '页脚区域 2',
        'id'            => 'footer-2',
        'description'   => '在页脚第二列显示的小工具',
        'before_widget' => '<div id="%1$s" class="widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h4 class="widget-title">',
        'after_title'   => '</h4>',
    ));

    register_sidebar(array(
        'name'          => '页脚区域 3',
        'id'            => 'footer-3',
        'description'   => '在页脚第三列显示的小工具',
        'before_widget' => '<div id="%1$s" class="widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h4 class="widget-title">',
        'after_title'   => '</h4>',
    ));
}
add_action('widgets_init', 'hank_handbook_widgets_init');

/**
 * 加载脚本和样式
 */
function hank_handbook_scripts() {
    // 主题样式
    wp_enqueue_style('hank-handbook-style', get_stylesheet_uri(), array(), '1.0.0');
    
    // 主题脚本
    wp_enqueue_script('hank-handbook-script', get_template_directory_uri() . '/js/main.js', array('jquery'), '1.0.0', true);
    
    // 评论回复脚本
    if (is_singular() && comments_open() && get_option('thread_comments')) {
        wp_enqueue_script('comment-reply');
    }
}
add_action('wp_enqueue_scripts', 'hank_handbook_scripts');

/**
 * 自定义摘要长度
 */
function hank_handbook_excerpt_length($length) {
    return 40;
}
add_filter('excerpt_length', 'hank_handbook_excerpt_length');

/**
 * 自定义摘要结尾
 */
function hank_handbook_excerpt_more($more) {
    return '...';
}
add_filter('excerpt_more', 'hank_handbook_excerpt_more');

/**
 * 添加自定义字段到主题定制器
 */
function hank_handbook_customize_register($wp_customize) {
    // Hero 部分
    $wp_customize->add_section('hank_hero_section', array(
        'title'    => 'Hero 区域设置',
        'priority' => 30,
    ));

    $wp_customize->add_setting('hero_label', array(
        'default'           => '汉克运营知识库',
        'sanitize_callback' => 'sanitize_text_field',
    ));

    $wp_customize->add_control('hero_label', array(
        'label'   => 'Hero 标签',
        'section' => 'hank_hero_section',
        'type'    => 'text',
    ));

    $wp_customize->add_setting('hero_title', array(
        'default'           => '汉克运营知识库·搞钱计划',
        'sanitize_callback' => 'sanitize_text_field',
    ));

    $wp_customize->add_control('hero_title', array(
        'label'   => 'Hero 标题',
        'section' => 'hank_hero_section',
        'type'    => 'text',
    ));

    $wp_customize->add_setting('hero_description', array(
        'default'           => '建立自己的运营系统，搞到第一桶金',
        'sanitize_callback' => 'sanitize_textarea_field',
    ));

    $wp_customize->add_control('hero_description', array(
        'label'   => 'Hero 描述',
        'section' => 'hank_hero_section',
        'type'    => 'textarea',
    ));

    $wp_customize->add_setting('hero_cta_text', array(
        'default'           => '联系我',
        'sanitize_callback' => 'sanitize_text_field',
    ));

    $wp_customize->add_control('hero_cta_text', array(
        'label'   => 'CTA 按钮文字',
        'section' => 'hank_hero_section',
        'type'    => 'text',
    ));

    // 资源区域
    $wp_customize->add_section('hank_resources_section', array(
        'title'    => '资源区域设置',
        'priority' => 31,
    ));

    $wp_customize->add_setting('resources_label', array(
        'default'           => 'RESOURCES',
        'sanitize_callback' => 'sanitize_text_field',
    ));

    $wp_customize->add_control('resources_label', array(
        'label'   => '资源标签',
        'section' => 'hank_resources_section',
        'type'    => 'text',
    ));

    $wp_customize->add_setting('resources_title', array(
        'default'           => '运营工具库',
        'sanitize_callback' => 'sanitize_text_field',
    ));

    $wp_customize->add_control('resources_title', array(
        'label'   => '资源区标题',
        'section' => 'hank_resources_section',
        'type'    => 'text',
    ));

    // 博客区域
    $wp_customize->add_section('hank_blog_section', array(
        'title'    => '博客区域设置',
        'priority' => 32,
    ));

    $wp_customize->add_setting('blog_label', array(
        'default'           => 'THE BLOG',
        'sanitize_callback' => 'sanitize_text_field',
    ));

    $wp_customize->add_control('blog_label', array(
        'label'   => '博客标签',
        'section' => 'hank_blog_section',
        'type'    => 'text',
    ));

    $wp_customize->add_setting('blog_title', array(
        'default'           => '运营干货分享',
        'sanitize_callback' => 'sanitize_text_field',
    ));

    $wp_customize->add_control('blog_title', array(
        'label'   => '博客区标题',
        'section' => 'hank_blog_section',
        'type'    => 'text',
    ));

    $wp_customize->add_setting('blog_description', array(
        'default'           => '深度运营策略、实战经验和行业洞察，助你建立运营体系。',
        'sanitize_callback' => 'sanitize_textarea_field',
    ));

    $wp_customize->add_control('blog_description', array(
        'label'   => '博客描述',
        'section' => 'hank_blog_section',
        'type'    => 'textarea',
    ));

    // 社交媒体链接
    $wp_customize->add_section('hank_social_section', array(
        'title'    => '社交媒体链接',
        'priority' => 33,
    ));

    $socials = array('twitter', 'youtube', 'linkedin', 'instagram');
    foreach ($socials as $social) {
        $wp_customize->add_setting("social_{$social}", array(
            'default'           => '',
            'sanitize_callback' => 'esc_url_raw',
        ));

        $wp_customize->add_control("social_{$social}", array(
            'label'   => ucfirst($social) . ' URL',
            'section' => 'hank_social_section',
            'type'    => 'url',
        ));
    }
}
add_action('customize_register', 'hank_handbook_customize_register');

/**
 * 注册自定义文章类型：资源
 */
function hank_handbook_register_resource_post_type() {
    $labels = array(
        'name'               => '资源',
        'singular_name'      => '资源',
        'menu_name'          => '资源',
        'add_new'            => '添加资源',
        'add_new_item'       => '添加新资源',
        'edit_item'          => '编辑资源',
        'new_item'           => '新资源',
        'view_item'          => '查看资源',
        'search_items'       => '搜索资源',
        'not_found'          => '未找到资源',
        'not_found_in_trash' => '回收站中未找到资源',
    );

    $args = array(
        'labels'             => $labels,
        'public'             => true,
        'has_archive'        => true,
        'publicly_queryable' => true,
        'show_ui'            => true,
        'show_in_menu'       => true,
        'query_var'          => true,
        'rewrite'            => array('slug' => 'resources'),
        'capability_type'    => 'post',
        'has_archive'        => true,
        'hierarchical'       => false,
        'menu_position'      => 5,
        'menu_icon'          => 'dashicons-book',
        'supports'           => array('title', 'editor', 'thumbnail', 'excerpt', 'custom-fields'),
        'show_in_rest'       => true,
    );

    register_post_type('resource', $args);
}
add_action('init', 'hank_handbook_register_resource_post_type');

/**
 * 添加资源元数据框
 */
function hank_handbook_add_resource_meta_boxes() {
    add_meta_box(
        'resource_details',
        '资源详情',
        'hank_handbook_resource_meta_box_callback',
        'resource',
        'normal',
        'high'
    );
}
add_action('add_meta_boxes', 'hank_handbook_add_resource_meta_boxes');

/**
 * 资源元数据框回调
 */
function hank_handbook_resource_meta_box_callback($post) {
    wp_nonce_field('hank_handbook_save_resource_meta', 'hank_handbook_resource_meta_nonce');
    
    $resource_link = get_post_meta($post->ID, '_resource_link', true);
    $resource_button_text = get_post_meta($post->ID, '_resource_button_text', true);
    $resource_highlight = get_post_meta($post->ID, '_resource_highlight', true);
    
    ?>
    <p>
        <label for="resource_link"><strong>资源链接：</strong></label><br>
        <input type="url" id="resource_link" name="resource_link" value="<?php echo esc_url($resource_link); ?>" style="width: 100%;">
    </p>
    <p>
        <label for="resource_button_text"><strong>按钮文字：</strong></label><br>
        <input type="text" id="resource_button_text" name="resource_button_text" value="<?php echo esc_attr($resource_button_text); ?>" style="width: 100%;">
    </p>
    <p>
        <label for="resource_highlight">
            <input type="checkbox" id="resource_highlight" name="resource_highlight" value="1" <?php checked($resource_highlight, '1'); ?>>
            <strong>设为重点推荐</strong>
        </label>
    </p>
    <?php
}

/**
 * 保存资源元数据
 */
function hank_handbook_save_resource_meta($post_id) {
    if (!isset($_POST['hank_handbook_resource_meta_nonce'])) {
        return;
    }

    if (!wp_verify_nonce($_POST['hank_handbook_resource_meta_nonce'], 'hank_handbook_save_resource_meta')) {
        return;
    }

    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }

    if (!current_user_can('edit_post', $post_id)) {
        return;
    }

    if (isset($_POST['resource_link'])) {
        update_post_meta($post_id, '_resource_link', esc_url_raw($_POST['resource_link']));
    }

    if (isset($_POST['resource_button_text'])) {
        update_post_meta($post_id, '_resource_button_text', sanitize_text_field($_POST['resource_button_text']));
    }

    $highlight = isset($_POST['resource_highlight']) ? '1' : '0';
    update_post_meta($post_id, '_resource_highlight', $highlight);
}
add_action('save_post_resource', 'hank_handbook_save_resource_meta');

/**
 * AJAX 加载更多文章
 */
function hank_handbook_load_more_posts() {
    $paged = isset($_POST['page']) ? intval($_POST['page']) : 1;
    
    $args = array(
        'post_type'      => 'post',
        'posts_per_page' => 6,
        'paged'          => $paged,
        'post_status'    => 'publish',
    );

    $query = new WP_Query($args);
    
    if ($query->have_posts()) {
        while ($query->have_posts()) {
            $query->the_post();
            get_template_part('template-parts/content', 'post-card');
        }
    }
    
    wp_reset_postdata();
    die();
}
add_action('wp_ajax_load_more_posts', 'hank_handbook_load_more_posts');
add_action('wp_ajax_nopriv_load_more_posts', 'hank_handbook_load_more_posts');

/**
 * 添加编辑器样式
 */
function hank_handbook_add_editor_styles() {
    add_editor_style('editor-style.css');
}
add_action('admin_init', 'hank_handbook_add_editor_styles');

