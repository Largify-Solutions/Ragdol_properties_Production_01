'use client'

import { CheckIcon, SparklesIcon, ChartBarIcon, ShieldCheckIcon, DocumentTextIcon, BanknotesIcon, PaintBrushIcon, ArrowRightIcon, PlayIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import AgentSlider from '@/components/agent/AgentSlider'
import { useState, useEffect } from 'react'
import { collection, getDocs, query, where, limit } from 'firebase/firestore'
import { db } from '@/lib/firebase'

interface ProfileRow {
  user_id: string;
  avatar_url?: string;
}

interface AgentWithProfile {
  id: string;
  title: string;
  bio: string | null;
  experience_years: number;
  rating: number;
  review_count: number;
  total_sales: number;
  profile_image: string;
  created_at: string;
  updated_at: string;
  office: string;
  license_no: string;
  approved: boolean;
  social: {
    linkedin: string;
    instagram: string;
    whatsapp: string;
    telegram: string;
    website: string;
  };
  brokerage: string;
  certifications: string[];
  commission_rate: number;
  languages: string[];
  areas: string[];
  verified: boolean;
  user_id: string;
  whatsapp: string | null;
  linkedin_url: string | null;
  instagram_handle: string | null;
  website_url: string | null;
  location: string;
  profile_images: string[];
  specializations: string[];
  telegram: string | null;
  profiles: ProfileRow | null;
}

interface Project {
  id: string;
  name: string;
  description: string;
  hero_image_url: string;
  images: string[];
  video_url: string;
  address: string;
  area: string;
  city: string;
  district: string;
  status: string;
  min_price: number;
  max_price: number;
  starting_price: number;
  currency: string;
  total_units: number;
  available_units: number;
  sold_units: number;
  completion_date: string;
  handover_date: string;
  launch_date: string;
  amenities: string[];
  facilities: string[];
  property_types: string[];
  featured: boolean;
  published: boolean;
  created_at: string;
  updated_at: string;
  views_count: number;
  inquiries_count: number;
}

// Helper functions for video detection
function isVideoUrl(url: string): boolean {
  if (!url) return false;
  const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.avi', '.mkv'];
  const videoDomains = ['youtube.com', 'youtu.be', 'vimeo.com', 'dailymotion.com'];
  
  return (
    videoExtensions.some(ext => url.toLowerCase().includes(ext)) ||
    videoDomains.some(domain => url.toLowerCase().includes(domain))
  );
}

function isYouTubeUrl(url: string): boolean {
  if (!url) return false;
  return url.toLowerCase().includes('youtube.com') || url.toLowerCase().includes('youtu.be');
}

// YouTube Player Component
function AutoPlayYouTubePlayer({ url, title }: { url: string; title: string }) {
  const getYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const videoId = getYouTubeId(url);
  
  if (!videoId) return null;

  return (
    <div className="relative w-full h-full">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&modestbranding=1&rel=0`}
        title={title}
        className="absolute top-0 left-0 w-full h-full"
        allow="autoplay; encrypted-media"
        allowFullScreen
      />
      <div className="absolute inset-0 bg-black/10"></div>
    </div>
  );
}

// Direct Video Player Component
function AutoPlayProjectVideo({ url, poster, title }: { url: string; poster: string; title: string }) {
  return (
    <div className="relative w-full h-full">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
        poster={poster}
        title={title}
      >
        <source src={url} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-black/10"></div>
    </div>
  );
}

async function fetchTopAgents(): Promise<AgentWithProfile[]> {
  try {
    console.log("Fetching agents from Firebase...");
    const agentsRef = collection(db, "agents");
    const q = query(agentsRef, limit(20));
    const querySnapshot = await getDocs(q);

    const agents: AgentWithProfile[] = [];

    for (const doc of querySnapshot.docs) {
      const data = doc.data();

      if (data.approved === true) {
        let profileData: ProfileRow | null = null;
        
        if (data.user_id) {
          try {
            const profilesRef = collection(db, "profiles");
            const profileQuery = query(
              profilesRef,
              where("user_id", "==", data.user_id),
              limit(1)
            );
            const profileSnapshot = await getDocs(profileQuery);

            if (!profileSnapshot.empty) {
              profileData = profileSnapshot.docs[0].data() as ProfileRow;
            }
          } catch (profileError) {
            console.log("No profile found for agent:", doc.id);
          }
        }

        const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
          data.title || "Agent"
        )}&background=random`;

        agents.push({
          id: doc.id,
          title: data.title || "Real Estate Agent",
          bio: data.bio || null,
          experience_years: data.experience_years || 0,
          rating: data.rating || 0,
          review_count: data.review_count || 0,
          total_sales: data.total_sales || 0,
          profile_image: data.profile_image || avatarUrl,
          created_at: data.created_at || new Date().toISOString(),
          updated_at: data.updated_at || new Date().toISOString(),
          office: data.office || "Dubai",
          license_no: data.license_no || "",
          approved: data.approved || false,
          social: {
            linkedin: data.linkedin_url || "",
            instagram: data.instagram_handle || "",
            whatsapp: data.whatsapp || "",
            telegram: data.telegram || "",
            website: data.website_url || ""
          },
          brokerage: data.brokerage || "RAGDOL",
          certifications: data.certifications || [],
          commission_rate: data.commission_rate || 2.5,
          languages: data.languages || ["English", "Arabic"],
          areas: ["Dubai"],
          verified: data.verified || false,
          user_id: data.user_id || doc.id,
          whatsapp: data.whatsapp || null,
          linkedin_url: data.linkedin_url || null,
          instagram_handle: data.instagram_handle || null,
          website_url: data.website_url || null,
          location: data.office || "Dubai",
          profile_images: data.profile_images || [],
          specializations: data.specializations || ["Residential Properties"],
          telegram: data.telegram || null,
          profiles: profileData,
        });
      }
    }

    console.log(`Found ${agents.length} approved agents`);
    
    agents.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    
    return agents.slice(0, 4);
  } catch (error) {
    console.error("Error fetching agents:", error);
    return [];
  }
}

