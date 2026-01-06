// 'use client';

// import { useState, useEffect } from 'react';
// import { Database } from '@/lib/database.types'
// import PropertyCard, { PropertyCardProperty } from '@/components/property/PropertyCard'
// import PropertyAgents from '@/components/property/PropertyAgents'
// import {
//   ViewColumnsIcon,
//   QueueListIcon,
//   MagnifyingGlassIcon,
//   HomeIcon,
// } from '@heroicons/react/24/outline'
// import { useRouter, useSearchParams } from 'next/navigation';

// // Firebase imports
// import { db } from '@/lib/firebase'
// import { collection, getDocs, query, where, orderBy } from 'firebase/firestore'

// type Property = Database['public']['Tables']['properties']['Row']
// type NormalizedProperty = Property & {
//   image: string
//   price: number
//   priceLabel?: string
//   area?: string | null
//   city?: string | null
//   location: string
//   beds: number
//   baths: number
//   sqft: number
//   type: string
//   featured: boolean
//   developer?: string | null
//   description?: string | null
//   category?: string | null
//   parking?: string | null
//   furnished?: boolean | null
//   propertyAge?: string | null
//   completion?: string | null
//   subtype?: string | null
//   features?: string[] | null
//   video_url?: string | null
//   currency?: string
//   status?: string
//   agent_name?: string
//   review_status?: string
//   submitted_at?: string
//   collection?: string
// }

// // Function to fetch properties from 'properties' collection
// async function fetchPropertiesFromMainCollection() {
//   try {
//     console.log('🔥 Fetching from main properties collection...');
//     const propertiesRef = collection(db, 'properties');
    
//     const q = query(
//       propertiesRef,
//       where('status', '==', 'sale'),
//       where('published', '==', true)
//     );
    
//     const querySnapshot = await getDocs(q);
//     console.log(`✅ Main Collection: Found ${querySnapshot.size} sale properties`);
    
//     const properties: any[] = [];
//     querySnapshot.forEach((doc) => {
//       properties.push({
//         id: doc.id,
//         collection: 'properties',
//         ...doc.data()
//       });
//     });
    
//     return properties;
    
//   } catch (error: any) {
//     console.error('❌ Error fetching from main collection:', error.message);
//     return [];
//   }
// }

// // Function to fetch properties from 'agent_properties' collection
// async function fetchPropertiesFromAgentCollection() {
//   try {
//     console.log('🔥 Fetching from agent_properties collection...');
//     const agentPropertiesRef = collection(db, 'agent_properties');
    
//     const q = query(
//       agentPropertiesRef,
//       where('status', '==', 'sale'),
//       where('published', '==', true),
//       where('review_status', '==', 'published')
//     );
    
//     const querySnapshot = await getDocs(q);
//     console.log(`✅ Agent Collection: Found ${querySnapshot.size} sale properties`);
    
//     const properties: any[] = [];
//     querySnapshot.forEach((doc) => {
//       const data = doc.data();
//       properties.push({
//         id: doc.id,
//         collection: 'agent_properties',
//         ...data
//       });
//     });
    
//     return properties;
    
//   } catch (error: any) {
//     console.error('❌ Error fetching from agent collection:', error.message);
//     return [];
//   }
// }

// // Main function to fetch all sale properties from both collections
// async function fetchAllSaleProperties() {
//   try {
//     console.log('🔄 Fetching properties from ALL collections...');
    
//     // Fetch from both collections simultaneously
//     const [mainProperties, agentProperties] = await Promise.all([
//       fetchPropertiesFromMainCollection(),
//       fetchPropertiesFromAgentCollection()
//     ]);
    
//     console.log(`📊 Results: ${mainProperties.length} from main, ${agentProperties.length} from agent`);
    
//     // Combine both collections
//     const allProperties = [...mainProperties, ...agentProperties];
//     console.log(`✅ Total properties found: ${allProperties.length}`);
    
//     return allProperties;
    
//   } catch (error) {
//     console.error('❌ Error in fetchAllSaleProperties:', error);
//     return [];
//   }
// }

// export default function PropertiesPage() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
  
//   // State for properties and filters
//   const [allProperties, setAllProperties] = useState<NormalizedProperty[]>([]);
//   const [filteredProperties, setFilteredProperties] = useState<NormalizedProperty[]>([]);
//   const [loading, setLoading] = useState(true);
  
//   // Get filter values from URL
//   const viewMode = searchParams.get('view') === 'list' ? 'list' : 'grid';
//   const sortBy = searchParams.get('sortBy') || 'featured';
//   const action = searchParams.get('action') || 'buy';
//   const category = searchParams.get('category') || '';
//   const type = searchParams.get('type') || '';
//   const area = searchParams.get('area') || '';
//   const developer = searchParams.get('developer') || '';
//   const minPrice = searchParams.get('minPrice') || '';
//   const maxPrice = searchParams.get('maxPrice') || '';
//   const beds = searchParams.get('beds') || '';
//   const baths = searchParams.get('baths') || '';
//   const minSqft = searchParams.get('minSqft') || '';
//   const maxSqft = searchParams.get('maxSqft') || '';
//   const furnished = searchParams.get('furnished') || '';
//   const parking = searchParams.get('parking') || '';
//   const propertyAge = searchParams.get('propertyAge') || '';
//   const completion = searchParams.get('completion') || '';
//   const features = searchParams.get('features') || '';
//   const subtype = searchParams.get('subtype') || '';
//   const page = parseInt(searchParams.get('page') || '1', 10);
//   const limit = 20;
//   const search = searchParams.get('search') || '';
//   const hasVideo = searchParams.get('hasVideo') || '';

//   // Local form state
//   const [formState, setFormState] = useState({
//     action,
//     category,
//     type,
//     area,
//     minPrice,
//     maxPrice,
//     beds,
//     baths,
//     furnished,
//     completion,
//     hasVideo,
//     search
//   });

//   // Fetch properties on component mount
//   useEffect(() => {
//     async function loadProperties() {
//       setLoading(true);
//       const properties = await fetchAllSaleProperties();
      
//       // Normalize properties
//       const normalized = properties.map((p: any) => {
//         // Get first image
//         let imageUrl = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg==';
        
//         if (p.images && Array.isArray(p.images) && p.images.length > 0) {
//           imageUrl = p.images[0];
//         } else if (p.image) {
//           imageUrl = p.image;
//         } else if (p.image_url) {
//           imageUrl = p.image_url;
//         }
        
//         // Determine price
//         const price = typeof p.price === 'string' ? parseFloat(p.price) : (p.price ?? 0);
        
//         // Determine location
//         const location = p.location || p.area || p.city || 'Dubai';
        
//         // Handle property_status vs completion
//         const completionStatus = p.completion || p.property_status || null;
        
//         // Handle different field names for area
//         const propertyArea = p.area || p.location || p.neighborhood || p.district || null;
        
//         return {
//           ...p,
//           image: imageUrl,
//           price: price,
//           priceLabel: p.priceLabel || 'total',
//           area: propertyArea,
//           city: p.city || 'Dubai',
//           location: location,
//           beds: p.beds ?? 0,
//           baths: p.baths ?? 0,
//           sqft: p.sqft ?? 0,
//           type: p.type || p.subtype || 'Apartment',
//           developer: p.developer || (p.developers?.name ? p.developers.name : null) || p.developer_id || null,
//           featured: Boolean(p.featured),
//           category: p.category || null,
//           parking: p.parking || null,
//           propertyAge: p.property_age || p.propertyAge || null,
//           completion: completionStatus,
//           subtype: p.subtype || null,
//           description: p.description || null,
//           features: Array.isArray(p.features) ? p.features : (typeof p.features === 'string' ? p.features.split(',').map((f: string) => f.trim()) : []),
//           video_url: p.video_url || null,
//           currency: p.currency || 'AED',
//           status: p.status || 'sale',
//           agent_name: p.agent_name || null,
//           review_status: p.review_status || null,
//           submitted_at: p.submitted_at || null,
//           collection: p.collection || 'properties'
//         };
//       });
      
//       setAllProperties(normalized);
//       setLoading(false);
//     }
    
//     loadProperties();
//   }, []);

//   // Apply filters whenever filter parameters change
//   useEffect(() => {
//     if (allProperties.length === 0) return;
    
//     let filtered = [...allProperties];
    
//     console.log('🔄 Applying filters...', {
//       action, category, type, area, minPrice, maxPrice,
//       beds, baths, furnished, completion, search
//     });

//     // Filter by action (buy/rent)
//     if (action === 'buy') {
//       filtered = filtered.filter(p => p.status === 'sale');
//     } else if (action === 'rent') {
//       filtered = filtered.filter(p => p.status === 'rent');
//     }

//     // Filter by category
//     if (category) {
//       filtered = filtered.filter(p => p.category === category);
//     }

//     // Filter by type
//     if (type) {
//       filtered = filtered.filter(p => p.type?.toLowerCase() === type.toLowerCase());
//     }

//     // Filter by subtype
//     if (subtype) {
//       filtered = filtered.filter(p => p.subtype?.toLowerCase() === subtype.toLowerCase());
//     }

//     // Filter by area
//     if (area) {
//       filtered = filtered.filter(p => 
//         p.area?.toLowerCase().includes(area.toLowerCase()) || 
//         p.city?.toLowerCase().includes(area.toLowerCase()) ||
//         p.location?.toLowerCase().includes(area.toLowerCase())
//       );
//     }

//     // Filter by developer
//     if (developer) {
//       filtered = filtered.filter(p => p.developer?.toLowerCase().includes(developer.toLowerCase()));
//     }

//     // Filter by price
//     if (minPrice) {
//       filtered = filtered.filter(p => p.price >= parseInt(minPrice));
//     }
//     if (maxPrice) {
//       filtered = filtered.filter(p => p.price <= parseInt(maxPrice));
//     }

//     // Filter by beds
//     if (beds) {
//       filtered = filtered.filter(p => p.beds === parseInt(beds));
//     }

//     // Filter by baths
//     if (baths) {
//       filtered = filtered.filter(p => p.baths === parseInt(baths));
//     }

//     // Filter by sqft
//     if (minSqft) {
//       filtered = filtered.filter(p => p.sqft >= parseInt(minSqft));
//     }
//     if (maxSqft) {
//       filtered = filtered.filter(p => p.sqft <= parseInt(maxSqft));
//     }

//     // Filter by furnished
//     if (furnished === 'true') {
//       filtered = filtered.filter(p => p.furnished === true);
//     } else if (furnished === 'false') {
//       filtered = filtered.filter(p => p.furnished === false || p.furnished === null);
//     }

//     // Filter by parking
//     if (parking) {
//       filtered = filtered.filter(p => p.parking?.toLowerCase() === parking.toLowerCase());
//     }

//     // Filter by property age
//     if (propertyAge) {
//       filtered = filtered.filter(p => p.propertyAge === propertyAge);
//     }

