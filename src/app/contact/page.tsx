import type { Metadata } from 'next'
import { ContactContent } from './contact-content'

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://imagecirclemaker.com/contact',
  },
}

export default function ContactPage() {
  return <ContactContent />
} 