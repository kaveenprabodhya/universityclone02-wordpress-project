<?php
get_header();

pageBanner(array(
    'title' => 'Search Results',
    'subtitle' => 'You searched for &ldquo;' . esc_html(get_search_query()) . '&rdquo;'
))

?>

<div class="container container--narrow page-section">
    <?php
    if (have_posts()) {
        while (have_posts()) {
            the_post();
            get_template_part('common/content', get_post_type());
        }
    } else {
    ?>
    <h2 class="headline headline--medium">No results match that search.</h2>
    <?php
    }

    get_search_form();
    ?>
</div>


<?php get_footer(); ?>