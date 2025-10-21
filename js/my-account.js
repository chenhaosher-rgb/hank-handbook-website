/**
 * 我的（个人中心）页面同步脚本
 * 
 * @package Hank_Handbook
 */

(function($) {
    'use strict';

    // 检查是否在"我的"页面
    var $packagesRoot = $('#packages-list');
    var $historyRoot = $('#history-list');
    
    if (!$packagesRoot.length && !$historyRoot.length) {
        return; // 不在"我的"页面，直接返回
    }

    var isLoggedIn = $packagesRoot.data('logged-in') == 1 || $historyRoot.data('logged-in') == 1;
    
    if (!isLoggedIn) {
        // 未登录状态
        if ($packagesRoot.length) {
            $packagesRoot.html('<div class="empty" style="color:#999;text-align:center;padding:40px 0;">请先登录后查看</div>');
        }
        if ($historyRoot.length) {
            $historyRoot.html('<div class="empty" style="color:#999;text-align:center;padding:40px 0;">请先登录后查看</div>');
        }
        return;
    }

    // API 请求封装
    function apiGet(path) {
        return fetch('/wp-json/hank-wechat/v1' + path, { 
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function(res) { 
            return res.json(); 
        }).catch(function(err) {
            console.error('API请求失败:', err);
            return { success: false, error: err.message };
        });
    }

    // 渲染资料包列表
    function renderPackages(list) {
        if (!$packagesRoot.length) return;
        
        if (!list || list.length === 0) {
            $packagesRoot.html('<div class="empty" style="color:#999;text-align:center;padding:40px 0;">暂无资料包<br><small style="font-size:14px;margin-top:8px;display:block;">搜索并下载资料包后会在这里显示</small></div>');
            return;
        }
        
        var html = '<div class="packages-grid" style="display:flex;flex-direction:column;gap:16px;">';
        
        list.forEach(function(item) {
            var tags = (item.tags || []).map(function(t) {
                return '<span class="tag" style="display:inline-block;padding:4px 12px;background:#f5f5f5;color:#666;border-radius:12px;margin-right:8px;font-size:12px;">' + escapeHtml(t) + '</span>';
            }).join('');
            
            html += '<div class="package-item" style="background:#f8f9fa;border-radius:12px;padding:20px;transition:all 0.3s ease;">';
            html += '<div class="package-header" style="display:flex;align-items:center;gap:16px;margin-bottom:12px;">';
            html += '<div class="package-icon" style="font-size:32px;">' + (item.icon || '📦') + '</div>';
            html += '<div class="package-info" style="flex:1;">';
            html += '<div class="package-title" style="font-weight:600;font-size:16px;margin-bottom:4px;">' + escapeHtml(item.title || '资料包') + '</div>';
            html += '<div class="package-time" style="color:#999;font-size:13px;">' + escapeHtml(item.downloadTime || '') + '</div>';
            html += '</div></div>';
            
            if (item.description) {
                html += '<div class="package-desc" style="color:#666;font-size:14px;line-height:1.6;margin-bottom:12px;">' + escapeHtml(item.description) + '</div>';
            }
            
            html += '<div class="package-tags">' + tags + '</div>';
            html += '</div>';
        });
        
        html += '</div>';
        $packagesRoot.html(html);
    }

    // 渲染搜索记录列表
    function renderHistory(list) {
        if (!$historyRoot.length) return;
        
        if (!list || list.length === 0) {
            $historyRoot.html('<div class="empty" style="color:#999;text-align:center;padding:40px 0;">暂无搜索记录<br><small style="font-size:14px;margin-top:8px;display:block;">搜索运营问题后会在这里显示</small></div>');
            return;
        }
        
        var html = '<div class="history-list" style="display:flex;flex-direction:column;gap:12px;">';
        
        list.forEach(function(item) {
            html += '<div class="history-item" style="background:#f8f9fa;border-radius:12px;padding:16px;display:flex;justify-content:space-between;align-items:center;gap:16px;transition:all 0.3s ease;cursor:pointer;" onclick="window.location.href=\'/search?q=' + encodeURIComponent(item.keyword || '') + '\'">';
            html += '<div class="history-main" style="flex:1;min-width:0;">';
            html += '<div class="history-keyword" style="font-weight:600;font-size:16px;margin-bottom:6px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">🔍 ' + escapeHtml(item.keyword || '') + '</div>';
            html += '<div class="history-meta" style="color:#999;font-size:13px;">';
            html += '<span>' + escapeHtml(item.searchTime || '') + '</span>';
            html += '<span style="margin:0 8px;">·</span>';
            html += '<span>' + (item.resultCount || 0) + ' 个结果</span>';
            html += '</div></div>';
            html += '<div class="history-action" style="color:#dc2626;font-size:20px;">›</div>';
            html += '</div>';
        });
        
        html += '</div>';
        $historyRoot.html(html);
    }

    // HTML 转义函数
    function escapeHtml(text) {
        var div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // 加载数据
    console.log('开始加载个人中心数据...');
    
    if ($packagesRoot.length) {
        $packagesRoot.html('<div style="color:#999;text-align:center;padding:40px 0;">加载中...</div>');
        apiGet('/packages').then(function(res) {
            console.log('资料包数据:', res);
            if (res && res.success) {
                renderPackages(res.packages || []);
            } else {
                renderPackages([]);
            }
        });
    }
    
    if ($historyRoot.length) {
        $historyRoot.html('<div style="color:#999;text-align:center;padding:40px 0;">加载中...</div>');
        apiGet('/search-history').then(function(res) {
            console.log('搜索记录数据:', res);
            if (res && res.success) {
                renderHistory(res.history || []);
            } else {
                renderHistory([]);
            }
        });
    }

})(jQuery);
