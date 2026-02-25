'use client'

import { BuildingOfficeIcon, UsersIcon, TrophyIcon, ShieldCheckIcon, HeartIcon, GlobeAltIcon, SparklesIcon, ChartBarIcon, HomeIcon, CurrencyDollarIcon, KeyIcon, BuildingLibraryIcon, ArrowRightIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase-browser'

interface AgentWithProfile {
  id: string;
  title: string;
  bio: string | null;
  experience_years: number;
  rating: number;
  review_count: number;
  total_sales: number;
  profile_image: string;
  office: string;
  license_no: string;
  approved: boolean;
  brokerage: string;
  certifications: string[];
  commission_rate: number;
  verified: boolean;
  location: string;
}

interface Partner {
  id: string;
  name: string;
  description: string;
  logo: string;
  category: string;
  website: string;
  featured: boolean;
  active: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

async function fetchTopAgents(): Promise<AgentWithProfile[]> {
  try {
    const { data, error } = await supabase
      .from('agents')
      .select('*')
      .eq('approved', true)
      .limit(6);

    if (error) throw error;

    const agents: AgentWithProfile[] = (data || []).map((row: any) => ({
      id: row.id,
      title: row.title || "Real Estate Agent",
      bio: row.bio || null,
      experience_years: row.experience_years || 0,
      rating: row.rating || 0,
      review_count: row.review_count || 0,
      total_sales: row.total_sales || 0,
      profile_image: row.profile_image || `https://ui-avatars.com/api/?name=${encodeURIComponent(row.title || "Agent")}&background=random`,
      office: row.office || "Dubai",
      license_no: row.license_no || "",
      approved: row.approved || false,
      brokerage: row.brokerage || "RAGDOLL Properties",
      certifications: row.certifications || [],
      commission_rate: row.commission_rate || 2.5,
      verified: row.verified || false,
      location: row.office || "Dubai",
    }));

    agents.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    return agents.slice(0, 4);
  } catch (error) {
    console.error("Error fetching agents:", error);
    return [];
  }
}

async function fetchFeaturedPartners(): Promise<Partner[]> {
  try {
    console.log("🔍 Fetching partners from Supabase...");
    
    const { data, error } = await supabase
      .from('partners')
      .select('*')
      .eq('is_active', true)
      .limit(10);
    
    if (error) throw error;
    
    console.log(`✅ Found ${data?.length || 0} partners with active=true`);
    
    if (data && data.length > 0) {
      const partners: Partner[] = data.map((row: any) => ({
        id: row.id,
        name: row.name || "Partner",
        description: row.description || "Trusted partner providing exceptional services",
        logo: row.logo_url || "https://via.placeholder.com/150x100",
        category: row.category || "Services",
        website: row.website_url || "#",
        featured: row.featured || false,
        active: row.is_active || false,
        order: row.sort_order || 999,
        createdAt: row.created_at || new Date().toISOString(),
        updatedAt: row.updated_at || new Date().toISOString(),
      }));
      
      // Sort on client side
      partners.sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return (a.order || 999) - (b.order || 999);
      });
      
      console.log(`🎯 Returning ${partners.length} active partners`);
      return partners.slice(0, 6);
    }
    
    return [];
    
  } catch (error) {
    console.error("🔥 Error fetching partners:", error);
    
    // Return mock data for testing
    console.log("📝 Returning mock partners data for testing");
    return [
      {
        id: "mock-1",
        name: "Largify Solutions",
        description: "A company partner description outlines the role of a senior leader or co-owner driving growth, strategy, and operations, sharing profits/losses, and managing key relationships.",
        logo: "https://images.pexels.com/photos/12437056/pexels-photo-12437056.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        category: "Mortgage Services",
        website: "https://twitter.com",
        featured: false,
        active: true,
        order: 3,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "mock-2",
        name: "Dubai Financial Services",
        description: "Premium financial services and investment solutions for high-net-worth individuals.",
        logo: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=300&h=200&fit=crop",
        category: "Financial Services",
        website: "https://dubaifs.com",
        featured: true,
        active: true,
        order: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "mock-3",
        name: "Property Legal Advisors",
        description: "Expert legal services for real estate transactions and property law.",
        logo: "https://images.unsplash.com/photo-1589391886085-8b6b0ac72a1a?w=300&h=200&fit=crop",
        category: "Legal Services",
        website: "https://propertylegal.com",
        featured: true,
        active: true,
        order: 2,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
    ];
  }
}

export default function AboutPage() {
  const [topAgents, setTopAgents] = useState<AgentWithProfile[]>([]);
  const [featuredPartners, setFeaturedPartners] = useState<Partner[]>([]);
  const [loadingPartners, setLoadingPartners] = useState(true);
  const [partnersError, setPartnersError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        console.log("📦 Loading data for About page...");
        
        const [agents, partners] = await Promise.all([
          fetchTopAgents(),
          fetchFeaturedPartners()
        ]);
        
        console.log(`👥 Agents loaded: ${agents.length}`);
        console.log(`🤝 Partners loaded: ${partners.length}`);
        
        setTopAgents(agents);
        setFeaturedPartners(partners);
        
        if (partners.length === 0) {
          setPartnersError("No active partners found. Please add partners to the database.");
        }
      } catch (error) {
        console.error("Error loading data:", error);
        setPartnersError("Failed to load partners. Using demo data.");
        
        // Set demo partners
        setFeaturedPartners([
          {
            id: "demo-1",
            name: "Largify Solutions",
            description: "Leading mortgage services provider for premium properties.",
            logo: "https://images.pexels.com/photos/12437056/pexels-photo-12437056.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            category: "Mortgage Services",
            website: "https://twitter.com",
            featured: false,
            active: true,
            order: 3,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            id: "demo-2",
            name: "Dubai Bank",
            description: "Premium banking and financial services for international clients.",
            logo: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w-300&h=200&fit=crop",
            category: "Banking",
            website: "https://dubaibank.com",
            featured: true,
            active: true,
            order: 1,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          }
        ]);
      } finally {
        setLoadingPartners(false);
      }
    };
    
    loadData();
  }, []);

  const stats = [
    { label: 'Properties Sold', value: '5,000+', icon: HomeIcon, description: 'Prime Dubai real estate transactions' },
    { label: 'Client Portfolio', value: '10,000+', icon: UsersIcon, description: 'Satisfied global investors' },
    { label: 'Market Experience', value: '15+ Years', icon: TrophyIcon, description: 'Established 2008' },
    { label: 'Portfolio Value', value: 'AED 20B+', icon: CurrencyDollarIcon, description: 'Total property value managed' },
  ]

  const values = [
    {
      icon: ShieldCheckIcon,
      title: 'Integrity & Transparency',
      description: 'Every transaction is built on trust and complete transparency. We believe honesty is the foundation of lasting relationships.'
    },
    {
      icon: SparklesIcon,
      title: 'Excellence in Service',
      description: 'We deliver exceptional service at every touchpoint, ensuring every client experience exceeds expectations.'
    },
    {
      icon: ChartBarIcon,
      title: 'Market Intelligence',
      description: 'Leveraging deep market insights and data analytics to provide strategic real estate investment advice.'
    },
    {
      icon: BuildingLibraryIcon,
      title: 'Sustainable Growth',
      description: 'Committed to responsible real estate development that benefits communities and preserves value.'
    },
  ]

  const services = [
    { title: 'Residential Sales', count: '2,500+', description: 'Luxury apartments, villas & penthouses' },
    { title: 'Commercial Leasing', count: '1,200+', description: 'Office spaces & retail locations' },
    { title: 'Property Management', count: '800+', description: 'Premium portfolio management' },
    { title: 'Investment Advisory', count: '500+', description: 'Strategic investment guidance' },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-linear-to-br from-secondary to-slate-900">
        <div className="absolute inset-0">
          <Image 
            src="https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Dubai Luxury Properties"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-r from-secondary/90 via-secondary/70 to-transparent"></div>
        </div>
        
        <div className="container-custom relative z-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-8">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="text-white text-sm font-bold tracking-widest uppercase">Since 2008</span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-6 leading-tight">
              <span className="text-primary">RAGDOLL</span><br />
              Properties
            </h1>
            <p className="text-xl text-slate-200 mb-8 leading-relaxed">
              Premier real estate specialists connecting discerning clients with Dubai's most exclusive properties. 
              Your gateway to luxury living and smart investments in the world's most dynamic property market.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/properties" 
                className="px-8 py-4 bg-primary text-secondary font-bold rounded-xl hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl text-center"
              >
                View Our Portfolio
              </Link>
              <Link 
                href="/contact" 
                className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-secondary transition-all duration-300 text-center"
              >
                Book Consultation
              </Link>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
          <div className="flex items-center gap-8 text-white/80 text-sm">
            <div className="flex items-center gap-2">
              <ShieldCheckIcon className="h-5 w-5 text-primary" />
              <span>RERA Certified</span>
            </div>
            <div className="h-4 w-px bg-white/30"></div>
            <div className="flex items-center gap-2">
              <TrophyIcon className="h-5 w-5 text-primary" />
              <span>15+ Industry Awards</span>
            </div>
            <div className="h-4 w-px bg-white/30"></div>
            <div className="flex items-center gap-2">
              <GlobeAltIcon className="h-5 w-5 text-primary" />
              <span>Global Network</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-primary/30 transition-all duration-300 group hover:-translate-y-2">
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <stat.icon className="h-8 w-8 text-primary group-hover:text-white" />
                </div>
                <div className="text-4xl font-black text-secondary mb-2">{stat.value}</div>
                <div className="text-lg font-bold text-slate-800 mb-2">{stat.label}</div>
                <div className="text-sm text-slate-500">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 bg-slate-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                <Image 
                  src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  alt="RAGDOLL Properties Team"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-primary/10 rounded-full -z-10"></div>
            </div>
            
            <div className="space-y-8">
              <div>
                <span className="inline-block px-4 py-1 bg-primary/10 text-primary text-sm font-bold tracking-widest uppercase rounded-full mb-4">
                  Our Journey
                </span>
                <h2 className="text-4xl md:text-5xl font-serif text-secondary leading-tight">
                  Building <span className="text-primary">Trust</span> Since 2008
                </h2>
              </div>
              
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p className="text-lg">
                  Founded in 2008, RAGDOLL Properties emerged as a visionary real estate firm dedicated to transforming Dubai's property landscape. What began as a boutique agency has grown into one of the region's most respected property consultancies.
                </p>
                <p>
                  Our name, RAGDOLL, represents flexibility and personalized service - adapting to our clients' needs while maintaining the highest standards of professionalism. Over the past decade, we have been instrumental in shaping Dubai's luxury residential and commercial sectors.
                </p>
                <p>
                  Today, we stand as a bridge between international investors and Dubai's dynamic real estate market, combining local expertise with global perspectives to deliver exceptional results.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6 pt-4">
                {services.map((service, index) => (
                  <div key={index} className="p-4 bg-white rounded-xl border border-slate-100">
                    <div className="text-2xl font-black text-primary mb-1">{service.count}</div>
                    <div className="font-bold text-slate-800 mb-1">{service.title}</div>
                    <div className="text-sm text-slate-500">{service.description}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-secondary mb-6">
              Our <span className="text-primary">Core Values</span>
            </h2>
            <p className="text-lg text-slate-600">
              The principles that guide every decision and define our relationship with clients
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="group">
                <div className="h-full p-8 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-xl hover:border-primary/20 transition-all duration-300">
                  <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <value.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-4">{value.title}</h3>
                  <p className="text-slate-600">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Strategic Partners Section */}
      <section className="py-24 bg-linear-to-br from-slate-900 to-secondary">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">
              Our <span className="text-primary">Strategic Partners</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Collaborating with industry leaders to provide comprehensive real estate solutions
            </p>
          </div>

          {loadingPartners ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              <p className="text-white/70 mt-4">Loading our partners...</p>
            </div>
          ) : featuredPartners.length > 0 ? (
            <>
              {partnersError && (
                <div className="mb-8 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg max-w-2xl mx-auto">
                  <p className="text-yellow-200 text-sm text-center">
                    {partnersError}
                  </p>
                </div>
              )}
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {featuredPartners.map((partner) => (
                  <div 
                    key={partner.id} 
                    className="group relative bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-primary/30 transition-all duration-300 hover:scale-105"
                  >
                    {partner.featured && (
                      <div className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                        Featured
                      </div>
                    )}
                    
                    <div className="flex flex-col items-center h-full">
                      {/* Partner Logo */}
                      <div className="w-20 h-20 rounded-lg bg-white/10 p-2 flex items-center justify-center mb-4">
                        <div className="relative w-full h-full">
                          <Image
                            src={partner.logo}
                            alt={partner.name}
                            fill
                            className="object-contain p-1"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 16vw"
                            onError={(e) => {
                              e.currentTarget.src = "https://via.placeholder.com/150x100";
                            }}
                          />
                        </div>
                      </div>
                      
                      {/* Partner Info */}
                      <div className="text-center flex-1">
                        <h3 className="text-sm font-bold text-white mb-1 line-clamp-1">
                          {partner.name}
                        </h3>
                        
                        <div className="mb-2">
                          <span className="inline-block px-2 py-0.5 bg-primary/20 text-primary text-xs font-medium rounded">
                            {partner.category}
                          </span>
                        </div>
                        
                        <p className="text-xs text-slate-300 mb-2 line-clamp-2">
                          {partner.description.length > 80 ? partner.description.substring(0, 80) + '...' : partner.description}
                        </p>
                      </div>
                      
                     
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Partners Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
                <div className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="text-2xl font-black text-primary mb-1">{featuredPartners.length}</div>
                  <div className="text-sm text-white/80">Active Partners</div>
                </div>
                <div className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="text-2xl font-black text-primary mb-1">
                    {featuredPartners.filter(p => p.category.includes('Mortgage') || p.category.includes('Finance')).length}
                  </div>
                  <div className="text-sm text-white/80">Finance Partners</div>
                </div>
                <div className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="text-2xl font-black text-primary mb-1">
                    {featuredPartners.filter(p => p.featured).length}
                  </div>
                  <div className="text-sm text-white/80">Featured Partners</div>
                </div>
                <div className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="text-2xl font-black text-primary mb-1">
                    {new Set(featuredPartners.map(p => p.category)).size}
                  </div>
                  <div className="text-sm text-white/80">Service Categories</div>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-12 bg-white/5 rounded-2xl border border-white/10">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-white/10 rounded-full">
                <svg className="w-8 h-8 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">No Partners Found</h3>
              <p className="text-slate-300 mb-4">
                Add partners to the "partners" table with "active: true"
              </p>
              <div className="text-sm text-slate-400 space-y-1">
                <p>Required fields: name, logo, category, website</p>
                <p>Optional: featured (boolean), order (number), description</p>
                <p>Make sure "active" field is set to true</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Top Agents Section */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-secondary mb-6">
              Our <span className="text-primary">Top Performing</span> Agents
            </h2>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto">
              Award-winning professionals dedicated to finding your perfect property match
            </p>
          </div>
          
          {topAgents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {topAgents.map((agent) => (
                <div key={agent.id} className="group">
                  <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                    <div className="relative h-64">
                      <Image
                        src={agent.profile_image}
                        alt={agent.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(agent.title || "Agent")}&background=random`;
                        }}
                      />
                      {agent.verified && (
                        <div className="absolute top-4 right-4 bg-primary text-white text-xs font-bold px-2 py-1 rounded-full">
                          Verified
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-slate-800 mb-2">{agent.title}</h3>
                      <div className="flex items-center gap-2 text-slate-500 text-sm mb-3">
                        <BuildingOfficeIcon className="h-4 w-4" />
                        <span>{agent.brokerage}</span>
                      </div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} className={`h-4 w-4 ${i < Math.floor(agent.rating) ? 'text-yellow-400' : 'text-slate-300'}`} fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                          <span className="ml-1 text-slate-600 font-medium">{agent.rating}</span>
                        </div>
                        <div className="text-sm text-slate-500">{agent.review_count} reviews</div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="text-slate-600">
                          <span className="font-bold">{agent.experience_years} years</span> experience
                        </div>
                        <div className="text-primary font-bold">
                          {agent.total_sales}+ sales
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-slate-400 mb-4">Loading our elite agents...</div>
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              href="/agents"
              className="inline-flex items-center justify-center gap-3 bg-primary text-white font-bold py-4 px-8 rounded-xl hover:bg-secondary transition-all duration-300"
            >
              View All Team Members
              <ArrowRightIcon className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Partnerships & Recognition */}
      <section className="py-20 bg-slate-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-slate-800 mb-4">Trusted By Industry Leaders</h3>
            <p className="text-slate-600 max-w-2xl mx-auto">
              We partner with Dubai's premier developers and maintain accreditations with global real estate bodies
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 items-center">
            {['Emaar', 'Damac', 'Dubai Properties', 'Meraas', 'Nakheel', 'Deyaar'].map((developer) => (
              <div key={developer} className="h-16 flex items-center justify-center p-4 bg-white rounded-lg border border-slate-100 hover:shadow-md transition-shadow">
                <div className="text-lg font-bold text-slate-700 opacity-70 hover:opacity-100 transition-opacity">
                  {developer}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container-custom">
          <div className="bg-linear-to-r from-primary to-secondary rounded-3xl p-12 md:p-16 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 -skew-x-12 translate-x-1/4"></div>
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-serif text-white mb-8">
                Ready to Find Your <span className="text-slate-900">Dream Property</span>?
              </h2>
              <p className="text-xl text-slate-200 mb-12">
                Join thousands of satisfied clients who have trusted RAGDOLL Properties with their real estate journey
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link
                  href="/contact"
                  className="px-10 py-4 bg-white text-secondary font-bold rounded-xl hover:bg-slate-100 transition-all duration-300 shadow-xl"
                >
                  Schedule a Consultation
                </Link>
                <Link
                  href="/properties"
                  className="px-10 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-secondary transition-all duration-300"
                >
                  Browse Properties
                </Link>
              </div>
              
              <div className="mt-12 pt-8 border-t border-white/10">
                <div className="flex flex-wrap justify-center gap-8 text-white/80 text-sm">
                  <div className="flex items-center gap-2">
                    <KeyIcon className="h-5 w-5" />
                    <span>Free Property Valuation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheckIcon className="h-5 w-5" />
                    <span>100% Transaction Security</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <HeartIcon className="h-5 w-5" />
                    <span>Personalized Service</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}