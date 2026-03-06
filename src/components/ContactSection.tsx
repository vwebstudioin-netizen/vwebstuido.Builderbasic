'use client'

import { motion } from 'framer-motion'
import { FiPhone, FiMail, FiMapPin, FiMessageCircle, FiClock } from 'react-icons/fi'
import type { CompanyInfo } from '@/types'

interface ContactSectionProps {
  company: CompanyInfo
}

export default function ContactSection({ company }: ContactSectionProps) {
  return (
    <section id="contact" className="py-20 md:py-28 bg-white">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="section-tag"
          >
            Get In Touch
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-title"
          >
            Let&apos;s Build Together
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="section-subtitle mt-4 max-w-lg mx-auto"
          >
            Contact us for a free site visit and consultation. We&apos;ll assess your requirements and provide a detailed estimate.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="font-display text-xl font-bold text-dark">Contact Details</h3>

            {[
              { icon: FiPhone, label: 'Phone', value: company.phone, href: `tel:${company.phone}` },
              { icon: FiMail, label: 'Email', value: company.email, href: `mailto:${company.email}` },
              { icon: FiMapPin, label: 'Address', value: company.address, href: undefined },
            ].map((item) => {
              const Icon = item.icon
              return (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon className="text-primary" size={18} />
                  </div>
                  <div>
                    <p className="font-body text-xs text-muted font-medium uppercase tracking-wider mb-0.5">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a href={item.href} className="font-body text-dark text-sm hover:text-primary transition-colors">
                        {item.value}
                      </a>
                    ) : (
                      <p className="font-body text-dark text-sm">{item.value}</p>
                    )}
                  </div>
                </div>
              )
            })}

            {/* Working hours */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <FiClock className="text-primary" size={18} />
              </div>
              <div>
                <p className="font-body text-xs text-muted font-medium uppercase tracking-wider mb-1">Working Hours</p>
                <p className="font-body text-dark text-sm">{company.workingHours.weekdays}</p>
                <p className="font-body text-dark text-sm">{company.workingHours.saturday}</p>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <a
              href={`https://wa.me/${company.whatsapp}?text=Hello%2C%20I%20would%20like%20a%20free%20site%20visit%20consultation.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-lg font-body font-semibold text-sm hover:bg-green-600 transition-colors"
            >
              <FiMessageCircle size={18} />
              Chat on WhatsApp
            </a>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl overflow-hidden border border-gray-200 min-h-72 bg-gray-100 flex items-center justify-center"
          >
            {/* Replace the src with an actual Google Maps embed for the client */}
            <div className="text-center p-8">
              <FiMapPin className="text-primary mx-auto mb-3" size={32} />
              <p className="font-body text-muted text-sm">
                Google Maps embed goes here.
              </p>
              <p className="font-body text-xs text-muted mt-1">
                Replace this with an iframe from Google Maps.
              </p>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(company.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 font-body text-sm text-primary underline"
              >
                View on Google Maps
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
