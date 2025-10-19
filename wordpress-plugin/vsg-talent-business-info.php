<?php
/**
 * Plugin Name: VSG Talent Business Info
 * Plugin URI: https://vsgtalent.nl
 * Description: Provides business information REST API endpoint for VSG Talent platform
 * Version: 1.0.0
 * Author: VSG Talent
 * Author URI: https://vsgtalent.nl
 * License: GPL v2 or later
 * Text Domain: vsg-talent
 */

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Register REST API endpoint for business info
 */
add_action('rest_api_init', function () {
    register_rest_route('levy/v1', '/business-info', array(
        'methods' => 'GET',
        'callback' => 'vsg_get_business_info',
        'permission_callback' => '__return_true'
    ));
});

/**
 * Get business information
 * Returns VSG Talent / VSG Dakwerken business data
 */
function vsg_get_business_info() {
    return array(
        'organizationName' => get_option('vsg_org_name', 'VSG Talent'),
        'legalName' => get_option('vsg_legal_name', 'VSG Dakwerken B.V.'),
        'description' => get_option('vsg_description', 'VSG Talent ondersteunt veelbelovende sporters in Nederland. Altijd 100%, in weer en wind. Een initiatief van VSG Dakwerken.'),
        'address' => array(
            'street' => get_option('vsg_street', 'Söderblomstraat'),
            'houseNumber' => get_option('vsg_house_number', '181'),
            'postalCode' => get_option('vsg_postal_code', '2131 GE'),
            'city' => get_option('vsg_city', 'Hoofddorp'),
            'province' => get_option('vsg_province', 'Noord-Holland'),
            'country' => get_option('vsg_country', 'Nederland'),
        ),
        'coordinates' => array(
            'latitude' => floatval(get_option('vsg_latitude', 52.30338852113304)),
            'longitude' => floatval(get_option('vsg_longitude', 4.671270639907734)),
        ),
        'phone' => get_option('vsg_phone', '+31 6 51664731'),
        'email' => get_option('vsg_email', 'info@vsgdakwerken.nl'),
        'kvk' => get_option('vsg_kvk', ''),
        'btw' => get_option('vsg_btw', ''),
        'socialMedia' => array(
            'instagram' => get_option('vsg_instagram', 'https://www.instagram.com/vsgdakwerken.nl/'),
            'facebook' => get_option('vsg_facebook', ''),
            'linkedin' => get_option('vsg_linkedin', 'https://www.linkedin.com/company/vsg-dakwerken/'),
            'youtube' => get_option('vsg_youtube', ''),
            'tiktok' => get_option('vsg_tiktok', ''),
            'twitter' => get_option('vsg_twitter', ''),
        ),
        'contacts' => vsg_get_contacts(),
        'openingHours' => vsg_get_opening_hours(),
        'founded' => get_option('vsg_founded', '2010'),
        'logo' => get_option('vsg_logo', ''),
    );
}

/**
 * Get contact persons
 */
function vsg_get_contacts() {
    $contacts_json = get_option('vsg_contacts', '');
    
    // If no custom contacts, return default VSG Dakwerken contacts
    if (empty($contacts_json)) {
        return array(
            array(
                'name' => 'Stephan van Opbergen',
                'role' => 'Mede-eigenaar en Verkoop / Administratie',
                'email' => 'stephan@vsgdakwerken.nl',
                'phone' => '+31 6 51664731',
                'linkedin' => '',
            ),
            array(
                'name' => 'Mustafa Guner',
                'role' => 'Mede-eigenaar en Project Leider',
                'email' => 'mustafa@vsgdakwerken.nl',
                'phone' => '+31 6 34064773',
                'linkedin' => '',
            ),
        );
    }
    
    return json_decode($contacts_json, true);
}

/**
 * Get opening hours
 */
function vsg_get_opening_hours() {
    $hours_json = get_option('vsg_opening_hours', '');
    
    // If no custom hours, return default (24/7)
    if (empty($hours_json)) {
        return array(
            array('day' => 'Maandag', 'hours' => '24 uur geopend', 'isOpen' => true),
            array('day' => 'Dinsdag', 'hours' => '24 uur geopend', 'isOpen' => true),
            array('day' => 'Woensdag', 'hours' => '24 uur geopend', 'isOpen' => true),
            array('day' => 'Donderdag', 'hours' => '24 uur geopend', 'isOpen' => true),
            array('day' => 'Vrijdag', 'hours' => '24 uur geopend', 'isOpen' => true),
            array('day' => 'Zaterdag', 'hours' => '24 uur geopend', 'isOpen' => true),
            array('day' => 'Zondag', 'hours' => '24 uur geopend', 'isOpen' => true),
        );
    }
    
    return json_decode($hours_json, true);
}

/**
 * Add admin menu for business info settings
 */
