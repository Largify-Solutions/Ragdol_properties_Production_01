/**
 * Ragdol Properties Investment Map - Database Integration Guide
 * 
 * This document provides the required database schema for the investment map
 * to function with real-time property data and area statistics.
 */

-- ==========================================
-- TABLE: properties
-- ==========================================
-- Stores all property listings with location data for map visualization

CREATE TABLE IF NOT EXISTS properties (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Basic Property Info
  title VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(15, 2) NOT NULL,
  price_per_sqft DECIMAL(10, 2) NOT NULL,
  
  -- Location & Mapping
  location VARCHAR(100) NOT NULL, -- e.g., "Downtown Dubai", "Dubai Marina"
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  
  -- Property Details
  property_type VARCHAR(50) NOT NULL, -- "apartment", "villa", "commercial", "land"
  bedrooms INT,
  bathrooms INT,
  area_sqft INT,
  year_built INT,
  
  -- Status & Availability
  status VARCHAR(50) NOT NULL DEFAULT 'available', -- "available", "under_construction", "sold", "rented"
  featured BOOLEAN DEFAULT false,
  
  -- Image & Media
  primary_image_url VARCHAR(500),
  image_urls TEXT[], -- JSON array of image URLs
  
  -- Agent/Admin Info
  agent_id UUID REFERENCES agents(id),
  admin_id UUID REFERENCES admin_users(id),
  
  -- Metadata
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now(),
  published_at TIMESTAMP,
  
  -- Indexes for fast queries
  CONSTRAINT price_check CHECK (price > 0),
  CONSTRAINT price_sqft_check CHECK (price_per_sqft > 0)
);

-- Create indexes for map queries
CREATE INDEX idx_properties_location ON properties(location);
CREATE INDEX idx_properties_status ON properties(status);
CREATE INDEX idx_properties_coordinates ON properties(latitude, longitude);
CREATE INDEX idx_properties_created_at ON properties(created_at DESC);
CREATE INDEX idx_properties_featured ON properties(featured);

-- ==========================================
-- TABLE: area_statistics (cached/materialized)
-- ==========================================
-- Stores pre-calculated area statistics updated periodically

CREATE TABLE IF NOT EXISTS area_statistics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  area_name VARCHAR(100) NOT NULL UNIQUE,
  
  -- Market Data
  total_properties INT DEFAULT 0,
  available_properties INT DEFAULT 0,
  avg_price_sqft DECIMAL(10, 2),
  median_price_sqft DECIMAL(10, 2),
  units_under_construction INT DEFAULT 0,
  sales_volume INT DEFAULT 0,
  
  -- Geographic Data
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  boundary_polygon POLYGON, -- PostGIS polygon for area boundary
  
  -- Timestamps
  last_updated TIMESTAMP DEFAULT now(),
  created_at TIMESTAMP DEFAULT now()
);

-- Create indexes for fast area lookups
CREATE INDEX idx_area_stats_name ON area_statistics(area_name);
CREATE INDEX idx_area_stats_location ON area_statistics(latitude, longitude);

-- ==========================================
-- MATERIALIZED VIEW: latest_property_insights
-- ==========================================
-- Provides real-time aggregated data for the investment map

CREATE MATERIALIZED VIEW latest_property_insights AS
SELECT
  location,
  COUNT(*) as total_properties,
  COUNT(*) FILTER (WHERE status = 'available') as available_properties,
  COUNT(*) FILTER (WHERE status = 'under_construction') as units_under_construction,
  COUNT(*) FILTER (WHERE status = 'sold') as sales_volume,
  AVG(price_per_sqft) as avg_price_sqft,
  PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY price_per_sqft) as median_price_sqft,
  MIN(latitude) as lat_min,
  MAX(latitude) as lat_max,
  MIN(longitude) as lng_min,
  MAX(longitude) as lng_max,
  NOW() as last_updated
FROM properties
WHERE published_at IS NOT NULL
GROUP BY location;

-- Create index on materialized view for fast queries
CREATE UNIQUE INDEX idx_insights_location ON latest_property_insights(location);

-- ==========================================
-- FUNCTION: refresh_area_statistics
-- ==========================================
-- Updates area_statistics table with fresh data from properties

CREATE OR REPLACE FUNCTION refresh_area_statistics()
RETURNS void AS $$
BEGIN
  INSERT INTO area_statistics (
    area_name,
    total_properties,
    available_properties,
    units_under_construction,
    sales_volume,
    avg_price_sqft,
    median_price_sqft,
    last_updated
  )
  SELECT
    location,
    COUNT(*)::INT,
    COUNT(*) FILTER (WHERE status = 'available')::INT,
    COUNT(*) FILTER (WHERE status = 'under_construction')::INT,
    COUNT(*) FILTER (WHERE status = 'sold')::INT,
    ROUND(AVG(price_per_sqft)::NUMERIC, 2),
    PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY price_per_sqft),
    NOW()
  FROM properties
  WHERE published_at IS NOT NULL
  GROUP BY location
  ON CONFLICT (area_name) DO UPDATE SET
    total_properties = EXCLUDED.total_properties,
    available_properties = EXCLUDED.available_properties,
    units_under_construction = EXCLUDED.units_under_construction,
    sales_volume = EXCLUDED.sales_volume,
    avg_price_sqft = EXCLUDED.avg_price_sqft,
    median_price_sqft = EXCLUDED.median_price_sqft,
    last_updated = NOW();
