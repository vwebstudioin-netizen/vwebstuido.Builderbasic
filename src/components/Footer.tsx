import { FaInstagram, FaFacebook, FaYoutube } from 'react-icons/fa'
import type { CompanyInfo } from '@/types'

const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
]

interface FooterProps {
  company: CompanyInfo
}

export default function Footer({ company }: FooterProps) {
  return (
    <footer className="bg-primary text-white/80">
      <div className="container-custom py-12">
        <div className="grid md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-accent rounded flex items-center justify-center">
                <span className="text-white font-display font-bold text-sm">RC</span>
              </div>
              <h3 className="font-display text-xl text-white font-bold">{company.name}</h3>
            </div>
            <p className="font-body text-sm leading-relaxed mb-4 text-white/60">{company.tagline}</p>
            <div className="flex gap-3">
              {company.socialLinks.instagram && (
                <a
                  href={company.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-accent transition-all duration-200"
                >
                  <FaInstagram size={16} />
                </a>
              )}
              {company.socialLinks.facebook && (
                <a
                  href={company.socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-blue-600 transition-all duration-200"
                >
                  <FaFacebook size={16} />
                </a>
              )}
              {company.socialLinks.youtube && (
                <a
                  href={company.socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-red-600 transition-all duration-200"
                >
                  <FaYoutube size={16} />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-body text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-body text-sm hover:text-accent transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-body text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Contact
            </h4>
            <div className="space-y-2 font-body text-sm">
              <p className="text-white/60">{company.address}</p>
              <a href={`tel:${company.phone}`} className="block hover:text-accent transition-colors">
                {company.phone}
              </a>
              <a href={`mailto:${company.email}`} className="block hover:text-accent transition-colors">
                {company.email}
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="font-body text-xs text-white/40">
            © {new Date().getFullYear()} {company.name}. All rights reserved.
          </p>
          <p className="font-body text-xs text-white/40">
            Designed & Developed by{' '}
            <span className="text-accent">VwebStudio</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
