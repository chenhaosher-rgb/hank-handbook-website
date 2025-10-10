/**
 * 主题 JavaScript 功能
 *
 * @package Hank_Handbook
 */

(function($) {
    'use strict';

    // 移动菜单切换
    function initMobileMenu() {
        const mobileMenuToggle = $('#mobile-menu-toggle');
        const siteNavigation = $('#site-navigation');
        
        mobileMenuToggle.on('click', function() {
            const isExpanded = $(this).attr('aria-expanded') === 'true';
            $(this).attr('aria-expanded', !isExpanded);
            siteNavigation.toggleClass('active');
        });
    }

    // AJAX 加载更多文章
    function initLoadMore() {
        const loadMoreBtn = $('#load-more');
        
        if (!loadMoreBtn.length) {
            return;
        }

        loadMoreBtn.on('click', function(e) {
            e.preventDefault();
            
            const button = $(this);
            const currentPage = parseInt(button.data('page'));
            const maxPages = parseInt(button.data('max'));
            const nextPage = currentPage + 1;
            
            // 显示加载状态
            button.text('加载中...').prop('disabled', true);
            
            $.ajax({
                url: wpAjaxUrl || '/wp-admin/admin-ajax.php',
                type: 'POST',
                data: {
                    action: 'load_more_posts',
                    page: nextPage
                },
                success: function(response) {
                    if (response) {
                        $('#posts-container').append(response);
                        button.data('page', nextPage);
                        button.text('加载更多').prop('disabled', false);
                        
                        // 如果已经是最后一页，隐藏按钮
                        if (nextPage >= maxPages) {
                            button.fadeOut();
                        }
                    } else {
                        button.fadeOut();
                    }
                },
                error: function() {
                    button.text('加载失败，请重试').prop('disabled', false);
                }
            });
        });
    }

    // 平滑滚动
    function initSmoothScroll() {
        $('a[href*="#"]').not('[href="#"]').not('[href="#0"]').on('click', function(event) {
            if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && 
                location.hostname === this.hostname) {
                
                let target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                
                if (target.length) {
                    event.preventDefault();
                    $('html, body').animate({
                        scrollTop: target.offset().top - 100
                    }, 800);
                }
            }
        });
    }

    // 粘性头部
    function initStickyHeader() {
        const header = $('.site-header');
        const headerOffset = header.offset().top;
        
        $(window).on('scroll', function() {
            if ($(window).scrollTop() > headerOffset) {
                header.addClass('sticky');
            } else {
                header.removeClass('sticky');
            }
        });
    }

    // 邮件订阅表单处理
    function initEmailSignup() {
        $('.email-signup-form').on('submit', function(e) {
            e.preventDefault();
            
            const form = $(this);
            const email = form.find('input[type="email"]').val();
            const button = form.find('button[type="submit"]');
            const originalText = button.text();
            
            // 这里可以集成您的邮件服务提供商 API
            // 例如：Mailchimp, ConvertKit, etc.
            
            button.text('提交中...').prop('disabled', true);
            
            // 示例：使用 AJAX 提交到自定义端点
            $.ajax({
                url: wpAjaxUrl || '/wp-admin/admin-ajax.php',
                type: 'POST',
                data: {
                    action: 'newsletter_signup',
                    email: email
                },
                success: function(response) {
                    alert('感谢订阅！');
                    form.find('input[type="email"]').val('');
                    button.text(originalText).prop('disabled', false);
                },
                error: function() {
                    alert('订阅失败，请重试。');
                    button.text(originalText).prop('disabled', false);
                }
            });
        });
    }

    // 图片懒加载
    function initLazyLoad() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver(function(entries, observer) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.classList.remove('lazy');
                            imageObserver.unobserve(img);
                        }
                    }
                });
            });

            document.querySelectorAll('img.lazy').forEach(function(img) {
                imageObserver.observe(img);
            });
        }
    }

    // 文档加载完成后初始化
    $(document).ready(function() {
        initMobileMenu();
        initLoadMore();
        initSmoothScroll();
        initEmailSignup();
        initLazyLoad();
        // initStickyHeader(); // 可选：如果需要粘性头部
    });

})(jQuery);