//     // Filter by completion
//     if (completion) {
//       filtered = filtered.filter(p => p.completion === completion);
//     }

//     // Filter by video availability
//     if (hasVideo === 'true') {
//       filtered = filtered.filter(p => p.video_url && p.video_url.trim() !== '');
//     }

//     // Features filter - support both comma-separated and single feature
//     const featuresList = features ? features.split(',').map(f => f.trim()).filter(Boolean) : [];
//     // Also check for individual feature parameters
//     const featureParam = searchParams.get('feature') || '';
//     if (featureParam) {
//       featuresList.push(featureParam);
//     }
    
//     if (featuresList.length > 0) {
//       filtered = filtered.filter((p: NormalizedProperty) => {
//         if (!p.features || !Array.isArray(p.features)) return false;
//         return featuresList.every(f => (p.features || []).some(pf => pf?.toLowerCase() === f.toLowerCase()));
//       });
//     }

//     // Search filtering
//     if (search && search.trim() !== '') {
//       const sLower = search.toLowerCase();
//       filtered = filtered.filter(p => {
//         const inTitle = p.title?.toLowerCase().includes(sLower);
//         const inLocation = p.location?.toLowerCase().includes(sLower);
//         const inArea = (p.area || '').toLowerCase().includes(sLower);
//         const inDesc = (p.description || '').toLowerCase().includes(sLower);
//         const inDeveloper = ((p.developer || '') as string).toLowerCase().includes(sLower);
//         const inAgentName = ((p.agent_name || '') as string).toLowerCase().includes(sLower);
//         return inTitle || inLocation || inArea || inDesc || inDeveloper || inAgentName;
//       });
//     }

//     // Sorting
//     switch (sortBy) {
//       case 'price-low':
//         filtered.sort((a, b) => a.price - b.price);
//         break;
//       case 'price-high':
//         filtered.sort((a, b) => b.price - a.price);
//         break;
//       case 'newest':
//         filtered.sort((a, b) => {
//           const dateA = a.submitted_at || a.created_at || '0';
//           const dateB = b.submitted_at || b.created_at || '0';
//           return new Date(dateB).getTime() - new Date(dateA).getTime();
//         });
//         break;
//       case 'featured':
//       default:
//         filtered.sort((a, b) => {
//           if (Boolean(b.featured) !== Boolean(a.featured)) {
//             return Number(b.featured) - Number(a.featured);
//           }
//           const dateA = a.submitted_at || a.created_at || '0';
//           const dateB = b.submitted_at || b.created_at || '0';
//           return new Date(dateB).getTime() - new Date(dateA).getTime();
//         });
//         break;
//     }

//     console.log(`✅ Filtered to ${filtered.length} properties`);
//     setFilteredProperties(filtered);
//   }, [
//     allProperties, action, category, type, area, developer, minPrice, maxPrice,
//     beds, baths, minSqft, maxSqft, furnished, parking, propertyAge, completion,
//     features, search, hasVideo, sortBy
//   ]);

//   // Handle form changes
//   const handleInputChange = (name: string, value: string) => {
//     setFormState(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   // Handle form submission
//   const handleFilterSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
    
//     const params = new URLSearchParams();
    
//     // Add all non-empty form values to URL params
//     Object.entries(formState).forEach(([key, value]) => {
//       if (value && value !== '') {
//         params.set(key, value);
//       }
//     });
    
//     // Add other params that are not in formState
//     if (parking) params.set('parking', parking);
//     if (propertyAge) params.set('propertyAge', propertyAge);
//     if (features) params.set('features', features);
//     if (subtype) params.set('subtype', subtype);
//     if (developer) params.set('developer', developer);
//     if (minSqft) params.set('minSqft', minSqft);
//     if (maxSqft) params.set('maxSqft', maxSqft);
    
//     // Always keep view mode
//     params.set('view', viewMode);
//     params.set('sortBy', sortBy);
    
//     // Reset to page 1 when applying new filters
//     params.set('page', '1');
    
//     router.push(`/properties?${params.toString()}`);
//   };

//   // Handle reset filters
//   const handleResetFilters = () => {
//     setFormState({
//       action: 'buy',
//       category: '',
//       type: '',
//       area: '',
//       minPrice: '',
//       maxPrice: '',
//       beds: '',
//       baths: '',
//       furnished: '',
//       completion: '',
//       hasVideo: '',
//       search: ''
//     });
    
//     router.push('/properties?view=grid&sortBy=featured&action=buy&page=1');
//   };

//   // Handle sort change
//   const handleSortChange = (value: string) => {
//     const params = new URLSearchParams(searchParams.toString());
//     params.set('sortBy', value);
//     params.set('page', '1');
//     router.push(`/properties?${params.toString()}`);
//   };

//   // Handle view change
//   const handleViewChange = (view: string) => {
//     const params = new URLSearchParams(searchParams.toString());
//     params.set('view', view);
//     params.set('page', '1');
//     router.push(`/properties?${params.toString()}`);
//   };

//   // Handle pagination
//   const handlePageChange = (newPage: number) => {
//     const params = new URLSearchParams(searchParams.toString());
//     params.set('page', newPage.toString());
//     router.push(`/properties?${params.toString()}`);
//   };

//   // Generate dynamic title and description based on filters
//   const getPageTitle = () => {
//     let title = '';

//     if (category === 'luxe') {
//       title += 'Luxury ';
//     }

//     if (type) {
//       const typeLabels: Record<string, string> = {
//         apartment: 'Apartments',
//         villa: 'Villas',
//         townhouse: 'Townhouses',
//         penthouse: 'Penthouses',
//         studio: 'Studios',
//         plot: 'Plots',
//         commercial: 'Commercial Properties'
//       };
//       title += typeLabels[type] || type.charAt(0).toUpperCase() + type.slice(1) + 's';
//     } else if (category === 'luxe') {
//       title += 'Properties';
//     } else {
//       title += 'Properties';
//     }

//     title += action === 'rent' ? ' for Rent' : ' for Sale';
//     title += area ? ` in ${area}` : ' in Dubai';

//     return title;
//   };

//   const getPageDescription = () => {
//     let desc = '';

//     if (category === 'luxe') {
//       desc += 'Discover exclusive luxury ';
//     } else {
//       desc += 'Find ';
//     }

//     if (type) {
//       const typeLabels: Record<string, string> = {
//         apartment: 'apartments',
//         villa: 'villas',
//         townhouse: 'townhouses',
//         penthouse: 'penthouses',
//         studio: 'studios',
//         plot: 'plots',
//         commercial: 'commercial properties'
//       };
//       desc += typeLabels[type] || type + 's';
//     } else {
//       desc += 'properties';
//     }

//     desc += action === 'rent' ? ' for rent' : ' for sale';
//     desc += area ? ` in ${area}, Dubai` : ' in Dubai';
//     desc += '. Browse our curated selection with detailed information and high-quality images.';

//     return desc;
//   };

//   // Pagination calculations
//   const total = filteredProperties.length;
//   const totalPages = Math.max(1, Math.ceil(total / limit));
//   const offset = (Math.max(page, 1) - 1) * limit;
//   const paginatedProperties = filteredProperties.slice(offset, offset + limit);

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-slate-50/50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
//           <p className="mt-4 text-slate-600">Loading properties...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-slate-50/50">
//       {/* Hero Section */}
//       <section className="relative pt-32 pb-20 overflow-hidden bg-slate-900">
//         <div className="absolute inset-0 opacity-20">
//           <img 
//             src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1600&q=80" 
//             alt="Dubai Skyline" 
//             className="w-full h-full object-cover"
//           />
//         </div>
//         <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900/80 to-slate-900" />
        
//         <div className="container-custom relative z-10">
//           <div className="max-w-4xl mx-auto text-center space-y-6">
//             <h2 className="text-primary font-bold tracking-[0.3em] uppercase text-sm animate-slide-up">
//               Premium Listings
//             </h2>
//             <h1 className="text-4xl md:text-7xl font-black text-white tracking-tight animate-slide-up [animation-delay:100ms]">
//               {getPageTitle()}
//             </h1>
//             <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto font-medium animate-slide-up [animation-delay:200ms]">
//               {getPageDescription()}
//             </p>

//             {/* Property Stats */}
//             <div className="flex flex-wrap justify-center gap-3 pt-4 animate-slide-up [animation-delay:300ms]">
//               <span className="px-6 py-2 bg-white/10 backdrop-blur-md text-white rounded-full border border-white/10 text-sm font-bold">
//                 {total} Properties Found
//               </span>
//               {search && (
//                 <span className="px-6 py-2 bg-primary/20 backdrop-blur-md text-primary rounded-full border border-primary/30 text-sm font-bold">
//                   🔎 &ldquo;{search}&rdquo;
//                 </span>
//               )}
//               {area && (
//                 <span className="px-6 py-2 bg-white/10 backdrop-blur-md text-white rounded-full border border-white/10 text-sm font-bold">
//                   📍 {area}
//                 </span>
//               )}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Main Content */}
//       <div className="container-custom py-8 sm:py-16">
//         <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
//           {/* Filters Sidebar */}
//           <aside className="lg:w-1/4">
//             <div className="sticky top-24 space-y-6 lg:space-y-8">
//               <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl shadow-slate-200/50 p-4 sm:p-8 border border-slate-100">
//                 <div className="flex items-center justify-between mb-6 sm:mb-8">
//                   <h3 className="text-lg sm:text-xl font-black text-slate-900">Filters</h3>
//                   <button 
//                     type="button" 
//                     onClick={handleResetFilters}
//                     className="text-xs font-bold text-primary uppercase tracking-widest hover:text-primary/80 transition-colors"
//                   >
//                     Reset All
//                   </button>
//                 </div>

//                 <form onSubmit={handleFilterSubmit} className="space-y-8">
//                   {/* Search */}
//                   <div className="space-y-3">
//                     <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Keywords</label>
//                     <div className="relative">
//                       <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
//                       <input 
//                         name="search" 
//                         type="text" 
//                         value={formState.search}
//                         onChange={(e) => handleInputChange('search', e.target.value)}
//                         placeholder="Search properties..." 
//                         className="w-full bg-slate-50 border-none rounded-2xl pl-12 pr-4 py-4 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-primary/20 transition-all font-medium" 
//                       />
//                     </div>
//                   </div>

