// // 'use client';

// // import { useState, useEffect } from 'react';
// // import { Database } from '@/lib/database.types'
// // import PropertyCard, { PropertyCardProperty } from '@/components/property/PropertyCard'

// // import {
// //   ViewColumnsIcon,
// //   QueueListIcon,
// //   HomeIcon,
// //   SparklesIcon,
// //   BuildingOfficeIcon,
// //   XMarkIcon,
// //   MapPinIcon,
// //   VideoCameraIcon,
// //   UserIcon,
// //   BuildingStorefrontIcon,
// //   ArrowsPointingOutIcon,
// //   CheckIcon,
// //   HomeModernIcon,
// //   CalendarIcon,
// //   CurrencyDollarIcon,
// //   EnvelopeIcon,
// //   PhoneIcon,
// //   GlobeAltIcon,
// //   LanguageIcon,
// //   ShieldCheckIcon,
// //   ChartBarIcon,
// //   StarIcon as StarOutlineIcon
// // } from '@heroicons/react/24/outline'
// // import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid'
// // import { BathIcon, BedIcon, CarIcon } from 'lucide-react';
// // import { useRouter, useSearchParams } from 'next/navigation';

// // // Firebase imports
// // import { db } from '@/lib/firebase'
// // import { collection, getDocs, query, where, orderBy, doc, getDoc } from 'firebase/firestore'

// // type Property = Database['public']['Tables']['properties']['Row']
// // type NormalizedProperty = Property & {
// //   image: string
// //   price: number
// //   priceLabel?: string
// //   area?: string | null
// //   city?: string | null
// //   location: string
// //   beds: number
// //   baths: number
// //   sqft: number
// //   type: string
// //   featured: boolean
// //   developer?: string | null
// //   description?: string | null
// //   category?: string | null
// //   parking?: string | null
// //   furnished?: boolean | null
// //   propertyAge?: string | null
// //   completion?: string | null
// //   subtype?: string | null
// //   features?: string[] | null
// //   video_url?: string | null
// //   currency?: string
// //   status?: string
// //   agent_name?: string
// //   review_status?: string
// //   submitted_at?: string
// //   collection?: string
// //   address?: string
// //   property_status?: string
// //   property_age?: string
// //   images?: string[]
// //   floorplans?: string[]
// //   inquiries_count?: number
// //   coords?: {
// //     lat: number
// //     lng: number
// //   }
// //   agent_id?: string
// //   slug?: string
// //   created_at?: string
// //   updated_at?: string
// // }

// // // View Details Modal Component - EXACT SAME AS RENT PAGE
// // function ViewDetailsModal({ 
// //   property, 
// //   onClose 
// // }: { 
// //   property: NormalizedProperty | null; 
// //   onClose: () => void 
// // }) {
// //   if (!property) return null;

// //   const [currentImageIndex, setCurrentImageIndex] = useState(0);
// //   const [isVideoPlaying, setIsVideoPlaying] = useState(false);

// //   const handlePrevImage = () => {
// //     setCurrentImageIndex(prev => 
// //       prev === 0 
// //         ? (property.images?.length || property.floorplans?.length || 1) - 1 
// //         : prev - 1
// //     );
// //   };

// //   const handleNextImage = () => {
// //     setCurrentImageIndex(prev => 
// //       prev === (property.images?.length || property.floorplans?.length || 1) - 1 
// //         ? 0 
// //         : prev + 1
// //     );
// //   };

// //   const formatPrice = (price: number) => {
// //     return new Intl.NumberFormat('en-US').format(price);
// //   };

// //   const formatDate = (dateString?: string) => {
// //     if (!dateString) return 'N/A';
// //     return new Date(dateString).toLocaleDateString('en-US', {
// //       year: 'numeric',
// //       month: 'long',
// //       day: 'numeric'
// //     });
// //   };

// //   const getPropertyImages = () => {
// //     if (property.images && property.images.length > 0) {
// //       return property.images;
// //     }
// //     if (property.floorplans && property.floorplans.length > 0) {
// //       return property.floorplans;
// //     }
// //     return [property.image || ''];
// //   };

// //   const propertyImages = getPropertyImages();
// //   const hasVideo = property.video_url && property.video_url.trim() !== '';

// //   return (
// //     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in mt-32">
// //       <div className="relative w-full max-w-7xl h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden animate-slide-up flex flex-col">
// //         {/* Header with Close Button */}
// //         <div className="flex-shrink-0 p-6 border-b border-slate-100 bg-white">
// //           <div className="flex items-center justify-between">
// //             <div>
// //               <h2 className="text-2xl font-black text-slate-900 truncate">
// //                 {property.title || 'Untitled Property'}
// //               </h2>
// //               <div className="flex items-center gap-2 text-slate-600 mt-1">
// //                 <MapPinIcon className="h-4 w-4" />
// //                 <span className="font-medium truncate">
// //                   {property.address || property.location || `${property.area || ''}${property.city ? ', ' + property.city : ''}`}
// //                 </span>
// //               </div>
// //             </div>
// //             <button
// //               onClick={onClose}
// //               className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 hover:text-primary hover:bg-slate-200 transition-colors"
// //             >
// //               <XMarkIcon className="h-5 w-5" />
// //             </button>
// //           </div>
// //         </div>

// //         {/* Main Content with Scroll */}
// //         <div className="flex-1 overflow-hidden">
// //           <div className="grid grid-cols-1 lg:grid-cols-3 h-full">
// //             {/* Left Column - Images & Details - WITH SCROLL */}
// //             <div className="lg:col-span-2 h-full overflow-y-auto custom-scrollbar">
// //               {/* Main Image/Video */}
// //               <div className="relative h-64 md:h-80 bg-slate-100 overflow-hidden">
// //                 {hasVideo && isVideoPlaying ? (
// //                   <video
// //                     src={property.video_url}
// //                     className="w-full h-full object-cover"
// //                     autoPlay
// //                     controls
// //                     onEnded={() => setIsVideoPlaying(false)}
// //                   />
// //                 ) : (
// //                   <img
// //                     src={propertyImages[currentImageIndex]}
// //                     alt={property.title || 'Property Image'}
// //                     className="w-full h-full object-cover"
// //                     onError={(e) => {
// //                       e.currentTarget.src = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&auto=format&fit=crop';
// //                     }}
// //                   />
// //                 )}

// //                 {/* Image Navigation */}
// //                 {propertyImages.length > 1 && !isVideoPlaying && (
// //                   <>
// //                     <button
// //                       onClick={handlePrevImage}
// //                       className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-slate-700 hover:text-primary transition-colors shadow-lg"
// //                     >
// //                       ←
// //                     </button>
// //                     <button
// //                       onClick={handleNextImage}
// //                       className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-slate-700 hover:text-primary transition-colors shadow-lg"
// //                     >
// //                       →
// //                     </button>
// //                   </>
// //                 )}

// //                 {/* Video Play Button */}
// //                 {hasVideo && !isVideoPlaying && (
// //                   <button
// //                     onClick={() => setIsVideoPlaying(true)}
// //                     className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-16 w-16 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-primary hover:scale-110 transition-transform shadow-xl"
// //                   >
// //                     <VideoCameraIcon className="h-8 w-8" />
// //                   </button>
// //                 )}

// //                 {/* Badges */}
// //                 <div className="absolute top-4 left-4 flex flex-wrap gap-2">
// //                   <span className="px-3 py-1.5 bg-primary text-white text-xs font-bold uppercase tracking-widest rounded-full">
// //                     {property.status === 'rent' ? 'For Rent' : 'For Sale'}
// //                   </span>
// //                   {property.featured && (
// //                     <span className="px-3 py-1.5 bg-yellow-500 text-white text-xs font-bold uppercase tracking-widest rounded-full">
// //                       Featured
// //                     </span>
// //                   )}
// //                   {property.collection === 'agent_properties' && (
// //                     <span className="px-3 py-1.5 bg-blue-600 text-white text-xs font-bold uppercase tracking-widest rounded-full">
// //                       Agent Property
// //                     </span>
// //                   )}
// //                 </div>
// //               </div>

// //               {/* Thumbnail Gallery */}
// //               {propertyImages.length > 1 && (
// //                 <div className="p-4 border-b border-slate-100">
// //                   <div className="flex gap-2 overflow-x-auto pb-2">
// //                     {propertyImages.map((img, idx) => (
// //                       <button
// //                         key={idx}
// //                         onClick={() => setCurrentImageIndex(idx)}
// //                         className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
// //                           idx === currentImageIndex 
// //                             ? 'border-primary' 
// //                             : 'border-transparent hover:border-slate-300'
// //                         }`}
// //                       >
// //                         <img
// //                           src={img}
// //                           alt={`Thumbnail ${idx + 1}`}
// //                           className="w-full h-full object-cover"
// //                           onError={(e) => {
// //                             e.currentTarget.src = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=200&auto=format&fit=crop';
// //                           }}
// //                         />
// //                       </button>
// //                     ))}
// //                     {hasVideo && (
// //                       <button
// //                         onClick={() => setIsVideoPlaying(true)}
// //                         className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 border-transparent hover:border-primary transition-all relative group"
// //                       >
// //                         <div className="absolute inset-0 bg-slate-900/50 flex items-center justify-center">
// //                           <VideoCameraIcon className="h-5 w-5 text-white" />
// //                         </div>
// //                         <div className="text-[9px] text-white font-bold absolute bottom-1 left-1/2 -translate-x-1/2">
// //                           Video
// //                         </div>
// //                       </button>
// //                     )}
// //                   </div>
// //                 </div>
// //               )}

// //               {/* Property Details - WITH SCROLL */}
// //               <div className="p-6 space-y-6 ">
// //                 {/* Price */}
// //                 <div className="bg-slate-50 rounded-xl p-4">
// //                   <div className="flex items-center justify-between">
// //                     <div>
// //                       <div className="text-sm text-slate-500 font-bold uppercase tracking-widest mb-1">
// //                         {property.status === 'rent' ? 'Yearly Rent' : 'Sale Price'}
// //                       </div>
// //                       <div className="text-2xl md:text-3xl font-black text-primary">
// //                         {property.currency || 'AED'} {formatPrice(property.price)}
// //                       </div>
// //                       {property.status === 'rent' && (
// //                         <div className="text-slate-500 text-sm mt-1">
// //                           ≈ {property.currency || 'AED'} {formatPrice(Math.round(property.price / 12))} per month
// //                         </div>
// //                       )}
// //                     </div>
// //                     <div className="text-right">
// //                       <div className="text-sm text-slate-500 mb-1">Property ID</div>
// //                       <div className="font-mono font-bold text-slate-700">
// //                         {property.id.substring(0, 8).toUpperCase()}
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </div>

// //                 {/* Key Features */}
// //                 <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
// //                   <div className="bg-slate-50 rounded-lg p-3 text-center">
// //                     <div className="flex items-center justify-center gap-2 mb-1">
// //                       <BedIcon className="h-4 w-4 text-primary" />
// //                       <span className="text-lg font-black text-slate-900">{property.beds || 0}</span>
// //                     </div>
// //                     <div className="text-xs text-slate-500 uppercase tracking-widest font-bold">Bedrooms</div>
// //                   </div>
// //                   <div className="bg-slate-50 rounded-lg p-3 text-center">
// //                     <div className="flex items-center justify-center gap-2 mb-1">
// //                       <BathIcon className="h-4 w-4 text-primary" />
// //                       <span className="text-lg font-black text-slate-900">{property.baths || 0}</span>
// //                     </div>
// //                     <div className="text-xs text-slate-500 uppercase tracking-widest font-bold">Bathrooms</div>
// //                   </div>
// //                   <div className="bg-slate-50 rounded-lg p-3 text-center">
// //                     <div className="flex items-center justify-center gap-2 mb-1">
// //                       <ArrowsPointingOutIcon className="h-4 w-4 text-primary" />
// //                       <span className="text-lg font-black text-slate-900">{property.sqft || 0}</span>
// //                     </div>
// //                     <div className="text-xs text-slate-500 uppercase tracking-widest font-bold">Sq. Ft.</div>
// //                   </div>
// //                   <div className="bg-slate-50 rounded-lg p-3 text-center">
// //                     <div className="flex items-center justify-center gap-2 mb-1">
// //                       <HomeModernIcon className="h-4 w-4 text-primary" />
// //                       <span className="text-lg font-black text-slate-900">
// //                         {property.property_age || property.propertyAge || 'N/A'}
// //                       </span>
// //                     </div>
// //                     <div className="text-xs text-slate-500 uppercase tracking-widest font-bold">Property Age</div>
// //                   </div>
// //                 </div>

// //                 {/* Basic Info */}
// //                 <div className="grid grid-cols-2 gap-4 text-sm">
// //                   <div>
// //                     <div className="text-slate-500 mb-1">Property Type</div>
// //                     <div className="font-medium text-slate-900">{property.type || 'Property Type'}</div>
// //                   </div>
// //                   <div>
// //                     <div className="text-slate-500 mb-1">Completion Status</div>
// //                     <div className="font-medium text-slate-900">
// //                       {property.completion || property.property_status || 'Ready'}
// //                     </div>
// //                   </div>
// //                   <div>
// //                     <div className="text-slate-500 mb-1">Furnishing</div>
// //                     <div className="font-medium text-slate-900">
// //                       {property.furnished ? 'Furnished' : 'Unfurnished'}
// //                     </div>
// //                   </div>
// //                   <div>
// //                     <div className="text-slate-500 mb-1">Parking</div>
// //                     <div className="font-medium text-slate-900">
// //                       {property.parking === 'yes' ? 'Available' : 'Not Available'}
// //                     </div>
// //                   </div>
// //                 </div>

// //                 {/* Description */}
// //                 {property.description && (
// //                   <div>
// //                     <h3 className="text-lg font-black text-slate-900 mb-3">Description</h3>
// //                     <div className="max-h-60 overflow-y-auto pr-2 custom-scrollbar">
// //                       <p className="text-slate-600 leading-relaxed whitespace-pre-line">
// //                         {property.description}
// //                       </p>
// //                     </div>
// //                   </div>
// //                 )}

// //                 {/* Features List */}
// //                 {property.features && property.features.length > 0 && (
// //                   <div>
// //                     <h3 className="text-lg font-black text-slate-900 mb-3">Features & Amenities</h3>
// //                     <div className="max-h-60 overflow-y-auto pr-2 custom-scrollbar">
// //                       <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
// //                         {property.features.map((feature, idx) => (
// //                           <div key={idx} className="flex items-center gap-3">
// //                             <CheckIcon className="h-4 w-4 text-green-500 flex-shrink-0" />
// //                             <span className="text-slate-700">{feature}</span>
// //                           </div>
// //                         ))}
// //                       </div>
// //                     </div>
// //                   </div>
// //                 )}

// //                 {/* Additional Details */}
// //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //                   <div>
// //                     <h3 className="text-lg font-black text-slate-900 mb-3">Property Details</h3>
// //                     <div className="space-y-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
// //                       <div className="flex justify-between py-2 border-b border-slate-100">
// //                         <span className="text-slate-600">Inquiries</span>
// //                         <span className="font-medium text-slate-900">
// //                           {property.inquiries_count || 0}
// //                         </span>
// //                       </div>
// //                       <div className="flex justify-between py-2 border-b border-slate-100">
// //                         <span className="text-slate-600">Date Added</span>
// //                         <span className="font-medium text-slate-900">
// //                           {formatDate(property.created_at || property.submitted_at)}
// //                         </span>
// //                       </div>
// //                       <div className="flex justify-between py-2 border-b border-slate-100">
// //                         <span className="text-slate-600">Last Updated</span>
// //                         <span className="font-medium text-slate-900">
// //                           {formatDate(property.updated_at)}
// //                         </span>
// //                       </div>
// //                       <div className="flex justify-between py-2 border-b border-slate-100">
// //                         <span className="text-slate-600">Agent</span>
// //                         <span className="font-medium text-slate-900">
// //                           {property.agent_name || 'N/A'}
// //                         </span>
// //                       </div>
// //                     </div>
// //                   </div>

