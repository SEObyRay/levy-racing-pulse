# WordPress Business Info Setup

Deze documentatie beschrijft hoe je de bedrijfsgegevens beheert via WordPress die gebruikt worden in de Next.js frontend.

## Stap 1: Custom REST API Endpoint maken

Voeg de volgende code toe aan je WordPress theme's `functions.php` of maak een custom plugin:

```php
<?php
/**
 * Register custom REST API endpoint for business info
 */
add_action('rest_api_init', function () {
    register_rest_route('levy/v1', '/business-info', array(
        'methods' => 'GET',
        'callback' => 'get_levy_business_info',
        'permission_callback' => '__return_true'
    ));
});

function get_levy_business_info() {
    return array(
        'organizationName' => get_option('levy_org_name', 'Team Levy Opbergen'),
        'legalName' => get_option('levy_legal_name', 'Levy Opbergen Racing'),
        'description' => get_option('levy_description', 'Nederlands kart racing talent'),
        'address' => array(
            'street' => get_option('levy_street', ''),
            'houseNumber' => get_option('levy_house_number', ''),
            'postalCode' => get_option('levy_postal_code', ''),
            'city' => get_option('levy_city', ''),
            'province' => get_option('levy_province', 'Noord-Holland'),
            'country' => get_option('levy_country', 'Nederland'),
        ),
        'coordinates' => array(
            'latitude' => floatval(get_option('levy_latitude', 0)),
            'longitude' => floatval(get_option('levy_longitude', 0)),
        ),
        'phone' => get_option('levy_phone', ''),
        'email' => get_option('levy_email', 'info@levyopbergen.nl'),
        'kvk' => get_option('levy_kvk', ''),
        'btw' => get_option('levy_btw', ''),
        'socialMedia' => array(
            'instagram' => get_option('levy_instagram', ''),
            'facebook' => get_option('levy_facebook', ''),
            'linkedin' => get_option('levy_linkedin', ''),
            'youtube' => get_option('levy_youtube', ''),
            'tiktok' => get_option('levy_tiktok', ''),
            'twitter' => get_option('levy_twitter', ''),
        ),
        'contacts' => json_decode(get_option('levy_contacts', '[]'), true),
        'openingHours' => json_decode(get_option('levy_opening_hours', '[]'), true),
        'founded' => get_option('levy_founded', '2020'),
        'logo' => get_option('levy_logo', ''),
    );
}
```

## Stap 2: ACF Options Page (Aanbevolen)

Als je Advanced Custom Fields Pro hebt, maak dan een Options Page:

### ACF Field Groups aanmaken:

#### Group: "Bedrijfsinformatie"
- **Organisatie naam** (text) - `levy_org_name`
- **Juridische naam** (text) - `levy_legal_name`
- **Beschrijving** (textarea) - `levy_description`
- **Opgericht** (text) - `levy_founded`
- **Logo** (image) - `levy_logo`

#### Group: "Contactgegevens"
- **Telefoon** (text) - `levy_phone`
- **Email** (email) - `levy_email`
- **KvK nummer** (text) - `levy_kvk`
- **BTW nummer** (text) - `levy_btw`

#### Group: "Adres"
- **Straatnaam** (text) - `levy_street`
- **Huisnummer** (text) - `levy_house_number`
- **Postcode** (text) - `levy_postal_code`
- **Plaats** (text) - `levy_city`
- **Provincie** (text) - `levy_province`
- **Land** (text) - `levy_country`
- **Latitude** (number) - `levy_latitude`
- **Longitude** (number) - `levy_longitude`

#### Group: "Social Media"
- **Instagram URL** (url) - `levy_instagram`
- **Facebook URL** (url) - `levy_facebook`
- **LinkedIn URL** (url) - `levy_linkedin`
- **YouTube URL** (url) - `levy_youtube`
- **TikTok URL** (url) - `levy_tiktok`
- **Twitter URL** (url) - `levy_twitter`

#### Group: "Contactpersonen"
- **Contactpersonen** (repeater) - `levy_contacts`
  - Naam (text)
  - Rol (text)
  - Email (email)
  - Telefoon (text)
  - LinkedIn (url)

