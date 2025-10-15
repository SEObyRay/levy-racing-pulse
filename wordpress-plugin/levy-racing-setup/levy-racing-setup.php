<?php
/**
 * Plugin Name: Levy Racing Auto Setup
 * Plugin URI: https://levyracing.nl
 * Description: Automatische configuratie voor Levy Racing backend - Custom Post Types, Taxonomieën, en REST API setup
 * Version: 1.1.1
 * Author: Ray Gritter
 * Author URI: https://seobyray.com
 * Text Domain: levy-racing-setup
 * Domain Path: /languages
 */

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

// Define plugin constants
define('LEVY_RACING_VERSION', '1.1.1');
define('LEVY_RACING_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('LEVY_RACING_PLUGIN_URL', plugin_dir_url(__FILE__));

/**
 * Main Plugin Class
 */
class Levy_Racing_Setup {
    
    /**
     * Constructor
     */
    public function __construct() {
        // Activation hook
        register_activation_hook(__FILE__, array($this, 'activate'));
        
        // Deactivation hook
        register_deactivation_hook(__FILE__, array($this, 'deactivate'));
        
        // Initialize plugin
        add_action('init', array($this, 'init'));
        
        // Add CORS headers
        add_action('rest_api_init', array($this, 'add_cors_headers'));
        
        // Add admin menu
        add_action('admin_menu', array($this, 'add_admin_menu'));
        
        // Add custom REST fields
        add_action('rest_api_init', array($this, 'register_custom_rest_fields'));
        
        // Handle dummy data seeding
        add_action('admin_post_levy_racing_seed_data', array($this, 'handle_seed_data'));
    }
    
    /**
     * Plugin activation
     */
    public function activate() {
        // Register post types and taxonomies
        $this->register_evenementen_post_type();
        $this->register_taxonomies();
        
        // Flush rewrite rules
        flush_rewrite_rules();
        
        // Set activation flag
        update_option('levy_racing_activated', true);
        update_option('levy_racing_version', LEVY_RACING_VERSION);
    }
    
    /**
     * Plugin deactivation
     */
    public function deactivate() {
        // Flush rewrite rules
        flush_rewrite_rules();
    }
    
    /**
     * Initialize plugin
     */
    public function init() {
        // Register post types
        $this->register_evenementen_post_type();
        
        // Register taxonomies
        $this->register_taxonomies();
        
        // Register meta fields
        $this->register_meta_fields();
        
        // Load text domain
        load_plugin_textdomain('levy-racing-setup', false, dirname(plugin_basename(__FILE__)) . '/languages');
    }
    
    /**
     * Register Evenementen Custom Post Type
     */
    public function register_evenementen_post_type() {
        $labels = array(
            'name'                  => 'Evenementen',
            'singular_name'         => 'Evenement',
            'menu_name'             => 'Evenementen',
            'name_admin_bar'        => 'Evenement',
            'add_new'               => 'Nieuwe toevoegen',
            'add_new_item'          => 'Nieuw Evenement Toevoegen',
            'new_item'              => 'Nieuw Evenement',
            'edit_item'             => 'Evenement Bewerken',
            'view_item'             => 'Evenement Bekijken',
            'all_items'             => 'Alle Evenementen',
            'search_items'          => 'Evenementen Zoeken',
            'not_found'             => 'Geen evenementen gevonden.',
            'not_found_in_trash'    => 'Geen evenementen gevonden in prullenbak.',
        );
        
        $args = array(
            'labels'                => $labels,
            'description'           => 'Race evenementen en agenda items',
            'public'                => true,
            'publicly_queryable'    => true,
            'show_ui'               => true,
            'show_in_menu'          => true,
            'query_var'             => true,
            'rewrite'               => array('slug' => 'evenement'),
            'capability_type'       => 'post',
            'has_archive'           => true,
            'hierarchical'          => false,
            'menu_position'         => 5,
            'menu_icon'             => 'dashicons-calendar-alt',
            'supports'              => array('title', 'editor', 'thumbnail', 'excerpt'),
            'show_in_rest'          => true,
            'rest_base'             => 'evenementen',
            'rest_controller_class' => 'WP_REST_Posts_Controller',
        );
        
        register_post_type('evenement', $args);
    }
    
    /**
     * Register Taxonomies
     */
    public function register_taxonomies() {
        // Competities Taxonomy
        $competitie_labels = array(
            'name'              => 'Competities',
            'singular_name'     => 'Competitie',
            'search_items'      => 'Competities Zoeken',
            'all_items'         => 'Alle Competities',
            'parent_item'       => 'Bovenliggende Competitie',
            'parent_item_colon' => 'Bovenliggende Competitie:',
            'edit_item'         => 'Competitie Bewerken',
            'update_item'       => 'Competitie Bijwerken',
            'add_new_item'      => 'Nieuwe Competitie Toevoegen',
            'new_item_name'     => 'Nieuwe Competitie Naam',
            'menu_name'         => 'Competities',
        );
        
        $competitie_args = array(
            'hierarchical'          => true,
            'labels'                => $competitie_labels,
            'show_ui'               => true,
            'show_admin_column'     => true,
            'query_var'             => true,
            'rewrite'               => array('slug' => 'competitie'),
            'show_in_rest'          => true,
            'rest_base'             => 'competities',
            'rest_controller_class' => 'WP_REST_Terms_Controller',
        );
        
        register_taxonomy('competitie', array('post'), $competitie_args);
        
        // Seizoenen Taxonomy
        $seizoen_labels = array(
            'name'              => 'Seizoenen',
            'singular_name'     => 'Seizoen',
            'search_items'      => 'Seizoenen Zoeken',
            'all_items'         => 'Alle Seizoenen',
            'parent_item'       => 'Bovenliggend Seizoen',
            'parent_item_colon' => 'Bovenliggend Seizoen:',
            'edit_item'         => 'Seizoen Bewerken',
            'update_item'       => 'Seizoen Bijwerken',
            'add_new_item'      => 'Nieuw Seizoen Toevoegen',
            'new_item_name'     => 'Nieuw Seizoen Naam',
            'menu_name'         => 'Seizoenen',
        );
        
        $seizoen_args = array(
            'hierarchical'          => true,
            'labels'                => $seizoen_labels,
            'show_ui'               => true,
            'show_admin_column'     => true,
            'query_var'             => true,
            'rewrite'               => array('slug' => 'seizoen'),
            'show_in_rest'          => true,
            'rest_base'             => 'seizoenen',
            'rest_controller_class' => 'WP_REST_Terms_Controller',
        );
        
        register_taxonomy('seizoen', array('post'), $seizoen_args);
    }
    
    /**
     * Register Meta Fields
     */
    public function register_meta_fields() {
        // Evenementen Meta Fields
        $evenement_fields = array(
            'datum' => array(
                'type'         => 'string',
                'description'  => 'Datum van het evenement',
                'single'       => true,
                'show_in_rest' => true,
            ),
            'einddatum' => array(
                'type'         => 'string',
                'description'  => 'Einddatum van het evenement',
                'single'       => true,
                'show_in_rest' => true,
            ),
            'tijd' => array(
                'type'         => 'string',
                'description'  => 'Tijd van het evenement',
                'single'       => true,
                'show_in_rest' => true,
            ),
            'locatie' => array(
                'type'         => 'string',
                'description'  => 'Locatie/Circuit',
                'single'       => true,
                'show_in_rest' => true,
            ),
            'stad' => array(
                'type'         => 'string',
                'description'  => 'Stad',
                'single'       => true,
                'show_in_rest' => true,
            ),
            'adres' => array(
                'type'         => 'string',
                'description'  => 'Volledig adres',
                'single'       => true,
                'show_in_rest' => true,
            ),
            'klasse' => array(
                'type'         => 'string',
                'description'  => 'Race klasse',
                'single'       => true,
                'show_in_rest' => true,
            ),
            'volgende_race' => array(
                'type'         => 'boolean',
                'description'  => 'Is dit de volgende race?',
                'single'       => true,
                'show_in_rest' => true,
            ),
            'resultaat' => array(
                'type'         => 'string',
                'description'  => 'Resultaat (voor afgelopen events)',
                'single'       => true,
                'show_in_rest' => true,
            ),
        );
        
        foreach ($evenement_fields as $key => $args) {
            register_post_meta('evenement', $key, $args);
        }
        
        // Posts (Race Verslagen) Meta Fields
        $post_fields = array(
            'circuit' => array(
                'type'         => 'string',
                'description'  => 'Circuit naam',
                'single'       => true,
                'show_in_rest' => true,
            ),
            'positie' => array(
                'type'         => 'integer',
                'description'  => 'Race positie',
                'single'       => true,
                'show_in_rest' => true,
            ),
        );
        
        foreach ($post_fields as $key => $args) {
            register_post_meta('post', $key, $args);
        }
    }
    
    /**
     * Register Custom REST Fields
     */
    public function register_custom_rest_fields() {
        // Add featured image URL to posts
        register_rest_field(
            array('post', 'evenement'),
            'featured_image_url',
            array(
                'get_callback' => function($object) {
                    if ($object['featured_media']) {
                        $image = wp_get_attachment_image_src($object['featured_media'], 'large');
                        return $image ? $image[0] : null;
                    }
                    return null;
                },
                'schema' => array(
                    'description' => 'URL van de uitgelichte afbeelding',
                    'type'        => 'string',
                ),
            )
        );
    }
    
    /**
     * Add CORS Headers
     */
    public function add_cors_headers() {
        // Get allowed origins
        $allowed_origins = apply_filters('levy_racing_cors_origins', array(
            'http://localhost:5173',
            'http://localhost:3000',
            'http://localhost:8080',
        ));
        
        $origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';
        
        if (in_array($origin, $allowed_origins)) {
            header('Access-Control-Allow-Origin: ' . $origin);
            header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
            header('Access-Control-Allow-Headers: Content-Type, Authorization, X-WP-Nonce');
            header('Access-Control-Allow-Credentials: true');
        }
        
        // Handle preflight requests
        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            status_header(200);
            exit;
        }
    }
    
    /**
     * Add Admin Menu
     */
    public function add_admin_menu() {
        add_menu_page(
            'Levy Racing Setup',
            'Levy Racing',
            'manage_options',
            'levy-racing-setup',
            array($this, 'admin_page'),
            'dashicons-flag',
            3
        );
    }
    
    /**
     * Admin Page
     */
    public function admin_page() {
        if (isset($_GET['levy_racing_seeded'])) {
            $message = sanitize_text_field(wp_unslash($_GET['levy_racing_seeded'])) === '1'
                ? 'Dummy data succesvol aangemaakt.'
                : 'Er is iets misgegaan bij het aanmaken van de dummy data.';
            $class = sanitize_text_field(wp_unslash($_GET['levy_racing_seeded'])) === '1'
                ? 'updated'
                : 'error';
            echo '<div class="' . esc_attr($class) . ' notice is-dismissible"><p>' . esc_html($message) . '</p></div>';
        }
        ?>
        <div class="wrap">
            <h1>🏁 Levy Racing Backend Setup</h1>

            <div class="card" style="max-width: 800px;">
                <h2>✅ Plugin Geactiveerd!</h2>
                <p>De volgende onderdelen zijn automatisch geconfigureerd:</p>
                
                <ul style="list-style: disc; margin-left: 20px;">
                    <li><strong>Custom Post Type:</strong> Evenementen (voor race agenda)</li>
                    <li><strong>Taxonomieën:</strong> Competities & Seizoenen</li>
                    <li><strong>REST API:</strong> Alle endpoints zijn actief</li>
                    <li><strong>CORS:</strong> Geconfigureerd voor localhost development</li>
                    <li><strong>Custom Fields:</strong> Alle meta velden zijn geregistreerd</li>
                </ul>
                
                <hr>
                
                <h3>📋 REST API Endpoints</h3>
                <p>Je kunt deze endpoints gebruiken in je React app:</p>
                
                <table class="widefat" style="margin-top: 10px;">
                    <thead>
                        <tr>
                            <th>Type</th>
                            <th>Endpoint</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Evenementen</td>
                            <td><code><?php echo get_rest_url(null, 'wp/v2/evenementen'); ?></code></td>
                        </tr>
                        <tr>
                            <td>Posts (Nieuws)</td>
                            <td><code><?php echo get_rest_url(null, 'wp/v2/posts'); ?></code></td>
                        </tr>
                        <tr>
                            <td>Competities</td>
                            <td><code><?php echo get_rest_url(null, 'wp/v2/competities'); ?></code></td>
                        </tr>
                        <tr>
                            <td>Seizoenen</td>
                            <td><code><?php echo get_rest_url(null, 'wp/v2/seizoenen'); ?></code></td>
                        </tr>
                    </tbody>
                </table>
                
                <hr>
                
                <h3>🔐 Authenticatie Setup</h3>
                <p>Om de React app te laten communiceren met WordPress:</p>
                <ol>
                    <li>Ga naar <strong>Gebruikers → Profiel</strong></li>
                    <li>Scroll naar <strong>"Application Passwords"</strong></li>
                    <li>Maak een nieuw wachtwoord aan met naam: <code>Levy Racing App</code></li>
                    <li>Kopieer het gegenereerde wachtwoord en bewaar het veilig</li>
                </ol>
                
                <hr>
                
                <h3>🧪 Test Data Toevoegen</h3>
                <p>Voeg test data toe om de integratie te testen:</p>
                <ul style="list-style: disc; margin-left: 20px;">
                    <li>Ga naar <strong>Berichten → Competities</strong> en voeg competities toe</li>
                    <li>Ga naar <strong>Berichten → Seizoenen</strong> en voeg seizoenen toe (2024, 2025)</li>
                    <li>Ga naar <strong>Evenementen → Nieuwe toevoegen</strong> voor test evenementen</li>
                    <li>Ga naar <strong>Berichten → Nieuw bericht</strong> voor test race verslagen</li>
                </ul>
                
                <hr>
                
                <h3>ℹ️ Plugin Informatie</h3>
                <p>
                    <strong>Versie:</strong> <?php echo LEVY_RACING_VERSION; ?><br>
                    <strong>Status:</strong> <span style="color: green;">●</span> Actief
                </p>
                
                <p style="margin-top: 20px;">
                    <a href="<?php echo admin_url('edit.php?post_type=evenement'); ?>" class="button button-primary">
                        Evenementen Beheren
                    </a>
                    <a href="<?php echo admin_url('edit.php'); ?>" class="button">
                        Race Verslagen Beheren
                    </a>
                </p>

                <hr>

                <h3>🧪 Dummy Data</h3>
                <p>
                    Wil je snel de site vullen met voorbeeldcontent? Gebruik onderstaande knop om
                    dummy nieuwsberichten en evenementen (inclusief afbeeldingen) aan te maken.
                </p>
                <form method="post" action="<?php echo esc_url(admin_url('admin-post.php')); ?>">
                    <?php wp_nonce_field('levy_racing_seed_nonce'); ?>
                    <input type="hidden" name="action" value="levy_racing_seed_data">
                    <?php submit_button('Dummy data toevoegen', 'secondary'); ?>
                </form>
            </div>
        </div>
        <?php
    }

    /**
     * Handle dummy data seeding
     */
    public function handle_seed_data() {
        if (!current_user_can('manage_options')) {
            wp_die(__('Je hebt geen toestemming om deze actie uit te voeren.', 'levy-racing-setup'));
        }

        check_admin_referer('levy_racing_seed_nonce');

        $result = $this->seed_dummy_data();

        wp_redirect(
            add_query_arg(
                'levy_racing_seeded',
                $result ? '1' : '0',
                admin_url('admin.php?page=levy-racing-setup')
            )
        );
        exit;
    }

    /**
     * Seed dummy data
     */
    private function seed_dummy_data(): bool {
        $competitions = [
            ['name' => 'NXT Rookie Cup', 'slug' => 'nxt-rookie-cup'],
            ['name' => 'Rotax Max Challenge', 'slug' => 'rotax-max-challenge'],
            ['name' => 'ONK Karting', 'slug' => 'onk-karting'],
            ['name' => 'IAME X30 Challenge', 'slug' => 'iame-x30-challenge'],
            ['name' => 'Winter Cup', 'slug' => 'winter-cup'],
        ];

        $seasons = [
            ['name' => '2024', 'slug' => '2024'],
            ['name' => '2025', 'slug' => '2025'],
        ];

        $competitionIds = [];
        foreach ($competitions as $competition) {
            $competitionIds[$competition['slug']] = $this->ensure_term('competitie', $competition['name'], $competition['slug']);
        }

        $seasonIds = [];
        foreach ($seasons as $season) {
            $seasonIds[$season['slug']] = $this->ensure_term('seizoen', $season['name'], $season['slug']);
        }

        $posts = [
            [
                'title' => 'Levy verrast met podium bij NXT Rookies',
                'slug' => 'levy-verrast-met-podium-nxt-rookies',
                'date' => '2024-09-28 15:30:00',
                'content' => $this->format_content(
                    "Deze zagen wij niet aankomen! Ons doel was top 8 op deze onbekende baan met een groot deelnemersveld van 19 rijders." .
                    "<br><br>Maar Levy #17 wist na een moeilijke kwalificatie (P9) maximaal te profiteren van de rommelige top voor hem." .
                    " Drie prachtige inhaalacties brachten hem terug in de race; hij bleef er bovenop zitten en strafte iedere fout voor hem direct af." .
                    "<br><br><strong>Resultaat</strong><ul><li>P5 algemeen</li><li>P3 bij de NXT Rookies</li></ul>" .
                    "Levy ging compleet uit zijn dak en rook zelfs aan het podium. Op naar meer!" .
                    "<br><br>Dank aan alle sponsoren en supporters voor het vertrouwen in dit eerste jaar richting de top."),
                'excerpt' => 'Levy #17 pakt verrassend P5 algemeen en P3 bij de NXT Rookies na een fenomenale race.',
                'competition' => $competitionIds['nxt-rookie-cup'] ?? 0,
                'season' => $seasonIds['2024'] ?? 0,
                'meta' => [
                    'circuit' => 'Circuit Park Berghem',
                    'positie' => 3,
                ],
                'image' => 'https://images.unsplash.com/photo-1517142874080-157e5c1b8656?auto=format&fit=crop&w=1280&q=80',
            ],
            [
                'title' => 'Sterke comeback in Rotax Max Challenge',
                'slug' => 'sterke-comeback-rotax-max',
                'date' => '2024-08-18 12:00:00',
                'content' => $this->format_content(
                    "Na een mindere start vanuit de middenmoot vocht Levy zich indrukwekkend terug richting de top." .
                    " Dankzij strak racemanagement en slimme inhaalacties klom hij naar voren." .
                    "<br><br>De snelheid zat er goed in en het team kon veel leren richting de volgende races."),
                'excerpt' => 'Levy klimt naar voren tijdens een spannende Rotax Max Challenge ronde.',
                'competition' => $competitionIds['rotax-max-challenge'] ?? 0,
                'season' => $seasonIds['2024'] ?? 0,
                'meta' => [
                    'circuit' => 'Raceway Venray',
                    'positie' => 5,
                ],
                'image' => 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1280&q=80',
            ],
            [
                'title' => 'Seizoensopener ONK Karting',
                'slug' => 'seizoensopener-onk-karting',
                'date' => '2025-03-02 10:00:00',
                'content' => $this->format_content(
                    "De eerste ONK-wedstrijd van het seizoen leverde stevige duels en waardevolle kilometers op voor Levy." .
                    " Een solide basis voor het nieuwe jaar met een frisse setup en veel vertrouwen."),
                'excerpt' => 'Veelbelovende start van het ONK-seizoen met nieuwe set-up en vertrouwen.',
                'competition' => $competitionIds['onk-karting'] ?? 0,
                'season' => $seasonIds['2025'] ?? 0,
                'meta' => [
                    'circuit' => 'Kartcircuit Strijen',
                    'positie' => 4,
                ],
                'image' => 'https://images.unsplash.com/photo-1518655048521-f130df041f66?auto=format&fit=crop&w=1280&q=80',
            ],
            [
                'title' => 'Glorieuze overwinning in IAME X30 Challenge',
                'slug' => 'glorieuze-overwinning-iame-x30-challenge',
                'date' => '2025-05-04 17:00:00',
                'content' => $this->format_content(
                    "Wat een afsluiting van het weekend! Vanaf pole position domineerde Levy de finale." .
                    " Runde na ronde bouwde hij een comfortabele voorsprong op en hield het hoofd koel onder druk." .
                    "<br><br>Met deze overwinning schrijft hij zijn naam bij op de erelijst van de IAME X30 Challenge."),
                'excerpt' => 'Levy pakt een klinkende overwinning in de IAME X30 Challenge finale.',
                'competition' => $competitionIds['iame-x30-challenge'] ?? 0,
                'season' => $seasonIds['2025'] ?? 0,
                'meta' => [
                    'circuit' => 'Kartbaan Genk',
                    'positie' => 1,
                ],
                'image' => 'https://images.unsplash.com/photo-1524294752368-665e3f24c6c8?auto=format&fit=crop&w=1280&q=80',
            ],
            [
                'title' => 'Winter Cup debuut met strakke pace',
                'slug' => 'winter-cup-debuut-met-strakke-pace',
                'date' => '2025-02-10 14:45:00',
                'content' => $this->format_content(
                    "Tijdens de Winter Cup maakte Levy zijn debuut met een frisse kart en nieuwe engineer." .
                    " Ondanks koude omstandigheden wist hij zich knap naar voren te vechten." .
                    "<br><br>Het team verzamelde waardevolle data voor het komende seizoen."),
                'excerpt' => 'Sterk Winter Cup debuut met progressie in elke heat.',
                'competition' => $competitionIds['winter-cup'] ?? 0,
                'season' => $seasonIds['2025'] ?? 0,
                'meta' => [
                    'circuit' => 'South Garda Karting',
                    'positie' => 6,
                ],
                'image' => 'https://images.unsplash.com/photo-1520453803296-c39eabe2dab4?auto=format&fit=crop&w=1280&q=80',
            ],
        ];

        $events = [
            [
                'title' => 'NXT Rookie Cup - Ronde 2',
                'slug' => 'nxt-rookie-cup-ronde-2-2024',
                'date' => '2024-11-09 09:00:00',
                'meta' => [
                    'datum' => '2024-11-09',
                    'einddatum' => '2024-11-10',
                    'tijd' => '09:00 - 18:00',
                    'locatie' => 'Kartbaan Genk',
                    'stad' => 'Genk',
                    'adres' => 'Damstraat 1, Genk, België',
                    'klasse' => 'NXT Rookies',
                    'volgende_race' => true,
                ],
                'image' => 'https://images.unsplash.com/photo-1520453803296-c39eabe2dab4?auto=format&fit=crop&w=1280&q=80',
            ],
            [
                'title' => 'Rotax Max Challenge - Finale',
                'slug' => 'rotax-max-challenge-finale-2024',
                'date' => '2024-12-14 08:30:00',
                'meta' => [
                    'datum' => '2024-12-14',
                    'einddatum' => '2024-12-15',
                    'tijd' => '08:30 - 19:00',
                    'locatie' => 'Circuit Park Berghem',
                    'stad' => 'Berghem',
                    'adres' => 'Eikenboomlaan 1, Berghem',
                    'klasse' => 'Senior Max',
                    'volgende_race' => false,
                ],
                'image' => 'https://images.unsplash.com/photo-1463082459669-00208fe72cc0?auto=format&fit=crop&w=1280&q=80',
            ],
            [
                'title' => 'ONK Karting - Seizoensopener',
                'slug' => 'onk-karting-seizoensopener-2025',
                'date' => '2025-03-15 09:00:00',
                'meta' => [
                    'datum' => '2025-03-15',
                    'einddatum' => '2025-03-16',
                    'tijd' => '09:00 - 17:00',
                    'locatie' => 'Kartcentrum Lelystad',
                    'stad' => 'Lelystad',
                    'adres' => 'Talingweg 95, Lelystad',
                    'klasse' => 'ONK Senior',
                    'volgende_race' => false,
                ],
                'image' => 'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1280&q=80',
            ],
            [
                'title' => 'IAME X30 Challenge - Finale',
                'slug' => 'iame-x30-challenge-finale-2025',
                'date' => '2025-05-03 08:30:00',
                'meta' => [
                    'datum' => '2025-05-03',
                    'einddatum' => '2025-05-04',
                    'tijd' => '08:30 - 19:00',
                    'locatie' => 'Kartbaan Genk',
                    'stad' => 'Genk',
                    'adres' => 'Damstraat 1, Genk, België',
                    'klasse' => 'X30 Senior',
                    'volgende_race' => false,
                ],
                'image' => 'https://images.unsplash.com/photo-1529420502735-4696a0e5ac94?auto=format&fit=crop&w=1280&q=80',
            ],
            [
                'title' => 'Winter Cup - Testweekend',
                'slug' => 'winter-cup-testweekend-2025',
                'date' => '2025-02-07 09:00:00',
                'meta' => [
                    'datum' => '2025-02-07',
                    'einddatum' => '2025-02-09',
                    'tijd' => '09:00 - 17:30',
                    'locatie' => 'South Garda Karting',
                    'stad' => 'Lonato',
                    'adres' => 'Via Monti, Lonato del Garda, Italië',
                    'klasse' => 'OK Senior',
                    'volgende_race' => false,
                ],
                'image' => 'https://images.unsplash.com/photo-1580752300919-913301db6205?auto=format&fit=crop&w=1280&q=80',
            ],
        ];

        $postSuccess = $this->create_posts($posts, $competitionIds, $seasonIds);
        $eventSuccess = $this->create_events($events);

        return $postSuccess && $eventSuccess;
    }

    private function format_content(string $content): string {
        return '<p>' . wp_kses_post(str_replace(['\n', '\r'], '', $content)) . '</p>';
    }

    private function ensure_term(string $taxonomy, string $name, string $slug): int {
        $existing = get_term_by('slug', $slug, $taxonomy);
        if ($existing && !is_wp_error($existing)) {
            return (int) $existing->term_id;
        }

        $term = wp_insert_term($name, $taxonomy, ['slug' => $slug]);
        if (is_wp_error($term)) {
            return 0;
        }

        return (int) $term['term_id'];
    }

    private function create_posts(array $posts, array $competitionIds, array $seasonIds): bool {
        foreach ($posts as $post) {
            $post_args = [
                'post_title' => $post['title'],
                'post_name' => $post['slug'],
                'post_content' => $post['content'],
                'post_excerpt' => $post['excerpt'],
                'post_type' => 'post',
                'post_status' => 'publish',
                'post_date' => $post['date'],
            ];

            $existing = get_page_by_path($post['slug'], OBJECT, 'post');

            if ($existing && !is_wp_error($existing)) {
                $post_args['ID'] = $existing->ID;
                $post_id = wp_update_post($post_args, true);
            } else {
                $post_id = wp_insert_post($post_args, true);
            }

            if (is_wp_error($post_id)) {
                return false;
            }

            update_post_meta($post_id, 'circuit', $post['meta']['circuit'] ?? '');
            update_post_meta($post_id, 'positie', $post['meta']['positie'] ?? '');

            if (!empty($post['competition'])) {
                wp_set_object_terms($post_id, (int) $post['competition'], 'competitie');
            }
            if (!empty($post['season'])) {
                wp_set_object_terms($post_id, (int) $post['season'], 'seizoen');
            }

            $current_source = get_post_meta($post_id, '_levy_dummy_image_source', true);
            $attachment_id = $this->maybe_download_image(
                $post['image'],
                $post_id,
                $post['slug'],
                $post['title'],
                $current_source
            );
            if ($attachment_id) {
                set_post_thumbnail($post_id, $attachment_id);
            }
        }

        return true;
    }

    private function create_events(array $events): bool {
        foreach ($events as $event) {
            $post_args = [
                'post_title' => $event['title'],
                'post_name' => $event['slug'],
                'post_type' => 'evenement',
                'post_status' => 'publish',
                'post_date' => $event['date'],
            ];

            $existing = get_page_by_path($event['slug'], OBJECT, 'evenement');

            if ($existing && !is_wp_error($existing)) {
                $post_args['ID'] = $existing->ID;
                $event_id = wp_update_post($post_args, true);
            } else {
                $event_id = wp_insert_post($post_args, true);
            }

            if (is_wp_error($event_id)) {
                return false;
            }

            foreach ($event['meta'] as $key => $value) {
                update_post_meta($event_id, $key, $value);
            }

            $current_source = get_post_meta($event_id, '_levy_dummy_image_source', true);
            $attachment_id = $this->maybe_download_image(
                $event['image'],
                $event_id,
                $event['slug'],
                $event['title'],
                $current_source
            );
            if ($attachment_id) {
                set_post_thumbnail($event_id, $attachment_id);
            }
        }

        return true;
    }

    private function maybe_download_image(string $url, int $post_id, string $key, string $label, string $current_source = ''): int {
        if ($current_source === $url && has_post_thumbnail($post_id)) {
            return (int) get_post_thumbnail_id($post_id);
        }

        if (!empty($url)) {
            $attachment_id = $this->download_remote_image($url, $post_id, $label);
            if ($attachment_id) {
                update_post_meta($post_id, '_levy_dummy_image_source', $url);
                return $attachment_id;
            }
        }

        $attachment_id = $this->generate_placeholder_image($post_id, $key, $label);
        if ($attachment_id) {
            update_post_meta($post_id, '_levy_dummy_image_source', 'placeholder:' . $key);
        }

        return $attachment_id;
    }

    private function download_remote_image(string $url, int $post_id, string $label): int {
        if (empty($url)) {
            return 0;
        }

        if (!function_exists('media_sideload_image')) {
            require_once ABSPATH . 'wp-admin/includes/file.php';
            require_once ABSPATH . 'wp-admin/includes/media.php';
            require_once ABSPATH . 'wp-admin/includes/image.php';
        }

        $attachment_id = media_sideload_image($url, $post_id, $label, 'id');
        if (is_wp_error($attachment_id)) {
            return 0;
        }

        return (int) $attachment_id;
    }

    private function generate_placeholder_image(int $post_id, string $key, string $label): int {
        if (!function_exists('imagecreatetruecolor')) {
            return 0;
        }

        $upload_dir = wp_upload_dir();
        if (!empty($upload_dir['error'])) {
            return 0;
        }

        $width = 1600;
        $height = 900;
        $image = imagecreatetruecolor($width, $height);
        if (!$image) {
            return 0;
        }

        $background = imagecolorallocate($image, 18, 23, 34);
        imagefilledrectangle($image, 0, 0, $width, $height, $background);

        $overlay = imagecolorallocatealpha($image, 255, 104, 0, 80);
        imagefilledrectangle($image, 0, $height - 220, $width, $height, $overlay);

        $text_color = imagecolorallocate($image, 255, 255, 255);
        imagestring($image, 5, 40, 40, 'Levy Racing', $text_color);
        imagestring($image, 4, 40, 80, strtoupper($label), $text_color);

        $filename = sanitize_file_name('levy-placeholder-' . $key . '-' . time() . '.jpg');
        $filepath = trailingslashit($upload_dir['path']) . $filename;

        imagejpeg($image, $filepath, 90);
        imagedestroy($image);

        $attachment = [
            'post_mime_type' => 'image/jpeg',
            'post_title'     => 'Placeholder ' . $label,
            'post_content'   => '',
            'post_status'    => 'inherit',
        ];

        $attachment_id = wp_insert_attachment($attachment, $filepath, $post_id);
        if (is_wp_error($attachment_id)) {
            return 0;
        }

        require_once ABSPATH . 'wp-admin/includes/image.php';
        $attach_data = wp_generate_attachment_metadata($attachment_id, $filepath);
        wp_update_attachment_metadata($attachment_id, $attach_data);

        return (int) $attachment_id;
    }
}

// Initialize plugin
new Levy_Racing_Setup();
