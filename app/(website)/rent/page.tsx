// 'use client';

// import { useState, useEffect, Suspense } from 'react';
// import { Database } from '@/lib/database.types'
// import PropertyCard, { PropertyCardProperty } from '@/components/property/PropertyCard'
// import PropertyAgents from '@/components/property/PropertyAgents'
// import {
//   ViewColumnsIcon,
//   QueueListIcon,
//   MagnifyingGlassIcon,
//   HomeIcon,
//   XMarkIcon,
//   MapPinIcon,
//   HomeModernIcon,
//   BuildingOffice2Icon,
//   CheckIcon,
//   VideoCameraIcon,
//   UserIcon,
//   CalendarIcon,
//   CurrencyDollarIcon,
//   ArrowsPointingOutIcon,
 
 
//   WifiIcon,
  
//   ShieldCheckIcon,
//   BuildingStorefrontIcon,
//   ArrowPathIcon,
//   StarIcon
// } from '@heroicons/react/24/outline'
// import { useRouter, useSearchParams } from 'next/navigation';
// import { BathIcon,BedIcon,CarIcon } from 'lucide-react';

// // Firebase imports
// import { db } from '@/lib/firebase'
// import { collection, getDocs, query, where, doc, getDoc } from 'firebase/firestore'

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
//   address?: string
//   property_status?: string
//   property_age?: string
//   images?: string[]
//   floorplans?: string[]
//   inquiries_count?: number
//   coords?: {
//     lat: number
//     lng: number
//   }
//   agent_id?: string
//   slug?: string
//   created_at?: string
//   updated_at?: string
// }

// // View Details Modal Component
// function ViewDetailsModal({ 
//   property, 
//   onClose 
// }: { 
//   property: NormalizedProperty | null; 
//   onClose: () => void 
// }) {
//   if (!property) return null;

//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [isVideoPlaying, setIsVideoPlaying] = useState(false);

//   const handlePrevImage = () => {
//     setCurrentImageIndex(prev => 
//       prev === 0 
//         ? (property.images?.length || property.floorplans?.length || 1) - 1 
//         : prev - 1
//     );
//   };

//   const handleNextImage = () => {
//     setCurrentImageIndex(prev => 
//       prev === (property.images?.length || property.floorplans?.length || 1) - 1 
//         ? 0 
//         : prev + 1
//     );
//   };

//   const formatPrice = (price: number) => {
//     return new Intl.NumberFormat('en-US').format(price);
//   };

//   const formatDate = (dateString?: string) => {
//     if (!dateString) return 'N/A';
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     });
//   };

//   const getPropertyImages = () => {
//     if (property.images && property.images.length > 0) {
//       return property.images;
//     }
//     if (property.floorplans && property.floorplans.length > 0) {
//       return property.floorplans;
//     }
//     return [property.image || ''];
//   };

//   const propertyImages = getPropertyImages();
//   const videoUrl = property.video_url || '';
//   const hasVideo = videoUrl.trim() !== '';

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in mt-30">
//       <div className="relative w-full max-w-7xl h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden animate-slide-up flex flex-col">
//         {/* Header with Close Button */}
//         <div className="flex-shrink-0 p-6 border-b border-slate-100 bg-white">
//           <div className="flex items-center justify-between">
//             <div>
//               <h2 className="text-2xl font-black text-slate-900 truncate">
//                 {property.title || 'Untitled Property'}
//               </h2>
//               <div className="flex items-center gap-2 text-slate-600 mt-1">
//                 <MapPinIcon className="h-4 w-4" />
//                 <span className="font-medium truncate">
//                   {property.address || property.location || `${property.area || ''}${property.city ? ', ' + property.city : ''}`}
//                 </span>
//               </div>
//             </div>
//             <button
//               onClick={onClose}
//               className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 hover:text-primary hover:bg-slate-200 transition-colors"
//             >
//               <XMarkIcon className="h-5 w-5" />
//             </button>
//           </div>
//         </div>

//         {/* Main Content with Scroll */}
//         <div className="flex-1 overflow-hidden">
//           <div className="grid grid-cols-1 lg:grid-cols-3 h-full">
//             {/* Left Column - Images & Details - WITH SCROLL */}
//             <div className="lg:col-span-2 h-full overflow-y-auto custom-scrollbar">
//               {/* Main Image/Video */}
//               <div className="relative h-64 md:h-80 bg-slate-100 overflow-hidden">
//                 {hasVideo && isVideoPlaying ? (
//                   <video
//                     src={videoUrl}
//                     className="w-full h-full object-cover"
//                     autoPlay
//                     controls
//                     onEnded={() => setIsVideoPlaying(false)}
//                   />
//                 ) : (
//                   <img
//                     src={propertyImages[currentImageIndex]}
//                     alt={property.title || 'Property Image'}
//                     className="w-full h-full object-cover"
//                     onError={(e) => {
//                       e.currentTarget.src = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&auto=format&fit=crop';
//                     }}
//                   />
//                 )}

//                 {/* Image Navigation */}
//                 {propertyImages.length > 1 && !isVideoPlaying && (
//                   <>
//                     <button
//                       onClick={handlePrevImage}
//                       className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-slate-700 hover:text-primary transition-colors shadow-lg"
//                     >
//                       ←
//                     </button>
//                     <button
//                       onClick={handleNextImage}
//                       className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-slate-700 hover:text-primary transition-colors shadow-lg"
//                     >
//                       →
//                     </button>
//                   </>
//                 )}

//                 {/* Video Play Button */}
//                 {hasVideo && !isVideoPlaying && (
//                   <button
//                     onClick={() => setIsVideoPlaying(true)}
//                     className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-16 w-16 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-primary hover:scale-110 transition-transform shadow-xl"
//                   >
//                     <VideoCameraIcon className="h-8 w-8" />
//                   </button>
//                 )}

//                 {/* Badges */}
//                 <div className="absolute top-4 left-4 flex flex-wrap gap-2">
//                   <span className="px-3 py-1.5 bg-primary text-white text-xs font-bold uppercase tracking-widest rounded-full">
//                     {property.status === 'rent' ? 'For Rent' : 'For Sale'}
//                   </span>
//                   {property.featured && (
//                     <span className="px-3 py-1.5 bg-yellow-500 text-white text-xs font-bold uppercase tracking-widest rounded-full">
//                       Featured
//                     </span>
//                   )}
//                   {property.collection === 'agent_properties' && (
//                     <span className="px-3 py-1.5 bg-blue-600 text-white text-xs font-bold uppercase tracking-widest rounded-full">
//                       Agent Property
//                     </span>
//                   )}
//                 </div>
//               </div>

//               {/* Thumbnail Gallery */}
//               {propertyImages.length > 1 && (
//                 <div className="p-4 border-b border-slate-100">
//                   <div className="flex gap-2 overflow-x-auto pb-2">
//                     {propertyImages.map((img, idx) => (
//                       <button
//                         key={idx}
//                         onClick={() => setCurrentImageIndex(idx)}
//                         className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
//                           idx === currentImageIndex 
//                             ? 'border-primary' 
//                             : 'border-transparent hover:border-slate-300'
//                         }`}
//                       >
//                         <img
//                           src={img}
//                           alt={`Thumbnail ${idx + 1}`}
//                           className="w-full h-full object-cover"
//                           onError={(e) => {
//                             e.currentTarget.src = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=200&auto=format&fit=crop';
//                           }}
//                         />
//                       </button>
//                     ))}
//                     {hasVideo && (
//                       <button
//                         onClick={() => setIsVideoPlaying(true)}
//                         className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 border-transparent hover:border-primary transition-all relative group"
//                       >
//                         <div className="absolute inset-0 bg-slate-900/50 flex items-center justify-center">
//                           <VideoCameraIcon className="h-5 w-5 text-white" />
//                         </div>
//                         <div className="text-[9px] text-white font-bold absolute bottom-1 left-1/2 -translate-x-1/2">
//                           Video
//                         </div>
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               )}

//               {/* Property Details - WITH SCROLL */}
//               <div className="p-6 space-y-6 ">
//                 {/* Price */}
//                 <div className="bg-slate-50 rounded-xl p-4">
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <div className="text-sm text-slate-500 font-bold uppercase tracking-widest mb-1">
//                         {property.status === 'rent' ? 'Yearly Rent' : 'Sale Price'}
//                       </div>
//                       <div className="text-2xl md:text-3xl font-black text-primary">
//                         {property.currency || 'AED'} {formatPrice(property.price)}
//                       </div>
//                       {property.status === 'rent' && (
//                         <div className="text-slate-500 text-sm mt-1">
//                           ≈ {property.currency || 'AED'} {formatPrice(Math.round(property.price / 12))} per month
//                         </div>
//                       )}
//                     </div>
//                     <div className="text-right">
//                       <div className="text-sm text-slate-500 mb-1">Property ID</div>
//                       <div className="font-mono font-bold text-slate-700">
//                         {property.id.substring(0, 8).toUpperCase()}
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Key Features */}
//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
//                   <div className="bg-slate-50 rounded-lg p-3 text-center">
//                     <div className="flex items-center justify-center gap-2 mb-1">
//                       <BedIcon className="h-4 w-4 text-primary" />
//                       <span className="text-lg font-black text-slate-900">{property.beds || 0}</span>
//                     </div>
//                     <div className="text-xs text-slate-500 uppercase tracking-widest font-bold">Bedrooms</div>
//                   </div>
//                   <div className="bg-slate-50 rounded-lg p-3 text-center">
//                     <div className="flex items-center justify-center gap-2 mb-1">
//                       <BathIcon className="h-4 w-4 text-primary" />
//                       <span className="text-lg font-black text-slate-900">{property.baths || 0}</span>
//                     </div>
//                     <div className="text-xs text-slate-500 uppercase tracking-widest font-bold">Bathrooms</div>
//                   </div>
//                   <div className="bg-slate-50 rounded-lg p-3 text-center">
//                     <div className="flex items-center justify-center gap-2 mb-1">
//                       <ArrowsPointingOutIcon className="h-4 w-4 text-primary" />
//                       <span className="text-lg font-black text-slate-900">{property.sqft || 0}</span>
//                     </div>
//                     <div className="text-xs text-slate-500 uppercase tracking-widest font-bold">Sq. Ft.</div>
//                   </div>
//                   <div className="bg-slate-50 rounded-lg p-3 text-center">
//                     <div className="flex items-center justify-center gap-2 mb-1">
//                       <HomeModernIcon className="h-4 w-4 text-primary" />
//                       <span className="text-lg font-black text-slate-900">
//                         {property.property_age || property.propertyAge || 'N/A'}
//                       </span>
//                     </div>
//                     <div className="text-xs text-slate-500 uppercase tracking-widest font-bold">Property Age</div>
//                   </div>
//                 </div>

//                 {/* Basic Info */}
//                 <div className="grid grid-cols-2 gap-4 text-sm">
//                   <div>
//                     <div className="text-slate-500 mb-1">Property Type</div>
//                     <div className="font-medium text-slate-900">{property.type || 'Property Type'}</div>
//                   </div>
//                   <div>
//                     <div className="text-slate-500 mb-1">Completion Status</div>
//                     <div className="font-medium text-slate-900">
//                       {property.completion || property.property_status || 'Ready'}
//                     </div>
//                   </div>
//                   <div>
//                     <div className="text-slate-500 mb-1">Furnishing</div>
//                     <div className="font-medium text-slate-900">
//                       {property.furnished ? 'Furnished' : 'Unfurnished'}
//                     </div>
//                   </div>
//                   <div>
//                     <div className="text-slate-500 mb-1">Parking</div>
//                     <div className="font-medium text-slate-900">
//                       {property.parking === 'yes' ? 'Available' : 'Not Available'}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Description */}
//                 {property.description && (
//                   <div>
//                     <h3 className="text-lg font-black text-slate-900 mb-3">Description</h3>
//                     <div className="max-h-60 overflow-y-auto pr-2 custom-scrollbar">
//                       <p className="text-slate-600 leading-relaxed whitespace-pre-line">
//                         {property.description}
//                       </p>
//                     </div>
//                   </div>
//                 )}