//                   {/* Action Type */}
//                   <div className="space-y-3">
//                     <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Action</label>
//                     <div className="grid grid-cols-2 gap-2">
//                       <label className="relative cursor-pointer group">
//                         <input 
//                           type="radio" 
//                           name="action" 
//                           value="buy" 
//                           checked={formState.action === 'buy'}
//                           onChange={(e) => handleInputChange('action', e.target.value)}
//                           className="peer sr-only" 
//                         />
//                         <div className="flex items-center justify-center py-3 rounded-xl bg-slate-50 text-slate-600 font-bold text-sm peer-checked:bg-primary peer-checked:text-white group-hover:bg-slate-100 transition-all">
//                           Buy
//                         </div>
//                       </label>
//                       <label className="relative cursor-pointer group">
//                         <input 
//                           type="radio" 
//                           name="action" 
//                           value="rent" 
//                           checked={formState.action === 'rent'}
//                           onChange={(e) => handleInputChange('action', e.target.value)}
//                           className="peer sr-only" 
//                         />
//                         <div className="flex items-center justify-center py-3 rounded-xl bg-slate-50 text-slate-600 font-bold text-sm peer-checked:bg-primary peer-checked:text-white group-hover:bg-slate-100 transition-all">
//                           Rent
//                         </div>
//                       </label>
//                     </div>
//                   </div>

//                   {/* Property Category */}
//                   <div className="space-y-3">
//                     <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Category</label>
//                     <div className="space-y-2">
//                       {[
//                         { value: '', label: 'All Properties' },
//                         { value: 'luxe', label: 'Luxury' },
//                         { value: 'ultra-luxe', label: 'Ultra Luxury' },
//                         { value: 'branded', label: 'Branded Residences' }
//                       ].map((cat) => (
//                         <label key={cat.value} className="flex items-center gap-3 cursor-pointer group">
//                           <input 
//                             type="radio" 
//                             name="category" 
//                             value={cat.value}
//                             checked={formState.category === cat.value}
//                             onChange={(e) => handleInputChange('category', e.target.value)}
//                             className="w-4 h-4 text-primary bg-slate-50 border-slate-300 rounded focus:ring-primary/20 focus:ring-2 cursor-pointer" 
//                           />
//                           <span className="text-slate-700 font-medium group-hover:text-slate-900 transition-colors">
//                             {cat.label}
//                           </span>
//                         </label>
//                       ))}
//                     </div>
//                   </div>

//                   {/* Property Type */}
//                   <div className="space-y-3">
//                     <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Property Type</label>
//                     <select 
//                       name="type" 
//                       value={formState.type}
//                       onChange={(e) => handleInputChange('type', e.target.value)}
//                       className="w-full bg-slate-50 border-none rounded-2xl px-4 py-4 text-slate-900 focus:ring-2 focus:ring-primary/20 transition-all font-medium appearance-none cursor-pointer"
//                     >
//                       <option value="">All Types</option>
//                       <option value="apartment">Apartments</option>
//                       <option value="villa">Villas</option>
//                       <option value="townhouse">Townhouses</option>
//                       <option value="penthouse">Penthouses</option>
//                       <option value="studio">Studios</option>
//                       <option value="plot">Plots</option>
//                       <option value="office">Offices</option>
//                       <option value="shop">Shops</option>
//                       <option value="warehouse">Warehouses</option>
//                       <option value="building">Commercial Buildings</option>
//                     </select>
//                   </div>

//                   {/* Location */}
//                   <div className="space-y-3">
//                     <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Location</label>
//                     <select 
//                       name="area" 
//                       value={formState.area}
//                       onChange={(e) => handleInputChange('area', e.target.value)}
//                       className="w-full bg-slate-50 border-none rounded-2xl px-4 py-4 text-slate-900 focus:ring-2 focus:ring-primary/20 transition-all font-medium appearance-none cursor-pointer"
//                     >
//                       <option value="">All Areas</option>
//                       <option value="Dubai Marina">Dubai Marina</option>
//                       <option value="Downtown Dubai">Downtown Dubai</option>
//                       <option value="Palm Jumeirah">Palm Jumeirah</option>
//                       <option value="Business Bay">Business Bay</option>
//                       <option value="Jumeirah">Jumeirah</option>
//                       <option value="Dubai Hills Estate">Dubai Hills Estate</option>
//                       <option value="Dubai Creek Harbour">Dubai Creek Harbour</option>
//                       <option value="Emirates Hills">Emirates Hills</option>
//                       <option value="Arabian Ranches">Arabian Ranches</option>
//                       <option value="Dubai South">Dubai South</option>
//                       <option value="Al Barsha">Al Barsha</option>
//                       <option value="Dubai Silicon Oasis">Dubai Silicon Oasis</option>
//                       <option value="Deira">Deira</option>
//                       <option value="Jumeirah Beach Residence">Jumeirah Beach Residence</option>
//                       <option value="Dubai Islands">Dubai Islands</option>
//                     </select>
//                   </div>

//                   {/* Price Range */}
//                   <div className="space-y-3">
//                     <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Price Range (AED)</label>
//                     <div className="grid grid-cols-2 gap-3">
//                       <input
//                         name="minPrice"
//                         type="number"
//                         placeholder="Min"
//                         value={formState.minPrice}
//                         onChange={(e) => handleInputChange('minPrice', e.target.value)}
//                         className="w-full bg-slate-50 border-none rounded-2xl px-4 py-4 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-primary/20 transition-all font-medium"
//                       />
//                       <input
//                         name="maxPrice"
//                         type="number"
//                         placeholder="Max"
//                         value={formState.maxPrice}
//                         onChange={(e) => handleInputChange('maxPrice', e.target.value)}
//                         className="w-full bg-slate-50 border-none rounded-2xl px-4 py-4 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-primary/20 transition-all font-medium"
//                       />
//                     </div>
//                   </div>

//                   {/* Bedrooms */}
//                   <div className="space-y-3">
//                     <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Bedrooms</label>
//                     <div className="grid grid-cols-3 gap-2">
//                       {['', '0', '1', '2', '3', '4', '5'].map((val) => (
//                         <label key={val} className="relative cursor-pointer group">
//                           <input 
//                             type="radio" 
//                             name="beds" 
//                             value={val}
//                             checked={formState.beds === val}
//                             onChange={(e) => handleInputChange('beds', e.target.value)}
//                             className="peer sr-only" 
//                           />
//                           <div className="flex items-center justify-center py-3 rounded-xl bg-slate-50 text-slate-600 font-bold text-sm peer-checked:bg-primary peer-checked:text-white group-hover:bg-slate-100 transition-all">
//                             {val === '' ? 'Any' : val === '0' ? 'ST' : val}
//                           </div>
//                         </label>
//                       ))}
//                     </div>
//                   </div>

//                   {/* Completion Status */}
//                   <div className="space-y-3">
//                     <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Completion Status</label>
//                     <div className="space-y-2">
//                       {[
//                         { value: '', label: 'All Properties' },
//                         { value: 'ready', label: 'Ready to Move' },
//                         { value: 'off-plan', label: 'Off-Plan' }
//                       ].map((status) => (
//                         <label key={status.value} className="flex items-center gap-3 cursor-pointer group">
//                           <input 
//                             type="radio" 
//                             name="completion" 
//                             value={status.value}
//                             checked={formState.completion === status.value}
//                             onChange={(e) => handleInputChange('completion', e.target.value)}
//                             className="w-4 h-4 text-primary bg-slate-50 border-slate-300 rounded focus:ring-primary/20 focus:ring-2 cursor-pointer" 
//                           />
//                           <span className="text-slate-700 font-medium group-hover:text-slate-900 transition-colors">
//                             {status.label}
//                           </span>
//                         </label>
//                       ))}
//                     </div>
//                   </div>

//                   {/* Furnished Status */}
//                   <div className="space-y-3">
//                     <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Furnished</label>
//                     <div className="space-y-2">
//                       {[
//                         { value: '', label: 'Any' },
//                         { value: 'true', label: 'Furnished' },
//                         { value: 'false', label: 'Unfurnished' }
//                       ].map((furnish) => (
//                         <label key={furnish.value} className="flex items-center gap-3 cursor-pointer group">
//                           <input 
//                             type="radio" 
//                             name="furnished" 
//                             value={furnish.value}
//                             checked={formState.furnished === furnish.value}
//                             onChange={(e) => handleInputChange('furnished', e.target.value)}
//                             className="w-4 h-4 text-primary bg-slate-50 border-slate-300 rounded focus:ring-primary/20 focus:ring-2 cursor-pointer" 
//                           />
//                           <span className="text-slate-700 font-medium group-hover:text-slate-900 transition-colors">
//                             {furnish.label}
//                           </span>
//                         </label>
//                       ))}
//                     </div>
//                   </div>

//                   {/* Property Features */}
//                   <div className="space-y-3">
//                     <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Property Features</label>
//                     <div className="space-y-2">
//                       <label className="flex items-center gap-3 cursor-pointer group">
//                         <input 
//                           type="checkbox" 
//                           name="hasVideo" 
//                           checked={formState.hasVideo === 'true'}
//                           onChange={(e) => handleInputChange('hasVideo', e.target.checked ? 'true' : '')}
//                           className="w-5 h-5 text-primary bg-slate-50 border-slate-300 rounded focus:ring-primary/20 focus:ring-2 cursor-pointer" 
//                         />
//                         <span className="text-slate-700 font-medium group-hover:text-slate-900 transition-colors">
//                           Properties with Video Tours
//                         </span>
//                       </label>
//                     </div>
//                   </div>

//                   <button type="submit" className="btn-primary !w-full !rounded-2xl !py-4 shadow-xl shadow-primary/20">
//                     Apply Filters
//                   </button>
//                 </form>
//               </div>

//               {/* Help Card */}
//               <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden group">
//                 <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl group-hover:bg-primary/30 transition-all duration-500" />
//                 <div className="relative z-10">
//                   <h4 className="text-xl font-black mb-4">Need Help?</h4>
//                   <p className="text-slate-400 text-sm font-medium mb-6 leading-relaxed">
//                     Our expert agents are ready to help you find your perfect property.
//                   </p>
//                   <button className="text-primary font-bold text-sm uppercase tracking-widest flex items-center gap-2 group/btn">
//                     Contact Us
//                     <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </aside>

//           {/* Main Content */}
//           <main className="lg:w-3/4">
//             {/* Sort and View Controls */}
//             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 sm:mb-10 gap-4 sm:gap-6 bg-white p-4 sm:p-4 rounded-2xl sm:rounded-3xl border border-slate-100 shadow-sm">
//               <div className="flex items-center gap-4 pl-4">
//                 <span className="text-slate-400 font-bold text-sm uppercase tracking-widest">
//                   {total} Properties Found
//                 </span>
//               </div>

//               <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
               

//                 <div className="h-8 w-[1px] bg-slate-100 hidden sm:block mx-2" />

