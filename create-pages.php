<?php
/**
 * WordPress 页面批量创建脚本
 * 在WordPress后台运行此脚本来创建所有需要的页面
 * 
 * 使用方法：
 * 1. 将此文件上传到WordPress根目录
 * 2. 访问：http://47.108.70.67/create-pages.php
 * 3. 运行完成后删除此文件
 */

// 确保在WordPress环境中运行
if (!defined('ABSPATH')) {
    // 加载WordPress环境
    require_once('wp-config.php');
    require_once('wp-load.php');
}

// 检查用户权限
if (!current_user_can('manage_options')) {
    die('权限不足，需要管理员权限');
}

// 页面配置数组
$pages = array(
    array(
        'title' => '运营知识库 VIP',
        'slug' => 'page-knowledge-base',
        'template' => 'page-knowledge-base.php',
        'content' => '运营知识库VIP页面，包含完整的运营体系内容。'
    ),
    array(
        'title' => '内容创作工具箱',
        'slug' => 'page-content-toolbox',
        'template' => 'page-content-toolbox.php',
        'content' => '内容创作工具箱页面，包含AI工具和文案模板。'
    ),
    array(
        'title' => '用户增长手册',
        'slug' => 'page-growth-handbook',
        'template' => 'page-growth-handbook.php',
        'content' => '用户增长手册页面，包含增长策略和案例。'
    ),
    array(
        'title' => '变现策略指南',
        'slug' => 'page-monetization-guide',
        'template' => 'page-monetization-guide.php',
        'content' => '变现策略指南页面，包含7种变现模式。'
    ),
    array(
        'title' => '数据分析工具',
        'slug' => 'page-data-analysis',
        'template' => 'page-data-analysis.php',
        'content' => '数据分析工具页面，包含模板和工具。'
    ),
    array(
        'title' => '运营案例库',
        'slug' => 'page-case-library',
        'template' => 'page-case-library.php',
        'content' => '运营案例库页面，包含100+成功案例。'
    ),
    array(
        'title' => '文章',
        'slug' => 'articles',
        'template' => 'articles.php',
        'content' => '文章列表页面，展示运营干货分享。'
    )
);

echo "<h1>WordPress 页面创建脚本</h1>";
echo "<p>正在创建页面...</p>";

$created_count = 0;
$updated_count = 0;

foreach ($pages as $page_data) {
    // 检查页面是否已存在
    $existing_page = get_page_by_path($page_data['slug']);
    
    if ($existing_page) {
        // 更新现有页面
        wp_update_post(array(
            'ID' => $existing_page->ID,
            'post_title' => $page_data['title'],
            'post_content' => $page_data['content'],
            'post_status' => 'publish',
            'post_type' => 'page'
        ));
        
        // 设置页面模板
        update_post_meta($existing_page->ID, '_wp_page_template', $page_data['template']);
        
        echo "<p>✅ 更新页面：{$page_data['title']}</p>";
        $updated_count++;
    } else {
        // 创建新页面
        $page_id = wp_insert_post(array(
            'post_title' => $page_data['title'],
            'post_name' => $page_data['slug'],
            'post_content' => $page_data['content'],
            'post_status' => 'publish',
            'post_type' => 'page',
            'post_author' => 1
        ));
        
        if ($page_id && !is_wp_error($page_id)) {
            // 设置页面模板
            update_post_meta($page_id, '_wp_page_template', $page_data['template']);
            
            echo "<p>✅ 创建页面：{$page_data['title']} (ID: {$page_id})</p>";
            $created_count++;
        } else {
            echo "<p>❌ 创建失败：{$page_data['title']}</p>";
        }
    }
}

// 更新固定链接规则
flush_rewrite_rules();

echo "<h2>创建完成！</h2>";
echo "<p>✅ 创建了 {$created_count} 个新页面</p>";
echo "<p>🔄 更新了 {$updated_count} 个现有页面</p>";
echo "<p>🔗 固定链接规则已刷新</p>";

echo "<h3>页面链接：</h3>";
foreach ($pages as $page_data) {
    $url = home_url('/' . $page_data['slug'] . '/');
    echo "<p><a href='{$url}' target='_blank'>{$page_data['title']}</a></p>";
}

echo "<h3>下一步：</h3>";
echo "<ol>";
echo "<li>进入 <a href='" . admin_url('nav-menus.php') . "' target='_blank'>外观 > 菜单</a> 更新导航</li>";
echo "<li>进入 <a href='" . admin_url('options-permalink.php') . "' target='_blank'>设置 > 固定链接</a> 检查设置</li>";
echo "<li>删除此脚本文件以确保安全</li>";
echo "</ol>";

echo "<p><strong>⚠️ 请记得删除此脚本文件！</strong></p>";
?>
