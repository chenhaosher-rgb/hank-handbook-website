<?php
/**
 * 评论模板
 *
 * @package Hank_Handbook
 */

if (post_password_required()) {
    return;
}
?>

<div id="comments" class="comments-area">

    <?php if (have_comments()) : ?>
        <h2 class="comments-title">
            <?php
            $comments_number = get_comments_number();
            if ('1' === $comments_number) {
                printf(_x('1 条评论', 'comments title', 'hank-handbook'));
            } else {
                printf(
                    _nx(
                        '%1$s 条评论',
                        '%1$s 条评论',
                        $comments_number,
                        'comments title',
                        'hank-handbook'
                    ),
                    number_format_i18n($comments_number)
                );
            }
            ?>
        </h2>

        <ol class="comment-list">
            <?php
            wp_list_comments(array(
                'style'       => 'ol',
                'short_ping'  => true,
                'avatar_size' => 50,
            ));
            ?>
        </ol>

        <?php
        the_comments_navigation(array(
            'prev_text' => '← 较早评论',
            'next_text' => '较新评论 →',
        ));
        ?>

    <?php endif; ?>

    <?php if (!comments_open() && get_comments_number() && post_type_supports(get_post_type(), 'comments')) : ?>
        <p class="no-comments">评论已关闭。</p>
    <?php endif; ?>

    <?php
    comment_form(array(
        'title_reply'        => '发表评论',
        'title_reply_before' => '<h3 id="reply-title" class="comment-reply-title">',
        'title_reply_after'  => '</h3>',
        'label_submit'       => '提交评论',
        'comment_field'      => '<p class="comment-form-comment"><label for="comment">评论内容 <span class="required">*</span></label><textarea id="comment" name="comment" cols="45" rows="8" maxlength="65525" required></textarea></p>',
        'fields'             => array(
            'author' => '<p class="comment-form-author"><label for="author">姓名 <span class="required">*</span></label><input id="author" name="author" type="text" value="' . esc_attr($commenter['comment_author']) . '" size="30" maxlength="245" required /></p>',
            'email'  => '<p class="comment-form-email"><label for="email">邮箱 <span class="required">*</span></label><input id="email" name="email" type="email" value="' . esc_attr($commenter['comment_author_email']) . '" size="30" maxlength="100" aria-describedby="email-notes" required /></p>',
            'url'    => '<p class="comment-form-url"><label for="url">网站</label><input id="url" name="url" type="url" value="' . esc_attr($commenter['comment_author_url']) . '" size="30" maxlength="200" /></p>',
        ),
    ));
    ?>

</div>

<style>
.comments-area {
    margin-top: var(--spacing-lg);
    padding-top: var(--spacing-lg);
    border-top: 1px solid var(--color-border);
}

.comments-title {
    font-size: 1.5rem;
    margin-bottom: var(--spacing-md);
}

.comment-list {
    list-style: none;
    margin: 0;
    padding: 0;
}

.comment-list .comment {
    margin-bottom: var(--spacing-md);
    padding: var(--spacing-md);
    background-color: var(--color-accent);
    border-radius: var(--border-radius);
}

.comment-list .children {
    list-style: none;
    margin-left: var(--spacing-lg);
    margin-top: var(--spacing-md);
}

.comment-author {
    font-weight: 600;
    margin-bottom: var(--spacing-xs);
}

.comment-author img {
    border-radius: 50%;
    margin-right: var(--spacing-xs);
    vertical-align: middle;
}

.comment-metadata {
    font-size: 0.9rem;
    color: var(--color-text-light);
    margin-bottom: var(--spacing-sm);
}

.comment-metadata a {
    color: var(--color-text-light);
}

.comment-content {
    line-height: 1.7;
}

.comment-content p:last-child {
    margin-bottom: 0;
}

.reply {
    margin-top: var(--spacing-sm);
}

.reply a {
    font-size: 0.9rem;
    font-weight: 600;
}

.comment-form {
    margin-top: var(--spacing-lg);
}

.comment-form p {
    margin-bottom: var(--spacing-sm);
}

.comment-form label {
    display: block;
    font-weight: 600;
    margin-bottom: var(--spacing-xs);
}

.comment-form input[type="text"],
.comment-form input[type="email"],
.comment-form input[type="url"],
.comment-form textarea {
    width: 100%;
    padding: var(--spacing-sm);
    border: 2px solid var(--color-border);
    border-radius: var(--border-radius);
    font-family: var(--font-primary);
    font-size: 1rem;
}

.comment-form input[type="text"]:focus,
.comment-form input[type="email"]:focus,
.comment-form input[type="url"]:focus,
.comment-form textarea:focus {
    outline: none;
    border-color: var(--color-primary);
}

.comment-form .form-submit {
    margin-top: var(--spacing-md);
}

.comment-form .submit {
    padding: var(--spacing-sm) var(--spacing-lg);
    background-color: var(--color-primary);
    color: var(--color-secondary);
    border: none;
    border-radius: var(--border-radius);
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: var(--transition);
}

.comment-form .submit:hover {
    opacity: 0.85;
    transform: translateY(-2px);
}

.no-comments {
    padding: var(--spacing-md);
    background-color: var(--color-accent);
    border-radius: var(--border-radius);
    text-align: center;
    color: var(--color-text-light);
}

.required {
    color: #dc3545;
}
</style>