//                 <div className="flex bg-slate-50 p-1 rounded-xl">
//                   <button
//                     type="button"
//                     onClick={() => handleViewChange('grid')}
//                     className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-primary' : 'text-slate-400 hover:text-slate-600'}`}
//                   >
//                     <ViewColumnsIcon className="h-5 w-5" />
//                   </button>
//                   <button
//                     type="button"
//                     onClick={() => handleViewChange('list')}
//                     className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-primary' : 'text-slate-400 hover:text-slate-600'}`}
//                   >
//                     <QueueListIcon className="h-5 w-5" />
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* Properties Grid/List from BOTH collections */}
//             {filteredProperties.length > 0 ? (
//               <>
//                 <div className={`grid gap-8 ${
//                   viewMode === 'grid'
//                     ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'
//                     : 'grid-cols-1'
//                 }`}>
//                   {paginatedProperties.map((property, i) => (
//                     <div key={`${property.collection}-${property.id}`} className="animate-slide-up" style={{ animationDelay: `${i * 50}ms` }}>
//                       <PropertyCard
//                         property={{
//                           id: String(property.id),
//                           title: property.title || 'New Property',
//                           price: property.price ?? 0,
//                           priceLabel: property.priceLabel || 'total',
//                           image: property.image,
//                           location: property.location || `${property.area || ''}${property.city ? ', ' + property.city : ''}`,
//                           beds: property.beds ?? 0,
//                           baths: property.baths ?? 0,
//                           sqft: property.sqft ?? 0,
//                           type: property.type || 'Property',
//                           featured: Boolean(property.featured),
//                           currency: property.currency || 'AED',
//                           status: property.status || 'sale',
//                           area: property.area || undefined,
//                           city: property.city || undefined,
//                           video_url: property.video_url || undefined,
//                           agent_name: property.agent_name || undefined,
//                         }}
//                       />
//                       {property.collection === 'agent_properties' && (
//                         <div className="mt-2">
//                           <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
//                             🤝 Agent Property
//                             {property.agent_name && ` - ${property.agent_name}`}
//                           </span>
//                         </div>
//                       )}
//                     </div>
//                   ))}
//                 </div>

//                 {/* Pagination */}
//                 {totalPages > 1 && (
//                   <div className="mt-16 flex items-center justify-center gap-2">
//                     {page > 1 && (
//                       <button
//                         onClick={() => handlePageChange(page - 1)}
//                         className="h-12 w-12 flex items-center justify-center rounded-xl bg-white border border-slate-100 text-slate-600 hover:bg-primary hover:text-white hover:border-primary transition-all font-bold shadow-sm"
//                       >
//                         ←
//                       </button>
//                     )}

//                     {[...Array(totalPages)].map((_, i) => {
//                       const p = i + 1;
//                       if (p === 1 || p === totalPages || (p >= page - 1 && p <= page + 1)) {
//                         return (
//                           <button
//                             key={p}
//                             onClick={() => handlePageChange(p)}
//                             className={`h-12 w-12 flex items-center justify-center rounded-xl font-bold transition-all shadow-sm ${
//                               page === p 
//                                 ? 'bg-primary text-white shadow-primary/20' 
//                                 : 'bg-white border border-slate-100 text-slate-600 hover:bg-slate-50'
//                             }`}
//                           >
//                             {p}
//                           </button>
//                         );
//                       }
//                       if (p === page - 2 || p === page + 2) {
//                         return <span key={p} className="text-slate-300">...</span>;
//                       }
//                       return null;
//                     })}

//                     {page < totalPages && (
//                       <button
//                         onClick={() => handlePageChange(page + 1)}
//                         className="h-12 w-12 flex items-center justify-center rounded-xl bg-white border border-slate-100 text-slate-600 hover:bg-primary hover:text-white hover:border-primary transition-all font-bold shadow-sm"
//                       >
//                         →
//                       </button>
//                     )}
//                   </div>
//                 )}
//               </>
//             ) : (
//               <div className="text-center py-32 bg-white rounded-[3rem] border border-slate-100 shadow-sm">
//                 <div className="h-24 w-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
//                   <HomeIcon className="h-12 w-12 text-slate-300" />
//                 </div>
//                 <h3 className="text-2xl font-black text-slate-900 mb-2">No properties found</h3>
//                 <p className="text-slate-500 font-medium max-w-xs mx-auto">
//                   {allProperties.length === 0 
//                     ? 'No sale properties available in Firebase. Please check your database.'
//                     : 'We couldn\'t find any properties matching your current filters.'
//                   }
//                 </p>
//                 <button
//                   onClick={handleResetFilters}
//                   className="mt-8 btn-outline !rounded-full !px-8 inline-block text-center"
//                 >
//                   Clear All Filters
//                 </button>
//               </div>
//             )}
//           </main>
//         </div>
//       </div>

      
//     </div>
//   );
// }

// new code
'use client';

import { useState, useEffect } from 'react';
import { Database } from '@/lib/database.types'
import PropertyCard, { PropertyCardProperty } from '@/components/property/PropertyCard'
import PropertyAgents from '@/components/property/PropertyAgents'
import {
  ViewColumnsIcon,
  QueueListIcon,
  MagnifyingGlassIcon,
  HomeIcon,
  XMarkIcon,
  MapPinIcon,
  VideoCameraIcon,
  UserIcon,
  BuildingStorefrontIcon,
  ArrowsPointingOutIcon,
  CheckIcon,
  HomeModernIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  EnvelopeIcon,
  PhoneIcon,
  GlobeAltIcon,
  LanguageIcon,
  ShieldCheckIcon,
  ChartBarIcon,
  StarIcon as StarOutlineIcon
} from '@heroicons/react/24/outline'
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid'
import { BathIcon, BedIcon, CarIcon } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

// Firebase imports
import { db } from '@/lib/firebase'
import { collection, getDocs, query, where, orderBy, doc, getDoc } from 'firebase/firestore'

type Property = Database['public']['Tables']['properties']['Row']
type NormalizedProperty = Property & {
  image: string
  price: number
  priceLabel?: string
  area?: string | null
  city?: string | null
  location: string
  beds: number
  baths: number
  sqft: number
  type: string
  featured: boolean
  developer?: string | null
  description?: string | null
  category?: string | null
  parking?: string | null
  furnished?: boolean | null
  propertyAge?: string | null
  completion?: string | null
  subtype?: string | null
  features?: string[] | null
  video_url?: string | null
  currency?: string
  status?: string
  agent_name?: string
  review_status?: string
  submitted_at?: string
  collection?: string
  address?: string
  property_status?: string
  property_age?: string
  images?: string[]
  floorplans?: string[]
  inquiries_count?: number
  coords?: {
    lat: number
    lng: number
  }
  agent_id?: string
  slug?: string
  created_at?: string
  updated_at?: string
}