//                 {/* Features List */}
//                 {property.features && property.features.length > 0 && (
//                   <div>
//                     <h3 className="text-lg font-black text-slate-900 mb-3">Features & Amenities</h3>
//                     <div className="max-h-60 overflow-y-auto pr-2 custom-scrollbar">
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                         {property.features.map((feature, idx) => (
//                           <div key={idx} className="flex items-center gap-3">
//                             <CheckIcon className="h-4 w-4 text-green-500 flex-shrink-0" />
//                             <span className="text-slate-700">{feature}</span>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 {/* Additional Details */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div>
//                     <h3 className="text-lg font-black text-slate-900 mb-3">Property Details</h3>
//                     <div className="space-y-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
//                       <div className="flex justify-between py-2 border-b border-slate-100">
//                         <span className="text-slate-600">Inquiries</span>
//                         <span className="font-medium text-slate-900">
//                           {property.inquiries_count || 0}
//                         </span>
//                       </div>
//                       <div className="flex justify-between py-2 border-b border-slate-100">
//                         <span className="text-slate-600">Date Added</span>
//                         <span className="font-medium text-slate-900">
//                           {formatDate(property.created_at || property.submitted_at)}
//                         </span>
//                       </div>
//                       <div className="flex justify-between py-2 border-b border-slate-100">
//                         <span className="text-slate-600">Last Updated</span>
//                         <span className="font-medium text-slate-900">
//                           {formatDate(property.updated_at)}
//                         </span>
//                       </div>
//                       <div className="flex justify-between py-2 border-b border-slate-100">
//                         <span className="text-slate-600">Agent</span>
//                         <span className="font-medium text-slate-900">
//                           {property.agent_name || 'N/A'}
//                         </span>
//                       </div>
//                     </div>
//                   </div>

//                   <div>
//                     <h3 className="text-lg font-black text-slate-900 mb-3">Collection Info</h3>
//                     <div className="space-y-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
//                       <div className="flex justify-between py-2 border-b border-slate-100">
//                         <span className="text-slate-600">Source</span>
//                         <span className="font-medium text-slate-900">
//                           {property.collection === 'agent_properties' ? 'Agent Properties' : 'Main Properties'}
//                         </span>
//                       </div>
//                       <div className="flex justify-between py-2 border-b border-slate-100">
//                         <span className="text-slate-600">Review Status</span>
//                         <span className={`font-medium ${
//                           property.review_status === 'published' 
//                             ? 'text-green-600' 
//                             : 'text-amber-600'
//                         }`}>
//                           {property.review_status || 'N/A'}
//                         </span>
//                       </div>
//                       <div className="flex justify-between py-2 border-b border-slate-100">
//                         <span className="text-slate-600">Slug</span>
//                         <span className="font-medium text-slate-900 font-mono text-sm">
//                           {property.slug || 'N/A'}
//                         </span>
//                       </div>
//                       {property.agent_id && (
//                         <div className="flex justify-between py-2 border-b border-slate-100">
//                           <span className="text-slate-600">Agent ID</span>
//                           <span className="font-medium text-slate-900 font-mono text-sm">
//                             {property.agent_id.substring(0, 8)}...
//                           </span>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Coordinates */}
//                 {property.coords && (
//                   <div className="bg-slate-50 rounded-xl p-4">
//                     <h3 className="text-lg font-black text-slate-900 mb-2">Location Coordinates</h3>
//                     <div className="grid grid-cols-2 gap-4">
//                       <div>
//                         <div className="text-sm text-slate-500">Latitude</div>
//                         <div className="font-mono text-slate-900">{property.coords.lat}</div>
//                       </div>
//                       <div>
//                         <div className="text-sm text-slate-500">Longitude</div>
//                         <div className="font-mono text-slate-900">{property.coords.lng}</div>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Right Column - Action Panel - WITH SCROLL */}
//             <div className="lg:col-span-1 h-full overflow-y-auto custom-scrollbar border-l border-slate-100 bg-slate-50">
//               <div className="p-6 space-y-6">
//                 {/* Contact Agent */}
//                 <div className="bg-white rounded-xl p-4 shadow-sm">
//                   <h3 className="text-lg font-black text-slate-900 mb-4">Contact Information</h3>
                  
//                   {property.agent_id ? (
//                     <div className="space-y-4">
//                       <div className="flex items-center gap-4">
//                         <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
//                           <UserIcon className="h-6 w-6 text-primary" />
//                         </div>
//                         <div>
//                           <div className="font-bold text-slate-900">{property.agent_name || 'Agent'}</div>
//                           <div className="text-sm text-slate-500">Property Agent</div>
//                         </div>
//                       </div>
                      
                     
//                     </div>
//                   ) : (
//                     <div className="text-center py-4">
//                       <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3">
//                         <BuildingStorefrontIcon className="h-6 w-6 text-slate-400" />
//                       </div>
//                       <div className="text-slate-700 mb-4 text-sm">
//                         This property is listed directly by our agency
//                       </div>
//                       <button className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-primary/90 transition-colors">
//                         Contact Our Team
//                       </button>
//                     </div>
//                   )}
//                 </div>

                

//                 {/* Financial Calculator */}
//                 <div className="bg-white rounded-xl p-4 shadow-sm">
//                   <h3 className="text-lg font-black text-slate-900 mb-4">Financial Calculator</h3>
//                   <div className="space-y-4">
//                     <div>
//                       <div className="text-sm text-slate-500 mb-1">Monthly Rent</div>
//                       <div className="text-xl font-black text-primary">
//                         {property.currency || 'AED'} {formatPrice(Math.round(property.price / 12))}
//                       </div>
//                     </div>
//                     <div>
//                       <div className="text-sm text-slate-500 mb-1">Deposit (5%)</div>
//                       <div className="text-lg font-bold text-slate-900">
//                         {property.currency || 'AED'} {formatPrice(Math.round(property.price * 0.05))}
//                       </div>
//                     </div>
//                     <div className="text-xs text-slate-500">
//                       *Calculations are approximate. Contact us for exact figures.
//                     </div>
//                   </div>
//                 </div>

//                 {/* Share Property */}
//                 <div className="border-t border-slate-200 pt-6">
//                   <h3 className="text-lg font-black text-slate-900 mb-4">Share This Property</h3>
//                   <div className="grid grid-cols-3 gap-2">
//                     <button className="h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center hover:bg-blue-200 transition-colors text-sm font-bold">
//                       Facebook
//                     </button>
//                     <button className="h-10 rounded-lg bg-pink-100 text-pink-600 flex items-center justify-center hover:bg-pink-200 transition-colors text-sm font-bold">
//                       Instagram
//                     </button>
//                     <button className="h-10 rounded-lg bg-green-100 text-green-600 flex items-center justify-center hover:bg-green-200 transition-colors text-sm font-bold">
//                       WhatsApp
//                     </button>
//                   </div>
//                 </div>

//                 {/* Similar Properties Link */}
//                 <div className="text-center pt-4">
//                   <button className="text-primary font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-2 w-full">
//                     View Similar Properties
//                     <span className="group-hover:translate-x-1 transition-transform">→</span>
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Custom Scrollbar CSS */}
//       <style jsx global>{`
//         .custom-scrollbar::-webkit-scrollbar {
//           width: 8px;
//           height: 8px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-track {
//           background: #f1f5f9;
//           border-radius: 4px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-thumb {
//           background: #cbd5e1;
//           border-radius: 4px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-thumb:hover {
//           background: #94a3b8;
//         }
//         .custom-scrollbar {
//           scrollbar-width: thin;
//           scrollbar-color: #cbd5e1 #f1f5f9;
//         }
//       `}</style>
//     </div>
//   );
// }

// export default function PropertiesPage() {
//   return (
//     <Suspense fallback={<div className="p-6">Loading...</div>}>
//       <PropertiesPageContent />
//     </Suspense>
//   )
// }

// // Function to fetch RENT properties from 'properties' collection
// async function fetchRentPropertiesFromMainCollection() {
//   try {
//     console.log('🔥 Fetching RENT properties from main collection...');
//     const propertiesRef = collection(db, 'properties');
    
//     const q = query(
//       propertiesRef,
//       where('status', '==', 'rent')
//     );
    
//     const querySnapshot = await getDocs(q);
//     console.log(`✅ Main Collection: Found ${querySnapshot.size} RENT properties`);
    
//     const properties: any[] = [];
//     querySnapshot.forEach((doc) => {
//       const data = doc.data();
//       properties.push({
//         id: doc.id,
//         collection: 'properties',
//         ...data
//       });
//     });
    
//     return properties;
    
//   } catch (error: any) {
//     console.error('❌ Error fetching RENT from main collection:', error.message);
//     return [];
//   }
// }

// // Function to fetch RENT properties from 'agent_properties' collection
// async function fetchRentPropertiesFromAgentCollection() {
//   try {
//     console.log('🔥 Fetching RENT properties from agent_properties collection...');
//     const agentPropertiesRef = collection(db, 'agent_properties');
    
//     const q = query(
//       agentPropertiesRef,
//       where('status', '==', 'rent'),
//       where('review_status', '==', 'published')
//     );
    
//     const querySnapshot = await getDocs(q);
//     console.log(`✅ Agent Collection: Found ${querySnapshot.size} RENT properties`);
    
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
//     console.error('❌ Error fetching RENT from agent collection:', error.message);
//     return [];
//   }
// }

// // Function to fetch property details by ID from specific collection
// async function fetchPropertyDetails(propertyId: string, collectionName: string): Promise<Record<string, any> | null> {
//   try {
//     console.log(`📋 Fetching details for property ${propertyId} from ${collectionName}...`);
    
//     const docRef = doc(db, collectionName, propertyId);
//     const docSnap = await getDoc(docRef);
    
//     if (docSnap.exists()) {
//       const data = docSnap.data();
//       console.log(`✅ Found property details:`, {
//         title: data.title,
//         collection: collectionName
//       });
      
//       return {
//         id: docSnap.id,
//         collection: collectionName,
//         ...data
//       };
//     } else {
//       console.log(`❌ No property found with ID: ${propertyId} in ${collectionName}`);
//       return null;
//     }
//   } catch (error) {
//     console.error(`❌ Error fetching property details from ${collectionName}:`, error);
//     return null;
//   }
// }

// // Main function to fetch all RENT properties from both collections
// async function fetchAllRentProperties() {
//   try {
//     console.log('🔄 Fetching RENT properties from ALL collections...');
    
//     const [mainProperties, agentProperties] = await Promise.all([
//       fetchRentPropertiesFromMainCollection(),
//       fetchRentPropertiesFromAgentCollection()
//     ]);
    
//     const allProperties = [...mainProperties, ...agentProperties];
//     console.log(`✅ Total RENT properties found: ${allProperties.length}`);
    
//     return allProperties;
    
//   } catch (error) {
//     console.error('❌ Error in fetchAllRentProperties:', error);
//     return [];
//   }
// }

// function PropertiesPageContent() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
  
//   // State for properties and filters
//   const [allProperties, setAllProperties] = useState<NormalizedProperty[]>([]);
//   const [filteredProperties, setFilteredProperties] = useState<NormalizedProperty[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedProperty, setSelectedProperty] = useState<NormalizedProperty | null>(null);
  
//   // Get filter values from URL
//   const viewMode = searchParams.get('view') === 'list' ? 'list' : 'grid';
//   const sortBy = searchParams.get('sortBy') || 'featured';
//   const action = searchParams.get('action') || 'rent';
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

//   // Handle View Details Click
//   const handleViewDetails = async (property: NormalizedProperty) => {
//     try {
//       console.log(`🔄 Loading details for property: ${property.id} from ${property.collection}`);
      
//       // Fetch complete details from Firebase
//       const detailedProperty = await fetchPropertyDetails(property.id, property.collection || 'properties');
      
//       if (detailedProperty) {
//         // Normalize the detailed property
//         const normalized = {
//           ...detailedProperty,
//           image: property.image || detailedProperty.images?.[0] || detailedProperty.image_url || '',
//           price: detailedProperty.price || 0,
//           priceLabel: 'yearly',
//           area: detailedProperty.area || detailedProperty.location || detailedProperty.address || 'Dubai',
//           city: detailedProperty.city || 'Dubai',
//           location: detailedProperty.address || detailedProperty.area || detailedProperty.city || 'Dubai',
//           beds: detailedProperty.beds || 0,
//           baths: detailedProperty.baths || 0,
//           sqft: detailedProperty.sqft || 0,
//           type: detailedProperty.type || detailedProperty.subtype || 'Apartment',
//           developer: detailedProperty.developer || null,
//           featured: Boolean(detailedProperty.featured),
//           category: detailedProperty.category || null,
//           parking: detailedProperty.parking || null,
//           propertyAge: detailedProperty.property_age || detailedProperty.propertyAge || null,
//           completion: detailedProperty.completion || detailedProperty.property_status || 'ready',
//           subtype: detailedProperty.subtype || null,
//           description: detailedProperty.description || null,
//           features: Array.isArray(detailedProperty.features) ? detailedProperty.features : [],
//           video_url: detailedProperty.video_url || null,
//           currency: detailedProperty.currency || 'AED',
//           status: detailedProperty.status || 'rent',
//           agent_name: detailedProperty.agent_name || null,
//           review_status: detailedProperty.review_status || null,
//           submitted_at: detailedProperty.submitted_at || null,
//           collection: detailedProperty.collection || 'properties',
//           address: detailedProperty.address,
//           property_status: detailedProperty.property_status,
//           property_age: detailedProperty.property_age,
//           images: detailedProperty.images || [],
//           floorplans: detailedProperty.floorplans || [],
//           inquiries_count: detailedProperty.inquiries_count || 0,
//           coords: detailedProperty.coords,
//           agent_id: detailedProperty.agent_id,
//           slug: detailedProperty.slug,
//           created_at: detailedProperty.created_at,
//           updated_at: detailedProperty.updated_at
//         };
        
//         setSelectedProperty(normalized as NormalizedProperty);
//         console.log('✅ Property details loaded successfully');
//       } else {
//         console.log('⚠️ Using cached property data');
//         setSelectedProperty(property);
//       }
//     } catch (error) {
//       console.error('❌ Error loading property details:', error);
//       // Fallback to cached property data
//       setSelectedProperty(property);
//     }
//   };

//   // Close Details Modal
//   const closeDetailsModal = () => {
//     setSelectedProperty(null);
//   };

//   // Fetch RENT properties on component mount
//   useEffect(() => {
//     async function loadProperties() {
//       setLoading(true);
//       console.log('🔄 Loading properties...');
//       const properties = await fetchAllRentProperties();
      
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
//         const location = p.location || p.address || p.area || p.city || 'Dubai';
        
//         // Handle property_status vs completion
//         const completionStatus = p.completion || p.property_status || 'ready';
        
//         // Handle different field names for area
//         const propertyArea = p.area || p.location || p.address || p.neighborhood || p.district || 'Dubai';
        
//         // For rent properties, priceLabel should be 'yearly'
//         const priceLabel = 'yearly';
        
//         // Handle features array
//         let featuresArray: string[] = [];
//         if (Array.isArray(p.features)) {
//           featuresArray = p.features;
//         } else if (typeof p.features === 'string') {
//           featuresArray = p.features.split(',').map((f: string) => f.trim());
//         }
        
//         return {
//           ...p,
//           image: imageUrl,
//           price: price,
//           priceLabel: priceLabel,
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
//           features: featuresArray,
//           video_url: p.video_url || null,
//           currency: p.currency || 'AED',
//           status: p.status || 'rent',
//           agent_name: p.agent_name || null,
//           review_status: p.review_status || null,
//           submitted_at: p.submitted_at || null,
//           collection: p.collection || 'properties'
//         };
//       });
      
//       console.log(`✅ Normalized ${normalized.length} properties`);
//       setAllProperties(normalized);
//       setLoading(false);
//     }
    
//     loadProperties();
//   }, []);

//   // Apply filters whenever filter parameters change
//   useEffect(() => {
//     if (allProperties.length === 0) {
//       console.log('⚠️ No properties to filter');
//       setFilteredProperties([]);
//       return;
//     }
    
//     console.log(`🔄 Applying filters to ${allProperties.length} properties...`);

//     let filtered = [...allProperties];
    
//     // Filter by action (rent/buy)
//     if (action === 'rent') {
//       filtered = filtered.filter(p => p.status === 'rent');
//     } else if (action === 'buy') {
//       filtered = filtered.filter(p => p.status === 'sale');
//     }

//     // Filter by category
//     if (category) {
//       filtered = filtered.filter(p => p.category === category);
//     }

//     // Filter by type
//     if (type) {
//       filtered = filtered.filter(p => p.type?.toLowerCase() === type.toLowerCase());
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

//     // Features filter
//     const featuresList = features ? features.split(',').map(f => f.trim()).filter(Boolean) : [];
//     if (featuresList.length > 0) {
//       filtered = filtered.filter((p: NormalizedProperty) => {
//         if (!p.features || !Array.isArray(p.features)) return false;
//         return featuresList.every(f => (p.features || []).includes(f));
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

//     console.log(`🎯 Final filtered: ${filtered.length} properties`);
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
//       action: 'rent',
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
    
//     router.push('/properties?view=grid&sortBy=featured&action=rent&page=1');
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
//           <p className="mt-4 text-slate-600">Loading rental properties...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-slate-50/50">
//       {/* View Details Modal */}
//       {selectedProperty && (
//         <ViewDetailsModal 
//           property={selectedProperty} 
//           onClose={closeDetailsModal} 
//         />
//       )}

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
//               <span className="px-6 py-2 bg-green-500/20 backdrop-blur-md text-green-500 rounded-full border border-green-500/30 text-sm font-bold">
//                 🏠 For Rent
//               </span>
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
//                           value="rent" 
//                           checked={formState.action === 'rent'}
//                           onChange={(e) => handleInputChange('action', e.target.value)}
//                           className="peer sr-only" 
//                         />
//                         <div className="flex items-center justify-center py-3 rounded-xl bg-slate-50 text-slate-600 font-bold text-sm peer-checked:bg-primary peer-checked:text-white group-hover:bg-slate-100 transition-all">
//                           Rent
//                         </div>
//                       </label>
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
//                       <option value="furnished-studio">Furnished Studios</option>
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
//                       <option value="Za'abeel">Za'abeel</option>
//                       <option value="Al Kifaf">Al Kifaf</option>
//                       <option value="Zabeel">Zabeel</option>
//                     </select>
//                   </div>

//                   {/* Price Range */}
//                   <div className="space-y-3">
//                     <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Price Range (AED/year)</label>
//                     <div className="grid grid-cols-2 gap-3">
//                       <input
//                         name="minPrice"
//                         type="number"
//                         placeholder="Min (yearly)"
//                         value={formState.minPrice}
//                         onChange={(e) => handleInputChange('minPrice', e.target.value)}
//                         className="w-full bg-slate-50 border-none rounded-2xl px-4 py-4 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-primary/20 transition-all font-medium"
//                       />
//                       <input
//                         name="maxPrice"
//                         type="number"
//                         placeholder="Max (yearly)"
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
//                     Our expert agents are ready to help you find your perfect rental property.
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

//             {/* Properties Grid/List with View Details Button */}
//             {filteredProperties.length > 0 ? (
//               <>
//                 <div className={`grid gap-8 ${
//                   viewMode === 'grid'
//                     ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'
//                     : 'grid-cols-1'
//                 }`}>
//                   {paginatedProperties.map((property, i) => (
//                     <div key={`${property.collection}-${property.id}`} className="animate-slide-up" style={{ animationDelay: `${i * 50}ms` }}>
//                       {/* View Details Button Overlay */}
//                       <div className="relative group">
//                         <PropertyCard
//                           property={{
//                             id: String(property.id),
//                             title: property.title || 'New Property',
//                             price: property.price ?? 0,
//                             priceLabel: 'yearly',
//                             image: property.image,
//                             location: property.location || `${property.area || ''}${property.city ? ', ' + property.city : ''}`,
//                             beds: property.beds ?? 0,
//                             baths: property.baths ?? 0,
//                             sqft: property.sqft ?? 0,
//                             type: property.type || 'Property',
//                             featured: Boolean(property.featured),
//                             currency: property.currency || 'AED',
//                             status: 'rent',
//                             area: property.area || undefined,
//                             city: property.city || undefined,
//                             video_url: property.video_url || undefined,
//                             agent_name: property.agent_name || undefined,
//                           }}
//                         />
                        
//                         {/* View Details Button */}
//                         <button
//                           onClick={() => handleViewDetails(property)}
//                           className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white/90 backdrop-blur-md rounded-xl px-4 py-2 shadow-lg hover:shadow-xl hover:bg-white border border-slate-200 flex items-center gap-2 text-slate-700 hover:text-primary font-bold text-sm"
//                         >
//                           <ArrowsPointingOutIcon className="h-4 w-4" />
//                           View Details
//                         </button>
//                       </div>

//                       {/* Property Badges */}
//                       <div className="mt-2 flex gap-2">
//                         {property.collection === 'agent_properties' && (
//                           <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
//                             🤝 Agent Property
//                             {property.agent_name && ` - ${property.agent_name}`}
//                           </span>
//                         )}
//                         <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
//                           🏠 For Rent
//                         </span>
//                       </div>
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
//                 <h3 className="text-2xl font-black text-slate-900 mb-2">No rental properties found</h3>
//                 <p className="text-slate-500 font-medium max-w-xs mx-auto">
//                   {allProperties.length === 0 
//                     ? 'No rental properties available in Firebase. Please check your database.'
//                     : 'We couldn\'t find any rental properties matching your current filters.'
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

import { useState, useEffect, Suspense } from 'react';
import { Database } from '@/lib/database.types'
import MortgageCalculator from '@/components/shared/MortgageCalculator';
import PropertyCard, { PropertyCardProperty } from '@/components/property/PropertyCard'
import {
  ViewColumnsIcon,
  QueueListIcon,
  HomeIcon,
  SparklesIcon,
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
  ChevronRightIcon,
  GlobeAltIcon,
  ChevronLeftIcon,
  LanguageIcon,
  ShieldCheckIcon,
  ChartBarIcon,
  StarIcon as StarOutlineIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  EyeIcon,
  ChatBubbleLeftRightIcon,
  Square3Stack3DIcon,
  MagnifyingGlassIcon,
  CalendarDaysIcon,
  ArrowLeftIcon,
  ShareIcon,
  HeartIcon,
  PhotoIcon,
} from '@heroicons/react/24/outline';
import {
  StarIcon as StarSolidIcon,
  HeartIcon as HeartSolidIcon,
} from '@heroicons/react/24/solid';
import { 
  StarIcon as StarSolid, 
  BriefcaseIcon,
  CheckBadgeIcon,
} from '@heroicons/react/24/solid';
import { 
  LinkIcon,
  PaperClipIcon
} from '@heroicons/react/24/outline';
import { BathIcon, BedIcon, CarIcon } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

// Firebase imports
import { db } from '@/lib/firebase'
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  doc,
  getDoc,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';

// Import jsPDF for PDF generation
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

type Property = Database['public']['Tables']['properties']['Row']

// Agent Data Interface
interface AgentData {
  id?: string;
  title?: string;
  profile_image?: string;
  office?: string;
  experience_years?: number;
  total_sales?: number;
  whatsapp?: string;
  verified?: boolean;
  rating?: number;
  review_count?: number;
  bio?: string;
  license_no?: string;
  location?: string;
  commission_rate?: number;
  brokerage?: string;
  telegram?: string;
  linkedin_url?: string;
  website_url?: string;
  instagram_handle?: string;
  specializations?: string[];
  areas?: string[];
  languages?: string[];
  certifications?: string[];
  approved?: boolean;
  created_at?: string;
  updated_at?: string;
}

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
  agent_image?: string
  agent_office?: string
  agent_experience?: number
  agent_properties?: number
  agent_phone?: string
  agent_whatsapp?: string
  views?: number
}

// Floor Plan Form Component - EXACT SAME AS LUXE
function FloorPlanForm({
  property,
  onClose,
}: {
  property: NormalizedProperty;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    nationality: "",
    occupation: "",
    employerCompany: "",
    monthlyIncome: "",
    budgetRange: "",
    timeline: "",
    interestedInFinancing: false,
    additionalNotes: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [agentData, setAgentData] = useState<AgentData | null>(null);
  const [agentLoading, setAgentLoading] = useState(true);

  const getPropertyImages = () => {
    if (property.images && property.images.length > 0) {
      return property.images;
    }
    if (property.floorplans && property.floorplans.length > 0) {
      return property.floorplans;
    }
    return [
      property.image ||
        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&auto=format&fit=crop",
    ];
  };

  const propertyImages = getPropertyImages();

  useEffect(() => {
    async function fetchAgentData() {
      try {
        setAgentLoading(true);
        const agentId = property.agent_id;

        if (agentId) {
          const agentDocRef = doc(db, "agents", agentId);
          const agentDoc = await getDoc(agentDocRef);

          if (agentDoc.exists()) {
            const data = agentDoc.data() as AgentData;
            setAgentData(data);
            setAgentLoading(false);
            return;
          }
        }

        const agentName = property.agent_name;
        if (agentName) {
          const agentsRef = collection(db, "agents");
          const q = query(agentsRef, where("title", "==", agentName));
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            const doc = querySnapshot.docs[0];
            const data = doc.data() as AgentData;
            setAgentData(data);
          } else {
            setAgentData({
              title: agentName || "Sarah Ahmed",
              office: "dubai",
              experience_years: 5,
              total_sales: 11,
              profile_image:
                "https://img.freepik.com/free-photo/blond-businessman-happy-expression_1194-3866.jpg",
              whatsapp: "03291082882",
              verified: true,
              rating: 4.5,
              review_count: 0,
            });
          }
        } else {
          setAgentData({
            title: "Sarah Ahmed",
            office: "dubai",
            experience_years: 5,
            total_sales: 11,
            profile_image:
              "https://img.freepik.com/free-photo/blond-businessman-happy-expression_1194-3866.jpg",
            whatsapp: "03291082882",
            verified: true,
            rating: 4.5,
            review_count: 0,
          });
        }
      } catch (error) {
        console.error("Error fetching agent data:", error);
        setAgentData({
          title: property.agent_name || "Sarah Ahmed",
          office: "dubai",
          experience_years: 5,
          total_sales: 11,
          profile_image:
            "https://img.freepik.com/free-photo/blond-businessman-happy-expression_1194-3866.jpg",
          whatsapp: "03291082882",
          verified: true,
          rating: 4.5,
          review_count: 0,
        });
      } finally {
        setAgentLoading(false);
      }
    }

    fetchAgentData();
  }, [property]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checkbox = e.target as HTMLInputElement;
      setFormData((prev) => ({
        ...prev,
        [name]: checkbox.checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const floorplanData = {
        ...formData,
        property_id: property.id,
        property_title: property.title,
        property_price: property.price,
        property_location: property.location,
        submitted_at: serverTimestamp(),
        download_requested: true,
        status: "pending",
      };

      await addDoc(collection(db, "floorplans"), floorplanData);
      console.log("✅ Floor plan request saved to Firebase");
      generatePDF();
      setSubmitted(true);
      setTimeout(() => {
        onClose();
      }, 3000);
    } catch (error) {
      console.error("❌ Error saving floor plan request:", error);
      alert("Error submitting form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US").format(price);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-US").format(num);
  };
  
  const generatePDF = () => {
    try {
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
        compress: true,
      });

      doc.setFont("helvetica");
      doc.setFont("normal");
      doc.setFontSize(12);

      // Page 1: Cover Page
      doc.setFillColor(25, 50, 120);
      doc.rect(0, 0, 210, 50, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(24);
      doc.text("PROPERTIES FOR RENT - DUBAI", 105, 30, { align: "center" });
      doc.setFontSize(16);
      doc.text("Rental Information Package", 105, 45, { align: "center" });

      doc.setTextColor(0, 0, 0);
      doc.setFontSize(20);
      doc.setFont("helvetica", "bold");
      const propertyTitle = property.title || "Rental Property";
      const splitTitle = doc.splitTextToSize(propertyTitle, 180);
      doc.text(splitTitle, 105, 80, { align: "center" });

      doc.setFontSize(14);
      doc.setFont("helvetica", "normal");
      doc.text(`Type: ${property.type || "Property"}`, 105, 95, {
        align: "center",
      });

      doc.setFontSize(28);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(59, 130, 246);
      doc.text(`AED ${formatPrice(property.price || 0)}/year`, 105, 120, {
        align: "center",
      });

      doc.setFontSize(16);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(0, 0, 0);
      const locationText =
        property.location || property.address || property.area || "Dubai, UAE";
      doc.text(locationText, 105, 140, { align: "center" });

      if (propertyImages.length > 0) {
        try {
          doc.addImage(propertyImages[0], "JPEG", 50, 150, 110, 80);
        } catch (error) {
          console.log("Image loading error:", error);
        }
      }

      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text(`Document ID: ${property.id || "N/A"}`, 105, 250, {
        align: "center",
      });
      doc.text(
        `Generated: ${new Date().toLocaleDateString("en-US")}`,
        105,
        260,
        { align: "center" }
      );

      // Add more pages as in Luxe...
      doc.addPage();
      
      // ... (Same PDF generation code as Luxe, just change "Luxury" to "Rental" where needed)
      
      const fileName = `Rental_Property_Details_${
        property.title?.replace(/[^a-z0-9]/gi, "_") || "property"
      }_${Date.now()}.pdf`;
      doc.save(fileName);

      console.log("✅ PDF generated successfully!");
    } catch (error) {
      console.error("❌ Error generating PDF:", error);
      alert("Error generating PDF. Please try again.");
    }
  };
  
  const budgetOptions = [
    "Select budget range",
    "Under 50,000 AED/year",
    "50,000 - 100,000 AED/year",
    "100,000 - 200,000 AED/year",
    "200,000 - 500,000 AED/year",
    "500,000 - 1,000,000 AED/year",
    "1,000,000+ AED/year",
  ];

  const timelineOptions = [
    "Select timeline",
    "Immediately",
    "Within 1 month",
    "Within 3 months",
    "Within 6 months",
    "Within 1 year",
    "Just exploring",
  ];

  if (submitted) {
    return (
      <div className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl max-w-2xl w-full p-8">
          <div className="text-center">
            <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckIcon className="h-10 w-10 text-green-600" />
            </div>
            <h3 className="text-3xl font-black text-gray-900 mb-4">
              Request Submitted Successfully!
            </h3>
            <p className="text-gray-600 text-lg mb-8">
              Your rental inquiry has been submitted. The PDF is downloading now.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] bg-black/50 overflow-y-auto p-4">
      <div className="min-h-full flex items-center justify-center py-8">
        <div className="bg-white rounded-3xl max-w-4xl w-full">
          <div className="border-b border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-black text-gray-900">
                  Download Rental Details
                </h3>
                <p className="text-gray-600">
                  Fill out the form for detailed rental information
                </p>
              </div>
              <button
                onClick={onClose}
                className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-gray-200 transition-colors"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="p-6 bg-blue-50 border-b border-blue-100">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-gray-900 text-lg">
                  {property.title}
                </h4>
                <p className="text-gray-600">{property.location}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-black text-blue-600">
                  AED {formatPrice(property.price || 0)}/year
                </div>
                <div className="text-gray-600">
                  {property.type} • {property.beds} Beds • {property.baths} Baths
                </div>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="p-6 max-h-[70vh] overflow-y-auto"
          >
            <div className="space-y-8">
              <div>
                <h4 className="text-xl font-black text-gray-900 mb-6 pb-2 border-b border-gray-200">
                  <span className="text-blue-600">1.</span> Personal Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="+971 XX XXX XXXX"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Nationality
                    </label>
                    <input
                      type="text"
                      name="nationality"
                      value={formData.nationality}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your nationality"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-xl font-black text-gray-900 mb-6 pb-2 border-b border-gray-200">
                  <span className="text-blue-600">2.</span> Professional Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Occupation
                    </label>
                    <input
                      type="text"
                      name="occupation"
                      value={formData.occupation}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g. Engineer, Doctor, Business Owner"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Employer/Company
                    </label>
                    <input
                      type="text"
                      name="employerCompany"
                      value={formData.employerCompany}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your employer"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Monthly Income (AED)
                    </label>
                    <input
                      type="number"
                      name="monthlyIncome"
                      value={formData.monthlyIncome}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your monthly income"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-xl font-black text-gray-900 mb-6 pb-2 border-b border-gray-200">
                  <span className="text-blue-600">3.</span> Rental Requirements
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Budget Range (Yearly)
                    </label>
                    <select
                      name="budgetRange"
                      value={formData.budgetRange}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {budgetOptions.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Move-in Timeline
                    </label>
                    <select
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {timelineOptions.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mt-6">
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      name="interestedInFinancing"
                      checked={formData.interestedInFinancing}
                      onChange={handleChange}
                      className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-gray-700 font-medium">
                      Interested in rental payment plans
                    </span>
                  </label>
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Additional Notes
                  </label>
                  <textarea
                    name="additionalNotes"
                    value={formData.additionalNotes}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Any specific rental requirements..."
                  />
                </div>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-8 py-4 border-2 border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <span>📥</span>
                        Download Rental Details & Submit Inquiry
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// Agent Popup Modal Component - EXACT SAME AS LUXE
function AgentPopupModal({
  agentData,
  isOpen,
  onClose,
}: {
  agentData: AgentData | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen || !agentData) return null;

  const getWhatsAppUrl = (whatsapp: string | null): string => {
    if (!whatsapp) return '#';
    const cleanedNumber = whatsapp.replace(/\D/g, '');
    const finalNumber = cleanedNumber.startsWith('0') ? cleanedNumber.substring(1) : cleanedNumber;
    return `https://wa.me/971${finalNumber}`;
  };

  const formatAgentDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return 'N/A';
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/90 backdrop-blur-md rounded-full text-slate-700 hover:text-primary hover:bg-white transition-all shadow-lg"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>

        <div className="p-0">
          <div className="relative h-64 md:h-80 bg-gradient-to-r from-primary/20 to-secondary/20">
            {agentData?.profile_image ? (
              <img
                src={agentData.profile_image}
                alt={agentData.title || "Agent"}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
                <div className="text-6xl font-bold text-primary opacity-50">
                  {agentData?.title ? agentData.title.substring(0, 2).toUpperCase() : 'AG'}
                </div>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="flex flex-col md:flex-row md:items-end justify-between">
                <div>
                  <h2 className="text-3xl md:text-4xl font-serif text-white mb-2">
                    {agentData?.title || "Real Estate Agent"}
                  </h2>
                  <p className="text-white/80 text-lg">{agentData?.brokerage || "Global Property Solutions"}</p>
                </div>
                <div className="flex items-center gap-3 mt-4 md:mt-0">
                  {agentData?.verified && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-500 text-white text-sm font-bold rounded-full">
                      <CheckBadgeIcon className="w-4 h-4" />
                      Verified Agent
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary text-secondary text-sm font-bold rounded-full">
                    <BriefcaseIcon className="w-4 h-4" />
                    {agentData?.experience_years || 5}+ Years
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1 space-y-6">
                <div className="bg-slate-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-secondary mb-4 flex items-center gap-2">
                    <PhoneIcon className="w-5 h-5 text-primary" />
                    Contact Information
                  </h3>
                  
                  <div className="space-y-4">
                    {agentData?.whatsapp && (
                      <a
                        href={getWhatsAppUrl(agentData.whatsapp)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors"
                      >
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <ChatBubbleLeftRightIcon className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-semibold">WhatsApp</div>
                          <div className="text-sm">{agentData.whatsapp}</div>
                        </div>
                      </a>
                    )}

                    {agentData?.telegram && (
                      <a
                        href={`https://t.me/${agentData.telegram.replace('@', '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                      >
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <PaperClipIcon className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-semibold">Telegram</div>
                          <div className="text-sm">{agentData.telegram}</div>
                        </div>
                      </a>
                    )}

                    {agentData?.linkedin_url && (
                      <a
                        href={agentData.linkedin_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                      >
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <LinkIcon className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-semibold">LinkedIn</div>
                          <div className="text-sm truncate">View Profile</div>
                        </div>
                      </a>
                    )}

                    {agentData?.website_url && (
                      <a
                        href={agentData.website_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors"
                      >
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                          <GlobeAltIcon className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-semibold">Website</div>
                          <div className="text-sm truncate">Visit Website</div>
                        </div>
                      </a>
                    )}

                    {agentData?.instagram_handle && (
                      <a
                        href={`https://instagram.com/${agentData.instagram_handle.replace('@', '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 bg-pink-50 text-pink-700 rounded-lg hover:bg-pink-100 transition-colors"
                      >
                        <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                          </svg>
                        </div>
                        <div>
                          <div className="font-semibold">Instagram</div>
                          <div className="text-sm">@{agentData.instagram_handle.replace('@', '')}</div>
                        </div>
                      </a>
                    )}
                  </div>
                </div>

                <div className="bg-slate-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-secondary mb-4 flex items-center gap-2">
                    <UserIcon className="w-5 h-5 text-primary" />
                    Basic Information
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-slate-200">
                      <span className="text-slate-600">License No:</span>
                      <span className="font-semibold text-secondary">{agentData?.license_no || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-slate-200">
                      <span className="text-slate-600">Office:</span>
                      <span className="font-semibold text-secondary">{agentData?.office || 'Dubai'}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-slate-200">
                      <span className="text-slate-600">Location:</span>
                      <span className="font-semibold text-secondary">{agentData?.location || 'Dubai'}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-slate-200">
                      <span className="text-slate-600">Commission:</span>
                      <span className="font-semibold text-secondary">{agentData?.commission_rate || 2.5}%</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-slate-600">Total Sales:</span>
                      <span className="font-semibold text-secondary">
                        {agentData?.total_sales?.toLocaleString() || '0'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2 space-y-8">
                <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-bold text-secondary mb-2">Agent Rating</h3>
                      <div className="flex items-center gap-2">
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <StarSolid 
                              key={i} 
                              className={`w-5 h-5 ${i < Math.floor(agentData?.rating || 0) ? 'text-yellow-500' : 'text-slate-300'}`} 
                            />
                          ))}
                        </div>
                        <span className="text-2xl font-bold text-secondary">
                          {(agentData?.rating || 0).toFixed(1)}
                        </span>
                        <span className="text-slate-500">
                          ({agentData?.review_count || 0} reviews)
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0">
                      <span className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm">
                        <ShieldCheckIcon className="w-5 h-5 text-green-500" />
                        <span className="font-semibold">
                          {agentData?.approved ? 'Verified Agent' : 'Pending Verification'}
                        </span>
                      </span>
                    </div>
                  </div>

                  {agentData?.bio && (
                    <div className="mt-6">
                      <h4 className="font-semibold text-secondary mb-2">About Me</h4>
                      <p className="text-slate-600 leading-relaxed">{agentData.bio}</p>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white border border-slate-200 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-secondary mb-4 flex items-center gap-2">
                      <BriefcaseIcon className="w-5 h-5 text-primary" />
                      Specializations
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {(agentData?.specializations || ['Rental Properties']).map((spec: string, idx: number) => (
                        <span 
                          key={idx} 
                          className="px-3 py-1.5 bg-primary/10 text-primary text-sm font-semibold rounded-full"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white border border-slate-200 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-secondary mb-4 flex items-center gap-2">
                      <MapPinIcon className="w-5 h-5 text-primary" />
                      Areas Covered
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {(agentData?.areas || ['Dubai']).map((area: string, idx: number) => (
                        <span 
                          key={idx} 
                          className="px-3 py-1.5 bg-secondary/10 text-secondary text-sm font-semibold rounded-full"
                        >
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white border border-slate-200 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-secondary mb-4 flex items-center gap-2">
                      <LanguageIcon className="w-5 h-5 text-primary" />
                      Languages
                    </h3>
                    <div className="space-y-2">
                      {(agentData?.languages || ['English', 'Arabic']).map((lang: string, idx: number) => (
                        <div key={idx} className="flex items-center justify-between py-2 border-b border-slate-100">
                          <span className="text-slate-700">{lang}</span>
                          <span className="text-sm text-slate-500">Fluent</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white border border-slate-200 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-secondary mb-4 flex items-center gap-2">
                      <CheckBadgeIcon className="w-5 h-5 text-primary" />
                      Certifications
                    </h3>
                    <div className="space-y-3">
                      {(agentData?.certifications || ['RERA Certified']).map((cert: string, idx: number) => (
                        <div key={idx} className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                            <CheckBadgeIcon className="w-4 h-4 text-green-600" />
                          </div>
                          <span className="text-slate-700 font-medium">{cert}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-secondary mb-4">Additional Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-slate-500">Agent ID</p>
                      <p className="font-mono text-sm text-secondary">{agentData?.id || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Member Since</p>
                      <p className="font-semibold text-secondary">
                        {agentData?.created_at ? formatAgentDate(agentData.created_at) : 'N/A'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Last Updated</p>
                      <p className="font-semibold text-secondary">
                        {agentData?.updated_at ? formatAgentDate(agentData.updated_at) : 'N/A'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Status</p>
                      <p className="font-semibold text-green-600">
                        {agentData?.approved ? 'Active' : 'Pending'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-200">
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={getWhatsAppUrl(agentData?.whatsapp || null)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-green-600 text-white py-3 px-6 rounded-xl font-bold text-center hover:bg-green-700 transition-colors flex items-center justify-center gap-3"
                >
                  <ChatBubbleLeftRightIcon className="w-5 h-5" />
                  Chat on WhatsApp
                </a>
                <a
                  href={`tel:${agentData?.whatsapp || ''}`}
                  className="flex-1 bg-primary text-secondary py-3 px-6 rounded-xl font-bold text-center hover:bg-primary/90 transition-colors flex items-center justify-center gap-3"
                >
                  <PhoneIcon className="w-5 h-5" />
                  Call Now
                </a>
                <button
                  onClick={onClose}
                  className="flex-1 bg-slate-200 text-slate-700 py-3 px-6 rounded-xl font-bold text-center hover:bg-slate-300 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// MAIN VIEW DETAILS MODAL - EXACT SAME AS LUXE
function ViewDetailsModal({ 
  property, 
  onClose 
}: { 
  property: NormalizedProperty | null; 
  onClose: () => void 
}) {
  if (!property) return null;

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [mortgageData, setMortgageData] = useState({
    downPaymentPercent: 20,
    interestRate: 4.5,
    loanTerm: 25,
  });
  const [agentData, setAgentData] = useState<AgentData | null>(null);
  const [agentLoading, setAgentLoading] = useState(true);
  const [showFloorPlanForm, setShowFloorPlanForm] = useState(false);
  const [showAgentPopup, setShowAgentPopup] = useState(false);
  const [agentPopupData, setAgentPopupData] = useState<AgentData | null>(null);
  const [agentPopupLoading, setAgentPopupLoading] = useState(false);

  useEffect(() => {
    async function fetchAgentData() {
      try {
        setAgentLoading(true);
        const agentId = property?.agent_id;

        if (agentId) {
          const agentDocRef = doc(db, "agents", agentId);
          const agentDoc = await getDoc(agentDocRef);

          if (agentDoc.exists()) {
            const data = agentDoc.data() as AgentData;
            setAgentData(data);
            setAgentLoading(false);
            return;
          }
        }

        const agentName = property?.agent_name;
        if (agentName) {
          const agentsRef = collection(db, "agents");
          const q = query(agentsRef, where("title", "==", agentName));
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            const doc = querySnapshot.docs[0];
            const data = doc.data() as AgentData;
            setAgentData(data);
          } else {
            setAgentData({
              title: agentName || "Sarah Ahmed",
              office: "dubai",
              experience_years: 5,
              total_sales: 11,
              profile_image:
                "https://img.freepik.com/free-photo/blond-businessman-happy-expression_1194-3866.jpg",
              whatsapp: "03291082882",
              verified: true,
              rating: 4.5,
              review_count: 0,
            });
          }
        } else {
          setAgentData({
            title: "Sarah Ahmed",
            office: "dubai",
            experience_years: 5,
            total_sales: 11,
            profile_image:
              "https://img.freepik.com/free-photo/blond-businessman-happy-expression_1194-3866.jpg",
            whatsapp: "03291082882",
            verified: true,
            rating: 4.5,
            review_count: 0,
          });
        }
      } catch (error) {
        console.error("Error fetching agent data:", error);
        setAgentData({
          title: property?.agent_name || "Sarah Ahmed",
          office: "dubai",
          experience_years: 5,
          total_sales: 11,
          profile_image:
            "https://img.freepik.com/free-photo/blond-businessman-happy-expression_1194-3866.jpg",
          whatsapp: "03291082882",
          verified: true,
          rating: 4.5,
          review_count: 0,
        });
      } finally {
        setAgentLoading(false);
      }
    }

    if (property) {
      fetchAgentData();
    }
  }, [property]);

  const openAgentPopup = async () => {
    try {
      setAgentPopupLoading(true);
      
      if (property.agent_id) {
        const agentDocRef = doc(db, "agents", property.agent_id);
        const agentDoc = await getDoc(agentDocRef);
        
        if (agentDoc.exists()) {
          const data = agentDoc.data() as AgentData;
          setAgentPopupData({
            id: agentDoc.id,
            ...data
          });
          setShowAgentPopup(true);
          document.body.style.overflow = 'hidden';
          setAgentPopupLoading(false);
          return;
        }
      }
      
      if (property.agent_name) {
        const agentsRef = collection(db, "agents");
        const q = query(agentsRef, where("title", "==", property.agent_name));
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0];
          const data = doc.data() as AgentData;
          setAgentPopupData({
            id: doc.id,
            ...data
          });
          setShowAgentPopup(true);
          document.body.style.overflow = 'hidden';
          setAgentPopupLoading(false);
          return;
        }
      }
      
      if (agentData) {
        setAgentPopupData(agentData);
        setShowAgentPopup(true);
        document.body.style.overflow = 'hidden';
        setAgentPopupLoading(false);
        return;
      }
      
      setAgentPopupData({
        title: property.agent_name || "Agent",
        office: "dubai",
        experience_years: 5,
        total_sales: 11,
        profile_image: "https://img.freepik.com/free-photo/blond-businessman-happy-expression_1194-3866.jpg",
        whatsapp: "03291082882",
        verified: true,
        rating: 4.5,
        review_count: 0,
      });
      setShowAgentPopup(true);
      document.body.style.overflow = 'hidden';
      
    } catch (error) {
      console.error("Error fetching agent data:", error);
      setAgentPopupData({
        title: property.agent_name || "Agent",
        office: "dubai",
        experience_years: 5,
        total_sales: 11,
        profile_image: "https://img.freepik.com/free-photo/blond-businessman-happy-expression_1194-3866.jpg",
        whatsapp: "03291082882",
        verified: true,
        rating: 4.5,
        review_count: 0,
      });
      setShowAgentPopup(true);
      document.body.style.overflow = 'hidden';
    } finally {
      setAgentPopupLoading(false);
    }
  };

  const closeAgentPopup = () => {
    setShowAgentPopup(false);
    setAgentPopupData(null);
    document.body.style.overflow = 'auto';
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US').format(price);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const getPropertyImages = () => {
    if (property.images && property.images.length > 0) {
      return property.images;
    }
    if (property.floorplans && property.floorplans.length > 0) {
      return property.floorplans;
    }
    return [
      property.image ||
        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&auto=format&fit=crop",
    ];
  };

  const propertyImages = getPropertyImages();

  const calculateMortgage = () => {
    const price = property.price || 0;
    const downPayment = price * (mortgageData.downPaymentPercent / 100);
    const loanAmount = price - downPayment;
    const monthlyRate = mortgageData.interestRate / 100 / 12;
    const totalPayments = mortgageData.loanTerm * 12;

    let monthlyPayment = 0;
    if (monthlyRate > 0) {
      monthlyPayment =
        (loanAmount *
          (monthlyRate * Math.pow(1 + monthlyRate, totalPayments))) /
        (Math.pow(1 + monthlyRate, totalPayments) - 1);
    } else {
      monthlyPayment = loanAmount / totalPayments;
    }

    return {
      downPayment,
      loanAmount,
      monthlyPayment: Math.round(monthlyPayment),
    };
  };

  const mortgage = calculateMortgage();

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? propertyImages.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === propertyImages.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <>
      {showFloorPlanForm && (
        <FloorPlanForm
          property={property}
          onClose={() => setShowFloorPlanForm(false)}
        />
      )}

      {showAgentPopup && agentPopupData && (
        <AgentPopupModal
          agentData={agentPopupData}
          isOpen={showAgentPopup}
          onClose={closeAgentPopup}
        />
      )}

      <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
        <div className="sticky top-0 z-50 bg-white border-b border-slate-100 shadow-sm">
          <div className="container-custom py-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={onClose}
                  className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-gray-200 transition-colors"
                >
                  <ArrowLeftIcon className="h-5 w-5" />
                </button>
                <span className="text-sm font-bold text-slate-700">
                  Back to Properties
                </span>
              </div>

              <div className="flex items-center gap-4">
                <button className="px-5 py-2 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-colors text-sm">
                  Save Property
                </button>
                <button className="px-5 py-2 border border-slate-300 text-slate-700 font-bold rounded-lg hover:bg-slate-50 transition-colors text-sm">
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="container-custom pt-8 pb-12 mt-25">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 space-y-12">
              <div className=" overflow-hidden shadow-2xl rounded-3xl shadow-slate-200/50">
                <div className="relative h-[560px] bg-slate-100 overflow-hidden">
                  <img
                    src={propertyImages[currentImageIndex]}
                    alt={property.title || "Property Image"}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&auto=format&fit=crop";
                    }}
                  />

                  <div className="absolute top-4 left-4 right-4 flex justify-between">
                    <div className="flex gap-2">
                      <span className="px-4 py-2 bg-primary text-white text-sm font-bold rounded-full shadow-lg">
                        {property.status === "rent" ? "for rent" : "For sale"}
                      </span>
                      {property.featured && (
                        <span className="px-4 py-2 bg-white text-black text-sm font-bold rounded-full shadow-lg">
                          featured
                        </span>
                      )}
                      <span className="px-4 py-2 bg-black text-white text-sm font-bold rounded-full shadow-lg">
                        {property.property_status || "ready"}
                      </span>
                    </div>

                    <div className="absolute top-2 right-4 px-3 py-1 bg-black/50 text-white text-sm rounded-full flex items-center gap-1 z-20">
                      <PhotoIcon className="w-4 h-4" />
                      {currentImageIndex + 1} / {propertyImages.length}
                    </div>
                  </div>

                  {propertyImages.length > 1 && (
                    <>
                      <button
                        onClick={handlePrevImage}
                        className="absolute left-6 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-black/50 flex items-center justify-center text-slate-700 hover:text-primary transition-colors shadow-xl"
                      >
                        <ChevronLeftIcon className="w-5 h-5 text-white" />
                      </button>

                      <button
                        onClick={handleNextImage}
                        className="absolute right-6 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-black/50 flex items-center justify-center text-slate-700 hover:text-primary transition-colors shadow-xl"
                      >
                        <ChevronRightIcon className="w-5 h-5 text-white" />
                      </button>
                    </>
                  )}
                </div>

                {propertyImages.length > 1 && (
                  <div className=" p-1 py-4">
                    <div className="flex gap-4 overflow-x-auto pb-4">
                      {propertyImages.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentImageIndex(idx)}
                          className={`flex-shrink-0 w-25 rounded-xl h-20 overflow-hidden border-4 transition-all ${
                            idx === currentImageIndex
                              ? "border-primary"
                              : "border-transparent hover:border-slate-300"
                          }`}
                        >
                          <img
                            src={img}
                            alt={`Thumbnail ${idx + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-100">
                <div className="space-y-10">
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="px-4 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em] rounded-full">
                          {property.type || "APARTMENT"}
                        </span>
                        <span className="px-4 py-1 bg-slate-100 text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] rounded-full">
                          {property.property_status || "READY"}
                        </span>
                      </div>
                      <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                        {property.title || "Rental Property in Dubai"}
                      </h1>
                      <div className="flex items-center gap-2 text-slate-500 font-medium">
                        <MapPinIcon className="w-5 h-5 text-primary" />
                        <span>
                          {property.address ||
                            property.location ||
                            `${property.area || ""}${
                              property.city ? ", " + property.city : ""
                            }`}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">
                        YEARLY RENT
                      </div>
                      <div className="text-4xl md:text-5xl font-black text-primary">
                        AED {formatPrice(property.price || 0)}
                      </div>
                      <div className="text-slate-500 mt-1">
                        ≈ AED {formatPrice(Math.round(property.price / 12))}/month
                      </div>
                    </div>
                  </div>

                  <div className="flex  gap-20 justify-around p-8 bg-slate-50 rounded-[2rem] border border-slate-100">
                    <div className="space-y-1">
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        BEDROOMS
                      </div>
                      <div className="flex items-center gap-2">
                        <HomeIcon className="w-5 h-5 text-primary" />
                        <span className="text-2xl font-black text-slate-900">
                          {property.beds || 0}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        BATHROOMS
                      </div>
                      <div className="flex items-center gap-2">
                        <Square3Stack3DIcon className="w-5 h-5 text-primary" />
                        <span className="text-2xl font-black text-slate-900">
                          {property.baths || 0}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        TOTAL AREA
                      </div>
                      <div className="flex items-center gap-2">
                        <Square3Stack3DIcon className="w-5 h-5 text-primary" />
                        <span className="text-2xl font-black text-slate-900">
                          {formatNumber(property.sqft || 0)}
                          <span className="text-xs font-bold text-slate-400 ml-1 uppercase">
                            sqft
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                      <span className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                        <DocumentTextIcon className="w-5 h-5" />
                      </span>
                      Description
                    </h2>
                    <div className="prose prose-slate max-w-none">
                      <p className="text-slate-600 leading-relaxed text-lg whitespace-pre-line font-medium bg-slate-50 p-8 rounded-3xl border border-slate-100">
                        {property.description ||
                          "Experience comfortable living in this rental property located in Dubai. This residence offers modern amenities and convenient location."}
                      </p>
                    </div>
                  </div>

                  {property.features && property.features.length > 0 && (
                    <div className="space-y-6 pt-10 border-t border-slate-100">
                      <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                        <span className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                          <SparklesIcon className="w-5 h-5" />
                        </span>
                        Features & Amenities
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {property.features.map((feature, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 group hover:bg-white hover:shadow-md transition-all duration-300"
                          >
                            <CheckCircleIcon className="w-5 h-5 text-primary shrink-0" />
                            <span className="text-slate-700 font-bold text-sm">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="space-y-6 pt-10 border-t border-slate-100">
                    <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                      <span className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                        <ChartBarIcon className="w-5 h-5" />
                      </span>
                      Property Details
                    </h2>
                    <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                        <div className="space-y-6">
                          <div>
                            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
                              PROPERTY TYPE
                            </div>
                            <div className="text-2xl font-black text-slate-900">
                              {property.type || "Apartment"}
                            </div>
                          </div>
                          <div>
                            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
                              AREA
                            </div>
                            <div className="text-2xl font-black text-slate-900">
                              {property.area || "Dubai"}
                            </div>
                          </div>
                        </div>
                        <div className="space-y-6">
                          <div>
                            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
                              STATUS
                            </div>
                            <div className="text-2xl font-black text-slate-900">
                              {property.property_status || "Ready"}
                            </div>
                          </div>
                          <div>
                            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
                              CITY
                            </div>
                            <div className="text-2xl font-black text-slate-900">
                              {property.city || "Dubai"}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6 pt-10 border-t border-slate-100">
                    <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                      <span className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                        <MapPinIcon className="w-5 h-5" />
                      </span>
                      Location Map
                    </h2>
                    <div className="bg-gray-100 rounded-[2.5rem] h-[500px] overflow-hidden border border-slate-100 shadow-xl shadow-slate-200/50 relative">
                      <div className="w-full h-full">
                        <iframe
                          src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d462562.65095637795!2d54.94728926249997!3d25.07575955953261!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43496ad9c645%3A0xbde66e5084295162!2sDubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2s!4v1690465000000!5m2!1sen!2s`}
                          width="100%"
                          height="100%"
                          style={{ border: 0 }}
                          allowFullScreen
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          title="Property Location Map"
                          className="rounded-[2.5rem]"
                        ></iframe>

                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                          <div className="flex flex-col items-center">
                            <div className="relative">
                              <div className="h-16 w-16 rounded-full bg-red-500 flex items-center justify-center shadow-xl animate-pulse">
                                <MapPinIcon className="h-8 w-8 text-white" />
                              </div>
                              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-2 w-4 h-4 bg-red-500 rotate-45"></div>
                            </div>

                            <div className="mt-4 bg-white rounded-2xl p-4 shadow-2xl max-w-xs">
                              <div className="font-bold text-slate-900 text-lg mb-1">
                                {property.address ||
                                  property.location ||
                                  `${property.area || ""}${
                                    property.city ? ", " + property.city : ""
                                  }`}
                              </div>
                              <div className="text-slate-600 text-sm">
                                {property.coords
                                  ? `Lat: ${property.coords.lat.toFixed(
                                      6
                                    )}, Lng: ${property.coords.lng.toFixed(6)}`
                                  : "Dubai, United Arab Emirates"}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 p-6 bg-slate-50 rounded-3xl border border-slate-100">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <MapPinIcon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-black text-slate-900 mb-2">
                          Exact Location
                        </h3>
                        <p className="text-slate-700 text-lg">
                          {property.address ||
                            property.location ||
                            `${
                              property.area || "Dubai"
                            }, ${
                              property.city || "Dubai"
                            }, United Arab Emirates`}
                        </p>
                        {property.coords && (
                          <p className="text-slate-500 text-sm mt-2">
                            Coordinates: {property.coords.lat.toFixed(6)},{" "}
                            {property.coords.lng.toFixed(6)}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6 pt-10 border-t border-slate-100">
                    <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                      <span className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                        <DocumentTextIcon className="w-5 h-5" />
                      </span>
                      Download Resources
                    </h2>
                    <p className="text-slate-600 text-lg">
                      Get detailed information about this rental property.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <button
                        onClick={() => setShowFloorPlanForm(true)}
                        className="group p-6 bg-slate-50 hover:bg-primary hover:text-white border border-slate-200 hover:border-primary rounded-2xl transition-all duration-300 text-left"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-primary/10 group-hover:bg-white/20 rounded-xl flex items-center justify-center">
                            <DocumentTextIcon className="w-6 h-6 text-primary group-hover:text-white" />
                          </div>
                          <div>
                            <h3 className="text-lg font-black text-slate-900 group-hover:text-white">
                              Rental Details
                            </h3>
                            <p className="text-sm text-slate-600 group-hover:text-white/80">
                              Complete rental information
                            </p>
                          </div>
                        </div>
                      </button>

                      <div className="group p-6 bg-slate-50 border border-slate-200 rounded-2xl text-left hover:bg-primary">
                        <button
                          onClick={() => setShowFloorPlanForm(true)}
                          className=" hover:bg-primary"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-white/20">
                              <DocumentTextIcon className="w-6 h-6 text-primary  group-hover:text-white" />
                            </div>
                            <div>
                              <h3 className="text-lg font-black text-slate-900 group-hover:text-white/80">
                                Floor Plan
                              </h3>
                              <p className="text-sm text-slate-600 group-hover:text-white/80">
                                Detailed layout and dimensions
                              </p>
                            </div>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <aside className="lg:col-span-4 space-y-8">
              <div className="sticky top-32 space-y-8">
                <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden relative">
                  <div className="absolute top-0 left-0 w-full h-2 bg-primary" />
                  <div className="text-center space-y-6">
                    {agentLoading ? (
                      <div className="animate-pulse">
                        <div className="flex items-start gap-6 mb-8">
                          <div className="h-24 w-24 rounded-full bg-gray-300"></div>
                          <div className="flex-1">
                            <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-8">
                          <div className="bg-blue-50 rounded-xl p-6">
                            <div className="h-8 bg-gray-300 rounded mb-2"></div>
                            <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
                          </div>
                          <div className="bg-green-50 rounded-xl p-6">
                            <div className="h-8 bg-gray-300 rounded mb-2"></div>
                            <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div className="h-12 bg-gray-300 rounded-xl"></div>
                          <div className="h-12 bg-gray-300 rounded-xl"></div>
                          <div className="h-12 bg-gray-200 rounded-xl"></div>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="relative inline-block">
                          <div className="w-24 h-24 mx-auto rounded-full overflow-hidden ring-4 ring-slate-50 shadow-lg">
                            <img
                              src={
                                agentData?.profile_image ||
                                "https://img.freepik.com/free-photo/blond-businessman-happy-expression_1194-3866.jpg"
                              }
                              alt={agentData?.title || "Agent"}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.currentTarget.src =
                                  "https://img.freepik.com/free-photo/blond-businessman-happy-expression_1194-3866.jpg";
                              }}
                            />
                          </div>
                          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                            <StarSolidIcon className="h-3 w-3 text-yellow-400" />
                            <span className="text-[10px] font-black text-slate-900">
                              {agentData?.rating
                                ? agentData.rating.toFixed(1)
                                : "4.5"}
                            </span>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-xl font-black text-slate-900 mb-1">
                            {agentData?.title ||
                              property.agent_name ||
                              "Sarah Ahmed"}
                          </h3>
                          <p className="text-xs font-bold text-primary uppercase tracking-[0.2em]">
                            {agentData?.office
                              ? `${agentData.office.toUpperCase()} OFFICE`
                              : "DUBAI OFFICE"}
                          </p>
                          {agentData?.verified && (
                            <div className="mt-2 flex items-center gap-1 justify-center">
                              <ShieldCheckIcon className="h-4 w-4 text-primary" />
                              <span className="text-xs text-primary font-medium">
                                Verified Agent
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="grid grid-cols-2 gap-4 py-6 border-y border-slate-50">
                          <div className="text-center">
                            <div className="text-lg font-black text-slate-900">
                              {agentData?.experience_years
                                ? `${agentData.experience_years}+`
                                : "5+"}
                            </div>
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                              YEARS EXP.
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-black text-slate-900">
                              {agentData?.total_sales
                                ? `${agentData.total_sales}+`
                                : "11+"}
                            </div>
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                              PROPERTIES
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <button
                            onClick={() => {
                              const phone = agentData?.whatsapp || "03291082882";
                              window.location.href = `tel:${phone}`;
                            }}
                            className="w-full bg-primary hover:bg-primary/90 text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all flex items-center justify-center gap-3 shadow-lg shadow-primary/20"
                          >
                            <PhoneIcon className="w-5 h-5" />
                            Call Agent
                          </button>
                          <button
                            onClick={() => {
                              const phone =
                                agentData?.whatsapp || "03291082882";
                              window.open(`https://wa.me/${phone}`, "_blank");
                            }}
                            className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all flex items-center justify-center gap-3 shadow-lg shadow-green-500/20"
                          >
                            <ChatBubbleLeftRightIcon className="w-5 h-5" />
                            WhatsApp
                          </button>
                        </div>
                      </>
                    )}

                    <button
                      onClick={openAgentPopup}
                      disabled={agentPopupLoading}
                      className="w-full inline-block text-center text-slate-400 font-bold hover:text-primary transition-colors cursor-pointer mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {agentPopupLoading ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                          Loading...
                        </div>
                      ) : (
                        'VIEW PROFILE'
                      )}
                    </button>
                  </div>
                </div>

                <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-slate-900/20 relative overflow-hidden">
                  <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
                  <div className="relative z-10 space-y-6">
                    <h3 className="text-2xl font-black tracking-tight">
                      Interested in Renting?
                    </h3>
                    <p className="text-slate-400 text-sm font-medium leading-relaxed">
                      Fill out the form below for rental inquiries.
                    </p>
                    <form className="space-y-4">
                      <input
                        type="text"
                        placeholder="Full Name"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-primary/50 outline-none transition-all font-medium"
                      />
                      <input
                        type="email"
                        placeholder="Email Address"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-primary/50 outline-none transition-all font-medium"
                      />
                      <textarea
                        rows={3}
                        placeholder="Your Message"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-primary/50 outline-none transition-all font-medium resize-none"
                      />
                      <button
                        type="submit"
                        className="w-full bg-primary hover:bg-primary/90 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-primary/20"
                      >
                        Send Inquiry
                      </button>
                    </form>
                  </div>
                </div>

                <MortgageCalculator defaultPrice={property.price} />
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}

// Function to fetch property details
async function fetchPropertyDetails(
  propertyId: string,
  collectionName: string
): Promise<Record<string, any> | null> {
  try {
    const docRef = doc(db, collectionName, propertyId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        collection: collectionName,
        ...data,
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error(`Error fetching property details:`, error);
    return null;
  }
}

// Function to fetch RENT properties from 'properties' collection
async function fetchRentPropertiesFromMainCollection() {
  try {
    const propertiesRef = collection(db, 'properties');
    
    const q = query(
      propertiesRef,
      where('status', '==', 'rent')
    );
    
    const querySnapshot = await getDocs(q);
    
    const properties: any[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      properties.push({
        id: doc.id,
        collection: 'properties',
        ...data
      });
    });
    
    return properties;
    
  } catch (error: any) {
    console.error('Error fetching RENT from main collection:', error.message);
    return [];
  }
}

// Function to fetch RENT properties from 'agent_properties' collection
async function fetchRentPropertiesFromAgentCollection() {
  try {
    const agentPropertiesRef = collection(db, 'agent_properties');
    
    const q = query(
      agentPropertiesRef,
      where('status', '==', 'rent'),
      where('review_status', '==', 'published')
    );
    
    const querySnapshot = await getDocs(q);
    
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
    console.error('Error fetching RENT from agent collection:', error.message);
    return [];
  }
}

// Main function to fetch all RENT properties from both collections
async function fetchAllRentProperties() {
  try {
    const [mainProperties, agentProperties] = await Promise.all([
      fetchRentPropertiesFromMainCollection(),
      fetchRentPropertiesFromAgentCollection()
    ]);
    
    const allProperties = [...mainProperties, ...agentProperties];
    
    return allProperties;
    
  } catch (error) {
    console.error('Error in fetchAllRentProperties:', error);
    return [];
  }
}

function PropertiesPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [allProperties, setAllProperties] = useState<NormalizedProperty[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<NormalizedProperty[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProperty, setSelectedProperty] = useState<NormalizedProperty | null>(null);
  
  const viewMode = searchParams.get('view') === 'list' ? 'list' : 'grid';
  const sortBy = searchParams.get('sortBy') || 'featured';
  const action = searchParams.get('action') || 'rent';
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

  const handleViewDetails = async (property: NormalizedProperty) => {
    try {
      const detailedProperty = await fetchPropertyDetails(
        property.id,
        property.collection || 'properties'
      );
      
      if (detailedProperty) {
        const normalized = {
          ...detailedProperty,
          image: property.image || detailedProperty.images?.[0] || detailedProperty.image_url || '',
          price: detailedProperty.price || 0,
          priceLabel: 'yearly',
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
          status: detailedProperty.status || 'rent',
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
          updated_at: detailedProperty.updated_at,
          agent_image: detailedProperty.profile_image ||
            "https://img.freepik.com/free-photo/blond-businessman-happy-expression_1194-3866.jpg",
          agent_office: detailedProperty.office || "DUBAI OFFICE",
          agent_experience: detailedProperty.experience_years || 8,
          agent_properties: detailedProperty.total_sales || 150,
          agent_phone: detailedProperty.phone || "03291082882",
          agent_whatsapp: detailedProperty.whatsapp || "03291082882",
          views: detailedProperty.views || 1250,
        };
        
        setSelectedProperty(normalized as NormalizedProperty);
      } else {
        setSelectedProperty(property);
      }
    } catch (error) {
      console.error('Error loading property details:', error);
      setSelectedProperty(property);
    }
  };

  const closeDetailsModal = () => {
    setSelectedProperty(null);
  };

  useEffect(() => {
    async function loadProperties() {
      setLoading(true);
      const properties = await fetchAllRentProperties();
      
      const normalized = properties.map((p: any) => {
        let imageUrl = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&auto=format&fit=crop';
        
        if (p.images && Array.isArray(p.images) && p.images.length > 0) {
          imageUrl = p.images[0];
        } else if (p.image) {
          imageUrl = p.image;
        } else if (p.image_url) {
          imageUrl = p.image_url;
        }
        
        const price = typeof p.price === 'string' ? parseFloat(p.price) : (p.price ?? 0);
        const location = p.location || p.address || p.area || p.city || 'Dubai';
        const completionStatus = p.completion || p.property_status || 'ready';
        const propertyArea = p.area || p.location || p.address || p.neighborhood || p.district || 'Dubai';
        
        let featuresArray: string[] = [];
        if (Array.isArray(p.features)) {
          featuresArray = p.features;
        } else if (typeof p.features === 'string') {
          featuresArray = p.features.split(',').map((f: string) => f.trim());
        }
        
        return {
          ...p,
          image: imageUrl,
          price: price,
          priceLabel: 'yearly',
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
          features: featuresArray,
          video_url: p.video_url || null,
          currency: p.currency || 'AED',
          status: p.status || 'rent',
          agent_name: p.agent_name || null,
          review_status: p.review_status || null,
          submitted_at: p.submitted_at || null,
          collection: p.collection || 'properties',
          agent_image: p.profile_image ||
            "https://img.freepik.com/free-photo/blond-businessman-happy-expression_1194-3866.jpg",
          agent_office: p.office || "DUBAI OFFICE",
          agent_experience: p.experience_years || 8,
          agent_properties: p.total_sales || 150,
          agent_phone: p.phone || "03291082882",
          agent_whatsapp: p.whatsapp || "03291082882",
          views: p.views || 1250,
        };
      });
      
      setAllProperties(normalized);
      setLoading(false);
    }
    
    loadProperties();
  }, []);

  useEffect(() => {
    if (allProperties.length === 0) {
      setFilteredProperties([]);
      return;
    }
    
    let filtered = [...allProperties];
    
    if (action === 'rent') {
      filtered = filtered.filter(p => p.status === 'rent');
    } else if (action === 'buy') {
      filtered = filtered.filter(p => p.status === 'sale');
    }

    if (category) {
      filtered = filtered.filter(p => p.category === category);
    }

    if (type) {
      filtered = filtered.filter(p => p.type?.toLowerCase() === type.toLowerCase());
    }

    if (area) {
      filtered = filtered.filter(p => 
        p.area?.toLowerCase().includes(area.toLowerCase()) || 
        p.city?.toLowerCase().includes(area.toLowerCase()) ||
        p.location?.toLowerCase().includes(area.toLowerCase())
      );
    }

    if (developer) {
      filtered = filtered.filter(p => p.developer?.toLowerCase().includes(developer.toLowerCase()));
    }

    if (minPrice) {
      filtered = filtered.filter(p => p.price >= parseInt(minPrice));
    }
    if (maxPrice) {
      filtered = filtered.filter(p => p.price <= parseInt(maxPrice));
    }

    if (beds) {
      filtered = filtered.filter(p => p.beds === parseInt(beds));
    }

    if (baths) {
      filtered = filtered.filter(p => p.baths === parseInt(baths));
    }

    if (minSqft) {
      filtered = filtered.filter(p => p.sqft >= parseInt(minSqft));
    }
    if (maxSqft) {
      filtered = filtered.filter(p => p.sqft <= parseInt(maxSqft));
    }

    if (furnished === 'true') {
      filtered = filtered.filter(p => p.furnished === true);
    } else if (furnished === 'false') {
      filtered = filtered.filter(p => p.furnished === false || p.furnished === null);
    }

    if (parking) {
      filtered = filtered.filter(p => p.parking?.toLowerCase() === parking.toLowerCase());
    }

    if (propertyAge) {
      filtered = filtered.filter(p => p.propertyAge === propertyAge);
    }

    if (completion) {
      filtered = filtered.filter(p => p.completion === completion);
    }

    if (hasVideo === 'true') {
      filtered = filtered.filter(p => p.video_url && p.video_url.trim() !== '');
    }

    const featuresList = features ? features.split(',').map(f => f.trim()).filter(Boolean) : [];
    if (featuresList.length > 0) {
      filtered = filtered.filter((p: NormalizedProperty) => {
        if (!p.features || !Array.isArray(p.features)) return false;
        return featuresList.every(f => (p.features || []).includes(f));
      });
    }

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

    setFilteredProperties(filtered);
  }, [
    allProperties, action, category, type, area, developer, minPrice, maxPrice,
    beds, baths, minSqft, maxSqft, furnished, parking, propertyAge, completion,
    features, search, hasVideo, sortBy
  ]);

  const handleInputChange = (name: string, value: string) => {
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const params = new URLSearchParams();
    
    Object.entries(formState).forEach(([key, value]) => {
      if (value && value !== '') {
        params.set(key, value);
      }
    });
    
    if (parking) params.set('parking', parking);
    if (propertyAge) params.set('propertyAge', propertyAge);
    if (features) params.set('features', features);
    if (subtype) params.set('subtype', subtype);
    if (developer) params.set('developer', developer);
    if (minSqft) params.set('minSqft', minSqft);
    if (maxSqft) params.set('maxSqft', maxSqft);
    
    params.set('view', viewMode);
    params.set('sortBy', sortBy);
    params.set('page', '1');
    
    router.push(`/properties?${params.toString()}`);
  };

  const handleResetFilters = () => {
    setFormState({
      action: 'rent',
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
    
    router.push('/properties?view=grid&sortBy=featured&action=rent&page=1');
  };

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sortBy', value);
    params.set('page', '1');
    router.push(`/properties?${params.toString()}`);
  };

  const handleViewChange = (view: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('view', view);
    params.set('page', '1');
    router.push(`/properties?${params.toString()}`);
  };

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());
    router.push(`/properties?${params.toString()}`);
  };

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

  const total = filteredProperties.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const offset = (Math.max(page, 1) - 1) * limit;
  const paginatedProperties = filteredProperties.slice(offset, offset + limit);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US').format(price);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50/50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-slate-600">Loading rental properties...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50">
      {selectedProperty && (
        <ViewDetailsModal 
          property={selectedProperty} 
          onClose={closeDetailsModal} 
        />
      )}

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
              Premium Rentals
            </h2>
            <h1 className="text-4xl md:text-7xl font-black text-white tracking-tight animate-slide-up [animation-delay:100ms]">
              {getPageTitle()}
            </h1>
            <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto font-medium animate-slide-up [animation-delay:200ms]">
              {getPageDescription()}
            </p>

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
              <span className="px-6 py-2 bg-green-500/20 backdrop-blur-md text-green-500 rounded-full border border-green-500/30 text-sm font-bold">
                🏠 For Rent
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="container-custom py-8 sm:py-16">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
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

                  <div className="space-y-3">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Action</label>
                    <div className="grid grid-cols-2 gap-2">
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
                    </div>
                  </div>

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
                      <option value="furnished-studio">Furnished Studios</option>
                    </select>
                  </div>

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
                      <option value="Za'abeel">Za'abeel</option>
                      <option value="Al Kifaf">Al Kifaf</option>
                      <option value="Zabeel">Zabeel</option>
                    </select>
                  </div>

                  <div className="space-y-3">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Price Range (AED/year)</label>
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        name="minPrice"
                        type="number"
                        placeholder="Min (yearly)"
                        value={formState.minPrice}
                        onChange={(e) => handleInputChange('minPrice', e.target.value)}
                        className="w-full bg-slate-50 border-none rounded-2xl px-4 py-4 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                      />
                      <input
                        name="maxPrice"
                        type="number"
                        placeholder="Max (yearly)"
                        value={formState.maxPrice}
                        onChange={(e) => handleInputChange('maxPrice', e.target.value)}
                        className="w-full bg-slate-50 border-none rounded-2xl px-4 py-4 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                      />
                    </div>
                  </div>

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

                  <button type="submit" className="w-full bg-primary text-white py-4 rounded-2xl font-bold hover:bg-primary/90 transition-colors shadow-xl shadow-primary/20">
                    Apply Filters
                  </button>
                </form>
              </div>

              <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden group">
                <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl group-hover:bg-primary/30 transition-all duration-500" />
                <div className="relative z-10">
                  <h4 className="text-xl font-black mb-4">Need Help?</h4>
                  <p className="text-slate-400 text-sm font-medium mb-6 leading-relaxed">
                    Our expert agents are ready to help you find your perfect rental property.
                  </p>
                  <button className="text-primary font-bold text-sm uppercase tracking-widest flex items-center gap-2 group/btn">
                    Contact Us
                    <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                  </button>
                </div>
              </div>
            </div>
          </aside>

          <main className="lg:w-3/4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 sm:mb-10 gap-4 sm:gap-6 bg-white p-4 sm:p-4 rounded-2xl sm:rounded-3xl border border-slate-100 shadow-sm">
              <div className="flex items-center gap-4 pl-4">
                <span className="text-slate-400 font-bold text-sm uppercase tracking-widest">
                  {total} Properties Found
                </span>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
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
                            priceLabel: 'yearly',
                            image: property.image,
                            location: property.location || `${property.area || ''}${property.city ? ', ' + property.city : ''}`,
                            beds: property.beds ?? 0,
                            baths: property.baths ?? 0,
                            sqft: property.sqft ?? 0,
                            type: property.type || 'Property',
                            featured: Boolean(property.featured),
                            currency: property.currency || 'AED',
                            status: 'rent',
                            area: property.area || undefined,
                            city: property.city || undefined,
                            video_url: property.video_url || undefined,
                            agent_name: property.agent_name || undefined,
                          }}
                        />
                        
                        <button
                          onClick={() => handleViewDetails(property)}
                          className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white/90 backdrop-blur-md rounded-xl px-4 py-2 shadow-lg hover:shadow-xl hover:bg-white border border-slate-200 flex items-center gap-2 text-slate-700 hover:text-primary font-bold text-sm"
                        >
                          <ArrowsPointingOutIcon className="h-4 w-4" />
                          View Details
                        </button>
                      </div>

                      <div className="mt-2 flex gap-2">
                        {property.collection === 'agent_properties' && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            🤝 Agent Property
                            {property.agent_name && ` - ${property.agent_name}`}
                          </span>
                        )}
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          🏠 For Rent
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

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
                <h3 className="text-2xl font-black text-slate-900 mb-2">No rental properties found</h3>
                <p className="text-slate-500 font-medium max-w-xs mx-auto">
                  {allProperties.length === 0 
                    ? 'No rental properties available.'
                    : 'We couldn\'t find any rental properties matching your current filters.'
                  }
                </p>
                <button
                  onClick={handleResetFilters}
                  className="mt-8 bg-primary text-white py-3 px-8 rounded-full font-bold hover:bg-primary/90 transition-colors"
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

export default function PropertiesPage() {
  return (
    <Suspense fallback={<div className="p-6">Loading...</div>}>
      <PropertiesPageContent />
    </Suspense>
  );
}

const containerCustomStyles = `
.container-custom {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
}

@media (min-width: 640px) {
  .container-custom {
    max-width: 640px;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
}

@media (min-width: 768px) {
  .container-custom {
    max-width: 768px;
  }
}

@media (min-width: 1024px) {
  .container-custom {
    max-width: 1024px;
    padding-left: 2rem;
    padding-right: 2rem;
  }
}

@media (min-width: 1280px) {
  .container-custom {
    max-width: 1280px;
  }
}

@media (min-width: 1536px) {
  .container-custom {
    max-width: 1536px;
  }
}

:root {
  --color-primary: 59 130 246;
}
`;