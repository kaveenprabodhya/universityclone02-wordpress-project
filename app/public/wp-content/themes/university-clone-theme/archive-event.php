<?php
get_header();

pageBanner(array(
    'title' => 'All Events',
    'subtitle' => 'See what is going on our world.'
));

?>

<div class="container container--narrow page-section">
    <?php
    while (have_posts()) {
        the_post();
        get_template_part('common/content-event');
    ?>
    <?php
    }

    echo paginate_links();

    ?>
    <hr class="section-break">

    <p>
        Looking for a recap of past events? Checkout our&nbsp;<a href="<?php echo site_url('/past-events') ?>">past
            events</a>&nbsp;archive.
    </p>
</div>




<?php get_footer(); ?>