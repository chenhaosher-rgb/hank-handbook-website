<?php
/**
 * 微信登录按钮组件
 *
 * @package Hank_Handbook
 */

// 获取微信登录实例
$wechat = $GLOBALS['hank_wechat_login'];

if (!is_user_logged_in()) {
    // 未登录，显示登录按钮
    $login_url = $wechat->getWebLoginURL();
    ?>
    <div class="wechat-login-container">
        <a href="<?php echo esc_url($login_url); ?>" class="wechat-login-btn">
            <svg class="wechat-icon" viewBox="0 0 24 24" width="20" height="20">
                <path fill="currentColor" d="M8.5 10C7.67 10 7 9.33 7 8.5S7.67 7 8.5 7 10 7.67 10 8.5 9.33 10 8.5 10M15.5 10C14.67 10 14 9.33 14 8.5S14.67 7 15.5 7 17 7.67 17 8.5 16.33 10 15.5 10M12 2C6.5 2 2 6.5 2 12C2 13.72 2.5 15.32 3.35 16.71L2 22L7.29 20.65C8.68 21.5 10.28 22 12 22C17.5 22 22 17.5 22 12S17.5 2 12 2M12 20C10.59 20 9.24 19.68 8.03 19.11L6.09 19.75L6.73 17.81C6.16 16.6 5.84 15.25 5.84 13.84C5.84 9.92 8.92 6.84 12.84 6.84C16.76 6.84 19.84 9.92 19.84 13.84C19.84 17.76 16.76 20.84 12.84 20.84"/>
            </svg>
            <span>微信登录</span>
        </a>
    </div>
    
    <style>
    .wechat-login-container {
        display: inline-block;
    }
    
    .wechat-login-btn {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 10px 20px;
        background-color: #07C160;
        color: white;
        text-decoration: none;
        border-radius: 6px;
        font-weight: 500;
        transition: all 0.3s ease;
    }
    
    .wechat-login-btn:hover {
        background-color: #06AD56;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(7, 193, 96, 0.3);
    }
    
    .wechat-icon {
        flex-shrink: 0;
    }
    </style>
    <?php
} else {
    // 已登录，显示用户信息
    $current_user = wp_get_current_user();
    $user_id = $current_user->ID;
    $nickname = get_user_meta($user_id, 'wechat_nickname', true);
    $avatar = get_user_meta($user_id, 'wechat_avatar', true);
    
    if (!$nickname) {
        $nickname = $current_user->display_name;
    }
    ?>
    <div class="user-info-container">
        <div class="user-dropdown">
            <button class="user-btn" onclick="toggleUserMenu()">
                <?php if ($avatar) : ?>
                    <img src="<?php echo esc_url($avatar); ?>" alt="<?php echo esc_attr($nickname); ?>" class="user-avatar">
                <?php else : ?>
                    <div class="user-avatar-placeholder">
                        <?php echo esc_html(mb_substr($nickname, 0, 1)); ?>
                    </div>
                <?php endif; ?>
                <span class="user-nickname"><?php echo esc_html($nickname); ?></span>
                <svg class="dropdown-icon" viewBox="0 0 24 24" width="16" height="16">
                    <path fill="currentColor" d="M7 10l5 5 5-5z"/>
                </svg>
            </button>
            
            <div class="user-menu" id="userMenu">
                <a href="<?php echo esc_url(get_author_posts_url($user_id)); ?>" class="menu-item">
                    <span>我的主页</span>
                </a>
                <a href="<?php echo esc_url(admin_url('profile.php')); ?>" class="menu-item">
                    <span>个人设置</span>
                </a>
                <div class="menu-divider"></div>
                <a href="<?php echo esc_url(wp_logout_url(home_url())); ?>" class="menu-item">
                    <span>退出登录</span>
                </a>
            </div>
        </div>
    </div>
    
    <style>
    .user-info-container {
        position: relative;
    }
    
    .user-btn {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 6px 12px;
        background-color: white;
        border: 1px solid #e5e5e5;
        border-radius: 6px;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .user-btn:hover {
        border-color: var(--color-primary);
        box-shadow: 0 2px 8px rgba(220, 38, 38, 0.1);
    }
    
    .user-avatar {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        object-fit: cover;
    }
    
    .user-avatar-placeholder {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background-color: var(--color-primary);
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 600;
    }
    
    .user-nickname {
        font-weight: 500;
        color: var(--color-text);
    }
    
    .dropdown-icon {
        transition: transform 0.3s ease;
    }
    
    .user-dropdown.active .dropdown-icon {
        transform: rotate(180deg);
    }
    
    .user-menu {
        position: absolute;
        top: calc(100% + 8px);
        right: 0;
        min-width: 200px;
        background-color: white;
        border: 1px solid #e5e5e5;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        opacity: 0;
        visibility: hidden;
        transform: translateY(-10px);
        transition: all 0.3s ease;
        z-index: 1000;
    }
    
    .user-dropdown.active .user-menu {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
    }
    
    .menu-item {
        display: block;
        padding: 12px 16px;
        color: var(--color-text);
        text-decoration: none;
        transition: background-color 0.2s ease;
    }
    
    .menu-item:hover {
        background-color: #f5f5f5;
    }
    
    .menu-divider {
        height: 1px;
        background-color: #e5e5e5;
        margin: 8px 0;
    }
    </style>
    
    <script>
    function toggleUserMenu() {
        const dropdown = document.querySelector('.user-dropdown');
        dropdown.classList.toggle('active');
    }
    
    // 点击外部关闭菜单
    document.addEventListener('click', function(event) {
        const userDropdown = document.querySelector('.user-dropdown');
        const userBtn = document.querySelector('.user-btn');
        
        if (userDropdown && !userBtn.contains(event.target)) {
            userDropdown.classList.remove('active');
        }
    });
    </script>
    <?php
}
?>
