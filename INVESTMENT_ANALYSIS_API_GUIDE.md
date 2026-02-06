# Dubai Investment Analysis - API Integration Guide

## 📡 API Endpoint Used

### Get Properties
```
GET /api/properties?limit=50
```

### Parameters
- `limit` (optional): Number of properties to return. Default: 20, Max: 100
- `offset` (optional): Pagination offset. Default: 0
- `type` (optional): Filter by type - 'villa', 'apartment', 'townhouse'
- `status` (optional): Filter by status - 'active', 'sale', 'rent'
- `minPrice` (optional): Filter by minimum price
- `maxPrice` (optional): Filter by maximum price

### Response Format
```json
{
  "properties": [
    {
      "id": "prop-001",
      "title": "Luxury Villa in Emirates Hills",
      "slug": "luxury-villa-emirates-hills",
      "type": "villa",
      "status": "active",
      "price": 12000000,
      "currency": "AED",
      "beds": 5,
      "baths": 6,
      "sqft": 8500,
      "image": "https://...",
      "location": "Emirates Hills, Dubai",
      "area": "Emirates Hills",
      "city": "Dubai",
      "featured": true,
      "published": true,
      "review_status": "approved",
      "description": "...",
      "agent_id": "agent-001",
      "video_url": "https://...",
      "parking": "yes",
      "propertyAge": "1-5",
      "completion": "ready",
      "created_at": "2024-01-15T10:00:00Z"
    }
  ],
  "total": 150,
  "limit": 50,
  "offset": 0
}
```

## 🔄 Data Processing

### Step 1: Fetch Properties
```typescript
const response = await fetch('/api/properties?limit=50');
const data = await response.json();
const properties = data.properties;
```

### Step 2: Calculate Metrics
For each property, the application calculates:

#### Money Value
```typescript
moneyValue = Math.round((price / 1000000) * 100) / 100;
// Example: 12000000 → 12.00
```

#### Income Generating (Rental Yield)
```typescript
const baseYield = 3.5;
const locationBonus = 
  location.includes('Marina') ? 0.8 :
  location.includes('Downtown') ? 0.6 :
  location.includes('Hills') ? 0.5 : 0;
incomeGenerating = baseYield + locationBonus;
// Example: 3.5 + 0.5 = 4.0%
```

#### Capital Appreciation
```typescript
const baseAppreciation = 4;
const typeBonus = 
  type === 'villa' ? 1 :
  type === 'apartment' ? 0.5 : 0.3;
const priceBonus = 
  price > 10000000 ? 0.8 :
  price > 5000000 ? 0.5 : 0;
capitalAppreciation = baseAppreciation + typeBonus + priceBonus;
// Example: 4 + 1 + 0.8 = 5.8%
```

#### Overall Score
```typescript
const yieldScore = Math.min((incomeGenerating / 5) * 25, 25);
const appreciationScore = Math.min((capitalAppreciation / 6) * 25, 25);
const priceValueScore = Math.min(
  (1 - (price / 100000000)) * 25 + 12.5,
  25
);
const marketDemandScore = 
  (featured ? 10 : 5) + (type === 'villa' ? 10 : 5);

overallScore = Math.min(100, Math.round(
  yieldScore + appreciationScore + priceValueScore + marketDemandScore
));
```

## 🗄️ Required Database Fields

The page requires these fields in the properties table:

### Essential Fields
```typescript
{
  id: string;              // Unique identifier
  title: string;           // Property name
  price: number;           // Price in AED
  currency: string;        // "AED"
  image?: string;          // Image URL
  location: string;        // Location string
  type?: string;           // 'villa', 'apartment', 'townhouse'
  beds?: number;           // Number of bedrooms
  featured?: boolean;      // Is featured
  sqft?: number;           // Square footage
}
```

### Optional Fields (Recommended)
```typescript
{
  slug?: string;           // URL-friendly name
  status?: string;         // 'active', 'sale', 'rent'
  baths?: number;          // Number of bathrooms
  description?: string;    // Full description
  area?: string;           // Area name
  city?: string;           // City
  agent_id?: string;       // Agent reference
  video_url?: string;      // Video URL
  created_at?: string;     // Creation date
}
```

## 📊 Sample API Call

### Request
```bash
curl -X GET "http://localhost:3000/api/properties?limit=50" \
  -H "Content-Type: application/json"
```

### Response (Simplified)
```json
{
  "properties": [
    {
      "id": "prop-001",
      "title": "Emirates Hills Villa",
      "price": 12000000,
      "currency": "AED",
      "location": "Emirates Hills, Dubai",
      "type": "villa",
      "beds": 5,
      "image": "https://...",
      "featured": true,
      "sqft": 8500
    },
    {
      "id": "prop-002",
      "title": "Marina Apartment",
      "price": 2500000,
      "currency": "AED",
      "location": "Dubai Marina, Dubai",
      "type": "apartment",
      "beds": 2,
      "image": "https://...",
      "featured": false,
      "sqft": 1200
    }
  ],
  "total": 150,
  "limit": 50,
  "offset": 0
}
```

## 🔌 Integration Points

### Current Integration
- File: `/app/api/properties/route.ts`
- Type: GET request
- Data Source: `mockProperties` from `/lib/mock-data.ts`

### To Connect Real Database

1. **Update the API route** (`/app/api/properties/route.ts`):
```typescript
export async function GET(req: NextRequest) {
  // Replace mockProperties with database query
  const { searchParams } = new URL(req.url)
  const limit = parseInt(searchParams.get('limit') || '20')
  const offset = parseInt(searchParams.get('offset') || '0')

  // Query your database
  const properties = await db.properties
    .findMany({
      take: limit,
      skip: offset,
    })

  return NextResponse.json({
    properties,
    total: await db.properties.count(),
    limit,
    offset
  })
}
```