add_action('admin_menu', 'vsg_add_admin_menu');

function vsg_add_admin_menu() {
    add_menu_page(
        'VSG Business Info',           // Page title
        'VSG Business Info',           // Menu title
        'manage_options',              // Capability
        'vsg-business-info',           // Menu slug
        'vsg_business_info_page',      // Callback function
        'dashicons-building',          // Icon
        30                             // Position
    );
}

/**
 * Admin settings page
 */
function vsg_business_info_page() {
    ?>
    <div class="wrap">
        <h1>VSG Talent Business Information</h1>
        <p>Beheer hier de bedrijfsgegevens die worden gebruikt op de VSG Talent website.</p>
        
        <form method="post" action="options.php">
            <?php
            settings_fields('vsg_business_info');
            do_settings_sections('vsg-business-info');
            ?>
            
            <h2>Organisatie Informatie</h2>
            <table class="form-table">
                <tr>
                    <th><label for="vsg_org_name">Organisatie Naam</label></th>
                    <td><input type="text" id="vsg_org_name" name="vsg_org_name" value="<?php echo esc_attr(get_option('vsg_org_name', 'VSG Talent')); ?>" class="regular-text" /></td>
                </tr>
                <tr>
                    <th><label for="vsg_legal_name">Juridische Naam</label></th>
                    <td><input type="text" id="vsg_legal_name" name="vsg_legal_name" value="<?php echo esc_attr(get_option('vsg_legal_name', 'VSG Dakwerken B.V.')); ?>" class="regular-text" /></td>
                </tr>
                <tr>
                    <th><label for="vsg_description">Beschrijving</label></th>
                    <td><textarea id="vsg_description" name="vsg_description" rows="3" class="large-text"><?php echo esc_textarea(get_option('vsg_description', 'VSG Talent ondersteunt veelbelovende sporters in Nederland.')); ?></textarea></td>
                </tr>
                <tr>
                    <th><label for="vsg_founded">Opgericht</label></th>
                    <td><input type="text" id="vsg_founded" name="vsg_founded" value="<?php echo esc_attr(get_option('vsg_founded', '2010')); ?>" class="regular-text" placeholder="YYYY" /></td>
                </tr>
            </table>
            
            <h2>Adres Gegevens</h2>
            <table class="form-table">
                <tr>
                    <th><label for="vsg_street">Straat</label></th>
                    <td><input type="text" id="vsg_street" name="vsg_street" value="<?php echo esc_attr(get_option('vsg_street', 'Söderblomstraat')); ?>" class="regular-text" /></td>
                </tr>
                <tr>
                    <th><label for="vsg_house_number">Huisnummer</label></th>
                    <td><input type="text" id="vsg_house_number" name="vsg_house_number" value="<?php echo esc_attr(get_option('vsg_house_number', '181')); ?>" /></td>
                </tr>
                <tr>
                    <th><label for="vsg_postal_code">Postcode</label></th>
                    <td><input type="text" id="vsg_postal_code" name="vsg_postal_code" value="<?php echo esc_attr(get_option('vsg_postal_code', '2131 GE')); ?>" /></td>
                </tr>
                <tr>
                    <th><label for="vsg_city">Plaats</label></th>
                    <td><input type="text" id="vsg_city" name="vsg_city" value="<?php echo esc_attr(get_option('vsg_city', 'Hoofddorp')); ?>" class="regular-text" /></td>
                </tr>
                <tr>
                    <th><label for="vsg_province">Provincie</label></th>
                    <td><input type="text" id="vsg_province" name="vsg_province" value="<?php echo esc_attr(get_option('vsg_province', 'Noord-Holland')); ?>" class="regular-text" /></td>
                </tr>
                <tr>
                    <th><label for="vsg_latitude">Latitude</label></th>
                    <td><input type="text" id="vsg_latitude" name="vsg_latitude" value="<?php echo esc_attr(get_option('vsg_latitude', '52.30338852113304')); ?>" class="regular-text" /></td>
                </tr>
                <tr>
                    <th><label for="vsg_longitude">Longitude</label></th>
                    <td><input type="text" id="vsg_longitude" name="vsg_longitude" value="<?php echo esc_attr(get_option('vsg_longitude', '4.671270639907734')); ?>" class="regular-text" /></td>
                </tr>
            </table>
            
            <h2>Contact Gegevens</h2>
            <table class="form-table">
                <tr>
                    <th><label for="vsg_phone">Telefoon</label></th>
                    <td><input type="text" id="vsg_phone" name="vsg_phone" value="<?php echo esc_attr(get_option('vsg_phone', '+31 6 51664731')); ?>" class="regular-text" /></td>
                </tr>
                <tr>
                    <th><label for="vsg_email">Email</label></th>
                    <td><input type="email" id="vsg_email" name="vsg_email" value="<?php echo esc_attr(get_option('vsg_email', 'info@vsgdakwerken.nl')); ?>" class="regular-text" /></td>
                </tr>
                <tr>
                    <th><label for="vsg_kvk">KvK Nummer</label></th>
                    <td><input type="text" id="vsg_kvk" name="vsg_kvk" value="<?php echo esc_attr(get_option('vsg_kvk', '')); ?>" class="regular-text" /></td>
                </tr>
                <tr>
                    <th><label for="vsg_btw">BTW Nummer</label></th>
                    <td><input type="text" id="vsg_btw" name="vsg_btw" value="<?php echo esc_attr(get_option('vsg_btw', '')); ?>" class="regular-text" /></td>
                </tr>
            </table>
            
            <h2>Social Media</h2>
            <table class="form-table">
                <tr>
                    <th><label for="vsg_instagram">Instagram URL</label></th>
                    <td><input type="url" id="vsg_instagram" name="vsg_instagram" value="<?php echo esc_attr(get_option('vsg_instagram', 'https://www.instagram.com/vsgdakwerken.nl/')); ?>" class="regular-text" /></td>
                </tr>
                <tr>
                    <th><label for="vsg_linkedin">LinkedIn URL</label></th>
                    <td><input type="url" id="vsg_linkedin" name="vsg_linkedin" value="<?php echo esc_attr(get_option('vsg_linkedin', 'https://www.linkedin.com/company/vsg-dakwerken/')); ?>" class="regular-text" /></td>
                </tr>
                <tr>
                    <th><label for="vsg_facebook">Facebook URL</label></th>
                    <td><input type="url" id="vsg_facebook" name="vsg_facebook" value="<?php echo esc_attr(get_option('vsg_facebook', '')); ?>" class="regular-text" /></td>
                </tr>
                <tr>
                    <th><label for="vsg_youtube">YouTube URL</label></th>
                    <td><input type="url" id="vsg_youtube" name="vsg_youtube" value="<?php echo esc_attr(get_option('vsg_youtube', '')); ?>" class="regular-text" /></td>
                </tr>
                <tr>
                    <th><label for="vsg_tiktok">TikTok URL</label></th>
                    <td><input type="url" id="vsg_tiktok" name="vsg_tiktok" value="<?php echo esc_attr(get_option('vsg_tiktok', '')); ?>" class="regular-text" /></td>
                </tr>
                <tr>
                    <th><label for="vsg_twitter">Twitter/X URL</label></th>
                    <td><input type="url" id="vsg_twitter" name="vsg_twitter" value="<?php echo esc_attr(get_option('vsg_twitter', '')); ?>" class="regular-text" /></td>
                </tr>
            </table>
            
            <?php submit_button('Opslaan'); ?>
        </form>
        
        <hr>
        
        <h2>REST API Endpoint</h2>
        <p>De bedrijfsgegevens zijn beschikbaar via:</p>
        <code><?php echo get_rest_url(null, 'levy/v1/business-info'); ?></code>
        <p><a href="<?php echo get_rest_url(null, 'levy/v1/business-info'); ?>" target="_blank" class="button">Test Endpoint</a></p>
        
        <hr>
        
        <h2>Contactpersonen (JSON)</h2>
        <p>Voor geavanceerde configuratie kun je hier een JSON array toevoegen:</p>
        <textarea name="vsg_contacts" rows="10" class="large-text code" placeholder='[{"name":"Naam","role":"Functie","email":"email@example.com","phone":"+31 6 12345678"}]'><?php echo esc_textarea(get_option('vsg_contacts', '')); ?></textarea>
        <p class="description">Laat leeg voor standaard VSG Dakwerken contacten (Stephan + Mustafa)</p>
    </div>
    <?php
}

/**
 * Register settings
 */
add_action('admin_init', 'vsg_register_settings');

function vsg_register_settings() {
    $settings = array(
        'vsg_org_name', 'vsg_legal_name', 'vsg_description', 'vsg_founded',
        'vsg_street', 'vsg_house_number', 'vsg_postal_code', 'vsg_city', 'vsg_province',
        'vsg_latitude', 'vsg_longitude',
        'vsg_phone', 'vsg_email', 'vsg_kvk', 'vsg_btw',
        'vsg_instagram', 'vsg_linkedin', 'vsg_facebook', 'vsg_youtube', 'vsg_tiktok', 'vsg_twitter',
        'vsg_contacts', 'vsg_opening_hours', 'vsg_logo'
    );
    
    foreach ($settings as $setting) {
        register_setting('vsg_business_info', $setting);
    }
}

/**
 * Add CORS headers for API
 */
add_action('rest_api_init', function() {
    remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
    add_filter('rest_pre_serve_request', function($value) {
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET');
        header('Access-Control-Allow-Credentials: true');
        return $value;
    });
}, 15);
