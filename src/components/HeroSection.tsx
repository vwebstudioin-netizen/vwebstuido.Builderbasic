'use client'

import { motion } from 'framer-motion'
import { FiPhone, FiMessageCircle, FiArrowRight } from 'react-icons/fi'
import type { CompanyInfo } from '@/types'

interface HeroSectionProps {
  company: CompanyInfo
}

export default function HeroSection({ company }: HeroSectionProps) {
  return (
    <section
      className="relative min-h-screen flex items-center bg-primary overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(26,60,94,0.85), rgba(26,60,94,0.92)), url(${company.heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Decorative accent line */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent" />

      <div className="container-custom pt-20 pb-16 relative z-10">
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-body text-accent text-sm font-semibold tracking-widest uppercase mb-4"
          >
            Trusted Builders & Contractors
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl text-white font-bold leading-tight mb-6"
          >
            {company.tagline}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-body text-white/75 text-lg leading-relaxed mb-8 max-w-xl"
          >
            {company.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-3"
          >
            <a href="#contact" className="btn-accent gap-2">
              Get Free Site Visit
              <FiArrowRight size={16} />
            </a>
            <a
              href={`https://wa.me/${company.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline gap-2"
            >
              <FiMessageCircle size={16} />
              WhatsApp Us
            </a>
            <a href={`tel:${company.phone}`} className="btn-outline gap-2">
              <FiPhone size={16} />
              Call Now
            </a>
          </motion.div>

          {/* Quick stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-white/20"
          >
            {[
              { value: `${company.yearsExperience}+`, label: 'Years Experience' },
              { value: `${company.projectsCompleted}+`, label: 'Projects Completed' },
              { value: `${company.happyClients}+`, label: 'Happy Clients' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-3xl font-bold text-accent">{stat.value}</p>
                <p className="font-body text-white/60 text-sm">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