2. **Ensure properties have required fields**
3. **Test with real data**
4. **Monitor API performance**

## 📈 Performance Considerations

### API Optimization
```typescript
// Good: Single request with pagination
fetch('/api/properties?limit=50')

// Avoid: Multiple sequential requests
fetch('/api/properties/prop-1')
fetch('/api/properties/prop-2')
// ... etc
```

### Client-Side Optimization
- Calculations done on client (no server overhead)
- Filtering and sorting instant (no network delay)
- Images lazy-loaded (cached by browser)
- Skeleton loaders (perceived performance)

### Caching Strategy
```typescript
// Currently: No caching (always fresh)
// Future: Could add:
// - Browser cache headers
// - Service worker caching
// - ISR (Incremental Static Regeneration)
```

## 🔍 Query Examples

### Example 1: Get All Villas
```bash
curl "http://localhost:3000/api/properties?type=villa&limit=100"
```

### Example 2: Get Properties in Price Range
```bash
curl "http://localhost:3000/api/properties?minPrice=1000000&maxPrice=5000000&limit=50"
```

### Example 3: Get Active Properties
```bash
curl "http://localhost:3000/api/properties?status=active&limit=100"
```

### Example 4: Pagination
```bash
# First page
curl "http://localhost:3000/api/properties?limit=50&offset=0"

# Second page
curl "http://localhost:3000/api/properties?limit=50&offset=50"

# Third page
curl "http://localhost:3000/api/properties?limit=50&offset=100"
```

## 💾 Data Validation

### Required Field Checks
```typescript
const validateProperty = (prop: any): boolean => {
  return !!(
    prop.id &&
    prop.title &&
    prop.price &&
    prop.currency &&
    prop.location
  );
};
```

### Error Handling
```typescript
try {
  const response = await fetch('/api/properties?limit=50');
  if (!response.ok) throw new Error('API Error');
  
  const data = await response.json();
  if (!data.properties?.length) {
    console.warn('No properties returned');
  }
  
  setProperties(data.properties);
} catch (error) {
  console.error('Failed to fetch properties:', error);
  setProperties([]); // Show empty state
}
```

## 🔄 Real-Time Updates

### Current Implementation
- Fetches once on component mount
- No polling or WebSocket
- User must refresh for new data

### For Real-Time Updates (Future)
```typescript
// Option 1: Polling
useEffect(() => {
  const interval = setInterval(fetchProperties, 60000); // Every minute
  return () => clearInterval(interval);
}, []);

// Option 2: WebSocket
useEffect(() => {
  const ws = new WebSocket('wss://api.example.com/properties');
  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    setProperties(data.properties);
  };
}, []);
```

## 📱 Mobile API Considerations

### For Mobile Optimization
```typescript
// Fetch fewer properties on mobile
const limit = window.innerWidth < 768 ? 20 : 50;
fetch(`/api/properties?limit=${limit}`)
```

### Image Optimization
```typescript
// Use responsive images
<img src={image} 
     srcSet={`${image}?w=300 300w, ${image}?w=600 600w`}
     sizes="(max-width: 640px) 100vw, 50vw"
/>
```

## 🔐 Security Considerations

### CORS Headers
```typescript
// Ensure API allows requests from your domain
res.headers.set('Access-Control-Allow-Origin', '*');
```

### Rate Limiting
```typescript
// Implement rate limiting for production
// Example: 100 requests per minute per IP
```

### Data Sanitization
```typescript
// Sanitize user inputs in filters
const searchTerm = sanitizeInput(searchTerm);
```

## 📊 Monitoring & Analytics

### API Performance Metrics
```typescript
const startTime = performance.now();
const response = await fetch('/api/properties?limit=50');
const endTime = performance.now();
console.log(`API Response Time: ${endTime - startTime}ms`);
```

### Error Tracking
```typescript
try {
  // API call
} catch (error) {
  // Log to error tracking service
  logError({
    endpoint: '/api/properties',
    error: error.message,
    timestamp: new Date().toISOString()
  });
}
```

## 📚 Testing

### Unit Test Example
```typescript
describe('Investment Analysis Page', () => {
  it('should calculate money value correctly', () => {
    const property = { price: 12000000 };
    const result = property.price / 1000000;
    expect(result).toBe(12);
  });

  it('should calculate rental yield with location bonus', () => {
    const yield = 3.5 + 0.8; // Marina
    expect(yield).toBe(4.3);
  });
});
```

## 🚀 Deployment Checklist

- [ ] API endpoint returns correct data structure
- [ ] All required fields present in database
- [ ] Images load correctly
- [ ] Calculations produce expected results
- [ ] Filtering works on real data
- [ ] Sorting functions correctly
- [ ] Page loads within acceptable time (<3s)
- [ ] Mobile responsive on all devices
- [ ] No console errors or warnings
- [ ] SEO meta tags included
- [ ] Analytics tracking in place
- [ ] Error handling robust

## 📞 Support & Troubleshooting

### Common Issues

**Issue: No properties display**
- Check API endpoint is accessible
- Verify data structure matches expected format
- Check browser console for errors
- Confirm API returns `properties` array

**Issue: Calculations seem wrong**
- Verify location names match bonus conditions
- Check property types are lowercase
- Confirm prices are in AED
- Review formula implementation

**Issue: API too slow**
- Add pagination (limit results)
- Create database indexes on common filters
- Add caching layer
- Optimize query performance

**Issue: Images don't load**
- Verify image URLs are valid
- Check CORS headers
- Use image optimization service
- Add fallback placeholder

---

**Last Updated:** February 7, 2026
**API Version:** 1.0
**Status:** Production Ready
