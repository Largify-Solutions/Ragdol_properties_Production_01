import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Database } from '@/lib/database.types'
import { createServiceClient } from '@/lib/supabase-server'
import {
  MapPinIcon,
  HomeIcon,
  CurrencyDollarIcon,
  CalendarDaysIcon,
  CheckCircleIcon,
  StarIcon,
  PhoneIcon,
  EnvelopeIcon,
  ChatBubbleLeftRightIcon,
  ArrowLeftIcon,
  ShareIcon,
  HeartIcon,
  PhotoIcon,
  DocumentTextIcon,
  ChevronDownIcon,
  UserGroupIcon,
  BuildingOfficeIcon,
  ClockIcon,
  GlobeAltIcon,
} from '@heroicons/react/24/outline'
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid'

type Project = Database['public']['Tables']['projects']['Row'] & {
  developer?: Database['public']['Tables']['developers']['Row']
  properties?: Database['public']['Tables']['properties']['Row'][]
  documents?: { name: string; url: string }[]
}

const mockExperts = [
  { id: '1', name: 'Robert Bunyan', role: 'Property Advisor', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80' },
  { id: '2', name: 'Mansour Akbari', role: 'Property Advisor', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80' },
  { id: '3', name: 'Bayrem Hamlaoui', role: 'Property Advisor', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&q=80' },
  { id: '4', name: 'Olga Mironova', role: 'Property Advisor', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80' },
  { id: '5', name: 'Jacksiry De Jesus', role: 'Property Advisor', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80' },
  { id: '6', name: 'Khine Wint War Zaw Tun', role: 'Property Advisor', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80' },
]

const mockFloorPlans = [
  { type: 'Apartment', beds: 1, sizeRange: '754 - 894 Sqft', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&q=80' },
  { type: 'Apartment', beds: 2, sizeRange: '1,266 - 1,549 Sqft', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&q=80' },
  { type: 'Apartment', beds: 3, sizeRange: '2,127 - 2,267 Sqft', image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=400&q=80' },
  { type: 'Apartment', beds: 4, sizeRange: '2,771 - 2,975 Sqft', image: 'https://images.unsplash.com/photo-1600566753151-384129cf4e3e?w=400&q=80' },
  { type: 'Penthouse', beds: 5, sizeRange: '9,398 - 9,398 Sqft', image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&q=80' },
]

async function getProject(id: string): Promise<Project | null> {
  try {
    const supabase = createServiceClient()
    const { data, error } = await supabase
      .from('projects')
      .select('*, developer:developers(*)')
      .or(`id.eq.${id},slug.eq.${id}`)
      .eq('published', true)
      .single()
    if (error || !data) return null
    return data as Project
  } catch {
    return null
  }
}

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const project = await getProject(id)

  if (!project) {
    notFound()
  }

  const formatPrice = (price: number) => {
    return `AED ${price.toLocaleString()}`
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="w-full min-h-screen bg-background">
      {/* Breadcrumbs */}
      <div className="border-b border-border bg-card/50">
        <div className="container-custom py-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link href="/projects" className="hover:text-primary transition-colors">Projects</Link>
            <span>/</span>
            <span className="text-foreground font-medium truncate">{project.name}</span>
          </nav>
        </div>
      </div>

      {/* Project Header */}
      <section className="container-custom py-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <Link
            href="/projects"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors w-fit"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Back to Projects
          </Link>
          <div className="flex items-center gap-2 sm:gap-3">
            <button className="flex items-center gap-2 px-3 py-2 text-sm border border-border rounded-lg hover:bg-muted transition-colors">
              <ShareIcon className="w-4 h-4" />
              <span className="hidden sm:inline">Share</span>
            </button>
            <button className="flex items-center gap-2 px-3 py-2 text-sm border border-border rounded-lg hover:bg-muted transition-colors">
              <HeartIcon className="w-4 h-4" />
              <span className="hidden sm:inline">Save</span>
            </button>
          </div>
        </div>
      </section>

      <div className="container-custom pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Project Hero */}
            <div className="card-custom overflow-hidden">
              <div className="relative">
                <div className="aspect-[16/9] relative overflow-hidden bg-muted">
                  <Image
                    src={project.hero_image_url || project.images?.[0] || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg=='}
                    alt={project.name}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                {/* Project Status Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 text-sm font-semibold bg-primary text-primary-foreground rounded-full capitalize">
                    {project.status?.replace('-', ' ')}
                  </span>
                </div>

                {/* Image Gallery Indicator */}
                {project.images && project.images.length > 1 && (
                  <div className="absolute top-4 right-4 px-3 py-1 bg-black/50 text-white text-sm rounded-full flex items-center gap-1">
                    <PhotoIcon className="w-4 h-4" />
                    {project.images.length}
                  </div>
                )}
              </div>

              {/* Project Title and Location */}
              <div className="p-6">
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <MapPinIcon className="w-4 h-4" />
                  <span>{project.area}, {project.city}</span>
                </div>
                <h1 className="text-3xl font-bold text-foreground mb-4">{project.name}</h1>
                <div className="text-2xl font-bold text-primary mb-4">
                  Starting from {formatPrice(project.starting_price || 0)}
                </div>
              </div>
            </div>

            {/* Project Highlights */}
            <div className="card-custom">
              <h2 className="text-2xl font-bold mb-6">Project Highlights</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-border">
                    <span className="text-muted-foreground">Developer</span>
                    <span className="text-foreground font-medium">{project.developer?.name || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border">
                    <span className="text-muted-foreground">Status</span>
                    <span className="text-foreground font-medium capitalize">{project.status?.replace('-', ' ')}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border">
                    <span className="text-muted-foreground">Type</span>
                    <span className="text-foreground font-medium">Apartments, Villas, Commercial</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border">
                    <span className="text-muted-foreground">Title type</span>
                    <span className="text-foreground font-medium">Freehold</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-border">
                    <span className="text-muted-foreground">Lifestyle</span>
                    <span className="text-foreground font-medium">Standard</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border">
                    <span className="text-muted-foreground">Completion</span>
                    <span className="text-foreground font-medium">
                      {project.completion_date ? formatDate(project.completion_date) : 'Q1 2030'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border">
                    <span className="text-muted-foreground">Launch Date</span>
                    <span className="text-foreground font-medium">
                      {project.launch_date ? formatDate(project.launch_date) : 'N/A'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Experts */}
            <div className="card-custom">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <UserGroupIcon className="w-6 h-6" />
                Project Experts
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockExperts.map((expert) => (
                  <div key={expert.id} className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden bg-muted shrink-0">
                      <Image
                        src={expert.avatar}
                        alt={expert.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">{expert.name}</h3>
                      <p className="text-sm text-muted-foreground">{expert.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Plans */}
            <div className="card-custom">
              <h2 className="text-2xl font-bold mb-6">Payment Plans</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-muted/50 rounded-lg">
                  <span className="font-medium">20%</span>
                  <span className="text-muted-foreground">First Installment</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-muted/50 rounded-lg">
                  <span className="font-medium">55%</span>
                  <span className="text-muted-foreground">Under Construction</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-muted/50 rounded-lg">
                  <span className="font-medium">25%</span>
                  <span className="text-muted-foreground">On Handover</span>
                </div>
              </div>
            </div>

            {/* Floor Plans */}
            <div className="card-custom">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <DocumentTextIcon className="w-6 h-6" />
                Floor Plans
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mockFloorPlans.map((plan, index) => (
                  <div key={index} className="border border-border rounded-lg overflow-hidden">
                    <div className="relative aspect-[4/3] bg-muted">
                      <Image
                        src={plan.image}
                        alt={`${plan.beds} Bed ${plan.type}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg">{plan.type}</h3>
                      <p className="text-primary font-medium">{plan.beds} Bed{plan.beds > 1 ? 's' : ''}</p>
                      <p className="text-sm text-muted-foreground">{plan.sizeRange}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Location */}
            <div className="card-custom">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <MapPinIcon className="w-6 h-6" />
                Location
              </h2>
              <div className="space-y-4">
                <div className="aspect-[16/9] bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <GlobeAltIcon className="w-12 h-12 mx-auto mb-2" />
                    <p>Interactive map would be displayed here</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold mb-2">Nearby Landmarks</h3>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Downtown Dubai (5 min)</li>
                      <li>• DIFC (10 min)</li>
                      <li>• Business Bay (8 min)</li>
                      <li>• Dubai International Airport (20 min)</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Area Highlights</h3>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Design studios & galleries</li>
                      <li>• Boutique retail & cafés</li>
                      <li>• Cultural events</li>
                      <li>• Waterfront location</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Views and Amenities */}
            <div className="card-custom">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-2xl font-bold mb-6">Views</h2>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <CheckCircleIcon className="w-5 h-5 text-primary" />
                      <span>Community View</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircleIcon className="w-5 h-5 text-primary" />
                      <span>Waterfront View</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircleIcon className="w-5 h-5 text-primary" />
                      <span>City Skyline View</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-6">Amenities</h2>
                  <div className="grid grid-cols-1 gap-3">
                    {project.amenities?.map((amenity, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <CheckCircleIcon className="w-5 h-5 text-primary shrink-0" />
                        <span className="text-sm">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Project Overview */}
            <div className="card-custom">
              <h2 className="text-2xl font-bold mb-6">Project Overview</h2>
              <div className="prose prose-invert max-w-none">
                <div className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {project.description}
                </div>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="card-custom">
              <h2 className="text-2xl font-bold mb-6">Share Your Experience</h2>
              <p className="text-muted-foreground mb-6">
                Check out reviews and share your rating for this project to help others make informed decisions.
              </p>
              <button className="btn-primary">
                REVIEW THIS PROJECT
              </button>
            </div>

            {/* FAQ Section */}
            <div className="card-custom">
              <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                <details className="border border-border rounded-lg">
                  <summary className="p-4 font-medium cursor-pointer flex justify-between items-center">
                    Where is the location of The Edit At D3?
                    <ChevronDownIcon className="w-5 h-5" />
                  </summary>
                  <div className="px-4 pb-4 text-muted-foreground">
                    The Edit at d3 is located in the Dubai Design District (d3), a creative and lifestyle-centric community in Dubai.
                  </div>
                </details>
                <details className="border border-border rounded-lg">
                  <summary className="p-4 font-medium cursor-pointer flex justify-between items-center">
                    What are the property types offered in The Edit At D3?
                    <ChevronDownIcon className="w-5 h-5" />
                  </summary>
                  <div className="px-4 pb-4 text-muted-foreground">
                    The project offers apartments, villas, commercial spaces, and staff accommodations.
                  </div>
                </details>
                <details className="border border-border rounded-lg">
                  <summary className="p-4 font-medium cursor-pointer flex justify-between items-center">
                    What are the available amenities in The Edit At D3?
                    <ChevronDownIcon className="w-5 h-5" />
                  </summary>
                  <div className="px-4 pb-4 text-muted-foreground">
                    Amenities include luxury finishing, gym, central A/C, CCTV cameras, shared pool, covered parking, and more.
                  </div>
                </details>
              </div>
              <button className="w-full btn-outline mt-6">
                MORE FAQS
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Form */}
            <div className="card-custom">
              <h3 className="text-xl font-bold mb-4">Get Exclusive Offers</h3>
              <p className="text-muted-foreground mb-6">
                Got more questions? Let's talk about your needs and investment goals
              </p>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2">I am interested in</label>
                  <select className="w-full p-3 border border-border rounded-lg bg-background">
                    <option>Buying</option>
                    <option>Selling</option>
                    <option>Renting</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">I am looking for</label>
                  <select className="w-full p-3 border border-border rounded-lg bg-background">
                    <option>Studio</option>
                    <option>1 Bed</option>
                    <option>2 Bed</option>
                    <option>3 Bed</option>
                    <option>4 Bed</option>
                    <option>5+ Bed</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Price range (AED)</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Min price"
                      className="flex-1 p-3 border border-border rounded-lg bg-background"
                    />
                    <input
                      type="number"
                      placeholder="Max price"
                      className="flex-1 p-3 border border-border rounded-lg bg-background"
                    />
                  </div>
                </div>
              </div>

              <button className="w-full btn-primary mb-4">
                Continue
              </button>

              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-4">
                  Amazing, give us a way to contact you
                </p>
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full p-3 border border-border rounded-lg bg-background mb-4"
                />
                <button className="w-full btn-primary">
                  Submit
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="card-custom">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                {project.documents && project.documents.length > 0 ? (
                  project.documents.map((doc, i) => (
                    <a
                      key={i}
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full btn-primary py-3 px-4 flex items-center gap-2 justify-center"
                    >
                      <DocumentTextIcon className="w-4 h-4 shrink-0" />
                      {doc.name}
                    </a>
                  ))
                ) : project.brochure_url ? (
                  <a
                    href={project.brochure_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full btn-primary py-3 px-4 flex items-center gap-2 justify-center"
                  >
                    <DocumentTextIcon className="w-4 h-4 shrink-0" />
                    Download Brochure
                  </a>
                ) : null}
                <button className="w-full btn-outline py-3 px-4">
                  Schedule Site Visit
                </button>
                <button className="w-full btn-outline py-3 px-4">
                  Request Callback
                </button>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="card-custom">
              <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
              <p className="text-muted-foreground mb-4">
                Sign up for our newsletter to stay up to date on the Dubai property market.
              </p>
              <input
                type="email"
                placeholder="Email Address"
                className="w-full p-3 border border-border rounded-lg bg-background mb-4"
              />
              <button className="w-full btn-primary">
                SUBSCRIBE
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}