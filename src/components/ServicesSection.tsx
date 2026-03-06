'use client'

import { motion } from 'framer-motion'
import {
  FiHome, FiGrid, FiTool, FiLayers, FiAnchor, FiDroplet,
  FiCheckCircle,
} from 'react-icons/fi'
import type { Service } from '@/types'

const ICON_MAP: Record<string, React.ElementType> = {
  FiHome,
  FiGrid,
  FiTool,
  FiLayers,
  FiAnchor,
  FiDroplet,
}

interface ServicesSectionProps {
  services: Service[]
}

export default function ServicesSection({ services }: ServicesSectionProps) {
  return (
    <section id="services" className="py-20 md:py-28 bg-white">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="section-tag"
          >
            What We Do
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-title"
          >
            Our Services
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="section-subtitle mt-4 max-w-xl mx-auto"
          >
            From ground-up construction to interior fit-outs, we deliver complete building solutions under one roof.
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const Icon = ICON_MAP[service.icon] ?? FiCheckCircle
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group p-7 bg-slate rounded-xl border border-gray-100 hover:border-primary hover:shadow-md transition-all duration-300 hover:-translate-y-1"
              >
                {/* Icon */}
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-primary transition-colors duration-300">
                  <Icon className="text-primary group-hover:text-white transition-colors duration-300" size={22} />
                </div>

                {/* Category badge */}
                <span className="inline-block bg-accent/10 text-accent text-xs font-body font-semibold px-3 py-1 rounded-full mb-3">
                  {service.category}
                </span>

                {/* Name */}
                <h3 className="font-display text-lg text-dark font-bold mb-2 group-hover:text-primary transition-colors">
                  {service.name}
                </h3>

                {/* Description */}
                <p className="font-body text-muted text-sm leading-relaxed line-clamp-3">
                  {service.description}
                </p>
              </motion.div>
            )
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a href="#contact" className="btn-primary gap-2">
            Get a Free Consultation
          </a>
        </motion.div>
      </div>
    </section>
  )
}