// //                   <div>
// //                     <h3 className="text-lg font-black text-slate-900 mb-3">Collection Info</h3>
// //                     <div className="space-y-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
// //                       <div className="flex justify-between py-2 border-b border-slate-100">
// //                         <span className="text-slate-600">Source</span>
// //                         <span className="font-medium text-slate-900">
// //                           {property.collection === 'agent_properties' ? 'Agent Properties' : 'Main Properties'}
// //                         </span>
// //                       </div>
// //                       <div className="flex justify-between py-2 border-b border-slate-100">
// //                         <span className="text-slate-600">Review Status</span>
// //                         <span className={`font-medium ${
// //                           property.review_status === 'published' 
// //                             ? 'text-green-600' 
// //                             : 'text-amber-600'
// //                         }`}>
// //                           {property.review_status || 'N/A'}
// //                         </span>
// //                       </div>
// //                       <div className="flex justify-between py-2 border-b border-slate-100">
// //                         <span className="text-slate-600">Slug</span>
// //                         <span className="font-medium text-slate-900 font-mono text-sm">
// //                           {property.slug || 'N/A'}
// //                         </span>
// //                       </div>
// //                       {property.agent_id && (
// //                         <div className="flex justify-between py-2 border-b border-slate-100">
// //                           <span className="text-slate-600">Agent ID</span>
// //                           <span className="font-medium text-slate-900 font-mono text-sm">
// //                             {property.agent_id.substring(0, 8)}...
// //                           </span>
// //                         </div>
// //                       )}
// //                     </div>
// //                   </div>
// //                 </div>

// //                 {/* Coordinates */}
// //                 {property.coords && (
// //                   <div className="bg-slate-50 rounded-xl p-4">
// //                     <h3 className="text-lg font-black text-slate-900 mb-2">Location Coordinates</h3>
// //                     <div className="grid grid-cols-2 gap-4">
// //                       <div>
// //                         <div className="text-sm text-slate-500">Latitude</div>
// //                         <div className="font-mono text-slate-900">{property.coords.lat}</div>
// //                       </div>
// //                       <div>
// //                         <div className="text-sm text-slate-500">Longitude</div>
// //                         <div className="font-mono text-slate-900">{property.coords.lng}</div>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 )}
// //               </div>
// //             </div>

// //             {/* Right Column - Action Panel - WITH SCROLL */}
// //             <div className="lg:col-span-1 h-full overflow-y-auto custom-scrollbar border-l border-slate-100 bg-slate-50">
// //               <div className="p-6 space-y-6">
// //                 {/* Contact Agent */}
// //                 <div className="bg-white rounded-xl p-4 shadow-sm">
// //                   <h3 className="text-lg font-black text-slate-900 mb-4">Contact Information</h3>
                  
// //                   {property.agent_id ? (
// //                     <div className="space-y-4">
// //                       <div className="flex items-center gap-4">
// //                         <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
// //                           <UserIcon className="h-6 w-6 text-primary" />
// //                         </div>
// //                         <div>
// //                           <div className="font-bold text-slate-900">{property.agent_name || 'Agent'}</div>
// //                           <div className="text-sm text-slate-500">Property Agent</div>
// //                         </div>
// //                       </div>
                      
                     
// //                     </div>
// //                   ) : (
// //                     <div className="text-center py-4">
// //                       <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3">
// //                         <BuildingStorefrontIcon className="h-6 w-6 text-slate-400" />
// //                       </div>
// //                       <div className="text-slate-700 mb-4 text-sm">
// //                         This property is listed directly by our agency
// //                       </div>
// //                       <button className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-primary/90 transition-colors">
// //                         Contact Our Team
// //                       </button>
// //                     </div>
// //                   )}
// //                 </div>

                

// //                 {/* Financial Calculator */}
// //                 <div className="bg-white rounded-xl p-4 shadow-sm">
// //                   <h3 className="text-lg font-black text-slate-900 mb-4">Financial Calculator</h3>
// //                   <div className="space-y-4">
// //                     <div>
// //                       <div className="text-sm text-slate-500 mb-1">Monthly Rent</div>
// //                       <div className="text-xl font-black text-primary">
// //                         {property.currency || 'AED'} {formatPrice(Math.round(property.price / 12))}
// //                       </div>
// //                     </div>
// //                     <div>
// //                       <div className="text-sm text-slate-500 mb-1">Deposit (5%)</div>
// //                       <div className="text-lg font-bold text-slate-900">
// //                         {property.currency || 'AED'} {formatPrice(Math.round(property.price * 0.05))}
// //                       </div>
// //                     </div>
// //                     <div className="text-xs text-slate-500">
// //                       *Calculations are approximate. Contact us for exact figures.
// //                     </div>
// //                   </div>
// //                 </div>

// //                 {/* Share Property */}
// //                 <div className="border-t border-slate-200 pt-6">
// //                   <h3 className="text-lg font-black text-slate-900 mb-4">Share This Property</h3>
// //                   <div className="grid grid-cols-3 gap-2">
// //                     <button className="h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center hover:bg-blue-200 transition-colors text-sm font-bold">
// //                       Facebook
// //                     </button>
// //                     <button className="h-10 rounded-lg bg-pink-100 text-pink-600 flex items-center justify-center hover:bg-pink-200 transition-colors text-sm font-bold">
// //                       Instagram
// //                     </button>
// //                     <button className="h-10 rounded-lg bg-green-100 text-green-600 flex items-center justify-center hover:bg-green-200 transition-colors text-sm font-bold">
// //                       WhatsApp
// //                     </button>
// //                   </div>
// //                 </div>

// //                 {/* Similar Properties Link */}
// //                 <div className="text-center pt-4">
// //                   <button className="text-primary font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-2 w-full">
// //                     View Similar Properties
// //                     <span className="group-hover:translate-x-1 transition-transform">→</span>
// //                   </button>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Custom Scrollbar CSS */}
// //       <style jsx global>{`
// //         .custom-scrollbar::-webkit-scrollbar {
// //           width: 8px;
// //           height: 8px;
// //         }
// //         .custom-scrollbar::-webkit-scrollbar-track {
// //           background: #f1f5f9;
// //           border-radius: 4px;
// //         }
// //         .custom-scrollbar::-webkit-scrollbar-thumb {
// //           background: #cbd5e1;
// //           border-radius: 4px;
// //         }
// //         .custom-scrollbar::-webkit-scrollbar-thumb:hover {
// //           background: #94a3b8;
// //         }
// //         .custom-scrollbar {
// //           scrollbar-width: thin;
// //           scrollbar-color: #cbd5e1 #f1f5f9;
// //         }
// //       `}</style>
// //     </div>
// //   );
// // }

// // // Function to fetch property details by ID from specific collection
// // async function fetchPropertyDetails(propertyId: string, collectionName: string) {
// //   try {
// //     console.log(`📋 Fetching details for property ${propertyId} from ${collectionName}...`);
    
// //     const docRef = doc(db, collectionName, propertyId);
// //     const docSnap = await getDoc(docRef);
    
// //     if (docSnap.exists()) {
// //       const data = docSnap.data();
// //       console.log(`✅ Found property details:`, {
// //         title: data.title,
// //         collection: collectionName
// //       });
      
// //       return {
// //         id: docSnap.id,
// //         collection: collectionName,
// //         ...data
// //       };
// //     } else {
// //       console.log(`❌ No property found with ID: ${propertyId} in ${collectionName}`);
// //       return null;
// //     }
// //   } catch (error) {
// //     console.error(`❌ Error fetching property details from ${collectionName}:`, error);
// //     return null;
// //   }
// // }

// // // Function to fetch ALL properties from 'properties' collection
// // async function fetchPropertiesFromMainCollection() {
// //   try {
// //     console.log('🔥 Fetching ALL properties from main collection...');
// //     const propertiesRef = collection(db, 'properties');
    
// //     const q = query(
// //       propertiesRef,
// //       orderBy('updated_at', 'desc')
// //     );
    
// //     const querySnapshot = await getDocs(q);
// //     console.log(`✅ Main Collection: Found ${querySnapshot.size} ALL properties`);
    
// //     const properties: any[] = [];
// //     querySnapshot.forEach((doc) => {
// //       const data = doc.data();
// //       properties.push({
// //         id: doc.id,
// //         collection: 'properties',
// //         ...data
// //       });
// //     });
    
// //     return properties;
    
// //   } catch (error: any) {
// //     console.error('❌ Error fetching properties from main collection:', error.message);
// //     return [];
// //   }
// // }

// // // Function to fetch ALL properties from 'agent_properties' collection
// // async function fetchPropertiesFromAgentCollection() {
// //   try {
// //     console.log('🔥 Fetching ALL properties from agent_properties collection...');
// //     const agentPropertiesRef = collection(db, 'agent_properties');
    
// //     const q = query(
// //       agentPropertiesRef,
// //       where('review_status', '==', 'published')
// //     );
    
// //     const querySnapshot = await getDocs(q);
// //     console.log(`✅ Agent Collection: Found ${querySnapshot.size} ALL properties`);
    
// //     const properties: any[] = [];
// //     querySnapshot.forEach((doc) => {
// //       const data = doc.data();
// //       properties.push({
// //         id: doc.id,
// //         collection: 'agent_properties',
// //         ...data
// //       });
// //     });
    
// //     return properties;
    
// //   } catch (error: any) {
// //     console.error('❌ Error fetching properties from agent collection:', error.message);
// //     return [];
// //   }
// // }

// // // Main function to fetch all properties from both collections
// // async function fetchAllProperties() {
// //   try {
// //     console.log('🔄 Fetching ALL properties from ALL collections...');
    
// //     const [mainProperties, agentProperties] = await Promise.all([
// //       fetchPropertiesFromMainCollection(),
// //       fetchPropertiesFromAgentCollection()
// //     ]);
    
// //     console.log(`📊 Results: ${mainProperties.length} from main, ${agentProperties.length} from agent`);
    
// //     const allProperties = [...mainProperties, ...agentProperties];
// //     console.log(`✅ Total ALL properties found: ${allProperties.length}`);
    
// //     return allProperties;
    
// //   } catch (error) {
// //     console.error('❌ Error in fetchAllProperties:', error);
// //     return [];
// //   }
// // }

// // // Function to get property type display name and emoji
// // function getTypeInfo(type: string) {
// //   const typeMap: Record<string, { label: string; emoji: string; color: string }> = {
// //     'apartment': { label: 'Apartment', emoji: '🏢', color: 'bg-purple-500' },
// //     'villa': { label: 'Villa', emoji: '🏰', color: 'bg-amber-500' },
// //     'townhouse': { label: 'Townhouse', emoji: '🏘️', color: 'bg-teal-500' },
// //     'commercial': { label: 'Commercial', emoji: '🏪', color: 'bg-blue-500' },
// //     'plot': { label: 'Plot', emoji: '📐', color: 'bg-green-500' },
// //     'furnished-studio': { label: 'Furnished Studio', emoji: '🌟', color: 'bg-pink-500' },
// //     'residential-plot': { label: 'Residential Plot', emoji: '🏡', color: 'bg-green-600' },
// //     'industrial-plot': { label: 'Industrial Plot', emoji: '🏭', color: 'bg-gray-500' },
// //   };
  
// //   return typeMap[type] || { label: type, emoji: '🏠', color: 'bg-gray-500' };
// // }

// // export default function CommercialPropertiesPage() {
// //   const router = useRouter();
// //   const searchParams = useSearchParams();
  
// //   // State for properties
// //   const [allProperties, setAllProperties] = useState<NormalizedProperty[]>([]);
// //   const [filteredProperties, setFilteredProperties] = useState<NormalizedProperty[]>([]);
// //   const [loading, setLoading] = useState(true);
  
// //   // ADD THESE STATES FOR MODAL
// //   const [selectedProperty, setSelectedProperty] = useState<NormalizedProperty | null>(null);
// //   const [isModalOpen, setIsModalOpen] = useState(false);
  
// //   // Get URL parameters
// //   const viewMode = searchParams.get('view') === 'list' ? 'list' : 'grid';
// //   const category = searchParams.get('category');
// //   const feature = searchParams.get('feature');
// //   const page = parseInt(searchParams.get('page') || '1', 10);
// //   const limit = 20;

// //   // Determine active filter from URL
// //   const activeFilter = feature || category;

// //   // Handle View Details Click - EXACT SAME AS RENT PAGE
// //   const handleViewDetails = async (property: NormalizedProperty) => {
// //     try {
// //       console.log(`🔄 Loading details for property: ${property.id} from ${property.collection}`);
      
// //       // Fetch complete details from Firebase
// //       const detailedProperty = await fetchPropertyDetails(property.id, property.collection || 'properties');
      
// //       if (detailedProperty) {
// //         // Normalize the detailed property
// //         const normalized = {
// //           ...detailedProperty,
// //           image: property.image || detailedProperty.images?.[0] || detailedProperty.image_url || '',
// //           price: detailedProperty.price || 0,
// //           priceLabel: detailedProperty.status === 'rent' ? 'yearly' : 'total',
// //           area: detailedProperty.area || detailedProperty.location || detailedProperty.address || 'Dubai',
// //           city: detailedProperty.city || 'Dubai',
// //           location: detailedProperty.address || detailedProperty.area || detailedProperty.city || 'Dubai',
// //           beds: detailedProperty.beds || 0,
// //           baths: detailedProperty.baths || 0,
// //           sqft: detailedProperty.sqft || 0,
// //           type: detailedProperty.type || detailedProperty.subtype || 'Property',
// //           developer: detailedProperty.developer || null,
// //           featured: Boolean(detailedProperty.featured),
// //           category: detailedProperty.category || null,
// //           parking: detailedProperty.parking || null,
// //           propertyAge: detailedProperty.property_age || detailedProperty.propertyAge || null,
// //           completion: detailedProperty.completion || detailedProperty.property_status || 'ready',
// //           subtype: detailedProperty.subtype || null,
// //           description: detailedProperty.description || null,
// //           features: Array.isArray(detailedProperty.features) ? detailedProperty.features : [],
// //           video_url: detailedProperty.video_url || null,
// //           currency: detailedProperty.currency || 'AED',
// //           status: detailedProperty.status || 'sale',
// //           agent_name: detailedProperty.agent_name || null,
// //           review_status: detailedProperty.review_status || null,
// //           submitted_at: detailedProperty.submitted_at || null,
// //           collection: detailedProperty.collection || 'properties',
// //           address: detailedProperty.address,
// //           property_status: detailedProperty.property_status,
// //           property_age: detailedProperty.property_age,
// //           images: detailedProperty.images || [],
// //           floorplans: detailedProperty.floorplans || [],
// //           inquiries_count: detailedProperty.inquiries_count || 0,
// //           coords: detailedProperty.coords,
// //           agent_id: detailedProperty.agent_id,
// //           slug: detailedProperty.slug,
// //           created_at: detailedProperty.created_at,
// //           updated_at: detailedProperty.updated_at
// //         };
        
// //         setSelectedProperty(normalized);
// //         setIsModalOpen(true);
// //         console.log('✅ Property details loaded successfully');
// //       } else {
// //         console.log('⚠️ Using cached property data');
// //         setSelectedProperty(property);
// //         setIsModalOpen(true);
// //       }
// //     } catch (error) {
// //       console.error('❌ Error loading property details:', error);
// //       // Fallback to cached property data
// //       setSelectedProperty(property);
// //       setIsModalOpen(true);
// //     }
// //   };

