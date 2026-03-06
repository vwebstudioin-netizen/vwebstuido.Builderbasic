'use client'

import { motion } from 'framer-motion'
import { FiCheckCircle } from 'react-icons/fi'
import type { CompanyInfo } from '@/types'

const WHY_US = [
  'Free site visit and consultation',
  'Transparent pricing — no hidden charges',
  '5-year structural warranty on all projects',
  'Licensed & experienced civil engineers',
  'Quality materials from trusted brands',
  'On-time project delivery, always',
]

interface AboutSectionProps {
  company: CompanyInfo
}

export default function AboutSection({ company }: AboutSectionProps) {
  return (
    <section id="about" className="py-20 md:py-28 bg-white">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gray-200">
              <img
                src="/images/about.jpg"
                alt={company.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://placehold.co/600x450/1A3C5E/ffffff?text=About+Us'
                }}
              />
            </div>
            {/* Accent box */}
            <div className="absolute -bottom-5 -right-5 bg-accent text-white rounded-xl p-5 shadow-lg">
              <p className="font-display text-3xl font-bold">{company.yearsExperience}+</p>
              <p className="font-body text-xs font-semibold mt-0.5">Years Experience</p>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="section-tag">About Us</p>
            <h2 className="section-title mb-5">
              Building Trust, One Project at a Time
            </h2>
            <p className="section-subtitle mb-8">{company.description}</p>

            {/* Why us */}
            <ul className="space-y-3">
              {WHY_US.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <FiCheckCircle className="text-accent mt-0.5 flex-shrink-0" size={18} />
                  <span className="font-body text-sm text-dark">{point}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <a href="#contact" className="btn-primary gap-2">
                Start Your Project
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