#### Group: "Openingstijden" (Optioneel)
- **Openingstijden** (repeater) - `levy_opening_hours`
  - Dag (text)
  - Uren (text)
  - Geopend (true/false)

### PHP Code voor ACF Options Page:

```php
if( function_exists('acf_add_options_page') ) {
    acf_add_options_page(array(
        'page_title'    => 'Bedrijfsinformatie',
        'menu_title'    => 'Bedrijfsinformatie',
        'menu_slug'     => 'levy-business-info',
        'capability'    => 'edit_posts',
        'icon_url'      => 'dashicons-building',
        'redirect'      => false
    ));
}

// Update REST API callback to use ACF
function get_levy_business_info() {
    $contacts = array();
    if (have_rows('levy_contacts', 'option')) {
        while (have_rows('levy_contacts', 'option')) {
            the_row();
            $contacts[] = array(
                'name' => get_sub_field('naam'),
                'role' => get_sub_field('rol'),
                'email' => get_sub_field('email'),
                'phone' => get_sub_field('telefoon'),
                'linkedin' => get_sub_field('linkedin'),
            );
        }
    }

    return array(
        'organizationName' => get_field('levy_org_name', 'option') ?: 'Team Levy Opbergen',
        'legalName' => get_field('levy_legal_name', 'option'),
        'description' => get_field('levy_description', 'option'),
        'address' => array(
            'street' => get_field('levy_street', 'option'),
            'houseNumber' => get_field('levy_house_number', 'option'),
            'postalCode' => get_field('levy_postal_code', 'option'),
            'city' => get_field('levy_city', 'option'),
            'province' => get_field('levy_province', 'option'),
            'country' => get_field('levy_country', 'option') ?: 'Nederland',
        ),
        'coordinates' => array(
            'latitude' => floatval(get_field('levy_latitude', 'option')),
            'longitude' => floatval(get_field('levy_longitude', 'option')),
        ),
        'phone' => get_field('levy_phone', 'option'),
        'email' => get_field('levy_email', 'option'),
        'kvk' => get_field('levy_kvk', 'option'),
        'btw' => get_field('levy_btw', 'option'),
        'socialMedia' => array(
            'instagram' => get_field('levy_instagram', 'option'),
            'facebook' => get_field('levy_facebook', 'option'),
            'linkedin' => get_field('levy_linkedin', 'option'),
            'youtube' => get_field('levy_youtube', 'option'),
            'tiktok' => get_field('levy_tiktok', 'option'),
            'twitter' => get_field('levy_twitter', 'option'),
        ),
        'contacts' => $contacts,
        'founded' => get_field('levy_founded', 'option'),
        'logo' => wp_get_attachment_url(get_field('levy_logo', 'option')),
    );
}
```

## Stap 3: Testen

1. Ga naar WordPress Admin → Bedrijfsinformatie
2. Vul alle velden in
3. Test het endpoint: `https://jouw-domain.nl/wp-json/levy/v1/business-info`
4. Verifieer dat de Next.js frontend de data correct toont

## Voorbeeld Data (VSG Dakwerken structuur):

```json
{
  "organizationName": "Team Levy Opbergen",
  "address": {
    "street": "Söderblomstraat",
    "houseNumber": "181",
    "postalCode": "2131 GE",
    "city": "Hoofddorp",
    "province": "Noord-Holland"
  },
  "coordinates": {
    "latitude": 52.30338852113304,
    "longitude": 4.671270639907734
  },
  "phone": "+31 6 51664731",
  "email": "info@levyopbergen.nl",
  "socialMedia": {
    "instagram": "https://www.instagram.com/levyopbergen/",
    "linkedin": "https://www.linkedin.com/company/levy-opbergen/"
  },
  "contacts": [
    {
      "name": "Team Manager",
      "role": "Team Management",
      "email": "team@levyopbergen.nl",
      "phone": "+31 6 12345678"
    }
  ]
}
```

## Cache Invalidatie

De Next.js frontend cached deze data voor 1 uur. Bij updates in WordPress:
- Wacht 1 uur voor automatische refresh
- Of herstart de Next.js productie build voor directe update
