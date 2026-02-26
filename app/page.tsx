"use client";

import Link from "next/link";
import { Database } from "@/lib/database.types";
import ListingCard from "@/components/property/ListingCard";
import PropertySlider from "@/components/property/PropertySlider";
import HeroSearch from "@/components/shared/HeroSearch";
import HeroImageSlider from "@/components/shared/HeroImageSlider";
import AgentSlider from "@/components/agent/AgentSlider";
import { useTranslation } from "react-i18next";
import { useState, useRef, useEffect, useCallback } from "react";
import {
  BuildingOffice2Icon,
  HomeIcon,
  SparklesIcon,
  ChartBarIcon,
  UserGroupIcon,
  NewspaperIcon,
  StarIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as StarSolidIcon, PlayIcon, PauseIcon } from "@heroicons/react/24/solid";
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";
import { PropertySliderSkeleton, ProjectCardSkeleton, BlogCardSkeleton, TestimonialCardSkeleton } from "@/components/shared/SkeletonLoaders";

// Supabase imports
import { supabase } from "@/lib/supabase-browser";
import { useRealtimeMulti } from "@/lib/hooks/useRealtimeSubscription";

type Property = Database["public"]["Tables"]["properties"]["Row"];
type AgentRow = Database["public"]["Tables"]["agents"]["Row"];
type ProfileRow = Database["public"]["Tables"]["profiles"]["Row"];
type AgentWithProfile = AgentRow & { profiles?: ProfileRow | null };

// Interface for UI properties
interface UIProperty {
  id: string;
  title: string;
  price: number;
  priceLabel: string;
  image: string;
  location: string;
  beds: number;
  baths: number;
  sqft: number;
  type: string;
  featured: boolean;
}

// Interface for Project Videos
interface ProjectVideo {
  id: string;
  title: string;
  location: string;
  videoUrl: string;
  imageUrl: string;
  status: string;
  price: number;
  isRealProject: boolean;
}

// Cache for data (in-memory)
const dataCache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Helper function to get cached data
function getCachedData(key: string) {
  const cached = dataCache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    console.log(`✓ Using cached data for ${key}`);
    return cached.data;
  }
  return null;
}

// Helper function to set cached data
function setCachedData(key: string, data: any) {
  dataCache.set(key, { data, timestamp: Date.now() });
}

// Supabase data fetching functions

// 1. Properties for Buy/Sale - Status = "buy" OR "sale" - INCLUDES AGENT PROPERTIES TOO
async function fetchFeaturedProperties(): Promise<UIProperty[]> {
  try {
    const cached = getCachedData('featured_properties');
    if (cached) return cached;

    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .in('status', ['buy', 'sale'])
      .eq('published', true)
      .order('created_at', { ascending: false })
      .limit(4);

    if (error) throw error;

    const allProperties: UIProperty[] = (data || []).map((p: any) => ({
      id: p.id,
      title: p.title || "Untitled Property",
      price: p.price || 0,
      priceLabel: "total",
      image: p.images?.[0] || p.image_url || "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800",
      location: p.address ? `${p.address}${p.area ? ", " + p.area : ""}${p.city ? ", " + p.city : ""}` : p.location || "Dubai, UAE",
      beds: p.beds || 0,
      baths: p.baths || 0,
      sqft: p.sqft || p.built_up_area || 0,
      type: p.type || "Property",
      featured: p.featured || false,
    }));

    const result = allProperties
    setCachedData('featured_properties', result);
    return result;
  } catch (error) {
    console.error("Error fetching sale properties:", error);
    return [];
  }
}

// 2. Rental Properties - Status = "rent" - INCLUDES AGENT PROPERTIES TOO
async function fetchRentalProperties(): Promise<UIProperty[]> {
  try {
    const cached = getCachedData('rental_properties');
    if (cached) return cached;

    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('status', 'rent')
      .eq('published', true)
      .order('created_at', { ascending: false })
      .limit(4);

    if (error) throw error;

    const allRentalProperties: UIProperty[] = (data || []).map((p: any) => ({
      id: p.id,
      title: p.title || "Untitled Property",
      price: p.price || 0,
      priceLabel: "per_month",
      image: p.images?.[0] || p.image || "https://images.pexels.com/photos/1396126/pexels-photo-1396126.jpeg?auto=compress&cs=tinysrgb&w=800",
      location: p.address ? `${p.address}${p.area ? ", " + p.area : ""}${p.city ? ", " + p.city : ""}` : p.location || "Dubai, UAE",
      beds: p.beds || 0,
      baths: p.baths || 0,
      sqft: p.sqft || p.built_up_area || 0,
      type: p.type || "Property",
      featured: p.featured || false,
    }));

    const result = allRentalProperties
    setCachedData('rental_properties', result);
    return result;
  } catch (error) {
    console.error("Error fetching rental properties:", error);
    return [];
  }
}

// 3. REAL Project Videos - ONLY from Supabase - MAX 5
async function fetchProjectVideos(): Promise<ProjectVideo[]> {
  try {
    const cached = getCachedData('project_videos');
    if (cached) return cached;

    const { data, error } = await supabase
      .from('projects')
      .select('id, name, city, area, address, status, hero_image_url, images, video_url, starting_price, min_price')
      .eq('published', true)
      .order('featured', { ascending: false })
      .order('created_at', { ascending: false })
      .limit(5);

    if (error) throw error;

    const FALLBACK_IMAGE = "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800";

    const projectVideos: ProjectVideo[] = (data || []).map((p: any) => ({
      id: p.id,
      title: p.name || "Untitled Project",
      location: p.city || p.area || p.address || "Dubai",
      videoUrl: p.video_url && isVideoUrl(p.video_url) ? p.video_url : "",
      imageUrl: p.hero_image_url || (Array.isArray(p.images) && p.images.length > 0 ? p.images[0] : null) || FALLBACK_IMAGE,
      status: p.status || "upcoming",
      price: p.starting_price || p.min_price || 0,
      isRealProject: true,
    }));

    setCachedData('project_videos', projectVideos);
    return projectVideos;
  } catch (error) {
    console.error("Error fetching project videos:", error);
    return [];
  }
}

