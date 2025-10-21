    <!-- 页脚已删除 -->

</div><!-- #page -->

<!-- 悬浮联系按钮 -->
<div class="floating-contact-btn" onclick="openContactModal()">
    <svg class="contact-icon" viewBox="0 0 24 24" width="24" height="24">
        <path fill="currentColor" d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
    </svg>
    <span class="contact-text">联系我</span>
</div>

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

