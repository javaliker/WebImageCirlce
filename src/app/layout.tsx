import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/header'
import { ThemeProvider } from '@/components/theme-provider'
import { LanguageProvider } from '@/contexts/LanguageContext'
import { MetadataUpdater } from '@/components/MetadataUpdater'

// 默认返回英文 metadata，客户端组件会动态更新
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'ImageCircleMaker - Free Online Circular Avatar Cropping Tool',
    description: 'Free online circular avatar cropping tool, supporting Instagram, LinkedIn, Facebook and other international platforms. No registration required, ready to use, one-click generation of perfect circular avatars.',
    keywords: 'circular avatar,avatar cropping,circular image,social media avatar,Instagram avatar,LinkedIn avatar,Facebook avatar',
    alternates: {
      canonical: 'https://imagecirclemaker.com',
    },
    openGraph: {
      title: 'ImageCircleMaker - Free Online Circular Avatar Cropping Tool',
      description: 'Free online circular avatar cropping tool, supporting Instagram, LinkedIn, Facebook and other international platforms. No registration required, ready to use, one-click generation of perfect circular avatars.',
      url: 'https://imagecirclemaker.com',
      siteName: 'ImageCircleMaker',
      type: 'website',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'ImageCircleMaker - Free Online Circular Avatar Cropping Tool',
      description: 'Free online circular avatar cropping tool, supporting Instagram, LinkedIn, Facebook and other international platforms.',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: 'any' },
        { url: '/favicon.svg', type: 'image/svg+xml' },
        { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
        { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      ],
      apple: [
        { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      ],
      other: [
        { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
        { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
      ],
    },
    manifest: '/site.webmanifest',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // 动态生成结构化数据
  const generateStructuredData = (isEnglish: boolean) => ({
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "ImageCircleMaker",
    "description": isEnglish 
      ? "Free online circular avatar cropping tool, supporting Instagram, LinkedIn, Facebook, Twitter and other international social platforms."
      : "免费在线圆形头像裁剪工具，支持Instagram、LinkedIn、Facebook、Twitter等国际社交平台。",
    "url": "https://imagecirclemaker.com",
    "applicationCategory": "MultimediaApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": isEnglish ? "USD" : "CNY"
    },
    "creator": {
      "@type": "Organization",
      "name": "ImageCircleMaker"
    }
  })

  // 默认使用英文，客户端组件会动态更新
  const structuredData = generateStructuredData(true)

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#3B82F6" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-3TZWRHSFX8"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-3TZWRHSFX8');
            `,
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          <LanguageProvider>
            <MetadataUpdater />
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
              <Header />
              {children}
            </div>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
} 