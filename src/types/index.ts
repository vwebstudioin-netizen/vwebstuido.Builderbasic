export type ServiceCategory = 'Construction' | 'Renovation' | 'Interior' | 'Civil'
export type ProjectCategory = 'Residential' | 'Commercial' | 'Renovation' | 'Interior'

export interface CompanyInfo {
  name: string
  tagline: string
  description: string
  phone: string
  whatsapp: string
  email: string
  address: string
  yearsExperience: number
  projectsCompleted: number
  happyClients: number
  teamSize: number
  workingHours: {
    weekdays: string
    saturday: string
  }
  socialLinks: {
    instagram?: string
    facebook?: string
    youtube?: string
  }
  heroImage: string
  logo: string
}

export interface Service {
  id: string
  name: string
  description: string
  icon: string
  category: ServiceCategory
  isAvailable: boolean
  sortOrder: number
}

export interface Project {
  id: string
  title: string
  description: string
  category: ProjectCategory
  location: string
  year: number
  coverImage: string
  images: string[]
  isVisible: boolean
  isFeatured: boolean
  sortOrder: number
}

export interface Testimonial {
  id: string
  clientName: string
  comment: string
  rating: number
  projectType: string
  location: string
  isVisible: boolean
}

// ─── Demo / Fallback Data ──────────────────────────────────────────────────────

export const DEFAULT_COMPANY: CompanyInfo = {
  name: 'Reddy Constructions',
  tagline: 'Building Dreams, Delivering Quality',
  description:
    'With over 15 years of experience, Reddy Constructions is a trusted name in residential, commercial, and renovation projects across Hyderabad. We combine skilled craftsmanship with quality materials to deliver structures that stand the test of time.',
  phone: '+91 98765 43210',
  whatsapp: '919876543210',
  email: 'info@reddyconstructions.in',
  address: '14, Industrial Estate, Kukatpally, Hyderabad, Telangana - 500072',
  yearsExperience: 15,
  projectsCompleted: 200,
  happyClients: 180,
  teamSize: 30,
  workingHours: {
    weekdays: 'Mon – Sat: 9:00 AM – 6:00 PM',
    saturday: 'Sunday: Closed',
  },
  socialLinks: {
    instagram: 'https://instagram.com',
    facebook: 'https://facebook.com',
    youtube: 'https://youtube.com',
  },
  heroImage: '/images/hero.jpg',
  logo: '/images/logo.png',
}

export const DEFAULT_SERVICES: Service[] = [
  {
    id: '1',
    name: 'Residential Construction',
    description: 'End-to-end construction of villas, independent houses, and apartments. We handle design, structure, and finishing.',
    icon: 'FiHome',
    category: 'Construction',
    isAvailable: true,
    sortOrder: 1,
  },
  {
    id: '2',
    name: 'Commercial Construction',
    description: 'Offices, showrooms, warehouses, and commercial complexes built to specification with premium finishes.',
    icon: 'FiGrid',
    category: 'Construction',
    isAvailable: true,
    sortOrder: 2,
  },
  {
    id: '3',
    name: 'Home Renovation',
    description: 'Complete home makeovers — structural changes, tiling, painting, plumbing, and electrical upgrades.',
    icon: 'FiTool',
    category: 'Renovation',
    isAvailable: true,
    sortOrder: 3,
  },
  {
    id: '4',
    name: 'Interior Design & Fit-out',
    description: 'False ceilings, modular kitchens, wardrobes, flooring, and complete interior fit-outs.',
    icon: 'FiLayers',
    category: 'Interior',
    isAvailable: true,
    sortOrder: 4,
  },
  {
    id: '5',
    name: 'Civil & Structural Work',
    description: 'Foundation work, RCC structures, compound walls, storm drains, and civil repair services.',
    icon: 'FiAnchor',
    category: 'Civil',
    isAvailable: true,
    sortOrder: 5,
  },
  {
    id: '6',
    name: 'Painting & Waterproofing',
    description: 'Interior & exterior painting with premium brands. Terrace, basement, and bathroom waterproofing.',
    icon: 'FiDroplet',
    category: 'Renovation',
    isAvailable: true,
    sortOrder: 6,
  },
]

