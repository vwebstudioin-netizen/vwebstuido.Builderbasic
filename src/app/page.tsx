import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import ServicesSection from '@/components/ServicesSection'
import ProjectsSection from '@/components/ProjectsSection'
import StatsSection from '@/components/StatsSection'
import AboutSection from '@/components/AboutSection'
import TestimonialsSection from '@/components/TestimonialsSection'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import { getCompanyInfo, getAvailableServices, getVisibleProjects, getVisibleTestimonials } from '@/lib/firestore'
import { DEFAULT_COMPANY, DEFAULT_SERVICES, DEFAULT_PROJECTS, DEFAULT_TESTIMONIALS } from '@/types'

// ISR: revalidate every 60 seconds
export const revalidate = 60

export default async function Home() {
  const [companyData, servicesData, projectsData, testimonialsData] = await Promise.all([
    getCompanyInfo(),
    getAvailableServices(),
    getVisibleProjects(),
    getVisibleTestimonials(),
  ])

  // Fall back to demo data if Firebase not yet configured
  const company = companyData ?? DEFAULT_COMPANY
  const services = servicesData.length > 0 ? servicesData : DEFAULT_SERVICES
  const projects = projectsData.length > 0 ? projectsData : DEFAULT_PROJECTS
  const testimonials = testimonialsData.length > 0 ? testimonialsData : DEFAULT_TESTIMONIALS

  return (
    <main>
      <Navbar companyName={company.name} logo={company.logo} phone={company.phone} />
      <HeroSection company={company} />
      <ServicesSection services={services} />
      <ProjectsSection projects={projects} />
      <StatsSection company={company} />
      <AboutSection company={company} />
      <TestimonialsSection testimonials={testimonials} />
      <ContactSection company={company} />
      <Footer company={company} />
      <WhatsAppButton whatsapp={company.whatsapp} />
    </main>
  )
}
