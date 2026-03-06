'use client'

import { FaWhatsapp } from 'react-icons/fa'

interface WhatsAppButtonProps {
  whatsapp: string
}

export default function WhatsAppButton({ whatsapp }: WhatsAppButtonProps) {
  return (
    <a
      href={`https://wa.me/${whatsapp}?text=Hello%2C%20I%20would%20like%20a%20free%20consultation%20for%20my%20project.`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
      title="Chat on WhatsApp"
    >
      <FaWhatsapp size={26} />
    </a>
  )
}
