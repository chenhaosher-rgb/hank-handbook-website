<?php
/**
 * 侧边栏模板
 *
 * @package Hank_Handbook
 */

if (!is_active_sidebar('sidebar-1')) {
    return;
}
?>

<aside id="secondary" class="widget-area sidebar">
    <?php dynamic_sidebar('sidebar-1'); ?>
</aside>

<style>
.sidebar {
    padding: var(--spacing-md);
}

.sidebar .widget {
    margin-bottom: var(--spacing-lg);
    padding: var(--spacing-md);
    background-color: var(--color-accent);
    border-radius: var(--border-radius);
}

.sidebar .widget:last-child {
    margin-bottom: 0;
}

.sidebar .widget-title {
    font-size: 1.25rem;
    margin-bottom: var(--spacing-sm);
    padding-bottom: var(--spacing-xs);
    border-bottom: 2px solid var(--color-border);
}

.sidebar ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.sidebar li {
    margin-bottom: var(--spacing-xs);
    padding-bottom: var(--spacing-xs);
    border-bottom: 1px solid var(--color-border);
}

.sidebar li:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: none;
}

.sidebar a {
    color: var(--color-text);
    transition: var(--transition);
}

.sidebar a:hover {
    color: var(--color-primary);
}

@media (max-width: 768px) {
    .sidebar {
        margin-top: var(--spacing-lg);
    }
}
</style>