async function fetchFeaturedProjects(): Promise<Project[]> {
  try {
    console.log("Fetching projects from Firebase...");
    const projectsRef = collection(db, "projects");
    
    const q = query(
      projectsRef,
      where("published", "==", true),
      limit(10)
    );
    
    const querySnapshot = await getDocs(q);
    const projects: Project[] = [];

    for (const doc of querySnapshot.docs) {
      const data = doc.data();

      if (data.name && (data.hero_image_url || data.images?.length > 0)) {
        projects.push({
          id: doc.id,
          name: data.name || "Project",
          description: data.description || "",
          hero_image_url: data.hero_image_url || data.images?.[0] || "",
          images: data.images || [],
          video_url: data.video_url || "",
          address: data.address || "Dubai",
          area: data.area || "Dubai",
          city: data.city || "Dubai",
          district: data.district || "",
          status: data.status || "planned",
          min_price: data.min_price || 0,
          max_price: data.max_price || 0,
          starting_price: data.starting_price || data.min_price || 0,
          currency: data.currency || "AED",
          total_units: data.total_units || 0,
          available_units: data.available_units || 0,
          sold_units: data.sold_units || 0,
          completion_date: data.completion_date || "",
          handover_date: data.handover_date || "",
          launch_date: data.launch_date || "",
          amenities: data.amenities || [],
          facilities: data.facilities || [],
          property_types: data.property_types || [],
          featured: data.featured || false,
          published: data.published || false,
          created_at: data.created_at || new Date().toISOString(),
          updated_at: data.updated_at || new Date().toISOString(),
          views_count: data.views_count || 0,
          inquiries_count: data.inquiries_count || 0,
        });
      }
    }

    console.log(`Found ${projects.length} published projects`);
    
    projects.sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });
    
    return projects.slice(0, 5);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

