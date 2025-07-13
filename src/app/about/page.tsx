import type { Metadata } from 'next'
import { AboutContent } from './about-content'

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://imagecirclemaker.com/about',
  },
}

export default function AboutPage() {
  return <AboutContent />
} 