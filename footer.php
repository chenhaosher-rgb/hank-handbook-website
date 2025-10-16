    <!-- 页脚已删除 -->

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

