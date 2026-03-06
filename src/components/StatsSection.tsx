'use client'

import { motion } from 'framer-motion'
import { FiAward, FiUsers, FiCheckSquare, FiUserCheck } from 'react-icons/fi'
import type { CompanyInfo } from '@/types'

interface StatsSectionProps {
  company: CompanyInfo
}

export default function StatsSection({ company }: StatsSectionProps) {
  const stats = [
    {
      icon: FiAward,
      value: `${company.yearsExperience}+`,
      label: 'Years of Experience',
      description: 'Trusted since 2009',
    },
    {
      icon: FiCheckSquare,
      value: `${company.projectsCompleted}+`,
      label: 'Projects Completed',
      description: 'Across Hyderabad',
    },
    {
      icon: FiUsers,
      value: `${company.happyClients}+`,
      label: 'Happy Clients',
      description: '98% satisfaction rate',
    },
    {
      icon: FiUserCheck,
      value: `${company.teamSize}+`,
      label: 'Team Members',
      description: 'Skilled professionals',
    },
  ]

  return (
    <section className="bg-primary py-16">
      <div className="container-custom">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Icon className="text-accent" size={22} />
                </div>
                <p className="font-display text-4xl font-bold text-white mb-1">{stat.value}</p>
                <p className="font-body text-sm font-semibold text-white/90">{stat.label}</p>
                <p className="font-body text-xs text-white/50 mt-0.5">{stat.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