// 4. New Projects (for projects section) - MAX 4
async function fetchNewProjects() {
  try {
    const cached = getCachedData('new_projects');
    if (cached) return cached;

    const { data, error } = await supabase
      .from('projects')
      .select('*, developers(name)')
      .eq('published', true)
      .order('created_at', { ascending: false })
      .limit(4);

    if (error) throw error;

    const result = (data || []).map((p: any) => ({
      id: p.id,
      name: p.name || "Untitled Project",
      location: p.city || p.address || p.area || "Dubai",
      starting_price: p.starting_price || p.min_price || 0,
      hero_image_url: p.hero_image_url || p.images?.[0] || "https://images.pexels.com/photos/1396134/pexels-photo-1396134.jpeg?auto=compress&cs=tinysrgb&w=800",
      status: p.status || "In Progress",
      developer: p.developers?.name || "Unknown Developer",
      video_url: p.video_url || null,
      description: p.description || "",
      available_units: p.available_units || 0,
      total_units: p.total_units || 0,
    }));
    setCachedData('new_projects', result);
    return result;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

// HELPER FUNCTIONS
const isYouTubeUrl = (url: string): boolean => {
  if (!url) return false;
  return url.includes('youtube.com') || url.includes('youtu.be');
};

// UNIVERSAL VIDEO DETECTION - SAB TARAH KI VIDEOS
const isVideoUrl = (url: string): boolean => {
  if (!url) return false;
  
  // Common video extensions
  const videoExtensions = [
    '.mp4', '.webm', '.ogg', '.mov', '.avi', '.wmv', '.flv', '.mkv',
    '.m4v', '.mpg', '.mpeg', '.3gp', '.m3u8', '.ts'
  ];
  
  // Check for video extensions
  const hasVideoExtension = videoExtensions.some(ext => 
    url.toLowerCase().endsWith(ext)
  );
  
  // Check for common video hosting platforms
  const videoPlatforms = [
    'vimeo.com',
    'dailymotion.com',
    'twitch.tv',
    'facebook.com/video',
    'streamable.com',
    'giphy.com',
    'gfycat.com',
    'imgur.com',
    'cloudinary.com',
    'pexels.com/video',
    'pixabay.com/videos',
    'coverr.co',
    'mixkit.co',
    'videvo.net',
    'istockphoto.com/video',
    'shutterstock.com/video',
    'storyblocks.com',
    'pond5.com'
  ];
  
  const isVideoPlatform = videoPlatforms.some(platform => 
    url.toLowerCase().includes(platform)
  );
  
  // Check for video in query params
  const hasVideoInQuery = url.toLowerCase().includes('video') || 
                         url.toLowerCase().includes('.mp4') ||
                         url.toLowerCase().includes('.mov');
  
  return hasVideoExtension || isVideoPlatform || hasVideoInQuery;
};

// GET YOUTUBE ID
const getYouTubeId = (url: string): string | null => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

// GET VIMEO ID
const getVimeoId = (url: string): string | null => {
  const regExp = /(?:vimeo\.com\/|player\.vimeo\.com\/video\/)([0-9]+)/;
  const match = url.match(regExp);
  return match ? match[1] : null;
};

// GET VIDEO SOURCE FUNCTION (MISSING THI)
const getVideoSource = (url: string): string => {
  if (!url) return '';
  
  // Direct video files
  if (url.includes('.mp4') || url.includes('.mov') || url.includes('.webm')) {
    return url;
  }
  
  // YouTube URLs
  if (isYouTubeUrl(url)) {
    const videoId = getYouTubeId(url);
    if (videoId) {
      return `https://www.youtube.com/watch?v=${videoId}`;
    }
  }
  
  // Vimeo URLs
  if (url.includes('vimeo.com')) {
    const videoId = getVimeoId(url);
    if (videoId) {
      return `https://player.vimeo.com/video/${videoId}`;
    }
  }
  
  // Other platforms - return original URL
  return url;
};

// SMART VIDEO URL CONVERTER
const getSmartVideoUrl = (url: string): string => {
  if (!url) return '';
  
  // YouTube
  if (isYouTubeUrl(url)) {
    const videoId = getYouTubeId(url);
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0`;
  }
  
  // Vimeo
  if (url.includes('vimeo.com')) {
    const videoId = getVimeoId(url);
    return `https://player.vimeo.com/video/${videoId}?autoplay=1&muted=1&loop=1&background=1`;
  }
  
  // Direct video files - return as is
  return url;
};

// YOUTUBE PLAYER COMPONENT
const YouTubeVideoPlayer = ({ url, title }: { url: string, title: string }) => {
  const videoId = getYouTubeId(url);
  
  return (
    <div className="w-full h-full">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&modestbranding=1&rel=0`}
        title={title}
        className="w-full h-full object-cover"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
      />
    </div>
  );
};

// UNIVERSAL VIDEO PLAYER - SAB CHALAYEGA
const UniversalVideoPlayer = ({ 
  url, 
  imageUrl, 
  title 
}: { 
  url: string, 
  imageUrl: string, 
  title: string 
}) => {
  const [videoError, setVideoError] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Check if URL is embeddable or direct video
  const isEmbeddable = url.includes('youtube.com') || 
                      url.includes('vimeo.com') || 
                      url.includes('dailymotion.com');
  
  // Handle video error
  const handleVideoError = (e: any) => {
    console.error("Video failed to load:", url);
    setVideoError(true);
    e.currentTarget.style.display = 'none';
  };
  
  // Handle video load
  const handleVideoLoad = () => {
    setLoading(false);
    console.log("Video loaded successfully:", url);
  };
  
  // If it's an embeddable URL
  if (isEmbeddable && !videoError) {
    const embedUrl = getSmartVideoUrl(url);
    
    if (url.includes('youtube.com')) {
      return <YouTubeVideoPlayer url={url} title={title} />;
    }
    
    return (
      <div className="w-full h-full">
        <iframe
          src={embedUrl}
          title={title}
          className="w-full h-full object-cover"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          loading="lazy"
          onError={() => setVideoError(true)}
        />
      </div>
    );
  }
  
  // For direct video files or after error
  return (
    <div className="relative w-full h-full">
      {!videoError ? (
        <>
          <video
            src={url}
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            title={title}
            onError={handleVideoError}
            onCanPlay={handleVideoLoad}
          />
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          )}
        </>
      ) : (
        // Fallback to image
        <ImageFallback imageUrl={imageUrl} title={title} />
      )}
      
      {/* Video controls overlay */}
      {!videoError && (
        <div className="absolute bottom-4 right-4 bg-black/60 rounded-full p-2">
          <div className="flex items-center gap-1 text-white">
            <span className="text-xs">🔁</span>
            <span className="text-[10px] font-bold">LOOP</span>
          </div>
        </div>
      )}
    </div>
  );
};

// IMAGE FALLBACK COMPONENT
const ImageFallback = ({ 
  imageUrl, 
  title 
}: { 
  imageUrl: string, 
  title: string 
}) => {
  return (
    <img
      src={imageUrl}
      alt={title}
      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
      onError={(e: any) => {
        e.currentTarget.src = "https://images.pexels.com/photos/1396134/pexels-photo-1396134.jpeg?auto=compress&cs=tinysrgb&w=800";
      }}
    />
  );
};


// SIMPLE AUTO-PLAY VIDEO PLAYER
// AUTO-PLAY YOUTUBE PLAYER COMPONENT
const AutoPlayYouTubeVideoPlayer = ({ url, title, poster }: { url: string, title: string, poster: string }) => {
  const videoId = getYouTubeId(url);
  const [isPlaying, setIsPlaying] = useState(true);
  
  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="w-full h-full relative cursor-pointer" onClick={togglePlay}>
      {isPlaying ? (
        <>
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&modestbranding=1&rel=0&playsinline=1`}
            title={title}
            className="w-full h-full object-cover pointer-events-none"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          <div className="absolute inset-0 z-10" />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white shadow-xl">
              <PauseIcon className="w-8 h-8" />
            </div>
          </div>
        </>
      ) : (
        <div className="w-full h-full relative">
          <img 
            src={poster} 
            alt={title} 
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800";
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 z-30">
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white shadow-2xl">
              <PlayIcon className="w-8 h-8 ml-1" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// AUTO-PLAY VIDEO PLAYER COMPONENT
const AutoPlayVideoPlayer = ({ 
  url, 
  imageUrl, 
  title 
}: { 
  url: string, 
  imageUrl: string, 
  title: string 
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasError, setHasError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  
  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(err => console.error("Error playing:", err));
    }
  };

  // Auto-play video on mount
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;
    
    const playVideo = async () => {
      try {
        // Load video first
        videoElement.load();
        
        // Short delay then play
        setTimeout(async () => {
          try {
            await videoElement.play();
            setIsPlaying(true);
          } catch (playError) {
            // Try muted autoplay
            videoElement.muted = true;
            try {
              await videoElement.play();
              setIsPlaying(true);
            } catch (mutedError) {
              // Autoplay blocked by browser
            }
          }
        }, 300);
      } catch (error) {
        setHasError(true);
      }
    };
    
    playVideo();
    
    // Restart video on end
    const handleEnded = () => {
      videoElement.currentTime = 0;
      videoElement.play().catch(() => {});
    };
    
    videoElement.addEventListener('ended', handleEnded);
    
    // Cleanup
    return () => {
      videoElement.removeEventListener('ended', handleEnded);
    };
  }, [url, title]);
  
  // Video error handle karna
  const handleVideoError = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    console.error("Video failed to load:", url);
    setHasError(true);
  };
  
  if (hasError) {
    return (
      <ImageFallback imageUrl={imageUrl} title={title} />
    );
  }
  
  return (
    <div className="relative w-full h-full cursor-pointer" onClick={togglePlay}>
      <video
        ref={videoRef}
        src={url}
        className="w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        title={title}
        onError={handleVideoError}
      />
      
      {/* Play/Pause Overlay */}
      <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100 bg-black/20'}`}>
        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white shadow-xl">
          {isPlaying ? (
            <PauseIcon className="w-8 h-8" />
          ) : (
            <PlayIcon className="w-8 h-8 ml-1" />
          )}
        </div>
      </div>
    </div>
  );
};
// 5. Trusted Partners - MAX 6
async function fetchTrustedPartners() {
  try {
    const cached = getCachedData('trusted_partners');
    if (cached) return cached;

    const { data, error } = await supabase
      .from('partners')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true })
      .limit(6);

    if (error) {
      console.error("Supabase error fetching partners:", {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      });
      // Return default partners on error
      return [
        { id: "1", name: "Emaar", logo: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&fit=crop", category: "Real Estate" },
        { id: "2", name: "Sobha", logo: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&fit=crop", category: "Real Estate" },
        { id: "3", name: "Damac", logo: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&fit=crop", category: "Real Estate" },
        { id: "4", name: "Nakheel", logo: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&fit=crop", category: "Real Estate" },
        { id: "5", name: "Dubai Properties", logo: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&fit=crop", category: "Real Estate" },
        { id: "6", name: "Meraas", logo: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&fit=crop", category: "Real Estate" },
      ];
    }

    if (data && data.length > 0) {
      const result = data.map((p: any) => ({
        id: p.id,
        name: p.name || "Partner",
        logo: p.logo_url || "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&fit=crop",
        category: p.category || "Real Estate",
        order: p.sort_order || 0,
      }));
      setCachedData('trusted_partners', result);
      return result;
    }

    // Default partners fallback
    return [
      { id: "1", name: "Emaar", logo: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&fit=crop", category: "Real Estate" },
      { id: "2", name: "Sobha", logo: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&fit=crop", category: "Real Estate" },
      { id: "3", name: "Damac", logo: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&fit=crop", category: "Real Estate" },
      { id: "4", name: "Nakheel", logo: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&fit=crop", category: "Real Estate" },
      { id: "5", name: "Dubai Properties", logo: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&fit=crop", category: "Real Estate" },
      { id: "6", name: "Meraas", logo: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&fit=crop", category: "Real Estate" },
    ];
  } catch (error: any) {
    console.error("Error fetching partners:", error?.message || error);
    return [
      { id: "1", name: "Emaar", logo: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&fit=crop", category: "Real Estate" },
      { id: "2", name: "Sobha", logo: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&fit=crop", category: "Real Estate" },
      { id: "3", name: "Damac", logo: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&fit=crop", category: "Real Estate" },
      { id: "4", name: "Nakheel", logo: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&fit=crop", category: "Real Estate" },
      { id: "5", name: "Dubai Properties", logo: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&fit=crop", category: "Real Estate" },
      { id: "6", name: "Meraas", logo: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&fit=crop", category: "Real Estate" },
    ];
  }
}

// 6. Top Agents - MAX 4
async function fetchTopAgents(): Promise<AgentWithProfile[]> {
  try {
    const cached = getCachedData('top_agents');
    if (cached) return cached;

    const { data, error } = await supabase
      .from('agents')
      .select('*, profiles(*)')
      .eq('approved', true)
      .order('rating', { ascending: false })
      .limit(4);

    if (error) throw error;

    if (data && data.length > 0) {
      const result = data.map((agent: any) => ({
        id: agent.id,
        title: agent.title || "Real Estate Agent",
        bio: agent.bio || "Experienced real estate professional",
        experience_years: agent.experience_years || 0,
        rating: agent.rating || 0,
        review_count: agent.review_count || 0,
        total_sales: agent.total_sales || 0,
        profile_image:
          agent.profile_image ||
          agent.profiles?.avatar_url ||
          `https://ui-avatars.com/api/?name=${encodeURIComponent(
            agent.title || "Agent"
          )}&background=random`,
        created_at: agent.created_at || new Date().toISOString(),
        updated_at: agent.updated_at || new Date().toISOString(),
        office: agent.office || "Dubai",
        license_no: agent.license_no || "",
        approved: agent.approved || false,
        social: agent.social || { linkedin: "", instagram: "" },
        brokerage: agent.brokerage || "RAGDOL",
        certifications: agent.certifications || [],
        commission_rate: agent.commission_rate || 2.5,
        languages: agent.languages || ["English", "Arabic"],
        areas: agent.areas || ["Dubai"],
        verified: agent.verified || false,
        user_id: agent.user_id || agent.id,
        whatsapp: agent.whatsapp || null,
        linkedin_url: agent.linkedin_url || null,
        instagram_handle: agent.instagram_handle || null,
        website_url: agent.website_url || null,
        location: agent.location || "Dubai",
        profile_images: agent.profile_images || [],
        specializations: agent.specializations || ["Residential Properties"],
        telegram: agent.telegram || null,
        profiles: agent.profiles || null,
      }));
      setCachedData('top_agents', result);
      return result;
    }

    return [];
  } catch (error) {
    console.error("Error fetching agents:", error);
    return [];
  }
}

// 7. Testimonials - MAX 3 (Client Requirement: "Use 3 only to have them landscape")
async function fetchTestimonials() {
  try {
    const cached = getCachedData('testimonials');
    if (cached) return cached;

    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false })
      .limit(3);

    if (error) {
      console.error("Supabase error fetching testimonials:", error.message);
      return [];
    }

    if (data && data.length > 0) {
      const result = data.map((t: any) => ({
        id: t.id,
        name: t.name || "Anonymous",
        role: t.role || t.company || "Client",
        content: t.content || "Great service!",
        avatar:
          t.avatar_url ||
          `https://ui-avatars.com/api/?name=${encodeURIComponent(
            t.name || "Client"
          )}&background=random`,
        rating: t.rating || 5,
        createdAt: t.created_at || new Date(),
      }));
      setCachedData('testimonials', result);
      return result;
    }

    return [];
  } catch (error: any) {
    console.error("Error fetching testimonials:", error?.message || error);
    return [];
  }
}


//mainsection
// AUTO-PLAY YOUTUBE PLAYER FOR PROJECT SHOWCASE
const AutoPlayYouTubePlayer = ({ url, title, poster }: { url: string, title: string, poster: string }) => {
  const videoId = getYouTubeId(url);
  const [isPlaying, setIsPlaying] = useState(true);
  
  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="w-full h-full bg-black relative cursor-pointer" onClick={togglePlay}>
      {isPlaying ? (
        <>
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&modestbranding=1&rel=0&playsinline=1&disablekb=1&fs=0&iv_load_policy=3&start=0&end=0`}
            title={title}
            className="w-full h-full object-cover pointer-events-none"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
          {/* Invisible overlay to capture clicks since pointer-events-none is on iframe */}
          <div className="absolute inset-0 z-10" />
          
          {/* Pause indicator on hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white shadow-xl">
              <PauseIcon className="w-8 h-8" />
            </div>
          </div>
        </>
      ) : (
        <div className="w-full h-full relative">
          <img 
            src={poster} 
            alt={title} 
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800";
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 z-30">
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white shadow-2xl">
              <PlayIcon className="w-8 h-8 ml-1" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// AUTO-PLAY PROJECT VIDEO - SIMPLE AND EFFECTIVE
const AutoPlayProjectVideo = ({ 
  url, 
  poster, 
  title 
}: { 
  url: string, 
  poster: string, 
  title: string 
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  
  // Toggle play/pause
  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((error) => console.error("Error playing video:", error));
    }
  };

  // Auto-play effect
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
    const playVideo = () => {
      try {
        // Video ko muted karke play karo
        video.muted = true;
        video.play()
          .then(() => {
            setIsPlaying(true);
            console.log(`Auto-playing video: ${title}`);
          })
          .catch((error) => {
            console.log(`Auto-play failed for ${title}:`, error);
            // Retry after a short delay
            setTimeout(() => {
              if (video) video.play().catch(() => {});
            }, 300);
          });
      } catch (error) {
        console.error(`Video error for ${title}:`, error);
      }
    };
    
    // Play video when ready
    const handleCanPlay = () => {
      playVideo();
    };
    
    // Restart video on end
    const handleEnded = () => {
      video.currentTime = 0;
      video.play().catch(() => {});
    };
    
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('ended', handleEnded);
    
    // Immediately try to play
    playVideo();
    
    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('ended', handleEnded);
    };
  }, [url, title]);
  
  return (
    <div className="relative w-full h-full cursor-pointer" onClick={togglePlay}>
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        src={url}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        title={title}
        onError={(e) => {
          console.error(`Video load error for ${title}:`, url);
          // Show poster image on error
          const videoElement = e.currentTarget;
          const parent = videoElement.parentElement;
          if (parent) {
            const img = document.createElement('img');
            img.src = poster;
            img.alt = title;
            img.className = 'w-full h-full object-cover';
            parent.appendChild(img);
            videoElement.style.display = 'none';
          }
        }}
      />
      
      {/* Play/Pause Overlay */}
      <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100 bg-black/20'}`}>
        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white shadow-xl">
          {isPlaying ? (
            <PauseIcon className="w-8 h-8" />
          ) : (
            <PlayIcon className="w-8 h-8 ml-1" />
          )}
        </div>
      </div>
    </div>
  );
};

// ALTERNATIVE: ULTRA SIMPLE AUTO-PLAY VIDEO
const SimpleAutoPlayVideo = ({ url, poster, title }: { url: string; poster?: string; title?: string }) => {
  return (
    <video
      className="w-full h-full object-cover"
      src={url}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      title={title}
      // Ye sab se important hai - video automatically chalegi
      onLoadedData={(e) => {
        e.currentTarget.play().catch(() => {
          // Try muted play on error
          e.currentTarget.muted = true;
          e.currentTarget.play().catch(() => {});
        });
      }}
      onEnded={(e) => {
        // Restart video on end
        e.currentTarget.currentTime = 0;
        e.currentTarget.play().catch(() => {});
      }}
      onError={(e) => {
        console.error("Video error:", url);
        // Fallback to poster
        e.currentTarget.style.display = 'none';
        const img = e.currentTarget.nextElementSibling as HTMLElement | null;
        if (img) img.style.display = 'block';
      }}
    >
      <source src={url} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};
//mainsection

// 8. Blog Posts - MAX 4
async function fetchBlogPosts() {
  try {
    const cached = getCachedData('blog_posts');
    if (cached) return cached;

    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('status', 'published')
      .order('created_at', { ascending: false })
      .limit(4);

    if (error) throw error;

    if (data && data.length > 0) {
      const result = data.map((post: any) => ({
        id: post.id,
        title: post.title || "Untitled Blog",
        date: post.created_at
          ? new Date(post.created_at).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })
          : "Recent",
        category: post.category || "General",
        image:
          post.featured_image ||
          "https://images.pexels.com/photos/1396130/pexels-photo-1396130.jpeg?auto=compress&cs=tinysrgb&w=800",
        excerpt: post.excerpt || "",
        author: "RAGDOL",
        readTime: "3 min read",
        slug: post.slug || post.id,
      }));
      setCachedData('blog_posts', result);
      return result;
    }

    return [];
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
}

export default function HomePage() {
  const { t } = useTranslation();

  // State for Supabase data
  const [featuredProperties, setFeaturedProperties] = useState<UIProperty[]>(
    []
  );
  const [rentalProperties, setRentalProperties] = useState<UIProperty[]>([]);
  const [projectVideos, setProjectVideos] = useState<ProjectVideo[]>([]);
  const [newProjects, setNewProjects] = useState<any[]>([]);
  const [trustedPartners, setTrustedPartners] = useState<any[]>([]);
  const [topAgents, setTopAgents] = useState<AgentWithProfile[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  // Video controls state
  const [videoStates, setVideoStates] = useState<{
    [key: string]: { isPlaying: boolean; isMuted: boolean };
  }>({});

  // Video refs
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

  // Reload all homepage data (used on mount and by realtime subscription)
  const reloadAllData = useCallback(async () => {
    console.log("🚀 Starting optimized data fetch from Supabase...");

    try {
      // Fetch all critical data in parallel (fast & efficient)
      const [
        featuredData,
        rentalData,
        projectData,
        newProjectsData,
        partnersData,
        agentsData,
        testimonialsData,
        blogsData
      ] = await Promise.all([
        fetchFeaturedProperties(),
        fetchRentalProperties(),
        fetchProjectVideos(),
        fetchNewProjects(),
        fetchTrustedPartners(),
        fetchTopAgents(),
        fetchTestimonials(),
        fetchBlogPosts()
      ]).catch(error => {
        console.error("Error in concurrent data fetch:", error);
        return [[], [], [], [], [], [], [], []];
      });

      // Update all state at once
      setFeaturedProperties(featuredData);
      setRentalProperties(rentalData);
      setNewProjects(newProjectsData);
      setTrustedPartners(partnersData);
      setTopAgents(agentsData);
      setTestimonials(testimonialsData);
      setBlogPosts(blogsData);

      // Initialize video states for projects
      if (projectData.length > 0) {
        setProjectVideos(projectData);
        const initialVideoStates: {
          [key: string]: { isPlaying: boolean; isMuted: boolean };
        } = {};
        projectData.forEach((project) => {
          initialVideoStates[project.id] = {
            isPlaying: false,
            isMuted: true,
          };
        });
        setVideoStates(initialVideoStates);
      }

      setDataLoaded(true);
      console.log("✓ All data loaded successfully!");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  // Fetch all data on component mount - OPTIMIZED CONCURRENT LOADING
  useEffect(() => {
    reloadAllData();
  }, [reloadAllData]);

  // Real-time: auto-refresh homepage when any key table changes in DB
  useRealtimeMulti([
    { table: 'properties',       onChange: () => { dataCache.clear(); reloadAllData(); } },
    { table: 'agent_properties', onChange: () => { dataCache.clear(); reloadAllData(); } },
    { table: 'agents',           onChange: () => { dataCache.clear(); reloadAllData(); } },
    { table: 'testimonials',     onChange: () => { dataCache.clear(); reloadAllData(); } },
    { table: 'projects',         onChange: () => { dataCache.clear(); reloadAllData(); } },
    { table: 'posts',            onChange: () => { dataCache.clear(); reloadAllData(); } },
    { table: 'partners',         onChange: () => { dataCache.clear(); reloadAllData(); } },
  ]);

  const togglePlayPause = (projectId: string) => {
    setVideoStates((prev) => ({
      ...prev,
      [projectId]: {
        ...prev[projectId],
        isPlaying: !prev[projectId]?.isPlaying,
      },
    }));
  };

  const toggleMute = (projectId: string) => {
    setVideoStates((prev) => ({
      ...prev,
      [projectId]: { ...prev[projectId], isMuted: !prev[projectId]?.isMuted },
    }));
  };

  // Effect to handle video playback
  useEffect(() => {
    Object.keys(videoRefs.current).forEach((projectId) => {
      const video = videoRefs.current[projectId];
      if (video) {
        if (videoStates[projectId]?.isPlaying) {
          video.play().catch(() => {
            console.log("Auto-play prevented for video:", projectId);
          });
        } else {
          video.pause();
        }
      }
    });
  }, [videoStates]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Landing Section with Image Slider */}
      <section className="relative w-full h-screen overflow-hidden">
        <HeroImageSlider />

        <div className="absolute inset-0 flex flex-col items-center justify-center z-0">
          <div className="container-custom w-full">
            <div className="text-center max-w-6xl mx-auto space-y-4">
              <div className="space-y-2 sm:space-y-3">
                <h2 className="text-primary font-bold tracking-[0.4em] uppercase text-xs sm:text-xs drop-shadow-md">
                  {t("homepage.premiumRealEstate")}
                </h2>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white drop-shadow-2xl leading-tight">
                  Find Your <span className="text-primary">Dream Home</span>
                </h1>
                <p className="text-xs sm:text-sm md:text-base text-white/90 max-w-3xl mx-auto leading-relaxed font-medium drop-shadow-lg px-4 sm:px-0">
                  {t("homepage.discoverExclusiveProperties")}
                </p>
              </div>

              <div className="max-w-4xl mx-auto animate-slide-up [animation-delay:200ms]">
                <HeroSearch />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 pt-4 sm:pt-6 max-w-3xl mx-auto animate-fade-in [animation-delay:400ms] px-4 sm:px-0">
                <div className="text-center group">
                  <div className="text-3xl sm:text-4xl font-black text-white mb-1 group-hover:text-primary transition-colors">
                    {featuredProperties.length +
                      rentalProperties.length +
                      projectVideos.length}
                    +
                  </div>
                  <div className="text-[8px] sm:text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">
                    {t("homepage.properties")}
                  </div>
                </div>
                <div className="text-center group">
                  <div className="text-3xl sm:text-4xl font-black text-white mb-1 group-hover:text-primary transition-colors">
                    {testimonials.length * 100}+
                  </div>
                  <div className="text-[8px] sm:text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">
                    {t("homepage.happyClients")}
                  </div>
                </div>
                <div className="text-center group">
                  <div className="text-3xl sm:text-4xl font-black text-white mb-1 group-hover:text-primary transition-colors">
                    {topAgents.length}+
                  </div>
                  <div className="text-[8px] sm:text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">
                    {t("homepage.expertAgents")}
                  </div>
                </div>
                <div className="text-center group">
                  <div className="text-3xl sm:text-4xl font-black text-white mb-1 group-hover:text-primary transition-colors">
                    {Math.max(...topAgents.map((a) => a.experience_years || 0))}
                    +
                  </div>
                  <div className="text-[8px] sm:text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">
                    {t("homepage.yearsExperience")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-2 bg-white/60 rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </section>

      {/* Video Showcase Section - MAX 5 */}

   
 
 <section className="py-16 sm:py-24 bg-slate-50">
  <div className="container-custom">
    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6 px-4 sm:px-0">
      <div className="max-w-2xl">
        <h2 className="text-primary font-bold tracking-[0.2em] uppercase text-sm mb-4">
          {t("homepage.visualExperience")}
        </h2>
        <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-secondary tracking-tight">
          Real <span className="text-primary">Project Showcase</span>
        </h3>
        <p className="text-slate-500 font-medium mt-4 text-sm sm:text-base">
          Explore our latest projects
        </p>
      </div>
      <Link href="/projects" className="btn-outline">
        View All Projects
      </Link>
    </div>

    {projectVideos.length > 0 ? (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6 sm:gap-8 px-4 sm:px-0">
        {projectVideos.slice(0, 5).map((project, index) => {
          const hasVideo = isVideoUrl(project.videoUrl);

          return (
            <div
              key={project.id}
              className="relative aspect-9/16 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl group cursor-pointer animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* AUTO-PLAY VIDEO - MODIFIED FOR THIS SECTION */}
              {hasVideo ? (
                <div className="relative w-full h-full">
                  {/* YOUTUBE VIDEOS */}
                  {isYouTubeUrl(project.videoUrl) ? (
                    <AutoPlayYouTubePlayer 
                      url={project.videoUrl} 
                      title={project.title}
                      poster={project.imageUrl}
                    />
                  ) : (
                    /* DIRECT VIDEO FILES - AUTO PLAY */
                    <AutoPlayProjectVideo 
                      url={project.videoUrl}
                      poster={project.imageUrl}
                      title={project.title}
                    />
                  )}
                </div>
              ) : (
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800";
                  }}
                />
              )}

              <div className="absolute inset-0 bg-linear-to-t from-slate-900/90 via-transparent to-transparent p-4 sm:p-6 flex flex-col justify-end pointer-events-none">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="text-white font-bold text-base sm:text-lg">
                      {project.title}
                    </h4>
                    <p className="text-white/70 text-sm font-medium">
                      {project.location}
                    </p>
                  </div>
                  <span className="px-2 py-1 bg-white/20 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest rounded">
                    {project.status}
                  </span>
                </div>
                <div className="text-primary font-bold text-sm">
                  {project.price > 0 ? (
                    <>
                      Starting from{" "}
                      <span className="text-lg">
                        AED {project.price?.toLocaleString() || "0"}
                      </span>
                    </>
                  ) : (
                    <span className="text-white/70">
                      Price on request
                    </span>
                  )}
                </div>
              </div>

              {/* AUTO-PLAY INDICATOR - SHOW ALWAYS */}
              {hasVideo && (
                <div className="absolute bottom-4 right-4 rounded-full p-2 z-10">
                  <div className="flex items-center gap-1 text-white">
                    
                  </div>
                </div>
              )}

              

              <div className="absolute top-4 left-4 pointer-events-none">
                <span className="px-2 py-1 bg-green-500/90 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest rounded">
                  LIVE
                </span>
              </div>
            </div>
          );
        })}
      </div>
    ) : (
      <div className="text-center py-12 bg-white rounded-2xl shadow-sm border border-slate-100">
        <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-slate-100 rounded-full">
          <svg
            className="w-8 h-8 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-slate-700 mb-2">
          No Projects Available
        </h3>

        <p className="text-sm text-slate-500">
          Featured projects will appear here soon
        </p>
      </div>
    )}

    <div className="text-center mt-12 px-4 sm:px-0">
      <div className="inline-flex items-center gap-2 text-sm text-primary font-medium"></div>
    </div>
  </div>
</section>

      {/* Trusted Partners Section - MAX 4 */}
      <section className="py-16 sm:py-24 ">
        <div className="container-custom">
          <div className="text-center mb-12 sm:mb-16 px-4 sm:px-0">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-secondary tracking-tight mb-4 sm:mb-6">
              <span className="text-secondary">Trusted</span>{" "}
              <span className="text-primary">Partners</span>
            </h2>

            <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto">
              {t("homepage.collaborateWithDevelopers")}
            </p>
            <Link href="/partners" className="btn-outline mt-3">
              View All partners
            </Link>
          </div>

          {/* CHANGED: grid-cols-2 sm:grid-cols-3 md:grid-cols-6 (was grid-cols-1 sm:grid-cols-2 md:grid-cols-4) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 sm:gap-8 md:gap-12 px-4 sm:px-0">
            {trustedPartners.length > 0 ? (
              // CHANGED: slice(0, 6) (was slice(0, 4))
              trustedPartners.slice(0, 6).map((partner, index) => (
                <div
                  key={partner.id || index}
                  className="group flex flex-col items-center justify-center p-2 w-50 sm:p-6 rounded-2xl bg-gray-100 hover:bg-white "
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mb-3 sm:mb-4 rounded-xl overflow-hidden bg-linear-to-br from-primary/10 to-primary/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <img
                      src={partner.logo}
                      alt={`${partner.name} Logo`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&fit=crop";
                      }}
                    />
                  </div>
                  <h3 className="text-sm sm:text-lg font-bold text-secondary group-hover:text-primary transition-colors text-center">
                    {partner.name}
                  </h3>
                 
                </div>
              ))
            ) : (
              // CHANGED: 6 fallback partners
              <>
                <div className="group flex flex-col items-center justify-center p-4 sm:p-6 rounded-2xl bg-slate-50 hover:bg-white hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-primary/20">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mb-3 sm:mb-4 rounded-xl overflow-hidden bg-linear-to-br from-primary/10 to-primary/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <img
                      src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&fit=crop"
                      alt="Emaar Logo"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-sm sm:text-lg font-bold text-secondary group-hover:text-primary transition-colors text-center">
                    Emaar
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1 text-center">
                    Real Estate
                  </p>
                </div>
                <div className="group flex flex-col items-center justify-center p-4 sm:p-6 rounded-2xl bg-slate-50 hover:bg-white hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-primary/20">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mb-3 sm:mb-4 rounded-xl overflow-hidden bg-linear-to-br from-primary/10 to-primary/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <img
                      src="https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&fit=crop"
                      alt="Sobha Logo"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-sm sm:text-lg font-bold text-secondary group-hover:text-primary transition-colors text-center">
                    Sobha
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1 text-center">
                    Real Estate
                  </p>
                </div>
                <div className="group flex flex-col items-center justify-center p-4 sm:p-6 rounded-2xl bg-slate-50 hover:bg-white hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-primary/20">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mb-3 sm:mb-4 rounded-xl overflow-hidden bg-linear-to-br from-primary/10 to-primary/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <img
                      src="https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&fit=crop"
                      alt="Damac Logo"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-sm sm:text-lg font-bold text-secondary group-hover:text-primary transition-colors text-center">
                    Damac
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1 text-center">
                    Real Estate
                  </p>
                </div>
                <div className="group flex flex-col items-center justify-center p-4 sm:p-6 rounded-2xl bg-slate-50 hover:bg-white hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-primary/20">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mb-3 sm:mb-4 rounded-xl overflow-hidden bg-linear-to-br from-primary/10 to-primary/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <img
                      src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&fit=crop"
                      alt="Nakheel Logo"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-sm sm:text-lg font-bold text-secondary group-hover:text-primary transition-colors text-center">
                    Nakheel
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1 text-center">
                    Real Estate
                  </p>
                </div>
                {/* Added 2 more fallback partners */}
                <div className="group flex flex-col items-center justify-center p-4 sm:p-6 rounded-2xl bg-slate-50 hover:bg-white hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-primary/20">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mb-3 sm:mb-4 rounded-xl overflow-hidden bg-linear-to-br from-primary/10 to-primary/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <img
                      src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&fit=crop"
                      alt="Dubai Properties Logo"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-sm sm:text-lg font-bold text-secondary group-hover:text-primary transition-colors text-center">
                    Dubai Properties
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1 text-center">
                    Real Estate
                  </p>
                </div>
                <div className="group flex flex-col items-center justify-center p-4 sm:p-6 rounded-2xl bg-slate-50 hover:bg-white hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-primary/20">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mb-3 sm:mb-4 rounded-xl overflow-hidden bg-linear-to-br from-primary/10 to-primary/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <img
                      src="https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&fit=crop"
                      alt="Meraas Logo"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-sm sm:text-lg font-bold text-secondary group-hover:text-primary transition-colors text-center">
                    Meraas
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1 text-center">
                    Real Estate
                  </p>
                </div>
              </>
            )}
          </div>

          {!dataLoaded && trustedPartners.length === 0 && (
            <div className="hidden">
              {/* Partners loading silently */}
            </div>
          )}

          <div className="text-center mt-12 sm:mt-16 px-4 sm:px-0">
            <p className="text-slate-600 mb-4 sm:mb-6 text-sm sm:text-base">
              {t("homepage.joinThousandsClients")}
            </p>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <StarIcon className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-500" />
                <span>{t("homepage.trustedDevelopers")}</span>
              </div>
              <div className="flex items-center gap-2">
                <BuildingOffice2Icon className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                <span>{t("homepage.premiumProperties")}</span>
              </div>
              <div className="flex items-center gap-2">
                <UserGroupIcon className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                <span>{t("homepage.expertGuidance")}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties for BUY/SAKE (INCLUDES AGENT PROPERTIES) */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="text-center mb-5">
            <h2 className="text-primary font-bold tracking-[0.2em] uppercase text-sm mb-4">
              {t("homepage.exclusiveSelection")}
            </h2>
            <h3 className="text-4xl md:text-5xl font-black text-secondary tracking-tight">
              {t("homepage.propertiesFor")}{" "}
              <span className="text-primary">{t("homepage.buyText")}</span>
            </h3>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto mt-6">
              Discover premium properties handpicked for discerning buyers
            </p>
            <Link href="/properties?action=buy" className="btn-outline mt-5">
              View All Properties
            </Link>
          </div>

          {featuredProperties.length > 0 ? (
            <PropertySlider
              title=""
              properties={featuredProperties.slice(0, 8)}
              showCount={4} 
            />
          ) : (
            <PropertySliderSkeleton count={4} />
          )}
        </div>
      </section>

      {/* Properties for RENT (INCLUDES AGENT PROPERTIES) */}
      <section className="py-24 bg-slate-50">
        <div className="container-custom">
          <div className="text-center mb-5">
            <h2 className="text-primary font-bold tracking-[0.2em] uppercase text-sm mb-4">
              {t("homepage.rentalCollection")}
            </h2>
            <h3 className="text-4xl md:text-5xl font-black text-secondary tracking-tight">
              {t("homepage.propertiesFor")}{" "}
              <span className="text-primary">{t("homepage.rentText")}</span>
            </h3>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto mt-6">
              Explore exceptional rental properties across Dubai's finest locations
            </p>
            <Link href="/properties?action=rent" className="btn-outline mt-5">
              View All Rentals
            </Link>
          </div>

          {rentalProperties.length > 0 ? (
            <PropertySlider
              title=""
              properties={rentalProperties.slice(0, 8)}
              showCount={4}
            />
          ) : (
            <PropertySliderSkeleton count={4} />
          )}
        </div>
      </section>

      {/* New Projects Section - MAX 4 */}
  <section className="py-24 bg-white">
  <div className="container-custom">
    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
      <div>
        <h2 className="text-primary font-bold tracking-[0.2em] uppercase text-sm mb-4">
          {t("homepage.futureLiving")}
        </h2>
        <h3 className="text-4xl md:text-5xl font-black text-secondary tracking-tight">
          {t("homepage.newText")}{" "}
          <span className="text-primary">
            {t("homepage.projectsText")}
          </span>
        </h3>
      </div>
      <Link href="/projects" className="btn-outline">
        {t("homepage.viewAllProjects")}
      </Link>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {newProjects.length > 0 ? (
        newProjects.slice(0, 4).map((project) => (
          <Link
            key={project.id}
            href={"/projects"}
            className="group"
          >
            <div className="relative aspect-4/5 rounded-3xl overflow-hidden mb-6 shadow-lg">
              
              {/* VIDEO DISPLAY LOGIC */}
              {project.video_url && project.video_url.trim() !== '' ? (
                <div className="relative w-full h-full">
                  
                  {/* YOUTUBE VIDEOS */}
                  {isYouTubeUrl(project.video_url) ? (
                    <AutoPlayYouTubeVideoPlayer 
                      url={project.video_url} 
                      title={project.name}
                      poster={project.hero_image_url}
                    />
                  ) : 
                  
                
                  (isVideoUrl(project.video_url) ? (
                    <AutoPlayVideoPlayer 
                      url={project.video_url}
                      imageUrl={project.hero_image_url}
                      title={project.name}
                    />
                  ) : 
                  
                 
                  (
                    <ImageFallback 
                      imageUrl={project.hero_image_url}
                      title={project.name}
                    />
                  ))}
                  
                  {/* Video controls overlay */}
                  {(isYouTubeUrl(project.video_url) || isVideoUrl(project.video_url)) && (
                    <div className="absolute bottom-4 right-4 rounded-full p-2">
                      <div className="flex items-center gap-1 text-white">
                      
                      </div>
                    </div>
                  )}
                  
                </div>
              ) : (
                // NO VIDEO URL - SHOW IMAGE ONLY
                <ImageFallback 
                  imageUrl={project.hero_image_url}
                  title={project.name}
                />
              )}
              
              {/* STATUS BADGE */}
              <div className="absolute top-4 left-4 pointer-events-none z-20">
                <span className="px-4 py-1.5 bg-white/90 backdrop-blur-md text-secondary text-[10px] font-black uppercase tracking-widest rounded-full shadow-sm">
                  {project.status}
                </span>
              </div>
              
              {/* HOVER OVERLAY */}
              <div className="absolute inset-0 bg-linear-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
            </div>
            
            {/* PROJECT DETAILS */}
            <h4 className="text-xl font-black text-slate-900 mb-1 group-hover:text-primary transition-colors">
              {project.name}
            </h4>
            <p className="text-slate-500 font-medium text-sm mb-2">
              {project.location}
            </p>
            <div className="text-primary font-bold text-sm">
              Starting from{" "}
              <span className="text-lg">
                AED {project.starting_price?.toLocaleString() || "0"}
              </span>
            </div>
            
          </Link>
        ))
      ) : (
        <div className="col-span-4 text-center py-12">
          <p className="text-slate-400">No projects available at the moment</p>
        </div>
      )}  
    </div>
  </div>
</section>







      {/* Latest News Section - MAX 4 */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="text-primary font-bold tracking-[0.2em] uppercase text-sm mb-4">
                Market Insights
              </h2>
              <h3 className="text-4xl md:text-5xl font-black text-secondary tracking-tight">
                Latest <span className="text-primary">News & Articles</span>
              </h3>
            </div>
            <Link href="/news" className="btn-outline">
              View All Articles
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {blogPosts.length > 0 ? (
              blogPosts.slice(0, 4).map((post) => (
                <Link
                  key={post.id}
                  href={`/news`}
                  className="group"
                >
                  <div className="relative aspect-16/10 rounded-3xl overflow-hidden mb-6 shadow-lg">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://images.pexels.com/photos/1396130/pexels-photo-1396130.jpeg?auto=compress&cs=tinysrgb&w=800";
                      }}
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-4 py-1.5 bg-white/90 backdrop-blur-md text-primary text-[10px] font-black uppercase tracking-widest rounded-full">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                    <span className="font-bold uppercase tracking-widest">
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg
                        className="w-3 h-3"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {post.author}
                    </span>
                  </div>
                  <h4 className="text-2xl font-black text-slate-900 group-hover:text-primary transition-colors leading-tight mb-2">
                    {post.title}
                  </h4>
                  <p className="text-slate-600 text-sm leading-relaxed mb-3">
                    {post.excerpt.length > 100
                      ? `${post.excerpt.substring(0, 100)}...`
                      : post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-primary text-xs font-bold">
                      {post.readTime}
                    </span>
                   
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-4 text-center py-12">
                <p className="text-slate-400">No articles available at the moment</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Top Agents Section - MAX 4 */}
      <section className="py-24 bg-slate-50">
        <div className="container-custom">
          <div className="text-center mb-8">
            <h2 className="text-primary font-bold tracking-[0.2em] uppercase text-sm mb-4">
              EXPERT PROFESSIONALS
            </h2>
            <h3 className="text-4xl md:text-5xl font-black text-secondary tracking-tight">
              Meet Our Top Agents
            </h3>
          </div>

          {topAgents.length > 0 ? (
            <>
              <AgentSlider agents={topAgents.slice(0, 4)} />

              {/* View All Agents Button - Center aligned */}
              <div className="text-center mt-2 pt-2 border-t border-white">
                <Link
                  href="/agents"
                  className="inline-flex items-center justify-center  gap- 3 bg-primary text-white font-bold py-4 px-8 rounded-4xl hover:bg-primary/90 transition-colors duration-300 shadow-lg hover:shadow-xl"
                >
                  <span>View All Agents</span>
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-slate-400 mb-8">Our expert agents will be available soon</p>

              {/* View All Agents Button (even when no agents) */}
              <Link
                href="/agents"
                className="inline-flex items-center justify-center gap-3 bg-primary text-white font-bold py-4 px-8 rounded-xl hover:bg-primary/90 transition-colors duration-300 shadow-lg hover:shadow-xl"
              >
                <span>View All Agents</span>
                <ArrowRightIcon className="h-5 w-5" />
              </Link>
            </div>
          )}
        </div>
      </section>










      {/* testimonials Section - MAX 3 */}

      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            {/* HEADING - Screenshot ke hisaab se */}
            <h2 className="text-primary font-bold tracking-[0.2em] uppercase text-sm mb-4">
              CLIENT STORIES
            </h2>
            <h3 className="text-4xl md:text-5xl font-black text-secondary tracking-tight">
              What Our Clients Say
            </h3>
            {/* Link button agar existing code mein hai to rakho */}
            {testimonials.length > 0 && (
              <Link href="/clients" className="btn-outline mt-6">
                View All Clients
              </Link>
            )}
          </div>

          {/* Grid layout - same functionality */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {testimonials.length > 0 ? (
              testimonials.slice(0, 3).map((testimonial, index) => (
                <div
                  key={testimonial.id || index}
                  className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100 hover:shadow-xl transition-shadow duration-300"
                >
                  {/* QUOTE SYMBOL - Screenshot style */}
                  <div className="text-black rounded-2xl w-14 h-14 mb-4 bg-primary -mt-13 flex items-center justify-center">
                    <ChatBubbleLeftRightIcon className="h-8 w-8 text-white" />
                  </div>

                  {/* TESTIMONIAL TEXT - Same content from firebase */}
                  <p className="text-slate-700 italic text-lg mb-8 leading-relaxed">
                    "{testimonial.content}"
                  </p>

                  {/* CLIENT INFO - Screenshot style horizontal layout */}
                  <div className="flex items-center gap-4 pt-6 border-t border-slate-100">
                    {/* Client Avatar - Same firebase image */}
                    <div className="shrink-0">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-14 h-14 rounded-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                            testimonial.name
                          )}&background=random&bold=true`;
                        }}
                      />
                    </div>

                    {/* Client Details */}
                    <div className="flex-1">
                      <h4 className="font-bold text-slate-900 text-lg">
                        {testimonial.name}
                      </h4>
                      <p className="text-primary font-medium text-sm uppercase tracking-wide mt-1">
                        {testimonial.role}
                      </p>

                      {/* Stars - Agar firebase data mein rating hai to show karo */}
                      {testimonial.rating && (
                        <div className="flex items-center gap-1 mt-2">
                          {[...Array(5)].map((_, i) => (
                            <StarSolidIcon
                              key={i}
                              className={`h-4 w-4 ${
                                i < testimonial.rating
                                  ? "text-yellow-500"
                                  : "text-slate-300"
                              }`}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center py-12">
                <p className="text-slate-400">No testimonials available at the moment</p>
              </div>
            )}
          </div>
        </div>
      </section>

      










      {/* CTA Section */}
      <section className="py-16 sm:py-24">
        <div className="container-custom">
          <div className="relative rounded-[3rem] sm:rounded-[4rem] overflow-hidden bg-slate-900 py-16 sm:py-24 px-6 sm:px-8 md:px-16 text-center">
            <div className="absolute inset-0 opacity-40">
              <img
                src="https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Dubai Skyline"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-linear-to-b from-slate-900/80 via-slate-900/40 to-slate-900/80" />
            <div className="relative z-10 max-w-4xl mx-auto">
              <h2 className="text-4xl sm:text-5xl md:text-7xl font-black text-white mb-6 sm:mb-8 tracking-tight leading-tight">
                {t("homepage.readyToFindPerfectSpace")}
              </h2>
              <p className="text-lg sm:text-xl md:text-2xl text-white/80 mb-8 sm:mb-12 font-medium leading-relaxed">
                {t("homepage.joinThousandsHomeowners")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
                <Link
                  href="/properties"
                  className="btn-primary rounded-full! px-8 sm:px-12! py-4 sm:py-5! text-base sm:text-lg! shadow-2xl shadow-primary/30"
                >
                  {t("homepage.browseProperties")}
                </Link>
                <Link
                  href="/contact"
                  className="btn-outline border-white! text-white! hover:bg-white! hover:text-slate-900! rounded-full! px-8 sm:px-12! py-4 sm:py-5! text-base sm:text-lg! backdrop-blur-md"
                >
                  {t("homepage.contactUs")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