const services = [
  {
    id: '1',
    title: 'Elite Property Valuation',
    description: 'Precision market valuation for high-value residential and commercial assets using proprietary data models.',
    features: ['Algorithmic Market Analysis', 'Comparative Asset Study', 'Certified Valuation Reports', 'Expert On-site Assessment'],
    icon: ChartBarIcon,
    image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '2',
    title: 'Investment Advisory',
    description: 'Bespoke investment strategies designed for global institutional investors and high-net-worth individuals.',
    features: ['Portfolio Diversification', 'Yield Optimization', 'Risk Mitigation Strategies', 'Off-market Opportunities'],
    icon: SparklesIcon,
    image: 'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '3',
    title: 'Asset Management',
    description: 'Comprehensive management of luxury portfolios, ensuring seamless operations and maximum asset preservation.',
    features: ['VIP Tenant Relations', 'Preventative Maintenance', 'Financial Reporting', 'Legal Compliance'],
    icon: ShieldCheckIcon,
    image: 'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '4',
    title: 'Legal & Conveyancing',
    description: 'Expert handling of complex real estate legalities, ensuring every transaction is secure and transparent.',
    features: ['SPA Preparation', 'Title Deed Registration', 'DLD Liaison', 'Escrow Management'],
    icon: DocumentTextIcon,
    image: 'https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '5',
    title: 'Structured Finance',
    description: 'Tailored mortgage and financing solutions through our network of premier global banking partners.',
    features: ['Non-resident Mortgages', 'Equity Release', 'Commercial Financing', 'Preferential Rates'],
    icon: BanknotesIcon,
    image: 'https://images.pexels.com/photos/2121287/pexels-photo-2121287.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '6',
    title: 'Interior Curation',
    description: 'Transforming spaces into masterpieces through our award-winning interior design and renovation partners.',
    features: ['Concept Design', 'Bespoke Furnishing', 'Project Management', 'Turnkey Solutions'],
    icon: PaintBrushIcon,
    image: 'https://images.pexels.com/photos/4819372/pexels-photo-4819372.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
]

export default function ServicesPage() {
  const [topAgents, setTopAgents] = useState<AgentWithProfile[]>([]);
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const [agents, projects] = await Promise.all([
        fetchTopAgents(),
        fetchFeaturedProjects()
      ]);
      setTopAgents(agents);
      setFeaturedProjects(projects);
    };
    
    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-secondary -mt-17">
        <div className="absolute inset-0">
          <Image 
            src="https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Luxury Services"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-secondary/60 via-secondary/40 to-white"></div>
        </div>
        
        <div className="container-custom relative z-10 text-center">
          <span className="inline-block px-4 py-1 bg-primary/20 text-primary text-sm font-bold tracking-widest uppercase rounded-full mb-6">
            Our Expertise
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-secondary mb-6">
            Our <span className="text-primary italic">Service Experts</span>
          </h2>
          <p className="text-xl text-white max-w-2xl mx-auto font-bold">
            Connect with our specialized professionals who deliver exceptional results across all our premium services.
          </p>
        </div>
      </section>

      {/* Top Agents Section */}
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
              <AgentSlider agents={topAgents} />

              {/* View All Agents Button */}
              <div className="text-center mt-2 pt-2 border-t border-white">
                <Link
                  href="/agents"
                  className="inline-flex items-center justify-center gap-3 bg-primary text-white font-bold py-4 px-8 rounded-4xl hover:bg-primary/90 transition-colors duration-300 shadow-lg hover:shadow-xl"
                >
                  <span>View All Agents</span>
                  <ArrowRightIcon className="h-5 w-5" />
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-slate-500 mb-4">No agents found</p>
              <div className="text-center mt-12 pt-8 border-t border-slate-200">
                <Link
                  href="/agents"
                  className="inline-flex items-center justify-center gap-3 bg-primary text-white font-bold py-4 px-8 rounded-xl hover:bg-primary/90 transition-colors duration-300 shadow-lg hover:shadow-xl"
                >
                  <span>View All Agents</span>
                  <ArrowRightIcon className="h-5 w-5" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Projects Showcase Section */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-primary font-bold tracking-[0.2em] uppercase text-sm mb-4">
                PROJECT SHOWCASE
              </h2>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-secondary tracking-tight">
                Our <span className="text-primary">Featured Projects</span>
              </h3>
              <p className="text-slate-500 font-medium mt-4 text-sm sm:text-base">
                Explore our latest developments with immersive visual experiences
              </p>
            </div>
            <Link 
              href="/projects" 
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-primary text-primary font-bold rounded-full hover:bg-primary hover:text-white transition-colors duration-300"
            >
              View All Projects
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>

          {featuredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6 sm:gap-8">
              {featuredProjects.map((project, index) => {
                const hasVideo = isVideoUrl(project.video_url);
                const imageUrl = project.hero_image_url || project.images[0] || 
                  "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800";

                return (
                  <div
                    key={project.id}
                    className="relative aspect-9/16 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl group cursor-pointer"
                  >
                    {/* AUTO-PLAY VIDEO or IMAGE */}
                    {hasVideo ? (
                      <div className="relative w-full h-full">
                        {isYouTubeUrl(project.video_url) ? (
                          <AutoPlayYouTubePlayer 
                            url={project.video_url} 
                            title={project.name}
                          />
                        ) : (
                          <AutoPlayProjectVideo 
                            url={project.video_url}
                            poster={imageUrl}
                            title={project.name}
                          />
                        )}
                      </div>
                    ) : (
                      <div className="relative w-full h-full">
                        <Image
                          src={imageUrl}
                          alt={project.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 20vw"
                        />
                        <div className="absolute inset-0 bg-black/10"></div>
                      </div>
                    )}

                    {/* Project Info Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent p-4 sm:p-6 flex flex-col justify-end">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="text-white font-bold text-base sm:text-lg line-clamp-1">
                            {project.name}
                          </h4>
                          <p className="text-white/70 text-sm font-medium">
                            {project.city}, {project.area}
                          </p>
                        </div>
                        <span className="px-2 py-1 bg-white/20 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest rounded">
                          {project.status}
                        </span>
                      </div>
                      <div className="text-primary font-bold text-sm">
                        {project.starting_price > 0 ? (
                          <>
                            Starting from{" "}
                            <span className="text-lg">
                              {project.currency} {project.starting_price.toLocaleString()}
                            </span>
                          </>
                        ) : (
                          <span className="text-white/70">
                            Price on request
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Video Indicator */}
                    {hasVideo && (
                      <div className="absolute top-4 right-4 rounded-full p-2 bg-black/50 backdrop-blur-sm">
                        <PlayIcon className="h-4 w-4 text-white" />
                      </div>
                    )}

                    {/* Featured Badge */}
                    {project.featured && (
                      <div className="absolute top-4 left-4">
                        <span className="px-2 py-1 bg-green-500/90 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest rounded">
                          FEATURED
                        </span>
                      </div>
                    )}

                    {/* View Details Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <Link
                        href={`/projects`}
                        className="px-6 py-3 bg-primary text-white font-bold rounded-full transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 bg-slate-50 rounded-2xl shadow-sm border border-slate-100">
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
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-700 mb-2">
                No Projects Found
              </h3>
              <p className="text-sm text-slate-400 mb-4">
                Add some projects to Firebase with "published: true" to see them here
              </p>
            </div>
          )}

          {/* View All Projects Button */}
          {featuredProjects.length > 0 && (
            <div className="text-center mt-12">
              <Link
                href="/projects"
                className="inline-flex items-center justify-center gap-3 bg-primary text-white font-bold py-4 px-8 rounded-4xl hover:bg-primary/90 transition-colors duration-300 shadow-lg hover:shadow-xl"
              >
                <span>View All Projects</span>
                <ArrowRightIcon className="h-5 w-5" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Services Grid */}
      

      {/* Why Choose Us Section */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="relative h-[500px] rounded-[3rem] overflow-hidden shadow-2xl">
                <Image 
                  src="https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1000"
                  alt="Dubai Excellence"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -top-10 -left-10 w-48 h-48 bg-primary/20 rounded-full blur-3xl -z-10"></div>
            </div>
            
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-serif text-secondary leading-tight">
                The RAGDOLL PROPERTIES <span className="text-primary italic">Standard</span> of Service
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                We don't just provide services; we curate experiences. Our approach is rooted in the belief that luxury is defined by the details and the quality of the relationship.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <div className="text-3xl font-serif text-primary">24/7</div>
                  <div className="text-sm font-bold text-secondary uppercase tracking-widest">Concierge Support</div>
                  <p className="text-xs text-slate-400">Always available for our global clientele.</p>
                </div>
                <div className="space-y-3">
                  <div className="text-3xl font-serif text-primary">100%</div>
                  <div className="text-sm font-bold text-secondary uppercase tracking-widest">Transparency</div>
                  <p className="text-xs text-slate-400">Full disclosure in every transaction.</p>
                </div>
              </div>

              <div className="pt-6">
                <Link href="/about" className="px-10 py-4 bg-secondary text-white font-bold rounded-xl hover:bg-primary hover:text-secondary transition-all duration-300 shadow-xl shadow-secondary/20">
                  Learn More About Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container-custom">
          <div className="bg-secondary rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 -skew-x-12 translate-x-1/4"></div>
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-serif text-white mb-8">Ready to Experience <span className="text-primary italic">Excellence</span>?</h2>
              <p className="text-xl text-slate-300 mb-12">
                Contact our specialist team today for a confidential consultation regarding your property requirements.
              </p>
              <Link
                href="/contact"
                className="px-12 py-5 bg-primary text-secondary font-bold rounded-2xl hover:bg-white transition-all duration-300 shadow-2xl shadow-primary/20"
              >
                Book a Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}