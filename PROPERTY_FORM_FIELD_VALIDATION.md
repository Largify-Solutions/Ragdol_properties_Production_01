# Property Form Field Validation Checklist

## Master Field List

### Database Schema vs Admin Form vs Property Details Page

| Field Name | Database Column | Admin Form Field | Property Details Display | Status |
|---|---|---|---|---|
| **Basic Information** | | | | |
| Title | `title` | `formData.title` | ✅ Shown | ✅ Valid |
| Title (Arabic) | `meta_data.title_ar` | `formData.title_ar` | N/A | ✅ Valid |
| Title (French) | `meta_data.title_fr` | `formData.title_fr` | N/A | ✅ Valid |
| Slug | `slug` | `formData.slug` | 🔗 URL Param | ✅ Valid |
| Property Type | `type` | `formData.type` | ✅ Shown | ✅ Valid |
| Category | `category_id` | `formData.category_id` | ❓ Check | ⚠️ Needs Verify |
| Status | `status` | `formData.status` | ✅ Shown as Badge | ✅ Valid |
| Property Status | `property_status` | `formData.property_status` | ✅ Shown | ✅ Valid |
| Assigned Agent | `agent_id` | `formData.agent_id` | ✅ Agent Card | ✅ Valid |
| Price | `price` | `formData.price` | ✅ Large Display | ✅ Valid |
| Currency | `currency` | `formData.currency` | ✅ With Price | ✅ Valid |
| **Property Details** | | | | |
| Description | `description` | `formData.description` | ✅ Full Section | ✅ Valid |
| Description (Arabic) | `meta_data.description_ar` | `formData.description_ar` | N/A | ✅ Valid |
| Description (French) | `meta_data.description_fr` | `formData.description_fr` | N/A | ✅ Valid |
| Bedrooms | `beds` | `formData.beds` | ✅ Icon + Number | ✅ Valid |
| Bathrooms | `baths` | `formData.baths` | ✅ Icon + Number | ✅ Valid |
| Area (sqft) | `sqft` | `formData.sqft` | ✅ Icon + Number | ✅ Valid |
| Furnished | `furnishing` | `formData.furnished` | ❓ Check | ⚠️ Needs Verify |
| Parking Spaces | `parking_spaces` | `formData.parking` | ❓ Check | ⚠️ Needs Verify |
| Property Age | `year_built` | `formData.property_age` | ❓ Check | ⚠️ Needs Verify |
| Completion Status | `property_status` | `formData.completion` | ✅ Shown | ✅ Valid |
| **Location** | | | | |
| Address | `address` | `formData.address` | ✅ With Location | ✅ Valid |
| City | `city` | `formData.city` | ✅ With Address | ✅ Valid |
| Area | `area` | `formData.area` | ✅ In Breadcrumb | ✅ Valid |
| District | `district` | N/A | ❓ Check | ⚠️ Not in Form |
| Neighborhood | `neighborhood` | N/A | ❓ Check | ⚠️ Not in Form |
| Landmark | `landmark` | N/A | ❓ Check | ⚠️ Not in Form |
| Coordinates | `coords` | `formData.coords` | 🗺️ Map Display | ✅ Valid |
| **Media & Documents** | | | | |
| Images | `images` | `formData.images` | ✅ Gallery | ✅ Valid |
| Main Image | `image_url` | Auto (1st image) | ✅ Gallery | ✅ Valid |
| Videos | `meta_data.videos` | `formData.videos` | ❓ Check | ⚠️ Needs Verify |
| Floorplans | `floorplans` | `formData.floorplans` | ❓ Check | ⚠️ Needs Verify |
| Brochures | `meta_data.brochures` | `formData.brochures` | ✅ Download Button | ✅ Valid |
| Brochure URL | `meta_data.brochure_url` | `formData.brochure_url` | ✅ Download Link | ✅ Valid |
| Fact Sheet URL | `meta_data.fact_sheet_url` | `formData.fact_sheet_url` | ✅ Download Link | ✅ Valid |
| Material Board URL | `meta_data.material_board_url` | `formData.material_board_url` | ✅ Download Link | ✅ Valid |
| Documents | `meta_data.documents` | `formData.documents` | ✅ Download Links | ✅ Valid |
| **Features & Amenities** | | | | |
| Features | `features` | `formData.features` | ❓ Check | ⚠️ Needs Verify |
| Amenities | `amenities` | N/A | ❓ Check | ⚠️ Not in Form |
| **Publishing** | | | | |
| Published | `published` | `formData.published` | N/A | ✅ Valid |
| Featured | `featured` | `formData.featured` | ❓ Check | ⚠️ Needs Verify |
| Premium | `premium` | N/A | ❓ Check | ⚠️ Not in Form |
| Urgent | `urgent` | N/A | ❓ Check | ⚠️ Not in Form |
| Verified | `verified` | N/A | ❓ Check | ⚠️ Not in Form |

