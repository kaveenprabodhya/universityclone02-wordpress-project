<?php
get_header();

pageBanner(array(
    'title' => 'Our Campuses',
    'subtitle' => 'See all campus we have located conveniently.'
));

?>

<div class="container container--narrow page-section">
    <ul class="link-list min-list">
        <?php
        while (have_posts()) {
            the_post();
            $mapLocation = get_field('map_location');
        ?>
        <div class="marker" data-lat="<?php echo $mapLocation['lat'] ?>" data-lng="<?php echo $mapLocation['lng'] ?>">
        </div>
        <li><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></li>
        <?php
        }
        ?>
    </ul>
</div>

<?php get_footer(); ?>