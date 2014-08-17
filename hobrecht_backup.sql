--
-- PostgreSQL database dump
--

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: schema_migrations; Type: TABLE; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE TABLE schema_migrations (
    version character varying(255) NOT NULL
);


ALTER TABLE public.schema_migrations OWNER TO u85oga;

--
-- Name: spree_addresses; Type: TABLE; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE TABLE spree_addresses (
    id integer NOT NULL,
    firstname character varying(255),
    lastname character varying(255),
    address1 character varying(255),
    address2 character varying(255),
    city character varying(255),
    zipcode character varying(255),
    phone character varying(255),
    state_name character varying(255),
    alternative_phone character varying(255),
    company character varying(255),
    state_id integer,
    country_id integer,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE public.spree_addresses OWNER TO u85oga;

--
-- Name: spree_addresses_id_seq; Type: SEQUENCE; Schema: public; Owner: u85oga
--

CREATE SEQUENCE spree_addresses_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.spree_addresses_id_seq OWNER TO u85oga;

--
-- Name: spree_addresses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: u85oga
--

ALTER SEQUENCE spree_addresses_id_seq OWNED BY spree_addresses.id;


--
-- Name: spree_adjustments; Type: TABLE; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE TABLE spree_adjustments (
    id integer NOT NULL,
    source_id integer,
    source_type character varying(255),
    adjustable_id integer,
    adjustable_type character varying(255),
    amount numeric(10,2),
    label character varying(255),
    mandatory boolean,
    eligible boolean DEFAULT true,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    state character varying(255),
    order_id integer,
    included boolean DEFAULT false
);


ALTER TABLE public.spree_adjustments OWNER TO u85oga;

--
-- Name: spree_adjustments_id_seq; Type: SEQUENCE; Schema: public; Owner: u85oga
--

CREATE SEQUENCE spree_adjustments_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.spree_adjustments_id_seq OWNER TO u85oga;

--
-- Name: spree_adjustments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: u85oga
--

ALTER SEQUENCE spree_adjustments_id_seq OWNED BY spree_adjustments.id;


--
-- Name: spree_assets; Type: TABLE; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE TABLE spree_assets (
    id integer NOT NULL,
    viewable_id integer,
    viewable_type character varying(255),
    attachment_width integer,
    attachment_height integer,
    attachment_file_size integer,
    "position" integer,
    attachment_content_type character varying(255),
    attachment_file_name character varying(255),
    type character varying(75),
    attachment_updated_at timestamp without time zone,
    alt text,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE public.spree_assets OWNER TO u85oga;

--
-- Name: spree_assets_id_seq; Type: SEQUENCE; Schema: public; Owner: u85oga
--

CREATE SEQUENCE spree_assets_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.spree_assets_id_seq OWNER TO u85oga;

--
-- Name: spree_assets_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: u85oga
--

ALTER SEQUENCE spree_assets_id_seq OWNED BY spree_assets.id;


--
-- Name: spree_calculators; Type: TABLE; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE TABLE spree_calculators (
    id integer NOT NULL,
    type character varying(255),
    calculable_id integer,
    calculable_type character varying(255),
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    preferences text
);


ALTER TABLE public.spree_calculators OWNER TO u85oga;

--
-- Name: spree_calculators_id_seq; Type: SEQUENCE; Schema: public; Owner: u85oga
--

CREATE SEQUENCE spree_calculators_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.spree_calculators_id_seq OWNER TO u85oga;

--
-- Name: spree_calculators_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: u85oga
--

ALTER SEQUENCE spree_calculators_id_seq OWNED BY spree_calculators.id;


--
-- Name: spree_configurations; Type: TABLE; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE TABLE spree_configurations (
    id integer NOT NULL,
    name character varying(255),
    type character varying(50),
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE public.spree_configurations OWNER TO u85oga;

--
-- Name: spree_configurations_id_seq; Type: SEQUENCE; Schema: public; Owner: u85oga
--

CREATE SEQUENCE spree_configurations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.spree_configurations_id_seq OWNER TO u85oga;

--
-- Name: spree_configurations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: u85oga
--

ALTER SEQUENCE spree_configurations_id_seq OWNED BY spree_configurations.id;


--
-- Name: spree_countries; Type: TABLE; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE TABLE spree_countries (
    id integer NOT NULL,
    iso_name character varying(255),
    iso character varying(255),
    iso3 character varying(255),
    name character varying(255),
    numcode integer,
    states_required boolean DEFAULT false,
    updated_at timestamp without time zone
);


ALTER TABLE public.spree_countries OWNER TO u85oga;

--
-- Name: spree_countries_id_seq; Type: SEQUENCE; Schema: public; Owner: u85oga
--

CREATE SEQUENCE spree_countries_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.spree_countries_id_seq OWNER TO u85oga;

--
-- Name: spree_countries_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: u85oga
--

ALTER SEQUENCE spree_countries_id_seq OWNED BY spree_countries.id;


--
-- Name: spree_credit_cards; Type: TABLE; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE TABLE spree_credit_cards (
    id integer NOT NULL,
    month character varying(255),
    year character varying(255),
    cc_type character varying(255),
    last_digits character varying(255),
    address_id integer,
    gateway_customer_profile_id character varying(255),
    gateway_payment_profile_id character varying(255),
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    name character varying(255),
    user_id integer,
    payment_method_id integer
);


ALTER TABLE public.spree_credit_cards OWNER TO u85oga;

--
-- Name: spree_credit_cards_id_seq; Type: SEQUENCE; Schema: public; Owner: u85oga
--

CREATE SEQUENCE spree_credit_cards_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.spree_credit_cards_id_seq OWNER TO u85oga;

--
-- Name: spree_credit_cards_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: u85oga
--

ALTER SEQUENCE spree_credit_cards_id_seq OWNED BY spree_credit_cards.id;


--
-- Name: spree_gateways; Type: TABLE; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE TABLE spree_gateways (
    id integer NOT NULL,
    type character varying(255),
    name character varying(255),
    description text,
    active boolean DEFAULT true,
    environment character varying(255) DEFAULT 'development'::character varying,
    server character varying(255) DEFAULT 'test'::character varying,
    test_mode boolean DEFAULT true,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    preferences text
);


ALTER TABLE public.spree_gateways OWNER TO u85oga;

--
-- Name: spree_gateways_id_seq; Type: SEQUENCE; Schema: public; Owner: u85oga
--

CREATE SEQUENCE spree_gateways_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.spree_gateways_id_seq OWNER TO u85oga;

--
-- Name: spree_gateways_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: u85oga
--

ALTER SEQUENCE spree_gateways_id_seq OWNED BY spree_gateways.id;


--
-- Name: spree_inventory_units; Type: TABLE; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE TABLE spree_inventory_units (
    id integer NOT NULL,
    state character varying(255),
    variant_id integer,
    order_id integer,
    shipment_id integer,
    return_authorization_id integer,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    pending boolean DEFAULT true,
    line_item_id integer
);


ALTER TABLE public.spree_inventory_units OWNER TO u85oga;

--
-- Name: spree_inventory_units_id_seq; Type: SEQUENCE; Schema: public; Owner: u85oga
--

CREATE SEQUENCE spree_inventory_units_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.spree_inventory_units_id_seq OWNER TO u85oga;

--
-- Name: spree_inventory_units_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: u85oga
--

ALTER SEQUENCE spree_inventory_units_id_seq OWNED BY spree_inventory_units.id;


--
-- Name: spree_line_items; Type: TABLE; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE TABLE spree_line_items (
    id integer NOT NULL,
    variant_id integer,
    order_id integer,
    quantity integer NOT NULL,
    price numeric(10,2) NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    currency character varying(255),
    cost_price numeric(10,2),
    tax_category_id integer,
    adjustment_total numeric(10,2) DEFAULT 0.0,
    additional_tax_total numeric(10,2) DEFAULT 0.0,
    promo_total numeric(10,2) DEFAULT 0.0,
    included_tax_total numeric(10,2) DEFAULT 0.0 NOT NULL,
    pre_tax_amount numeric(8,2)
);


ALTER TABLE public.spree_line_items OWNER TO u85oga;

--
-- Name: spree_line_items_id_seq; Type: SEQUENCE; Schema: public; Owner: u85oga
--

CREATE SEQUENCE spree_line_items_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.spree_line_items_id_seq OWNER TO u85oga;

--
-- Name: spree_line_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: u85oga
--

ALTER SEQUENCE spree_line_items_id_seq OWNED BY spree_line_items.id;


--
-- Name: spree_log_entries; Type: TABLE; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE TABLE spree_log_entries (
    id integer NOT NULL,
    source_id integer,
    source_type character varying(255),
    details text,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE public.spree_log_entries OWNER TO u85oga;

--
-- Name: spree_log_entries_id_seq; Type: SEQUENCE; Schema: public; Owner: u85oga
--

CREATE SEQUENCE spree_log_entries_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.spree_log_entries_id_seq OWNER TO u85oga;

--
-- Name: spree_log_entries_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: u85oga
--

ALTER SEQUENCE spree_log_entries_id_seq OWNED BY spree_log_entries.id;


--
-- Name: spree_option_types; Type: TABLE; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE TABLE spree_option_types (
    id integer NOT NULL,
    name character varying(100),
    presentation character varying(100),
    "position" integer DEFAULT 0 NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE public.spree_option_types OWNER TO u85oga;

--
-- Name: spree_option_types_id_seq; Type: SEQUENCE; Schema: public; Owner: u85oga
--

CREATE SEQUENCE spree_option_types_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.spree_option_types_id_seq OWNER TO u85oga;

--
-- Name: spree_option_types_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: u85oga
--

ALTER SEQUENCE spree_option_types_id_seq OWNED BY spree_option_types.id;


--
-- Name: spree_option_types_prototypes; Type: TABLE; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE TABLE spree_option_types_prototypes (
    prototype_id integer,
    option_type_id integer
);


ALTER TABLE public.spree_option_types_prototypes OWNER TO u85oga;

--
-- Name: spree_option_values; Type: TABLE; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE TABLE spree_option_values (
    id integer NOT NULL,
    "position" integer,
    name character varying(255),
    presentation character varying(255),
    option_type_id integer,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE public.spree_option_values OWNER TO u85oga;

--
-- Name: spree_option_values_id_seq; Type: SEQUENCE; Schema: public; Owner: u85oga
--

CREATE SEQUENCE spree_option_values_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.spree_option_values_id_seq OWNER TO u85oga;

--
-- Name: spree_option_values_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: u85oga
--

ALTER SEQUENCE spree_option_values_id_seq OWNED BY spree_option_values.id;


--
-- Name: spree_option_values_variants; Type: TABLE; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE TABLE spree_option_values_variants (
    variant_id integer,
    option_value_id integer
);


ALTER TABLE public.spree_option_values_variants OWNER TO u85oga;

--
-- Name: spree_orders; Type: TABLE; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE TABLE spree_orders (
    id integer NOT NULL,
    number character varying(32),
    item_total numeric(10,2) DEFAULT 0.0 NOT NULL,
    total numeric(10,2) DEFAULT 0.0 NOT NULL,
    state character varying(255),
    adjustment_total numeric(10,2) DEFAULT 0.0 NOT NULL,
    user_id integer,
    completed_at timestamp without time zone,
    bill_address_id integer,
    ship_address_id integer,
    payment_total numeric(10,2) DEFAULT 0.0,
    shipping_method_id integer,
    shipment_state character varying(255),
    payment_state character varying(255),
    email character varying(255),
    special_instructions text,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    currency character varying(255),
    last_ip_address character varying(255),
    created_by_id integer,
    shipment_total numeric(10,2) DEFAULT 0.0 NOT NULL,
    additional_tax_total numeric(10,2) DEFAULT 0.0,
    promo_total numeric(10,2) DEFAULT 0.0,
    channel character varying(255) DEFAULT 'spree'::character varying,
    included_tax_total numeric(10,2) DEFAULT 0.0 NOT NULL,
    item_count integer DEFAULT 0,
    approver_id integer,
    approved_at timestamp without time zone,
    confirmation_delivered boolean DEFAULT false,
    considered_risky boolean DEFAULT false,
    guest_token character varying(255)
);


ALTER TABLE public.spree_orders OWNER TO u85oga;

--
-- Name: spree_orders_id_seq; Type: SEQUENCE; Schema: public; Owner: u85oga
--

CREATE SEQUENCE spree_orders_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.spree_orders_id_seq OWNER TO u85oga;

--
-- Name: spree_orders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: u85oga
--

ALTER SEQUENCE spree_orders_id_seq OWNED BY spree_orders.id;


--
-- Name: spree_orders_promotions; Type: TABLE; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE TABLE spree_orders_promotions (
    order_id integer,
    promotion_id integer
);


ALTER TABLE public.spree_orders_promotions OWNER TO u85oga;

--
-- Name: spree_payment_capture_events; Type: TABLE; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE TABLE spree_payment_capture_events (
    id integer NOT NULL,
    amount numeric(10,2) DEFAULT 0.0,
    payment_id integer,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE public.spree_payment_capture_events OWNER TO u85oga;

--
-- Name: spree_payment_capture_events_id_seq; Type: SEQUENCE; Schema: public; Owner: u85oga
--

CREATE SEQUENCE spree_payment_capture_events_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.spree_payment_capture_events_id_seq OWNER TO u85oga;

--
-- Name: spree_payment_capture_events_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: u85oga
--

ALTER SEQUENCE spree_payment_capture_events_id_seq OWNED BY spree_payment_capture_events.id;


--
-- Name: spree_payment_methods; Type: TABLE; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE TABLE spree_payment_methods (
    id integer NOT NULL,
    type character varying(255),
    name character varying(255),
    description text,
    active boolean DEFAULT true,
    environment character varying(255) DEFAULT 'development'::character varying,
    deleted_at timestamp without time zone,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    display_on character varying(255),
    auto_capture boolean,
    preferences text
);


ALTER TABLE public.spree_payment_methods OWNER TO u85oga;

--
-- Name: spree_payment_methods_id_seq; Type: SEQUENCE; Schema: public; Owner: u85oga
--

CREATE SEQUENCE spree_payment_methods_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.spree_payment_methods_id_seq OWNER TO u85oga;

--
-- Name: spree_payment_methods_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: u85oga
--

ALTER SEQUENCE spree_payment_methods_id_seq OWNED BY spree_payment_methods.id;


--
-- Name: spree_payments; Type: TABLE; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE TABLE spree_payments (
    id integer NOT NULL,
    amount numeric(10,2) DEFAULT 0.0 NOT NULL,
    order_id integer,
    source_id integer,
    source_type character varying(255),
    payment_method_id integer,
    state character varying(255),
    response_code character varying(255),
    avs_response character varying(255),
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    identifier character varying(255),
    cvv_response_code character varying(255),
    cvv_response_message character varying(255)
);


ALTER TABLE public.spree_payments OWNER TO u85oga;

--
-- Name: spree_payments_id_seq; Type: SEQUENCE; Schema: public; Owner: u85oga
--

CREATE SEQUENCE spree_payments_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.spree_payments_id_seq OWNER TO u85oga;

--
-- Name: spree_payments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: u85oga
--

ALTER SEQUENCE spree_payments_id_seq OWNED BY spree_payments.id;


--
-- Name: spree_preferences; Type: TABLE; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE TABLE spree_preferences (
    id integer NOT NULL,
    value text,
    key character varying(255),
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE public.spree_preferences OWNER TO u85oga;

--
-- Name: spree_preferences_id_seq; Type: SEQUENCE; Schema: public; Owner: u85oga
--

CREATE SEQUENCE spree_preferences_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.spree_preferences_id_seq OWNER TO u85oga;

--
-- Name: spree_preferences_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: u85oga
--

ALTER SEQUENCE spree_preferences_id_seq OWNED BY spree_preferences.id;


--
-- Name: spree_prices; Type: TABLE; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE TABLE spree_prices (
    id integer NOT NULL,
    variant_id integer NOT NULL,
    amount numeric(10,2),
    currency character varying(255),
    deleted_at timestamp without time zone
);


ALTER TABLE public.spree_prices OWNER TO u85oga;

--
-- Name: spree_prices_id_seq; Type: SEQUENCE; Schema: public; Owner: u85oga
--

CREATE SEQUENCE spree_prices_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.spree_prices_id_seq OWNER TO u85oga;

--
-- Name: spree_prices_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: u85oga
--

ALTER SEQUENCE spree_prices_id_seq OWNED BY spree_prices.id;


--
-- Name: spree_product_option_types; Type: TABLE; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE TABLE spree_product_option_types (
    id integer NOT NULL,
    "position" integer,
    product_id integer,
    option_type_id integer,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE public.spree_product_option_types OWNER TO u85oga;

--
-- Name: spree_product_option_types_id_seq; Type: SEQUENCE; Schema: public; Owner: u85oga
--

CREATE SEQUENCE spree_product_option_types_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.spree_product_option_types_id_seq OWNER TO u85oga;

--
-- Name: spree_product_option_types_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: u85oga
--

ALTER SEQUENCE spree_product_option_types_id_seq OWNED BY spree_product_option_types.id;


--
-- Name: spree_product_properties; Type: TABLE; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE TABLE spree_product_properties (
    id integer NOT NULL,
    value character varying(255),
    product_id integer,
    property_id integer,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    "position" integer DEFAULT 0
);


ALTER TABLE public.spree_product_properties OWNER TO u85oga;

--
-- Name: spree_product_properties_id_seq; Type: SEQUENCE; Schema: public; Owner: u85oga
--

CREATE SEQUENCE spree_product_properties_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.spree_product_properties_id_seq OWNER TO u85oga;

--
-- Name: spree_product_properties_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: u85oga
--

ALTER SEQUENCE spree_product_properties_id_seq OWNED BY spree_product_properties.id;


--
-- Name: spree_products; Type: TABLE; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE TABLE spree_products (
    id integer NOT NULL,
    name character varying(255) DEFAULT ''::character varying NOT NULL,
    description text,
    available_on timestamp without time zone,
    deleted_at timestamp without time zone,
    slug character varying(255),
    meta_description text,
    meta_keywords character varying(255),
    tax_category_id integer,
    shipping_category_id integer,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE public.spree_products OWNER TO u85oga;

--
-- Name: spree_products_id_seq; Type: SEQUENCE; Schema: public; Owner: u85oga
--

CREATE SEQUENCE spree_products_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.spree_products_id_seq OWNER TO u85oga;

--
-- Name: spree_products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: u85oga
--

ALTER SEQUENCE spree_products_id_seq OWNED BY spree_products.id;


--
-- Name: spree_products_promotion_rules; Type: TABLE; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE TABLE spree_products_promotion_rules (
    product_id integer,
    promotion_rule_id integer
);


ALTER TABLE public.spree_products_promotion_rules OWNER TO u85oga;

--
-- Name: spree_products_taxons; Type: TABLE; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE TABLE spree_products_taxons (
    product_id integer,
    taxon_id integer,
    id integer NOT NULL,
    "position" integer
);


ALTER TABLE public.spree_products_taxons OWNER TO u85oga;

--
-- Name: spree_products_taxons_id_seq; Type: SEQUENCE; Schema: public; Owner: u85oga
--

CREATE SEQUENCE spree_products_taxons_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.spree_products_taxons_id_seq OWNER TO u85oga;

--
-- Name: spree_products_taxons_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: u85oga
--

ALTER SEQUENCE spree_products_taxons_id_seq OWNED BY spree_products_taxons.id;


--
-- Name: spree_promotion_action_line_items; Type: TABLE; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE TABLE spree_promotion_action_line_items (
    id integer NOT NULL,
    promotion_action_id integer,
    variant_id integer,
    quantity integer DEFAULT 1
);


ALTER TABLE public.spree_promotion_action_line_items OWNER TO u85oga;

--
-- Name: spree_promotion_action_line_items_id_seq; Type: SEQUENCE; Schema: public; Owner: u85oga
--

CREATE SEQUENCE spree_promotion_action_line_items_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.spree_promotion_action_line_items_id_seq OWNER TO u85oga;

--
-- Name: spree_promotion_action_line_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: u85oga
--

ALTER SEQUENCE spree_promotion_action_line_items_id_seq OWNED BY spree_promotion_action_line_items.id;


--
-- Name: spree_promotion_actions; Type: TABLE; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE TABLE spree_promotion_actions (
    id integer NOT NULL,
    promotion_id integer,
    "position" integer,
    type character varying(255),
    deleted_at timestamp without time zone
);


ALTER TABLE public.spree_promotion_actions OWNER TO u85oga;

--
-- Name: spree_promotion_actions_id_seq; Type: SEQUENCE; Schema: public; Owner: u85oga
--

CREATE SEQUENCE spree_promotion_actions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.spree_promotion_actions_id_seq OWNER TO u85oga;

--
-- Name: spree_promotion_actions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: u85oga
--

ALTER SEQUENCE spree_promotion_actions_id_seq OWNED BY spree_promotion_actions.id;


--
-- Name: spree_promotion_rules; Type: TABLE; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE TABLE spree_promotion_rules (
    id integer NOT NULL,
    promotion_id integer,
    user_id integer,
    product_group_id integer,
    type character varying(255),
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    code character varying(255),
    preferences text
);


ALTER TABLE public.spree_promotion_rules OWNER TO u85oga;

--
-- Name: spree_promotion_rules_id_seq; Type: SEQUENCE; Schema: public; Owner: u85oga
--

CREATE SEQUENCE spree_promotion_rules_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.spree_promotion_rules_id_seq OWNER TO u85oga;

--
-- Name: spree_promotion_rules_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: u85oga
--

ALTER SEQUENCE spree_promotion_rules_id_seq OWNED BY spree_promotion_rules.id;


--
-- Name: spree_promotion_rules_users; Type: TABLE; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE TABLE spree_promotion_rules_users (
    user_id integer,
    promotion_rule_id integer
);


ALTER TABLE public.spree_promotion_rules_users OWNER TO u85oga;

--
-- Name: spree_promotions; Type: TABLE; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE TABLE spree_promotions (
    id integer NOT NULL,
    description character varying(255),
    expires_at timestamp without time zone,
    starts_at timestamp without time zone,
    name character varying(255),
    type character varying(255),
    usage_limit integer,
    match_policy character varying(255) DEFAULT 'all'::character varying,
    code character varying(255),
    advertise boolean DEFAULT false,
    path character varying(255),
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE public.spree_promotions OWNER TO u85oga;

--
-- Name: spree_promotions_id_seq; Type: SEQUENCE; Schema: public; Owner: u85oga
--

CREATE SEQUENCE spree_promotions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.spree_promotions_id_seq OWNER TO u85oga;

--
-- Name: spree_promotions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: u85oga
--

ALTER SEQUENCE spree_promotions_id_seq OWNED BY spree_promotions.id;


--
-- Name: spree_properties; Type: TABLE; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE TABLE spree_properties (
    id integer NOT NULL,
    name character varying(255),
    presentation character varying(255) NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE public.spree_properties OWNER TO u85oga;

--
-- Name: spree_properties_id_seq; Type: SEQUENCE; Schema: public; Owner: u85oga
--

CREATE SEQUENCE spree_properties_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.spree_properties_id_seq OWNER TO u85oga;

--
-- Name: spree_properties_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: u85oga
--

ALTER SEQUENCE spree_properties_id_seq OWNED BY spree_properties.id;


--
-- Name: spree_properties_prototypes; Type: TABLE; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE TABLE spree_properties_prototypes (
    prototype_id integer,
    property_id integer
);


ALTER TABLE public.spree_properties_prototypes OWNER TO u85oga;

--
-- Name: spree_prototypes; Type: TABLE; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE TABLE spree_prototypes (
    id integer NOT NULL,
    name character varying(255),
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE public.spree_prototypes OWNER TO u85oga;

--
-- Name: spree_prototypes_id_seq; Type: SEQUENCE; Schema: public; Owner: u85oga
--

CREATE SEQUENCE spree_prototypes_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.spree_prototypes_id_seq OWNER TO u85oga;

--
-- Name: spree_prototypes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: u85oga
--

ALTER SEQUENCE spree_prototypes_id_seq OWNED BY spree_prototypes.id;


--
-- Name: spree_return_authorizations; Type: TABLE; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE TABLE spree_return_authorizations (
    id integer NOT NULL,
    number character varying(255),
    state character varying(255),
    amount numeric(10,2) DEFAULT 0.0 NOT NULL,
    order_id integer,
    reason text,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    stock_location_id integer
);


ALTER TABLE public.spree_return_authorizations OWNER TO u85oga;

--
-- Name: spree_return_authorizations_id_seq; Type: SEQUENCE; Schema: public; Owner: u85oga
--

CREATE SEQUENCE spree_return_authorizations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.spree_return_authorizations_id_seq OWNER TO u85oga;

--
-- Name: spree_return_authorizations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: u85oga
--

ALTER SEQUENCE spree_return_authorizations_id_seq OWNED BY spree_return_authorizations.id;


--
-- Name: spree_roles; Type: TABLE; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE TABLE spree_roles (
    id integer NOT NULL,
    name character varying(255)
);


ALTER TABLE public.spree_roles OWNER TO u85oga;

--
-- Name: spree_roles_id_seq; Type: SEQUENCE; Schema: public; Owner: u85oga
--

CREATE SEQUENCE spree_roles_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.spree_roles_id_seq OWNER TO u85oga;

--
-- Name: spree_roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: u85oga
--

ALTER SEQUENCE spree_roles_id_seq OWNED BY spree_roles.id;


--
-- Name: spree_roles_users; Type: TABLE; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE TABLE spree_roles_users (
    role_id integer,
    user_id integer
);


ALTER TABLE public.spree_roles_users OWNER TO u85oga;

--
-- Name: spree_shipments; Type: TABLE; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE TABLE spree_shipments (
    id integer NOT NULL,
    tracking character varying(255),
    number character varying(255),
    cost numeric(8,2),
    shipped_at timestamp without time zone,
    order_id integer,
    address_id integer,
    state character varying(255),
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    stock_location_id integer,
    adjustment_total numeric(10,2) DEFAULT 0.0,
    additional_tax_total numeric(10,2) DEFAULT 0.0,
    promo_total numeric(10,2) DEFAULT 0.0,
    included_tax_total numeric(10,2) DEFAULT 0.0 NOT NULL,
    pre_tax_amount numeric(8,2)
);


ALTER TABLE public.spree_shipments OWNER TO u85oga;

--
-- Name: spree_shipments_id_seq; Type: SEQUENCE; Schema: public; Owner: u85oga
--

CREATE SEQUENCE spree_shipments_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.spree_shipments_id_seq OWNER TO u85oga;

--
-- Name: spree_shipments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: u85oga
--

ALTER SEQUENCE spree_shipments_id_seq OWNED BY spree_shipments.id;


--
-- Name: spree_shipping_categories; Type: TABLE; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE TABLE spree_shipping_categories (
    id integer NOT NULL,
    name character varying(255),
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE public.spree_shipping_categories OWNER TO u85oga;

--
-- Name: spree_shipping_categories_id_seq; Type: SEQUENCE; Schema: public; Owner: u85oga
--

CREATE SEQUENCE spree_shipping_categories_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.spree_shipping_categories_id_seq OWNER TO u85oga;

--
-- Name: spree_shipping_categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: u85oga
--

ALTER SEQUENCE spree_shipping_categories_id_seq OWNED BY spree_shipping_categories.id;


--
-- Name: spree_shipping_method_categories; Type: TABLE; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE TABLE spree_shipping_method_categories (
    id integer NOT NULL,
    shipping_method_id integer NOT NULL,
    shipping_category_id integer NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE public.spree_shipping_method_categories OWNER TO u85oga;

--
-- Name: spree_shipping_method_categories_id_seq; Type: SEQUENCE; Schema: public; Owner: u85oga
--

CREATE SEQUENCE spree_shipping_method_categories_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.spree_shipping_method_categories_id_seq OWNER TO u85oga;

--
-- Name: spree_shipping_method_categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: u85oga
--

ALTER SEQUENCE spree_shipping_method_categories_id_seq OWNED BY spree_shipping_method_categories.id;


--
-- Name: spree_shipping_methods; Type: TABLE; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE TABLE spree_shipping_methods (
    id integer NOT NULL,
    name character varying(255),
    display_on character varying(255),
    deleted_at timestamp without time zone,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    tracking_url character varying(255),
    admin_name character varying(255),
    tax_category_id integer
);


ALTER TABLE public.spree_shipping_methods OWNER TO u85oga;

--
-- Name: spree_shipping_methods_id_seq; Type: SEQUENCE; Schema: public; Owner: u85oga
--

CREATE SEQUENCE spree_shipping_methods_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.spree_shipping_methods_id_seq OWNER TO u85oga;

--
-- Name: spree_shipping_methods_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: u85oga
--

ALTER SEQUENCE spree_shipping_methods_id_seq OWNED BY spree_shipping_methods.id;


--
-- Name: spree_shipping_methods_zones; Type: TABLE; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE TABLE spree_shipping_methods_zones (
    shipping_method_id integer,
    zone_id integer
);


ALTER TABLE public.spree_shipping_methods_zones OWNER TO u85oga;

--
-- Name: spree_shipping_rates; Type: TABLE; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE TABLE spree_shipping_rates (
    id integer NOT NULL,
    shipment_id integer,
    shipping_method_id integer,
    selected boolean DEFAULT false,
    cost numeric(8,2) DEFAULT 0,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    tax_rate_id integer
);


ALTER TABLE public.spree_shipping_rates OWNER TO u85oga;

--
-- Name: spree_shipping_rates_id_seq; Type: SEQUENCE; Schema: public; Owner: u85oga
--

CREATE SEQUENCE spree_shipping_rates_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.spree_shipping_rates_id_seq OWNER TO u85oga;

--
-- Name: spree_shipping_rates_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: u85oga
--

ALTER SEQUENCE spree_shipping_rates_id_seq OWNED BY spree_shipping_rates.id;


--
-- Name: spree_skrill_transactions; Type: TABLE; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE TABLE spree_skrill_transactions (
    id integer NOT NULL,
    email character varying(255),
    amount double precision,
    currency character varying(255),
    transaction_id integer,
    customer_id integer,
    payment_type character varying(255),
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE public.spree_skrill_transactions OWNER TO u85oga;

--
-- Name: spree_skrill_transactions_id_seq; Type: SEQUENCE; Schema: public; Owner: u85oga
--

CREATE SEQUENCE spree_skrill_transactions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.spree_skrill_transactions_id_seq OWNER TO u85oga;

--
-- Name: spree_skrill_transactions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: u85oga
--

ALTER SEQUENCE spree_skrill_transactions_id_seq OWNED BY spree_skrill_transactions.id;


--
-- Name: spree_state_changes; Type: TABLE; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE TABLE spree_state_changes (
    id integer NOT NULL,
    name character varying(255),
    previous_state character varying(255),
    stateful_id integer,
    user_id integer,
    stateful_type character varying(255),
    next_state character varying(255),
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE public.spree_state_changes OWNER TO u85oga;

--
-- Name: spree_state_changes_id_seq; Type: SEQUENCE; Schema: public; Owner: u85oga
--

CREATE SEQUENCE spree_state_changes_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.spree_state_changes_id_seq OWNER TO u85oga;

--
-- Name: spree_state_changes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: u85oga
--

ALTER SEQUENCE spree_state_changes_id_seq OWNED BY spree_state_changes.id;


--
-- Name: spree_states; Type: TABLE; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE TABLE spree_states (
    id integer NOT NULL,
    name character varying(255),
    abbr character varying(255),
    country_id integer,
    updated_at timestamp without time zone
);


ALTER TABLE public.spree_states OWNER TO u85oga;

--
-- Name: spree_states_id_seq; Type: SEQUENCE; Schema: public; Owner: u85oga
--

CREATE SEQUENCE spree_states_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.spree_states_id_seq OWNER TO u85oga;

--
-- Name: spree_states_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: u85oga
--

ALTER SEQUENCE spree_states_id_seq OWNED BY spree_states.id;


--
-- Name: spree_stock_items; Type: TABLE; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE TABLE spree_stock_items (
    id integer NOT NULL,
    stock_location_id integer,
    variant_id integer,
    count_on_hand integer DEFAULT 0 NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    backorderable boolean DEFAULT false,
    deleted_at timestamp without time zone
);


ALTER TABLE public.spree_stock_items OWNER TO u85oga;

--
-- Name: spree_stock_items_id_seq; Type: SEQUENCE; Schema: public; Owner: u85oga
--

CREATE SEQUENCE spree_stock_items_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.spree_stock_items_id_seq OWNER TO u85oga;

--
-- Name: spree_stock_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: u85oga
--

ALTER SEQUENCE spree_stock_items_id_seq OWNED BY spree_stock_items.id;


--
-- Name: spree_stock_locations; Type: TABLE; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE TABLE spree_stock_locations (
    id integer NOT NULL,
    name character varying(255),
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    address1 character varying(255),
    address2 character varying(255),
    city character varying(255),
    state_id integer,
    state_name character varying(255),
    country_id integer,
    zipcode character varying(255),
    phone character varying(255),
    active boolean DEFAULT true,
    backorderable_default boolean DEFAULT false,
    propagate_all_variants boolean DEFAULT true,
    admin_name character varying(255)
);


ALTER TABLE public.spree_stock_locations OWNER TO u85oga;

--
-- Name: spree_stock_locations_id_seq; Type: SEQUENCE; Schema: public; Owner: u85oga
--

CREATE SEQUENCE spree_stock_locations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.spree_stock_locations_id_seq OWNER TO u85oga;

--
-- Name: spree_stock_locations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: u85oga
--

ALTER SEQUENCE spree_stock_locations_id_seq OWNED BY spree_stock_locations.id;


--
-- Name: spree_stock_movements; Type: TABLE; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE TABLE spree_stock_movements (
    id integer NOT NULL,
    stock_item_id integer,
    quantity integer DEFAULT 0,
    action character varying(255),
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    originator_id integer,
    originator_type character varying(255)
);


ALTER TABLE public.spree_stock_movements OWNER TO u85oga;

--
-- Name: spree_stock_movements_id_seq; Type: SEQUENCE; Schema: public; Owner: u85oga
--

CREATE SEQUENCE spree_stock_movements_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.spree_stock_movements_id_seq OWNER TO u85oga;

--
-- Name: spree_stock_movements_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: u85oga
--

ALTER SEQUENCE spree_stock_movements_id_seq OWNED BY spree_stock_movements.id;


--
-- Name: spree_stock_transfers; Type: TABLE; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE TABLE spree_stock_transfers (
    id integer NOT NULL,
    type character varying(255),
    reference character varying(255),
    source_location_id integer,
    destination_location_id integer,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    number character varying(255)
);


ALTER TABLE public.spree_stock_transfers OWNER TO u85oga;

--
-- Name: spree_stock_transfers_id_seq; Type: SEQUENCE; Schema: public; Owner: u85oga
--

CREATE SEQUENCE spree_stock_transfers_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.spree_stock_transfers_id_seq OWNER TO u85oga;

--
-- Name: spree_stock_transfers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: u85oga
--

ALTER SEQUENCE spree_stock_transfers_id_seq OWNED BY spree_stock_transfers.id;


--
-- Name: spree_stores; Type: TABLE; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE TABLE spree_stores (
    id integer NOT NULL,
    name character varying(255),
    url character varying(255),
    meta_description text,
    meta_keywords text,
    seo_title character varying(255),
    mail_from_address character varying(255),
    default_currency character varying(255),
    code character varying(255),
    "default" boolean DEFAULT false NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE public.spree_stores OWNER TO u85oga;

--
-- Name: spree_stores_id_seq; Type: SEQUENCE; Schema: public; Owner: u85oga
--

CREATE SEQUENCE spree_stores_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.spree_stores_id_seq OWNER TO u85oga;

--
-- Name: spree_stores_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: u85oga
--

ALTER SEQUENCE spree_stores_id_seq OWNED BY spree_stores.id;


--
-- Name: spree_tax_categories; Type: TABLE; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE TABLE spree_tax_categories (
    id integer NOT NULL,
    name character varying(255),
    description character varying(255),
    is_default boolean DEFAULT false,
    deleted_at timestamp without time zone,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE public.spree_tax_categories OWNER TO u85oga;

--
-- Name: spree_tax_categories_id_seq; Type: SEQUENCE; Schema: public; Owner: u85oga
--

CREATE SEQUENCE spree_tax_categories_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.spree_tax_categories_id_seq OWNER TO u85oga;

--
-- Name: spree_tax_categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: u85oga
--

ALTER SEQUENCE spree_tax_categories_id_seq OWNED BY spree_tax_categories.id;


--
-- Name: spree_tax_rates; Type: TABLE; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE TABLE spree_tax_rates (
    id integer NOT NULL,
    amount numeric(8,5),
    zone_id integer,
    tax_category_id integer,
    included_in_price boolean DEFAULT false,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    name character varying(255),
    show_rate_in_label boolean DEFAULT true,
    deleted_at timestamp without time zone
);


ALTER TABLE public.spree_tax_rates OWNER TO u85oga;

--
-- Name: spree_tax_rates_id_seq; Type: SEQUENCE; Schema: public; Owner: u85oga
--

CREATE SEQUENCE spree_tax_rates_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.spree_tax_rates_id_seq OWNER TO u85oga;

--
-- Name: spree_tax_rates_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: u85oga
--

ALTER SEQUENCE spree_tax_rates_id_seq OWNED BY spree_tax_rates.id;


--
-- Name: spree_taxonomies; Type: TABLE; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE TABLE spree_taxonomies (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    "position" integer DEFAULT 0
);


ALTER TABLE public.spree_taxonomies OWNER TO u85oga;

--
-- Name: spree_taxonomies_id_seq; Type: SEQUENCE; Schema: public; Owner: u85oga
--

CREATE SEQUENCE spree_taxonomies_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.spree_taxonomies_id_seq OWNER TO u85oga;

--
-- Name: spree_taxonomies_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: u85oga
--

ALTER SEQUENCE spree_taxonomies_id_seq OWNED BY spree_taxonomies.id;


--
-- Name: spree_taxons; Type: TABLE; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE TABLE spree_taxons (
    id integer NOT NULL,
    parent_id integer,
    "position" integer DEFAULT 0,
    name character varying(255) NOT NULL,
    permalink character varying(255),
    taxonomy_id integer,
    lft integer,
    rgt integer,
    icon_file_name character varying(255),
    icon_content_type character varying(255),
    icon_file_size integer,
    icon_updated_at timestamp without time zone,
    description text,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    meta_title character varying(255),
    meta_description character varying(255),
    meta_keywords character varying(255),
    depth integer
);


ALTER TABLE public.spree_taxons OWNER TO u85oga;

--
-- Name: spree_taxons_id_seq; Type: SEQUENCE; Schema: public; Owner: u85oga
--

CREATE SEQUENCE spree_taxons_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.spree_taxons_id_seq OWNER TO u85oga;

--
-- Name: spree_taxons_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: u85oga
--

ALTER SEQUENCE spree_taxons_id_seq OWNED BY spree_taxons.id;


--
-- Name: spree_tokenized_permissions; Type: TABLE; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE TABLE spree_tokenized_permissions (
    id integer NOT NULL,
    permissable_id integer,
    permissable_type character varying(255),
    token character varying(255),
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE public.spree_tokenized_permissions OWNER TO u85oga;

--
-- Name: spree_tokenized_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: u85oga
--

CREATE SEQUENCE spree_tokenized_permissions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.spree_tokenized_permissions_id_seq OWNER TO u85oga;

--
-- Name: spree_tokenized_permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: u85oga
--

ALTER SEQUENCE spree_tokenized_permissions_id_seq OWNED BY spree_tokenized_permissions.id;


--
-- Name: spree_trackers; Type: TABLE; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE TABLE spree_trackers (
    id integer NOT NULL,
    environment character varying(255),
    analytics_id character varying(255),
    active boolean DEFAULT true,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE public.spree_trackers OWNER TO u85oga;

--
-- Name: spree_trackers_id_seq; Type: SEQUENCE; Schema: public; Owner: u85oga
--

CREATE SEQUENCE spree_trackers_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.spree_trackers_id_seq OWNER TO u85oga;

--
-- Name: spree_trackers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: u85oga
--

ALTER SEQUENCE spree_trackers_id_seq OWNED BY spree_trackers.id;


--
-- Name: spree_users; Type: TABLE; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE TABLE spree_users (
    id integer NOT NULL,
    encrypted_password character varying(128),
    password_salt character varying(128),
    email character varying(255),
    remember_token character varying(255),
    persistence_token character varying(255),
    reset_password_token character varying(255),
    perishable_token character varying(255),
    sign_in_count integer DEFAULT 0 NOT NULL,
    failed_attempts integer DEFAULT 0 NOT NULL,
    last_request_at timestamp without time zone,
    current_sign_in_at timestamp without time zone,
    last_sign_in_at timestamp without time zone,
    current_sign_in_ip character varying(255),
    last_sign_in_ip character varying(255),
    login character varying(255),
    ship_address_id integer,
    bill_address_id integer,
    authentication_token character varying(255),
    unlock_token character varying(255),
    locked_at timestamp without time zone,
    reset_password_sent_at timestamp without time zone,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    spree_api_key character varying(48),
    remember_created_at timestamp without time zone
);


ALTER TABLE public.spree_users OWNER TO u85oga;

--
-- Name: spree_users_id_seq; Type: SEQUENCE; Schema: public; Owner: u85oga
--

CREATE SEQUENCE spree_users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.spree_users_id_seq OWNER TO u85oga;

--
-- Name: spree_users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: u85oga
--

ALTER SEQUENCE spree_users_id_seq OWNED BY spree_users.id;


--
-- Name: spree_variants; Type: TABLE; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE TABLE spree_variants (
    id integer NOT NULL,
    sku character varying(255) DEFAULT ''::character varying NOT NULL,
    weight numeric(8,2) DEFAULT 0.0,
    height numeric(8,2),
    width numeric(8,2),
    depth numeric(8,2),
    deleted_at timestamp without time zone,
    is_master boolean DEFAULT false,
    product_id integer,
    cost_price numeric(10,2),
    "position" integer,
    cost_currency character varying(255),
    track_inventory boolean DEFAULT true,
    tax_category_id integer,
    updated_at timestamp without time zone
);


ALTER TABLE public.spree_variants OWNER TO u85oga;

--
-- Name: spree_variants_id_seq; Type: SEQUENCE; Schema: public; Owner: u85oga
--

CREATE SEQUENCE spree_variants_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.spree_variants_id_seq OWNER TO u85oga;

--
-- Name: spree_variants_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: u85oga
--

ALTER SEQUENCE spree_variants_id_seq OWNED BY spree_variants.id;


--
-- Name: spree_zone_members; Type: TABLE; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE TABLE spree_zone_members (
    id integer NOT NULL,
    zoneable_id integer,
    zoneable_type character varying(255),
    zone_id integer,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE public.spree_zone_members OWNER TO u85oga;

--
-- Name: spree_zone_members_id_seq; Type: SEQUENCE; Schema: public; Owner: u85oga
--

CREATE SEQUENCE spree_zone_members_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.spree_zone_members_id_seq OWNER TO u85oga;

--
-- Name: spree_zone_members_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: u85oga
--

ALTER SEQUENCE spree_zone_members_id_seq OWNED BY spree_zone_members.id;


--
-- Name: spree_zones; Type: TABLE; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE TABLE spree_zones (
    id integer NOT NULL,
    name character varying(255),
    description character varying(255),
    default_tax boolean DEFAULT false,
    zone_members_count integer DEFAULT 0,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE public.spree_zones OWNER TO u85oga;

--
-- Name: spree_zones_id_seq; Type: SEQUENCE; Schema: public; Owner: u85oga
--

CREATE SEQUENCE spree_zones_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.spree_zones_id_seq OWNER TO u85oga;

--
-- Name: spree_zones_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: u85oga
--

ALTER SEQUENCE spree_zones_id_seq OWNED BY spree_zones.id;


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: u85oga
--

ALTER TABLE ONLY spree_addresses ALTER COLUMN id SET DEFAULT nextval('spree_addresses_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: u85oga
--

ALTER TABLE ONLY spree_adjustments ALTER COLUMN id SET DEFAULT nextval('spree_adjustments_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: u85oga
--

ALTER TABLE ONLY spree_assets ALTER COLUMN id SET DEFAULT nextval('spree_assets_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: u85oga
--

ALTER TABLE ONLY spree_calculators ALTER COLUMN id SET DEFAULT nextval('spree_calculators_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: u85oga
--

ALTER TABLE ONLY spree_configurations ALTER COLUMN id SET DEFAULT nextval('spree_configurations_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: u85oga
--

ALTER TABLE ONLY spree_countries ALTER COLUMN id SET DEFAULT nextval('spree_countries_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: u85oga
--

ALTER TABLE ONLY spree_credit_cards ALTER COLUMN id SET DEFAULT nextval('spree_credit_cards_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: u85oga
--

ALTER TABLE ONLY spree_gateways ALTER COLUMN id SET DEFAULT nextval('spree_gateways_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: u85oga
--

ALTER TABLE ONLY spree_inventory_units ALTER COLUMN id SET DEFAULT nextval('spree_inventory_units_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: u85oga
--

ALTER TABLE ONLY spree_line_items ALTER COLUMN id SET DEFAULT nextval('spree_line_items_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: u85oga
--

ALTER TABLE ONLY spree_log_entries ALTER COLUMN id SET DEFAULT nextval('spree_log_entries_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: u85oga
--

ALTER TABLE ONLY spree_option_types ALTER COLUMN id SET DEFAULT nextval('spree_option_types_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: u85oga
--

ALTER TABLE ONLY spree_option_values ALTER COLUMN id SET DEFAULT nextval('spree_option_values_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: u85oga
--

ALTER TABLE ONLY spree_orders ALTER COLUMN id SET DEFAULT nextval('spree_orders_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: u85oga
--

ALTER TABLE ONLY spree_payment_capture_events ALTER COLUMN id SET DEFAULT nextval('spree_payment_capture_events_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: u85oga
--

ALTER TABLE ONLY spree_payment_methods ALTER COLUMN id SET DEFAULT nextval('spree_payment_methods_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: u85oga
--

ALTER TABLE ONLY spree_payments ALTER COLUMN id SET DEFAULT nextval('spree_payments_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: u85oga
--

ALTER TABLE ONLY spree_preferences ALTER COLUMN id SET DEFAULT nextval('spree_preferences_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: u85oga
--

ALTER TABLE ONLY spree_prices ALTER COLUMN id SET DEFAULT nextval('spree_prices_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: u85oga
--

ALTER TABLE ONLY spree_product_option_types ALTER COLUMN id SET DEFAULT nextval('spree_product_option_types_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: u85oga
--

ALTER TABLE ONLY spree_product_properties ALTER COLUMN id SET DEFAULT nextval('spree_product_properties_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: u85oga
--

ALTER TABLE ONLY spree_products ALTER COLUMN id SET DEFAULT nextval('spree_products_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: u85oga
--

ALTER TABLE ONLY spree_products_taxons ALTER COLUMN id SET DEFAULT nextval('spree_products_taxons_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: u85oga
--

ALTER TABLE ONLY spree_promotion_action_line_items ALTER COLUMN id SET DEFAULT nextval('spree_promotion_action_line_items_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: u85oga
--

ALTER TABLE ONLY spree_promotion_actions ALTER COLUMN id SET DEFAULT nextval('spree_promotion_actions_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: u85oga
--

ALTER TABLE ONLY spree_promotion_rules ALTER COLUMN id SET DEFAULT nextval('spree_promotion_rules_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: u85oga
--

ALTER TABLE ONLY spree_promotions ALTER COLUMN id SET DEFAULT nextval('spree_promotions_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: u85oga
--

ALTER TABLE ONLY spree_properties ALTER COLUMN id SET DEFAULT nextval('spree_properties_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: u85oga
--

ALTER TABLE ONLY spree_prototypes ALTER COLUMN id SET DEFAULT nextval('spree_prototypes_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: u85oga
--

ALTER TABLE ONLY spree_return_authorizations ALTER COLUMN id SET DEFAULT nextval('spree_return_authorizations_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: u85oga
--

ALTER TABLE ONLY spree_roles ALTER COLUMN id SET DEFAULT nextval('spree_roles_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: u85oga
--

ALTER TABLE ONLY spree_shipments ALTER COLUMN id SET DEFAULT nextval('spree_shipments_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: u85oga
--

ALTER TABLE ONLY spree_shipping_categories ALTER COLUMN id SET DEFAULT nextval('spree_shipping_categories_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: u85oga
--

ALTER TABLE ONLY spree_shipping_method_categories ALTER COLUMN id SET DEFAULT nextval('spree_shipping_method_categories_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: u85oga
--

ALTER TABLE ONLY spree_shipping_methods ALTER COLUMN id SET DEFAULT nextval('spree_shipping_methods_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: u85oga
--

ALTER TABLE ONLY spree_shipping_rates ALTER COLUMN id SET DEFAULT nextval('spree_shipping_rates_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: u85oga
--

ALTER TABLE ONLY spree_skrill_transactions ALTER COLUMN id SET DEFAULT nextval('spree_skrill_transactions_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: u85oga
--

ALTER TABLE ONLY spree_state_changes ALTER COLUMN id SET DEFAULT nextval('spree_state_changes_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: u85oga
--

ALTER TABLE ONLY spree_states ALTER COLUMN id SET DEFAULT nextval('spree_states_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: u85oga
--

ALTER TABLE ONLY spree_stock_items ALTER COLUMN id SET DEFAULT nextval('spree_stock_items_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: u85oga
--

ALTER TABLE ONLY spree_stock_locations ALTER COLUMN id SET DEFAULT nextval('spree_stock_locations_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: u85oga
--

ALTER TABLE ONLY spree_stock_movements ALTER COLUMN id SET DEFAULT nextval('spree_stock_movements_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: u85oga
--

ALTER TABLE ONLY spree_stock_transfers ALTER COLUMN id SET DEFAULT nextval('spree_stock_transfers_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: u85oga
--

ALTER TABLE ONLY spree_stores ALTER COLUMN id SET DEFAULT nextval('spree_stores_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: u85oga
--

ALTER TABLE ONLY spree_tax_categories ALTER COLUMN id SET DEFAULT nextval('spree_tax_categories_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: u85oga
--

ALTER TABLE ONLY spree_tax_rates ALTER COLUMN id SET DEFAULT nextval('spree_tax_rates_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: u85oga
--

ALTER TABLE ONLY spree_taxonomies ALTER COLUMN id SET DEFAULT nextval('spree_taxonomies_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: u85oga
--

ALTER TABLE ONLY spree_taxons ALTER COLUMN id SET DEFAULT nextval('spree_taxons_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: u85oga
--

ALTER TABLE ONLY spree_tokenized_permissions ALTER COLUMN id SET DEFAULT nextval('spree_tokenized_permissions_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: u85oga
--

ALTER TABLE ONLY spree_trackers ALTER COLUMN id SET DEFAULT nextval('spree_trackers_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: u85oga
--

ALTER TABLE ONLY spree_users ALTER COLUMN id SET DEFAULT nextval('spree_users_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: u85oga
--

ALTER TABLE ONLY spree_variants ALTER COLUMN id SET DEFAULT nextval('spree_variants_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: u85oga
--

ALTER TABLE ONLY spree_zone_members ALTER COLUMN id SET DEFAULT nextval('spree_zone_members_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: u85oga
--

ALTER TABLE ONLY spree_zones ALTER COLUMN id SET DEFAULT nextval('spree_zones_id_seq'::regclass);


--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: public; Owner: u85oga
--

COPY schema_migrations (version) FROM stdin;
20140803095141
20140803095142
20140803095143
20140803095144
20140803095145
20140803095146
20140803095147
20140803095148
20140803095149
20140803095150
20140803095151
20140803095152
20140803095153
20140803095154
20140803095155
20140803095156
20140803095157
20140803095158
20140803095159
20140803095160
20140803095161
20140803095162
20140803095163
20140803095164
20140803095165
20140803095166
20140803095167
20140803095168
20140803095169
20140803095170
20140803095171
20140803095172
20140803095173
20140803095174
20140803095175
20140803095176
20140803095177
20140803095178
20140803095179
20140803095180
20140803095181
20140803095182
20140803095183
20140803095184
20140803095185
20140803095186
20140803095187
20140803095188
20140803095189
20140803095190
20140803095191
20140803095192
20140803095193
20140803095194
20140803095195
20140803095196
20140803095197
20140803095198
20140803095199
20140803095200
20140803095201
20140803095202
20140803095203
20140803095204
20140803095205
20140803095206
20140803095207
20140803095208
20140803095209
20140803095210
20140803095211
20140803095212
20140803095213
20140803095214
20140803095215
20140803095216
20140803095217
20140803095218
20140803095219
20140803095220
20140803095221
20140803095222
20140803095223
20140803095224
20140803095225
20140803095226
20140803095227
20140803095228
20140803095229
20140803095230
20140803095231
20140803095232
20140803095233
20140803095234
20140803095235
20140803095236
20140803095237
20140803095238
20140803095239
20140803095240
20140803095241
20140803095242
20140803095243
20140803095244
20140803095245
20140803095246
20140803095247
20140803095248
20140803095249
20140803095250
20140803095251
20140803095252
20140803095253
20140803095254
20140803095255
20140803095256
20140803095257
20140803095258
20140803095259
20140803095260
20140803095261
20140803095262
20140803095263
20140803095264
20140803095265
20140803095266
20140803095267
20140803095268
20140803095269
20140803095270
20140803095271
20140803095272
20140803095273
20140803095274
20140803095275
20140803095276
20140803095277
20140803095278
20140803095279
20140803095280
20140803095281
20140803095282
20140803095283
20140803095284
20140803095285
20140803095286
20140803095287
20140803095288
20140803095289
20140803095290
20140803095291
20140803095292
20140803095293
20140803095294
20140803095295
20140803095296
20140803095297
20140803095298
20140803095299
20140803095300
20140803095301
\.


--
-- Data for Name: spree_addresses; Type: TABLE DATA; Schema: public; Owner: u85oga
--

COPY spree_addresses (id, firstname, lastname, address1, address2, city, zipcode, phone, state_name, alternative_phone, company, state_id, country_id, created_at, updated_at) FROM stdin;
\.


--
-- Name: spree_addresses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: u85oga
--

SELECT pg_catalog.setval('spree_addresses_id_seq', 1, false);


--
-- Data for Name: spree_adjustments; Type: TABLE DATA; Schema: public; Owner: u85oga
--

COPY spree_adjustments (id, source_id, source_type, adjustable_id, adjustable_type, amount, label, mandatory, eligible, created_at, updated_at, state, order_id, included) FROM stdin;
\.


--
-- Name: spree_adjustments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: u85oga
--

SELECT pg_catalog.setval('spree_adjustments_id_seq', 1, false);


--
-- Data for Name: spree_assets; Type: TABLE DATA; Schema: public; Owner: u85oga
--

COPY spree_assets (id, viewable_id, viewable_type, attachment_width, attachment_height, attachment_file_size, "position", attachment_content_type, attachment_file_name, type, attachment_updated_at, alt, created_at, updated_at) FROM stdin;
1	1	Spree::Variant	1996	2700	1342688	1	image/jpeg	hsa-00001.jpg	Spree::Image	2014-08-15 00:18:38.263927	Arizona Cardinals Helmet painted in charcoal by Dave Hobrecht	2014-08-15 00:18:42.088325	2014-08-15 00:18:42.088325
\.


--
-- Name: spree_assets_id_seq; Type: SEQUENCE SET; Schema: public; Owner: u85oga
--

SELECT pg_catalog.setval('spree_assets_id_seq', 1, true);


--
-- Data for Name: spree_calculators; Type: TABLE DATA; Schema: public; Owner: u85oga
--

COPY spree_calculators (id, type, calculable_id, calculable_type, created_at, updated_at, preferences) FROM stdin;
\.


--
-- Name: spree_calculators_id_seq; Type: SEQUENCE SET; Schema: public; Owner: u85oga
--

SELECT pg_catalog.setval('spree_calculators_id_seq', 1, false);


--
-- Data for Name: spree_configurations; Type: TABLE DATA; Schema: public; Owner: u85oga
--

COPY spree_configurations (id, name, type, created_at, updated_at) FROM stdin;
\.


--
-- Name: spree_configurations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: u85oga
--

SELECT pg_catalog.setval('spree_configurations_id_seq', 1, false);


--
-- Data for Name: spree_countries; Type: TABLE DATA; Schema: public; Owner: u85oga
--

COPY spree_countries (id, iso_name, iso, iso3, name, numcode, states_required, updated_at) FROM stdin;
1	CHAD	TD	TCD	Chad	148	f	2014-08-14 09:26:27.58649
2	FAROE ISLANDS	FO	FRO	Faroe Islands	234	f	2014-08-14 09:26:27.601519
3	INDIA	IN	IND	India	356	t	2014-08-14 09:26:27.604342
4	NICARAGUA	NI	NIC	Nicaragua	558	f	2014-08-14 09:26:27.606954
5	SAINT LUCIA	LC	LCA	Saint Lucia	662	f	2014-08-14 09:26:27.609404
6	FIJI	FJ	FJI	Fiji	242	f	2014-08-14 09:26:27.612549
7	INDONESIA	ID	IDN	Indonesia	360	f	2014-08-14 09:26:27.614927
8	NIGER	NE	NER	Niger	562	f	2014-08-14 09:26:27.617394
9	SAINT PIERRE AND MIQUELON	PM	SPM	Saint Pierre and Miquelon	666	f	2014-08-14 09:26:27.619964
10	FINLAND	FI	FIN	Finland	246	f	2014-08-14 09:26:27.62217
11	NIGERIA	NG	NGA	Nigeria	566	t	2014-08-14 09:26:27.624474
12	SAINT VINCENT AND THE GRENADINES	VC	VCT	Saint Vincent and the Grenadines	670	f	2014-08-14 09:26:27.62675
13	FRANCE	FR	FRA	France	250	f	2014-08-14 09:26:27.628968
14	IRAN, ISLAMIC REPUBLIC OF	IR	IRN	Iran, Islamic Republic of	364	f	2014-08-14 09:26:27.631375
15	NIUE	NU	NIU	Niue	570	f	2014-08-14 09:26:27.633578
16	SAMOA	WS	WSM	Samoa	882	f	2014-08-14 09:26:27.635747
17	FRENCH GUIANA	GF	GUF	French Guiana	254	f	2014-08-14 09:26:27.638015
18	IRAQ	IQ	IRQ	Iraq	368	t	2014-08-14 09:26:27.640498
19	SAN MARINO	SM	SMR	San Marino	674	f	2014-08-14 09:26:27.642847
20	IRELAND	IE	IRL	Ireland	372	f	2014-08-14 09:26:27.645148
21	SAO TOME AND PRINCIPE	ST	STP	Sao Tome and Principe	678	f	2014-08-14 09:26:27.647425
22	ISRAEL	IL	ISR	Israel	376	f	2014-08-14 09:26:27.649778
23	SAUDI ARABIA	SA	SAU	Saudi Arabia	682	f	2014-08-14 09:26:27.656441
24	ITALY	IT	ITA	Italy	380	f	2014-08-14 09:26:27.658692
25	SENEGAL	SN	SEN	Senegal	686	f	2014-08-14 09:26:27.660868
26	JAMAICA	JM	JAM	Jamaica	388	f	2014-08-14 09:26:27.663025
27	JAPAN	JP	JPN	Japan	392	f	2014-08-14 09:26:27.665249
28	JORDAN	JO	JOR	Jordan	400	f	2014-08-14 09:26:27.667521
29	BELGIUM	BE	BEL	Belgium	56	f	2014-08-14 09:26:27.669723
30	BELIZE	BZ	BLZ	Belize	84	f	2014-08-14 09:26:27.681187
31	KAZAKHSTAN	KZ	KAZ	Kazakhstan	398	f	2014-08-14 09:26:27.683422
32	UGANDA	UG	UGA	Uganda	800	f	2014-08-14 09:26:27.685731
33	BENIN	BJ	BEN	Benin	204	f	2014-08-14 09:26:27.68788
34	KENYA	KE	KEN	Kenya	404	f	2014-08-14 09:26:27.690144
35	UKRAINE	UA	UKR	Ukraine	804	f	2014-08-14 09:26:27.693443
36	BERMUDA	BM	BMU	Bermuda	60	f	2014-08-14 09:26:27.6958
37	KIRIBATI	KI	KIR	Kiribati	296	f	2014-08-14 09:26:27.69806
38	MEXICO	MX	MEX	Mexico	484	t	2014-08-14 09:26:27.700263
39	UNITED ARAB EMIRATES	AE	ARE	United Arab Emirates	784	t	2014-08-14 09:26:27.702524
40	BHUTAN	BT	BTN	Bhutan	64	f	2014-08-14 09:26:27.704784
41	CUBA	CU	CUB	Cuba	192	f	2014-08-14 09:26:27.706915
42	KOREA, DEMOCRATIC PEOPLE'S REPUBLIC OF	KP	PRK	North Korea	408	f	2014-08-14 09:26:27.709059
43	MICRONESIA, FEDERATED STATES OF	FM	FSM	Micronesia, Federated States of	583	t	2014-08-14 09:26:27.711235
44	UNITED KINGDOM	GB	GBR	United Kingdom	826	f	2014-08-14 09:26:27.715063
45	BOLIVIA	BO	BOL	Bolivia	68	f	2014-08-14 09:26:27.717242
46	CYPRUS	CY	CYP	Cyprus	196	f	2014-08-14 09:26:27.719428
47	KOREA, REPUBLIC OF	KR	KOR	South Korea	410	f	2014-08-14 09:26:27.721604
48	MOLDOVA, REPUBLIC OF	MD	MDA	Moldova, Republic of	498	f	2014-08-14 09:26:27.723807
49	UNITED STATES	US	USA	United States	840	t	2014-08-14 09:26:27.726755
50	BOSNIA AND HERZEGOVINA	BA	BIH	Bosnia and Herzegovina	70	f	2014-08-14 09:26:27.728971
51	CZECH REPUBLIC	CZ	CZE	Czech Republic	203	f	2014-08-14 09:26:27.731094
52	KUWAIT	KW	KWT	Kuwait	414	f	2014-08-14 09:26:27.733313
53	MONACO	MC	MCO	Monaco	492	f	2014-08-14 09:26:27.735472
54	URUGUAY	UY	URY	Uruguay	858	f	2014-08-14 09:26:27.737727
55	BOTSWANA	BW	BWA	Botswana	72	f	2014-08-14 09:26:27.73986
56	DENMARK	DK	DNK	Denmark	208	f	2014-08-14 09:26:27.742096
57	GUADELOUPE	GP	GLP	Guadeloupe	312	f	2014-08-14 09:26:27.744334
58	KYRGYZSTAN	KG	KGZ	Kyrgyzstan	417	f	2014-08-14 09:26:27.74651
59	MONGOLIA	MN	MNG	Mongolia	496	f	2014-08-14 09:26:27.748703
60	PHILIPPINES	PH	PHL	Philippines	608	f	2014-08-14 09:26:27.750823
61	BRAZIL	BR	BRA	Brazil	76	t	2014-08-14 09:26:27.755751
62	DJIBOUTI	DJ	DJI	Djibouti	262	f	2014-08-14 09:26:27.758043
63	GUAM	GU	GUM	Guam	316	f	2014-08-14 09:26:27.760342
64	LAO PEOPLE'S DEMOCRATIC REPUBLIC	LA	LAO	Lao People's Democratic Republic	418	f	2014-08-14 09:26:27.762455
65	MONTSERRAT	MS	MSR	Montserrat	500	f	2014-08-14 09:26:27.764733
66	PITCAIRN	PN	PCN	Pitcairn	612	f	2014-08-14 09:26:27.766892
67	UZBEKISTAN	UZ	UZB	Uzbekistan	860	f	2014-08-14 09:26:27.76914
68	BRUNEI DARUSSALAM	BN	BRN	Brunei Darussalam	96	f	2014-08-14 09:26:27.805762
69	DOMINICA	DM	DMA	Dominica	212	f	2014-08-14 09:26:27.808206
70	GUATEMALA	GT	GTM	Guatemala	320	f	2014-08-14 09:26:27.810428
71	MOROCCO	MA	MAR	Morocco	504	f	2014-08-14 09:26:27.812763
72	POLAND	PL	POL	Poland	616	f	2014-08-14 09:26:27.815045
73	VANUATU	VU	VUT	Vanuatu	548	f	2014-08-14 09:26:27.817299
74	DOMINICAN REPUBLIC	DO	DOM	Dominican Republic	214	f	2014-08-14 09:26:27.819468
75	MOZAMBIQUE	MZ	MOZ	Mozambique	508	f	2014-08-14 09:26:27.821694
76	PORTUGAL	PT	PRT	Portugal	620	f	2014-08-14 09:26:27.823921
77	SUDAN	SD	SDN	Sudan	736	t	2014-08-14 09:26:27.826105
78	VENEZUELA	VE	VEN	Venezuela	862	t	2014-08-14 09:26:27.828396
79	ECUADOR	EC	ECU	Ecuador	218	f	2014-08-14 09:26:27.830594
80	GUINEA	GN	GIN	Guinea	324	f	2014-08-14 09:26:27.832852
81	MYANMAR	MM	MMR	Myanmar	104	f	2014-08-14 09:26:27.835069
82	PUERTO RICO	PR	PRI	Puerto Rico	630	f	2014-08-14 09:26:27.837267
83	SURINAME	SR	SUR	Suriname	740	f	2014-08-14 09:26:27.839433
84	VIET NAM	VN	VNM	Viet Nam	704	f	2014-08-14 09:26:27.841609
85	EGYPT	EG	EGY	Egypt	818	f	2014-08-14 09:26:27.843782
86	GUINEA-BISSAU	GW	GNB	Guinea-Bissau	624	f	2014-08-14 09:26:27.84605
87	NAMIBIA	NA	NAM	Namibia	516	f	2014-08-14 09:26:27.84826
88	QATAR	QA	QAT	Qatar	634	f	2014-08-14 09:26:27.850411
89	SVALBARD AND JAN MAYEN	SJ	SJM	Svalbard and Jan Mayen	744	f	2014-08-14 09:26:27.852648
90	EL SALVADOR	SV	SLV	El Salvador	222	f	2014-08-14 09:26:27.854868
91	GUYANA	GY	GUY	Guyana	328	f	2014-08-14 09:26:27.857068
92	REUNION	RE	REU	Reunion	638	f	2014-08-14 09:26:27.85921
93	HAITI	HT	HTI	Haiti	332	f	2014-08-14 09:26:27.861395
94	ROMANIA	RO	ROU	Romania	642	f	2014-08-14 09:26:27.863579
95	SWAZILAND	SZ	SWZ	Swaziland	748	f	2014-08-14 09:26:27.882009
96	HOLY SEE (VATICAN CITY STATE)	VA	VAT	Holy See (Vatican City State)	336	f	2014-08-14 09:26:27.884302
97	RUSSIAN FEDERATION	RU	RUS	Russian Federation	643	t	2014-08-14 09:26:27.886544
98	SWEDEN	SE	SWE	Sweden	752	f	2014-08-14 09:26:27.888805
99	HONDURAS	HN	HND	Honduras	340	f	2014-08-14 09:26:27.891059
100	RWANDA	RW	RWA	Rwanda	646	f	2014-08-14 09:26:27.893292
101	SWITZERLAND	CH	CHE	Switzerland	756	f	2014-08-14 09:26:27.895421
102	HONG KONG	HK	HKG	Hong Kong	344	f	2014-08-14 09:26:27.898554
103	SYRIAN ARAB REPUBLIC	SY	SYR	Syrian Arab Republic	760	f	2014-08-14 09:26:27.900776
104	TAIWAN, PROVINCE OF CHINA	TW	TWN	Taiwan	158	f	2014-08-14 09:26:27.902845
105	TAJIKISTAN	TJ	TJK	Tajikistan	762	f	2014-08-14 09:26:27.905074
106	TANZANIA, UNITED REPUBLIC OF	TZ	TZA	Tanzania, United Republic of	834	f	2014-08-14 09:26:27.90717
107	ARMENIA	AM	ARM	Armenia	51	f	2014-08-14 09:26:27.909385
108	ARUBA	AW	ABW	Aruba	533	f	2014-08-14 09:26:27.911514
109	AUSTRALIA	AU	AUS	Australia	36	t	2014-08-14 09:26:27.913768
110	THAILAND	TH	THA	Thailand	764	f	2014-08-14 09:26:27.915972
111	AUSTRIA	AT	AUT	Austria	40	f	2014-08-14 09:26:27.91809
112	MADAGASCAR	MG	MDG	Madagascar	450	f	2014-08-14 09:26:27.920345
113	TOGO	TG	TGO	Togo	768	f	2014-08-14 09:26:27.922516
114	AZERBAIJAN	AZ	AZE	Azerbaijan	31	f	2014-08-14 09:26:27.924641
115	CHILE	CL	CHL	Chile	152	f	2014-08-14 09:26:27.927551
116	MALAWI	MW	MWI	Malawi	454	f	2014-08-14 09:26:27.929749
117	TOKELAU	TK	TKL	Tokelau	772	f	2014-08-14 09:26:27.931969
118	BAHAMAS	BS	BHS	Bahamas	44	f	2014-08-14 09:26:27.934158
119	CHINA	CN	CHN	China	156	f	2014-08-14 09:26:27.936305
120	MALAYSIA	MY	MYS	Malaysia	458	f	2014-08-14 09:26:27.938408
121	TONGA	TO	TON	Tonga	776	f	2014-08-14 09:26:27.940547
122	BAHRAIN	BH	BHR	Bahrain	48	f	2014-08-14 09:26:27.942679
123	COLOMBIA	CO	COL	Colombia	170	f	2014-08-14 09:26:27.944862
124	MALDIVES	MV	MDV	Maldives	462	f	2014-08-14 09:26:27.947067
125	TRINIDAD AND TOBAGO	TT	TTO	Trinidad and Tobago	780	f	2014-08-14 09:26:27.949251
126	BANGLADESH	BD	BGD	Bangladesh	50	f	2014-08-14 09:26:27.951468
127	COMOROS	KM	COM	Comoros	174	t	2014-08-14 09:26:27.953658
128	FRENCH POLYNESIA	PF	PYF	French Polynesia	258	f	2014-08-14 09:26:27.955864
129	MALI	ML	MLI	Mali	466	f	2014-08-14 09:26:27.958052
130	NORFOLK ISLAND	NF	NFK	Norfolk Island	574	f	2014-08-14 09:26:27.960273
131	TUNISIA	TN	TUN	Tunisia	788	f	2014-08-14 09:26:27.96242
132	BARBADOS	BB	BRB	Barbados	52	f	2014-08-14 09:26:27.964622
133	CONGO	CG	COG	Congo	178	f	2014-08-14 09:26:27.966772
134	GABON	GA	GAB	Gabon	266	f	2014-08-14 09:26:27.96892
135	MALTA	MT	MLT	Malta	470	f	2014-08-14 09:26:27.971115
136	NORTHERN MARIANA ISLANDS	MP	MNP	Northern Mariana Islands	580	f	2014-08-14 09:26:27.973322
137	TURKEY	TR	TUR	Turkey	792	f	2014-08-14 09:26:27.981118
138	CONGO, THE DEMOCRATIC REPUBLIC OF THE	CD	COD	Congo, the Democratic Republic of the	180	f	2014-08-14 09:26:27.983315
139	MARSHALL ISLANDS	MH	MHL	Marshall Islands	584	f	2014-08-14 09:26:27.985517
140	NORWAY	NO	NOR	Norway	578	f	2014-08-14 09:26:27.987846
141	TURKMENISTAN	TM	TKM	Turkmenistan	795	f	2014-08-14 09:26:27.99008
142	BELARUS	BY	BLR	Belarus	112	f	2014-08-14 09:26:27.992333
143	COOK ISLANDS	CK	COK	Cook Islands	184	f	2014-08-14 09:26:27.994967
144	GAMBIA	GM	GMB	Gambia	270	f	2014-08-14 09:26:27.997245
145	MARTINIQUE	MQ	MTQ	Martinique	474	f	2014-08-14 09:26:27.999548
146	OMAN	OM	OMN	Oman	512	f	2014-08-14 09:26:28.007133
147	SEYCHELLES	SC	SYC	Seychelles	690	f	2014-08-14 09:26:28.014332
148	TURKS AND CAICOS ISLANDS	TC	TCA	Turks and Caicos Islands	796	f	2014-08-14 09:26:28.018749
149	GEORGIA	GE	GEO	Georgia	268	f	2014-08-14 09:26:28.024532
150	MAURITANIA	MR	MRT	Mauritania	478	f	2014-08-14 09:26:28.026791
151	PAKISTAN	PK	PAK	Pakistan	586	t	2014-08-14 09:26:28.03324
152	SIERRA LEONE	SL	SLE	Sierra Leone	694	f	2014-08-14 09:26:28.035449
153	TUVALU	TV	TUV	Tuvalu	798	f	2014-08-14 09:26:28.039159
154	COSTA RICA	CR	CRI	Costa Rica	188	f	2014-08-14 09:26:28.045466
155	GERMANY	DE	DEU	Germany	276	f	2014-08-14 09:26:28.047686
156	MAURITIUS	MU	MUS	Mauritius	480	f	2014-08-14 09:26:28.052783
157	PALAU	PW	PLW	Palau	585	f	2014-08-14 09:26:28.05562
158	COTE D'IVOIRE	CI	CIV	Cote D'Ivoire	384	f	2014-08-14 09:26:28.059514
159	PANAMA	PA	PAN	Panama	591	f	2014-08-14 09:26:28.062176
160	SINGAPORE	SG	SGP	Singapore	702	f	2014-08-14 09:26:28.064679
161	CROATIA	HR	HRV	Croatia	191	f	2014-08-14 09:26:28.066961
162	GHANA	GH	GHA	Ghana	288	f	2014-08-14 09:26:28.069282
163	PAPUA NEW GUINEA	PG	PNG	Papua New Guinea	598	f	2014-08-14 09:26:28.071781
164	SLOVAKIA	SK	SVK	Slovakia	703	f	2014-08-14 09:26:28.081214
165	GIBRALTAR	GI	GIB	Gibraltar	292	f	2014-08-14 09:26:28.083547
166	PARAGUAY	PY	PRY	Paraguay	600	f	2014-08-14 09:26:28.087639
167	SLOVENIA	SI	SVN	Slovenia	705	f	2014-08-14 09:26:28.090439
168	GREECE	GR	GRC	Greece	300	f	2014-08-14 09:26:28.094591
169	PERU	PE	PER	Peru	604	f	2014-08-14 09:26:28.097494
170	SOLOMON ISLANDS	SB	SLB	Solomon Islands	90	f	2014-08-14 09:26:28.099746
171	GREENLAND	GL	GRL	Greenland	304	f	2014-08-14 09:26:28.102075
172	SOMALIA	SO	SOM	Somalia	706	t	2014-08-14 09:26:28.104571
173	GRENADA	GD	GRD	Grenada	308	f	2014-08-14 09:26:28.106724
174	SOUTH AFRICA	ZA	ZAF	South Africa	710	f	2014-08-14 09:26:28.108968
175	SPAIN	ES	ESP	Spain	724	f	2014-08-14 09:26:28.111317
176	SRI LANKA	LK	LKA	Sri Lanka	144	f	2014-08-14 09:26:28.113647
177	AFGHANISTAN	AF	AFG	Afghanistan	4	f	2014-08-14 09:26:28.115944
178	ALBANIA	AL	ALB	Albania	8	f	2014-08-14 09:26:28.118034
179	ALGERIA	DZ	DZA	Algeria	12	f	2014-08-14 09:26:28.120242
180	LATVIA	LV	LVA	Latvia	428	f	2014-08-14 09:26:28.122485
181	AMERICAN SAMOA	AS	ASM	American Samoa	16	f	2014-08-14 09:26:28.124734
182	BULGARIA	BG	BGR	Bulgaria	100	f	2014-08-14 09:26:28.127638
183	LEBANON	LB	LBN	Lebanon	422	f	2014-08-14 09:26:28.129987
184	ANDORRA	AD	AND	Andorra	20	f	2014-08-14 09:26:28.132321
185	BURKINA FASO	BF	BFA	Burkina Faso	854	f	2014-08-14 09:26:28.136635
186	LESOTHO	LS	LSO	Lesotho	426	f	2014-08-14 09:26:28.141112
187	ANGOLA	AO	AGO	Angola	24	f	2014-08-14 09:26:28.14896
188	BURUNDI	BI	BDI	Burundi	108	f	2014-08-14 09:26:28.154424
189	LIBERIA	LR	LBR	Liberia	430	f	2014-08-14 09:26:28.160995
190	VIRGIN ISLANDS, BRITISH	VG	VGB	Virgin Islands, British	92	f	2014-08-14 09:26:28.167796
191	ANGUILLA	AI	AIA	Anguilla	660	f	2014-08-14 09:26:28.174068
192	CAMBODIA	KH	KHM	Cambodia	116	f	2014-08-14 09:26:28.181735
193	EQUATORIAL GUINEA	GQ	GNQ	Equatorial Guinea	226	f	2014-08-14 09:26:28.191069
194	LIBYAN ARAB JAMAHIRIYA	LY	LBY	Libyan Arab Jamahiriya	434	f	2014-08-14 09:26:28.196678
195	NAURU	NR	NRU	Nauru	520	f	2014-08-14 09:26:28.201021
196	VIRGIN ISLANDS, U.S.	VI	VIR	Virgin Islands, U.S.	850	f	2014-08-14 09:26:28.205416
197	ANTIGUA AND BARBUDA	AG	ATG	Antigua and Barbuda	28	f	2014-08-14 09:26:28.209678
198	CAMEROON	CM	CMR	Cameroon	120	f	2014-08-14 09:26:28.214117
199	LIECHTENSTEIN	LI	LIE	Liechtenstein	438	f	2014-08-14 09:26:28.218899
200	NEPAL	NP	NPL	Nepal	524	t	2014-08-14 09:26:28.223357
201	WALLIS AND FUTUNA	WF	WLF	Wallis and Futuna	876	f	2014-08-14 09:26:28.228082
202	WESTERN SAHARA	EH	ESH	Western Sahara	732	f	2014-08-14 09:26:28.232601
203	ARGENTINA	AR	ARG	Argentina	32	f	2014-08-14 09:26:28.237326
204	CANADA	CA	CAN	Canada	124	t	2014-08-14 09:26:28.241984
205	ERITREA	ER	ERI	Eritrea	232	f	2014-08-14 09:26:28.246842
206	LITHUANIA	LT	LTU	Lithuania	440	f	2014-08-14 09:26:28.25225
207	NETHERLANDS	NL	NLD	Netherlands	528	f	2014-08-14 09:26:28.257029
208	YEMEN	YE	YEM	Yemen	887	f	2014-08-14 09:26:28.261711
209	CAPE VERDE	CV	CPV	Cape Verde	132	f	2014-08-14 09:26:28.266196
210	ESTONIA	EE	EST	Estonia	233	f	2014-08-14 09:26:28.270869
211	LUXEMBOURG	LU	LUX	Luxembourg	442	f	2014-08-14 09:26:28.275218
212	NETHERLANDS ANTILLES	AN	ANT	Netherlands Antilles	530	f	2014-08-14 09:26:28.282071
213	SAINT HELENA	SH	SHN	Saint Helena	654	f	2014-08-14 09:26:28.28646
214	ZAMBIA	ZM	ZMB	Zambia	894	f	2014-08-14 09:26:28.291002
215	CAYMAN ISLANDS	KY	CYM	Cayman Islands	136	f	2014-08-14 09:26:28.295614
216	ETHIOPIA	ET	ETH	Ethiopia	231	t	2014-08-14 09:26:28.300263
217	HUNGARY	HU	HUN	Hungary	348	f	2014-08-14 09:26:28.302485
218	MACAO	MO	MAC	Macao	446	f	2014-08-14 09:26:28.304634
219	NEW CALEDONIA	NC	NCL	New Caledonia	540	f	2014-08-14 09:26:28.306786
220	ZIMBABWE	ZW	ZWE	Zimbabwe	716	f	2014-08-14 09:26:28.309816
221	CENTRAL AFRICAN REPUBLIC	CF	CAF	Central African Republic	140	f	2014-08-14 09:26:28.313888
222	FALKLAND ISLANDS (MALVINAS)	FK	FLK	Falkland Islands (Malvinas)	238	f	2014-08-14 09:26:28.317996
223	ICELAND	IS	ISL	Iceland	352	f	2014-08-14 09:26:28.32205
224	MACEDONIA, THE FORMER YUGOSLAV REPUBLIC OF	MK	MKD	Macedonia	807	f	2014-08-14 09:26:28.325476
225	NEW ZEALAND	NZ	NZL	New Zealand	554	f	2014-08-14 09:26:28.328616
226	SAINT KITTS AND NEVIS	KN	KNA	Saint Kitts and Nevis	659	t	2014-08-14 09:26:28.330791
227	SERBIA	RS	SRB	Serbia	999	f	2014-08-14 09:26:28.333036
228	MONTENEGRO	ME	MNE	Montenegro	499	f	2014-08-14 09:26:28.335161
\.


--
-- Name: spree_countries_id_seq; Type: SEQUENCE SET; Schema: public; Owner: u85oga
--

SELECT pg_catalog.setval('spree_countries_id_seq', 228, true);


--
-- Data for Name: spree_credit_cards; Type: TABLE DATA; Schema: public; Owner: u85oga
--

COPY spree_credit_cards (id, month, year, cc_type, last_digits, address_id, gateway_customer_profile_id, gateway_payment_profile_id, created_at, updated_at, name, user_id, payment_method_id) FROM stdin;
\.


--
-- Name: spree_credit_cards_id_seq; Type: SEQUENCE SET; Schema: public; Owner: u85oga
--

SELECT pg_catalog.setval('spree_credit_cards_id_seq', 1, false);


--
-- Data for Name: spree_gateways; Type: TABLE DATA; Schema: public; Owner: u85oga
--

COPY spree_gateways (id, type, name, description, active, environment, server, test_mode, created_at, updated_at, preferences) FROM stdin;
\.


--
-- Name: spree_gateways_id_seq; Type: SEQUENCE SET; Schema: public; Owner: u85oga
--

SELECT pg_catalog.setval('spree_gateways_id_seq', 1, false);


--
-- Data for Name: spree_inventory_units; Type: TABLE DATA; Schema: public; Owner: u85oga
--

COPY spree_inventory_units (id, state, variant_id, order_id, shipment_id, return_authorization_id, created_at, updated_at, pending, line_item_id) FROM stdin;
\.


--
-- Name: spree_inventory_units_id_seq; Type: SEQUENCE SET; Schema: public; Owner: u85oga
--

SELECT pg_catalog.setval('spree_inventory_units_id_seq', 1, false);


--
-- Data for Name: spree_line_items; Type: TABLE DATA; Schema: public; Owner: u85oga
--

COPY spree_line_items (id, variant_id, order_id, quantity, price, created_at, updated_at, currency, cost_price, tax_category_id, adjustment_total, additional_tax_total, promo_total, included_tax_total, pre_tax_amount) FROM stdin;
\.


--
-- Name: spree_line_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: u85oga
--

SELECT pg_catalog.setval('spree_line_items_id_seq', 1, false);


--
-- Data for Name: spree_log_entries; Type: TABLE DATA; Schema: public; Owner: u85oga
--

COPY spree_log_entries (id, source_id, source_type, details, created_at, updated_at) FROM stdin;
\.


--
-- Name: spree_log_entries_id_seq; Type: SEQUENCE SET; Schema: public; Owner: u85oga
--

SELECT pg_catalog.setval('spree_log_entries_id_seq', 1, false);


--
-- Data for Name: spree_option_types; Type: TABLE DATA; Schema: public; Owner: u85oga
--

COPY spree_option_types (id, name, presentation, "position", created_at, updated_at) FROM stdin;
1	size	Size	0	2014-08-14 23:07:07.606495	2014-08-14 23:07:42.153741
\.


--
-- Name: spree_option_types_id_seq; Type: SEQUENCE SET; Schema: public; Owner: u85oga
--

SELECT pg_catalog.setval('spree_option_types_id_seq', 1, true);


--
-- Data for Name: spree_option_types_prototypes; Type: TABLE DATA; Schema: public; Owner: u85oga
--

COPY spree_option_types_prototypes (prototype_id, option_type_id) FROM stdin;
1	1
\.


--
-- Data for Name: spree_option_values; Type: TABLE DATA; Schema: public; Owner: u85oga
--

COPY spree_option_values (id, "position", name, presentation, option_type_id, created_at, updated_at) FROM stdin;
1	1	large	Large	1	2014-08-14 23:07:42.109254	2014-08-14 23:07:42.109254
2	2	medium	Medium	1	2014-08-14 23:07:42.135182	2014-08-14 23:07:42.135182
3	3	small	Small	1	2014-08-14 23:07:42.143365	2014-08-14 23:07:42.143365
4	4	wood	Wood	1	2014-08-14 23:07:42.151048	2014-08-14 23:07:42.151048
\.


--
-- Name: spree_option_values_id_seq; Type: SEQUENCE SET; Schema: public; Owner: u85oga
--

SELECT pg_catalog.setval('spree_option_values_id_seq', 4, true);


--
-- Data for Name: spree_option_values_variants; Type: TABLE DATA; Schema: public; Owner: u85oga
--

COPY spree_option_values_variants (variant_id, option_value_id) FROM stdin;
2	1
3	2
4	3
5	4
7	1
8	2
9	3
10	4
12	1
13	2
14	3
15	4
17	1
18	2
19	3
20	4
22	1
23	2
24	3
25	4
27	1
28	2
29	3
30	4
32	1
33	2
34	3
35	4
37	1
38	2
39	3
40	4
42	1
43	2
44	3
45	4
47	1
48	2
49	3
50	4
52	1
53	2
54	3
55	4
57	1
58	2
59	3
60	4
62	1
63	2
64	3
65	4
67	1
68	2
69	3
70	4
\.


--
-- Data for Name: spree_orders; Type: TABLE DATA; Schema: public; Owner: u85oga
--

COPY spree_orders (id, number, item_total, total, state, adjustment_total, user_id, completed_at, bill_address_id, ship_address_id, payment_total, shipping_method_id, shipment_state, payment_state, email, special_instructions, created_at, updated_at, currency, last_ip_address, created_by_id, shipment_total, additional_tax_total, promo_total, channel, included_tax_total, item_count, approver_id, approved_at, confirmation_delivered, considered_risky, guest_token) FROM stdin;
\.


--
-- Name: spree_orders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: u85oga
--

SELECT pg_catalog.setval('spree_orders_id_seq', 1, false);


--
-- Data for Name: spree_orders_promotions; Type: TABLE DATA; Schema: public; Owner: u85oga
--

COPY spree_orders_promotions (order_id, promotion_id) FROM stdin;
\.


--
-- Data for Name: spree_payment_capture_events; Type: TABLE DATA; Schema: public; Owner: u85oga
--

COPY spree_payment_capture_events (id, amount, payment_id, created_at, updated_at) FROM stdin;
\.


--
-- Name: spree_payment_capture_events_id_seq; Type: SEQUENCE SET; Schema: public; Owner: u85oga
--

SELECT pg_catalog.setval('spree_payment_capture_events_id_seq', 1, false);


--
-- Data for Name: spree_payment_methods; Type: TABLE DATA; Schema: public; Owner: u85oga
--

COPY spree_payment_methods (id, type, name, description, active, environment, deleted_at, created_at, updated_at, display_on, auto_capture, preferences) FROM stdin;
\.


--
-- Name: spree_payment_methods_id_seq; Type: SEQUENCE SET; Schema: public; Owner: u85oga
--

SELECT pg_catalog.setval('spree_payment_methods_id_seq', 1, false);


--
-- Data for Name: spree_payments; Type: TABLE DATA; Schema: public; Owner: u85oga
--

COPY spree_payments (id, amount, order_id, source_id, source_type, payment_method_id, state, response_code, avs_response, created_at, updated_at, identifier, cvv_response_code, cvv_response_message) FROM stdin;
\.


--
-- Name: spree_payments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: u85oga
--

SELECT pg_catalog.setval('spree_payments_id_seq', 1, false);


--
-- Data for Name: spree_preferences; Type: TABLE DATA; Schema: public; Owner: u85oga
--

COPY spree_preferences (id, value, key, created_at, updated_at) FROM stdin;
1	--- 49\n...\n	spree/app_configuration/default_country_id	2014-08-14 09:26:28.364365	2014-08-14 09:26:28.364365
2	--- true\n...\n	spree/app_configuration/allow_ssl_in_production	2014-08-14 09:29:13.274529	2014-08-14 09:29:13.274529
3	--- true\n...\n	spree/app_configuration/allow_ssl_in_staging	2014-08-14 09:29:13.284591	2014-08-14 09:29:13.284591
4	--- false\n...\n	spree/app_configuration/allow_ssl_in_development_and_test	2014-08-14 09:29:13.289452	2014-08-14 09:29:13.289452
5	--- true\n...\n	spree/app_configuration/check_for_spree_alerts	2014-08-14 09:29:13.293913	2014-08-14 09:29:13.293913
6	--- false\n...\n	spree/app_configuration/display_currency	2014-08-14 09:29:13.298246	2014-08-14 09:29:13.298246
7	--- true\n...\n	spree/app_configuration/hide_cents	2014-08-14 09:29:13.30252	2014-08-14 09:29:13.30252
8	--- USD\n...\n	spree/app_configuration/currency	2014-08-14 09:29:13.30699	2014-08-14 09:29:13.30699
9	--- before\n...\n	spree/app_configuration/currency_symbol_position	2014-08-14 09:29:13.311915	2014-08-14 09:29:13.311915
10	--- "."\n	spree/app_configuration/currency_decimal_mark	2014-08-14 09:29:13.316777	2014-08-14 09:29:13.316777
11	--- ","\n	spree/app_configuration/currency_thousands_separator	2014-08-14 09:29:13.321453	2014-08-14 09:29:13.321453
\.


--
-- Name: spree_preferences_id_seq; Type: SEQUENCE SET; Schema: public; Owner: u85oga
--

SELECT pg_catalog.setval('spree_preferences_id_seq', 11, true);


--
-- Data for Name: spree_prices; Type: TABLE DATA; Schema: public; Owner: u85oga
--

COPY spree_prices (id, variant_id, amount, currency, deleted_at) FROM stdin;
5	5	29.00	USD	\N
2	2	595.00	USD	\N
3	3	325.00	USD	\N
4	4	150.00	USD	\N
1	1	150.00	USD	\N
6	6	150.00	USD	\N
9	9	150.00	USD	\N
7	7	595.00	USD	\N
8	8	325.00	USD	\N
10	10	29.00	USD	\N
11	11	150.00	USD	\N
14	14	150.00	USD	\N
12	12	595.00	USD	\N
13	13	325.00	USD	\N
15	15	29.00	USD	\N
16	16	150.00	USD	2014-08-15 02:56:26.265619
17	17	150.00	USD	2014-08-15 02:56:26.312929
18	18	150.00	USD	2014-08-15 02:56:26.345231
19	19	150.00	USD	2014-08-15 02:56:26.376624
20	20	150.00	USD	2014-08-15 02:56:26.417501
21	21	150.00	USD	\N
24	24	150.00	USD	\N
22	22	595.00	USD	\N
23	23	325.00	USD	\N
25	25	29.00	USD	\N
26	26	150.00	USD	\N
29	29	150.00	USD	\N
27	27	595.00	USD	\N
28	28	325.00	USD	\N
30	30	29.00	USD	\N
31	31	150.00	USD	\N
34	34	150.00	USD	\N
32	32	595.00	USD	\N
33	33	325.00	USD	\N
35	35	29.00	USD	\N
36	36	150.00	USD	\N
39	39	150.00	USD	\N
37	37	595.00	USD	\N
38	38	325.00	USD	\N
40	40	29.00	USD	\N
41	41	150.00	USD	\N
44	44	150.00	USD	\N
45	45	150.00	USD	\N
42	42	595.00	USD	\N
43	43	325.00	USD	\N
46	46	150.00	USD	\N
49	49	150.00	USD	\N
47	47	595.00	USD	\N
48	48	325.00	USD	\N
50	50	29.00	USD	\N
51	51	150.00	USD	\N
54	54	150.00	USD	\N
52	52	595.00	USD	\N
53	53	325.00	USD	\N
55	55	29.00	USD	\N
56	56	150.00	USD	\N
59	59	150.00	USD	\N
57	57	595.00	USD	\N
58	58	325.00	USD	\N
60	60	29.00	USD	\N
61	61	150.00	USD	\N
64	64	150.00	USD	\N
62	62	595.00	USD	\N
63	63	325.00	USD	\N
65	65	29.00	USD	\N
66	66	150.00	USD	\N
69	69	150.00	USD	\N
70	70	150.00	USD	\N
67	67	595.00	USD	\N
68	68	325.00	USD	\N
\.


--
-- Name: spree_prices_id_seq; Type: SEQUENCE SET; Schema: public; Owner: u85oga
--

SELECT pg_catalog.setval('spree_prices_id_seq', 70, true);


--
-- Data for Name: spree_product_option_types; Type: TABLE DATA; Schema: public; Owner: u85oga
--

COPY spree_product_option_types (id, "position", product_id, option_type_id, created_at, updated_at) FROM stdin;
1	1	1	1	2014-08-15 00:10:08.557608	2014-08-15 00:10:08.557608
2	1	2	1	2014-08-15 00:31:20.79255	2014-08-15 00:31:20.79255
3	1	3	1	2014-08-15 00:38:21.756657	2014-08-15 00:38:21.756657
5	1	5	1	2014-08-15 02:56:52.667787	2014-08-15 02:56:52.667787
6	1	6	1	2014-08-15 03:01:04.667671	2014-08-15 03:01:04.667671
7	1	7	1	2014-08-15 03:06:35.492164	2014-08-15 03:06:35.492164
8	1	8	1	2014-08-15 03:15:37.839984	2014-08-15 03:15:37.839984
9	1	9	1	2014-08-15 03:22:53.930917	2014-08-15 03:22:53.930917
10	1	10	1	2014-08-15 03:26:54.582356	2014-08-15 03:26:54.582356
11	1	11	1	2014-08-15 03:34:06.210201	2014-08-15 03:34:06.210201
12	1	12	1	2014-08-15 03:44:33.899598	2014-08-15 03:44:33.899598
13	1	13	1	2014-08-15 03:53:56.207838	2014-08-15 03:53:56.207838
14	1	14	1	2014-08-15 04:58:35.286289	2014-08-15 04:58:35.286289
\.


--
-- Name: spree_product_option_types_id_seq; Type: SEQUENCE SET; Schema: public; Owner: u85oga
--

SELECT pg_catalog.setval('spree_product_option_types_id_seq', 14, true);


--
-- Data for Name: spree_product_properties; Type: TABLE DATA; Schema: public; Owner: u85oga
--

COPY spree_product_properties (id, value, product_id, property_id, created_at, updated_at, "position") FROM stdin;
\.


--
-- Name: spree_product_properties_id_seq; Type: SEQUENCE SET; Schema: public; Owner: u85oga
--

SELECT pg_catalog.setval('spree_product_properties_id_seq', 1, false);


--
-- Data for Name: spree_products; Type: TABLE DATA; Schema: public; Owner: u85oga
--

COPY spree_products (id, name, description, available_on, deleted_at, slug, meta_description, meta_keywords, tax_category_id, shipping_category_id, created_at, updated_at) FROM stdin;
2	Bo Jackson "Final Day" 		2014-08-14 00:00:00	\N	bo-jackson-final-day			\N	1	2014-08-15 00:31:20.728639	2014-08-15 00:36:28.156176
1	Arizona Cardinals Helmet	In this piece, Hobrecht takes a new and unique approach by blurring the focus of the painting and detailing in the background of an Arizona Cardinals game. The original painting was auctioned off at a charity event, and was signed by all the Cardinal players.	2014-08-14 00:00:00	\N	arizona-cardinals-helmet			\N	1	2014-08-15 00:10:08.38637	2014-08-15 00:25:33.128501
13	Gridiron Knights	Painted after the style of old bulb flash photography, "Gridiron Knights" focuses on 1950s college football. The piece shows one of the biggest victories in LSU's history; LSU vs. Ole Miss. 	2014-08-14 00:00:00	\N	gridiron-knights			\N	1	2014-08-15 03:53:56.154494	2014-08-15 04:57:04.944462
10	Free Climb	Hobrecht's first rock climbing action painting showcases extreme rock climbers, who climb without harness or equipment.	2014-08-14 00:00:00	\N	free-climb			\N	1	2014-08-15 03:26:54.518252	2014-08-15 03:31:38.154481
8	Ferrari Pit	After receiving a call from the Engineering department at Ferrari requesting a painting for the only living Ferrari son, Piero, Hobrecht created this piece and decided to include Piero in the upper right hand corner of the painting. Hobrecht sent the painting to the department in Italy, and later received an email saying that Mr. Ferrari had liked the painting so much he moved it from the gallery to his own home. Piero said he was so fond of the painting because no other artist had decided to include him in the actual work. Hobrecht has since then been invited to Italy to show his pieces because of this Ferrari work.	2014-08-14 00:00:00	\N	ferrari-pit			\N	1	2014-08-15 03:15:37.793552	2014-08-15 03:20:45.402652
7	Desert Storm	In "Desert Storm", a Phoenix Cardinals piece, the defender is shown tackling running back Frank Gore in a game.	2014-08-14 00:00:00	\N	desert-storm			\N	1	2014-08-15 03:06:35.445515	2014-08-15 03:14:47.810384
11	Lou Gehrig	One of the most famous Yankees of all time- Lou Gehrig- held the record for most consecutive games played, until he was forced to sit out because of an illness. The illness, now known as Lou Gehrig's disease, ended his record and often had Gehrig sitting in the dugout. This painting is unique however, because while most paintings featuring Gehrig show a perspective looking from the outfield into the dugout, Hobrecht's painting takes the opposite, showing Gehrig from the dugout looking across over the outfield. "Gehrig" is one of Hobrecht's best portrayals of lighting, blur, and form, making it one of his fastest selling paintings.	2014-08-14 00:00:00	\N	lou-gehrig			\N	1	2014-08-15 03:34:06.1631	2014-08-15 03:39:38.599927
6	Del Mar Win	The winning horse, Del Mar, is the focus of this painting. 	2014-08-14 00:00:00	\N	del-mar-win			\N	1	2014-08-15 03:01:04.619118	2014-08-15 03:04:49.5912
3	Creating Surf Art		2014-08-14 00:00:00	\N	creating-surf-art			\N	1	2014-08-15 00:38:21.683537	2014-08-15 00:42:26.297625
4	Date Night	Reminiscent of an old school 50's painting, "Date Night" features a man and a woman surfing. An old man stands on a longboard surfing the San Onofre waves, while his love surfs along side him. Hobrecht captures the essence of the "not male dominated" sport, showcasing that not is it just something to do with your friends, but also an activity to enjoy with your love.	2014-08-14 00:00:00	2014-08-15 02:56:26.440869	1408071386_date-night			\N	1	2014-08-15 00:43:25.955598	2014-08-15 02:56:26.449121
14	Speed and Grace	Instead of the catch made by Jerry Rice, Hobrecht instead wanted to capture the moments after the catch. Hobrecht also includes Rice's career statistics in the scoreboard in the background of the painting. 	2014-08-14 00:00:00	\N	speed-and-grace			\N	1	2014-08-15 04:58:35.24105	2014-08-15 05:08:13.679221
9	Foxboro Faithful	"Foxboro Faithful" shows the first suitable championship of the Tom Brady Era, and pictures kicker Adam Vinatieri kicking the winning field goal for the Patriots. The photo, said to be the favorite of Coach Belichick was painted, framed, and signed as a gift to the coach from all the players.	2014-08-14 00:00:00	\N	foxboro-faithful			\N	1	2014-08-15 03:22:53.884284	2014-08-15 03:25:27.575943
12	Ghost Tree	Located in the middle of California next to pebble beach, Ghost Tree is famous for gnarly surf and draws a crowd when the waves are big.	2014-08-14 00:00:00	\N	ghost-tree			\N	1	2014-08-15 03:44:33.839144	2014-08-15 03:49:20.848578
5	Date Night	Reminiscent of an old school 50's painting, "Date Night" features a man and a woman surfing. An old man stands on a longboard surfing the San Onofre waves, while his love surfs along side him. Hobrecht captures the essence of the "not male dominated" sport, showcasing that not is it just something to do with your friends, but also an activity to enjoy with your love.	2014-08-14 00:00:00	\N	date-night			\N	1	2014-08-15 02:56:52.622086	2014-08-15 02:59:36.4821
\.


--
-- Name: spree_products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: u85oga
--

SELECT pg_catalog.setval('spree_products_id_seq', 14, true);


--
-- Data for Name: spree_products_promotion_rules; Type: TABLE DATA; Schema: public; Owner: u85oga
--

COPY spree_products_promotion_rules (product_id, promotion_rule_id) FROM stdin;
\.


--
-- Data for Name: spree_products_taxons; Type: TABLE DATA; Schema: public; Owner: u85oga
--

COPY spree_products_taxons (product_id, taxon_id, id, "position") FROM stdin;
1	6	1	1
3	9	2	2
6	7	3	3
7	6	4	4
8	11	5	5
9	6	6	6
10	12	7	7
11	4	8	8
12	9	9	9
13	6	10	10
14	6	11	11
\.


--
-- Name: spree_products_taxons_id_seq; Type: SEQUENCE SET; Schema: public; Owner: u85oga
--

SELECT pg_catalog.setval('spree_products_taxons_id_seq', 11, true);


--
-- Data for Name: spree_promotion_action_line_items; Type: TABLE DATA; Schema: public; Owner: u85oga
--

COPY spree_promotion_action_line_items (id, promotion_action_id, variant_id, quantity) FROM stdin;
\.


--
-- Name: spree_promotion_action_line_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: u85oga
--

SELECT pg_catalog.setval('spree_promotion_action_line_items_id_seq', 1, false);


--
-- Data for Name: spree_promotion_actions; Type: TABLE DATA; Schema: public; Owner: u85oga
--

COPY spree_promotion_actions (id, promotion_id, "position", type, deleted_at) FROM stdin;
\.


--
-- Name: spree_promotion_actions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: u85oga
--

SELECT pg_catalog.setval('spree_promotion_actions_id_seq', 1, false);


--
-- Data for Name: spree_promotion_rules; Type: TABLE DATA; Schema: public; Owner: u85oga
--

COPY spree_promotion_rules (id, promotion_id, user_id, product_group_id, type, created_at, updated_at, code, preferences) FROM stdin;
\.


--
-- Name: spree_promotion_rules_id_seq; Type: SEQUENCE SET; Schema: public; Owner: u85oga
--

SELECT pg_catalog.setval('spree_promotion_rules_id_seq', 1, false);


--
-- Data for Name: spree_promotion_rules_users; Type: TABLE DATA; Schema: public; Owner: u85oga
--

COPY spree_promotion_rules_users (user_id, promotion_rule_id) FROM stdin;
\.


--
-- Data for Name: spree_promotions; Type: TABLE DATA; Schema: public; Owner: u85oga
--

COPY spree_promotions (id, description, expires_at, starts_at, name, type, usage_limit, match_policy, code, advertise, path, created_at, updated_at) FROM stdin;
\.


--
-- Name: spree_promotions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: u85oga
--

SELECT pg_catalog.setval('spree_promotions_id_seq', 1, false);


--
-- Data for Name: spree_properties; Type: TABLE DATA; Schema: public; Owner: u85oga
--

COPY spree_properties (id, name, presentation, created_at, updated_at) FROM stdin;
\.


--
-- Name: spree_properties_id_seq; Type: SEQUENCE SET; Schema: public; Owner: u85oga
--

SELECT pg_catalog.setval('spree_properties_id_seq', 1, false);


--
-- Data for Name: spree_properties_prototypes; Type: TABLE DATA; Schema: public; Owner: u85oga
--

COPY spree_properties_prototypes (prototype_id, property_id) FROM stdin;
\.


--
-- Data for Name: spree_prototypes; Type: TABLE DATA; Schema: public; Owner: u85oga
--

COPY spree_prototypes (id, name, created_at, updated_at) FROM stdin;
1	Painting	2014-08-14 23:16:35.646202	2014-08-14 23:17:19.707556
\.


--
-- Name: spree_prototypes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: u85oga
--

SELECT pg_catalog.setval('spree_prototypes_id_seq', 1, true);


--
-- Data for Name: spree_return_authorizations; Type: TABLE DATA; Schema: public; Owner: u85oga
--

COPY spree_return_authorizations (id, number, state, amount, order_id, reason, created_at, updated_at, stock_location_id) FROM stdin;
\.


--
-- Name: spree_return_authorizations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: u85oga
--

SELECT pg_catalog.setval('spree_return_authorizations_id_seq', 1, false);


--
-- Data for Name: spree_roles; Type: TABLE DATA; Schema: public; Owner: u85oga
--

COPY spree_roles (id, name) FROM stdin;
1	admin
2	user
\.


--
-- Name: spree_roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: u85oga
--

SELECT pg_catalog.setval('spree_roles_id_seq', 2, true);


--
-- Data for Name: spree_roles_users; Type: TABLE DATA; Schema: public; Owner: u85oga
--

COPY spree_roles_users (role_id, user_id) FROM stdin;
1	1
1	2
\.


--
-- Data for Name: spree_shipments; Type: TABLE DATA; Schema: public; Owner: u85oga
--

COPY spree_shipments (id, tracking, number, cost, shipped_at, order_id, address_id, state, created_at, updated_at, stock_location_id, adjustment_total, additional_tax_total, promo_total, included_tax_total, pre_tax_amount) FROM stdin;
\.


--
-- Name: spree_shipments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: u85oga
--

SELECT pg_catalog.setval('spree_shipments_id_seq', 1, false);


--
-- Data for Name: spree_shipping_categories; Type: TABLE DATA; Schema: public; Owner: u85oga
--

COPY spree_shipping_categories (id, name, created_at, updated_at) FROM stdin;
1	Default	2014-08-13 09:28:03.014647	2014-08-13 09:28:03.014647
\.


--
-- Name: spree_shipping_categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: u85oga
--

SELECT pg_catalog.setval('spree_shipping_categories_id_seq', 1, true);


--
-- Data for Name: spree_shipping_method_categories; Type: TABLE DATA; Schema: public; Owner: u85oga
--

COPY spree_shipping_method_categories (id, shipping_method_id, shipping_category_id, created_at, updated_at) FROM stdin;
\.


--
-- Name: spree_shipping_method_categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: u85oga
--

SELECT pg_catalog.setval('spree_shipping_method_categories_id_seq', 1, false);


--
-- Data for Name: spree_shipping_methods; Type: TABLE DATA; Schema: public; Owner: u85oga
--

COPY spree_shipping_methods (id, name, display_on, deleted_at, created_at, updated_at, tracking_url, admin_name, tax_category_id) FROM stdin;
\.


--
-- Name: spree_shipping_methods_id_seq; Type: SEQUENCE SET; Schema: public; Owner: u85oga
--

SELECT pg_catalog.setval('spree_shipping_methods_id_seq', 1, false);


--
-- Data for Name: spree_shipping_methods_zones; Type: TABLE DATA; Schema: public; Owner: u85oga
--

COPY spree_shipping_methods_zones (shipping_method_id, zone_id) FROM stdin;
\.


--
-- Data for Name: spree_shipping_rates; Type: TABLE DATA; Schema: public; Owner: u85oga
--

COPY spree_shipping_rates (id, shipment_id, shipping_method_id, selected, cost, created_at, updated_at, tax_rate_id) FROM stdin;
\.


--
-- Name: spree_shipping_rates_id_seq; Type: SEQUENCE SET; Schema: public; Owner: u85oga
--

SELECT pg_catalog.setval('spree_shipping_rates_id_seq', 1, false);


--
-- Data for Name: spree_skrill_transactions; Type: TABLE DATA; Schema: public; Owner: u85oga
--

COPY spree_skrill_transactions (id, email, amount, currency, transaction_id, customer_id, payment_type, created_at, updated_at) FROM stdin;
\.


--
-- Name: spree_skrill_transactions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: u85oga
--

SELECT pg_catalog.setval('spree_skrill_transactions_id_seq', 1, false);


--
-- Data for Name: spree_state_changes; Type: TABLE DATA; Schema: public; Owner: u85oga
--

COPY spree_state_changes (id, name, previous_state, stateful_id, user_id, stateful_type, next_state, created_at, updated_at) FROM stdin;
\.


--
-- Name: spree_state_changes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: u85oga
--

SELECT pg_catalog.setval('spree_state_changes_id_seq', 1, false);


--
-- Data for Name: spree_states; Type: TABLE DATA; Schema: public; Owner: u85oga
--

COPY spree_states (id, name, abbr, country_id, updated_at) FROM stdin;
1	Michigan	MI	49	2014-08-14 09:26:28.416794
2	South Dakota	SD	49	2014-08-14 09:26:28.425518
3	Washington	WA	49	2014-08-14 09:26:28.4291
4	Wisconsin	WI	49	2014-08-14 09:26:28.432902
5	Arizona	AZ	49	2014-08-14 09:26:28.436144
6	Illinois	IL	49	2014-08-14 09:26:28.438392
7	New Hampshire	NH	49	2014-08-14 09:26:28.440664
8	North Carolina	NC	49	2014-08-14 09:26:28.442892
9	Kansas	KS	49	2014-08-14 09:26:28.445367
10	Missouri	MO	49	2014-08-14 09:26:28.447615
11	Arkansas	AR	49	2014-08-14 09:26:28.449948
12	Nevada	NV	49	2014-08-14 09:26:28.452188
13	District of Columbia	DC	49	2014-08-14 09:26:28.454416
14	Idaho	ID	49	2014-08-14 09:26:28.456864
15	Nebraska	NE	49	2014-08-14 09:26:28.459069
16	Pennsylvania	PA	49	2014-08-14 09:26:28.462195
17	Hawaii	HI	49	2014-08-14 09:26:28.46643
18	Utah	UT	49	2014-08-14 09:26:28.469803
19	Vermont	VT	49	2014-08-14 09:26:28.472289
20	Delaware	DE	49	2014-08-14 09:26:28.481192
21	Rhode Island	RI	49	2014-08-14 09:26:28.483445
22	Oklahoma	OK	49	2014-08-14 09:26:28.486059
23	Louisiana	LA	49	2014-08-14 09:26:28.488303
24	Montana	MT	49	2014-08-14 09:26:28.490516
25	Tennessee	TN	49	2014-08-14 09:26:28.492854
26	Maryland	MD	49	2014-08-14 09:26:28.495045
27	Florida	FL	49	2014-08-14 09:26:28.497259
28	Virginia	VA	49	2014-08-14 09:26:28.499388
29	Minnesota	MN	49	2014-08-14 09:26:28.501647
30	New Jersey	NJ	49	2014-08-14 09:26:28.50388
31	Ohio	OH	49	2014-08-14 09:26:28.506139
32	California	CA	49	2014-08-14 09:26:28.508561
33	North Dakota	ND	49	2014-08-14 09:26:28.510775
34	Maine	ME	49	2014-08-14 09:26:28.512961
35	Indiana	IN	49	2014-08-14 09:26:28.51517
36	Texas	TX	49	2014-08-14 09:26:28.51741
37	Oregon	OR	49	2014-08-14 09:26:28.519596
38	Wyoming	WY	49	2014-08-14 09:26:28.521904
39	Alabama	AL	49	2014-08-14 09:26:28.524089
40	Iowa	IA	49	2014-08-14 09:26:28.526291
41	Mississippi	MS	49	2014-08-14 09:26:28.529196
42	Kentucky	KY	49	2014-08-14 09:26:28.531488
43	New Mexico	NM	49	2014-08-14 09:26:28.535614
44	Georgia	GA	49	2014-08-14 09:26:28.539912
45	Colorado	CO	49	2014-08-14 09:26:28.542413
46	Massachusetts	MA	49	2014-08-14 09:26:28.544654
47	Connecticut	CT	49	2014-08-14 09:26:28.547185
48	New York	NY	49	2014-08-14 09:26:28.54974
49	South Carolina	SC	49	2014-08-14 09:26:28.551963
50	Alaska	AK	49	2014-08-14 09:26:28.554326
51	West Virginia	WV	49	2014-08-14 09:26:28.556579
52	U.S. Armed Forces - Americas	AA	49	2014-08-14 09:26:28.55883
53	U.S. Armed Forces - Europe	AE	49	2014-08-14 09:26:28.561039
54	U.S. Armed Forces - Pacific	AP	49	2014-08-14 09:26:28.563256
\.


--
-- Name: spree_states_id_seq; Type: SEQUENCE SET; Schema: public; Owner: u85oga
--

SELECT pg_catalog.setval('spree_states_id_seq', 54, true);


--
-- Data for Name: spree_stock_items; Type: TABLE DATA; Schema: public; Owner: u85oga
--

COPY spree_stock_items (id, stock_location_id, variant_id, count_on_hand, created_at, updated_at, backorderable, deleted_at) FROM stdin;
1	1	1	0	2014-08-15 00:10:08.488746	2014-08-15 00:10:08.488746	t	\N
2	1	2	100	2014-08-15 00:10:08.60405	2014-08-15 00:24:23.593954	t	\N
3	1	3	100	2014-08-15 00:10:08.639756	2014-08-15 00:24:30.911183	t	\N
4	1	4	100	2014-08-15 00:10:08.675236	2014-08-15 00:24:39.818778	t	\N
5	1	5	100	2014-08-15 00:10:08.742311	2014-08-15 00:24:49.610348	t	\N
6	1	6	0	2014-08-15 00:31:20.750473	2014-08-15 00:31:20.750473	t	\N
7	1	7	0	2014-08-15 00:31:20.827985	2014-08-15 00:31:20.827985	t	\N
8	1	8	0	2014-08-15 00:31:20.862877	2014-08-15 00:31:20.862877	t	\N
9	1	9	0	2014-08-15 00:31:20.897019	2014-08-15 00:31:20.897019	t	\N
10	1	10	0	2014-08-15 00:31:20.93069	2014-08-15 00:31:20.93069	t	\N
11	1	11	0	2014-08-15 00:38:21.714301	2014-08-15 00:38:21.714301	t	\N
12	1	12	0	2014-08-15 00:38:21.785633	2014-08-15 00:38:21.785633	t	\N
13	1	13	0	2014-08-15 00:38:21.821068	2014-08-15 00:38:21.821068	t	\N
14	1	14	0	2014-08-15 00:38:21.856289	2014-08-15 00:38:21.856289	t	\N
15	1	15	0	2014-08-15 00:38:21.893352	2014-08-15 00:38:21.893352	t	\N
16	1	16	0	2014-08-15 00:43:25.976562	2014-08-15 02:56:26.251383	t	2014-08-15 02:56:26.251383
17	1	17	0	2014-08-15 00:43:26.036079	2014-08-15 02:56:26.303847	t	2014-08-15 02:56:26.303847
18	1	18	0	2014-08-15 00:43:26.071122	2014-08-15 02:56:26.336414	t	2014-08-15 02:56:26.336414
19	1	19	0	2014-08-15 00:43:26.105452	2014-08-15 02:56:26.367896	t	2014-08-15 02:56:26.367896
20	1	20	0	2014-08-15 00:43:26.139863	2014-08-15 02:56:26.408928	t	2014-08-15 02:56:26.408928
21	1	21	0	2014-08-15 02:56:52.641729	2014-08-15 02:56:52.641729	t	\N
22	1	22	0	2014-08-15 02:56:52.69625	2014-08-15 02:56:52.69625	t	\N
23	1	23	0	2014-08-15 02:56:52.730302	2014-08-15 02:56:52.730302	t	\N
24	1	24	0	2014-08-15 02:56:52.76414	2014-08-15 02:56:52.76414	t	\N
25	1	25	0	2014-08-15 02:56:52.798087	2014-08-15 02:56:52.798087	t	\N
26	1	26	0	2014-08-15 03:01:04.640738	2014-08-15 03:01:04.640738	t	\N
27	1	27	0	2014-08-15 03:01:04.708259	2014-08-15 03:01:04.708259	t	\N
28	1	28	0	2014-08-15 03:01:04.743358	2014-08-15 03:01:04.743358	t	\N
29	1	29	0	2014-08-15 03:01:04.779126	2014-08-15 03:01:04.779126	t	\N
30	1	30	0	2014-08-15 03:01:04.815059	2014-08-15 03:01:04.815059	t	\N
31	1	31	0	2014-08-15 03:06:35.466185	2014-08-15 03:06:35.466185	t	\N
32	1	32	0	2014-08-15 03:06:35.521358	2014-08-15 03:06:35.521358	t	\N
33	1	33	0	2014-08-15 03:06:35.555905	2014-08-15 03:06:35.555905	t	\N
34	1	34	0	2014-08-15 03:06:35.596716	2014-08-15 03:06:35.596716	t	\N
35	1	35	0	2014-08-15 03:06:35.636118	2014-08-15 03:06:35.636118	t	\N
36	1	36	0	2014-08-15 03:15:37.813884	2014-08-15 03:15:37.813884	t	\N
37	1	37	0	2014-08-15 03:15:37.868077	2014-08-15 03:15:37.868077	t	\N
38	1	38	0	2014-08-15 03:15:37.900839	2014-08-15 03:15:37.900839	t	\N
39	1	39	0	2014-08-15 03:15:37.933332	2014-08-15 03:15:37.933332	t	\N
40	1	40	0	2014-08-15 03:15:37.965902	2014-08-15 03:15:37.965902	t	\N
41	1	41	0	2014-08-15 03:22:53.905122	2014-08-15 03:22:53.905122	t	\N
42	1	42	0	2014-08-15 03:22:53.958555	2014-08-15 03:22:53.958555	t	\N
43	1	43	0	2014-08-15 03:22:53.992423	2014-08-15 03:22:53.992423	t	\N
44	1	44	0	2014-08-15 03:22:54.027953	2014-08-15 03:22:54.027953	t	\N
45	1	45	0	2014-08-15 03:22:54.062312	2014-08-15 03:22:54.062312	t	\N
46	1	46	0	2014-08-15 03:26:54.55605	2014-08-15 03:26:54.55605	t	\N
47	1	47	0	2014-08-15 03:26:54.612937	2014-08-15 03:26:54.612937	t	\N
48	1	48	0	2014-08-15 03:26:54.645162	2014-08-15 03:26:54.645162	t	\N
49	1	49	0	2014-08-15 03:26:54.67719	2014-08-15 03:26:54.67719	t	\N
50	1	50	0	2014-08-15 03:26:54.716906	2014-08-15 03:26:54.716906	t	\N
51	1	51	0	2014-08-15 03:34:06.183218	2014-08-15 03:34:06.183218	t	\N
52	1	52	0	2014-08-15 03:34:06.238865	2014-08-15 03:34:06.238865	t	\N
53	1	53	0	2014-08-15 03:34:06.278173	2014-08-15 03:34:06.278173	t	\N
54	1	54	0	2014-08-15 03:34:06.316673	2014-08-15 03:34:06.316673	t	\N
55	1	55	0	2014-08-15 03:34:06.353159	2014-08-15 03:34:06.353159	t	\N
56	1	56	0	2014-08-15 03:44:33.86276	2014-08-15 03:44:33.86276	t	\N
57	1	57	0	2014-08-15 03:44:33.927901	2014-08-15 03:44:33.927901	t	\N
58	1	58	0	2014-08-15 03:44:33.961553	2014-08-15 03:44:33.961553	t	\N
59	1	59	0	2014-08-15 03:44:34.001592	2014-08-15 03:44:34.001592	t	\N
60	1	60	0	2014-08-15 03:44:34.036682	2014-08-15 03:44:34.036682	t	\N
61	1	61	0	2014-08-15 03:53:56.18275	2014-08-15 03:53:56.18275	t	\N
62	1	62	0	2014-08-15 03:53:56.240315	2014-08-15 03:53:56.240315	t	\N
63	1	63	0	2014-08-15 03:53:56.274377	2014-08-15 03:53:56.274377	t	\N
64	1	64	0	2014-08-15 03:53:56.308795	2014-08-15 03:53:56.308795	t	\N
65	1	65	0	2014-08-15 03:53:56.343248	2014-08-15 03:53:56.343248	t	\N
66	1	66	0	2014-08-15 04:58:35.261742	2014-08-15 04:58:35.261742	t	\N
67	1	67	0	2014-08-15 04:58:35.314371	2014-08-15 04:58:35.314371	t	\N
68	1	68	0	2014-08-15 04:58:35.350971	2014-08-15 04:58:35.350971	t	\N
69	1	69	0	2014-08-15 04:58:35.385767	2014-08-15 04:58:35.385767	t	\N
70	1	70	0	2014-08-15 04:58:35.420259	2014-08-15 04:58:35.420259	t	\N
\.


--
-- Name: spree_stock_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: u85oga
--

SELECT pg_catalog.setval('spree_stock_items_id_seq', 70, true);


--
-- Data for Name: spree_stock_locations; Type: TABLE DATA; Schema: public; Owner: u85oga
--

COPY spree_stock_locations (id, name, created_at, updated_at, address1, address2, city, state_id, state_name, country_id, zipcode, phone, active, backorderable_default, propagate_all_variants, admin_name) FROM stdin;
1	default	2014-08-13 09:28:02.157531	2014-08-13 09:28:02.157531	\N	\N	\N	\N	\N	\N	\N	\N	t	t	t	\N
\.


--
-- Name: spree_stock_locations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: u85oga
--

SELECT pg_catalog.setval('spree_stock_locations_id_seq', 1, true);


--
-- Data for Name: spree_stock_movements; Type: TABLE DATA; Schema: public; Owner: u85oga
--

COPY spree_stock_movements (id, stock_item_id, quantity, action, created_at, updated_at, originator_id, originator_type) FROM stdin;
1	2	100	\N	2014-08-15 00:24:23.515924	2014-08-15 00:24:23.515924	\N	\N
2	3	100	\N	2014-08-15 00:24:30.846118	2014-08-15 00:24:30.846118	\N	\N
3	4	100	\N	2014-08-15 00:24:39.805891	2014-08-15 00:24:39.805891	\N	\N
4	5	100	\N	2014-08-15 00:24:49.539156	2014-08-15 00:24:49.539156	\N	\N
\.


--
-- Name: spree_stock_movements_id_seq; Type: SEQUENCE SET; Schema: public; Owner: u85oga
--

SELECT pg_catalog.setval('spree_stock_movements_id_seq', 4, true);


--
-- Data for Name: spree_stock_transfers; Type: TABLE DATA; Schema: public; Owner: u85oga
--

COPY spree_stock_transfers (id, type, reference, source_location_id, destination_location_id, created_at, updated_at, number) FROM stdin;
\.


--
-- Name: spree_stock_transfers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: u85oga
--

SELECT pg_catalog.setval('spree_stock_transfers_id_seq', 1, false);


--
-- Data for Name: spree_stores; Type: TABLE DATA; Schema: public; Owner: u85oga
--

COPY spree_stores (id, name, url, meta_description, meta_keywords, seo_title, mail_from_address, default_currency, code, "default", created_at, updated_at) FROM stdin;
1	Hobrecht Sports Art	alpha.hobrecht.com				spree@example.com	\N	spree	t	2014-08-13 09:28:03.553076	2014-08-14 09:29:13.332567
\.


--
-- Name: spree_stores_id_seq; Type: SEQUENCE SET; Schema: public; Owner: u85oga
--

SELECT pg_catalog.setval('spree_stores_id_seq', 1, true);


--
-- Data for Name: spree_tax_categories; Type: TABLE DATA; Schema: public; Owner: u85oga
--

COPY spree_tax_categories (id, name, description, is_default, deleted_at, created_at, updated_at) FROM stdin;
\.


--
-- Name: spree_tax_categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: u85oga
--

SELECT pg_catalog.setval('spree_tax_categories_id_seq', 1, false);


--
-- Data for Name: spree_tax_rates; Type: TABLE DATA; Schema: public; Owner: u85oga
--

COPY spree_tax_rates (id, amount, zone_id, tax_category_id, included_in_price, created_at, updated_at, name, show_rate_in_label, deleted_at) FROM stdin;
\.


--
-- Name: spree_tax_rates_id_seq; Type: SEQUENCE SET; Schema: public; Owner: u85oga
--

SELECT pg_catalog.setval('spree_tax_rates_id_seq', 1, false);


--
-- Data for Name: spree_taxonomies; Type: TABLE DATA; Schema: public; Owner: u85oga
--

COPY spree_taxonomies (id, name, created_at, updated_at, "position") FROM stdin;
1	Sport	2014-08-14 23:08:37.925471	2014-08-15 05:08:13.684903	0
\.


--
-- Name: spree_taxonomies_id_seq; Type: SEQUENCE SET; Schema: public; Owner: u85oga
--

SELECT pg_catalog.setval('spree_taxonomies_id_seq', 1, true);


--
-- Data for Name: spree_taxons; Type: TABLE DATA; Schema: public; Owner: u85oga
--

COPY spree_taxons (id, parent_id, "position", name, permalink, taxonomy_id, lft, rgt, icon_file_name, icon_content_type, icon_file_size, icon_updated_at, description, created_at, updated_at, meta_title, meta_description, meta_keywords, depth) FROM stdin;
11	2	0	Car Racing	sport/car-racing	1	8	9	\N	\N	\N	\N	\N	2014-08-14 23:14:27.366281	2014-08-15 03:20:45.405599	\N	\N	\N	1
3	2	0	Action	sport/action	1	2	3	\N	\N	\N	\N	\N	2014-08-14 23:12:36.048706	2014-08-14 23:12:36.059085	\N	\N	\N	1
10	2	0	Golf	sport/golf	1	12	13	\N	\N	\N	\N	\N	2014-08-14 23:14:18.012438	2014-08-14 23:14:55.8989	\N	\N	\N	1
9	2	0	Surfing	sport/surfing	1	20	21	\N	\N	\N	\N	\N	2014-08-14 23:13:48.943003	2014-08-15 03:49:20.85236	\N	\N	\N	1
7	2	0	Horse Racing	sport/horse-racing	1	14	15	\N	\N	\N	\N	\N	2014-08-14 23:13:31.968283	2014-08-15 03:04:49.595511	\N	\N	\N	1
8	2	0	Skate Boarding	sport/skate-boarding	1	18	19	\N	\N	\N	\N	\N	2014-08-14 23:13:43.58363	2014-08-15 03:28:47.59225	\N	\N	\N	1
12	2	0	Rock Climbing	sport/rock-climbing	1	16	17	\N	\N	\N	\N	\N	2014-08-15 03:28:41.893121	2014-08-15 03:31:38.157623	\N	\N	\N	1
2	\N	0	Sport	sport	1	1	22	\N	\N	\N	\N	\N	2014-08-14 23:10:56.279138	2014-08-15 05:08:13.683555	\N	\N	\N	0
6	2	0	Football	sport/football	1	10	11	\N	\N	\N	\N	\N	2014-08-14 23:13:14.019178	2014-08-15 05:08:13.683555	\N	\N	\N	1
4	2	0	Baseball	sport/baseball	1	4	5	\N	\N	\N	\N		2014-08-14 23:12:40.258481	2014-08-15 03:39:38.603793				1
5	2	0	Basketball	sport/basketball	1	6	7	\N	\N	\N	\N	\N	2014-08-14 23:13:09.3673	2014-08-14 23:14:45.732006	\N	\N	\N	1
\.


--
-- Name: spree_taxons_id_seq; Type: SEQUENCE SET; Schema: public; Owner: u85oga
--

SELECT pg_catalog.setval('spree_taxons_id_seq', 12, true);


--
-- Data for Name: spree_tokenized_permissions; Type: TABLE DATA; Schema: public; Owner: u85oga
--

COPY spree_tokenized_permissions (id, permissable_id, permissable_type, token, created_at, updated_at) FROM stdin;
\.


--
-- Name: spree_tokenized_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: u85oga
--

SELECT pg_catalog.setval('spree_tokenized_permissions_id_seq', 1, false);


--
-- Data for Name: spree_trackers; Type: TABLE DATA; Schema: public; Owner: u85oga
--

COPY spree_trackers (id, environment, analytics_id, active, created_at, updated_at) FROM stdin;
\.


--
-- Name: spree_trackers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: u85oga
--

SELECT pg_catalog.setval('spree_trackers_id_seq', 1, false);


--
-- Data for Name: spree_users; Type: TABLE DATA; Schema: public; Owner: u85oga
--

COPY spree_users (id, encrypted_password, password_salt, email, remember_token, persistence_token, reset_password_token, perishable_token, sign_in_count, failed_attempts, last_request_at, current_sign_in_at, last_sign_in_at, current_sign_in_ip, last_sign_in_ip, login, ship_address_id, bill_address_id, authentication_token, unlock_token, locked_at, reset_password_sent_at, created_at, updated_at, spree_api_key, remember_created_at) FROM stdin;
2	ccc39916e330ac4ea30e2a28060b72924b25c4bee8bb229acb832a5ff3d092b9b939eeec45756d4640e271109f33088ea1140c059576b2c36695347b589e51f9	sgarczkgoxBAAWixRHPK	julie@dustinboling.com	sNkUgKb6iT-4FkYBiyt1	\N	\N	\N	1	0	\N	2014-08-14 23:05:52.772092	2014-08-14 23:05:52.772092	207.55.39.70	207.55.39.70	julie@dustinboling.com	\N	\N	\N	\N	\N	\N	2014-08-14 23:05:06.350599	2014-08-14 23:05:52.773723	\N	2014-08-14 23:05:52.766403
1	926b472de0c7ca92c27a36e91e344c1e44ecefb5792195e904bcc2b7a4a9668fc76fbc1b98f7dabd924f0bcc268362198ec90d508975748e0836306e8d63529a	gxkhf2w2rsHoq7V1Q-7z	dustin@dustinboling.com	\N	\N	\N	\N	3	0	\N	2014-08-15 00:07:42.308123	2014-08-14 23:02:17.023932	207.55.39.70	207.55.39.70	dustin@dustinboling.com	\N	\N	\N	\N	\N	\N	2014-08-14 09:26:42.036242	2014-08-15 00:07:42.309195	5e8f548be83083dec704fbdd7e1bca3e500803f81465feba	\N
\.


--
-- Name: spree_users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: u85oga
--

SELECT pg_catalog.setval('spree_users_id_seq', 2, true);


--
-- Data for Name: spree_variants; Type: TABLE DATA; Schema: public; Owner: u85oga
--

COPY spree_variants (id, sku, weight, height, width, depth, deleted_at, is_master, product_id, cost_price, "position", cost_currency, track_inventory, tax_category_id, updated_at) FROM stdin;
12	HSA-00003-LARGE	0.00	\N	\N	\N	\N	f	3	\N	2	USD	t	\N	2014-08-15 00:40:26.247551
13	HSA-00003-MEDIUM	0.00	\N	\N	\N	\N	f	3	\N	3	USD	t	\N	2014-08-15 00:40:52.399574
14	HSA-00003-SMALL	0.00	\N	\N	\N	\N	f	3	\N	4	USD	t	\N	2014-08-15 00:41:11.324816
15	HSA-00003-WOOD	0.00	\N	\N	\N	\N	f	3	\N	5	USD	t	\N	2014-08-15 00:41:46.32458
22	HSA-00004-LARGE	0.00	\N	\N	\N	\N	f	5	\N	2	USD	t	\N	2014-08-15 02:57:59.029876
23	HSA-00004-MEDIUM	0.00	\N	\N	\N	\N	f	5	\N	3	USD	t	\N	2014-08-15 02:58:19.986445
24	HSA-00004-SMALL	0.00	\N	\N	\N	\N	f	5	\N	4	USD	t	\N	2014-08-15 02:58:36.490758
25	HSA-00004-WOOD	0.00	\N	\N	\N	\N	f	5	\N	5	USD	t	\N	2014-08-15 02:58:58.647682
42	HSA-00008-LARGE	0.00	\N	\N	\N	\N	f	9	\N	2	USD	t	\N	2014-08-15 03:24:13.466668
43	HSA-00008-MEDIUM	0.00	\N	\N	\N	\N	f	9	\N	3	USD	t	\N	2014-08-15 03:24:47.933417
44	HSA-00008-SMALL	0.00	\N	\N	\N	\N	f	9	\N	4	USD	t	\N	2014-08-15 03:25:06.962358
45	HSA-00008-WOOD	0.00	\N	\N	\N	\N	f	9	\N	5	USD	t	\N	2014-08-15 03:25:27.573151
1	HSA-00001	0.00	\N	\N	\N	\N	t	1	\N	1	USD	t	\N	2014-08-15 00:23:38.410433
2	HSA-00001-LARGE	0.00	\N	\N	\N	\N	f	1	\N	2	USD	t	\N	2014-08-15 00:24:23.596468
3	HSA-00001-MEDIUM	0.00	\N	\N	\N	\N	f	1	\N	3	USD	t	\N	2014-08-15 00:24:30.91343
4	HSA-00001-SMALL	0.00	\N	\N	\N	\N	f	1	\N	4	USD	t	\N	2014-08-15 00:24:39.820681
5	HSA-00001-WOOD	0.00	\N	\N	\N	\N	f	1	\N	5	USD	t	\N	2014-08-15 00:24:49.612788
16	HSA-00003	0.00	\N	\N	\N	2014-08-15 02:56:26.286613	t	4	\N	1	USD	t	\N	2014-08-15 02:56:26.286613
17		0.00	\N	\N	\N	2014-08-15 02:56:26.327579	f	4	\N	2	USD	t	\N	2014-08-15 02:56:26.327579
26	HSA-00005	0.00	\N	\N	\N	\N	t	6	\N	1	USD	t	\N	2014-08-15 03:01:04.830446
27	HSA-00005-LARGE	0.00	\N	\N	\N	\N	f	6	\N	2	USD	t	\N	2014-08-15 03:03:13.091763
18		0.00	\N	\N	\N	2014-08-15 02:56:26.359193	f	4	\N	3	USD	t	\N	2014-08-15 02:56:26.359193
28	HSA-00005-MEDIUM	0.00	\N	\N	\N	\N	f	6	\N	3	USD	t	\N	2014-08-15 03:03:40.71209
29	HSA-00005-SMALL	0.00	\N	\N	\N	\N	f	6	\N	4	USD	t	\N	2014-08-15 03:04:02.759111
19		0.00	\N	\N	\N	2014-08-15 02:56:26.394637	f	4	\N	4	USD	t	\N	2014-08-15 02:56:26.394637
6	HSA-00002	0.00	\N	\N	\N	\N	t	2	\N	1	USD	t	\N	2014-08-15 00:31:20.945883
7	HSA-00002-LARGE	0.00	\N	\N	\N	\N	f	2	\N	2	USD	t	\N	2014-08-15 00:33:14.605278
8	HSA-00002-MEDIUM	0.00	\N	\N	\N	\N	f	2	\N	3	USD	t	\N	2014-08-15 00:34:05.297391
9	HSA-00002-SMALL	0.00	\N	\N	\N	\N	f	2	\N	4	USD	t	\N	2014-08-15 00:34:32.465921
10	HSA-00002-WOOD	0.00	\N	\N	\N	\N	f	2	\N	5	USD	t	\N	2014-08-15 00:35:14.556562
30	HSA-00005-WOOD	0.00	\N	\N	\N	\N	f	6	\N	5	USD	t	\N	2014-08-15 03:04:49.58913
65	HSA-00012-WOOD	0.00	\N	\N	\N	\N	f	13	\N	5	USD	t	\N	2014-08-15 04:57:04.942146
20		0.00	\N	\N	\N	2014-08-15 02:56:26.431795	f	4	\N	5	USD	t	\N	2014-08-15 02:56:26.431795
51	HSA-00010	0.00	\N	\N	\N	\N	t	11	\N	1	USD	t	\N	2014-08-15 03:34:06.369969
46	HSA-00009	0.00	\N	\N	\N	\N	t	10	\N	1	USD	t	\N	2014-08-15 03:26:54.731124
47	HSA-00009-LARGE	0.00	\N	\N	\N	\N	f	10	\N	2	USD	t	\N	2014-08-15 03:29:43.20987
48	HSA-00009-MEDIUM	0.00	\N	\N	\N	\N	f	10	\N	3	USD	t	\N	2014-08-15 03:30:06.772013
36	HSA-00007	0.00	\N	\N	\N	\N	t	8	\N	1	USD	t	\N	2014-08-15 03:15:37.980531
49	HSA-00009-SMALL	0.00	\N	\N	\N	\N	f	10	\N	4	USD	t	\N	2014-08-15 03:30:32.943387
50	HSA-00009-WOOD	0.00	\N	\N	\N	\N	f	10	\N	5	USD	t	\N	2014-08-15 03:30:55.130702
37	HSA-00007-LARGE	0.00	\N	\N	\N	\N	f	8	\N	2	USD	t	\N	2014-08-15 03:17:38.307055
11	HSA-00003	0.00	\N	\N	\N	\N	t	3	\N	1	USD	t	\N	2014-08-15 00:38:21.908779
38	HSA-00007-MEDIUM	0.00	\N	\N	\N	\N	f	8	\N	3	USD	t	\N	2014-08-15 03:18:04.272836
31	HSA-00006	0.00	\N	\N	\N	\N	t	7	\N	1	USD	t	\N	2014-08-15 03:06:35.651455
21	HSA-00004	0.00	\N	\N	\N	\N	t	5	\N	1	USD	t	\N	2014-08-15 02:56:52.813427
32	HSA-00006-LARGE	0.00	\N	\N	\N	\N	f	7	\N	2	USD	t	\N	2014-08-15 03:08:50.566997
33	HSA-00006-MEDIUM	0.00	\N	\N	\N	\N	f	7	\N	3	USD	t	\N	2014-08-15 03:10:23.679313
34	HSA-00006-SMALL	0.00	\N	\N	\N	\N	f	7	\N	4	USD	t	\N	2014-08-15 03:14:01.690673
35	HSA-00006-WOOD	0.00	\N	\N	\N	\N	f	7	\N	5	USD	t	\N	2014-08-15 03:14:25.708526
39	HSA-00007-SMALL	0.00	\N	\N	\N	\N	f	8	\N	4	USD	t	\N	2014-08-15 03:18:34.614156
40	HSA-00007-WOOD	0.00	\N	\N	\N	\N	f	8	\N	5	USD	t	\N	2014-08-15 03:19:46.987457
56	HSA-00011	0.00	\N	\N	\N	\N	t	12	\N	1	USD	t	\N	2014-08-15 03:44:34.051447
52	HSA-00010-LARGE	0.00	\N	\N	\N	\N	f	11	\N	2	USD	t	\N	2014-08-15 03:38:10.822346
53	HSA-00010-MEDIUM	0.00	\N	\N	\N	\N	f	11	\N	3	USD	t	\N	2014-08-15 03:38:37.31478
54	HSA-00010-SMALL	0.00	\N	\N	\N	\N	f	11	\N	4	USD	t	\N	2014-08-15 03:39:03.363017
55	HSA-00010-WOOD	0.00	\N	\N	\N	\N	f	11	\N	5	USD	t	\N	2014-08-15 03:39:38.5976
41	HSA-00008	0.00	\N	\N	\N	\N	t	9	\N	1	USD	t	\N	2014-08-15 03:22:54.077336
67	HSA-00013-LARGE	0.00	\N	\N	\N	\N	f	14	\N	2	USD	t	\N	2014-08-15 05:01:23.085032
57	HSA-00011-LARGE	0.00	\N	\N	\N	\N	f	12	\N	2	USD	t	\N	2014-08-15 03:47:10.736679
58	HSA-00011-MEDIUM	0.00	\N	\N	\N	\N	f	12	\N	3	USD	t	\N	2014-08-15 03:48:20.890248
59	HSA-00011-SMALL	0.00	\N	\N	\N	\N	f	12	\N	4	USD	t	\N	2014-08-15 03:48:53.443598
60	HSA-00011-WOOD	0.00	\N	\N	\N	\N	f	12	\N	5	USD	t	\N	2014-08-15 03:49:20.846417
68	HSA-00013-MEDIUM	0.00	\N	\N	\N	\N	f	14	\N	3	USD	t	\N	2014-08-15 05:05:22.957565
61	HSA-00012	0.00	\N	\N	\N	\N	t	13	\N	1	USD	t	\N	2014-08-15 03:53:56.358201
62	HSA-00012-LARGE	0.00	\N	\N	\N	\N	f	13	\N	2	USD	t	\N	2014-08-15 04:55:26.887044
63	HSA-00012-MEDIUM	0.00	\N	\N	\N	\N	f	13	\N	3	USD	t	\N	2014-08-15 04:56:00.04334
64	HSA-00012-SMALL	0.00	\N	\N	\N	\N	f	13	\N	4	USD	t	\N	2014-08-15 04:56:26.40132
69	HSA-00013-SMALL	0.00	\N	\N	\N	\N	f	14	\N	4	USD	t	\N	2014-08-15 05:08:13.676868
70		0.00	\N	\N	\N	\N	f	14	\N	5	USD	t	\N	2014-08-15 04:58:35.421786
66	HSA-00013	0.00	\N	\N	\N	\N	t	14	\N	1	USD	t	\N	2014-08-15 04:58:35.436045
\.


--
-- Name: spree_variants_id_seq; Type: SEQUENCE SET; Schema: public; Owner: u85oga
--

SELECT pg_catalog.setval('spree_variants_id_seq', 70, true);


--
-- Data for Name: spree_zone_members; Type: TABLE DATA; Schema: public; Owner: u85oga
--

COPY spree_zone_members (id, zoneable_id, zoneable_type, zone_id, created_at, updated_at) FROM stdin;
1	72	Spree::Country	1	2014-08-14 09:26:28.656893	2014-08-14 09:26:28.656893
2	10	Spree::Country	1	2014-08-14 09:26:28.669736	2014-08-14 09:26:28.669736
3	76	Spree::Country	1	2014-08-14 09:26:28.682385	2014-08-14 09:26:28.682385
4	94	Spree::Country	1	2014-08-14 09:26:28.689568	2014-08-14 09:26:28.689568
5	155	Spree::Country	1	2014-08-14 09:26:28.6991	2014-08-14 09:26:28.6991
6	13	Spree::Country	1	2014-08-14 09:26:28.704907	2014-08-14 09:26:28.704907
7	164	Spree::Country	1	2014-08-14 09:26:28.710137	2014-08-14 09:26:28.710137
8	217	Spree::Country	1	2014-08-14 09:26:28.717724	2014-08-14 09:26:28.717724
9	167	Spree::Country	1	2014-08-14 09:26:28.724566	2014-08-14 09:26:28.724566
10	20	Spree::Country	1	2014-08-14 09:26:28.730666	2014-08-14 09:26:28.730666
11	111	Spree::Country	1	2014-08-14 09:26:28.735989	2014-08-14 09:26:28.735989
12	175	Spree::Country	1	2014-08-14 09:26:28.741206	2014-08-14 09:26:28.741206
13	24	Spree::Country	1	2014-08-14 09:26:28.746646	2014-08-14 09:26:28.746646
14	29	Spree::Country	1	2014-08-14 09:26:28.751908	2014-08-14 09:26:28.751908
15	98	Spree::Country	1	2014-08-14 09:26:28.757106	2014-08-14 09:26:28.757106
16	180	Spree::Country	1	2014-08-14 09:26:28.762294	2014-08-14 09:26:28.762294
17	182	Spree::Country	1	2014-08-14 09:26:28.767615	2014-08-14 09:26:28.767615
18	44	Spree::Country	1	2014-08-14 09:26:28.772932	2014-08-14 09:26:28.772932
19	206	Spree::Country	1	2014-08-14 09:26:28.778112	2014-08-14 09:26:28.778112
20	46	Spree::Country	1	2014-08-14 09:26:28.783282	2014-08-14 09:26:28.783282
21	211	Spree::Country	1	2014-08-14 09:26:28.788528	2014-08-14 09:26:28.788528
22	135	Spree::Country	1	2014-08-14 09:26:28.793944	2014-08-14 09:26:28.793944
23	56	Spree::Country	1	2014-08-14 09:26:28.799313	2014-08-14 09:26:28.799313
24	207	Spree::Country	1	2014-08-14 09:26:28.804719	2014-08-14 09:26:28.804719
25	210	Spree::Country	1	2014-08-14 09:26:28.810058	2014-08-14 09:26:28.810058
26	49	Spree::Country	2	2014-08-14 09:26:28.815377	2014-08-14 09:26:28.815377
27	204	Spree::Country	2	2014-08-14 09:26:28.820717	2014-08-14 09:26:28.820717
\.


--
-- Name: spree_zone_members_id_seq; Type: SEQUENCE SET; Schema: public; Owner: u85oga
--

SELECT pg_catalog.setval('spree_zone_members_id_seq', 27, true);


--
-- Data for Name: spree_zones; Type: TABLE DATA; Schema: public; Owner: u85oga
--

COPY spree_zones (id, name, description, default_tax, zone_members_count, created_at, updated_at) FROM stdin;
1	EU_VAT	Countries that make up the EU VAT zone.	f	25	2014-08-14 09:26:28.603719	2014-08-14 09:26:28.603719
2	North America	USA + Canada	f	2	2014-08-14 09:26:28.638176	2014-08-14 09:26:28.638176
\.


--
-- Name: spree_zones_id_seq; Type: SEQUENCE SET; Schema: public; Owner: u85oga
--

SELECT pg_catalog.setval('spree_zones_id_seq', 2, true);


--
-- Name: spree_activators_pkey; Type: CONSTRAINT; Schema: public; Owner: u85oga; Tablespace: 
--

ALTER TABLE ONLY spree_promotions
    ADD CONSTRAINT spree_activators_pkey PRIMARY KEY (id);


--
-- Name: spree_addresses_pkey; Type: CONSTRAINT; Schema: public; Owner: u85oga; Tablespace: 
--

ALTER TABLE ONLY spree_addresses
    ADD CONSTRAINT spree_addresses_pkey PRIMARY KEY (id);


--
-- Name: spree_adjustments_pkey; Type: CONSTRAINT; Schema: public; Owner: u85oga; Tablespace: 
--

ALTER TABLE ONLY spree_adjustments
    ADD CONSTRAINT spree_adjustments_pkey PRIMARY KEY (id);


--
-- Name: spree_assets_pkey; Type: CONSTRAINT; Schema: public; Owner: u85oga; Tablespace: 
--

ALTER TABLE ONLY spree_assets
    ADD CONSTRAINT spree_assets_pkey PRIMARY KEY (id);


--
-- Name: spree_calculators_pkey; Type: CONSTRAINT; Schema: public; Owner: u85oga; Tablespace: 
--

ALTER TABLE ONLY spree_calculators
    ADD CONSTRAINT spree_calculators_pkey PRIMARY KEY (id);


--
-- Name: spree_configurations_pkey; Type: CONSTRAINT; Schema: public; Owner: u85oga; Tablespace: 
--

ALTER TABLE ONLY spree_configurations
    ADD CONSTRAINT spree_configurations_pkey PRIMARY KEY (id);


--
-- Name: spree_countries_pkey; Type: CONSTRAINT; Schema: public; Owner: u85oga; Tablespace: 
--

ALTER TABLE ONLY spree_countries
    ADD CONSTRAINT spree_countries_pkey PRIMARY KEY (id);


--
-- Name: spree_credit_cards_pkey; Type: CONSTRAINT; Schema: public; Owner: u85oga; Tablespace: 
--

ALTER TABLE ONLY spree_credit_cards
    ADD CONSTRAINT spree_credit_cards_pkey PRIMARY KEY (id);


--
-- Name: spree_gateways_pkey; Type: CONSTRAINT; Schema: public; Owner: u85oga; Tablespace: 
--

ALTER TABLE ONLY spree_gateways
    ADD CONSTRAINT spree_gateways_pkey PRIMARY KEY (id);


--
-- Name: spree_inventory_units_pkey; Type: CONSTRAINT; Schema: public; Owner: u85oga; Tablespace: 
--

ALTER TABLE ONLY spree_inventory_units
    ADD CONSTRAINT spree_inventory_units_pkey PRIMARY KEY (id);


--
-- Name: spree_line_items_pkey; Type: CONSTRAINT; Schema: public; Owner: u85oga; Tablespace: 
--

ALTER TABLE ONLY spree_line_items
    ADD CONSTRAINT spree_line_items_pkey PRIMARY KEY (id);


--
-- Name: spree_log_entries_pkey; Type: CONSTRAINT; Schema: public; Owner: u85oga; Tablespace: 
--

ALTER TABLE ONLY spree_log_entries
    ADD CONSTRAINT spree_log_entries_pkey PRIMARY KEY (id);


--
-- Name: spree_option_types_pkey; Type: CONSTRAINT; Schema: public; Owner: u85oga; Tablespace: 
--

ALTER TABLE ONLY spree_option_types
    ADD CONSTRAINT spree_option_types_pkey PRIMARY KEY (id);


--
-- Name: spree_option_values_pkey; Type: CONSTRAINT; Schema: public; Owner: u85oga; Tablespace: 
--

ALTER TABLE ONLY spree_option_values
    ADD CONSTRAINT spree_option_values_pkey PRIMARY KEY (id);


--
-- Name: spree_orders_pkey; Type: CONSTRAINT; Schema: public; Owner: u85oga; Tablespace: 
--

ALTER TABLE ONLY spree_orders
    ADD CONSTRAINT spree_orders_pkey PRIMARY KEY (id);


--
-- Name: spree_payment_capture_events_pkey; Type: CONSTRAINT; Schema: public; Owner: u85oga; Tablespace: 
--

ALTER TABLE ONLY spree_payment_capture_events
    ADD CONSTRAINT spree_payment_capture_events_pkey PRIMARY KEY (id);


--
-- Name: spree_payment_methods_pkey; Type: CONSTRAINT; Schema: public; Owner: u85oga; Tablespace: 
--

ALTER TABLE ONLY spree_payment_methods
    ADD CONSTRAINT spree_payment_methods_pkey PRIMARY KEY (id);


--
-- Name: spree_payments_pkey; Type: CONSTRAINT; Schema: public; Owner: u85oga; Tablespace: 
--

ALTER TABLE ONLY spree_payments
    ADD CONSTRAINT spree_payments_pkey PRIMARY KEY (id);


--
-- Name: spree_preferences_pkey; Type: CONSTRAINT; Schema: public; Owner: u85oga; Tablespace: 
--

ALTER TABLE ONLY spree_preferences
    ADD CONSTRAINT spree_preferences_pkey PRIMARY KEY (id);


--
-- Name: spree_prices_pkey; Type: CONSTRAINT; Schema: public; Owner: u85oga; Tablespace: 
--

ALTER TABLE ONLY spree_prices
    ADD CONSTRAINT spree_prices_pkey PRIMARY KEY (id);


--
-- Name: spree_product_option_types_pkey; Type: CONSTRAINT; Schema: public; Owner: u85oga; Tablespace: 
--

ALTER TABLE ONLY spree_product_option_types
    ADD CONSTRAINT spree_product_option_types_pkey PRIMARY KEY (id);


--
-- Name: spree_product_properties_pkey; Type: CONSTRAINT; Schema: public; Owner: u85oga; Tablespace: 
--

ALTER TABLE ONLY spree_product_properties
    ADD CONSTRAINT spree_product_properties_pkey PRIMARY KEY (id);


--
-- Name: spree_products_pkey; Type: CONSTRAINT; Schema: public; Owner: u85oga; Tablespace: 
--

ALTER TABLE ONLY spree_products
    ADD CONSTRAINT spree_products_pkey PRIMARY KEY (id);


--
-- Name: spree_products_taxons_pkey; Type: CONSTRAINT; Schema: public; Owner: u85oga; Tablespace: 
--

ALTER TABLE ONLY spree_products_taxons
    ADD CONSTRAINT spree_products_taxons_pkey PRIMARY KEY (id);


--
-- Name: spree_promotion_action_line_items_pkey; Type: CONSTRAINT; Schema: public; Owner: u85oga; Tablespace: 
--

ALTER TABLE ONLY spree_promotion_action_line_items
    ADD CONSTRAINT spree_promotion_action_line_items_pkey PRIMARY KEY (id);


--
-- Name: spree_promotion_actions_pkey; Type: CONSTRAINT; Schema: public; Owner: u85oga; Tablespace: 
--

ALTER TABLE ONLY spree_promotion_actions
    ADD CONSTRAINT spree_promotion_actions_pkey PRIMARY KEY (id);


--
-- Name: spree_promotion_rules_pkey; Type: CONSTRAINT; Schema: public; Owner: u85oga; Tablespace: 
--

ALTER TABLE ONLY spree_promotion_rules
    ADD CONSTRAINT spree_promotion_rules_pkey PRIMARY KEY (id);


--
-- Name: spree_properties_pkey; Type: CONSTRAINT; Schema: public; Owner: u85oga; Tablespace: 
--

ALTER TABLE ONLY spree_properties
    ADD CONSTRAINT spree_properties_pkey PRIMARY KEY (id);


--
-- Name: spree_prototypes_pkey; Type: CONSTRAINT; Schema: public; Owner: u85oga; Tablespace: 
--

ALTER TABLE ONLY spree_prototypes
    ADD CONSTRAINT spree_prototypes_pkey PRIMARY KEY (id);


--
-- Name: spree_return_authorizations_pkey; Type: CONSTRAINT; Schema: public; Owner: u85oga; Tablespace: 
--

ALTER TABLE ONLY spree_return_authorizations
    ADD CONSTRAINT spree_return_authorizations_pkey PRIMARY KEY (id);


--
-- Name: spree_roles_pkey; Type: CONSTRAINT; Schema: public; Owner: u85oga; Tablespace: 
--

ALTER TABLE ONLY spree_roles
    ADD CONSTRAINT spree_roles_pkey PRIMARY KEY (id);


--
-- Name: spree_shipments_pkey; Type: CONSTRAINT; Schema: public; Owner: u85oga; Tablespace: 
--

ALTER TABLE ONLY spree_shipments
    ADD CONSTRAINT spree_shipments_pkey PRIMARY KEY (id);


--
-- Name: spree_shipping_categories_pkey; Type: CONSTRAINT; Schema: public; Owner: u85oga; Tablespace: 
--

ALTER TABLE ONLY spree_shipping_categories
    ADD CONSTRAINT spree_shipping_categories_pkey PRIMARY KEY (id);


--
-- Name: spree_shipping_method_categories_pkey; Type: CONSTRAINT; Schema: public; Owner: u85oga; Tablespace: 
--

ALTER TABLE ONLY spree_shipping_method_categories
    ADD CONSTRAINT spree_shipping_method_categories_pkey PRIMARY KEY (id);


--
-- Name: spree_shipping_methods_pkey; Type: CONSTRAINT; Schema: public; Owner: u85oga; Tablespace: 
--

ALTER TABLE ONLY spree_shipping_methods
    ADD CONSTRAINT spree_shipping_methods_pkey PRIMARY KEY (id);


--
-- Name: spree_shipping_rates_pkey; Type: CONSTRAINT; Schema: public; Owner: u85oga; Tablespace: 
--

ALTER TABLE ONLY spree_shipping_rates
    ADD CONSTRAINT spree_shipping_rates_pkey PRIMARY KEY (id);


--
-- Name: spree_skrill_transactions_pkey; Type: CONSTRAINT; Schema: public; Owner: u85oga; Tablespace: 
--

ALTER TABLE ONLY spree_skrill_transactions
    ADD CONSTRAINT spree_skrill_transactions_pkey PRIMARY KEY (id);


--
-- Name: spree_state_changes_pkey; Type: CONSTRAINT; Schema: public; Owner: u85oga; Tablespace: 
--

ALTER TABLE ONLY spree_state_changes
    ADD CONSTRAINT spree_state_changes_pkey PRIMARY KEY (id);


--
-- Name: spree_states_pkey; Type: CONSTRAINT; Schema: public; Owner: u85oga; Tablespace: 
--

ALTER TABLE ONLY spree_states
    ADD CONSTRAINT spree_states_pkey PRIMARY KEY (id);


--
-- Name: spree_stock_items_pkey; Type: CONSTRAINT; Schema: public; Owner: u85oga; Tablespace: 
--

ALTER TABLE ONLY spree_stock_items
    ADD CONSTRAINT spree_stock_items_pkey PRIMARY KEY (id);


--
-- Name: spree_stock_locations_pkey; Type: CONSTRAINT; Schema: public; Owner: u85oga; Tablespace: 
--

ALTER TABLE ONLY spree_stock_locations
    ADD CONSTRAINT spree_stock_locations_pkey PRIMARY KEY (id);


--
-- Name: spree_stock_movements_pkey; Type: CONSTRAINT; Schema: public; Owner: u85oga; Tablespace: 
--

ALTER TABLE ONLY spree_stock_movements
    ADD CONSTRAINT spree_stock_movements_pkey PRIMARY KEY (id);


--
-- Name: spree_stock_transfers_pkey; Type: CONSTRAINT; Schema: public; Owner: u85oga; Tablespace: 
--

ALTER TABLE ONLY spree_stock_transfers
    ADD CONSTRAINT spree_stock_transfers_pkey PRIMARY KEY (id);


--
-- Name: spree_stores_pkey; Type: CONSTRAINT; Schema: public; Owner: u85oga; Tablespace: 
--

ALTER TABLE ONLY spree_stores
    ADD CONSTRAINT spree_stores_pkey PRIMARY KEY (id);


--
-- Name: spree_tax_categories_pkey; Type: CONSTRAINT; Schema: public; Owner: u85oga; Tablespace: 
--

ALTER TABLE ONLY spree_tax_categories
    ADD CONSTRAINT spree_tax_categories_pkey PRIMARY KEY (id);


--
-- Name: spree_tax_rates_pkey; Type: CONSTRAINT; Schema: public; Owner: u85oga; Tablespace: 
--

ALTER TABLE ONLY spree_tax_rates
    ADD CONSTRAINT spree_tax_rates_pkey PRIMARY KEY (id);


--
-- Name: spree_taxonomies_pkey; Type: CONSTRAINT; Schema: public; Owner: u85oga; Tablespace: 
--

ALTER TABLE ONLY spree_taxonomies
    ADD CONSTRAINT spree_taxonomies_pkey PRIMARY KEY (id);


--
-- Name: spree_taxons_pkey; Type: CONSTRAINT; Schema: public; Owner: u85oga; Tablespace: 
--

ALTER TABLE ONLY spree_taxons
    ADD CONSTRAINT spree_taxons_pkey PRIMARY KEY (id);


--
-- Name: spree_tokenized_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: u85oga; Tablespace: 
--

ALTER TABLE ONLY spree_tokenized_permissions
    ADD CONSTRAINT spree_tokenized_permissions_pkey PRIMARY KEY (id);


--
-- Name: spree_trackers_pkey; Type: CONSTRAINT; Schema: public; Owner: u85oga; Tablespace: 
--

ALTER TABLE ONLY spree_trackers
    ADD CONSTRAINT spree_trackers_pkey PRIMARY KEY (id);


--
-- Name: spree_users_pkey; Type: CONSTRAINT; Schema: public; Owner: u85oga; Tablespace: 
--

ALTER TABLE ONLY spree_users
    ADD CONSTRAINT spree_users_pkey PRIMARY KEY (id);


--
-- Name: spree_variants_pkey; Type: CONSTRAINT; Schema: public; Owner: u85oga; Tablespace: 
--

ALTER TABLE ONLY spree_variants
    ADD CONSTRAINT spree_variants_pkey PRIMARY KEY (id);


--
-- Name: spree_zone_members_pkey; Type: CONSTRAINT; Schema: public; Owner: u85oga; Tablespace: 
--

ALTER TABLE ONLY spree_zone_members
    ADD CONSTRAINT spree_zone_members_pkey PRIMARY KEY (id);


--
-- Name: spree_zones_pkey; Type: CONSTRAINT; Schema: public; Owner: u85oga; Tablespace: 
--

ALTER TABLE ONLY spree_zones
    ADD CONSTRAINT spree_zones_pkey PRIMARY KEY (id);


--
-- Name: email_idx_unique; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE UNIQUE INDEX email_idx_unique ON spree_users USING btree (email);


--
-- Name: index_addresses_on_firstname; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_addresses_on_firstname ON spree_addresses USING btree (firstname);


--
-- Name: index_addresses_on_lastname; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_addresses_on_lastname ON spree_addresses USING btree (lastname);


--
-- Name: index_adjustments_on_order_id; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_adjustments_on_order_id ON spree_adjustments USING btree (adjustable_id);


--
-- Name: index_assets_on_viewable_id; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_assets_on_viewable_id ON spree_assets USING btree (viewable_id);


--
-- Name: index_assets_on_viewable_type_and_type; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_assets_on_viewable_type_and_type ON spree_assets USING btree (viewable_type, type);


--
-- Name: index_inventory_units_on_order_id; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_inventory_units_on_order_id ON spree_inventory_units USING btree (order_id);


--
-- Name: index_inventory_units_on_shipment_id; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_inventory_units_on_shipment_id ON spree_inventory_units USING btree (shipment_id);


--
-- Name: index_inventory_units_on_variant_id; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_inventory_units_on_variant_id ON spree_inventory_units USING btree (variant_id);


--
-- Name: index_option_values_variants_on_variant_id_and_option_value_id; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_option_values_variants_on_variant_id_and_option_value_id ON spree_option_values_variants USING btree (variant_id, option_value_id);


--
-- Name: index_product_properties_on_product_id; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_product_properties_on_product_id ON spree_product_properties USING btree (product_id);


--
-- Name: index_products_promotion_rules_on_product_id; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_products_promotion_rules_on_product_id ON spree_products_promotion_rules USING btree (product_id);


--
-- Name: index_products_promotion_rules_on_promotion_rule_id; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_products_promotion_rules_on_promotion_rule_id ON spree_products_promotion_rules USING btree (promotion_rule_id);


--
-- Name: index_promotion_rules_on_product_group_id; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_promotion_rules_on_product_group_id ON spree_promotion_rules USING btree (product_group_id);


--
-- Name: index_promotion_rules_on_user_id; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_promotion_rules_on_user_id ON spree_promotion_rules USING btree (user_id);


--
-- Name: index_promotion_rules_users_on_promotion_rule_id; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_promotion_rules_users_on_promotion_rule_id ON spree_promotion_rules_users USING btree (promotion_rule_id);


--
-- Name: index_promotion_rules_users_on_user_id; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_promotion_rules_users_on_user_id ON spree_promotion_rules_users USING btree (user_id);


--
-- Name: index_shipments_on_number; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_shipments_on_number ON spree_shipments USING btree (number);


--
-- Name: index_spree_addresses_on_country_id; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_spree_addresses_on_country_id ON spree_addresses USING btree (country_id);


--
-- Name: index_spree_addresses_on_state_id; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_spree_addresses_on_state_id ON spree_addresses USING btree (state_id);


--
-- Name: index_spree_adjustments_on_adjustable_id_and_adjustable_type; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_spree_adjustments_on_adjustable_id_and_adjustable_type ON spree_adjustments USING btree (adjustable_id, adjustable_type);


--
-- Name: index_spree_adjustments_on_eligible; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_spree_adjustments_on_eligible ON spree_adjustments USING btree (eligible);


--
-- Name: index_spree_adjustments_on_order_id; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_spree_adjustments_on_order_id ON spree_adjustments USING btree (order_id);


--
-- Name: index_spree_adjustments_on_source_id_and_source_type; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_spree_adjustments_on_source_id_and_source_type ON spree_adjustments USING btree (source_id, source_type);


--
-- Name: index_spree_calculators_on_calculable_id_and_calculable_type; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_spree_calculators_on_calculable_id_and_calculable_type ON spree_calculators USING btree (calculable_id, calculable_type);


--
-- Name: index_spree_calculators_on_id_and_type; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_spree_calculators_on_id_and_type ON spree_calculators USING btree (id, type);


--
-- Name: index_spree_configurations_on_name_and_type; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_spree_configurations_on_name_and_type ON spree_configurations USING btree (name, type);


--
-- Name: index_spree_credit_cards_on_address_id; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_spree_credit_cards_on_address_id ON spree_credit_cards USING btree (address_id);


--
-- Name: index_spree_credit_cards_on_payment_method_id; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_spree_credit_cards_on_payment_method_id ON spree_credit_cards USING btree (payment_method_id);


--
-- Name: index_spree_credit_cards_on_user_id; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_spree_credit_cards_on_user_id ON spree_credit_cards USING btree (user_id);


--
-- Name: index_spree_gateways_on_active; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_spree_gateways_on_active ON spree_gateways USING btree (active);


--
-- Name: index_spree_gateways_on_test_mode; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_spree_gateways_on_test_mode ON spree_gateways USING btree (test_mode);


--
-- Name: index_spree_inventory_units_on_line_item_id; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_spree_inventory_units_on_line_item_id ON spree_inventory_units USING btree (line_item_id);


--
-- Name: index_spree_inventory_units_on_return_authorization_id; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_spree_inventory_units_on_return_authorization_id ON spree_inventory_units USING btree (return_authorization_id);


--
-- Name: index_spree_line_items_on_order_id; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_spree_line_items_on_order_id ON spree_line_items USING btree (order_id);


--
-- Name: index_spree_line_items_on_tax_category_id; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_spree_line_items_on_tax_category_id ON spree_line_items USING btree (tax_category_id);


--
-- Name: index_spree_line_items_on_variant_id; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_spree_line_items_on_variant_id ON spree_line_items USING btree (variant_id);


--
-- Name: index_spree_log_entries_on_source_id_and_source_type; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_spree_log_entries_on_source_id_and_source_type ON spree_log_entries USING btree (source_id, source_type);


--
-- Name: index_spree_option_types_on_position; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_spree_option_types_on_position ON spree_option_types USING btree ("position");


--
-- Name: index_spree_option_values_on_option_type_id; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_spree_option_values_on_option_type_id ON spree_option_values USING btree (option_type_id);


--
-- Name: index_spree_option_values_on_position; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_spree_option_values_on_position ON spree_option_values USING btree ("position");


--
-- Name: index_spree_option_values_variants_on_variant_id; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_spree_option_values_variants_on_variant_id ON spree_option_values_variants USING btree (variant_id);


--
-- Name: index_spree_orders_on_approver_id; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_spree_orders_on_approver_id ON spree_orders USING btree (approver_id);


--
-- Name: index_spree_orders_on_bill_address_id; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_spree_orders_on_bill_address_id ON spree_orders USING btree (bill_address_id);


--
-- Name: index_spree_orders_on_completed_at; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_spree_orders_on_completed_at ON spree_orders USING btree (completed_at);


--
-- Name: index_spree_orders_on_confirmation_delivered; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_spree_orders_on_confirmation_delivered ON spree_orders USING btree (confirmation_delivered);


--
-- Name: index_spree_orders_on_considered_risky; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_spree_orders_on_considered_risky ON spree_orders USING btree (considered_risky);


--
-- Name: index_spree_orders_on_created_by_id; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_spree_orders_on_created_by_id ON spree_orders USING btree (created_by_id);


--
-- Name: index_spree_orders_on_number; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_spree_orders_on_number ON spree_orders USING btree (number);


--
-- Name: index_spree_orders_on_ship_address_id; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_spree_orders_on_ship_address_id ON spree_orders USING btree (ship_address_id);


--
-- Name: index_spree_orders_on_shipping_method_id; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_spree_orders_on_shipping_method_id ON spree_orders USING btree (shipping_method_id);


--
-- Name: index_spree_orders_on_user_id; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_spree_orders_on_user_id ON spree_orders USING btree (user_id);


--
-- Name: index_spree_orders_on_user_id_and_created_by_id; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_spree_orders_on_user_id_and_created_by_id ON spree_orders USING btree (user_id, created_by_id);


--
-- Name: index_spree_orders_promotions_on_order_id_and_promotion_id; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_spree_orders_promotions_on_order_id_and_promotion_id ON spree_orders_promotions USING btree (order_id, promotion_id);


--
-- Name: index_spree_payment_capture_events_on_payment_id; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_spree_payment_capture_events_on_payment_id ON spree_payment_capture_events USING btree (payment_id);


--
-- Name: index_spree_payment_methods_on_id_and_type; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_spree_payment_methods_on_id_and_type ON spree_payment_methods USING btree (id, type);


--
-- Name: index_spree_payments_on_order_id; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_spree_payments_on_order_id ON spree_payments USING btree (order_id);


--
-- Name: index_spree_payments_on_payment_method_id; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_spree_payments_on_payment_method_id ON spree_payments USING btree (payment_method_id);


--
-- Name: index_spree_payments_on_source_id_and_source_type; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_spree_payments_on_source_id_and_source_type ON spree_payments USING btree (source_id, source_type);


--
-- Name: index_spree_preferences_on_key; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE UNIQUE INDEX index_spree_preferences_on_key ON spree_preferences USING btree (key);


--
-- Name: index_spree_prices_on_deleted_at; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_spree_prices_on_deleted_at ON spree_prices USING btree (deleted_at);


--
-- Name: index_spree_prices_on_variant_id_and_currency; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_spree_prices_on_variant_id_and_currency ON spree_prices USING btree (variant_id, currency);


--
-- Name: index_spree_product_option_types_on_option_type_id; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_spree_product_option_types_on_option_type_id ON spree_product_option_types USING btree (option_type_id);


--
-- Name: index_spree_product_option_types_on_position; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_spree_product_option_types_on_position ON spree_product_option_types USING btree ("position");


--
-- Name: index_spree_product_option_types_on_product_id; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_spree_product_option_types_on_product_id ON spree_product_option_types USING btree (product_id);


--
-- Name: index_spree_product_properties_on_position; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_spree_product_properties_on_position ON spree_product_properties USING btree ("position");


--
-- Name: index_spree_product_properties_on_property_id; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_spree_product_properties_on_property_id ON spree_product_properties USING btree (property_id);


--
-- Name: index_spree_products_on_available_on; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_spree_products_on_available_on ON spree_products USING btree (available_on);


--
-- Name: index_spree_products_on_deleted_at; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_spree_products_on_deleted_at ON spree_products USING btree (deleted_at);


--
-- Name: index_spree_products_on_name; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_spree_products_on_name ON spree_products USING btree (name);


--
-- Name: index_spree_products_on_shipping_category_id; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_spree_products_on_shipping_category_id ON spree_products USING btree (shipping_category_id);


--
-- Name: index_spree_products_on_slug; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_spree_products_on_slug ON spree_products USING btree (slug);


--
-- Name: index_spree_products_on_tax_category_id; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_spree_products_on_tax_category_id ON spree_products USING btree (tax_category_id);


--
-- Name: index_spree_products_taxons_on_position; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_spree_products_taxons_on_position ON spree_products_taxons USING btree ("position");


--
-- Name: index_spree_products_taxons_on_product_id; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_spree_products_taxons_on_product_id ON spree_products_taxons USING btree (product_id);


--
-- Name: index_spree_products_taxons_on_taxon_id; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_spree_products_taxons_on_taxon_id ON spree_products_taxons USING btree (taxon_id);


--
-- Name: index_spree_promotion_action_line_items_on_promotion_action_id; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_spree_promotion_action_line_items_on_promotion_action_id ON spree_promotion_action_line_items USING btree (promotion_action_id);


--
-- Name: index_spree_promotion_action_line_items_on_variant_id; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_spree_promotion_action_line_items_on_variant_id ON spree_promotion_action_line_items USING btree (variant_id);


--
-- Name: index_spree_promotion_actions_on_deleted_at; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_spree_promotion_actions_on_deleted_at ON spree_promotion_actions USING btree (deleted_at);


--
-- Name: index_spree_promotion_actions_on_id_and_type; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_spree_promotion_actions_on_id_and_type ON spree_promotion_actions USING btree (id, type);


--
-- Name: index_spree_promotion_actions_on_promotion_id; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_spree_promotion_actions_on_promotion_id ON spree_promotion_actions USING btree (promotion_id);


--
-- Name: index_spree_promotion_rules_on_promotion_id; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_spree_promotion_rules_on_promotion_id ON spree_promotion_rules USING btree (promotion_id);


--
-- Name: index_spree_promotions_on_advertise; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_spree_promotions_on_advertise ON spree_promotions USING btree (advertise);


--
-- Name: index_spree_promotions_on_code; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_spree_promotions_on_code ON spree_promotions USING btree (code);


--
-- Name: index_spree_promotions_on_expires_at; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_spree_promotions_on_expires_at ON spree_promotions USING btree (expires_at);


--
-- Name: index_spree_promotions_on_id_and_type; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_spree_promotions_on_id_and_type ON spree_promotions USING btree (id, type);


--
-- Name: index_spree_promotions_on_starts_at; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_spree_promotions_on_starts_at ON spree_promotions USING btree (starts_at);


--
-- Name: index_spree_return_authorizations_on_number; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_spree_return_authorizations_on_number ON spree_return_authorizations USING btree (number);


--
-- Name: index_spree_return_authorizations_on_order_id; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_spree_return_authorizations_on_order_id ON spree_return_authorizations USING btree (order_id);


--
-- Name: index_spree_return_authorizations_on_stock_location_id; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_spree_return_authorizations_on_stock_location_id ON spree_return_authorizations USING btree (stock_location_id);


--
-- Name: index_spree_roles_users_on_role_id; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_spree_roles_users_on_role_id ON spree_roles_users USING btree (role_id);


--
-- Name: index_spree_roles_users_on_user_id; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_spree_roles_users_on_user_id ON spree_roles_users USING btree (user_id);


--
-- Name: index_spree_shipments_on_address_id; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_spree_shipments_on_address_id ON spree_shipments USING btree (address_id);


--
-- Name: index_spree_shipments_on_order_id; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_spree_shipments_on_order_id ON spree_shipments USING btree (order_id);


--
-- Name: index_spree_shipments_on_stock_location_id; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_spree_shipments_on_stock_location_id ON spree_shipments USING btree (stock_location_id);


--
-- Name: index_spree_shipping_method_categories_on_shipping_method_id; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_spree_shipping_method_categories_on_shipping_method_id ON spree_shipping_method_categories USING btree (shipping_method_id);


--
-- Name: index_spree_shipping_methods_on_deleted_at; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_spree_shipping_methods_on_deleted_at ON spree_shipping_methods USING btree (deleted_at);


--
-- Name: index_spree_shipping_methods_on_tax_category_id; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_spree_shipping_methods_on_tax_category_id ON spree_shipping_methods USING btree (tax_category_id);


--
-- Name: index_spree_shipping_rates_on_selected; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_spree_shipping_rates_on_selected ON spree_shipping_rates USING btree (selected);


--
-- Name: index_spree_shipping_rates_on_tax_rate_id; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_spree_shipping_rates_on_tax_rate_id ON spree_shipping_rates USING btree (tax_rate_id);


--
-- Name: index_spree_state_changes_on_stateful_id_and_stateful_type; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_spree_state_changes_on_stateful_id_and_stateful_type ON spree_state_changes USING btree (stateful_id, stateful_type);


--
-- Name: index_spree_state_changes_on_user_id; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_spree_state_changes_on_user_id ON spree_state_changes USING btree (user_id);


--
-- Name: index_spree_states_on_country_id; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_spree_states_on_country_id ON spree_states USING btree (country_id);


--
-- Name: index_spree_stock_items_on_backorderable; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_spree_stock_items_on_backorderable ON spree_stock_items USING btree (backorderable);


--
-- Name: index_spree_stock_items_on_deleted_at; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_spree_stock_items_on_deleted_at ON spree_stock_items USING btree (deleted_at);


--
-- Name: index_spree_stock_items_on_stock_location_id; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_spree_stock_items_on_stock_location_id ON spree_stock_items USING btree (stock_location_id);


--
-- Name: index_spree_stock_locations_on_active; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_spree_stock_locations_on_active ON spree_stock_locations USING btree (active);


--
-- Name: index_spree_stock_locations_on_backorderable_default; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_spree_stock_locations_on_backorderable_default ON spree_stock_locations USING btree (backorderable_default);


--
-- Name: index_spree_stock_locations_on_country_id; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_spree_stock_locations_on_country_id ON spree_stock_locations USING btree (country_id);


--
-- Name: index_spree_stock_locations_on_propagate_all_variants; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_spree_stock_locations_on_propagate_all_variants ON spree_stock_locations USING btree (propagate_all_variants);


--
-- Name: index_spree_stock_locations_on_state_id; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_spree_stock_locations_on_state_id ON spree_stock_locations USING btree (state_id);


--
-- Name: index_spree_stock_movements_on_stock_item_id; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_spree_stock_movements_on_stock_item_id ON spree_stock_movements USING btree (stock_item_id);


--
-- Name: index_spree_stock_transfers_on_destination_location_id; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_spree_stock_transfers_on_destination_location_id ON spree_stock_transfers USING btree (destination_location_id);


--
-- Name: index_spree_stock_transfers_on_number; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_spree_stock_transfers_on_number ON spree_stock_transfers USING btree (number);


--
-- Name: index_spree_stock_transfers_on_source_location_id; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_spree_stock_transfers_on_source_location_id ON spree_stock_transfers USING btree (source_location_id);


--
-- Name: index_spree_stores_on_code; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_spree_stores_on_code ON spree_stores USING btree (code);


--
-- Name: index_spree_stores_on_default; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_spree_stores_on_default ON spree_stores USING btree ("default");


--
-- Name: index_spree_stores_on_url; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_spree_stores_on_url ON spree_stores USING btree (url);


--
-- Name: index_spree_tax_categories_on_deleted_at; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_spree_tax_categories_on_deleted_at ON spree_tax_categories USING btree (deleted_at);


--
-- Name: index_spree_tax_categories_on_is_default; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_spree_tax_categories_on_is_default ON spree_tax_categories USING btree (is_default);


--
-- Name: index_spree_tax_rates_on_deleted_at; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_spree_tax_rates_on_deleted_at ON spree_tax_rates USING btree (deleted_at);


--
-- Name: index_spree_tax_rates_on_included_in_price; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_spree_tax_rates_on_included_in_price ON spree_tax_rates USING btree (included_in_price);


--
-- Name: index_spree_tax_rates_on_show_rate_in_label; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_spree_tax_rates_on_show_rate_in_label ON spree_tax_rates USING btree (show_rate_in_label);


--
-- Name: index_spree_tax_rates_on_tax_category_id; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_spree_tax_rates_on_tax_category_id ON spree_tax_rates USING btree (tax_category_id);


--
-- Name: index_spree_tax_rates_on_zone_id; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_spree_tax_rates_on_zone_id ON spree_tax_rates USING btree (zone_id);


--
-- Name: index_spree_taxonomies_on_position; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_spree_taxonomies_on_position ON spree_taxonomies USING btree ("position");


--
-- Name: index_spree_taxons_on_position; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_spree_taxons_on_position ON spree_taxons USING btree ("position");


--
-- Name: index_spree_trackers_on_active; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_spree_trackers_on_active ON spree_trackers USING btree (active);


--
-- Name: index_spree_users_on_spree_api_key; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_spree_users_on_spree_api_key ON spree_users USING btree (spree_api_key);


--
-- Name: index_spree_variants_on_deleted_at; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_spree_variants_on_deleted_at ON spree_variants USING btree (deleted_at);


--
-- Name: index_spree_variants_on_is_master; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_spree_variants_on_is_master ON spree_variants USING btree (is_master);


--
-- Name: index_spree_variants_on_position; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_spree_variants_on_position ON spree_variants USING btree ("position");


--
-- Name: index_spree_variants_on_product_id; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_spree_variants_on_product_id ON spree_variants USING btree (product_id);


--
-- Name: index_spree_variants_on_sku; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_spree_variants_on_sku ON spree_variants USING btree (sku);


--
-- Name: index_spree_variants_on_tax_category_id; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_spree_variants_on_tax_category_id ON spree_variants USING btree (tax_category_id);


--
-- Name: index_spree_variants_on_track_inventory; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_spree_variants_on_track_inventory ON spree_variants USING btree (track_inventory);


--
-- Name: index_spree_zone_members_on_zone_id; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_spree_zone_members_on_zone_id ON spree_zone_members USING btree (zone_id);


--
-- Name: index_spree_zone_members_on_zoneable_id_and_zoneable_type; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_spree_zone_members_on_zoneable_id_and_zoneable_type ON spree_zone_members USING btree (zoneable_id, zoneable_type);


--
-- Name: index_spree_zones_on_default_tax; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_spree_zones_on_default_tax ON spree_zones USING btree (default_tax);


--
-- Name: index_taxons_on_parent_id; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_taxons_on_parent_id ON spree_taxons USING btree (parent_id);


--
-- Name: index_taxons_on_permalink; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_taxons_on_permalink ON spree_taxons USING btree (permalink);


--
-- Name: index_taxons_on_taxonomy_id; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_taxons_on_taxonomy_id ON spree_taxons USING btree (taxonomy_id);


--
-- Name: index_tokenized_name_and_type; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX index_tokenized_name_and_type ON spree_tokenized_permissions USING btree (permissable_id, permissable_type);


--
-- Name: permalink_idx_unique; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE UNIQUE INDEX permalink_idx_unique ON spree_products USING btree (slug);


--
-- Name: spree_shipping_rates_join_index; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE UNIQUE INDEX spree_shipping_rates_join_index ON spree_shipping_rates USING btree (shipment_id, shipping_method_id);


--
-- Name: stock_item_by_loc_and_var_id; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE INDEX stock_item_by_loc_and_var_id ON spree_stock_items USING btree (stock_location_id, variant_id);


--
-- Name: unique_schema_migrations; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE UNIQUE INDEX unique_schema_migrations ON schema_migrations USING btree (version);


--
-- Name: unique_spree_shipping_method_categories; Type: INDEX; Schema: public; Owner: u85oga; Tablespace: 
--

CREATE UNIQUE INDEX unique_spree_shipping_method_categories ON spree_shipping_method_categories USING btree (shipping_category_id, shipping_method_id);


--
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