// //   // Close Details Modal
// //   const closeDetailsModal = () => {
// //     setSelectedProperty(null);
// //     setIsModalOpen(false);
// //   };

// //   // Fetch properties on component mount
// //   useEffect(() => {
// //     async function loadProperties() {
// //       setLoading(true);
// //       console.log('🔄 Loading ALL properties...');
// //       const properties = await fetchAllProperties();
      
// //       const normalized = properties.map((p: any) => {
// //         // Get first image
// //         let imageUrl = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg==';
        
// //         if (p.images && Array.isArray(p.images) && p.images.length > 0) {
// //           imageUrl = p.images[0];
// //         } else if (p.image) {
// //           imageUrl = p.image;
// //         } else if (p.image_url) {
// //           imageUrl = p.image_url;
// //         }
        
// //         const price = typeof p.price === 'string' ? parseFloat(p.price) : (p.price ?? 0);
// //         const location = p.location || p.address || p.area || p.city || 'Dubai';
// //         const propertyArea = p.area || p.location || p.address || p.neighborhood || p.district || 'Dubai';
// //         const priceLabel = p.status === 'rent' ? 'yearly' : 'total';
        
// //         let featuresArray: string[] = [];
// //         if (Array.isArray(p.features)) {
// //           featuresArray = p.features;
// //         } else if (typeof p.features === 'string') {
// //           featuresArray = p.features.split(',').map((f: string) => f.trim());
// //         }
        
// //         return {
// //           ...p,
// //           image: imageUrl,
// //           price: price,
// //           priceLabel: priceLabel,
// //           area: propertyArea,
// //           city: p.city || 'Dubai',
// //           location: location,
// //           beds: p.beds ?? 0,
// //           baths: p.baths ?? 0,
// //           sqft: p.sqft ?? 0,
// //           type: p.type || 'commercial',
// //           developer: p.developer || (p.developers?.name ? p.developers.name : null) || p.developer_id || null,
// //           featured: Boolean(p.featured),
// //           category: p.category || null,
// //           parking: p.parking || null,
// //           propertyAge: p.property_age || p.propertyAge || null,
// //           completion: p.completion || p.property_status || 'ready',
// //           subtype: p.subtype || null,
// //           description: p.description || null,
// //           features: featuresArray,
// //           video_url: p.video_url || null,
// //           currency: p.currency || 'AED',
// //           status: p.status || 'sale',
// //           agent_name: p.agent_name || null,
// //           review_status: p.review_status || null,
// //           submitted_at: p.submitted_at || null,
// //           collection: p.collection || 'properties'
// //         };
// //       });
      
// //       console.log(`✅ Normalized ${normalized.length} ALL properties`);
// //       console.log('📊 Property types found:', [...new Set(normalized.map(p => p.type))]);
// //       setAllProperties(normalized);
// //       setLoading(false);
// //     }
    
// //     loadProperties();
// //   }, []);

// //   // Filter properties based on URL params
// //   useEffect(() => {
// //     if (allProperties.length === 0) return;
    
// //     let filtered = [...allProperties];
    
// //     // Filter by feature (property type)
// //     if (feature) {
// //       console.log(`🔍 Filtering by feature: ${feature}`);
      
// //       // Map URL features to property types
// //       const featureToTypeMap: Record<string, string[]> = {
// //         'townhouse': ['townhouse'],
// //         'villas': ['villa'],
// //         'apartments': ['apartment'],
// //         'commercial': ['commercial'],
// //         'plots': ['plot', 'residential-plot', 'industrial-plot'],
// //         'studios': ['furnished-studio'],
// //       };
      
// //       const typesToFilter = featureToTypeMap[feature] || [feature];
// //       filtered = filtered.filter(p => typesToFilter.includes(p.type));
      
// //       console.log(`📊 Found ${filtered.length} properties of type: ${typesToFilter.join(', ')}`);
// //     }
    
// //     // Filter by category (commercial ke liye special filters)
// //     if (category === 'commercial') {
// //       // Commercial specific filters - example: high price, office spaces, etc.
// //       filtered = filtered.filter(p => p.type === 'commercial');
// //     }
    
// //     setFilteredProperties(filtered);
// //   }, [allProperties, category, feature]);

// //   // Handle view change
// //   const handleViewChange = (view: string) => {
// //     const params = new URLSearchParams(searchParams.toString());
// //     params.set('view', view);
// //     params.set('page', '1');
// //     router.push(`/commercial-properties?${params.toString()}`);
// //   };

// //   // Handle page change
// //   const handlePageChange = (newPage: number) => {
// //     const params = new URLSearchParams(searchParams.toString());
// //     params.set('page', newPage.toString());
// //     router.push(`/commercial-properties?${params.toString()}`);
// //   };

// //   // Handle filter click
// //   const handleFilterClick = (filterType: string, filterValue: string) => {
// //     const params = new URLSearchParams();
// //     if (filterType === 'category') {
// //       params.set('category', filterValue);
// //     } else if (filterType === 'feature') {
// //       params.set('feature', filterValue);
// //     }
// //     params.set('view', viewMode);
// //     params.set('page', '1');
// //     router.push(`/commercial-properties?${params.toString()}`);
// //   };

// //   // Clear all filters
// //   const handleClearFilters = () => {
// //     const params = new URLSearchParams();
// //     params.set('view', viewMode);
// //     router.push(`/commercial-properties?${params.toString()}`);
// //   };

// //   // Pagination calculations
// //   const total = filteredProperties.length;
// //   const totalPages = Math.max(1, Math.ceil(total / limit));
// //   const offset = (Math.max(page, 1) - 1) * limit;
// //   const paginatedProperties = filteredProperties.slice(offset, offset + limit);

// //   // Get page title based on filter
// //   const getPageTitle = () => {
// //     if (feature === 'townhouse') return 'Townhouses';
// //     if (feature === 'villas') return 'Villas';
// //     if (feature === 'apartments') return 'Apartments';
// //     if (feature === 'commercial') return 'Commercial Properties';
// //     if (feature === 'plots') return 'Plots & Land';
// //     if (feature === 'studios') return 'Furnished Studios';
// //     if (category === 'commercial') return 'Commercial Properties';
// //     return 'All Properties';
// //   };

// //   // Get page description based on filter
// //   const getPageDescription = () => {
// //     if (feature === 'townhouse') return 'Discover premium townhouses in Dubai with modern amenities and prime locations.';
// //     if (feature === 'villas') return 'Explore luxurious villas with private amenities and exclusive community access.';
// //     if (feature === 'apartments') return 'Find modern apartments with stunning views and convenient locations.';
// //     if (feature === 'commercial') return 'Commercial spaces for businesses seeking prime locations in Dubai.';
// //     if (feature === 'plots') return 'Available plots and land for residential and commercial development.';
// //     if (feature === 'studios') return 'Fully furnished studios with all amenities included for comfortable living.';
// //     if (category === 'commercial') return 'Discover premium commercial spaces in Dubai for your business needs. Offices, retail spaces, warehouses, and more.';
// //     return 'Discover Dubai\'s finest collection of ALL property types - Apartments, Villas, Townhouses, Commercial spaces and more.';
// //   };

// //   // Calculate agent properties count
// //   const agentPropertiesCount = filteredProperties.filter(p => p.collection === 'agent_properties').length;
// //   const mainPropertiesCount = filteredProperties.filter(p => p.collection === 'properties').length;

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
// //         <div className="text-center">
// //           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
// //           <p className="mt-4 text-blue-600 font-medium">Loading properties...</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-gradient-to-b from-white-50 to-white">
// //       {/* View Details Modal - EXACT SAME AS RENT PAGE */}
// //       {isModalOpen && selectedProperty && (
// //         <ViewDetailsModal 
// //           property={selectedProperty} 
// //           onClose={closeDetailsModal} 
// //         />
// //       )}

// //       {/* Hero Section */}
// //        <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900"> 
      
// //         <div className="absolute inset-0 opacity-10">
// //           <img 
// //             src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1600&q=80" 
// //             alt="Commercial Building" 
// //             className="w-full h-full object-cover"
// //           />
// //         </div>
// //         <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-slate-900/80 to-slate-900" />
        
// //         <div className="container-custom relative z-10">
// //           <div className="max-w-5xl mx-auto text-center space-y-6">
            
              
// //               <h2 className="text-white font-bold tracking-[0.3em] uppercase text-sm">
// //                 {activeFilter ? getPageTitle() : 'ALL Properties Collection'}
// //               </h2>
           
            
// //             <h1 className="text-4xl md:text-7xl font-black text-white tracking-tight animate-slide-up [animation-delay:100ms]">
// //               {getPageTitle()}
// //             </h1>
            
// //             <p className="text-lg md:text-xl text-blue-200 max-w-3xl mx-auto font-medium animate-slide-up [animation-delay:200ms]">
// //               {getPageDescription()}
// //             </p>

// //             {/* Property Stats and Filter Info */}
// //             <div className="flex flex-wrap justify-center gap-3 pt-6 animate-slide-up [animation-delay:300ms]">
// //               <span className="px-6 py-2 bg-white/10 backdrop-blur-md text-white rounded-full border border-white/10 text-sm font-bold">
// //                 {total} Properties
// //               </span>
              
            
              
             
              
// //               {!activeFilter && (
// //                 <span className="px-6 py-2 bg-green-500/20 backdrop-blur-md text-green-300 rounded-full border border-green-400/30 text-sm font-bold">
// //                   🏢 {new Set(allProperties.map(p => p.type)).size} Property Types
// //                 </span>

// //               )}
// //             </div>
// //           </div>
// //         </div>
// //       </section>

// //       {/* Main Content */}
// //       <div className="container-custom py-8 sm:py-16">
// //         <div className="flex flex-col">
// //           {/* View Controls and Filters */}
// //           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 sm:mb-10 gap-4 sm:gap-6 bg-white p-4 sm:p-4 rounded-2xl sm:rounded-3xl border border-blue-100 shadow-sm">
// //             <div className="flex items-center gap-4 pl-4">
// //               <span className="text-black font-bold text-sm uppercase tracking-widest">
// //                 {total} Properties 
// //               </span>
// //             </div>

// //             <div className="flex items-center gap-3">
// //               {/* Quick Filter Buttons */}
             
// //               {/* View Toggle */}
// //               <div className="flex bg-blue-50 p-1 rounded-xl">
// //                 <button
// //                   type="button"
// //                   onClick={() => handleViewChange('grid')}
// //                   className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-blue-500' : 'text-blue-400 hover:text-blue-600'}`}
// //                 >
// //                   <ViewColumnsIcon className="h-5 w-5" />
// //                 </button>
// //                 <button
// //                   type="button"
// //                   onClick={() => handleViewChange('list')}
// //                   className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-blue-500' : 'text-blue-400 hover:text-blue-600'}`}
// //                 >
// //                   <QueueListIcon className="h-5 w-5" />
// //                 </button>
// //               </div>
// //             </div>
// //           </div>

// //           {/* Properties Grid/List */}
// //           {filteredProperties.length > 0 ? (
// //             <>
// //               <div className={`grid gap-8 ${
// //                 viewMode === 'grid'
// //                   ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'
// //                   : 'grid-cols-1'
// //               }`}>
// //                 {paginatedProperties.map((property, i) => {
// //                   const typeInfo = getTypeInfo(property.type);
                  
// //                   return (
// //                     <div key={`${property.collection}-${property.id}`} className="animate-slide-up" style={{ animationDelay: `${i * 50}ms` }}>
// //                       <div className="relative group">
// //                         <PropertyCard
// //                           property={{
// //                             id: String(property.id),
// //                             title: property.title || 'Property',
// //                             price: property.price ?? 0,
// //                             priceLabel: property.status === 'rent' ? 'yearly' : 'total',
// //                             image: property.image,
// //                             location: property.location || `${property.area || ''}${property.city ? ', ' + property.city : ''}`,
// //                             beds: property.beds ?? 0,
// //                             baths: property.baths ?? 0,
// //                             sqft: property.sqft ?? 0,
// //                             type: property.type || 'Property',
// //                             featured: Boolean(property.featured),
// //                             currency: property.currency || 'AED',
// //                             status: property.status || 'sale',
// //                             area: property.area || undefined,
// //                             city: property.city || undefined,
// //                             video_url: property.video_url || undefined,
// //                             agent_name: property.agent_name || undefined,
// //                           }}
// //                         />
                        
// //                         {/* ADD VIEW DETAILS BUTTON - EXACT SAME AS RENT PAGE */}
// //                         <button
// //                           onClick={() => handleViewDetails(property)}
// //                           className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white/90 backdrop-blur-md rounded-xl px-4 py-2 shadow-lg hover:shadow-xl hover:bg-white border border-blue-200 flex items-center gap-2 text-blue-700 hover:text-blue-600 font-bold text-sm z-10"
// //                         >
// //                           <ArrowsPointingOutIcon className="h-4 w-4" />
// //                           View Details
// //                         </button>
                        
// //                         {/* Property Badges */}
// //                         <div className="absolute top-4 left-4 flex flex-col gap-2">
// //                           <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold ${typeInfo.color} text-white shadow-lg`}>
// //                             {typeInfo.emoji} {typeInfo.label}
// //                           </span>
// //                           {property.status === 'rent' ? (
// //                             <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold bg-green-500 text-white shadow-lg">
// //                               🔑 For Rent
// //                             </span>
// //                           ) : (
// //                             <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold bg-blue-500 text-white shadow-lg">
// //                               🏠 For Sale
// //                             </span>
// //                           )}
// //                         </div>
// //                       </div>
                      
// //                       {/* Additional Info */}
// //                       <div className="mt-3 flex gap-2">
// //                         {property.featured && (
// //                           <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
// //                             ⭐ Featured
// //                           </span>
// //                         )}
// //                         {property.collection === 'agent_properties' && (
// //                           <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
// //                             🤝 Agent Property
// //                           </span>
// //                         )}
// //                         {property.agent_name && (
// //                           <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
// //                             👤 {property.agent_name}
// //                           </span>
// //                         )}
// //                       </div>
// //                     </div>
// //                   );
// //                 })}
// //               </div>

// //               {/* Pagination */}
// //               {totalPages > 1 && (
// //                 <div className="mt-16 flex items-center justify-center gap-2">
// //                   {page > 1 && (
// //                     <button
// //                       onClick={() => handlePageChange(page - 1)}
// //                       className="h-12 w-12 flex items-center justify-center rounded-xl bg-white border border-blue-100 text-blue-600 hover:bg-blue-500 hover:text-white hover:border-blue-500 transition-all font-bold shadow-sm"
// //                     >
// //                       ←
// //                     </button>
// //                   )}

// //                   {[...Array(totalPages)].map((_, i) => {
// //                     const p = i + 1;
// //                     if (p === 1 || p === totalPages || (p >= page - 1 && p <= page + 1)) {
// //                       return (
// //                         <button
// //                           key={p}
// //                           onClick={() => handlePageChange(p)}
// //                           className={`h-12 w-12 flex items-center justify-center rounded-xl font-bold transition-all shadow-sm ${
// //                             page === p 
// //                               ? 'bg-blue-500 text-white shadow-blue-500/20' 
// //                               : 'bg-white border border-blue-100 text-blue-600 hover:bg-blue-50'
// //                           }`}
// //                         >
// //                           {p}
// //                         </button>
// //                       );
// //                     }
// //                     if (p === page - 2 || p === page + 2) {
// //                       return <span key={p} className="text-blue-300">...</span>;
// //                     }
// //                     return null;
// //                   })}