export const DEFAULT_PROJECTS: Project[] = [
  {
    id: '1',
    title: '3BHK Villa — Jubilee Hills',
    description: 'A luxurious 3BHK villa with modern architecture, premium flooring, and fully-fitted modular kitchen. Completed in 8 months.',
    category: 'Residential',
    location: 'Jubilee Hills, Hyderabad',
    year: 2023,
    coverImage: '/images/projects/project-1.jpg',
    images: ['/images/projects/project-1.jpg'],
    isVisible: true,
    isFeatured: true,
    sortOrder: 1,
  },
  {
    id: '2',
    title: 'Commercial Showroom — Banjara Hills',
    description: 'A 4,500 sqft commercial showroom with glass facade, false ceiling, and premium stone flooring for an automobile brand.',
    category: 'Commercial',
    location: 'Banjara Hills, Hyderabad',
    year: 2023,
    coverImage: '/images/projects/project-2.jpg',
    images: ['/images/projects/project-2.jpg'],
    isVisible: true,
    isFeatured: true,
    sortOrder: 2,
  },
  {
    id: '3',
    title: 'Full Home Renovation — Madhapur',
    description: 'Complete renovation of a 2BHK flat including kitchen remodelling, bathroom upgrades, tile work, and fresh paint throughout.',
    category: 'Renovation',
    location: 'Madhapur, Hyderabad',
    year: 2024,
    coverImage: '/images/projects/project-3.jpg',
    images: ['/images/projects/project-3.jpg'],
    isVisible: true,
    isFeatured: true,
    sortOrder: 3,
  },
  {
    id: '4',
    title: 'Office Interior Fit-out — HITEC City',
    description: 'Modern office interior with workstations, conference room, glass partitions, false ceiling, and ambient lighting.',
    category: 'Interior',
    location: 'HITEC City, Hyderabad',
    year: 2024,
    coverImage: '/images/projects/project-4.jpg',
    images: ['/images/projects/project-4.jpg'],
    isVisible: true,
    isFeatured: false,
    sortOrder: 4,
  },
  {
    id: '5',
    title: 'Compound Wall & Gate — Nizampet',
    description: 'RCC compound wall with decorative stone cladding and a custom fabricated steel gate for a residential plot.',
    category: 'Residential',
    location: 'Nizampet, Hyderabad',
    year: 2024,
    coverImage: '/images/projects/project-5.jpg',
    images: ['/images/projects/project-5.jpg'],
    isVisible: true,
    isFeatured: false,
    sortOrder: 5,
  },
  {
    id: '6',
    title: 'G+2 Apartment Block — Miyapur',
    description: 'Ground + 2 floor apartment block with 6 units, parking, and common staircase. Turnkey construction with Vastu compliance.',
    category: 'Residential',
    location: 'Miyapur, Hyderabad',
    year: 2022,
    coverImage: '/images/projects/project-6.jpg',
    images: ['/images/projects/project-6.jpg'],
    isVisible: true,
    isFeatured: false,
    sortOrder: 6,
  },
]

export const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    clientName: 'Suresh Kumar',
    comment: 'Reddy Constructions built our dream villa exactly as planned. Quality of work is top-notch and they completed it on time. Highly recommended!',
    rating: 5,
    projectType: 'Residential Villa',
    location: 'Jubilee Hills',
    isVisible: true,
  },
  {
    id: '2',
    clientName: 'Priya Sharma',
    comment: 'They renovated our entire home in just 6 weeks. The team was professional, clean, and the finishing is excellent. Very happy with the outcome.',
    rating: 5,
    projectType: 'Home Renovation',
    location: 'Madhapur',
    isVisible: true,
  },
  {
    id: '3',
    clientName: 'Ramesh Babu',
    comment: 'Our office interior was done beautifully. They understood our requirements perfectly and delivered within budget. Great experience overall.',
    rating: 5,
    projectType: 'Office Interior',
    location: 'HITEC City',
    isVisible: true,
  },
  {
    id: '4',
    clientName: 'Kavitha Reddy',
    comment: 'Very trustworthy contractors. They were transparent about costs and never surprised us with hidden charges. The construction quality is excellent.',
    rating: 4,
    projectType: 'G+2 Apartment',
    location: 'Miyapur',
    isVisible: true,
  },
]