---

## Issues Found

### ⚠️ Fields in Database but NOT in Admin Form:
1. `district` - Available in DB, not in form
2. `neighborhood` - Available in DB, not in form
3. `landmark` - Available in DB, not in form
4. `amenities` - Available in DB, not in form
5. `premium` - Available in DB, not in form
6. `urgent` - Available in DB, not in form
7. `verified` - Available in DB, not in form
8. `original_price` - Available in DB, not in form
9. `price_per_sqft` - Available in DB, not in form
10. `built_up_area` - Available in DB, not in form
11. `plot_size` - Available in DB, not in form
12. `floor_number` - Available in DB, not in form
13. `total_floors` - Available in DB, not in form
14. `virtual_tour_url` - Available in DB, not in form
15. `seo_title` - Available in DB, not in form
16. `seo_description` - Available in DB, not in form
17. `seo_keywords` - Available in DB, not in form

### 🔄 Fields That May Need Translation Support:
- `title` → `title_ar`, `title_fr` (✅ Has translation)
- `description` → `description_ar`, `description_fr` (✅ Has translation)

### ✅ Document Management System:
**Downloads Section on Properties Details Page:**
- Floor Plan Button ✅ (triggers form)
- Brochure Button ✅ (triggers form)
- Additional Documents ✅ (auto-linked)
  - `meta_data.documents[]` - Custom documents
  - `meta_data.brochure_url` - Individual brochure
  - `meta_data.fact_sheet_url` - Individual fact sheet
  - `meta_data.material_board_url` - Individual material board
  - `meta_data.brochures[]` - Multiple brochures

---

## Inquiry Form Flow

### Current Flow:
1. User clicks "Download Floor Plan" or "Download Brochure"
2. Modal form appears asking for contact info
3. User submits form
4. Data sent to `/api/download-interests` endpoint
5. Information logged as "download_interests" in database
6. **MISSING**: Inquiry should be visible in `/admin/inquiries` page

### What Needs to Be Verified:
- [ ] Download interest form collects: name, email, phone, property_id, download_type
- [ ] Form data is properly saved to database
- [ ] Admin inquiries page displays all download requests
- [ ] Admin can filter by property and download type
- [ ] Admin can view/download actual document URLs from meta_data

---

## SQL Query to Check All Properties and Their Documents

```sql
-- Check all properties with documents
SELECT 
  id,
  title,
  slug,
  price,
  published,
  meta_data->'documents' AS documents,
  meta_data->>'brochure_url' AS brochure_url,
  meta_data->>'fact_sheet_url' AS fact_sheet_url,
  meta_data->>'material_board_url' AS material_board_url,
  meta_data->'brochures' AS brochures
FROM public.properties
WHERE published = true
LIMIT 10;
```

---

## Recommendations

### High Priority:
1. ✅ Verify slug column exists and is properly populated
2. ✅ Verify meta_data documents are properly saved
3. ✅ Test download functionality end-to-end
4. ✅ Verify admin inquiries page shows download requests

### Medium Priority:
5. Add missing form fields (optional):
   - Premium toggle
   - Urgent toggle
   - Verified toggle
   - SEO fields (title, description, keywords)

### Low Priority:
6. Add extended fields (optional):
   - District, Neighborhood, Landmark
   - Amenities dropdown
   - Original Price
   - Plot Size, Built-up Area
   - Floor Number, Total Floors
   - Virtual Tour URL

---

## Next Steps:
1. Run the above SQL query to verify document data
2. Add slug value to all properties (if not done)
3. Test document download flow end-to-end
4. Verify admin inquiries page integration
5. Set up email notifications for download requests (optional)