// //                   {page < totalPages && (
// //                     <button
// //                       onClick={() => handlePageChange(page + 1)}
// //                       className="h-12 w-12 flex items-center justify-center rounded-xl bg-white border border-blue-100 text-blue-600 hover:bg-blue-500 hover:text-white hover:border-blue-500 transition-all font-bold shadow-sm"
// //                     >
// //                       →
// //                     </button>
// //                   )}
// //                 </div>
// //               )}
// //             </>
// //           ) : (
// //             <div className="text-center py-32 bg-white rounded-[3rem] border border-blue-100 shadow-sm">
// //               <div className="h-24 w-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
// //                 <BuildingOfficeIcon className="h-12 w-12 text-blue-300" />
// //               </div>
// //               <h3 className="text-2xl font-black text-blue-900 mb-2">No properties found</h3>
// //               <p className="text-blue-500 font-medium max-w-xs mx-auto">
// //                 {activeFilter 
// //                   ? `No ${getPageTitle().toLowerCase()} available at the moment.`
// //                   : 'No properties available at the moment.'
// //                 }
// //               </p>
// //               {activeFilter && (
// //                 <button
// //                   onClick={handleClearFilters}
// //                   className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
// //                 >
// //                   View All Properties
// //                 </button>
// //               )}
// //             </div>
// //           )}
// //         </div>
// //       </div>

// //       {/* Simple CTA Section */}
// //       <section className="bg-gradient-to-r from-slate-900 to-slate-800 py-20">
// //         <div className="container-custom">
// //           <div className="max-w-4xl mx-auto text-center text-white">
// //             <h2 className="text-3xl md:text-5xl font-black mb-6">
// //               Find Your {getPageTitle()}
// //             </h2>
// //             <p className="text-lg text-white mb-8 max-w-2xl mx-auto">
// //               Browse our collection of premium properties from both our main listings and agent submissions.
// //             </p>
// //           </div>
// //         </div>
// //       </section>
// //     </div>
// //   );
// // }

// // neww
// 'use client';

// import { useState, useEffect, Suspense } from 'react';
// import { Database } from '@/lib/database.types'
// import PropertyCard, { PropertyCardProperty } from '@/components/property/PropertyCard'

// import {
//   ViewColumnsIcon,
//   QueueListIcon,
//   HomeIcon,
//   SparklesIcon,
//   BuildingOfficeIcon,
//   XMarkIcon,
//   MapPinIcon,
//   VideoCameraIcon,
//   UserIcon,
//   BuildingStorefrontIcon,
//   ArrowsPointingOutIcon,
//   CheckIcon,
//   HomeModernIcon,
//   CalendarIcon,
//   CurrencyDollarIcon,
//   EnvelopeIcon,
//   PhoneIcon,
//   GlobeAltIcon,
//   LanguageIcon,
//   ShieldCheckIcon,
//   ChartBarIcon,
//   StarIcon as StarOutlineIcon
// } from '@heroicons/react/24/outline'
// import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid'
// import { BathIcon, BedIcon, CarIcon } from 'lucide-react';
// import { useRouter, useSearchParams } from 'next/navigation';

// // Firebase imports
// import { db } from '@/lib/firebase'
// import { collection, getDocs, query, where, orderBy, doc, getDoc } from 'firebase/firestore'

// type Property = Database['public']['Tables']['properties']['Row']

// // FIXED: Add image property explicitly to NormalizedProperty
// type NormalizedProperty = Property & {
//   // Explicitly add image property since Property type might not have it
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
//   agent_name?: string | null
//   review_status?: string | null
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
//   developers?: any
//   neighborhood?: string
//   district?: string
//   image_url?: string  // Add this for consistency
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
//     const totalImages = (property.images?.length || property.floorplans?.length || 1);
//     setCurrentImageIndex(prev => 
//       prev === 0 
//         ? totalImages - 1 
//         : prev - 1
//     );
//   };

//   const handleNextImage = () => {
//     const totalImages = (property.images?.length || property.floorplans?.length || 1);
//     setCurrentImageIndex(prev => 
//       prev === totalImages - 1 
//         ? 0 
//         : prev + 1
//     );
//   };

//   const formatPrice = (price: number) => {
//     return new Intl.NumberFormat('en-US').format(price);
//   };

//   const formatDate = (dateString?: string) => {
//     if (!dateString) return 'N/A';
//     try {
//       return new Date(dateString).toLocaleDateString('en-US', {
//         year: 'numeric',
//         month: 'long',
//         day: 'numeric'
//       });
//     } catch (error) {
//       return 'Invalid Date';
//     }
//   };

//   const getPropertyImages = () => {
//     if (property.images && property.images.length > 0) {
//       return property.images;
//     }
//     if (property.floorplans && property.floorplans.length > 0) {
//       return property.floorplans;
//     }
//     // Use property.image which is now guaranteed to exist
//     return [property.image || ''];
//   };

//   const propertyImages = getPropertyImages();
//   const hasVideo = property.video_url && property.video_url.trim() !== '';

//   // Ensure we have a valid image index
//   useEffect(() => {
//     if (propertyImages.length > 0 && currentImageIndex >= propertyImages.length) {
//       setCurrentImageIndex(0);
//     }
//   }, [propertyImages, currentImageIndex]);

//   // Rest of the ViewDetailsModal component remains the same...
//   // [Previous ViewDetailsModal JSX code here - unchanged]

// }

// // Function to fetch property details by ID from specific collection
// async function fetchPropertyDetails(propertyId: string, collectionName: string) {
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
//       } as any;
//     } else {
//       console.log(`❌ No property found with ID: ${propertyId} in ${collectionName}`);
//       return null;
//     }
//   } catch (error) {
//     console.error(`❌ Error fetching property details from ${collectionName}:`, error);
//     return null;
//   }
// }

// // Function to fetch ALL properties from 'properties' collection
// async function fetchPropertiesFromMainCollection() {
//   try {
//     console.log('🔥 Fetching ALL properties from main collection...');
//     const propertiesRef = collection(db, 'properties');
    
//     const q = query(
//       propertiesRef,
//       orderBy('updated_at', 'desc')
//     );
    
//     const querySnapshot = await getDocs(q);
//     console.log(`✅ Main Collection: Found ${querySnapshot.size} ALL properties`);
    
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
//     console.error('❌ Error fetching properties from main collection:', error.message);
//     return [];
//   }
// }

// // Function to fetch ALL properties from 'agent_properties' collection
// async function fetchPropertiesFromAgentCollection() {
//   try {
//     console.log('🔥 Fetching ALL properties from agent_properties collection...');
//     const agentPropertiesRef = collection(db, 'agent_properties');
    
//     const q = query(
//       agentPropertiesRef,
//       where('review_status', '==', 'published')
//     );
    
//     const querySnapshot = await getDocs(q);
//     console.log(`✅ Agent Collection: Found ${querySnapshot.size} ALL properties`);
    
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
//     console.error('❌ Error fetching properties from agent collection:', error.message);
//     return [];
//   }
// }

// // Main function to fetch all properties from both collections
// async function fetchAllProperties() {
//   try {
//     console.log('🔄 Fetching ALL properties from ALL collections...');
    
//     const [mainProperties, agentProperties] = await Promise.all([
//       fetchPropertiesFromMainCollection(),
//       fetchPropertiesFromAgentCollection()
//     ]);
    
//     console.log(`📊 Results: ${mainProperties.length} from main, ${agentProperties.length} from agent`);
    
//     const allProperties = [...mainProperties, ...agentProperties];
//     console.log(`✅ Total ALL properties found: ${allProperties.length}`);
    
//     return allProperties;
    
//   } catch (error) {
//     console.error('❌ Error in fetchAllProperties:', error);
//     return [];
//   }
// }

// // Function to get property type display name and emoji
// function getTypeInfo(type: string) {
//   const typeMap: Record<string, { label: string; emoji: string; color: string }> = {
//     'apartment': { label: 'Apartment', emoji: '🏢', color: 'bg-purple-500' },
//     'villa': { label: 'Villa', emoji: '🏰', color: 'bg-amber-500' },
//     'townhouse': { label: 'Townhouse', emoji: '🏘️', color: 'bg-teal-500' },
//     'commercial': { label: 'Commercial', emoji: '🏪', color: 'bg-blue-500' },
//     'plot': { label: 'Plot', emoji: '📐', color: 'bg-green-500' },
//     'furnished-studio': { label: 'Furnished Studio', emoji: '🌟', color: 'bg-pink-500' },
//     'residential-plot': { label: 'Residential Plot', emoji: '🏡', color: 'bg-green-600' },
//     'industrial-plot': { label: 'Industrial Plot', emoji: '🏭', color: 'bg-gray-500' },
//   };
  
//   return typeMap[type] || { label: type, emoji: '🏠', color: 'bg-gray-500' };
// }

// function CommercialPropertiesPageContent() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
  
//   // State for properties
//   const [allProperties, setAllProperties] = useState<NormalizedProperty[]>([]);
//   const [filteredProperties, setFilteredProperties] = useState<NormalizedProperty[]>([]);
//   const [loading, setLoading] = useState(true);
  
//   // ADD THESE STATES FOR MODAL
//   const [selectedProperty, setSelectedProperty] = useState<NormalizedProperty | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
  
//   // Get URL parameters
//   const viewMode = searchParams.get('view') === 'list' ? 'list' : 'grid';
//   const category = searchParams.get('category');
//   const feature = searchParams.get('feature');
//   const page = parseInt(searchParams.get('page') || '1', 10);
//   const limit = 20;

//   // Determine active filter from URL
//   const activeFilter = feature || category;

//   // Handle View Details Click
//   const handleViewDetails = async (property: NormalizedProperty) => {
//     try {
//       console.log(`🔄 Loading details for property: ${property.id} from ${property.collection}`);
      
//       // Fetch complete details from Firebase
//       const detailedProperty = await fetchPropertyDetails(property.id, property.collection || 'properties');
      
//       if (detailedProperty) {
//         // Normalize the detailed property
//         const normalized: NormalizedProperty = {
//           ...detailedProperty,
//           // Ensure image property exists
//           image: property.image || detailedProperty.images?.[0] || detailedProperty.image_url || '',
//           price: detailedProperty.price || 0,
//           priceLabel: detailedProperty.status === 'rent' ? 'yearly' : 'total',
//           area: detailedProperty.area || detailedProperty.location || detailedProperty.address || 'Dubai',
//           city: detailedProperty.city || 'Dubai',
//           location: detailedProperty.address || detailedProperty.area || detailedProperty.city || 'Dubai',
//           beds: detailedProperty.beds || 0,
//           baths: detailedProperty.baths || 0,
//           sqft: detailedProperty.sqft || 0,
//           type: detailedProperty.type || detailedProperty.subtype || 'Property',
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
//           status: detailedProperty.status || 'sale',
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
//           updated_at: detailedProperty.updated_at,
//           id: detailedProperty.id,
//           title: detailedProperty.title,
//           developers: detailedProperty.developers,
//           neighborhood: detailedProperty.neighborhood,
//           district: detailedProperty.district,
//           image_url: detailedProperty.image_url || ''
//         };
        
//         setSelectedProperty(normalized);
//         setIsModalOpen(true);
//         console.log('✅ Property details loaded successfully');
//       } else {
//         console.log('⚠️ Using cached property data');
//         setSelectedProperty(property);
//         setIsModalOpen(true);
//       }
//     } catch (error) {
//       console.error('❌ Error loading property details:', error);
//       // Fallback to cached property data
//       setSelectedProperty(property);
//       setIsModalOpen(true);
//     }
//   };

//   // Close Details Modal
//   const closeDetailsModal = () => {
//     setSelectedProperty(null);
//     setIsModalOpen(false);
//   };

//   // Fetch properties on component mount
//   useEffect(() => {
//     async function loadProperties() {
//       setLoading(true);
//       console.log('🔄 Loading ALL properties...');
//       const properties = await fetchAllProperties();
      
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
        
//         const price = typeof p.price === 'string' ? parseFloat(p.price) : (p.price ?? 0);
//         const location = p.location || p.address || p.area || p.city || 'Dubai';
//         const propertyArea = p.area || p.location || p.address || p.neighborhood || p.district || 'Dubai';
//         const priceLabel = p.status === 'rent' ? 'yearly' : 'total';
        
//         let featuresArray: string[] = [];
//         if (Array.isArray(p.features)) {
//           featuresArray = p.features;
//         } else if (typeof p.features === 'string') {
//           featuresArray = p.features.split(',').map((f: string) => f.trim());
//         }
        
//         return {
//           ...p,
//           image: imageUrl, // This is now a required property
//           price: price,
//           priceLabel: priceLabel,
//           area: propertyArea,
//           city: p.city || 'Dubai',
//           location: location,
//           beds: p.beds ?? 0,
//           baths: p.baths ?? 0,
//           sqft: p.sqft ?? 0,
//           type: p.type || 'commercial',
//           developer: p.developer || (p.developers?.name ? p.developers.name : null) || p.developer_id || null,
//           featured: Boolean(p.featured),
//           category: p.category || null,
//           parking: p.parking || null,
//           propertyAge: p.property_age || p.propertyAge || null,
//           completion: p.completion || p.property_status || 'ready',
//           subtype: p.subtype || null,
//           description: p.description || null,
//           features: featuresArray,
//           video_url: p.video_url || null,
//           currency: p.currency || 'AED',
//           status: p.status || 'sale',
//           agent_name: p.agent_name || null,
//           review_status: p.review_status || null,
//           submitted_at: p.submitted_at || null,
//           collection: p.collection || 'properties',
//           image_url: p.image_url || imageUrl // Add image_url for consistency
//         } as NormalizedProperty;
//       });
      
//       console.log(`✅ Normalized ${normalized.length} ALL properties`);
//       console.log('📊 Property types found:', [...new Set(normalized.map(p => p.type))]);
//       setAllProperties(normalized);
//       setLoading(false);
//     }
    
//     loadProperties();
//   }, []);

//   // Filter properties based on URL params
//   useEffect(() => {
//     if (allProperties.length === 0) return;
    
//     let filtered = [...allProperties];
    
//     // Filter by feature (property type)
//     if (feature) {
//       console.log(`🔍 Filtering by feature: ${feature}`);
      
//       // Map URL features to property types
//       const featureToTypeMap: Record<string, string[]> = {
//         'townhouse': ['townhouse'],
//         'villas': ['villa'],
//         'apartments': ['apartment'],
//         'commercial': ['commercial'],
//         'plots': ['plot', 'residential-plot', 'industrial-plot'],
//         'studios': ['furnished-studio'],
//       };
      
//       const typesToFilter = featureToTypeMap[feature] || [feature];
//       filtered = filtered.filter(p => typesToFilter.includes(p.type));
      
//       console.log(`📊 Found ${filtered.length} properties of type: ${typesToFilter.join(', ')}`);
//     }
    
//     // Filter by category (commercial ke liye special filters)
//     if (category === 'commercial') {
//       // Commercial specific filters - example: high price, office spaces, etc.
//       filtered = filtered.filter(p => p.type === 'commercial');
//     }
    
//     setFilteredProperties(filtered);
//   }, [allProperties, category, feature]);

//   // Handle view change
//   const handleViewChange = (view: string) => {
//     const params = new URLSearchParams(searchParams.toString());
//     params.set('view', view);
//     params.set('page', '1');
//     router.push(`/commercial-properties?${params.toString()}`);
//   };

//   // Handle page change
//   const handlePageChange = (newPage: number) => {
//     const params = new URLSearchParams(searchParams.toString());
//     params.set('page', newPage.toString());
//     router.push(`/commercial-properties?${params.toString()}`);
//   };

//   // Handle filter click
//   const handleFilterClick = (filterType: string, filterValue: string) => {
//     const params = new URLSearchParams();
//     if (filterType === 'category') {
//       params.set('category', filterValue);
//     } else if (filterType === 'feature') {
//       params.set('feature', filterValue);
//     }
//     params.set('view', viewMode);
//     params.set('page', '1');
//     router.push(`/commercial-properties?${params.toString()}`);
//   };

