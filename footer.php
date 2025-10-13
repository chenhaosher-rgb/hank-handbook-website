    <footer class="site-footer">
        <div class="container">
            <div class="footer-content">
                <?php if (is_active_sidebar('footer-1')) : ?>
                    <div class="footer-section">
                        <?php dynamic_sidebar('footer-1'); ?>
                    </div>
                <?php else : ?>
                    <div class="footer-section">
                        <h4>关于我</h4>
                        <p>我是 <?php bloginfo('name'); ?>，专注于分享关于个人成长、生活方式设计和数字创业的深度内容。</p>
                        
                        <div class="social-links">
                            <?php
                            $socials = array(
                                'twitter'   => get_theme_mod('social_twitter', ''),
                                'youtube'   => get_theme_mod('social_youtube', ''),
                                'linkedin'  => get_theme_mod('social_linkedin', ''),
                                'instagram' => get_theme_mod('social_instagram', ''),
                            );

                            foreach ($socials as $platform => $url) :
                                if ($url) :
                                    ?>
                                    <a href="<?php echo esc_url($url); ?>" target="_blank" rel="noopener noreferrer" aria-label="<?php echo esc_attr(ucfirst($platform)); ?>">
                                        <?php echo strtoupper(substr($platform, 0, 2)); ?>
                                    </a>
                                    <?php
                                endif;
                            endforeach;
                            ?>
                        </div>
                    </div>
                <?php endif; ?>

                <?php if (is_active_sidebar('footer-2')) : ?>
                    <div class="footer-section">
                        <?php dynamic_sidebar('footer-2'); ?>
                    </div>
                <?php else : ?>
                    <div class="footer-section">
                        <h4>快速链接</h4>
                        <?php
                        wp_nav_menu(array(
                            'theme_location' => 'footer',
                            'menu_class'     => 'footer-menu',
                            'container'      => false,
                            'fallback_cb'    => function() {
                                echo '<ul>';
                                echo '<li><a href="' . esc_url(home_url('/')) . '">首页</a></li>';
                                echo '<li><a href="' . esc_url(home_url('/blog')) . '">博客</a></li>';
                                echo '<li><a href="' . esc_url(home_url('/resources')) . '">资源</a></li>';
                                echo '<li><a href="' . esc_url(home_url('/about')) . '">关于</a></li>';
                                echo '<li><a href="' . esc_url(home_url('/contact')) . '">联系</a></li>';
                                echo '</ul>';
                            },
                        ));
                        ?>
                    </div>
                <?php endif; ?>

                <?php if (is_active_sidebar('footer-3')) : ?>
                    <div class="footer-section">
                        <?php dynamic_sidebar('footer-3'); ?>
                    </div>
                <?php else : ?>
                    <div class="footer-section">
                        <h4>订阅我的内容</h4>
                        <p>每周获取 2 封免费信件，深入探讨思维、互联网和未来。</p>
                        <form class="email-signup-form" style="margin-top: var(--spacing-md);" method="post" action="">
                            <input type="email" name="subscriber_email" placeholder="输入您的邮箱" required>
                            <button type="submit">订阅</button>
                        </form>
                    </div>
                <?php endif; ?>
            </div>

            <div class="footer-bottom">
                <p>&copy; <?php echo date('Y'); ?> <?php bloginfo('name'); ?>. 保留所有权利.</p>
            </div>
        </div>
    </footer>

</div><!-- #page -->

<!-- Contact Modal -->
<div id="contactModal" class="modal">
    <div class="modal-content">
        <span class="close" onclick="closeContactModal()">&times;</span>
        <h3>扫码添加微信</h3>
        <div class="qr-code-container">
            <img src="<?php echo get_template_directory_uri(); ?>/wechat-qr.png" alt="微信二维码" class="qr-code">
            <p class="qr-text">扫描二维码添加我的微信</p>
            <p class="qr-hint">备注：运营知识库</p>
        </div>
    </div>
</div>

<?php wp_footer(); ?>

<script>
// 移动菜单切换
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const siteNavigation = document.getElementById('site-navigation');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            siteNavigation.classList.toggle('active');
        });
    }
});

// 联系我弹窗功能
function openContactModal() {
    document.getElementById('contactModal').style.display = 'block';
    document.body.style.overflow = 'hidden'; // 禁止背景滚动
}

function closeContactModal() {
    document.getElementById('contactModal').style.display = 'none';
    document.body.style.overflow = 'auto'; // 恢复背景滚动
}

// 点击模态框外部关闭
window.onclick = function(event) {
    const modal = document.getElementById('contactModal');
    if (event.target === modal) {
        closeContactModal();
    }
}

// ESC 键关闭模态框
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeContactModal();
    }
});

// 搜索表单事件监听
document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.getElementById('operations-search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleSearch();
        });
    }
});
</script>

</body>
</html>