// View Details Modal Component - EXACT SAME AS RENT PAGE
function ViewDetailsModal({ 
  property, 
  onClose 
}: { 
  property: NormalizedProperty | null; 
  onClose: () => void 
}) {
  if (!property) return null;

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const handlePrevImage = () => {
    setCurrentImageIndex(prev => 
      prev === 0 
        ? (property.images?.length || property.floorplans?.length || 1) - 1 
        : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex(prev => 
      prev === (property.images?.length || property.floorplans?.length || 1) - 1 
        ? 0 
        : prev + 1
    );
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US').format(price);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getPropertyImages = () => {
    if (property.images && property.images.length > 0) {
      return property.images;
    }
    if (property.floorplans && property.floorplans.length > 0) {
      return property.floorplans;
    }
    return [property.image || ''];
  };

  const propertyImages = getPropertyImages();
  const hasVideo = property.video_url && property.video_url.trim() !== '';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in mt-33">
      <div className="relative w-full max-w-7xl h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden animate-slide-up flex flex-col">
        {/* Header with Close Button */}
        <div className="flex-shrink-0 p-6 border-b border-slate-100 bg-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-black text-slate-900 truncate">
                {property.title || 'Untitled Property'}
              </h2>
              <div className="flex items-center gap-2 text-slate-600 mt-1">
                <MapPinIcon className="h-4 w-4" />
                <span className="font-medium truncate">
                  {property.address || property.location || `${property.area || ''}${property.city ? ', ' + property.city : ''}`}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 hover:text-primary hover:bg-slate-200 transition-colors"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Main Content with Scroll */}
        <div className="flex-1 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-3 h-full">
            {/* Left Column - Images & Details - WITH SCROLL */}
            <div className="lg:col-span-2 h-full overflow-y-auto custom-scrollbar">
              {/* Main Image/Video */}
              <div className="relative h-64 md:h-80 bg-slate-100 overflow-hidden">
                {hasVideo && isVideoPlaying ? (
                  <video
                    src={property.video_url}
                    className="w-full h-full object-cover"
                    autoPlay
                    controls
                    onEnded={() => setIsVideoPlaying(false)}
                  />
                ) : (
                  <img
                    src={propertyImages[currentImageIndex]}
                    alt={property.title || 'Property Image'}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&auto=format&fit=crop';
                    }}
                  />
                )}

                {/* Image Navigation */}
                {propertyImages.length > 1 && !isVideoPlaying && (
                  <>
                    <button
                      onClick={handlePrevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-slate-700 hover:text-primary transition-colors shadow-lg"
                    >
                      ←
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-slate-700 hover:text-primary transition-colors shadow-lg"
                    >
                      →
                    </button>
                  </>
                )}

                {/* Video Play Button */}
                {hasVideo && !isVideoPlaying && (
                  <button
                    onClick={() => setIsVideoPlaying(true)}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-16 w-16 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-primary hover:scale-110 transition-transform shadow-xl"
                  >
                    <VideoCameraIcon className="h-8 w-8" />
                  </button>
                )}

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  <span className="px-3 py-1.5 bg-primary text-white text-xs font-bold uppercase tracking-widest rounded-full">
                    {property.status === 'rent' ? 'For Rent' : 'For Sale'}
                  </span>
                  {property.featured && (
                    <span className="px-3 py-1.5 bg-yellow-500 text-white text-xs font-bold uppercase tracking-widest rounded-full">
                      Featured
                    </span>
                  )}
                  {property.collection === 'agent_properties' && (
                    <span className="px-3 py-1.5 bg-blue-600 text-white text-xs font-bold uppercase tracking-widest rounded-full">
                      Agent Property
                    </span>
                  )}
                </div>
              </div>

              {/* Thumbnail Gallery */}
              {propertyImages.length > 1 && (
                <div className="p-4 border-b border-slate-100">
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {propertyImages.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImageIndex(idx)}
                        className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                          idx === currentImageIndex 
                            ? 'border-primary' 
                            : 'border-transparent hover:border-slate-300'
                        }`}
                      >
                        <img
                          src={img}
                          alt={`Thumbnail ${idx + 1}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=200&auto=format&fit=crop';
                          }}
                        />
                      </button>
                    ))}
                    {hasVideo && (
                      <button
                        onClick={() => setIsVideoPlaying(true)}
                        className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 border-transparent hover:border-primary transition-all relative group"
                      >
                        <div className="absolute inset-0 bg-slate-900/50 flex items-center justify-center">
                          <VideoCameraIcon className="h-5 w-5 text-white" />
                        </div>
                        <div className="text-[9px] text-white font-bold absolute bottom-1 left-1/2 -translate-x-1/2">
                          Video
                        </div>
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Property Details - WITH SCROLL */}
              <div className="p-6 space-y-6 ">
                {/* Price */}
                <div className="bg-slate-50 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-slate-500 font-bold uppercase tracking-widest mb-1">
                        {property.status === 'rent' ? 'Yearly Rent' : 'Sale Price'}
                      </div>
                      <div className="text-2xl md:text-3xl font-black text-primary">
                        {property.currency || 'AED'} {formatPrice(property.price)}
                      </div>
                      {property.status === 'rent' && (
                        <div className="text-slate-500 text-sm mt-1">
                          ≈ {property.currency || 'AED'} {formatPrice(Math.round(property.price / 12))} per month
                        </div>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-slate-500 mb-1">Property ID</div>
                      <div className="font-mono font-bold text-slate-700">
                        {property.id.substring(0, 8).toUpperCase()}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Key Features */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="bg-slate-50 rounded-lg p-3 text-center">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <BedIcon className="h-4 w-4 text-primary" />
                      <span className="text-lg font-black text-slate-900">{property.beds || 0}</span>
                    </div>
                    <div className="text-xs text-slate-500 uppercase tracking-widest font-bold">Bedrooms</div>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-3 text-center">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <BathIcon className="h-4 w-4 text-primary" />
                      <span className="text-lg font-black text-slate-900">{property.baths || 0}</span>
                    </div>
                    <div className="text-xs text-slate-500 uppercase tracking-widest font-bold">Bathrooms</div>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-3 text-center">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <ArrowsPointingOutIcon className="h-4 w-4 text-primary" />
                      <span className="text-lg font-black text-slate-900">{property.sqft || 0}</span>
                    </div>
                    <div className="text-xs text-slate-500 uppercase tracking-widest font-bold">Sq. Ft.</div>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-3 text-center">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <HomeModernIcon className="h-4 w-4 text-primary" />
                      <span className="text-lg font-black text-slate-900">
                        {property.property_age || property.propertyAge || 'N/A'}
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 uppercase tracking-widest font-bold">Property Age</div>
                  </div>
                </div>

                {/* Basic Info */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-slate-500 mb-1">Property Type</div>
                    <div className="font-medium text-slate-900">{property.type || 'Property Type'}</div>
                  </div>
                  <div>
                    <div className="text-slate-500 mb-1">Completion Status</div>
                    <div className="font-medium text-slate-900">
                      {property.completion || property.property_status || 'Ready'}
                    </div>
                  </div>
                  <div>
                    <div className="text-slate-500 mb-1">Furnishing</div>
                    <div className="font-medium text-slate-900">
                      {property.furnished ? 'Furnished' : 'Unfurnished'}
                    </div>
                  </div>
                  <div>
                    <div className="text-slate-500 mb-1">Parking</div>
                    <div className="font-medium text-slate-900">
                      {property.parking === 'yes' ? 'Available' : 'Not Available'}
                    </div>
                  </div>
                </div>

                {/* Description */}
                {property.description && (
                  <div>
                    <h3 className="text-lg font-black text-slate-900 mb-3">Description</h3>
                    <div className="max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                      <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                        {property.description}
                      </p>
                    </div>
                  </div>
                )}

                {/* Features List */}
                {property.features && property.features.length > 0 && (
                  <div>
                    <h3 className="text-lg font-black text-slate-900 mb-3">Features & Amenities</h3>
                    <div className="max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {property.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-3">
                            <CheckIcon className="h-4 w-4 text-green-500 flex-shrink-0" />
                            <span className="text-slate-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Additional Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-black text-slate-900 mb-3">Property Details</h3>
                    <div className="space-y-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                      <div className="flex justify-between py-2 border-b border-slate-100">
                        <span className="text-slate-600">Inquiries</span>
                        <span className="font-medium text-slate-900">
                          {property.inquiries_count || 0}
                        </span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-slate-100">
                        <span className="text-slate-600">Date Added</span>
                        <span className="font-medium text-slate-900">
                          {formatDate(property.created_at || property.submitted_at)}
                        </span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-slate-100">
                        <span className="text-slate-600">Last Updated</span>
                        <span className="font-medium text-slate-900">
                          {formatDate(property.updated_at)}
                        </span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-slate-100">
                        <span className="text-slate-600">Agent</span>
                        <span className="font-medium text-slate-900">
                          {property.agent_name || 'N/A'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-black text-slate-900 mb-3">Collection Info</h3>
                    <div className="space-y-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                      <div className="flex justify-between py-2 border-b border-slate-100">
                        <span className="text-slate-600">Source</span>
                        <span className="font-medium text-slate-900">
                          {property.collection === 'agent_properties' ? 'Agent Properties' : 'Main Properties'}
                        </span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-slate-100">
                        <span className="text-slate-600">Review Status</span>
                        <span className={`font-medium ${
                          property.review_status === 'published' 
                            ? 'text-green-600' 
                            : 'text-amber-600'
                        }`}>
                          {property.review_status || 'N/A'}
                        </span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-slate-100">
                        <span className="text-slate-600">Slug</span>
                        <span className="font-medium text-slate-900 font-mono text-sm">
                          {property.slug || 'N/A'}
                        </span>
                      </div>
                      {property.agent_id && (
                        <div className="flex justify-between py-2 border-b border-slate-100">
                          <span className="text-slate-600">Agent ID</span>
                          <span className="font-medium text-slate-900 font-mono text-sm">
                            {property.agent_id.substring(0, 8)}...
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Coordinates */}
                {property.coords && (
                  <div className="bg-slate-50 rounded-xl p-4">
                    <h3 className="text-lg font-black text-slate-900 mb-2">Location Coordinates</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-slate-500">Latitude</div>
                        <div className="font-mono text-slate-900">{property.coords.lat}</div>
                      </div>
                      <div>
                        <div className="text-sm text-slate-500">Longitude</div>
                        <div className="font-mono text-slate-900">{property.coords.lng}</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Action Panel - WITH SCROLL */}
            <div className="lg:col-span-1 h-full overflow-y-auto custom-scrollbar border-l border-slate-100 bg-slate-50">
              <div className="p-6 space-y-6">
                {/* Contact Agent */}
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <h3 className="text-lg font-black text-slate-900 mb-4">Contact Information</h3>
                  
                  {property.agent_id ? (
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <UserIcon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <div className="font-bold text-slate-900">{property.agent_name || 'Agent'}</div>
                          <div className="text-sm text-slate-500">Property Agent</div>
                        </div>
                      </div>
                     
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3">
                        <BuildingStorefrontIcon className="h-6 w-6 text-slate-400" />
                      </div>
                      <div className="text-slate-700 mb-4 text-sm">
                        This property is listed directly by our agency
                      </div>
                      <button className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-primary/90 transition-colors">
                        Contact Our Team
                      </button>
                    </div>
                  )}
                </div>

                

                {/* Financial Calculator */}
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <h3 className="text-lg font-black text-slate-900 mb-4">Financial Calculator</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-slate-500 mb-1">Monthly Rent</div>
                      <div className="text-xl font-black text-primary">
                        {property.currency || 'AED'} {formatPrice(Math.round(property.price / 12))}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-500 mb-1">Deposit (5%)</div>
                      <div className="text-lg font-bold text-slate-900">
                        {property.currency || 'AED'} {formatPrice(Math.round(property.price * 0.05))}
                      </div>
                    </div>
                    <div className="text-xs text-slate-500">
                      *Calculations are approximate. Contact us for exact figures.
                    </div>
                  </div>
                </div>

                {/* Share Property */}
                <div className="border-t border-slate-200 pt-6">
                  <h3 className="text-lg font-black text-slate-900 mb-4">Share This Property</h3>
                  <div className="grid grid-cols-3 gap-2">
                    <button className="h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center hover:bg-blue-200 transition-colors text-sm font-bold">
                      Facebook
                    </button>
                    <button className="h-10 rounded-lg bg-pink-100 text-pink-600 flex items-center justify-center hover:bg-pink-200 transition-colors text-sm font-bold">
                      Instagram
                    </button>
                    <button className="h-10 rounded-lg bg-green-100 text-green-600 flex items-center justify-center hover:bg-green-200 transition-colors text-sm font-bold">
                      WhatsApp
                    </button>
                  </div>
                </div>

                {/* Similar Properties Link */}
                <div className="text-center pt-4">
                  <button className="text-primary font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-2 w-full">
                    View Similar Properties
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Scrollbar CSS */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #cbd5e1 #f1f5f9;
        }
      `}</style>
    </div>
  );
}

// Function to fetch property details by ID from specific collection
async function fetchPropertyDetails(propertyId: string, collectionName: string) {
  try {
    console.log(`📋 Fetching details for property ${propertyId} from ${collectionName}...`);
    
    const docRef = doc(db, collectionName, propertyId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      console.log(`✅ Found property details:`, {
        title: data.title,
        collection: collectionName
      });
      
      return {
        id: docSnap.id,
        collection: collectionName,
        ...data
      };
    } else {
      console.log(`❌ No property found with ID: ${propertyId} in ${collectionName}`);
      return null;
    }
  } catch (error) {
    console.error(`❌ Error fetching property details from ${collectionName}:`, error);
    return null;
  }
}

// Function to fetch properties from 'properties' collection
async function fetchPropertiesFromMainCollection() {
  try {
    console.log('🔥 Fetching from main properties collection...');
    const propertiesRef = collection(db, 'properties');
    
    const q = query(
      propertiesRef,
      where('status', '==', 'sale'),
      where('published', '==', true)
    );
    
    const querySnapshot = await getDocs(q);
    console.log(`✅ Main Collection: Found ${querySnapshot.size} sale properties`);
    
    const properties: any[] = [];
    querySnapshot.forEach((doc) => {
      properties.push({
        id: doc.id,
        collection: 'properties',
        ...doc.data()
      });
    });
    
    return properties;
    
  } catch (error: any) {
    console.error('❌ Error fetching from main collection:', error.message);
    return [];
  }
}

// Function to fetch properties from 'agent_properties' collection
async function fetchPropertiesFromAgentCollection() {
  try {
    console.log('🔥 Fetching from agent_properties collection...');
    const agentPropertiesRef = collection(db, 'agent_properties');
    
    const q = query(
      agentPropertiesRef,
      where('status', '==', 'sale'),
      where('published', '==', true),
      where('review_status', '==', 'published')
    );
    
    const querySnapshot = await getDocs(q);
    console.log(`✅ Agent Collection: Found ${querySnapshot.size} sale properties`);
    
    const properties: any[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      properties.push({
        id: doc.id,
        collection: 'agent_properties',
        ...data
      });
    });
    
    return properties;
    
  } catch (error: any) {
    console.error('❌ Error fetching from agent collection:', error.message);
    return [];
  }
}

// Main function to fetch all sale properties from both collections
async function fetchAllSaleProperties() {
  try {
    console.log('🔄 Fetching properties from ALL collections...');
    
    // Fetch from both collections simultaneously
    const [mainProperties, agentProperties] = await Promise.all([
      fetchPropertiesFromMainCollection(),
      fetchPropertiesFromAgentCollection()
    ]);
    
    console.log(`📊 Results: ${mainProperties.length} from main, ${agentProperties.length} from agent`);
    
    // Combine both collections
    const allProperties = [...mainProperties, ...agentProperties];
    console.log(`✅ Total properties found: ${allProperties.length}`);
    
    return allProperties;
    
  } catch (error) {
    console.error('❌ Error in fetchAllSaleProperties:', error);
    return [];
  }
}

export default function PropertiesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // State for properties and filters
  const [allProperties, setAllProperties] = useState<NormalizedProperty[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<NormalizedProperty[]>([]);
  const [loading, setLoading] = useState(true);
  
  // ADD THESE STATES FOR MODAL
  const [selectedProperty, setSelectedProperty] = useState<NormalizedProperty | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Get filter values from URL
  const viewMode = searchParams.get('view') === 'list' ? 'list' : 'grid';
  const sortBy = searchParams.get('sortBy') || 'featured';
  const action = searchParams.get('action') || 'buy';
  const category = searchParams.get('category') || '';
  const type = searchParams.get('type') || '';
  const area = searchParams.get('area') || '';
  const developer = searchParams.get('developer') || '';
  const minPrice = searchParams.get('minPrice') || '';
  const maxPrice = searchParams.get('maxPrice') || '';
  const beds = searchParams.get('beds') || '';
  const baths = searchParams.get('baths') || '';
  const minSqft = searchParams.get('minSqft') || '';
  const maxSqft = searchParams.get('maxSqft') || '';
  const furnished = searchParams.get('furnished') || '';
  const parking = searchParams.get('parking') || '';
  const propertyAge = searchParams.get('propertyAge') || '';
  const completion = searchParams.get('completion') || '';
  const features = searchParams.get('features') || '';
  const subtype = searchParams.get('subtype') || '';
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = 20;
  const search = searchParams.get('search') || '';
  const hasVideo = searchParams.get('hasVideo') || '';

  // Local form state
  const [formState, setFormState] = useState({
    action,
    category,
    type,
    area,
    minPrice,
    maxPrice,
    beds,
    baths,
    furnished,
    completion,
    hasVideo,
    search
  });

  // Handle View Details Click - EXACT SAME AS RENT PAGE
  const handleViewDetails = async (property: NormalizedProperty) => {
    try {
      console.log(`🔄 Loading details for property: ${property.id} from ${property.collection}`);
      
      // Fetch complete details from Firebase
      const detailedProperty = await fetchPropertyDetails(property.id, property.collection || 'properties');
      
      if (detailedProperty) {
        // Normalize the detailed property
        const normalized = {
          ...detailedProperty,
          image: property.image || detailedProperty.images?.[0] || detailedProperty.image_url || '',
          price: detailedProperty.price || 0,
          priceLabel: detailedProperty.status === 'rent' ? 'yearly' : 'total',
          area: detailedProperty.area || detailedProperty.location || detailedProperty.address || 'Dubai',
          city: detailedProperty.city || 'Dubai',
          location: detailedProperty.address || detailedProperty.area || detailedProperty.city || 'Dubai',
          beds: detailedProperty.beds || 0,
          baths: detailedProperty.baths || 0,
          sqft: detailedProperty.sqft || 0,
          type: detailedProperty.type || detailedProperty.subtype || 'Apartment',
          developer: detailedProperty.developer || null,
          featured: Boolean(detailedProperty.featured),
          category: detailedProperty.category || null,
          parking: detailedProperty.parking || null,
          propertyAge: detailedProperty.property_age || detailedProperty.propertyAge || null,
          completion: detailedProperty.completion || detailedProperty.property_status || 'ready',
          subtype: detailedProperty.subtype || null,
          description: detailedProperty.description || null,
          features: Array.isArray(detailedProperty.features) ? detailedProperty.features : [],
          video_url: detailedProperty.video_url || null,
          currency: detailedProperty.currency || 'AED',
          status: detailedProperty.status || 'sale',
          agent_name: detailedProperty.agent_name || null,
          review_status: detailedProperty.review_status || null,
          submitted_at: detailedProperty.submitted_at || null,
          collection: detailedProperty.collection || 'properties',
          address: detailedProperty.address,
          property_status: detailedProperty.property_status,
          property_age: detailedProperty.property_age,
          images: detailedProperty.images || [],
          floorplans: detailedProperty.floorplans || [],
          inquiries_count: detailedProperty.inquiries_count || 0,
          coords: detailedProperty.coords,
          agent_id: detailedProperty.agent_id,
          slug: detailedProperty.slug,
          created_at: detailedProperty.created_at,
          updated_at: detailedProperty.updated_at
        };
        
        setSelectedProperty(normalized);
        setIsModalOpen(true);
        console.log('✅ Property details loaded successfully');
      } else {
        console.log('⚠️ Using cached property data');
        setSelectedProperty(property);
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error('❌ Error loading property details:', error);
      // Fallback to cached property data
      setSelectedProperty(property);
      setIsModalOpen(true);
    }
  };

  // Close Details Modal
  const closeDetailsModal = () => {
    setSelectedProperty(null);
    setIsModalOpen(false);
  };

  // Fetch properties on component mount
  useEffect(() => {
    async function loadProperties() {
      setLoading(true);
      const properties = await fetchAllSaleProperties();
      
      // Normalize properties
      const normalized = properties.map((p: any) => {
        // Get first image
        let imageUrl = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg==';
        
        if (p.images && Array.isArray(p.images) && p.images.length > 0) {
          imageUrl = p.images[0];
        } else if (p.image) {
          imageUrl = p.image;
        } else if (p.image_url) {
          imageUrl = p.image_url;
        }
        
        // Determine price
        const price = typeof p.price === 'string' ? parseFloat(p.price) : (p.price ?? 0);
        
        // Determine location
        const location = p.location || p.area || p.city || 'Dubai';
        
        // Handle property_status vs completion
        const completionStatus = p.completion || p.property_status || null;
        
        // Handle different field names for area
        const propertyArea = p.area || p.location || p.neighborhood || p.district || null;
        
        return {
          ...p,
          image: imageUrl,
          price: price,
          priceLabel: p.priceLabel || 'total',
          area: propertyArea,
          city: p.city || 'Dubai',
          location: location,
          beds: p.beds ?? 0,
          baths: p.baths ?? 0,
          sqft: p.sqft ?? 0,
          type: p.type || p.subtype || 'Apartment',
          developer: p.developer || (p.developers?.name ? p.developers.name : null) || p.developer_id || null,
          featured: Boolean(p.featured),
          category: p.category || null,
          parking: p.parking || null,
          propertyAge: p.property_age || p.propertyAge || null,
          completion: completionStatus,
          subtype: p.subtype || null,
          description: p.description || null,
          features: Array.isArray(p.features) ? p.features : (typeof p.features === 'string' ? p.features.split(',').map((f: string) => f.trim()) : []),
          video_url: p.video_url || null,
          currency: p.currency || 'AED',
          status: p.status || 'sale',
          agent_name: p.agent_name || null,
          review_status: p.review_status || null,
          submitted_at: p.submitted_at || null,
          collection: p.collection || 'properties'
        };
      });
      
      setAllProperties(normalized);
      setLoading(false);
    }
    
    loadProperties();
  }, []);

  // Apply filters whenever filter parameters change
  useEffect(() => {
    if (allProperties.length === 0) return;
    
    let filtered = [...allProperties];
    
    console.log('🔄 Applying filters...', {
      action, category, type, area, minPrice, maxPrice,
      beds, baths, furnished, completion, search
    });

    // Filter by action (buy/rent)
    if (action === 'buy') {
      filtered = filtered.filter(p => p.status === 'sale');
    } else if (action === 'rent') {
      filtered = filtered.filter(p => p.status === 'rent');
    }

    // Filter by category
    if (category) {
      filtered = filtered.filter(p => p.category === category);
    }

    // Filter by type
    if (type) {
      filtered = filtered.filter(p => p.type?.toLowerCase() === type.toLowerCase());
    }

    // Filter by subtype
    if (subtype) {
      filtered = filtered.filter(p => p.subtype?.toLowerCase() === subtype.toLowerCase());
    }

    // Filter by area
    if (area) {
      filtered = filtered.filter(p => 
        p.area?.toLowerCase().includes(area.toLowerCase()) || 
        p.city?.toLowerCase().includes(area.toLowerCase()) ||
        p.location?.toLowerCase().includes(area.toLowerCase())
      );
    }

    // Filter by developer
    if (developer) {
      filtered = filtered.filter(p => p.developer?.toLowerCase().includes(developer.toLowerCase()));
    }

    // Filter by price
    if (minPrice) {
      filtered = filtered.filter(p => p.price >= parseInt(minPrice));
    }
    if (maxPrice) {
      filtered = filtered.filter(p => p.price <= parseInt(maxPrice));
    }

    // Filter by beds
    if (beds) {
      filtered = filtered.filter(p => p.beds === parseInt(beds));
    }

    // Filter by baths
    if (baths) {
      filtered = filtered.filter(p => p.baths === parseInt(baths));
    }

    // Filter by sqft
    if (minSqft) {
      filtered = filtered.filter(p => p.sqft >= parseInt(minSqft));
    }
    if (maxSqft) {
      filtered = filtered.filter(p => p.sqft <= parseInt(maxSqft));
    }

    // Filter by furnished
    if (furnished === 'true') {
      filtered = filtered.filter(p => p.furnished === true);
    } else if (furnished === 'false') {
      filtered = filtered.filter(p => p.furnished === false || p.furnished === null);
    }

    // Filter by parking
    if (parking) {
      filtered = filtered.filter(p => p.parking?.toLowerCase() === parking.toLowerCase());
    }

    // Filter by property age
    if (propertyAge) {
      filtered = filtered.filter(p => p.propertyAge === propertyAge);
    }

    // Filter by completion
    if (completion) {
      filtered = filtered.filter(p => p.completion === completion);
    }

    // Filter by video availability
    if (hasVideo === 'true') {
      filtered = filtered.filter(p => p.video_url && p.video_url.trim() !== '');
    }

    // Features filter - support both comma-separated and single feature
    const featuresList = features ? features.split(',').map(f => f.trim()).filter(Boolean) : [];
    // Also check for individual feature parameters
    const featureParam = searchParams.get('feature') || '';
    if (featureParam) {
      featuresList.push(featureParam);
    }
    
    if (featuresList.length > 0) {
      filtered = filtered.filter((p: NormalizedProperty) => {
        if (!p.features || !Array.isArray(p.features)) return false;
        return featuresList.every(f => (p.features || []).some(pf => pf?.toLowerCase() === f.toLowerCase()));
      });
    }

    // Search filtering
    if (search && search.trim() !== '') {
      const sLower = search.toLowerCase();
      filtered = filtered.filter(p => {
        const inTitle = p.title?.toLowerCase().includes(sLower);
        const inLocation = p.location?.toLowerCase().includes(sLower);
        const inArea = (p.area || '').toLowerCase().includes(sLower);
        const inDesc = (p.description || '').toLowerCase().includes(sLower);
        const inDeveloper = ((p.developer || '') as string).toLowerCase().includes(sLower);
        const inAgentName = ((p.agent_name || '') as string).toLowerCase().includes(sLower);
        return inTitle || inLocation || inArea || inDesc || inDeveloper || inAgentName;
      });
    }

    // Sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filtered.sort((a, b) => {
          const dateA = a.submitted_at || a.created_at || '0';
          const dateB = b.submitted_at || b.created_at || '0';
          return new Date(dateB).getTime() - new Date(dateA).getTime();
        });
        break;
      case 'featured':
      default:
        filtered.sort((a, b) => {
          if (Boolean(b.featured) !== Boolean(a.featured)) {
            return Number(b.featured) - Number(a.featured);
          }
          const dateA = a.submitted_at || a.created_at || '0';
          const dateB = b.submitted_at || b.created_at || '0';
          return new Date(dateB).getTime() - new Date(dateA).getTime();
        });
        break;
    }

    console.log(`✅ Filtered to ${filtered.length} properties`);
    setFilteredProperties(filtered);
  }, [
    allProperties, action, category, type, area, developer, minPrice, maxPrice,
    beds, baths, minSqft, maxSqft, furnished, parking, propertyAge, completion,
    features, search, hasVideo, sortBy
  ]);

  // Handle form changes
  const handleInputChange = (name: string, value: string) => {
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const params = new URLSearchParams();
    
    // Add all non-empty form values to URL params
    Object.entries(formState).forEach(([key, value]) => {
      if (value && value !== '') {
        params.set(key, value);
      }
    });
    
    // Add other params that are not in formState
    if (parking) params.set('parking', parking);
    if (propertyAge) params.set('propertyAge', propertyAge);
    if (features) params.set('features', features);
    if (subtype) params.set('subtype', subtype);
    if (developer) params.set('developer', developer);
    if (minSqft) params.set('minSqft', minSqft);
    if (maxSqft) params.set('maxSqft', maxSqft);
    
    // Always keep view mode
    params.set('view', viewMode);
    params.set('sortBy', sortBy);
    
    // Reset to page 1 when applying new filters
    params.set('page', '1');
    
    router.push(`/properties?${params.toString()}`);
  };

  // Handle reset filters
  const handleResetFilters = () => {
    setFormState({
      action: 'buy',
      category: '',
      type: '',
      area: '',
      minPrice: '',
      maxPrice: '',
      beds: '',
      baths: '',
      furnished: '',
      completion: '',
      hasVideo: '',
      search: ''
    });
    
    router.push('/properties?view=grid&sortBy=featured&action=buy&page=1');
  };

  // Handle sort change
  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sortBy', value);
    params.set('page', '1');
    router.push(`/properties?${params.toString()}`);
  };

  // Handle view change
  const handleViewChange = (view: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('view', view);
    params.set('page', '1');
    router.push(`/properties?${params.toString()}`);
  };

  // Handle pagination
  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());
    router.push(`/properties?${params.toString()}`);
  };

  // Generate dynamic title and description based on filters
  const getPageTitle = () => {
    let title = '';

    if (category === 'luxe') {
      title += 'Luxury ';
    }

    if (type) {
      const typeLabels: Record<string, string> = {
        apartment: 'Apartments',
        villa: 'Villas',
        townhouse: 'Townhouses',
        penthouse: 'Penthouses',
        studio: 'Studios',
        plot: 'Plots',
        commercial: 'Commercial Properties'
      };
      title += typeLabels[type] || type.charAt(0).toUpperCase() + type.slice(1) + 's';
    } else if (category === 'luxe') {
      title += 'Properties';
    } else {
      title += 'Properties';
    }

    title += action === 'rent' ? ' for Rent' : ' for Sale';
    title += area ? ` in ${area}` : ' in Dubai';

    return title;
  };

  const getPageDescription = () => {
    let desc = '';

    if (category === 'luxe') {
      desc += 'Discover exclusive luxury ';
    } else {
      desc += 'Find ';
    }

    if (type) {
      const typeLabels: Record<string, string> = {
        apartment: 'apartments',
        villa: 'villas',
        townhouse: 'townhouses',
        penthouse: 'penthouses',
        studio: 'studios',
        plot: 'plots',
        commercial: 'commercial properties'
      };
      desc += typeLabels[type] || type + 's';
    } else {
      desc += 'properties';
    }

    desc += action === 'rent' ? ' for rent' : ' for sale';
    desc += area ? ` in ${area}, Dubai` : ' in Dubai';
    desc += '. Browse our curated selection with detailed information and high-quality images.';

    return desc;
  };

  // Pagination calculations
  const total = filteredProperties.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const offset = (Math.max(page, 1) - 1) * limit;
  const paginatedProperties = filteredProperties.slice(offset, offset + limit);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50/50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-slate-600">Loading properties...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50">
      {/* View Details Modal - EXACT SAME AS RENT PAGE */}
      {isModalOpen && selectedProperty && (
        <ViewDetailsModal 
          property={selectedProperty} 
          onClose={closeDetailsModal} 
        />
      )}

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-slate-900">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1600&q=80" 
            alt="Dubai Skyline" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900/80 to-slate-900" />
        
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-primary font-bold tracking-[0.3em] uppercase text-sm animate-slide-up">
              Premium Listings
            </h2>
            <h1 className="text-4xl md:text-7xl font-black text-white tracking-tight animate-slide-up [animation-delay:100ms]">
              {getPageTitle()}
            </h1>
            <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto font-medium animate-slide-up [animation-delay:200ms]">
              {getPageDescription()}
            </p>

            {/* Property Stats */}
            <div className="flex flex-wrap justify-center gap-3 pt-4 animate-slide-up [animation-delay:300ms]">
              <span className="px-6 py-2 bg-white/10 backdrop-blur-md text-white rounded-full border border-white/10 text-sm font-bold">
                {total} Properties Found
              </span>
              {search && (
                <span className="px-6 py-2 bg-primary/20 backdrop-blur-md text-primary rounded-full border border-primary/30 text-sm font-bold">
                  🔎 &ldquo;{search}&rdquo;
                </span>
              )}
              {area && (
                <span className="px-6 py-2 bg-white/10 backdrop-blur-md text-white rounded-full border border-white/10 text-sm font-bold">
                  📍 {area}
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container-custom py-8 sm:py-16">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Filters Sidebar */}
          <aside className="lg:w-1/4">
            <div className="sticky top-24 space-y-6 lg:space-y-8">
              <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl shadow-slate-200/50 p-4 sm:p-8 border border-slate-100">
                <div className="flex items-center justify-between mb-6 sm:mb-8">
                  <h3 className="text-lg sm:text-xl font-black text-slate-900">Filters</h3>
                  <button 
                    type="button" 
                    onClick={handleResetFilters}
                    className="text-xs font-bold text-primary uppercase tracking-widest hover:text-primary/80 transition-colors"
                  >
                    Reset All
                  </button>
                </div>

                <form onSubmit={handleFilterSubmit} className="space-y-8">
                  {/* Search */}
                  <div className="space-y-3">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Keywords</label>
                    <div className="relative">
                      <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                      <input 
                        name="search" 
                        type="text" 
                        value={formState.search}
                        onChange={(e) => handleInputChange('search', e.target.value)}
                        placeholder="Search properties..." 
                        className="w-full bg-slate-50 border-none rounded-2xl pl-12 pr-4 py-4 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-primary/20 transition-all font-medium" 
                      />
                    </div>
                  </div>

                  {/* Action Type */}
                  <div className="space-y-3">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Action</label>
                    <div className="grid grid-cols-2 gap-2">
                      <label className="relative cursor-pointer group">
                        <input 
                          type="radio" 
                          name="action" 
                          value="buy" 
                          checked={formState.action === 'buy'}
                          onChange={(e) => handleInputChange('action', e.target.value)}
                          className="peer sr-only" 
                        />
                        <div className="flex items-center justify-center py-3 rounded-xl bg-slate-50 text-slate-600 font-bold text-sm peer-checked:bg-primary peer-checked:text-white group-hover:bg-slate-100 transition-all">
                          Buy
                        </div>
                      </label>
                      <label className="relative cursor-pointer group">
                        <input 
                          type="radio" 
                          name="action" 
                          value="rent" 
                          checked={formState.action === 'rent'}
                          onChange={(e) => handleInputChange('action', e.target.value)}
                          className="peer sr-only" 
                        />
                        <div className="flex items-center justify-center py-3 rounded-xl bg-slate-50 text-slate-600 font-bold text-sm peer-checked:bg-primary peer-checked:text-white group-hover:bg-slate-100 transition-all">
                          Rent
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Property Category */}
                  <div className="space-y-3">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Category</label>
                    <div className="space-y-2">
                      {[
                        { value: '', label: 'All Properties' },
                        { value: 'luxe', label: 'Luxury' },
                        { value: 'ultra-luxe', label: 'Ultra Luxury' },
                        { value: 'branded', label: 'Branded Residences' }
                      ].map((cat) => (
                        <label key={cat.value} className="flex items-center gap-3 cursor-pointer group">
                          <input 
                            type="radio" 
                            name="category" 
                            value={cat.value}
                            checked={formState.category === cat.value}
                            onChange={(e) => handleInputChange('category', e.target.value)}
                            className="w-4 h-4 text-primary bg-slate-50 border-slate-300 rounded focus:ring-primary/20 focus:ring-2 cursor-pointer" 
                          />
                          <span className="text-slate-700 font-medium group-hover:text-slate-900 transition-colors">
                            {cat.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Property Type */}
                  <div className="space-y-3">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Property Type</label>
                    <select 
                      name="type" 
                      value={formState.type}
                      onChange={(e) => handleInputChange('type', e.target.value)}
                      className="w-full bg-slate-50 border-none rounded-2xl px-4 py-4 text-slate-900 focus:ring-2 focus:ring-primary/20 transition-all font-medium appearance-none cursor-pointer"
                    >
                      <option value="">All Types</option>
                      <option value="apartment">Apartments</option>
                      <option value="villa">Villas</option>
                      <option value="townhouse">Townhouses</option>
                      <option value="penthouse">Penthouses</option>
                      <option value="studio">Studios</option>
                      <option value="plot">Plots</option>
                      <option value="office">Offices</option>
                      <option value="shop">Shops</option>
                      <option value="warehouse">Warehouses</option>
                      <option value="building">Commercial Buildings</option>
                    </select>
                  </div>

                  {/* Location */}
                  <div className="space-y-3">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Location</label>
                    <select 
                      name="area" 
                      value={formState.area}
                      onChange={(e) => handleInputChange('area', e.target.value)}
                      className="w-full bg-slate-50 border-none rounded-2xl px-4 py-4 text-slate-900 focus:ring-2 focus:ring-primary/20 transition-all font-medium appearance-none cursor-pointer"
                    >
                      <option value="">All Areas</option>
                      <option value="Dubai Marina">Dubai Marina</option>
                      <option value="Downtown Dubai">Downtown Dubai</option>
                      <option value="Palm Jumeirah">Palm Jumeirah</option>
                      <option value="Business Bay">Business Bay</option>
                      <option value="Jumeirah">Jumeirah</option>
                      <option value="Dubai Hills Estate">Dubai Hills Estate</option>
                      <option value="Dubai Creek Harbour">Dubai Creek Harbour</option>
                      <option value="Emirates Hills">Emirates Hills</option>
                      <option value="Arabian Ranches">Arabian Ranches</option>
                      <option value="Dubai South">Dubai South</option>
                      <option value="Al Barsha">Al Barsha</option>
                      <option value="Dubai Silicon Oasis">Dubai Silicon Oasis</option>
                      <option value="Deira">Deira</option>
                      <option value="Jumeirah Beach Residence">Jumeirah Beach Residence</option>
                      <option value="Dubai Islands">Dubai Islands</option>
                    </select>
                  </div>

                  {/* Price Range */}
                  <div className="space-y-3">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Price Range (AED)</label>
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        name="minPrice"
                        type="number"
                        placeholder="Min"
                        value={formState.minPrice}
                        onChange={(e) => handleInputChange('minPrice', e.target.value)}
                        className="w-full bg-slate-50 border-none rounded-2xl px-4 py-4 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                      />
                      <input
                        name="maxPrice"
                        type="number"
                        placeholder="Max"
                        value={formState.maxPrice}
                        onChange={(e) => handleInputChange('maxPrice', e.target.value)}
                        className="w-full bg-slate-50 border-none rounded-2xl px-4 py-4 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                      />
                    </div>
                  </div>

                  {/* Bedrooms */}
                  <div className="space-y-3">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Bedrooms</label>
                    <div className="grid grid-cols-3 gap-2">
                      {['', '0', '1', '2', '3', '4', '5'].map((val) => (
                        <label key={val} className="relative cursor-pointer group">
                          <input 
                            type="radio" 
                            name="beds" 
                            value={val}
                            checked={formState.beds === val}
                            onChange={(e) => handleInputChange('beds', e.target.value)}
                            className="peer sr-only" 
                          />
                          <div className="flex items-center justify-center py-3 rounded-xl bg-slate-50 text-slate-600 font-bold text-sm peer-checked:bg-primary peer-checked:text-white group-hover:bg-slate-100 transition-all">
                            {val === '' ? 'Any' : val === '0' ? 'ST' : val}
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Completion Status */}
                  <div className="space-y-3">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Completion Status</label>
                    <div className="space-y-2">
                      {[
                        { value: '', label: 'All Properties' },
                        { value: 'ready', label: 'Ready to Move' },
                        { value: 'off-plan', label: 'Off-Plan' }
                      ].map((status) => (
                        <label key={status.value} className="flex items-center gap-3 cursor-pointer group">
                          <input 
                            type="radio" 
                            name="completion" 
                            value={status.value}
                            checked={formState.completion === status.value}
                            onChange={(e) => handleInputChange('completion', e.target.value)}
                            className="w-4 h-4 text-primary bg-slate-50 border-slate-300 rounded focus:ring-primary/20 focus:ring-2 cursor-pointer" 
                          />
                          <span className="text-slate-700 font-medium group-hover:text-slate-900 transition-colors">
                            {status.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Furnished Status */}
                  <div className="space-y-3">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Furnished</label>
                    <div className="space-y-2">
                      {[
                        { value: '', label: 'Any' },
                        { value: 'true', label: 'Furnished' },
                        { value: 'false', label: 'Unfurnished' }
                      ].map((furnish) => (
                        <label key={furnish.value} className="flex items-center gap-3 cursor-pointer group">
                          <input 
                            type="radio" 
                            name="furnished" 
                            value={furnish.value}
                            checked={formState.furnished === furnish.value}
                            onChange={(e) => handleInputChange('furnished', e.target.value)}
                            className="w-4 h-4 text-primary bg-slate-50 border-slate-300 rounded focus:ring-primary/20 focus:ring-2 cursor-pointer" 
                          />
                          <span className="text-slate-700 font-medium group-hover:text-slate-900 transition-colors">
                            {furnish.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Property Features */}
                  <div className="space-y-3">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Property Features</label>
                    <div className="space-y-2">
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <input 
                          type="checkbox" 
                          name="hasVideo" 
                          checked={formState.hasVideo === 'true'}
                          onChange={(e) => handleInputChange('hasVideo', e.target.checked ? 'true' : '')}
                          className="w-5 h-5 text-primary bg-slate-50 border-slate-300 rounded focus:ring-primary/20 focus:ring-2 cursor-pointer" 
                        />
                        <span className="text-slate-700 font-medium group-hover:text-slate-900 transition-colors">
                          Properties with Video Tours
                        </span>
                      </label>
                    </div>
                  </div>

                  <button type="submit" className="btn-primary !w-full !rounded-2xl !py-4 shadow-xl shadow-primary/20">
                    Apply Filters
                  </button>
                </form>
              </div>

              {/* Help Card */}
              <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden group">
                <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl group-hover:bg-primary/30 transition-all duration-500" />
                <div className="relative z-10">
                  <h4 className="text-xl font-black mb-4">Need Help?</h4>
                  <p className="text-slate-400 text-sm font-medium mb-6 leading-relaxed">
                    Our expert agents are ready to help you find your perfect property.
                  </p>
                  <button className="text-primary font-bold text-sm uppercase tracking-widest flex items-center gap-2 group/btn">
                    Contact Us
                    <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                  </button>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:w-3/4">
            {/* Sort and View Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 sm:mb-10 gap-4 sm:gap-6 bg-white p-4 sm:p-4 rounded-2xl sm:rounded-3xl border border-slate-100 shadow-sm">
              <div className="flex items-center gap-4 pl-4">
                <span className="text-slate-400 font-bold text-sm uppercase tracking-widest">
                  {total} Properties Found
                </span>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
               

                <div className="h-8 w-[1px] bg-slate-100 hidden sm:block mx-2" />

                <div className="flex bg-slate-50 p-1 rounded-xl">
                  <button
                    type="button"
                    onClick={() => handleViewChange('grid')}
                    className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-primary' : 'text-slate-400 hover:text-slate-600'}`}
                  >
                    <ViewColumnsIcon className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleViewChange('list')}
                    className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-primary' : 'text-slate-400 hover:text-slate-600'}`}
                  >
                    <QueueListIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Properties Grid/List from BOTH collections */}
            {filteredProperties.length > 0 ? (
              <>
                <div className={`grid gap-8 ${
                  viewMode === 'grid'
                    ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'
                    : 'grid-cols-1'
                }`}>
                  {paginatedProperties.map((property, i) => (
                    <div key={`${property.collection}-${property.id}`} className="animate-slide-up" style={{ animationDelay: `${i * 50}ms` }}>
                      <div className="relative group">
                        <PropertyCard
                          property={{
                            id: String(property.id),
                            title: property.title || 'New Property',
                            price: property.price ?? 0,
                            priceLabel: property.priceLabel || 'total',
                            image: property.image,
                            location: property.location || `${property.area || ''}${property.city ? ', ' + property.city : ''}`,
                            beds: property.beds ?? 0,
                            baths: property.baths ?? 0,
                            sqft: property.sqft ?? 0,
                            type: property.type || 'Property',
                            featured: Boolean(property.featured),
                            currency: property.currency || 'AED',
                            status: property.status || 'sale',
                            area: property.area || undefined,
                            city: property.city || undefined,
                            video_url: property.video_url || undefined,
                            agent_name: property.agent_name || undefined,
                          }}
                        />
                        
                        {/* ADD VIEW DETAILS BUTTON - EXACT SAME AS RENT PAGE */}
                        <button
                          onClick={() => handleViewDetails(property)}
                          className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white/90 backdrop-blur-md rounded-xl px-4 py-2 shadow-lg hover:shadow-xl hover:bg-white border border-slate-200 flex items-center gap-2 text-slate-700 hover:text-primary font-bold text-sm z-10"
                        >
                          <ArrowsPointingOutIcon className="h-4 w-4" />
                          View Details
                        </button>
                      </div>
                      
                      {property.collection === 'agent_properties' && (
                        <div className="mt-2">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            🤝 Agent Property
                            {property.agent_name && ` - ${property.agent_name}`}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-16 flex items-center justify-center gap-2">
                    {page > 1 && (
                      <button
                        onClick={() => handlePageChange(page - 1)}
                        className="h-12 w-12 flex items-center justify-center rounded-xl bg-white border border-slate-100 text-slate-600 hover:bg-primary hover:text-white hover:border-primary transition-all font-bold shadow-sm"
                      >
                        ←
                      </button>
                    )}

                    {[...Array(totalPages)].map((_, i) => {
                      const p = i + 1;
                      if (p === 1 || p === totalPages || (p >= page - 1 && p <= page + 1)) {
                        return (
                          <button
                            key={p}
                            onClick={() => handlePageChange(p)}
                            className={`h-12 w-12 flex items-center justify-center rounded-xl font-bold transition-all shadow-sm ${
                              page === p 
                                ? 'bg-primary text-white shadow-primary/20' 
                                : 'bg-white border border-slate-100 text-slate-600 hover:bg-slate-50'
                            }`}
                          >
                            {p}
                          </button>
                        );
                      }
                      if (p === page - 2 || p === page + 2) {
                        return <span key={p} className="text-slate-300">...</span>;
                      }
                      return null;
                    })}

                    {page < totalPages && (
                      <button
                        onClick={() => handlePageChange(page + 1)}
                        className="h-12 w-12 flex items-center justify-center rounded-xl bg-white border border-slate-100 text-slate-600 hover:bg-primary hover:text-white hover:border-primary transition-all font-bold shadow-sm"
                      >
                        →
                      </button>
                    )}
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-32 bg-white rounded-[3rem] border border-slate-100 shadow-sm">
                <div className="h-24 w-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <HomeIcon className="h-12 w-12 text-slate-300" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-2">No properties found</h3>
                <p className="text-slate-500 font-medium max-w-xs mx-auto">
                  {allProperties.length === 0 
                    ? 'No sale properties available in Firebase. Please check your database.'
                    : 'We couldn\'t find any properties matching your current filters.'
                  }
                </p>
                <button
                  onClick={handleResetFilters}
                  className="mt-8 btn-outline !rounded-full !px-8 inline-block text-center"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      
    </div>
  );
}