<?php
/**
 * 资源详情页面模板
 * Template Name: 资源详情
 *
 * @package Hank_Handbook
 */

get_header();

// 获取资源 ID
$resource_id = isset($_GET['id']) ? intval($_GET['id']) : 1;

// 默认资源数据
$default_resources = array(
    1 => array(
        'title' => '运营知识库 VIP',
        'description' => '完整的运营体系和实战经验，从零到一的运营系统，包含内容创作、用户增长、变现策略。',
        'category' => '运营体系',
        'size' => '25MB',
        'downloads' => '1234',
        'price' => '免费',
        'features' => array(
            '完整的运营方法论',
            '30+ 实战案例',
            '可复制的操作模板',
            '持续更新内容'
        ),
        'download_url' => '#',
        'preview_url' => '#'
    ),
    2 => array(
        'title' => '内容创作工具箱',
        'description' => 'AI 内容生成工具包，包含文案模板、选题策略、爆款内容公式，让你的内容创作事半功倍。',
        'category' => '内容创作',
        'size' => '15MB',
        'downloads' => '856',
        'price' => '免费',
        'features' => array(
            '50+ 文案模板',
            '爆款标题公式',
            '选题策略指南',
            'AI 工具推荐'
        ),
        'download_url' => '#',
        'preview_url' => '#'
    ),
    3 => array(
        'title' => '用户增长手册',
        'description' => '从 0 到 10 万粉丝的完整增长策略，包含引流、留存、变现全链路，助你快速积累用户。',
        'category' => '用户增长',
        'size' => '20MB',
        'downloads' => '2341',
        'price' => '免费',
        'features' => array(
            '增长黑客方法论',
            '获客渠道分析',
            '用户留存策略',
            '增长工具推荐'
        ),
        'download_url' => '#',
        'preview_url' => '#'
    ),
    4 => array(
        'title' => '变现策略指南',
        'description' => '7 种主流变现方式详解，从知识付费到电商带货，找到适合你的搞钱路径，实现财务自由。',
        'category' => '变现策略',
        'size' => '18MB',
        'downloads' => '1567',
        'price' => '免费',
        'features' => array(
            '7 种变现模式',
            '收入结构设计',
            '定价策略指南',
            '成功案例分析'
        ),
        'download_url' => '#',
        'preview_url' => '#'
    ),
    5 => array(
        'title' => '数据分析工具',
        'description' => '运营必备的数据分析模板和工具，让数据驱动你的运营决策，提升运营效率和效果。',
        'category' => '数据分析',
        'size' => '12MB',
        'downloads' => '982',
        'price' => '免费',
        'features' => array(
            '数据分析模板',
            '关键指标监控',
            '数据可视化工具',
            '运营报表模板'
        ),
        'download_url' => '#',
        'preview_url' => '#'
    ),
    6 => array(
        'title' => '运营案例库',
        'description' => '100+ 成功运营案例拆解，学习大厂和网红们的运营秘籍，快速提升运营能力。',
        'category' => '案例研究',
        'size' => '35MB',
        'downloads' => '1876',
        'price' => '免费',
        'features' => array(
            '100+ 真实案例',
            '案例拆解分析',
            '运营策略总结',
            '可复制的经验'
        ),
        'download_url' => '#',
        'preview_url' => '#'
    )
);

$resource = isset($default_resources[$resource_id]) ? $default_resources[$resource_id] : $default_resources[1];
?>

<main id="primary" class="site-main">
    
    <!-- 资源详情头部 -->
    <section class="resource-header">
        <div class="container">
            <div class="resource-breadcrumb">
                <a href="<?php echo home_url(); ?>">首页</a> > 
                <a href="<?php echo home_url(); ?>/resources">资源库</a> > 
                <span><?php echo esc_html($resource['title']); ?></span>
            </div>
            
            <div class="resource-info">
                <div class="resource-main">
                    <div class="resource-category"><?php echo esc_html($resource['category']); ?></div>
                    <h1 class="resource-title"><?php echo esc_html($resource['title']); ?></h1>
                    <p class="resource-description"><?php echo esc_html($resource['description']); ?></p>
                    
                    <div class="resource-meta">
                        <div class="meta-item">
                            <span class="meta-label">文件大小：</span>
                            <span class="meta-value"><?php echo esc_html($resource['size']); ?></span>
                        </div>
                        <div class="meta-item">
                            <span class="meta-label">下载次数：</span>
                            <span class="meta-value"><?php echo esc_html($resource['downloads']); ?></span>
                        </div>
                        <div class="meta-item">
                            <span class="meta-label">价格：</span>
                            <span class="meta-value price"><?php echo esc_html($resource['price']); ?></span>
                        </div>
                    </div>
                    
                    <div class="resource-actions">
                        <a href="<?php echo esc_url($resource['download_url']); ?>" class="btn btn-primary">
                            <span>📥 立即下载</span>
                        </a>
                        <a href="<?php echo esc_url($resource['preview_url']); ?>" class="btn btn-outline">
                            <span>👁️ 预览内容</span>
                        </a>
                    </div>
                </div>
                
                <div class="resource-image">
                    <div class="resource-placeholder">
                        📦
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- 资源特色 -->
    <section class="resource-features">
        <div class="container">
            <h2 class="section-title">资源特色</h2>
            <div class="features-grid">
                <?php foreach ($resource['features'] as $feature) : ?>
                    <div class="feature-item">
                        <div class="feature-icon">✅</div>
                        <div class="feature-text"><?php echo esc_html($feature); ?></div>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
    </section>

    <!-- 相关资源 -->
    <section class="related-resources">
        <div class="container">
            <h2 class="section-title">相关资源</h2>
            <div class="resources-grid">
                <?php 
                $related_resources = array_filter($default_resources, function($key) use ($resource_id) {
                    return $key != $resource_id;
                }, ARRAY_FILTER_USE_KEY);
                
                $count = 0;
                foreach ($related_resources as $id => $related) :
                    if ($count >= 3) break;
                    ?>
                    <div class="resource-card">
                        <div class="resource-card-image">
                            <div class="resource-placeholder">📦</div>
                            <div class="resource-category"><?php echo esc_html($related['category']); ?></div>
                        </div>
                        
                        <div class="resource-card-content">
                            <h3 class="resource-card-title">
                                <a href="?id=<?php echo $id; ?>"><?php echo esc_html($related['title']); ?></a>
                            </h3>
                            <p class="resource-card-description"><?php echo esc_html(wp_trim_words($related['description'], 15, '...')); ?></p>
                            
                            <div class="resource-card-meta">
                                <span class="downloads"><?php echo esc_html($related['downloads']); ?> 次下载</span>
                                <span class="size"><?php echo esc_html($related['size']); ?></span>
                            </div>
                        </div>
                    </div>
                    <?php
                    $count++;
                endforeach;
                ?>
            </div>
        </div>
    </section>
</main>

<?php
get_footer();
?>