//   // Clear all filters
//   const handleClearFilters = () => {
//     const params = new URLSearchParams();
//     params.set('view', viewMode);
//     router.push(`/commercial-properties?${params.toString()}`);
//   };

//   // Pagination calculations
//   const total = filteredProperties.length;
//   const totalPages = Math.max(1, Math.ceil(total / limit));
//   const offset = (Math.max(page, 1) - 1) * limit;
//   const paginatedProperties = filteredProperties.slice(offset, offset + limit);

//   // Get page title based on filter
//   const getPageTitle = () => {
//     if (feature === 'townhouse') return 'Townhouses';
//     if (feature === 'villas') return 'Villas';
//     if (feature === 'apartments') return 'Apartments';
//     if (feature === 'commercial') return 'Commercial Properties';
//     if (feature === 'plots') return 'Plots & Land';
//     if (feature === 'studios') return 'Furnished Studios';
//     if (category === 'commercial') return 'Commercial Properties';
//     return 'All Properties';
//   };

//   // Get page description based on filter
//   const getPageDescription = () => {
//     if (feature === 'townhouse') return 'Discover premium townhouses in Dubai with modern amenities and prime locations.';
//     if (feature === 'villas') return 'Explore luxurious villas with private amenities and exclusive community access.';
//     if (feature === 'apartments') return 'Find modern apartments with stunning views and convenient locations.';
//     if (feature === 'commercial') return 'Commercial spaces for businesses seeking prime locations in Dubai.';
//     if (feature === 'plots') return 'Available plots and land for residential and commercial development.';
//     if (feature === 'studios') return 'Fully furnished studios with all amenities included for comfortable living.';
//     if (category === 'commercial') return 'Discover premium commercial spaces in Dubai for your business needs. Offices, retail spaces, warehouses, and more.';
//     return 'Discover Dubai\'s finest collection of ALL property types - Apartments, Villas, Townhouses, Commercial spaces and more.';
//   };

//   // Calculate agent properties count
//   const agentPropertiesCount = filteredProperties.filter(p => p.collection === 'agent_properties').length;
//   const mainPropertiesCount = filteredProperties.filter(p => p.collection === 'properties').length;

//   if (loading) {
//     return (
//       <div className="min-h-screen 'bg-gradient-to-b' from-blue-50 to-white flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
//           <p className="mt-4 text-blue-600 font-medium">Loading properties...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen 'bg-gradient-to-b' from-white-50 to-white">
//       {/* View Details Modal */}
//       {isModalOpen && selectedProperty && (
//         <ViewDetailsModal 
//           property={selectedProperty} 
//           onClose={closeDetailsModal} 
//         />
//       )}

//       {/* Hero Section */}
//       <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
//         <div className="absolute inset-0 opacity-10">
//           <img 
//             src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1600&q=80" 
//             alt="Commercial Building" 
//             className="w-full h-full object-cover"
//           />
//         </div>
//         <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-slate-900/80 to-slate-900" />
        
//         <div className="container-custom relative z-10">
//           <div className="max-w-5xl mx-auto text-center space-y-6">
//             <h2 className="text-white font-bold tracking-[0.3em] uppercase text-sm">
//               {activeFilter ? getPageTitle() : 'ALL Properties Collection'}
//             </h2>
            
//             <h1 className="text-4xl md:text-7xl font-black text-white tracking-tight animate-slide-up [animation-delay:100ms]">
//               {getPageTitle()}
//             </h1>
            
//             <p className="text-lg md:text-xl text-blue-200 max-w-3xl mx-auto font-medium animate-slide-up [animation-delay:200ms]">
//               {getPageDescription()}
//             </p>

//             {/* Property Stats and Filter Info */}
//             <div className="flex flex-wrap justify-center gap-3 pt-6 animate-slide-up [animation-delay:300ms]">
//               <span className="px-6 py-2 bg-white/10 backdrop-blur-md text-white rounded-full border border-white/10 text-sm font-bold">
//                 {total} Properties
//               </span>
              
//               {!activeFilter && (
//                 <span className="px-6 py-2 bg-green-500/20 backdrop-blur-md text-green-300 rounded-full border border-green-400/30 text-sm font-bold">
//                   🏢 {new Set(allProperties.map(p => p.type)).size} Property Types
//                 </span>
//               )}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Main Content */}
//       <div className="container-custom py-8 sm:py-16">
//         <div className="flex flex-col">
//           {/* View Controls and Filters */}
//           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 sm:mb-10 gap-4 sm:gap-6 bg-white p-4 sm:p-4 rounded-2xl sm:rounded-3xl border border-blue-100 shadow-sm">
//             <div className="flex items-center gap-4 pl-4">
//               <span className="text-black font-bold text-sm uppercase tracking-widest">
//                 {total} Properties 
//               </span>
//             </div>

//             <div className="flex items-center gap-3">
//               {/* View Toggle */}
//               <div className="flex bg-blue-50 p-1 rounded-xl">
//                 <button
//                   type="button"
//                   onClick={() => handleViewChange('grid')}
//                   className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-blue-500' : 'text-blue-400 hover:text-blue-600'}`}
//                 >
//                   <ViewColumnsIcon className="h-5 w-5" />
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => handleViewChange('list')}
//                   className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-blue-500' : 'text-blue-400 hover:text-blue-600'}`}
//                 >
//                   <QueueListIcon className="h-5 w-5" />
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Properties Grid/List */}
//           {filteredProperties.length > 0 ? (
//             <>
//               <div className={`grid gap-8 ${
//                 viewMode === 'grid'
//                   ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'
//                   : 'grid-cols-1'
//               }`}>
//                 {paginatedProperties.map((property, i) => {
//                   const typeInfo = getTypeInfo(property.type);
                  
//                   return (
//                     <div key={`${property.collection}-${property.id}`} className="animate-slide-up" style={{ animationDelay: `${i * 50}ms` }}>
//                       <div className="relative group">
//                         <PropertyCard
//                           property={{
//                             id: String(property.id),
//                             title: property.title || 'Property',
//                             price: property.price ?? 0,
//                             priceLabel: property.status === 'rent' ? 'yearly' : 'total',
//                             image: property.image, // This now exists on NormalizedProperty
//                             location: property.location || `${property.area || ''}${property.city ? ', ' + property.city : ''}`,
//                             beds: property.beds ?? 0,
//                             baths: property.baths ?? 0,
//                             sqft: property.sqft ?? 0,
//                             type: property.type || 'Property',
//                             featured: Boolean(property.featured),
//                             currency: property.currency || 'AED',
//                             status: property.status || 'sale',
//                             area: property.area || undefined,
//                             city: property.city || undefined,
//                             video_url: property.video_url || undefined,
//                             agent_name: property.agent_name || undefined,
//                           } as PropertyCardProperty}
//                         />
                        
//                         {/* ADD VIEW DETAILS BUTTON */}
//                         <button
//                           onClick={() => handleViewDetails(property)}
//                           className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white/90 backdrop-blur-md rounded-xl px-4 py-2 shadow-lg hover:shadow-xl hover:bg-white border border-blue-200 flex items-center gap-2 text-blue-700 hover:text-blue-600 font-bold text-sm z-10"
//                         >
//                           <ArrowsPointingOutIcon className="h-4 w-4" />
//                           View Details
//                         </button>
                        
//                         {/* Property Badges */}
//                         <div className="absolute top-4 left-4 flex flex-col gap-2">
//                           <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold ${typeInfo.color} text-white shadow-lg`}>
//                             {typeInfo.emoji} {typeInfo.label}
//                           </span>
//                           {property.status === 'rent' ? (
//                             <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold bg-green-500 text-white shadow-lg">
//                               🔑 For Rent
//                             </span>
//                           ) : (
//                             <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold bg-blue-500 text-white shadow-lg">
//                               🏠 For Sale
//                             </span>
//                           )}
//                         </div>
//                       </div>
                      
//                       {/* Additional Info */}
//                       <div className="mt-3 flex gap-2">
//                         {property.featured && (
//                           <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
//                             ⭐ Featured
//                           </span>
//                         )}
//                         {property.collection === 'agent_properties' && (
//                           <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
//                             🤝 Agent Property
//                           </span>
//                         )}
//                         {property.agent_name && (
//                           <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
//                             👤 {property.agent_name}
//                           </span>
//                         )}
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>

//               {/* Pagination */}
//               {totalPages > 1 && (
//                 <div className="mt-16 flex items-center justify-center gap-2">
//                   {page > 1 && (
//                     <button
//                       onClick={() => handlePageChange(page - 1)}
//                       className="h-12 w-12 flex items-center justify-center rounded-xl bg-white border border-blue-100 text-blue-600 hover:bg-blue-500 hover:text-white hover:border-blue-500 transition-all font-bold shadow-sm"
//                     >
//                       ←
//                     </button>
//                   )}

//                   {[...Array(totalPages)].map((_, i) => {
//                     const p = i + 1;
//                     if (p === 1 || p === totalPages || (p >= page - 1 && p <= page + 1)) {
//                       return (
//                         <button
//                           key={p}
//                           onClick={() => handlePageChange(p)}
//                           className={`h-12 w-12 flex items-center justify-center rounded-xl font-bold transition-all shadow-sm ${
//                             page === p 
//                               ? 'bg-blue-500 text-white shadow-blue-500/20' 
//                               : 'bg-white border border-blue-100 text-blue-600 hover:bg-blue-50'
//                           }`}
//                         >
//                           {p}
//                         </button>
//                       );
//                     }
//                     if (p === page - 2 || p === page + 2) {
//                       return <span key={p} className="text-blue-300">...</span>;
//                     }
//                     return null;
//                   })}

//                   {page < totalPages && (
//                     <button
//                       onClick={() => handlePageChange(page + 1)}
//                       className="h-12 w-12 flex items-center justify-center rounded-xl bg-white border border-blue-100 text-blue-600 hover:bg-blue-500 hover:text-white hover:border-blue-500 transition-all font-bold shadow-sm"
//                     >
//                       →
//                     </button>
//                   )}
//                 </div>
//               )}
//             </>
//           ) : (
//             <div className="text-center py-32 bg-white rounded-[3rem] border border-blue-100 shadow-sm">
//               <div className="h-24 w-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
//                 <BuildingOfficeIcon className="h-12 w-12 text-blue-300" />
//               </div>
//               <h3 className="text-2xl font-black text-blue-900 mb-2">No properties found</h3>
//               <p className="text-blue-500 font-medium max-w-xs mx-auto">
//                 {activeFilter 
//                   ? `No ${getPageTitle().toLowerCase()} available at the moment.`
//                   : 'No properties available at the moment.'
//                 }
//               </p>
//               {activeFilter && (
//                 <button
//                   onClick={handleClearFilters}
//                   className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
//                 >
//                   View All Properties
//                 </button>
//               )}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Simple CTA Section */}
//       <section className="bg-gradient-to-r from-slate-900 to-slate-800 py-20">
//         <div className="container-custom">
//           <div className="max-w-4xl mx-auto text-center text-white">
//             <h2 className="text-3xl md:text-5xl font-black mb-6">
//               Find Your {getPageTitle()}
//             </h2>
//             <p className="text-lg text-white mb-8 max-w-2xl mx-auto">
//               Browse our collection of premium properties from both our main listings and agent submissions.
//             </p>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

// export default function CommercialPropertiesPage() {
//   return (
//     <Suspense fallback={<div className="p-6">Loading...</div>}>
//       <CommercialPropertiesPageContent />
//     </Suspense>
//   )
// }
// new code
"use client";

import { useState, useEffect, Suspense } from "react";
import { Database } from "@/lib/database.types";
import MortgageCalculator from "@/components/shared/MortgageCalculator";
import PropertyCard, {
  PropertyCardProperty,
} from "@/components/property/PropertyCard";
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
  CalendarDaysIcon,
  ArrowLeftIcon,
  ShareIcon,
  HeartIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";
import {
  StarIcon as StarSolidIcon,
  HeartIcon as HeartSolidIcon,
} from "@heroicons/react/24/solid";
import { 
  StarIcon as StarSolid, 
  BriefcaseIcon,
  CheckBadgeIcon,
} from '@heroicons/react/24/solid';
import { 
  LinkIcon,
  PaperClipIcon
} from '@heroicons/react/24/outline';
import { BathIcon, BedIcon, CarIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

// Firebase imports
import { db } from "@/lib/firebase";
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
} from "firebase/firestore";

// Import jsPDF for PDF generation
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

type Property = Database["public"]["Tables"]["properties"]["Row"];

// Agent Data Interface - EXACT SAME AS LUXE
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

// NormalizedProperty Type - EXACT SAME AS LUXE
type NormalizedProperty = Property & {
  image: string;
  price: number;
  priceLabel?: string;
  area?: string | null;
  city?: string | null;
  location: string;
  beds: number;
  baths: number;
  sqft: number;
  type: string;
  featured: boolean;
  developer?: string | null;
  description?: string | null;
  category?: string | null;
  parking?: string | null;
  furnished?: boolean | null;
  propertyAge?: string | null;
  completion?: string | null;
  subtype?: string | null;
  features?: string[] | null;
  video_url?: string | null;
  currency?: string;
  status?: string;
  agent_name?: string;
  review_status?: string;
  submitted_at?: string;
  collection?: string;
  address?: string;
  property_status?: string;
  property_age?: string;
  images?: string[];
  floorplans?: string[];
  inquiries_count?: number;
  coords?: {
    lat: number;
    lng: number;
  };
  agent_id?: string;
  slug?: string;
  created_at?: string;
  updated_at?: string;
  agent_image?: string;
  agent_office?: string;
  agent_experience?: number;
  agent_properties?: number;
  agent_phone?: string;
  agent_whatsapp?: string;
  views?: number;
};