END;
$$ LANGUAGE plpgsql;

-- ==========================================
-- FUNCTION: update_property_timestamp
-- ==========================================
-- Automatically updates the updated_at timestamp

CREATE OR REPLACE FUNCTION update_property_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_property_timestamp
BEFORE UPDATE ON properties
FOR EACH ROW
EXECUTE FUNCTION update_property_timestamp();

-- ==========================================
-- TRIGGER: update_area_stats_on_property_change
-- ==========================================
-- Refreshes area statistics when properties change

CREATE OR REPLACE FUNCTION trigger_refresh_area_stats()
RETURNS TRIGGER AS $$
BEGIN
  -- Schedule refresh to run asynchronously (for production, use pg_cron)
  PERFORM refresh_area_statistics();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_property_change
AFTER INSERT OR UPDATE OR DELETE ON properties
FOR EACH ROW
EXECUTE FUNCTION trigger_refresh_area_stats();

-- ==========================================
-- SAMPLE DATA INSERTION
-- ==========================================
-- Insert sample properties for testing

INSERT INTO properties (
  title,
  description,
  price,
  price_per_sqft,
  location,
  latitude,
  longitude,
  property_type,
  bedrooms,
  bathrooms,
  area_sqft,
  status,
  featured,
  published_at
) VALUES
  (
    'Luxury Apartment in Downtown Dubai',
    'Premium apartment with stunning city views',
    2500000,
    4500,
    'Downtown Dubai',
    25.1972,
    55.2744,
    'apartment',
    3,
    2,
    556,
    'available',
    true,
    NOW()
  ),
  (
    'Modern Villa in Arabian Ranches',
    'Spacious villa with garden',
    3800000,
    3200,
    'Arabian Ranches',
    25.0853,
    55.1186,
    'villa',
    4,
    4,
    1187,
    'available',
    true,
    NOW()
  ),
  (
    'Beachfront Penthouse Dubai Marina',
    'Ultra-luxury with private beach access',
    5200000,
    5200,
    'Dubai Marina',
    25.0867,
    55.1414,
    'apartment',
    4,
    3,
    1000,
    'available',
    true,
    NOW()
  );

-- ==========================================
-- RLS POLICIES (if using PostgreSQL with RLS)
-- ==========================================
-- Enable Row Level Security

ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE area_statistics ENABLE ROW LEVEL SECURITY;

-- Public can view published properties
CREATE POLICY properties_select_public ON properties
  FOR SELECT
  USING (published_at IS NOT NULL);

-- Agents/Admins can view all properties
CREATE POLICY properties_select_admin ON properties
  FOR SELECT
  USING (
    auth.role() = 'authenticated' AND
    (agent_id = auth.uid() OR admin_id = auth.uid())
  );

-- ==========================================
-- ENDPOINTS CONNECTED TO THIS SCHEMA
-- ==========================================
/*
API Routes using this data:

1. GET /api/properties/map
   - Fetches all properties for map visualization
   - Returns: { properties, areaStats, total, timestamp }

2. GET /api/properties/map?area={areaName}
   - Filters properties by area/location
   - Returns: { properties, areaStats, total }

3. GET /api/properties/map?type={propertyType}
   - Filters properties by type (apartment, villa, commercial)
   - Returns: { properties, filtered count }

4. GET /api/area-statistics
   - Returns cached area statistics
   - Includes: avg_price_sqft, units_under_construction, sales_volume

5. POST /api/properties (admin only)
   - Creates new property listings
   - Triggers automatic area_statistics update

6. PATCH /api/properties/{id} (admin only)
   - Updates existing property
   - Updates published_at timestamp for visibility
   - Triggers area_statistics refresh

7. GET /api/properties/insights/real-time
   - Returns live materialized view data
   - Refreshes every 30 seconds on frontend
*/

-- ==========================================
-- PERFORMANCE TIPS
-- ==========================================
/*
1. Refresh Statistics Periodically:
   SELECT refresh_area_statistics();
   -- Schedule with pg_cron for production:
   -- SELECT cron.schedule('refresh_area_stats', '*/5 * * * *', 'SELECT refresh_area_statistics();');

2. Monitor Query Performance:
   EXPLAIN ANALYZE SELECT * FROM properties WHERE location = 'Downtown Dubai';

3. Vacuum and Analyze:
   VACUUM ANALYZE properties;
   VACUUM ANALYZE area_statistics;

4. For Large Datasets, Consider Partitioning:
   -- Partition by location for faster queries
   -- PARTITION BY LIST (location)

5. Real-Time Updates:
   - Use PostgreSQL LISTEN/NOTIFY for WebSocket updates
   - Or implement polling with 30-second intervals (current implementation)
*/
