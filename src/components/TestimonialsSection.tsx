'use client'

import { motion } from 'framer-motion'
import { FiStar } from 'react-icons/fi'
import type { Testimonial } from '@/types'

interface TestimonialsSectionProps {
  testimonials: Testimonial[]
}

export default function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  if (testimonials.length === 0) return null

  return (
    <section id="testimonials" className="py-20 md:py-28 bg-slate">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="section-tag"
          >
            Client Reviews
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-title"
          >
            What Our Clients Say
          </motion.h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <FiStar
                    key={idx}
                    size={16}
                    className={idx < t.rating ? 'text-accent fill-accent' : 'text-gray-200'}
                    style={{ fill: idx < t.rating ? '#F59E0B' : 'none' }}
                  />
                ))}
              </div>

              {/* Comment */}
              <p className="font-body text-dark text-sm leading-relaxed mb-5 italic">
                &ldquo;{t.comment}&rdquo;
              </p>

              {/* Client */}
              <div className="flex items-center gap-3 border-t border-gray-100 pt-4">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="font-display font-bold text-primary text-sm">
                    {t.clientName.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-body font-semibold text-dark text-sm">{t.clientName}</p>
                  <p className="font-body text-muted text-xs">
                    {t.projectType} · {t.location}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