// Floor Plan Form Component - EXACT SAME AS LUXE
function FloorPlanForm({
  property,
  onClose,
}: {
  property: NormalizedProperty;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: "",
    email: "",
    phoneNumber: "",
    nationality: "",

    // Professional Information
    occupation: "",
    employerCompany: "",
    monthlyIncome: "",

    // Property Interest
    budgetRange: "",
    timeline: "",
    interestedInFinancing: false,
    additionalNotes: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [agentData, setAgentData] = useState<AgentData | null>(null);
  const [agentLoading, setAgentLoading] = useState(true);

  // Property images ko fetch karna
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

  // Agent data fetch karna
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
      // 1. Save to Firebase - floorplan collection
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

      // 2. Generate and download PDF
      generatePDF();

      // 3. Show success message
      setSubmitted(true);

      // Auto close after 3 seconds
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
      // Create PDF with proper font settings
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
        compress: true,
      });

      // IMPORTANT: Set proper font before any text
      // Use standard PDF fonts that support English
      doc.setFont("helvetica");
      doc.setFont("normal");
      doc.setFontSize(12);

      // Page 1: Cover Page
      // Add background color
      doc.setFillColor(25, 50, 120);
      doc.rect(0, 0, 210, 50, "F");

      // White text for header
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(24);
      doc.text("LUXURY PROPERTIES DUBAI", 105, 30, { align: "center" });

      doc.setFontSize(16);
      doc.text("Property Information Package", 105, 45, { align: "center" });

      // Property Title
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(20);
      doc.setFont("helvetica", "bold");
      const propertyTitle = property.title || "Luxury Property";
      const splitTitle = doc.splitTextToSize(propertyTitle, 180);
      doc.text(splitTitle, 105, 80, { align: "center" });

      // Property Type
      doc.setFontSize(14);
      doc.setFont("helvetica", "normal");
      doc.text(`Type: ${property.type || "Property"}`, 105, 95, {
        align: "center",
      });

      // Price Display
      doc.setFontSize(28);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(59, 130, 246);
      doc.text(`AED ${formatPrice(property.price || 0)}`, 105, 120, {
        align: "center",
      });

      // Location
      doc.setFontSize(16);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(0, 0, 0);
      const locationText =
        property.location || property.address || property.area || "Dubai, UAE";
      doc.text(locationText, 105, 140, { align: "center" });

      // Main Property Image
      if (propertyImages.length > 0) {
        try {
          doc.addImage(propertyImages[0], "JPEG", 50, 150, 110, 80);
        } catch (error) {
          console.log("Image loading error:", error);
        }
      }

      // Footer on cover
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text(`Document ID: ${property.id || "N/A"}`, 105, 250, {
        align: "center",
      });
      doc.text(
        `Generated: ${new Date().toLocaleDateString("en-US")}`,
        105, 260,
        { align: "center" }
      );

      // Page 2: Property Details
      doc.addPage();

      // Header
      doc.setFillColor(59, 130, 246);
      doc.rect(0, 0, 210, 30, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(18);
      doc.setFont("helvetica", "bold");
      doc.text("PROPERTY DETAILS", 105, 20, { align: "center" });

      // Key Statistics - Using proper English labels
      const detailsY = 50;
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");

      // Create a clean table for property details
      const propertyDetails = [
        { label: "PROPERTY TYPE", value: property.type || "Not specified" },
        { label: "STATUS", value: property.property_status || "Ready" },
        { label: "PRICE", value: `AED ${formatPrice(property.price || 0)}` },
        { label: "BEDROOMS", value: property.beds || 0 },
        { label: "BATHROOMS", value: property.baths || 0 },
        {
          label: "TOTAL AREA",
          value: `${formatNumber(property.sqft || 0)} sqft`,
        },
        { label: "VIEWS", value: property.views || 0 },
        { label: "DEVELOPER", value: property.developer || "Not specified" },
        { label: "CITY", value: property.city || "Dubai" },
        { label: "AREA", value: property.area || "Not specified" },
        { label: "PARKING", value: property.parking || "Available" },
        { label: "FURNISHED", value: property.furnished ? "Yes" : "No" },
        { label: "PROPERTY AGE", value: property.property_age || "N/A" },
        { label: "CATEGORY", value: property.category || "Commercial" },
      ];

      // Display details in two columns
      let yPos = detailsY;
      propertyDetails.forEach((detail, index) => {
        const column = index < 7 ? 0 : 1;
        const row = index % 7;
        const x = 20 + column * 85;
        const y = detailsY + row * 20;

        // Label
        doc.setFontSize(10);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(100, 100, 100);
        doc.text(detail.label + ":", x, y);

        // Value
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(0, 0, 0);
        doc.text(String(detail.value), x + 40, y);
      });

      // Features Section
      const featuresY = detailsY + 150;
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(59, 130, 246);
      doc.text("FEATURES & AMENITIES", 20, featuresY);

      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(0, 0, 0);

      if (property.features && property.features.length > 0) {
        let featureY = featuresY + 15;
        property.features.forEach((feature, index) => {
          if (featureY > 280) {
            doc.addPage();
            featureY = 20;
          }

          const bulletX = 20;
          const textX = 25;

          // Bullet point
          doc.setFillColor(59, 130, 246);
          doc.circle(bulletX, featureY - 2, 1.5, "F");

          // Feature text
          doc.text(feature, textX, featureY);
          featureY += 8;
        });
      } else {
        doc.text("No features listed", 20, featuresY + 15);
      }

      // Page 3: Description & More Images
      doc.addPage();

      // Header
      doc.setFillColor(59, 130, 246);
      doc.rect(0, 0, 210, 30, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(18);
      doc.setFont("helvetica", "bold");
      doc.text("DESCRIPTION & IMAGES", 105, 20, { align: "center" });

      // Description
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text("Property Description:", 20, 50);

      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      const description =
        property.description ||
        "Experience unparalleled commercial space in this premium property located in the heart of Dubai. " +
          "This exquisite commercial property offers strategic location advantages, combining modern infrastructure with business-friendly amenities. " +
          "Perfect for businesses seeking premium office space and exceptional quality.";

      const splitDesc = doc.splitTextToSize(description, 170);
      doc.text(splitDesc, 20, 60);

      // Additional Images
      const imagesStartY = 60 + splitDesc.length * 5 + 20;

      if (propertyImages.length > 1) {
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.text("Additional Images:", 20, imagesStartY);

        // Show up to 3 more images
        const additionalImages = propertyImages.slice(1, 4);
        additionalImages.forEach((img, index) => {
          const y = imagesStartY + 10 + index * 60;
          try {
            doc.addImage(img, "JPEG", 20, y, 80, 50);
            doc.setFontSize(8);
            doc.setTextColor(100, 100, 100);
            doc.text(`Image ${index + 2}`, 60, y + 55, { align: "center" });
          } catch (error) {
            // Skip if image fails to load
          }
        });
      }

      // Page 4: Location & Agent Information
      doc.addPage();

      // Header
      doc.setFillColor(59, 130, 246);
      doc.rect(0, 0, 210, 30, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(18);
      doc.setFont("helvetica", "bold");
      doc.text("LOCATION & AGENT INFO", 105, 20, { align: "center" });

      // Location Details
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text("Location Details:", 20, 50);

      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");

      const locationDetails = [
        `Address: ${property.address || property.location || "Not specified"}`,
        `Area: ${property.area || "Not specified"}`,
        `City: ${property.city || "Dubai"}`,
        property.coords
          ? `Coordinates: ${property.coords.lat.toFixed(
              4
            )}, ${property.coords.lng.toFixed(4)}`
          : "",
      ].filter(Boolean);

      locationDetails.forEach((detail, index) => {
        doc.text(detail, 20, 60 + index * 10);
      });

      // Agent Information
      const agentY = 100;
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text("Agent Information:", 20, agentY);

      const agentInfo = [
        `Name: ${agentData?.title || property.agent_name || "Sarah Ahmed"}`,
        `Office: ${
          agentData?.office
            ? agentData.office.toUpperCase() + " OFFICE"
            : "DUBAI OFFICE"
        }`,
        `Experience: ${agentData?.experience_years || 5}+ Years`,
        `Properties Sold: ${agentData?.total_sales || 11}+`,
        `Rating: ${
          agentData?.rating ? agentData.rating.toFixed(1) : "4.5"
        }/5.0`,
        `Contact: ${agentData?.whatsapp || "Available on request"}`,
      ];

      agentInfo.forEach((info, index) => {
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.text(info, 20, agentY + 15 + index * 10);
      });

      // Page 5: User Information
      doc.addPage();

      // Header
      doc.setFillColor(59, 130, 246);
      doc.rect(0, 0, 210, 30, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(18);
      doc.setFont("helvetica", "bold");
      doc.text("REQUEST INFORMATION", 105, 20, { align: "center" });

      // User Details
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text("Personal Information:", 20, 50);

      const userDetails = [
        `Full Name: ${formData.fullName || "Not provided"}`,
        `Email: ${formData.email || "Not provided"}`,
        `Phone: ${formData.phoneNumber || "Not provided"}`,
        `Nationality: ${formData.nationality || "Not provided"}`,
        `Occupation: ${formData.occupation || "Not provided"}`,
        `Employer: ${formData.employerCompany || "Not provided"}`,
        `Monthly Income: ${
          formData.monthlyIncome
            ? `AED ${formData.monthlyIncome}`
            : "Not specified"
        }`,
      ];

      userDetails.forEach((detail, index) => {
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.text(detail, 20, 60 + index * 10);
      });

      // Property Interest
      const interestY = 60 + userDetails.length * 10 + 20;
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text("Property Interest Details:", 20, interestY);

      const interestDetails = [
        `Budget Range: ${formData.budgetRange || "Not specified"}`,
        `Timeline: ${formData.timeline || "Not specified"}`,
        `Financing Interest: ${formData.interestedInFinancing ? "Yes" : "No"}`,
        `Additional Notes: ${formData.additionalNotes || "None"}`,
        `Request Date: ${new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}`,
        `Request Time: ${new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        })}`,
      ];

      interestDetails.forEach((detail, index) => {
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        const splitDetail = doc.splitTextToSize(detail, 170);
        doc.text(splitDetail, 20, interestY + 15 + index * 15);
      });

      // Footer
      doc.setFontSize(8);
      doc.setTextColor(100, 100, 100);
      doc.text("Confidential Document - For Internal Use Only", 105, 280, {
        align: "center",
      });
      doc.text("Commercial Properties Dubai © All rights reserved", 105, 285, {
        align: "center",
      });

      // Add page numbers
      const totalPages = doc.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(150, 150, 150);
        doc.text(`Page ${i} of ${totalPages}`, 190, 290, { align: "right" });
      }

      // Save the PDF
      const fileName = `Property_Details_${
        property.title?.replace(/[^a-z0-9]/gi, "_") || "property"
      }_${Date.now()}.pdf`;
      doc.save(fileName);

      console.log("✅ PDF generated successfully with proper English text!");
    } catch (error) {
      console.error("❌ Error generating PDF:", error);
      alert("Error generating PDF. Please try again.");
    }
  };
  
  const budgetOptions = [
    "Select budget range",
    "Under 1,000,000 AED",
    "1,000,000 - 2,000,000 AED",
    "2,000,000 - 5,000,000 AED",
    "5,000,000 - 10,000,000 AED",
    "10,000,000 - 20,000,000 AED",
    "20,000,000+ AED",
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
              Your floor plan request has been submitted. The PDF is downloading
              now. Our team will contact you shortly with the detailed floor
              plans.
            </p>
            <div className="text-sm text-gray-500">
              Closing automatically in 3 seconds...
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] bg-black/50 overflow-y-auto p-4">
      <div className="min-h-full flex items-center justify-center py-8">
        <div className="bg-white rounded-3xl max-w-4xl w-full">
          {/* Header */}
          <div className="border-b border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-black text-gray-900">
                  Download Floor Plan
                </h3>
                <p className="text-gray-600">
                  Fill out the form below to download detailed floor plans
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

          {/* Property Info */}
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
                  AED {formatPrice(property.price || 0)}
                </div>
                <div className="text-gray-600">
                  {property.type} • {property.beds} Beds • {property.baths}{" "}
                  Baths
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="p-6 max-h-[70vh] overflow-y-auto"
          >
            <div className="space-y-8">
              {/* Personal Information Section */}
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

              {/* Professional Information Section */}
              <div>
                <h4 className="text-xl font-black text-gray-900 mb-6 pb-2 border-b border-gray-200">
                  <span className="text-blue-600">2.</span> Professional
                  Information
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

              {/* Property Interest Section */}
              <div>
                <h4 className="text-xl font-black text-gray-900 mb-6 pb-2 border-b border-gray-200">
                  <span className="text-blue-600">3.</span> Property Interest
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Budget Range
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
                      Timeline
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
                      Interested in financing/mortgage options
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
                    placeholder="Any additional information or specific requirements..."
                  />
                </div>
              </div>

              {/* Submit Button */}
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
                        Download Floor Plan & Submit Information
                      </>
                    )}
                  </button>
                </div>
                <p className="text-gray-500 text-sm mt-4">
                  By submitting, you agree to receive the floor plan PDF and
                  allow our team to contact you regarding this property. Your
                  information will be stored securely in our database.
                </p>
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

  // Helper function to get WhatsApp URL
  const getWhatsAppUrl = (whatsapp: string | null): string => {
    if (!whatsapp) return '#';
    
    const cleanedNumber = whatsapp.replace(/\D/g, '');
    const finalNumber = cleanedNumber.startsWith('0') ? cleanedNumber.substring(1) : cleanedNumber;
    
    return `https://wa.me/971${finalNumber}`;
  };

  // Helper function to format date
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
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/90 backdrop-blur-md rounded-full text-slate-700 hover:text-primary hover:bg-white transition-all shadow-lg"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>

        {/* Modal Content */}
        <div className="p-0">
          {/* Header with Image */}
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
            
            {/* Agent Title */}
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

          {/* Main Content */}
          <div className="p-6 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Contact & Basic Info */}
              <div className="lg:col-span-1 space-y-6">
                {/* Contact Information */}
                <div className="bg-slate-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-secondary mb-4 flex items-center gap-2">
                    <PhoneIcon className="w-5 h-5 text-primary" />
                    Contact Information
                  </h3>
                  
                  <div className="space-y-4">
                    {/* WhatsApp */}
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

                    {/* Telegram */}
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

                    {/* LinkedIn */}
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

                    {/* Website */}
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

                    {/* Instagram */}
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

                {/* Basic Info */}
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

              {/* Right Column - Detailed Information */}
              <div className="lg:col-span-2 space-y-8">
                {/* Rating & Reviews */}
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
                          {agentData?.approved ? 'Approved by RAGDOLL PROPERTY' : 'Pending Approval'}
                        </span>
                      </span>
                    </div>
                  </div>

                  {/* Bio */}
                  {agentData?.bio && (
                    <div className="mt-6">
                      <h4 className="font-semibold text-secondary mb-2">About Me</h4>
                      <p className="text-slate-600 leading-relaxed">{agentData.bio}</p>
                    </div>
                  )}
                </div>

                {/* Specializations & Areas */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Specializations */}
                  <div className="bg-white border border-slate-200 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-secondary mb-4 flex items-center gap-2">
                      <BriefcaseIcon className="w-5 h-5 text-primary" />
                      Specializations
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {(agentData?.specializations || ['Commercial Properties', 'Office Spaces', 'Retail']).map((spec: string, idx: number) => (
                        <span 
                          key={idx} 
                          className="px-3 py-1.5 bg-primary/10 text-primary text-sm font-semibold rounded-full"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Areas */}
                  <div className="bg-white border border-slate-200 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-secondary mb-4 flex items-center gap-2">
                      <MapPinIcon className="w-5 h-5 text-primary" />
                      Areas Covered
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {(agentData?.areas || ['Dubai Marina', 'Downtown Dubai', 'Business Bay']).map((area: string, idx: number) => (
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

                {/* Languages & Certifications */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Languages */}
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

                  {/* Certifications */}
                  <div className="bg-white border border-slate-200 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-secondary mb-4 flex items-center gap-2">
                      <CheckBadgeIcon className="w-5 h-5 text-primary" />
                      Certifications
                    </h3>
                    <div className="space-y-3">
                      {(agentData?.certifications || ['RERA Certified', 'Commercial Broker License']).map((cert: string, idx: number) => (
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

                {/* Additional Info */}
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
                        {agentData?.approved ? 'Active & Approved' : 'Pending Approval'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
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

// ViewDetailsModal Component - EXACT SAME AS LUXE
function ViewDetailsModal({
  property,
  onClose,
}: {
  property: NormalizedProperty | null;
  onClose: () => void;
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

  // NEW STATES FOR AGENT POPUP
  const [showAgentPopup, setShowAgentPopup] = useState(false);
  const [agentPopupData, setAgentPopupData] = useState<AgentData | null>(null);
  const [agentPopupLoading, setAgentPopupLoading] = useState(false);

  // Fetch agent data from Firebase
useEffect(() => {
  async function fetchAgentData() {
    try {
      setAgentLoading(true);
      console.log("Fetching agent data...");

      // Pehle property se agent_id check karen - SAFE CHECK
      const agentId = property?.agent_id;

      if (agentId) {
        // Direct agent_id se fetch karen
        const agentDocRef = doc(db, "agents", agentId);
        const agentDoc = await getDoc(agentDocRef);

        if (agentDoc.exists()) {
          const data = agentDoc.data() as AgentData;
          console.log("Agent data found by ID:", data);
          setAgentData(data);
          setAgentLoading(false);
          return;
        }
      }

      // Agar agent_id nahi hai ya agent nahi mila, toh agent_name se search karen
      const agentName = property?.agent_name;
      if (agentName) {
        console.log("Searching agent by name:", agentName);
        const agentsRef = collection(db, "agents");
        const q = query(agentsRef, where("title", "==", agentName));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0];
          const data = doc.data() as AgentData;
          console.log("Agent found by name:", data);
          setAgentData(data);
        } else {
          // Default data agar koi agent na mile
          console.log("No agent found, using default data");
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
        // Agar agent_name bhi nahi hai
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
      // Fallback data
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

  // Only fetch if property exists
  if (property) {
    fetchAgentData();
  }
}, [property]);

  // AGENT POPUP FUNCTION - REAL-TIME FIREBASE DATA FETCH
  const openAgentPopup = async () => {
    try {
      setAgentPopupLoading(true);
      
      // Agar agent_id hai to direct fetch karein
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
      
      // Agar agent_id nahi hai to agent_name se search karein
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
      
      // Agar koi bhi agent data nahi mila to existing agentData use karein
      if (agentData) {
        setAgentPopupData(agentData);
        setShowAgentPopup(true);
        document.body.style.overflow = 'hidden';
        setAgentPopupLoading(false);
        return;
      }
      
      // Agar koi bhi data nahi mila
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
      // Fallback data
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

  // Close agent popup
  const closeAgentPopup = () => {
    setShowAgentPopup(false);
    setAgentPopupData(null);
    document.body.style.overflow = 'auto';
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US").format(price);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-US").format(num);
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

  // Calculate mortgage
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
      {/* Floor Plan Form Modal */}
      {showFloorPlanForm && (
        <FloorPlanForm
          property={property}
          onClose={() => setShowFloorPlanForm(false)}
        />
      )}

      {/* Agent Popup Modal */}
      {showAgentPopup && agentPopupData && (
        <AgentPopupModal
          agentData={agentPopupData}
          isOpen={showAgentPopup}
          onClose={closeAgentPopup}
        />
      )}

      <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
        {/* Top Header Bar */}
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

        {/* Main Content - Full Screen */}
        <div className="container-custom pt-8 pb-12 mt-25">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-8 space-y-12">
              {/* Image Gallery */}
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

                  {/* Status Badges - TOP LEFT */}
                  <div className="absolute top-4 left-4 right-4 flex justify-between">
                    {/* Left side - Status badges */}
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

                    {/* Right side - Image counter */}
                    <div className="absolute top-2 right-4 px-3 py-1 bg-black/50 text-white text-sm rounded-full flex items-center gap-1 z-20">
                      <PhotoIcon className="w-4 h-4" />
                      {currentImageIndex + 1} / {propertyImages.length}
                    </div>
                  </div>

                  {/* Image Navigation */}
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

                {/* Thumbnail Gallery */}
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

              {/* Property Details Card */}
              <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-100">
                <div className="space-y-10">
                  {/* Header Info */}
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="px-4 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em] rounded-full">
                          {property.type || "COMMERCIAL"}
                        </span>
                        <span className="px-4 py-1 bg-slate-100 text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] rounded-full">
                          {property.property_status || "READY"}
                        </span>
                      </div>
                      <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                        {property.title || "Premium Commercial Space in Dubai"}
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
                        PRICE
                      </div>
                      <div className="text-4xl md:text-5xl font-black text-primary">
                        AED {formatPrice(property.price || 0)}
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

                  {/* Description */}
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
                          "Experience unparalleled commercial space in this premium property located in the heart of Dubai. This exquisite commercial property offers strategic location advantages, combining modern infrastructure with business-friendly amenities. Perfect for businesses seeking premium office space and exceptional quality."}
                      </p>
                    </div>
                  </div>

                  {/* Features */}
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

                  {/* Property Details Table */}
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
                              {property.type || "Commercial"}
                            </div>
                          </div>
                          <div>
                            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
                              AREA
                            </div>
                            <div className="text-2xl font-black text-slate-900">
                              {property.area || "Downtown Dubai"}
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

                  {/* Map Location */}
                  <div className="space-y-6 pt-10 border-t border-slate-100">
                    <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                      <span className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                        <MapPinIcon className="w-5 h-5" />
                      </span>
                      Location Map
                    </h2>
                    {/* Google Maps Container */}
                    <div className="bg-gray-100 rounded-[2.5rem] h-[500px] overflow-hidden border border-slate-100 shadow-xl shadow-slate-200/50 relative">
                      {/* Map iframe */}
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

                        {/* Map Pin Overlay */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                          <div className="flex flex-col items-center">
                            {/* Pin Icon */}
                            <div className="relative">
                              <div className="h-16 w-16 rounded-full bg-red-500 flex items-center justify-center shadow-xl animate-pulse">
                                <MapPinIcon className="h-8 w-8 text-white" />
                              </div>
                              {/* Pin Tail */}
                              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-2 w-4 h-4 bg-red-500 rotate-45"></div>
                            </div>

                            {/* Location Info Card */}
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
                                  : "Downtown Dubai, Dubai, United Arab Emirates"}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Location Address Display */}
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
                              property.area || "Oud Maitha Road, Al Jaddaf"
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

                  {/* Download Resources */}
                  <div className="space-y-6 pt-10 border-t border-slate-100">
                    <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                      <span className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                        <DocumentTextIcon className="w-5 h-5" />
                      </span>
                      Download Resources
                    </h2>
                    <p className="text-slate-600 text-lg">
                      Get detailed information about this property. Fill out the
                      form to download floor plans and brochures.
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
                              Floor Plan
                            </h3>
                            <p className="text-sm text-slate-600 group-hover:text-white/80">
                              Detailed layout and dimensions
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
                                Brochure
                              </h3>
                              <p className="text-sm text-slate-600 group-hover:text-white/80">
                                Complete property information
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

            {/* Sidebar */}
            <aside className="lg:col-span-4 space-y-8">
              <div className="sticky top-32 space-y-8">
                {/* Agent Card */}
                <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden relative">
                  <div className="absolute top-0 left-0 w-full h-2 bg-primary" />
                  <div className="text-center space-y-6">
                    {agentLoading ? (
                      // Loading Skeleton
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
                              : "DUBAI DOWNTOWN OFFICE"}
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

                    {/* View Profile Button */}
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

                {/* Quick Inquiry Form */}
                <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-slate-900/20 relative overflow-hidden">
                  <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
                  <div className="relative z-10 space-y-6">
                    <h3 className="text-2xl font-black tracking-tight">
                      Interested?
                    </h3>
                    <p className="text-slate-400 text-sm font-medium leading-relaxed">
                      Fill out the form below and our team will contact you
                      shortly.
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
                      <Link
                        href="/customer/login"
                        className="w-[50px] bg-primary hover:bg-primary/90 text-white py-5 px-5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-primary/20"
                      >
                        Send Inquiry
                      </Link>
                    </form>
                  </div>
                </div>

                {/* Mortgage Calculator */}
                <MortgageCalculator defaultPrice={property.price} />
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}

// Function to fetch property details by ID from specific collection
async function fetchPropertyDetails(
  propertyId: string,
  collectionName: string
): Promise<Record<string, any> | null> {
  try {
    console.log(
      `📋 Fetching details for property ${propertyId} from ${collectionName}...`
    );

    const docRef = doc(db, collectionName, propertyId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      console.log(`✅ Found property details:`, {
        title: data.title,
        collection: collectionName,
      });

      return {
        id: docSnap.id,
        collection: collectionName,
        ...data,
      };
    } else {
      console.log(
        `❌ No property found with ID: ${propertyId} in ${collectionName}`
      );
      return null;
    }
  } catch (error) {
    console.error(
      `❌ Error fetching property details from ${collectionName}:`,
      error
    );
    return null;
  }
}

// Function to fetch ALL properties from 'properties' collection
async function fetchPropertiesFromMainCollection() {
  try {
    console.log("🔥 Fetching ALL properties from main collection...");
    const propertiesRef = collection(db, "properties");

    const q = query(propertiesRef, orderBy("updated_at", "desc"));

    const querySnapshot = await getDocs(q);
    console.log(
      `✅ Main Collection: Found ${querySnapshot.size} ALL properties`
    );

    const properties: any[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      properties.push({
        id: doc.id,
        collection: "properties",
        ...data,
      });
    });

    return properties;
  } catch (error: any) {
    console.error(
      "❌ Error fetching properties from main collection:",
      error.message
    );
    return [];
  }
}

// Function to fetch ALL properties from 'agent_properties' collection
async function fetchPropertiesFromAgentCollection() {
  try {
    console.log(
      "🔥 Fetching ALL properties from agent_properties collection..."
    );
    const agentPropertiesRef = collection(db, "agent_properties");

    const q = query(
      agentPropertiesRef,
      where("review_status", "==", "published")
    );

    const querySnapshot = await getDocs(q);
    console.log(
      `✅ Agent Collection: Found ${querySnapshot.size} ALL properties`
    );

    const properties: any[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      properties.push({
        id: doc.id,
        collection: "agent_properties",
        ...data,
      });
    });

    return properties;
  } catch (error: any) {
    console.error(
      "❌ Error fetching properties from agent collection:",
      error.message
    );
    return [];
  }
}

// Main function to fetch all properties from both collections
async function fetchAllProperties() {
  try {
    console.log("🔄 Fetching ALL properties from ALL collections...");

    const [mainProperties, agentProperties] = await Promise.all([
      fetchPropertiesFromMainCollection(),
      fetchPropertiesFromAgentCollection(),
    ]);

    console.log(
      `📊 Results: ${mainProperties.length} from main, ${agentProperties.length} from agent`
    );

    const allProperties = [...mainProperties, ...agentProperties];
    console.log(`✅ Total ALL properties found: ${allProperties.length}`);

    return allProperties;
  } catch (error) {
    console.error("❌ Error in fetchAllProperties:", error);
    return [];
  }
}

// Function to get property type display name and emoji
function getTypeInfo(type: string) {
  const typeMap: Record<
    string,
    { label: string; emoji: string; color: string }
  > = {
    apartment: { label: "Apartment", emoji: "🏢", color: "bg-purple-500" },
    villa: { label: "Villa", emoji: "🏰", color: "bg-amber-500" },
    townhouse: { label: "Townhouse", emoji: "🏘️", color: "bg-teal-500" },
    commercial: { label: "Commercial", emoji: "🏪", color: "bg-blue-500" },
    plot: { label: "Plot", emoji: "📐", color: "bg-green-500" },
    "furnished-studio": {
      label: "Furnished Studio",
      emoji: "🏠",
      color: "bg-pink-500",
    },
    "residential-plot": {
      label: "Residential Plot",
      emoji: "🏡",
      color: "bg-green-600",
    },
    "industrial-plot": {
      label: "Industrial Plot",
      emoji: "🏭",
      color: "bg-gray-500",
    },
  };

  return typeMap[type] || { label: type, emoji: "🏠", color: "bg-gray-500" };
}

function CommercialPropertiesPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // State for properties
  const [allProperties, setAllProperties] = useState<NormalizedProperty[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<
    NormalizedProperty[]
  >([]);
  const [loading, setLoading] = useState(true);

  // ADD THESE STATES FOR MODAL
  const [selectedProperty, setSelectedProperty] =
    useState<NormalizedProperty | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Get URL parameters
  const viewMode = searchParams.get("view") === "list" ? "list" : "grid";
  const category = searchParams.get("category");
  const feature = searchParams.get("feature");
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = 20;

  // Determine active filter from URL
  const activeFilter = feature || category;

  // Handle View Details Click
  const handleViewDetails = async (property: NormalizedProperty) => {
    try {
      console.log(
        `🔄 Loading details for property: ${property.id} from ${property.collection}`
      );

      // Fetch complete details from Firebase
      const detailedProperty = await fetchPropertyDetails(
        property.id,
        property.collection || "properties"
      );

      if (detailedProperty) {
        // Normalize the detailed property with agent data
        const normalized = {
          ...detailedProperty,
          image:
            property.image ||
            detailedProperty.images?.[0] ||
            detailedProperty.image_url ||
            "",
          price: detailedProperty.price || 0,
          priceLabel: detailedProperty.status === "rent" ? "yearly" : "total",
          area:
            detailedProperty.area ||
            detailedProperty.location ||
            detailedProperty.address ||
            "Dubai",
          city: detailedProperty.city || "Dubai",
          location:
            detailedProperty.address ||
            detailedProperty.area ||
            detailedProperty.city ||
            "Dubai",
          beds: detailedProperty.beds || 0,
          baths: detailedProperty.baths || 0,
          sqft: detailedProperty.sqft || 0,
          type: detailedProperty.type || detailedProperty.subtype || "Property",
          developer: detailedProperty.developer || null,
          featured: Boolean(detailedProperty.featured),
          category: detailedProperty.category || null,
          parking: detailedProperty.parking || null,
          propertyAge:
            detailedProperty.property_age ||
            detailedProperty.propertyAge ||
            null,
          completion:
            detailedProperty.completion ||
            detailedProperty.property_status ||
            "ready",
          subtype: detailedProperty.subtype || null,
          description: detailedProperty.description || null,
          features: Array.isArray(detailedProperty.features)
            ? detailedProperty.features
            : [],
          video_url: detailedProperty.video_url || null,
          currency: detailedProperty.currency || "AED",
          status: detailedProperty.status || "sale",
          agent_name: detailedProperty.agent_name || "Sarah Ahmed",
          review_status: detailedProperty.review_status || null,
          submitted_at: detailedProperty.submitted_at || null,
          collection: detailedProperty.collection || "properties",
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
          agent_image:
            detailedProperty.profile_image ||
            "https://img.freepik.com/free-photo/blond-businessman-happy-expression_1194-3866.jpg",
          agent_office: detailedProperty.office || "DUBAI DOWNTOWN OFFICE",
          agent_experience: detailedProperty.experience_years || 8,
          agent_properties: detailedProperty.total_sales || 150,
          agent_phone: detailedProperty.phone || "03291082882",
          agent_whatsapp: detailedProperty.whatsapp || "03291082882",
          views: detailedProperty.views || 1250,
        };

        setSelectedProperty(normalized as NormalizedProperty);
        setIsModalOpen(true);
        console.log("✅ Property details loaded successfully");
      } else {
        console.log("⚠️ Using cached property data");
        setSelectedProperty(property);
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error("❌ Error loading property details:", error);
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
      console.log("🔄 Loading ALL properties...");
      const properties = await fetchAllProperties();

      const normalized = properties.map((p: any) => {
        // Get first image
        let imageUrl =
          "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&auto=format&fit=crop";

        if (p.images && Array.isArray(p.images) && p.images.length > 0) {
          imageUrl = p.images[0];
        } else if (p.image) {
          imageUrl = p.image;
        } else if (p.image_url) {
          imageUrl = p.image_url;
        }

        const price =
          typeof p.price === "string" ? parseFloat(p.price) : p.price ?? 0;
        const location = p.location || p.address || p.area || p.city || "Dubai";
        const propertyArea =
          p.area ||
          p.location ||
          p.address ||
          p.neighborhood ||
          p.district ||
          "Dubai";
        const priceLabel = p.status === "rent" ? "yearly" : "total";

        let featuresArray: string[] = [];
        if (Array.isArray(p.features)) {
          featuresArray = p.features;
        } else if (typeof p.features === "string") {
          featuresArray = p.features.split(",").map((f: string) => f.trim());
        }

        return {
          ...p,
          image: imageUrl,
          price: price,
          priceLabel: priceLabel,
          area: propertyArea,
          city: p.city || "Dubai",
          location: location,
          beds: p.beds ?? 0,
          baths: p.baths ?? 0,
          sqft: p.sqft ?? 0,
          type: p.type || "commercial",
          developer:
            p.developer ||
            (p.developers?.name ? p.developers.name : null) ||
            p.developer_id ||
            null,
          featured: Boolean(p.featured),
          category: p.category || null,
          parking: p.parking || null,
          propertyAge: p.property_age || p.propertyAge || null,
          completion: p.completion || p.property_status || "ready",
          subtype: p.subtype || null,
          description: p.description || null,
          features: featuresArray,
          video_url: p.video_url || null,
          currency: p.currency || "AED",
          status: p.status || "sale",
          agent_name: p.agent_name || "Sarah Ahmed",
          review_status: p.review_status || null,
          submitted_at: p.submitted_at || null,
          collection: p.collection || "properties",
          agent_image:
            p.profile_image ||
            "https://img.freepik.com/free-photo/blond-businessman-happy-expression_1194-3866.jpg",
          agent_office: p.office || "DUBAI DOWNTOWN OFFICE",
          agent_experience: p.experience_years || 8,
          agent_properties: p.total_sales || 150,
          agent_phone: p.phone || "03291082882",
          agent_whatsapp: p.whatsapp || "03291082882",
          views: p.views || 1250,
        };
      });

      console.log(`✅ Normalized ${normalized.length} ALL properties`);
      console.log("📊 Property types found:", [
        ...new Set(normalized.map((p) => p.type)),
      ]);
      setAllProperties(normalized);
      setLoading(false);
    }

    loadProperties();
  }, []);

  // Filter properties based on URL params
  useEffect(() => {
    if (allProperties.length === 0) return;

    let filtered = [...allProperties];

    // Filter by feature (property type)
    if (feature) {
      console.log(`🔍 Filtering by feature: ${feature}`);

      // Map URL features to property types
      const featureToTypeMap: Record<string, string[]> = {
        townhouse: ["townhouse"],
        villas: ["villa"],
        apartments: ["apartment"],
        commercial: ["commercial"],
        plots: ["plot", "residential-plot", "industrial-plot"],
        studios: ["furnished-studio"],
      };

      const typesToFilter = featureToTypeMap[feature] || [feature];
      filtered = filtered.filter((p) => typesToFilter.includes(p.type));

      console.log(
        `📊 Found ${filtered.length} properties of type: ${typesToFilter.join(
          ", "
        )}`
      );
    }

    // Filter by category (commercial)
    if (category === "commercial") {
      filtered = filtered.filter((p) => p.type === "commercial");
    }

    setFilteredProperties(filtered);
  }, [allProperties, category, feature]);

  // Handle view change
  const handleViewChange = (view: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("view", view);
    params.set("page", "1");
    router.push(`/commercial-properties?${params.toString()}`);
  };

  // Handle page change
  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`/commercial-properties?${params.toString()}`);
  };

  // Handle filter click
  const handleFilterClick = (filterType: string, filterValue: string) => {
    const params = new URLSearchParams();
    if (filterType === "category") {
      params.set("category", filterValue);
    } else if (filterType === "feature") {
      params.set("feature", filterValue);
    }
    params.set("view", viewMode);
    params.set("page", "1");
    router.push(`/commercial-properties?${params.toString()}`);
  };

  // Clear all filters
  const handleClearFilters = () => {
    const params = new URLSearchParams();
    params.set("view", viewMode);
    router.push(`/commercial-properties?${params.toString()}`);
  };

  // Pagination calculations
  const total = filteredProperties.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const offset = (Math.max(page, 1) - 1) * limit;
  const paginatedProperties = filteredProperties.slice(offset, offset + limit);

  // Get page title based on filter
  const getPageTitle = () => {
    if (feature === "townhouse") return "Townhouses";
    if (feature === "villas") return "Villas";
    if (feature === "apartments") return "Apartments";
    if (feature === "commercial") return "Commercial Properties";
    if (feature === "plots") return "Plots & Land";
    if (feature === "studios") return "Furnished Studios";
    if (category === "commercial") return "Commercial Properties";
    return "Premium Commercial Properties";
  };

  // Get page description based on filter
  const getPageDescription = () => {
    if (feature === "townhouse")
      return "Discover premium townhouses in Dubai with modern amenities and prime locations.";
    if (feature === "villas")
      return "Explore luxurious villas with private amenities and exclusive community access.";
    if (feature === "apartments")
      return "Find modern apartments with stunning views and convenient locations.";
    if (feature === "commercial")
      return "Commercial spaces for businesses seeking prime locations in Dubai.";
    if (feature === "plots")
      return "Available plots and land for residential and commercial development.";
    if (feature === "studios")
      return "Fully furnished studios with all amenities included for comfortable living.";
    if (category === "commercial")
      return "Exclusive collection of commercial properties for discerning businesses.";
    return "Discover Dubai's finest collection of commercial properties - Offices, Retail spaces, Warehouses and more.";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-primary font-medium">Loading properties...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-white">
      {/* View Details Modal - ALL SECTIONS VISIBLE */}
      {isModalOpen && selectedProperty && (
        <ViewDetailsModal
          property={selectedProperty}
          onClose={closeDetailsModal}
        />
      )}

      {/* Hero Section - COMMERCIAL SPECIFIC */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 opacity-10">
          <img
            src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1600&q=80"
            alt="Commercial Property"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-slate-900/80 to-slate-900" />

        <div className="container-custom relative z-10">
          <div className="max-w-5xl mx-auto text-center space-y-6">
            <h2 className="text-white font-bold tracking-[0.3em] uppercase text-sm">
              {activeFilter ? getPageTitle() : "Commercial Properties Collection"}
            </h2>

            <h1 className="text-4xl md:text-7xl font-black text-white tracking-tight animate-slide-up [animation-delay:100ms]">
              {getPageTitle()}
            </h1>

            <p className="text-lg md:text-xl text-white max-w-3xl mx-auto font-medium animate-slide-up [animation-delay:200ms]">
              {getPageDescription()}
            </p>

            {/* Property Stats and Filter Info */}
            <div className="flex flex-wrap justify-center gap-3 pt-6 animate-slide-up [animation-delay:300ms]">
              <span className="px-6 py-2 bg-white/10 backdrop-blur-md text-white rounded-full border border-white/10 text-sm font-bold">
                {total} Properties
              </span>

              {activeFilter && (
                <button
                  onClick={handleClearFilters}
                  className="px-6 py-2 bg-red-500/20 backdrop-blur-md text-red-300 rounded-full border border-red-400/30 text-sm font-bold hover:bg-red-500/30 transition-colors"
                >
                  ✕ Clear Filter
                </button>
              )}

              {!activeFilter && (
                <span className="px-6 py-2 bg-green-500/20 backdrop-blur-md text-green-300 rounded-full border border-green-400/30 text-sm font-bold">
                  🏢 {new Set(allProperties.map((p) => p.type)).size} Property
                  Types
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Breadcrumbs & Navigation */}
      <div className="bg-white border-b border-slate-100 sticky top-20 z-30">
        <div className="container-custom py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <nav className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400">
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <span className="text-slate-200">/</span>
              <Link
                href="/properties"
                className="hover:text-primary transition-colors"
              >
                Properties
              </Link>
              <span className="text-slate-200">/</span>
              <span className="text-slate-900 truncate max-w-[200px]">
                Commercial Properties
              </span>
            </nav>

            <div className="flex items-center gap-3">
             
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-custom py-8 sm:py-16 bg-white">
        <div className="flex flex-col">
          {/* View Controls and Filters */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 sm:mb-10 gap-4 sm:gap-6 bg-white p-4 sm:p-4 rounded-2xl sm:rounded-3xl border border-slate-100 shadow-sm">
            <div className="flex items-center gap-4 pl-4">
              <span className="text-slate-400 font-bold text-sm uppercase tracking-widest">
                {total} Properties Found
              </span>
            </div>

            <div className="flex items-center gap-3">
              {/* View Toggle */}
              <div className="flex bg-slate-50 p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => handleViewChange("grid")}
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === "grid"
                      ? "bg-white shadow-sm text-primary"
                      : "text-slate-400 hover:text-primary"
                  }`}
                >
                  <ViewColumnsIcon className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleViewChange("list")}
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === "list"
                      ? "bg-white shadow-sm text-primary"
                      : "text-slate-400 hover:text-primary"
                  }`}
                >
                  <QueueListIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Properties Grid/List */}
          {filteredProperties.length > 0 ? (
            <>
              <div
                className={`grid gap-8 ${
                  viewMode === "grid"
                    ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
                    : "grid-cols-1"
                }`}
              >
                {paginatedProperties.map((property, i) => {
                  const typeInfo = getTypeInfo(property.type);

                  return (
                    <div
                      key={`${property.collection}-${property.id}`}
                      className="animate-slide-up"
                      style={{ animationDelay: `${i * 50}ms` }}
                    >
                      <div className="relative group">
                        <div className="bg-white rounded-[1.5rem] overflow-hidden shadow-lg shadow-slate-200/50 border border-slate-100 hover:shadow-xl hover:shadow-slate-200/70 transition-all duration-300">
                          {/* Property Image */}
                          <div className="relative h-64 overflow-hidden">
                            <img
                              src={property.image}
                              alt={property.title || "Property"}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                              onError={(e) => {
                                e.currentTarget.src =
                                  "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&auto=format&fit=crop";
                              }}
                            />

                            {/* Property Type Badge */}
                            <div className="absolute top-3 left-3">
                              <span
                                className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold ${typeInfo.color} text-white shadow-lg`}
                              >
                                {typeInfo.emoji} {typeInfo.label}
                              </span>
                            </div>

                            {/* Status Badge */}
                            <div className="absolute top-3 right-3">
                              <span
                                className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold ${
                                  property.status === "rent"
                                    ? "bg-green-500"
                                    : "bg-blue-500"
                                } text-white shadow-lg`}
                              >
                                {property.status === "rent"
                                  ? "🔑 FOR RENT"
                                  : "🏠 FOR SALE"}
                              </span>
                            </div>

                            {/* Featured Badge */}
                            {property.featured && (
                              <div className="absolute bottom-3 left-3">
                                <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold bg-yellow-500 text-white shadow-lg">
                                  ⭐ FEATURED
                                </span>
                              </div>
                            )}

                            {/* VIEW DETAILS BUTTON - EXACT SAME AS LUXE */}
                            <button
                              onClick={() => handleViewDetails(property)}
                              className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white/90 backdrop-blur-md rounded-xl px-4 py-2 shadow-lg hover:shadow-xl hover:bg-white border border-slate-200 flex items-center gap-2 text-slate-700 hover:text-primary font-bold text-sm z-10"
                            >
                              <ArrowsPointingOutIcon className="h-4 w-4" />
                              View Details
                            </button>
                          </div>

                          {/* Property Details */}
                          <div className="p-6">
                            <div className="space-y-3">
                              {/* Price */}
                              <div className="flex items-center justify-between">
                                <div className="text-2xl font-black text-primary">
                                  AED {formatPrice(property.price || 0)}
                                </div>
                                {property.views && (
                                  <div className="flex items-center gap-1 text-slate-400 text-sm">
                                    <EyeIcon className="w-4 h-4" />
                                    <span>{property.views}</span>
                                  </div>
                                )}
                              </div>

                              {/* Title */}
                              <h3 className="text-lg font-black text-slate-900 line-clamp-1">
                                {property.title || "Property"}
                              </h3>

                              {/* Location */}
                              <div className="flex items-center gap-2 text-slate-500">
                                <MapPinIcon className="w-4 h-4 flex-shrink-0" />
                                <span className="text-sm font-medium line-clamp-1">
                                  {property.location ||
                                    property.area ||
                                    property.city ||
                                    "Dubai"}
                                </span>
                              </div>

                              {/* Features */}
                              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                                <div className="flex items-center gap-4">
                                  <div className="flex items-center gap-1.5">
                                    <BedIcon className="w-4 h-4 text-slate-400" />
                                    <span className="text-sm font-bold text-slate-900">
                                      {property.beds || 0}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-1.5">
                                    <BathIcon className="w-4 h-4 text-slate-400" />
                                    <span className="text-sm font-bold text-slate-900">
                                      {property.baths || 0}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-1.5">
                                    <Square3Stack3DIcon className="w-4 h-4 text-slate-400" />
                                    <span className="text-sm font-bold text-slate-900">
                                      {formatNumber(property.sqft || 0)}
                                    </span>
                                    <span className="text-xs text-slate-400">
                                      sqft
                                    </span>
                                  </div>
                                </div>
                              </div>

                              {/* Agent Info */}
                              {property.agent_name && (
                                <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
                                  <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-200">
                                    <img
                                      src={
                                        property.agent_image ||
                                        "https://img.freepik.com/free-photo/blond-businessman-happy-expression_1194-3866.jpg"
                                      }
                                      alt={property.agent_name}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                  <span className="text-sm font-medium text-slate-700">
                                    {property.agent_name}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Additional Info Tags */}
                        <div className="mt-3 flex flex-wrap gap-2">
                          {property.collection === "agent_properties" && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              🤝 Agent Property
                            </span>
                          )}
                          {property.featured && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                              ⭐ Featured
                            </span>
                          )}
                          {property.property_status && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              {property.property_status.toUpperCase()}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-16 flex items-center justify-center gap-2">
                  {page > 1 && (
                    <button
                      onClick={() => handlePageChange(page - 1)}
                      className="h-12 w-12 flex items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-primary hover:text-white hover:border-primary transition-all font-bold shadow-sm hover:shadow-md"
                    >
                      ←
                    </button>
                  )}

                  {[...Array(totalPages)].map((_, i) => {
                    const p = i + 1;
                    if (
                      p === 1 ||
                      p === totalPages ||
                      (p >= page - 1 && p <= page + 1)
                    ) {
                      return (
                        <button
                          key={p}
                          onClick={() => handlePageChange(p)}
                          className={`h-12 w-12 flex items-center justify-center rounded-xl font-bold transition-all shadow-sm ${
                            page === p
                              ? "bg-primary text-white shadow-primary/20"
                              : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
                          }`}
                        >
                          {p}
                        </button>
                      );
                    }
                    if (p === page - 2 || p === page + 2) {
                      return (
                        <span key={p} className="text-slate-300">
                          ...
                        </span>
                      );
                    }
                    return null;
                  })}

                  {page < totalPages && (
                    <button
                      onClick={() => handlePageChange(page + 1)}
                      className="h-12 w-12 flex items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-primary hover:text-white hover:border-primary transition-all font-bold shadow-sm hover:shadow-md"
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
              <h3 className="text-2xl font-black text-slate-900 mb-2">
                No properties found
              </h3>
              <p className="text-slate-500 font-medium max-w-xs mx-auto">
                {activeFilter
                  ? `No ${getPageTitle().toLowerCase()} available at the moment.`
                  : "No properties available at the moment."}
              </p>
              {activeFilter && (
                <button
                  onClick={handleClearFilters}
                  className="mt-4 px-6 py-2 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors"
                >
                  View All Properties
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Simple CTA Section */}
      <section className="bg-gradient-to-r from-slate-900 to-slate-800 py-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-5xl font-black mb-6">
              Find Your Dream {getPageTitle()}
            </h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Browse our collection of premium commercial properties from both our main
              listings and agent submissions.
            </p>
            <button className="px-8 py-4 bg-white text-slate-900 font-bold rounded-full hover:bg-slate-100 transition-all shadow-lg">
              Contact for More Information
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function CommercialPropertiesPage() {
  return (
    <Suspense fallback={<div className="p-6">Loading...</div>}>
      <CommercialPropertiesPageContent />
    </Suspense>
  );
}

// Add these CSS styles to your global.css or tailwind.config.js
// Container custom class
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

/* Primary Color */
:root {
  --color-primary: 59 130 246; /* blue-500 */
}

/* Tailwind Config Extension */
/* Add to tailwind.config.js:
  extend: {
    colors: {
      primary: 'rgb(var(--color-primary))',
    },
  }
*/
`;

// Helper functions for formatting
const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-US").format(price);
};

const formatNumber = (num: number) => {
  return new Intl.NumberFormat("en-US").format(num);
};