'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiMapPin, FiCalendar } from 'react-icons/fi'
import type { Project, ProjectCategory } from '@/types'

const CATEGORIES: { key: ProjectCategory | 'All'; label: string }[] = [
  { key: 'All', label: 'All Projects' },
  { key: 'Residential', label: 'Residential' },
  { key: 'Commercial', label: 'Commercial' },
  { key: 'Renovation', label: 'Renovation' },
  { key: 'Interior', label: 'Interior' },
]

interface ProjectsSectionProps {
  projects: Project[]
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | 'All'>('All')

  const filtered =
    activeCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === activeCategory)

  return (
    <section id="projects" className="py-20 md:py-28 bg-slate">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="section-tag"
          >
            Our Work
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-title"
          >
            Featured Projects
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="section-subtitle mt-4 max-w-xl mx-auto"
          >
            A showcase of our completed projects — each built with precision, quality materials, and attention to detail.
          </motion.p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-5 py-2 rounded-lg font-body text-sm font-medium transition-all duration-200 ${
                activeCategory === cat.key
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-white text-dark border border-gray-200 hover:border-primary hover:text-primary'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="card group"
            >
              {/* Image */}
              <div className="relative overflow-hidden aspect-[4/3] bg-gray-200">
                <img
                  src={project.coverImage}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://placehold.co/600x450/1A3C5E/ffffff?text=Project'
                  }}
                />
                {/* Category badge */}
                <span className="absolute top-3 left-3 bg-accent text-white text-xs font-body font-semibold px-3 py-1 rounded-full">
                  {project.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-display text-lg text-dark font-bold mb-2 group-hover:text-primary transition-colors line-clamp-1">
                  {project.title}
                </h3>
                <p className="font-body text-muted text-sm leading-relaxed mb-4 line-clamp-2">
                  {project.description}
                </p>
                <div className="flex items-center justify-between text-xs font-body text-muted border-t border-gray-100 pt-3">
                  <span className="flex items-center gap-1">
                    <FiMapPin size={12} className="text-accent" />
                    {project.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <FiCalendar size={12} className="text-accent" />
                    {project.year}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-muted font-body py-10">
            No projects in this category yet.
          </p>
        )}
      </div>
    </section>
  )
}
